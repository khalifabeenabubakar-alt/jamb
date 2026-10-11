import React, { useState } from 'react';
import { 
  Trophy, 
  CheckCircle2, 
  XCircle, 
  Clock, 
  Award, 
  RotateCcw, 
  TrendingUp, 
  BookOpen, 
  Bookmark, 
  ChevronRight, 
  Filter, 
  Building2,
  HelpCircle
} from 'lucide-react';
import { ExamResultSummary, Question, SubjectId } from '../types';
import { CUT_OFF_MARKS_REFERENCE, ALL_SUBJECTS } from '../data/subjects';
import { DiagramRenderer } from './DiagramRenderer';
import { offlineDB } from '../services/db';

interface CBTResultViewProps {
  result: ExamResultSummary;
  questionsBySubject?: Record<SubjectId, Question[]>;
  userAnswers?: Record<string, 'A' | 'B' | 'C' | 'D' | 'E'>;
  onRetake: () => void;
  onDrillWeakTopic: (topic: string, subjectId: SubjectId) => void;
  onGoHome: () => void;
}

export const CBTResultView: React.FC<CBTResultViewProps> = ({
  result,
  questionsBySubject,
  userAnswers = {},
  onRetake,
  onDrillWeakTopic,
  onGoHome
}) => {
  const [selectedReviewSubject, setSelectedReviewSubject] = useState<SubjectId>(
    result.subjects[0]?.subjectId || 'english'
  );
  const [reviewFilter, setReviewFilter] = useState<'all' | 'incorrect' | 'correct' | 'unattempted'>('all');
  const [bookmarkedIds, setBookmarkedIds] = useState<string[]>(offlineDB.getBookmarkedIds());

  const handleToggleBookmark = (id: string) => {
    const isNowBookmarked = offlineDB.toggleBookmark(id);
    if (isNowBookmarked) {
      setBookmarkedIds(prev => [...prev, id]);
    } else {
      setBookmarkedIds(prev => prev.filter(item => item !== id));
    }
  };

  const subjectQuestions = questionsBySubject ? (questionsBySubject[selectedReviewSubject] || []) : [];

  const filteredQuestions = subjectQuestions.filter(q => {
    const userChoice = userAnswers[q.id];
    const isCorrect = userChoice === q.correctOption;
    if (reviewFilter === 'correct') return isCorrect;
    if (reviewFilter === 'incorrect') return userChoice && !isCorrect;
    if (reviewFilter === 'unattempted') return !userChoice;
    return true;
  });

  const formatDuration = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}m ${secs}s`;
  };

  // Performance tier categorization
  const score = result.totalScore;
  let performanceBadge = {
    title: 'Outstanding Performance (Tier 1)',
    color: 'from-emerald-500 to-teal-600',
    text: 'text-emerald-400',
    border: 'border-emerald-500/40',
    message: 'High probability of admission for top-tier competitive courses (Medicine, Law, Tech) at first-choice Federal Universities.'
  };

  if (score < 200) {
    performanceBadge = {
      title: 'Needs Intensive Practice',
      color: 'from-rose-500 to-red-700',
      text: 'text-rose-400',
      border: 'border-rose-500/40',
      message: 'Focus on topic-by-topic drills and review step-by-step marking rubrics to elevate score above 250+.'
    };
  } else if (score < 250) {
    performanceBadge = {
      title: 'Moderate Pass (Tier 3)',
      color: 'from-amber-500 to-orange-600',
      text: 'text-amber-400',
      border: 'border-amber-500/40',
      message: 'Meets general cut-offs for many degree programs. Target 280+ with weak-topic remediation.'
    };
  } else if (score < 280) {
    performanceBadge = {
      title: 'Strong Competitive Score (Tier 2)',
      color: 'from-blue-500 to-indigo-600',
      text: 'text-blue-400',
      border: 'border-blue-500/40',
      message: 'Excellent foundation! Qualifies for most Engineering, Physical Sciences, and Social Science faculties.'
    };
  }

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 p-4 sm:p-8 space-y-8 max-w-7xl mx-auto" id="cbt-result-view">
      {/* ======================================================== */}
      {/* 1. SCORE SUMMARY HERO CARD                               */}
      {/* ======================================================== */}
      <div className={`p-6 sm:p-8 rounded-3xl bg-slate-900 border ${performanceBadge.border} shadow-2xl relative overflow-hidden`}>
        {/* Background glow */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl -z-10 pointer-events-none" />

        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
          {/* Main Composite Score Display */}
          <div className="md:col-span-5 text-center md:text-left space-y-3">
            <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold font-mono tracking-wider bg-slate-800 ${performanceBadge.text}`}>
              <Trophy className="w-3.5 h-3.5" />
              {performanceBadge.title}
            </span>

            <div className="flex items-baseline justify-center md:justify-start gap-2">
              <span className="text-6xl sm:text-7xl font-extrabold text-white tracking-tight font-mono">
                {result.totalScore}
              </span>
              <span className="text-2xl sm:text-3xl text-slate-400 font-bold font-mono">
                / {result.maxScore}
              </span>
            </div>

            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              {performanceBadge.message}
            </p>
          </div>

          {/* Quick Metrics (Accuracy, Percentage, Correct, Incorrect, Unanswered, Time) */}
          <div className="md:col-span-7 grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div className="bg-slate-950/80 border border-slate-800 rounded-2xl p-3 text-center">
              <div className="text-[11px] text-slate-400 mb-1 flex items-center justify-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                <span>Score %</span>
              </div>
              <div className="text-xl sm:text-2xl font-bold text-emerald-400 font-mono">
                {result.totalQuestions > 0 ? Math.round((result.totalCorrect / result.totalQuestions) * 100) : 0}%
              </div>
              <div className="text-[10px] text-slate-400 font-mono mt-0.5">
                {result.totalCorrect} / {result.totalQuestions} Marks
              </div>
            </div>

            <div className="bg-slate-950/80 border border-slate-800 rounded-2xl p-3 text-center">
              <div className="text-[11px] text-slate-400 mb-1 flex items-center justify-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                <span>Correct</span>
              </div>
              <div className="text-xl sm:text-2xl font-bold text-emerald-400 font-mono">
                {result.totalCorrect}
              </div>
              <div className="text-[10px] text-slate-400 font-mono mt-0.5">
                {result.totalAttempted > 0 ? Math.round((result.totalCorrect / result.totalAttempted) * 100) : 0}% Accuracy
              </div>
            </div>

            <div className="bg-slate-950/80 border border-slate-800 rounded-2xl p-3 text-center">
              <div className="text-[11px] text-slate-400 mb-1 flex items-center justify-center gap-1">
                <XCircle className="w-3.5 h-3.5 text-rose-400" />
                <span>Incorrect</span>
              </div>
              <div className="text-xl sm:text-2xl font-bold text-rose-400 font-mono">
                {Math.max(0, result.totalAttempted - result.totalCorrect)}
              </div>
              <div className="text-[10px] text-slate-400 font-mono mt-0.5">
                {result.totalQuestions - result.totalAttempted} Unanswered
              </div>
            </div>

            <div className="bg-slate-950/80 border border-slate-800 rounded-2xl p-3 text-center">
              <div className="text-[11px] text-slate-400 mb-1 flex items-center justify-center gap-1">
                <Clock className="w-3.5 h-3.5 text-sky-400" />
                <span>Time Used</span>
              </div>
              <div className="text-lg sm:text-xl font-bold text-sky-400 font-mono">
                {formatDuration(result.timeSpentSeconds)}
              </div>
              <div className="text-[10px] text-slate-400 font-mono mt-0.5">
                ~{Math.round(result.timeSpentSeconds / (result.totalAttempted || 1))}s / Q
              </div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="mt-6 pt-6 border-t border-slate-800 flex flex-wrap items-center justify-between gap-3">
          <button
            onClick={onGoHome}
            className="px-4 py-2.5 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold rounded-xl transition"
            id="btn-result-home"
          >
            ← Back to Dashboard
          </button>

          <div className="flex items-center space-x-2">
            <button
              onClick={onRetake}
              className="px-5 py-2.5 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white text-xs font-bold rounded-xl transition shadow-lg shadow-emerald-600/30 flex items-center gap-1.5"
              id="btn-result-retake"
            >
              <RotateCcw className="w-4 h-4" />
              <span>Retake Mock Exam</span>
            </button>
          </div>
        </div>
      </div>

      {/* ======================================================== */}
      {/* 2. SUBJECT PERFORMANCE SCORECARDS                        */}
      {/* ======================================================== */}
      <div className="space-y-4">
        <h3 className="text-base font-bold text-slate-200 uppercase tracking-wider flex items-center gap-2">
          <Award className="w-4 h-4 text-emerald-400" />
          <span>Subject-by-Subject Breakdown</span>
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {result.subjects.map(subj => {
            const meta = ALL_SUBJECTS.find(s => s.id === subj.subjectId) || ALL_SUBJECTS[0];

            return (
              <div 
                key={subj.subjectId}
                className="bg-slate-900 border border-slate-800 rounded-2xl p-5 space-y-3 relative hover:border-slate-700 transition"
              >
                <div className="flex items-center justify-between">
                  <span className="text-sm font-bold text-slate-100">{meta.name}</span>
                  <span className="text-xs font-mono font-bold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
                    {subj.scaledScore} / 100
                  </span>
                </div>

                {/* Progress bar */}
                <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-gradient-to-r from-emerald-500 to-teal-400 rounded-full transition-all duration-500"
                    style={{ width: `${subj.percentage}%` }}
                  />
                </div>

                <div className="flex items-center justify-between text-xs text-slate-400 font-mono">
                  <span>Correct: {subj.correct} / {subj.total}</span>
                  <span>{subj.percentage}%</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* ======================================================== */}
      {/* 3. UNIVERSITY ADMISSION CUT-OFF BENCHMARK VISUALIZER     */}
      {/* ======================================================== */}
      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Building2 className="w-5 h-5 text-indigo-400" />
            <h3 className="text-base font-bold text-slate-200">
              Nigerian Universities UTME Admission Cut-Off Index
            </h3>
          </div>
          <span className="text-xs text-slate-400 hidden sm:inline">
            Your Score: <strong className="text-emerald-400 font-mono">{result.totalScore}</strong>
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
          {CUT_OFF_MARKS_REFERENCE.map(cut => {
            const qualifiesUnilag = result.totalScore >= cut.unilag;
            const qualifiesUi = result.totalScore >= cut.ui;

            return (
              <div 
                key={cut.course}
                className="bg-slate-950 border border-slate-800/80 rounded-2xl p-4 space-y-2"
              >
                <div className="text-xs font-bold text-slate-200 truncate">{cut.course}</div>
                <div className="text-[11px] text-slate-400 flex items-center justify-between font-mono">
                  <span>UNILAG: {cut.unilag}</span>
                  <span className={qualifiesUnilag ? 'text-emerald-400 font-bold' : 'text-rose-400'}>
                    {qualifiesUnilag ? '✓ Likely' : '✗ Need +'}
                  </span>
                </div>
                <div className="text-[11px] text-slate-400 flex items-center justify-between font-mono">
                  <span>UI / OAU: {cut.ui}</span>
                  <span className={qualifiesUi ? 'text-emerald-400 font-bold' : 'text-rose-400'}>
                    {qualifiesUi ? '✓ Likely' : '✗ Need +'}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* ======================================================== */}
      {/* 4. DETAILED INTERACTIVE QUESTION-BY-QUESTION REVIEW      */}
      {/* ======================================================== */}
      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
          <div>
            <h3 className="text-base font-bold text-slate-100 flex items-center gap-2">
              <BookOpen className="w-5 h-5 text-emerald-400" />
              <span>Step-by-Step Question Review & Solutions</span>
            </h3>
            <p className="text-xs text-slate-400 mt-0.5">
              Review syllabus references, formula applications, and expert explanations
            </p>
          </div>

          {/* Subject Filter Tabs */}
          <div className="flex items-center space-x-1.5 overflow-x-auto">
            {result.subjects.map(s => (
              <button
                key={s.subjectId}
                onClick={() => setSelectedReviewSubject(s.subjectId)}
                className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition ${
                  selectedReviewSubject === s.subjectId
                    ? 'bg-emerald-500 text-slate-950 font-bold'
                    : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                }`}
              >
                {s.subjectName}
              </button>
            ))}
          </div>
        </div>

        {/* Filter Controls (All, Incorrect, Correct, Unattempted) */}
        <div className="flex items-center space-x-2 text-xs">
          <Filter className="w-4 h-4 text-slate-400" />
          <button
            onClick={() => setReviewFilter('all')}
            className={`px-2.5 py-1 rounded-lg transition ${
              reviewFilter === 'all' ? 'bg-slate-700 text-white' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            All Questions ({subjectQuestions.length})
          </button>
          <button
            onClick={() => setReviewFilter('incorrect')}
            className={`px-2.5 py-1 rounded-lg transition ${
              reviewFilter === 'incorrect' ? 'bg-rose-500/20 text-rose-300 font-bold' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            Incorrect Only
          </button>
          <button
            onClick={() => setReviewFilter('correct')}
            className={`px-2.5 py-1 rounded-lg transition ${
              reviewFilter === 'correct' ? 'bg-emerald-500/20 text-emerald-300 font-bold' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            Correct Only
          </button>
          <button
            onClick={() => setReviewFilter('unattempted')}
            className={`px-2.5 py-1 rounded-lg transition ${
              reviewFilter === 'unattempted' ? 'bg-amber-500/20 text-amber-300 font-bold' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            Unattempted
          </button>
        </div>

        {/* Questions List */}
        <div className="space-y-6">
          {filteredQuestions.map((q, idx) => {
            const userChoice = userAnswers[q.id];
            const isCorrect = userChoice === q.correctOption;
            const isBookmarked = bookmarkedIds.includes(q.id);

            return (
              <div 
                key={q.id}
                className={`p-5 sm:p-6 rounded-2xl border bg-slate-950 transition ${
                  isCorrect 
                    ? 'border-emerald-500/30' 
                    : userChoice 
                    ? 'border-rose-500/40' 
                    : 'border-slate-800'
                }`}
              >
                {/* Header */}
                <div className="flex items-center justify-between pb-3 mb-3 border-b border-slate-800/80">
                  <div className="flex items-center space-x-2">
                    <span className="text-xs font-mono font-bold text-slate-300 bg-slate-800 px-2 py-0.5 rounded">
                      Q{idx + 1} ({q.year})
                    </span>
                    <span className="text-xs text-slate-400">
                      Topic: <strong className="text-slate-300">{q.topic}</strong>
                    </span>
                  </div>

                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => handleToggleBookmark(q.id)}
                      className={`p-1.5 rounded-lg transition ${
                        isBookmarked ? 'bg-amber-500/20 text-amber-400' : 'text-slate-400 hover:bg-slate-800'
                      }`}
                      title={isBookmarked ? "Remove Bookmark" : "Bookmark for Study"}
                    >
                      <Bookmark className={`w-4 h-4 ${isBookmarked ? 'fill-amber-400' : ''}`} />
                    </button>
                    {isCorrect ? (
                      <span className="inline-flex items-center gap-1 text-xs font-bold text-emerald-400 bg-emerald-500/10 px-2.5 py-1 rounded-full">
                        <CheckCircle2 className="w-3.5 h-3.5" /> Correct
                      </span>
                    ) : userChoice ? (
                      <span className="inline-flex items-center gap-1 text-xs font-bold text-rose-400 bg-rose-500/10 px-2.5 py-1 rounded-full">
                        <XCircle className="w-3.5 h-3.5" /> Incorrect
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1 text-xs font-bold text-amber-400 bg-amber-500/10 px-2.5 py-1 rounded-full">
                        <HelpCircle className="w-3.5 h-3.5" /> Skipped
                      </span>
                    )}
                  </div>
                </div>

                {/* Question Text */}
                <p className="text-slate-100 text-sm sm:text-base leading-relaxed mb-3 whitespace-pre-line">
                  {q.question}
                </p>

                {/* Diagram (If present) */}
                {q.diagram && <DiagramRenderer diagram={q.diagram} />}

                {/* Options Review */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 my-4">
                  {q.options.map(opt => {
                    const isUserPick = userChoice === opt.key;
                    const isAnswer = q.correctOption === opt.key;

                    let optStyle = 'bg-slate-900 border-slate-800 text-slate-300';
                    if (isAnswer) {
                      optStyle = 'bg-emerald-500/20 border-emerald-500 text-emerald-200 font-semibold';
                    } else if (isUserPick && !isCorrect) {
                      optStyle = 'bg-rose-500/20 border-rose-500 text-rose-200';
                    }

                    return (
                      <div 
                        key={opt.key}
                        className={`p-3 rounded-xl border text-xs sm:text-sm flex items-center justify-between ${optStyle}`}
                      >
                        <div className="flex items-center space-x-2">
                          <span className="font-mono font-bold">{opt.key}.</span>
                          <span>{opt.text}</span>
                        </div>
                        {isAnswer && <span className="text-[10px] font-bold uppercase text-emerald-400">Correct Answer</span>}
                        {isUserPick && !isAnswer && <span className="text-[10px] font-bold uppercase text-rose-400">Your Choice</span>}
                      </div>
                    );
                  })}
                </div>

                {/* Detailed Explanation Box */}
                <div className="bg-slate-900/90 border border-slate-800 rounded-xl p-4 text-xs sm:text-sm text-slate-300 space-y-1.5">
                  <div className="text-xs font-bold text-emerald-400 uppercase tracking-wider">
                    Official Solution & Syllabus Note:
                  </div>
                  <p className="leading-relaxed whitespace-pre-line">{q.explanation}</p>
                  {q.syllabusReference && (
                    <div className="text-[11px] text-slate-400 pt-1 italic font-mono">
                      Ref: {q.syllabusReference}
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
