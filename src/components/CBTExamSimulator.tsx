import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { 
  Clock, 
  Flag, 
  ChevronLeft, 
  ChevronRight, 
  Send, 
  RotateCcw, 
  Calculator as CalcIcon, 
  BookOpen, 
  AlertTriangle, 
  CheckCircle2, 
  Grid, 
  X,
  Type
} from 'lucide-react';
import { ExamSessionState, Question, SubjectId, ExamResultSummary, SubjectResult } from '../types';
import { ALL_SUBJECTS } from '../data/subjects';
import { DiagramRenderer } from './DiagramRenderer';
import { ScientificCalculator } from './ScientificCalculator';
import { offlineDB } from '../services/db';
import confetti from 'canvas-confetti';

interface CBTExamSimulatorProps {
  session: ExamSessionState;
  onFinishExam: (result: ExamResultSummary) => void;
  onExitExam: () => void;
}

export const CBTExamSimulator: React.FC<CBTExamSimulatorProps> = ({
  session,
  onFinishExam,
  onExitExam
}) => {
  const [activeSubjectIdx, setActiveSubjectIdx] = useState(session.activeSubjectIndex || 0);
  const [currentQuestionIdx, setCurrentQuestionIdx] = useState(0);
  const [timeRemaining, setTimeRemaining] = useState(session.timeRemainingSeconds);
  const [answers, setAnswers] = useState<Record<string, 'A' | 'B' | 'C' | 'D' | 'E'>>(session.userAnswers || {});
  const [flagged, setFlagged] = useState<Record<string, boolean>>(session.flaggedQuestions || {});
  const [showCalculator, setShowCalculator] = useState(false);
  const [showSubmitModal, setShowSubmitModal] = useState(false);
  const [showExitModal, setShowExitModal] = useState(false);
  const [showPaletteDrawer, setShowPaletteDrawer] = useState(false);
  const [fontSize, setFontSize] = useState<'normal' | 'large' | 'xl'>('normal');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const currentSubjectId = session.subjects[activeSubjectIdx] || session.subjects[0];
  const subjectMeta = ALL_SUBJECTS.find(s => s.id === currentSubjectId) || ALL_SUBJECTS[0];
  const subjectQuestions: Question[] = session.questionsBySubject[currentSubjectId] || [];
  const currentQuestion: Question | undefined = subjectQuestions[currentQuestionIdx];

  // Auto-save session progress so students never lose answers
  useEffect(() => {
    offlineDB.saveExamSessionState({
      ...session,
      activeSubjectIndex: activeSubjectIdx,
      userAnswers: answers,
      flaggedQuestions: flagged,
      timeRemainingSeconds: timeRemaining
    });
  }, [session, activeSubjectIdx, answers, flagged, timeRemaining]);

  // Robust Timer Tick with Wall-Clock sync
  useEffect(() => {
    if (timeRemaining <= 0) {
      if (!isSubmitting) {
        handleFinalSubmission();
      }
      return;
    }

    const interval = setInterval(() => {
      setTimeRemaining(prev => {
        if (prev <= 1) {
          clearInterval(interval);
          if (!isSubmitting) {
            handleFinalSubmission();
          }
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [timeRemaining, isSubmitting]);

  const formatTimer = (seconds: number) => {
    const hrs = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    if (hrs > 0) {
      return `${hrs.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    }
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  // 8-Key CBT Keyboard Shortcuts Listener (A, B, C, D, P, N, S, R)
  const handleSelectOption = useCallback((optKey: 'A' | 'B' | 'C' | 'D' | 'E') => {
    if (!currentQuestion) return;
    setAnswers(prev => ({
      ...prev,
      [currentQuestion.id]: optKey
    }));
  }, [currentQuestion]);

  const handleClearOption = useCallback(() => {
    if (!currentQuestion) return;
    setAnswers(prev => {
      const next = { ...prev };
      delete next[currentQuestion.id];
      return next;
    });
  }, [currentQuestion]);

  const handleToggleFlag = useCallback(() => {
    if (!currentQuestion) return;
    setFlagged(prev => ({
      ...prev,
      [currentQuestion.id]: !prev[currentQuestion.id]
    }));
  }, [currentQuestion]);

  const handleNext = useCallback(() => {
    if (currentQuestionIdx < subjectQuestions.length - 1) {
      setCurrentQuestionIdx(prev => prev + 1);
    } else if (activeSubjectIdx < session.subjects.length - 1) {
      setActiveSubjectIdx(prev => prev + 1);
      setCurrentQuestionIdx(0);
    }
  }, [currentQuestionIdx, subjectQuestions.length, activeSubjectIdx, session.subjects.length]);

  const handlePrev = useCallback(() => {
    if (currentQuestionIdx > 0) {
      setCurrentQuestionIdx(prev => prev - 1);
    } else if (activeSubjectIdx > 0) {
      setActiveSubjectIdx(prev => prev - 1);
      const prevSubjQuestions = session.questionsBySubject[session.subjects[activeSubjectIdx - 1]] || [];
      setCurrentQuestionIdx(Math.max(0, prevSubjQuestions.length - 1));
    }
  }, [currentQuestionIdx, activeSubjectIdx, session.subjects, session.questionsBySubject]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Don't trigger shortcuts if inside an input or calculator
      if (['INPUT', 'TEXTAREA'].includes((e.target as HTMLElement)?.tagName)) return;
      const key = e.key.toUpperCase();

      if (['A', 'B', 'C', 'D'].includes(key)) {
        e.preventDefault();
        handleSelectOption(key as 'A' | 'B' | 'C' | 'D');
      } else if (key === 'N' || e.key === 'ArrowRight') {
        e.preventDefault();
        handleNext();
      } else if (key === 'P' || e.key === 'ArrowLeft') {
        e.preventDefault();
        handlePrev();
      } else if (key === 'R' || key === 'F') {
        e.preventDefault();
        handleToggleFlag();
      } else if (key === 'S') {
        e.preventDefault();
        setShowSubmitModal(true);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleSelectOption, handleNext, handlePrev, handleToggleFlag]);

  // Compute stats across all subjects
  const overallStats = useMemo(() => {
    let totalQuestions = 0;
    let totalAttempted = 0;
    let totalFlagged = 0;
    const subjectBreakdown: Record<SubjectId, { attempted: number; total: number; flagged: number }> = {} as any;

    session.subjects.forEach(subjId => {
      const qs = session.questionsBySubject[subjId] || [];
      totalQuestions += qs.length;
      let att = 0;
      let flg = 0;
      qs.forEach(q => {
        if (answers[q.id]) att++;
        if (flagged[q.id]) flg++;
      });
      subjectBreakdown[subjId] = { attempted: att, total: qs.length, flagged: flg };
      totalAttempted += att;
      totalFlagged += flg;
    });

    return { totalQuestions, totalAttempted, totalFlagged, subjectBreakdown };
  }, [session, answers, flagged]);

  // Submission & Scoring Engine
  const handleFinalSubmission = () => {
    if (isSubmitting) return;
    setIsSubmitting(true);
    setShowSubmitModal(false);
    offlineDB.clearSavedExamSession();
    const timeSpent = session.timeLimitSeconds - timeRemaining;
    
    let totalCorrectAll = 0;
    let totalQuestionsAll = 0;
    const subjectResults: SubjectResult[] = [];
    const topicBreakdown: Record<string, { correct: number; total: number }> = {};

    session.subjects.forEach(subjId => {
      const qs = session.questionsBySubject[subjId] || [];
      const subMeta = ALL_SUBJECTS.find(s => s.id === subjId) || ALL_SUBJECTS[0];
      let correctCount = 0;
      let attemptedCount = 0;

      qs.forEach(q => {
        const userChoice = answers[q.id];
        const isCorrect = userChoice === q.correctOption;
        
        if (userChoice) attemptedCount++;
        if (isCorrect) correctCount++;

        // Topic accuracy accumulation
        if (!topicBreakdown[q.topic]) {
          topicBreakdown[q.topic] = { correct: 0, total: 0 };
        }
        topicBreakdown[q.topic].total += 1;
        if (isCorrect) topicBreakdown[q.topic].correct += 1;
      });

      totalCorrectAll += correctCount;
      totalQuestionsAll += qs.length;

      // UTME standard scaling: 100 points per subject max
      const percentage = qs.length > 0 ? (correctCount / qs.length) : 0;
      const scaledScore = Math.round(percentage * 100);

      subjectResults.push({
        subjectId: subjId,
        subjectName: subMeta.name,
        attempted: attemptedCount,
        correct: correctCount,
        total: qs.length,
        percentage: Math.round(percentage * 100),
        scaledScore
      });
    });

    // 400 Composite Scale for UTME (or total scaled score)
    const compositeScore = subjectResults.reduce((acc, curr) => acc + curr.scaledScore, 0);

    const summaryResult: ExamResultSummary = {
      id: `result-${Date.now()}`,
      sessionId: session.id,
      date: new Date().toISOString(),
      examType: session.examType,
      mode: session.mode,
      title: session.title,
      totalQuestions: totalQuestionsAll,
      totalAttempted: overallStats.totalAttempted,
      totalCorrect: totalCorrectAll,
      totalScore: compositeScore,
      maxScore: session.subjects.length * 100, // 400 for 4 subjects
      timeSpentSeconds: timeSpent,
      subjects: subjectResults,
      topicBreakdown
    };

    if (compositeScore >= 270) {
      try {
        confetti({
          particleCount: 100,
          spread: 70,
          origin: { y: 0.6 }
        });
      } catch (e) {
        // ignore
      }
    }

    onFinishExam(summaryResult);
  };

  const isUrgentTime = timeRemaining <= 300; // <5 mins
  const isWarningTime = timeRemaining <= 900 && !isUrgentTime; // <15 mins

  return (
    <div className="min-h-screen bg-[#F1F5F9] text-[#1E293B] flex flex-col select-none" id="cbt-exam-simulator-view">
      {/* ======================================================== */}
      {/* 1. TOP STATUS HEADER (Synced Timer, Shortcut Cheat Sheet) */}
      {/* ======================================================== */}
      <header className="bg-[#002D1B] border-b border-[#004D2E] text-white px-3 py-3 sm:px-6 sticky top-0 z-40 shadow-md">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-2">
          {/* Left: Go Back Button & Exam Title */}
          <div className="flex items-center space-x-2 sm:space-x-3">
            <button
              onClick={() => setShowExitModal(true)}
              className="px-2.5 py-1.5 bg-white/10 hover:bg-rose-500/25 text-white hover:text-rose-200 rounded-lg text-xs font-semibold transition flex items-center gap-1 border border-white/15 hover:border-rose-400/50 cursor-pointer shadow-xs"
              title="Go back to Dashboard (Exit Exam)"
              id="btn-cbt-exit-exam"
            >
              <ChevronLeft className="w-4 h-4" />
              <span className="font-bold">Go Back</span>
            </button>

            <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-lg bg-[#008751] flex items-center justify-center font-black text-white shadow-md flex-shrink-0">
              E
            </div>
            <div className="min-w-0">
              <div className="text-xs sm:text-sm font-bold text-white flex items-center gap-2 truncate">
                <span className="truncate">{session.title}</span>
                <span className="hidden sm:inline-block px-1.5 py-0.5 text-[10px] bg-[#008751]/30 text-[#00A86B] font-mono rounded border border-[#008751] flex-shrink-0">
                  OFFLINE ACTIVE
                </span>
              </div>
              <div className="text-[11px] sm:text-xs text-white/70 hidden xs:block truncate">
                180 Questions • 400 Marks Total • 120 Mins Unified
              </div>
            </div>
          </div>

          {/* Center: Live Countdown Timer */}
          <div className={`px-4 py-1.5 rounded-lg border flex items-center space-x-2 font-mono font-bold text-base sm:text-lg shadow-inner ${
            isUrgentTime 
              ? 'bg-rose-500/20 border-rose-500 text-rose-300 animate-pulse' 
              : isWarningTime 
              ? 'bg-amber-500/20 border-amber-500 text-amber-300' 
              : 'bg-[#001D11] border-[#004D2E] text-[#00A86B]'
          }`} id="cbt-countdown-timer">
            <Clock className="w-4 h-4" />
            <span>{formatTimer(timeRemaining)}</span>
          </div>

          {/* Right Controls: Font Adjust, Calculator, Palette, Submit */}
          <div className="flex items-center space-x-1.5 sm:space-x-2">
            {/* Font Resizer */}
            <button
              onClick={() => {
                if (fontSize === 'normal') setFontSize('large');
                else if (fontSize === 'large') setFontSize('xl');
                else setFontSize('normal');
              }}
              className="p-2 bg-white/10 hover:bg-white/15 rounded-lg text-white transition text-xs flex items-center gap-1 border border-white/10"
              title="Adjust Font Size (A-, A, A+)"
              id="btn-adjust-font"
            >
              <Type className="w-4 h-4" />
              <span className="hidden sm:inline text-[10px] font-mono uppercase">{fontSize}</span>
            </button>

            {/* Scientific Calculator Launch */}
            <button
              onClick={() => setShowCalculator(!showCalculator)}
              className={`px-2.5 py-2 rounded-lg font-semibold text-xs transition flex items-center gap-1.5 shadow ${
                showCalculator 
                  ? 'bg-[#008751] text-white' 
                  : 'bg-white/10 hover:bg-white/15 text-white border border-white/10'
              }`}
              id="btn-toggle-calculator"
            >
              <CalcIcon className="w-4 h-4" />
              <span className="hidden sm:inline">Calculator</span>
            </button>

            {/* Question Grid Toggle (Mobile/Desktop) */}
            <button
              onClick={() => setShowPaletteDrawer(!showPaletteDrawer)}
              className="p-2 bg-white/10 hover:bg-white/15 rounded-lg text-white transition border border-white/10"
              title="Question Palette Grid"
              id="btn-toggle-palette"
            >
              <Grid className="w-4 h-4" />
            </button>

            {/* Submit Button */}
            <button
              onClick={() => setShowSubmitModal(true)}
              className="px-3.5 py-2 bg-[#008751] hover:bg-[#007043] text-white font-bold text-xs rounded-lg transition shadow-md shadow-emerald-950/30 flex items-center gap-1.5 cursor-pointer"
              id="btn-submit-exam"
            >
              <Send className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Submit (S)</span>
            </button>
          </div>
        </div>

        {/* 8-Key CBT Shortcut Indicator Bar */}
        <div className="max-w-7xl mx-auto mt-2 pt-2 border-t border-white/10 hidden md:flex items-center justify-between text-[11px] text-white/70">
          <div className="flex items-center space-x-3">
            <span className="font-semibold text-white">8-Key CBT Shortcuts:</span>
            <span className="bg-white/10 px-1.5 py-0.5 rounded text-[#00A86B] font-mono font-bold">A, B, C, D</span> Choose Option
            <span className="bg-white/10 px-1.5 py-0.5 rounded text-sky-300 font-mono font-bold">P</span> Previous
            <span className="bg-white/10 px-1.5 py-0.5 rounded text-sky-300 font-mono font-bold">N</span> Next
            <span className="bg-white/10 px-1.5 py-0.5 rounded text-amber-300 font-mono font-bold">R / F</span> Flag
            <span className="bg-white/10 px-1.5 py-0.5 rounded text-rose-300 font-mono font-bold">S</span> Submit
          </div>
          <div className="text-white/80 font-mono text-[11px]">
            Attempted: <strong className="text-[#00A86B]">{overallStats.totalAttempted}</strong> / {overallStats.totalQuestions}
          </div>
        </div>
      </header>

      {/* ======================================================== */}
      {/* 2. SUBJECT TABS (4-Subject UTME Multi-Tab Navigation)   */}
      {/* ======================================================== */}
      <div className="bg-white border-b border-slate-200 px-3 sm:px-6 shadow-xs">
        <div className="max-w-7xl mx-auto flex items-center space-x-2 overflow-x-auto py-2.5 scrollbar-none">
          {session.subjects.map((subjId, idx) => {
            const meta = ALL_SUBJECTS.find(s => s.id === subjId) || ALL_SUBJECTS[0];
            const stats = overallStats.subjectBreakdown[subjId] || { attempted: 0, total: 0, flagged: 0 };
            const isActive = idx === activeSubjectIdx;

            return (
              <button
                key={subjId}
                onClick={() => {
                  setActiveSubjectIdx(idx);
                  setCurrentQuestionIdx(0);
                }}
                className={`px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition flex items-center space-x-2 border cursor-pointer ${
                  isActive
                    ? 'bg-[#008751] border-[#008751] text-white shadow-sm'
                    : 'bg-slate-100 hover:bg-slate-200 border-slate-200 text-slate-700'
                }`}
                id={`cbt-tab-${subjId}`}
              >
                <span>{meta.name}</span>
                <span className={`text-[10px] px-1.5 py-0.5 rounded-full font-mono font-bold ${
                  isActive
                    ? 'bg-white/20 text-white'
                    : stats.attempted === stats.total 
                    ? 'bg-emerald-100 text-emerald-800' 
                    : 'bg-slate-200 text-slate-700'
                }`}>
                  {stats.attempted}/{stats.total}
                </span>
                {stats.flagged > 0 && (
                  <span className="w-2 h-2 rounded-full bg-amber-400" title={`${stats.flagged} flagged`} />
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* ======================================================== */}
      {/* 3. MAIN WORKSPACE (Question, Passage, Diagrams, Options)  */}
      {/* ======================================================== */}
      <main className="flex-1 max-w-7xl w-full mx-auto p-3 sm:p-6 grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Question Area */}
        <div className={`space-y-4 ${showPaletteDrawer ? 'lg:col-span-8' : 'lg:col-span-9'}`}>
          {currentQuestion ? (
            <div className="bg-white border border-slate-200 rounded-2xl p-5 sm:p-7 shadow-sm relative">
              {/* Question Header Meta */}
              <div className="flex items-center justify-between border-b border-slate-100 pb-3 mb-4">
                <div className="flex items-center space-x-3">
                  <span className="px-3 py-1 bg-slate-100 text-slate-800 font-mono font-bold text-xs rounded-full border border-slate-200">
                    Question {currentQuestionIdx + 1} of {subjectQuestions.length}
                  </span>
                  <span className="text-xs text-slate-500 hidden sm:inline-block">
                    Topic: <strong className="text-slate-800">{currentQuestion.topic}</strong>
                  </span>
                </div>

                <div className="flex items-center space-x-2">
                  <button
                    onClick={handleToggleFlag}
                    className={`px-3 py-1 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition border ${
                      flagged[currentQuestion.id]
                        ? 'bg-amber-50 border-amber-300 text-amber-700'
                        : 'bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100'
                    }`}
                    title="Flag for later review (R)"
                    id="btn-flag-question"
                  >
                    <Flag className={`w-3.5 h-3.5 ${flagged[currentQuestion.id] ? 'fill-amber-500 text-amber-500' : ''}`} />
                    <span>{flagged[currentQuestion.id] ? 'Flagged' : 'Flag (R)'}</span>
                  </button>
                </div>
              </div>

              {/* Comprehension / Reading Passage (If Applicable) */}
              {currentQuestion.passage && (
                <div className="mb-5 p-4 rounded-xl bg-slate-50 border border-slate-200 text-slate-800 text-sm leading-relaxed max-h-56 overflow-y-auto scrollbar-thin">
                  <div className="text-xs font-bold uppercase tracking-wider text-[#008751] mb-2 flex items-center gap-1.5">
                    <BookOpen className="w-3.5 h-3.5" />
                    <span>Reading Passage / Comprehension Text:</span>
                  </div>
                  <p className="whitespace-pre-line">{currentQuestion.passage}</p>
                </div>
              )}

              {/* Question Text */}
              <div className={`font-semibold text-[#1E293B] leading-relaxed whitespace-pre-line mb-4 ${
                fontSize === 'large' ? 'text-lg' : fontSize === 'xl' ? 'text-xl' : 'text-base'
              }`}>
                {currentQuestion.question}
              </div>

              {/* Bundled Local Diagram Asset (If Applicable) */}
              {currentQuestion.diagram && (
                <DiagramRenderer diagram={currentQuestion.diagram} />
              )}

              {/* Multiple Choice Options (A, B, C, D) */}
              <div className="space-y-3 mt-5">
                {currentQuestion.options.map(opt => {
                  const isSelected = answers[currentQuestion.id] === opt.key;

                  return (
                    <button
                      key={opt.key}
                      onClick={() => handleSelectOption(opt.key)}
                      className={`w-full text-left p-3.5 sm:p-4 rounded-xl transition border flex items-start space-x-3.5 group cursor-pointer ${
                        isSelected
                          ? 'bg-emerald-50/80 border-[#008751] text-slate-900 shadow-sm ring-1 ring-[#008751]'
                          : 'bg-white hover:bg-slate-50 border-slate-200 text-slate-800'
                      }`}
                      id={`opt-btn-${opt.key}`}
                    >
                      {/* Option Key Badge */}
                      <span className={`w-7 h-7 rounded-lg font-mono font-bold text-xs flex items-center justify-center flex-shrink-0 transition ${
                        isSelected
                          ? 'bg-[#008751] text-white shadow'
                          : 'bg-slate-100 group-hover:bg-slate-200 text-slate-700'
                      }`}>
                        {opt.key}
                      </span>
                      <span className={`flex-1 text-sm sm:text-base leading-snug pt-0.5 ${
                        fontSize === 'large' ? 'text-base sm:text-lg' : fontSize === 'xl' ? 'text-lg sm:text-xl' : ''
                      }`}>
                        {opt.text}
                      </span>
                    </button>
                  );
                })}
              </div>

              {/* Bottom Action Strip */}
              <div className="flex items-center justify-between mt-6 pt-4 border-t border-slate-100">
                <button
                  onClick={handlePrev}
                  disabled={activeSubjectIdx === 0 && currentQuestionIdx === 0}
                  className="px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 disabled:opacity-40 disabled:cursor-not-allowed text-xs sm:text-sm font-bold text-slate-700 transition flex items-center gap-1.5 border border-slate-200"
                  id="btn-prev-question"
                >
                  <ChevronLeft className="w-4 h-4" />
                  <span>Previous (P)</span>
                </button>

                {answers[currentQuestion.id] && (
                  <button
                    onClick={handleClearOption}
                    className="px-3 py-1.5 text-xs text-slate-500 hover:text-rose-600 rounded-lg hover:bg-rose-50 transition flex items-center gap-1"
                    title="Clear selected choice (C)"
                    id="btn-clear-option"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                    <span>Clear Choice</span>
                  </button>
                )}

                <button
                  onClick={handleNext}
                  className="px-5 py-2 rounded-xl bg-[#008751] hover:bg-[#007043] text-white text-xs sm:text-sm font-bold transition flex items-center gap-1.5 shadow-md shadow-emerald-900/20"
                  id="btn-next-question"
                >
                  <span>Next (N)</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          ) : (
            <div className="p-12 text-center text-slate-500 bg-white rounded-2xl border border-slate-200">
              No questions found for this subject.
            </div>
          )}
        </div>

        {/* Right Column: Question Palette (Grid Drawer / Sidebar) */}
        <aside className={`${showPaletteDrawer ? 'block' : 'hidden lg:block'} lg:col-span-3 space-y-4`}>
          <div className="bg-white border border-slate-200 rounded-2xl p-4 shadow-sm sticky top-24">
            <div className="flex items-center justify-between mb-3 pb-2 border-b border-slate-100">
              <div className="text-xs font-bold uppercase tracking-wider text-slate-500">
                Question Palette
              </div>
              <span className="text-[11px] text-slate-500 font-mono font-bold">
                {subjectMeta.shortName}: {overallStats.subjectBreakdown[currentSubjectId]?.attempted || 0}/{subjectQuestions.length}
              </span>
            </div>

            {/* Legend */}
            <div className="grid grid-cols-2 gap-2 text-[10px] text-slate-500 mb-3 pb-3 border-b border-slate-100 font-mono">
              <div className="flex items-center space-x-1.5">
                <span className="w-3 h-3 rounded bg-[#008751]" />
                <span>Answered</span>
              </div>
              <div className="flex items-center space-x-1.5">
                <span className="w-3 h-3 rounded bg-slate-100 border border-slate-200" />
                <span>Unanswered</span>
              </div>
              <div className="flex items-center space-x-1.5">
                <span className="w-3 h-3 rounded bg-amber-400" />
                <span>Flagged (R)</span>
              </div>
              <div className="flex items-center space-x-1.5">
                <span className="w-3 h-3 rounded bg-sky-500 border-2 border-slate-900" />
                <span>Current</span>
              </div>
            </div>

            {/* Palette Button Grid */}
            <div className="grid grid-cols-5 gap-1.5 max-h-[50vh] overflow-y-auto pr-1 scrollbar-thin">
              {subjectQuestions.map((q, idx) => {
                const isCurrent = idx === currentQuestionIdx;
                const isAnswered = !!answers[q.id];
                const isFlagged = !!flagged[q.id];

                let bgClass = 'bg-slate-50 text-slate-700 hover:bg-slate-100 border-slate-200';
                if (isAnswered) {
                  bgClass = 'bg-[#008751] text-white font-bold border-[#008751] shadow-xs';
                }
                if (isFlagged) {
                  bgClass = 'bg-amber-400 text-slate-950 font-bold border-amber-500';
                }
                if (isCurrent) {
                  bgClass += ' ring-2 ring-sky-500 ring-offset-2';
                }

                return (
                  <button
                    key={q.id}
                    onClick={() => setCurrentQuestionIdx(idx)}
                    className={`h-8 rounded-lg text-xs font-mono transition border cursor-pointer ${bgClass}`}
                    id={`palette-btn-${idx + 1}`}
                  >
                    {idx + 1}
                  </button>
                );
              })}
            </div>
          </div>
        </aside>
      </main>

      {/* ======================================================== */}
      {/* 4. JAMB SCIENTIFIC CALCULATOR MODAL OVERLAY             */}
      {/* ======================================================== */}
      <ScientificCalculator
        isOpen={showCalculator}
        onClose={() => setShowCalculator(false)}
      />

      {/* ======================================================== */}
      {/* 5. CONFIRMATION / SUBMISSION MODAL                       */}
      {/* ======================================================== */}
      {showSubmitModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white border border-slate-200 rounded-2xl max-w-lg w-full p-6 shadow-2xl animate-in fade-in zoom-in-95 duration-200">
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center border border-amber-200">
                <AlertTriangle className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-[#1E293B]">Confirm Exam Submission</h3>
                <p className="text-xs text-slate-500">Review your answered status across all 4 subjects before scoring</p>
              </div>
            </div>

            {/* Subject-by-Subject Breakdown */}
            <div className="space-y-2 bg-slate-50 rounded-xl p-4 border border-slate-200 text-xs font-mono mb-4">
              {session.subjects.map(subjId => {
                const meta = ALL_SUBJECTS.find(s => s.id === subjId) || ALL_SUBJECTS[0];
                const stats = overallStats.subjectBreakdown[subjId] || { attempted: 0, total: 0, flagged: 0 };
                const unattempted = stats.total - stats.attempted;

                return (
                  <div key={subjId} className="flex items-center justify-between py-1.5 border-b border-slate-200 last:border-none">
                    <span className="text-slate-800 font-sans font-semibold">{meta.name}</span>
                    <div className="flex items-center space-x-3">
                      <span className="text-[#008751] font-bold">{stats.attempted} Answered</span>
                      {unattempted > 0 && (
                        <span className="text-rose-600 font-bold">{unattempted} Unanswered</span>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-3 text-xs text-emerald-800 flex items-center gap-2 mb-6">
              <CheckCircle2 className="w-4 h-4 flex-shrink-0 text-[#008751]" />
              <span>
                Total Answered: <strong>{overallStats.totalAttempted}</strong> of {overallStats.totalQuestions} Questions.
                Time remaining: {formatTimer(timeRemaining)}.
              </span>
            </div>

            <div className="flex items-center justify-end space-x-3">
              <button
                onClick={() => setShowSubmitModal(false)}
                className="px-4 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold rounded-xl transition border border-slate-200 cursor-pointer"
                id="btn-cancel-submit"
              >
                Return to Exam
              </button>
              <button
                onClick={handleFinalSubmission}
                disabled={isSubmitting}
                className="px-5 py-2.5 bg-[#008751] hover:bg-[#007043] disabled:opacity-50 disabled:cursor-not-allowed text-white text-xs font-bold rounded-xl transition shadow-md shadow-emerald-950/20 cursor-pointer"
                id="btn-confirm-final-submit"
              >
                {isSubmitting ? 'Submitting...' : 'Confirm & Submit Now'}
              </button>
            </div>
          </div>
        </div>
      )}
      {/* ======================================================== */}
      {/* 6. EXIT / GO BACK CONFIRMATION MODAL                     */}
      {/* ======================================================== */}
      {showExitModal && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white border border-slate-200 rounded-2xl max-w-md w-full p-6 shadow-2xl animate-in fade-in zoom-in-95 duration-200">
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-rose-50 text-rose-600 flex items-center justify-center border border-rose-200 flex-shrink-0">
                <AlertTriangle className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-[#1E293B]">Exit Exam Simulation?</h3>
                <p className="text-xs text-slate-500">Go back to Student Dashboard</p>
              </div>
            </div>

            <p className="text-sm text-slate-600 mb-6 leading-relaxed">
              Are you sure you want to go back to the dashboard? Your unsubmitted answers and progress in this active session will be discarded.
            </p>

            <div className="flex items-center justify-end space-x-3">
              <button
                onClick={() => setShowExitModal(false)}
                className="px-4 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold rounded-xl transition border border-slate-200 cursor-pointer"
                id="btn-cancel-exit"
              >
                Continue Exam
              </button>
              <button
                onClick={() => {
                  offlineDB.clearSavedExamSession();
                  setShowExitModal(false);
                  onExitExam();
                }}
                className="px-5 py-2.5 bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold rounded-xl transition shadow-md shadow-rose-950/20 cursor-pointer"
                id="btn-confirm-exit"
              >
                Exit to Dashboard
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
