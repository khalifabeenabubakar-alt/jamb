import React, { useState, useEffect } from 'react';
import { 
  BookOpen, 
  Flame, 
  Target, 
  Trophy, 
  Zap, 
  GraduationCap, 
  Calculator as CalcIcon, 
  Layers, 
  FileText, 
  BarChart2, 
  Bookmark, 
  CheckCircle2, 
  AlertCircle, 
  ArrowRight, 
  Play, 
  Clock, 
  ShieldCheck, 
  Sparkles,
  Settings,
  ChevronRight,
  ChevronLeft,
  Menu,
  X,
  LayoutDashboard,
  HelpCircle,
  Award,
  BookMarked
} from 'lucide-react';
import { 
  ExamSessionState, 
  ExamResultSummary, 
  SubjectId, 
  StudentProfile, 
  Question 
} from './types';
import { offlineDB } from './services/db';
import { ALL_SUBJECTS } from './data/subjects';
import { CBTExamSimulator } from './components/CBTExamSimulator';
import { CBTResultView } from './components/CBTResultView';
import { TheoryGradingEngine } from './components/TheoryGradingEngine';
import { LiteratureHub } from './components/LiteratureHub';
import { AnalyticsDashboard } from './components/AnalyticsDashboard';
import { SubjectDrillSelector } from './components/SubjectDrillSelector';
import { CombinationModal } from './components/CombinationModal';
import { ScientificCalculator } from './components/ScientificCalculator';
import { DiagramRenderer } from './components/DiagramRenderer';
import { AdminQuestionManager } from './components/AdminQuestionManager';

type ViewType = 'home' | 'cbt_exam' | 'cbt_result' | 'subject_drill' | 'theory_grading' | 'literature' | 'analytics' | 'bookmarks' | 'admin_questions' | 'exam_instructions';

export default function App() {
  const [currentView, setCurrentView] = useState<ViewType>('home');
  const [studentProfile, setStudentProfile] = useState<StudentProfile>(offlineDB.getStudentProfile());
  const [activeSession, setActiveSession] = useState<ExamSessionState | null>(null);
  const [lastExamResult, setLastExamResult] = useState<ExamResultSummary | null>(null);
  const [showComboModal, setShowComboModal] = useState(false);
  const [showGlobalCalculator, setShowGlobalCalculator] = useState(false);
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const [savedInterruptedSession, setSavedInterruptedSession] = useState<ExamSessionState | null>(null);
  const [pendingSessionForInstructions, setPendingSessionForInstructions] = useState<ExamSessionState | null>(null);

  // Preselected drill state
  const [drillSubject, setDrillSubject] = useState<SubjectId | undefined>(undefined);
  const [drillTopic, setDrillTopic] = useState<string | undefined>(undefined);

  // Refresh profile and check for interrupted exam session on mount
  useEffect(() => {
    setStudentProfile(offlineDB.getStudentProfile());
    const saved = offlineDB.getSavedExamSession();
    if (saved && saved.questionsBySubject && Object.keys(saved.questionsBySubject).length > 0) {
      setSavedInterruptedSession(saved);
    }
  }, []);

  // Launch Full 4-Subject UTME Mock Exam with Pre-Test Instructions
  const handleLaunchFullUtmeMock = () => {
    const subjects = studentProfile.combination;
    const questionsBySubject: Record<SubjectId, Question[]> = {} as any;

    subjects.forEach((subjId) => {
      // English gets 60 questions, other 3 subjects get 40 questions each = 180 total
      const count = subjId === 'english' ? 60 : 40;
      questionsBySubject[subjId] = offlineDB.getQuestionsBySubject(subjId, count, 'UTME');
    });

    const session: ExamSessionState = {
      id: `utme-mock-${Date.now()}`,
      examType: 'UTME',
      mode: 'utme_full_mock',
      title: `JAMB UTME CBT Comprehensive Simulation (4-Subject Series)`,
      startedAt: Date.now(),
      timeLimitSeconds: 7200, // 120 minutes
      timeRemainingSeconds: 7200,
      subjects: [...subjects],
      activeSubjectIndex: 0,
      questionsBySubject,
      userAnswers: {},
      flaggedQuestions: {},
      isCompleted: false
    };

    setPendingSessionForInstructions(session);
    setCurrentView('exam_instructions');
    setMobileSidebarOpen(false);
  };

  // Start exam after confirming instructions
  const handleConfirmStartExam = () => {
    if (pendingSessionForInstructions) {
      setActiveSession(pendingSessionForInstructions);
      setPendingSessionForInstructions(null);
      setCurrentView('cbt_exam');
    }
  };

  // Resume interrupted exam session
  const handleResumeSavedSession = () => {
    if (savedInterruptedSession) {
      setActiveSession(savedInterruptedSession);
      setCurrentView('cbt_exam');
      setSavedInterruptedSession(null);
    }
  };

  const handleDiscardSavedSession = () => {
    offlineDB.clearSavedExamSession();
    setSavedInterruptedSession(null);
  };

  // Start Targeted Drill on Weak Topic
  const handleStartTargetedDrill = (topic: string, subjectId: SubjectId) => {
    setDrillSubject(subjectId);
    setDrillTopic(topic);
    setCurrentView('subject_drill');
    setMobileSidebarOpen(false);
  };

  // Start Custom Drill from SubjectDrillSelector
  const handleStartCustomDrill = (session: ExamSessionState) => {
    setActiveSession(session);
    setCurrentView('cbt_exam');
    setMobileSidebarOpen(false);
  };

  // Finish exam handler
  const handleFinishExam = (result: ExamResultSummary) => {
    offlineDB.saveExamResult(result);
    setLastExamResult(result);
    setCurrentView('cbt_result');
  };

  // Review a past exam
  const handleReviewPastExam = (result: ExamResultSummary) => {
    setLastExamResult(result);
    setCurrentView('cbt_result');
  };

  // Bookmarks View Helper
  const bookmarkedQuestions = offlineDB.getBookmarkedQuestions();
  const examHistory = offlineDB.getExamHistory();
  const lastMock = examHistory[0];
  const weakTopics = offlineDB.getWeakTopicsAnalysis();

  // If in active full-screen CBT Exam Simulator
  if (currentView === 'cbt_exam' && activeSession) {
    return (
      <CBTExamSimulator
        session={activeSession}
        onFinishExam={handleFinishExam}
        onExitExam={() => setCurrentView('home')}
      />
    );
  }

  return (
    <div className="min-h-screen bg-[#F1F5F9] text-[#1E293B] flex font-sans selection:bg-[#008751] selection:text-white" id="examsng-app-root">
      {/* ======================================================== */}
      {/* 1. GEOMETRIC BALANCE SIDEBAR (Deep Forest Green)         */}
      {/* ======================================================== */}
      
      {/* Mobile Sidebar Backdrop */}
      {mobileSidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/60 z-40 lg:hidden backdrop-blur-xs"
          onClick={() => setMobileSidebarOpen(false)}
        />
      )}

      <aside className={`w-[260px] bg-[#002D1B] text-white flex flex-col border-r border-[#004D2E] fixed lg:sticky top-0 h-screen z-50 transition-transform duration-300 ease-in-out ${
        mobileSidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
      }`}>
        {/* Brand Banner */}
        <div className="p-6 border-b border-white/10">
          <div className="flex items-center justify-between">
            <div 
              className="text-xl font-black tracking-tighter flex items-center gap-2.5 cursor-pointer"
              onClick={() => { setCurrentView('home'); setMobileSidebarOpen(false); }}
            >
              <div className="w-8 h-8 bg-[#008751] rounded-md flex items-center justify-center text-white font-extrabold shadow-md shadow-emerald-950/40">
                E
              </div>
              <span className="tracking-tight text-white font-bold">EXAMSNG</span>
            </div>

            <button 
              onClick={() => setMobileSidebarOpen(false)}
              className="lg:hidden text-white/70 hover:text-white p-1"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
          <div className="text-[10px] text-[#00A86B] mt-1.5 font-mono font-semibold flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-[#00A86B] animate-pulse"></span>
            <span>v1.0.0 • OFFLINE ENGINE</span>
          </div>
        </div>

        {/* Navigation Links */}
        <nav className="flex-1 px-3 space-y-1.5 py-4 overflow-y-auto">
          <button
            onClick={() => { setCurrentView('home'); setMobileSidebarOpen(false); }}
            className={`w-full text-left px-3.5 py-3 rounded-lg text-sm font-medium transition flex items-center gap-3 ${
              currentView === 'home'
                ? 'bg-[#008751]/25 border-l-4 border-[#008751] text-white font-semibold shadow-inner'
                : 'text-white/70 hover:bg-white/5 hover:text-white'
            }`}
            id="nav-home"
          >
            <LayoutDashboard className="w-4 h-4 text-[#00A86B]" />
            <span>Overview</span>
          </button>

          <button
            onClick={() => { setCurrentView('subject_drill'); setMobileSidebarOpen(false); }}
            className={`w-full text-left px-3.5 py-3 rounded-lg text-sm font-medium transition flex items-center gap-3 ${
              currentView === 'subject_drill'
                ? 'bg-[#008751]/25 border-l-4 border-[#008751] text-white font-semibold shadow-inner'
                : 'text-white/70 hover:bg-white/5 hover:text-white'
            }`}
            id="nav-subject-drills"
          >
            <Zap className="w-4 h-4 text-[#00A86B]" />
            <span>UTME Simulator</span>
          </button>

          <button
            onClick={() => { setCurrentView('theory_grading'); setMobileSidebarOpen(false); }}
            className={`w-full text-left px-3.5 py-3 rounded-lg text-sm font-medium transition flex items-center gap-3 ${
              currentView === 'theory_grading'
                ? 'bg-[#008751]/25 border-l-4 border-[#008751] text-white font-semibold shadow-inner'
                : 'text-white/70 hover:bg-white/5 hover:text-white'
            }`}
            id="nav-theory-grading"
          >
            <FileText className="w-4 h-4 text-[#00A86B]" />
            <span>WAEC Theory Lab</span>
          </button>

          <button
            onClick={() => { setCurrentView('literature'); setMobileSidebarOpen(false); }}
            className={`w-full text-left px-3.5 py-3 rounded-lg text-sm font-medium transition flex items-center gap-3 ${
              currentView === 'literature'
                ? 'bg-[#008751]/25 border-l-4 border-[#008751] text-white font-semibold shadow-inner'
                : 'text-white/70 hover:bg-white/5 hover:text-white'
            }`}
            id="nav-literature-hub"
          >
            <BookOpen className="w-4 h-4 text-[#00A86B]" />
            <span>Literature & Novels</span>
          </button>

          <button
            onClick={() => { setCurrentView('analytics'); setMobileSidebarOpen(false); }}
            className={`w-full text-left px-3.5 py-3 rounded-lg text-sm font-medium transition flex items-center gap-3 ${
              currentView === 'analytics'
                ? 'bg-[#008751]/25 border-l-4 border-[#008751] text-white font-semibold shadow-inner'
                : 'text-white/70 hover:bg-white/5 hover:text-white'
            }`}
            id="nav-analytics"
          >
            <BarChart2 className="w-4 h-4 text-[#00A86B]" />
            <span>Performance Tracking</span>
          </button>

          <button
            onClick={() => { setCurrentView('bookmarks'); setMobileSidebarOpen(false); }}
            className={`w-full text-left px-3.5 py-3 rounded-lg text-sm font-medium transition flex items-center justify-between ${
              currentView === 'bookmarks'
                ? 'bg-[#008751]/25 border-l-4 border-[#008751] text-white font-semibold shadow-inner'
                : 'text-white/70 hover:bg-white/5 hover:text-white'
            }`}
            id="nav-bookmarks"
          >
            <div className="flex items-center gap-3">
              <Bookmark className="w-4 h-4 text-[#00A86B]" />
              <span>Bookmarks</span>
            </div>
            {bookmarkedQuestions.length > 0 && (
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-[#008751] text-white">
                {bookmarkedQuestions.length}
              </span>
            )}
          </button>

          <button
            onClick={() => { setCurrentView('admin_questions'); setMobileSidebarOpen(false); }}
            className={`w-full text-left px-3.5 py-3 rounded-lg text-sm font-medium transition flex items-center gap-3 ${
              currentView === 'admin_questions'
                ? 'bg-[#008751]/25 border-l-4 border-[#008751] text-white font-semibold shadow-inner'
                : 'text-white/70 hover:bg-white/5 hover:text-white'
            }`}
            id="nav-admin-questions"
          >
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span>Admin Portal</span>
          </button>
        </nav>

        {/* Candidate Profile at Bottom */}
        <div className="p-5 border-t border-white/10 bg-[#002214]/60">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-slate-700 border-2 border-[#008751] flex items-center justify-center text-sm font-bold text-emerald-300">
                {studentProfile.name.slice(0, 2).toUpperCase()}
              </div>
              <div>
                <div className="text-xs font-bold text-white truncate max-w-[110px]">
                  {studentProfile.name}
                </div>
                <div className="text-[10px] text-white/60 font-mono">
                  Target: {studentProfile.targetScore}+
                </div>
              </div>
            </div>

            <button
              onClick={() => setShowComboModal(true)}
              className="p-1.5 rounded-lg text-white/60 hover:text-white hover:bg-white/10 transition"
              title="Edit Profile & 4-Subject Combination"
              id="btn-sidebar-profile-edit"
            >
              <Settings className="w-4 h-4" />
            </button>
          </div>
        </div>
      </aside>

      {/* ======================================================== */}
      {/* 2. MAIN CONTENT AREA                                     */}
      {/* ======================================================== */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top Header */}
        <header className="h-20 bg-white border-b border-slate-200 px-4 sm:px-8 flex justify-between items-center sticky top-0 z-30 shadow-xs">
          <div className="flex items-center gap-3 sm:gap-5">
            <button
              onClick={() => setMobileSidebarOpen(true)}
              className="lg:hidden p-2 rounded-lg bg-slate-100 text-slate-700 hover:bg-slate-200"
            >
              <Menu className="w-5 h-5" />
            </button>

            {/* Go Back button if outside home dashboard */}
            {currentView !== 'home' && (
              <button
                onClick={() => setCurrentView('home')}
                className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-800 rounded-xl text-xs font-bold transition flex items-center gap-1.5 border border-slate-200 cursor-pointer shadow-xs"
                title="Go back to Student Dashboard"
                id="btn-global-header-back"
              >
                <ChevronLeft className="w-4 h-4 text-[#008751]" />
                <span className="hidden sm:inline">Back to Dashboard</span>
                <span className="sm:hidden">Back</span>
              </button>
            )}

            <div>
              <h1 className="text-lg sm:text-xl font-bold text-[#1E293B] tracking-tight">
                {currentView === 'home' && 'Student Dashboard'}
                {currentView === 'subject_drill' && 'UTME Subject & Topic Drills'}
                {currentView === 'theory_grading' && 'WAEC & NECO Theory Lab'}
                {currentView === 'literature' && 'Literature & Assigned Novels'}
                {currentView === 'analytics' && 'Performance & Weak Topic Diagnostics'}
                {currentView === 'bookmarks' && 'Bookmarked Revision Bank'}
                {currentView === 'cbt_result' && 'Exam Performance Review'}
                {currentView === 'admin_questions' && 'Question Management System'}
                {currentView === 'exam_instructions' && 'Pre-Examination Instructions'}
              </h1>
            </div>

            <div className="hidden md:block h-5 w-[1px] bg-slate-200"></div>

            <div className="hidden md:flex items-center gap-2">
              <div className="w-2.5 h-2.5 rounded-full bg-emerald-500"></div>
              <span className="text-xs font-semibold text-emerald-700 font-mono">
                LOCAL DATABASE LOADED (2000-2027)
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2 sm:gap-4">
            {/* Streak Badge */}
            <div className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 bg-orange-50 border border-orange-200 rounded-lg text-orange-700 text-xs font-bold font-mono">
              <Flame className="w-4 h-4 fill-orange-500 text-orange-500" />
              <span>{studentProfile.streakDays}d Streak</span>
            </div>

            {/* Scientific Calculator Launch */}
            <button
              onClick={() => setShowGlobalCalculator(true)}
              className="p-2 sm:px-3 sm:py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 border border-slate-200 rounded-lg text-xs font-bold transition flex items-center gap-1.5"
              title="Open Scientific Calculator"
              id="btn-header-calc"
            >
              <CalcIcon className="w-4 h-4 text-emerald-700" />
              <span className="hidden sm:inline">Calculator</span>
            </button>

            {/* Launch Full Mock CTA */}
            <button
              onClick={handleLaunchFullUtmeMock}
              className="px-4 py-2 bg-[#008751] hover:bg-[#007043] text-white rounded-lg text-xs sm:text-sm font-bold shadow-lg shadow-emerald-900/20 transition cursor-pointer flex items-center gap-2"
              id="btn-header-start-mock"
            >
              <Play className="w-3.5 h-3.5 fill-white" />
              <span>START FULL MOCK</span>
            </button>
          </div>
        </header>

        {/* Content Body Router */}
        <main className="flex-1 p-4 sm:p-8 max-w-7xl w-full mx-auto">
          {/* VIEW: RESULT VIEW */}
          {currentView === 'cbt_result' && lastExamResult && (
            <CBTResultView
              result={lastExamResult}
              questionsBySubject={activeSession?.questionsBySubject}
              userAnswers={activeSession?.userAnswers}
              onRetake={handleLaunchFullUtmeMock}
              onDrillWeakTopic={handleStartTargetedDrill}
              onGoHome={() => setCurrentView('home')}
            />
          )}

          {/* VIEW: SUBJECT DRILL */}
          {currentView === 'subject_drill' && (
            <SubjectDrillSelector
              onStartDrill={handleStartCustomDrill}
              preselectedSubject={drillSubject}
              preselectedTopic={drillTopic}
              onBack={() => setCurrentView('home')}
            />
          )}

          {/* VIEW: WAEC THEORY LAB */}
          {currentView === 'theory_grading' && (
            <TheoryGradingEngine
              onBack={() => setCurrentView('home')}
            />
          )}

          {/* VIEW: LITERATURE HUB */}
          {currentView === 'literature' && (
            <LiteratureHub
              onBack={() => setCurrentView('home')}
            />
          )}

          {/* VIEW: ANALYTICS DASHBOARD */}
          {currentView === 'analytics' && (
            <AnalyticsDashboard
              onStartTargetedDrill={handleStartTargetedDrill}
              onReviewPastExam={handleReviewPastExam}
              onStartFullMock={handleLaunchFullUtmeMock}
              onBack={() => setCurrentView('home')}
            />
          )}

          {/* VIEW: BOOKMARKS */}
          {currentView === 'bookmarks' && (
            <div className="space-y-6">
              <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-600 border border-amber-200 flex items-center justify-center">
                    <Bookmark className="w-5 h-5 fill-amber-500" />
                  </div>
                  <div>
                    <h2 className="text-xl font-bold text-[#1E293B]">
                      Bookmarked Revision Bank
                    </h2>
                    <p className="text-xs text-slate-500">
                      Questions saved during mock simulations for targeted offline review
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => setCurrentView('home')}
                    className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-bold transition flex items-center gap-1 border border-slate-200 cursor-pointer"
                    id="btn-bookmarks-back"
                  >
                    <ChevronLeft className="w-4 h-4 text-[#008751]" />
                    <span>Go Back</span>
                  </button>
                  <div className="text-xs font-mono font-bold text-slate-600 bg-slate-100 px-3 py-1.5 rounded-lg border border-slate-200">
                    {bookmarkedQuestions.length} Items Saved
                  </div>
                </div>
              </div>

              {bookmarkedQuestions.length > 0 ? (
                <div className="space-y-4">
                  {bookmarkedQuestions.map((q) => (
                    <div key={q.id} className="bg-white border border-slate-200 rounded-2xl p-6 space-y-3 shadow-sm">
                      <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                        <span className="text-xs font-mono font-bold text-[#008751] uppercase">
                          {q.subjectId} ({q.year}) • Topic: {q.topic}
                        </span>
                        <button
                          onClick={() => {
                            offlineDB.toggleBookmark(q.id);
                            setStudentProfile(offlineDB.getStudentProfile());
                          }}
                          className="text-xs text-rose-600 hover:text-rose-700 font-semibold"
                        >
                          Remove Bookmark
                        </button>
                      </div>

                      <p className="text-sm text-slate-800 whitespace-pre-line leading-relaxed font-medium">
                        {q.question}
                      </p>

                      {q.diagram && <DiagramRenderer diagram={q.diagram} />}

                      <div className="bg-emerald-50/70 p-4 rounded-xl border border-emerald-100 text-xs space-y-1">
                        <div className="font-bold text-[#008751]">Correct Option: ({q.correctOption})</div>
                        <p className="text-slate-700 leading-relaxed">{q.explanation}</p>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="bg-white border border-slate-200 rounded-2xl p-12 text-center text-slate-500">
                  No bookmarked questions yet. Click the bookmark icon during exam reviews to pin challenging questions here.
                </div>
              )}
            </div>
          )}

          {/* VIEW: ADMIN QUESTION MANAGEMENT */}
          {currentView === 'admin_questions' && (
            <AdminQuestionManager onBack={() => setCurrentView('home')} />
          )}

          {/* VIEW: EXAM INSTRUCTIONS BEFORE TEST STARTS */}
          {currentView === 'exam_instructions' && pendingSessionForInstructions && (
            <div className="max-w-3xl mx-auto bg-white border border-slate-200 rounded-3xl p-6 sm:p-10 shadow-xl space-y-6" id="exam-instructions-view">
              <div className="border-b border-slate-100 pb-5 flex items-center justify-between">
                <div>
                  <span className="px-3 py-1 bg-emerald-50 text-[#008751] font-mono text-xs font-bold rounded-full border border-emerald-200">
                    EXAMINATION BRIEFING & RULES
                  </span>
                  <h2 className="text-xl sm:text-2xl font-black text-slate-900 mt-2">
                    {pendingSessionForInstructions.title}
                  </h2>
                </div>
                <button
                  onClick={() => {
                    setPendingSessionForInstructions(null);
                    setCurrentView('home');
                  }}
                  className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-bold transition flex items-center gap-1 border border-slate-200"
                >
                  <ChevronLeft className="w-4 h-4 text-[#008751]" />
                  <span>Cancel</span>
                </button>
              </div>

              {/* Exam Specs Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100 text-center">
                  <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">EXAM BODY</div>
                  <div className="text-base font-bold text-slate-900">{pendingSessionForInstructions.examType}</div>
                </div>
                <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100 text-center">
                  <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">QUESTIONS</div>
                  <div className="text-base font-bold text-[#008751]">180 Questions</div>
                </div>
                <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100 text-center">
                  <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">DURATION</div>
                  <div className="text-base font-bold text-slate-900">120 Minutes</div>
                </div>
                <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100 text-center">
                  <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">MAX SCORE</div>
                  <div className="text-base font-bold text-slate-900">400 Marks</div>
                </div>
              </div>

              {/* Subjects in this paper */}
              <div className="p-4 bg-emerald-50/60 rounded-2xl border border-emerald-100">
                <div className="text-xs font-bold text-[#008751] uppercase tracking-wider mb-2">
                  Paper Subjects Breakdown:
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-slate-700">
                  {pendingSessionForInstructions.subjects.map((sId, idx) => {
                    const sMeta = ALL_SUBJECTS.find(s => s.id === sId);
                    const qCount = sId === 'english' ? 60 : 40;
                    return (
                      <div key={sId} className="flex justify-between p-2 bg-white rounded-lg border border-emerald-100">
                        <span className="font-semibold">{idx + 1}. {sMeta?.name}</span>
                        <span className="font-mono font-bold text-emerald-800">{qCount} Questions</span>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Instructions list */}
              <div className="space-y-3 text-xs sm:text-sm text-slate-600 leading-relaxed">
                <h3 className="font-bold text-slate-900 uppercase tracking-wider text-xs">
                  Important Testing Regulations:
                </h3>
                <ul className="space-y-2 list-disc list-inside">
                  <li><strong>Automatic Saving:</strong> Every answer selected is saved instantly in your browser storage. If your device sleeps or the tab reloads, your progress is kept.</li>
                  <li><strong>8-Key Navigation:</strong> You can use standard CBT keyboard shortcuts: press keys <code className="bg-slate-100 px-1 py-0.5 rounded font-mono font-bold">A, B, C, D</code> to select options, <code className="bg-slate-100 px-1 py-0.5 rounded font-mono font-bold">N</code> for next, <code className="bg-slate-100 px-1 py-0.5 rounded font-mono font-bold">P</code> for previous, and <code className="bg-slate-100 px-1 py-0.5 rounded font-mono font-bold">R</code> to flag.</li>
                  <li><strong>Scientific Calculator:</strong> An approved on-screen scientific calculator is available at the top right of the testing screen.</li>
                  <li><strong>Auto-Submission:</strong> When the countdown timer reaches 00:00:00, the examination will submit automatically. You can also review and submit manually at any time.</li>
                  <li><strong>100% Free:</strong> Full comprehensive results, step-by-step worked solutions, and Nigerian university cut-off benchmarks will be displayed immediately upon completion.</li>
                </ul>
              </div>

              {/* Start Confirmation CTA */}
              <div className="pt-4 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-4">
                <span className="text-xs text-slate-500 font-medium">
                  Ensure you are seated and ready before starting the clock.
                </span>
                <button
                  onClick={handleConfirmStartExam}
                  className="w-full sm:w-auto px-8 py-3 bg-[#008751] hover:bg-[#007043] text-white font-bold text-sm rounded-xl transition shadow-lg shadow-emerald-950/20 flex items-center justify-center gap-2 cursor-pointer"
                  id="btn-confirm-start-exam"
                >
                  <Play className="w-4 h-4 fill-white" />
                  <span>I AM READY — START EXAMINATION</span>
                </button>
              </div>
            </div>
          )}

          {/* VIEW: HOME DASHBOARD (Geometric Balance Architecture) */}
          {currentView === 'home' && (
            <div className="space-y-6" id="geometric-dashboard">
              {/* Interrupted Exam Session Recovery Banner */}
              {savedInterruptedSession && (
                <div className="p-4 sm:p-5 bg-amber-50 border border-amber-300 rounded-2xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shadow-sm animate-in fade-in">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-amber-500 text-white flex items-center justify-center flex-shrink-0 shadow-sm">
                      <Clock className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="text-xs font-bold text-amber-900 uppercase tracking-wider">
                        Unfinished Examination Found
                      </div>
                      <div className="text-sm font-bold text-slate-800">
                        {savedInterruptedSession.title} ({Math.round(savedInterruptedSession.timeRemainingSeconds / 60)} mins remaining)
                      </div>
                      <div className="text-xs text-slate-600 mt-0.5">
                        Your previous testing answers are safely saved. You can resume right where you stopped.
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 self-end sm:self-center">
                    <button
                      onClick={handleDiscardSavedSession}
                      className="px-3 py-2 text-xs font-bold text-slate-600 hover:text-rose-600 hover:bg-white/80 rounded-xl transition cursor-pointer"
                    >
                      Discard
                    </button>
                    <button
                      onClick={handleResumeSavedSession}
                      className="px-5 py-2 bg-[#008751] hover:bg-[#007043] text-white font-bold text-xs rounded-xl transition shadow-md shadow-emerald-950/20 cursor-pointer flex items-center gap-1.5"
                      id="btn-resume-exam"
                    >
                      <Play className="w-3.5 h-3.5 fill-white" />
                      <span>Resume Examination</span>
                    </button>
                  </div>
                </div>
              )}

              {/* ROW 1: Combination & Metrics Card + Dark Exam Readiness Card */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                {/* 8-col Card: Current Test Combination & Metrics */}
                <div className="lg:col-span-8 bg-white border border-slate-200 rounded-2xl p-6 sm:p-7 flex flex-col justify-between shadow-sm">
                  <div>
                    <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                      <div>
                        <h2 className="text-xs font-bold text-slate-400 uppercase tracking-widest">
                          Current Test Combination
                        </h2>
                        <div className="flex flex-wrap gap-2 mt-3">
                          {studentProfile.combination.map(subjId => {
                            const sub = ALL_SUBJECTS.find(s => s.id === subjId);
                            return (
                              <span 
                                key={subjId} 
                                className="px-3 py-1 bg-slate-100 text-slate-800 rounded-full text-xs font-bold border border-slate-200"
                              >
                                {sub?.name} ({sub?.shortName})
                              </span>
                            );
                          })}
                        </div>
                      </div>

                      <div className="sm:text-right">
                        <div className="text-3xl sm:text-4xl font-black text-[#008751]">
                          {lastMock ? lastMock.totalScore : studentProfile.targetScore}
                        </div>
                        <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                          {lastMock ? 'LAST MOCK SCORE' : 'TARGET UTME SCORE'}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* 4 Metric Boxes */}
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 mt-6 pt-6 border-t border-slate-100">
                    <div className="p-4 bg-slate-50 rounded-xl border border-slate-100">
                      <div className="text-[10px] text-slate-400 font-bold mb-1 uppercase tracking-wider">
                        AVG TIME / Q
                      </div>
                      <div className="text-lg font-bold text-[#1E293B]">
                        42s
                      </div>
                    </div>

                    <div className="p-4 bg-slate-50 rounded-xl border border-slate-100">
                      <div className="text-[10px] text-slate-400 font-bold mb-1 uppercase tracking-wider">
                        STREAK
                      </div>
                      <div className="text-lg font-bold text-[#1E293B]">
                        {studentProfile.streakDays} Days
                      </div>
                    </div>

                    <div className="p-4 bg-slate-50 rounded-xl border border-slate-100">
                      <div className="text-[10px] text-slate-400 font-bold mb-1 uppercase tracking-wider">
                        WEAK SUBJECT
                      </div>
                      <div className="text-lg font-bold text-red-600 truncate">
                        {weakTopics[0]?.subjectName || 'Physics'}
                      </div>
                    </div>

                    <div className="p-4 bg-slate-50 rounded-xl border border-slate-100">
                      <div className="text-[10px] text-slate-400 font-bold mb-1 uppercase tracking-wider">
                        RESOURCES
                      </div>
                      <div className="text-lg font-bold text-[#1E293B]">
                        27k+ Qs
                      </div>
                    </div>
                  </div>
                </div>

                {/* 4-col Card: Geometric Dark Exam Readiness Card */}
                <div className="lg:col-span-4 bg-[#1E293B] rounded-2xl p-6 text-white shadow-md flex flex-col justify-between">
                  <div>
                    <h2 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4">
                      Exam Readiness
                    </h2>

                    {/* Circular Readiness Gauge */}
                    <div className="flex justify-center items-center py-2">
                      <div className="relative w-24 h-24">
                        <svg className="w-full h-full transform -rotate-90">
                          <circle 
                            cx="48" 
                            cy="48" 
                            r="40" 
                            stroke="currentColor" 
                            strokeWidth="8" 
                            fill="transparent" 
                            className="text-slate-700" 
                          />
                          <circle 
                            cx="48" 
                            cy="48" 
                            r="40" 
                            stroke="currentColor" 
                            strokeWidth="8" 
                            fill="transparent" 
                            strokeDasharray="251" 
                            strokeDashoffset="45" 
                            strokeLinecap="round"
                            className="text-[#00A86B]" 
                          />
                        </svg>
                        <div className="absolute inset-0 flex items-center justify-center text-2xl font-black">
                          82%
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="mt-4 space-y-3">
                    <div>
                      <div className="flex justify-between text-xs font-semibold mb-1">
                        <span className="text-slate-300">Content Coverage</span>
                        <span className="text-blue-400">94%</span>
                      </div>
                      <div className="h-1.5 w-full bg-slate-700 rounded-full overflow-hidden">
                        <div className="h-full bg-blue-400 w-[94%] rounded-full"></div>
                      </div>
                    </div>

                    <div>
                      <div className="flex justify-between text-xs font-semibold mb-1">
                        <span className="text-slate-300">Speed Score</span>
                        <span className="text-amber-400">71%</span>
                      </div>
                      <div className="h-1.5 w-full bg-slate-700 rounded-full overflow-hidden">
                        <div className="h-full bg-amber-400 w-[71%] rounded-full"></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* ROW 2: WAEC Theory Prep Card + Toolbox & Local Assets */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                {/* 4-col Card: WAEC Theory Prep */}
                <div className="lg:col-span-4 bg-white border border-slate-200 rounded-2xl p-6 shadow-sm flex flex-col justify-between">
                  <div>
                    <h2 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4">
                      WAEC Theory Prep
                    </h2>
                    <div className="space-y-3">
                      <div className="p-3 bg-emerald-50 rounded-xl border border-emerald-100 flex justify-between items-center">
                        <div>
                          <div className="text-xs font-bold text-slate-800">Biology Essay (2024)</div>
                          <div className="text-[10px] text-slate-500">Method & Accuracy Scored</div>
                        </div>
                        <span className="text-xs font-black text-[#008751] px-2 py-0.5 bg-emerald-100 rounded">
                          A1
                        </span>
                      </div>

                      <div className="p-3 bg-slate-50 rounded-xl border border-slate-100 flex justify-between items-center">
                        <div>
                          <div className="text-xs font-bold text-slate-800">Mathematics Theory (2023)</div>
                          <div className="text-[10px] text-slate-500">Self-Grading Pending</div>
                        </div>
                        <span className="text-xs font-bold text-slate-400">--</span>
                      </div>
                    </div>
                  </div>

                  <button 
                    onClick={() => setCurrentView('theory_grading')}
                    className="w-full py-2.5 border-2 border-dashed border-slate-200 hover:border-[#008751] hover:text-[#008751] rounded-xl text-xs font-bold text-slate-500 mt-4 transition cursor-pointer"
                    id="btn-new-theory-session"
                  >
                    + NEW THEORY SESSION
                  </button>
                </div>

                {/* 8-col Card: Toolbox & Local Assets */}
                <div className="lg:col-span-8 bg-white border border-slate-200 rounded-2xl p-6 shadow-sm flex flex-col justify-between">
                  <div>
                    <div className="flex justify-between items-center mb-5">
                      <h2 className="text-xs font-bold text-slate-400 uppercase tracking-widest">
                        Toolbox & Local Assets
                      </h2>
                      <span className="text-[10px] font-mono text-slate-400 font-bold hidden sm:inline">
                        SCIENTIFIC CALCULATOR | DIAGRAMS | NOVELS
                      </span>
                    </div>

                    <div className="grid grid-cols-3 gap-3 sm:gap-4">
                      <div 
                        onClick={() => setShowGlobalCalculator(true)}
                        className="aspect-video bg-[#F1F5F9] rounded-xl flex flex-col items-center justify-center gap-2 border border-slate-200/80 cursor-pointer hover:border-[#008751] hover:bg-emerald-50/40 transition group"
                        id="toolbox-calculator"
                      >
                        <CalcIcon className="w-6 h-6 text-slate-500 group-hover:text-[#008751] transition" />
                        <span className="text-xs font-bold text-slate-700 group-hover:text-[#008751]">Calculator</span>
                      </div>

                      <div 
                        onClick={() => setCurrentView('subject_drill')}
                        className="aspect-video bg-[#F1F5F9] rounded-xl flex flex-col items-center justify-center gap-2 border border-slate-200/80 cursor-pointer hover:border-[#008751] hover:bg-emerald-50/40 transition group"
                        id="toolbox-diagrams"
                      >
                        <Layers className="w-6 h-6 text-slate-500 group-hover:text-[#008751] transition" />
                        <span className="text-xs font-bold text-slate-700 group-hover:text-[#008751]">Diagram Library</span>
                      </div>

                      <div 
                        onClick={() => setCurrentView('literature')}
                        className="aspect-video bg-[#F1F5F9] rounded-xl flex flex-col items-center justify-center gap-2 border border-slate-200/80 cursor-pointer hover:border-[#008751] hover:bg-emerald-50/40 transition group"
                        id="toolbox-novels"
                      >
                        <BookOpen className="w-6 h-6 text-slate-500 group-hover:text-[#008751] transition" />
                        <span className="text-xs font-bold text-slate-700 group-hover:text-[#008751]">Novels Guide</span>
                      </div>
                    </div>
                  </div>

                  <div className="mt-4 flex items-center gap-2 bg-emerald-50 p-3 rounded-xl border border-emerald-100">
                    <div className="w-2 h-2 rounded-full bg-[#008751] animate-pulse"></div>
                    <p className="text-xs text-emerald-800 font-medium">
                      <strong>TIP:</strong> Use the Offline Literature section to study characters from <em>"The Lekki Headmaster"</em> and <em>"The Life Changer"</em>.
                    </p>
                  </div>
                </div>
              </div>

              {/* ROW 3: Weak Topics Remediation Bar */}
              {weakTopics.length > 0 && (
                <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm space-y-4">
                  <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                    <div className="flex items-center gap-2">
                      <BarChart2 className="w-4 h-4 text-[#008751]" />
                      <h3 className="text-xs font-bold text-slate-500 uppercase tracking-widest">
                        Diagnostic Accuracy & Weak Topics
                      </h3>
                    </div>
                    <button
                      onClick={() => setCurrentView('analytics')}
                      className="text-xs text-[#008751] hover:text-[#007043] font-bold"
                    >
                      View Full Analytics →
                    </button>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    {weakTopics.slice(0, 3).map(w => (
                      <div key={w.topic} className="bg-slate-50 p-4 rounded-xl border border-slate-100 space-y-2">
                        <div className="flex items-center justify-between text-xs">
                          <span className="font-mono font-bold text-slate-500 uppercase">{w.subjectName}</span>
                          <span className="text-amber-600 font-mono font-bold">{w.accuracy}%</span>
                        </div>
                        <div className="text-sm font-bold text-slate-800">{w.topic}</div>
                        <button
                          onClick={() => handleStartTargetedDrill(w.topic, w.subjectId)}
                          className="text-xs text-[#008751] hover:text-[#007043] font-bold flex items-center gap-1 pt-1"
                        >
                          <span>Drill Topic</span>
                          <ArrowRight className="w-3 h-3" />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* ROW 4: 4 Quick Navigation Hub Cards (Start Practice, Mock Exam, Subjects, Results) */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <div 
                  onClick={handleLaunchFullUtmeMock}
                  className="p-5 bg-gradient-to-br from-[#008751] to-[#005c36] text-white rounded-2xl shadow-sm hover:shadow-md transition cursor-pointer flex flex-col justify-between group"
                  id="card-launch-mock"
                >
                  <div>
                    <div className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center mb-3">
                      <Play className="w-5 h-5 fill-white text-white" />
                    </div>
                    <div className="text-sm font-bold">Mock Examination</div>
                    <p className="text-xs text-white/80 mt-1 leading-relaxed">
                      180 questions, 120-minute unified 4-subject JAMB UTME simulation with 8-key shortcuts.
                    </p>
                  </div>
                  <div className="mt-4 pt-3 border-t border-white/20 text-xs font-bold flex items-center justify-between">
                    <span>Launch 4-Subject Mock</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition" />
                  </div>
                </div>

                <div 
                  onClick={() => setCurrentView('subject_drill')}
                  className="p-5 bg-white border border-slate-200 rounded-2xl shadow-sm hover:border-[#008751] transition cursor-pointer flex flex-col justify-between group"
                  id="card-start-practice"
                >
                  <div>
                    <div className="w-10 h-10 rounded-xl bg-emerald-50 text-[#008751] flex items-center justify-center mb-3 border border-emerald-200">
                      <Zap className="w-5 h-5" />
                    </div>
                    <div className="text-sm font-bold text-slate-900">Start Practice</div>
                    <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                      Custom practice drills filtered by examination body, specific subject, topic, and past year.
                    </p>
                  </div>
                  <div className="mt-4 pt-3 border-t border-slate-100 text-xs font-bold text-[#008751] flex items-center justify-between">
                    <span>Customize Drill</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition" />
                  </div>
                </div>

                <div 
                  onClick={() => setCurrentView('theory_grading')}
                  className="p-5 bg-white border border-slate-200 rounded-2xl shadow-sm hover:border-indigo-500 transition cursor-pointer flex flex-col justify-between group"
                  id="card-theory-lab"
                >
                  <div>
                    <div className="w-10 h-10 rounded-xl bg-indigo-50 text-indigo-700 flex items-center justify-center mb-3 border border-indigo-200">
                      <FileText className="w-5 h-5" />
                    </div>
                    <div className="text-sm font-bold text-slate-900">WAEC Theory Lab</div>
                    <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                      Authentic marking schemes with Method (M), Accuracy (A), and Bonus (B) rubrics.
                    </p>
                  </div>
                  <div className="mt-4 pt-3 border-t border-slate-100 text-xs font-bold text-indigo-700 flex items-center justify-between">
                    <span>Open Theory Studio</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition" />
                  </div>
                </div>

                <div 
                  onClick={() => setCurrentView('analytics')}
                  className="p-5 bg-white border border-slate-200 rounded-2xl shadow-sm hover:border-sky-500 transition cursor-pointer flex flex-col justify-between group"
                  id="card-analytics-results"
                >
                  <div>
                    <div className="w-10 h-10 rounded-xl bg-sky-50 text-sky-700 flex items-center justify-center mb-3 border border-sky-200">
                      <BarChart2 className="w-5 h-5" />
                    </div>
                    <div className="text-sm font-bold text-slate-900">Results & Analytics</div>
                    <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                      Exam history, accuracy tracking, score progression, and admission benchmarks.
                    </p>
                  </div>
                  <div className="mt-4 pt-3 border-t border-slate-100 text-xs font-bold text-sky-700 flex items-center justify-between">
                    <span>Review Analytics</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition" />
                  </div>
                </div>
              </div>

              {/* 100% Free Forever Notice */}
              <div className="p-4 bg-emerald-50/70 border border-emerald-200/80 rounded-2xl flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-[#008751] text-white flex items-center justify-center font-bold text-xs flex-shrink-0">
                  FREE
                </div>
                <div className="text-xs text-slate-700">
                  <strong className="text-[#008751]">100% Free For All Nigerian Students:</strong> No subscriptions, activation codes, or paywalls required. Access complete past questions, explanations, full mock exams, theory marking schemes, and novels at zero cost.
                </div>
              </div>
            </div>
          )}
        </main>

        {/* Global Footer */}
        <footer className="bg-white border-t border-slate-200 py-5 px-6 text-center text-xs text-slate-500 mt-auto">
          <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2 font-mono">
            <span>EXAMSNG • Geometric Balance Offline CBT Engine</span>
            <span className="text-[#008751] font-semibold">100% Offline SQLite Cache Active</span>
          </div>
        </footer>
      </div>

      {/* ======================================================== */}
      {/* 3. MODALS                                                */}
      {/* ======================================================== */}
      <CombinationModal
        isOpen={showComboModal}
        onClose={() => setShowComboModal(false)}
        onProfileUpdated={updated => setStudentProfile(updated)}
      />

      <ScientificCalculator
        isOpen={showGlobalCalculator}
        onClose={() => setShowGlobalCalculator(false)}
      />
    </div>
  );
}

