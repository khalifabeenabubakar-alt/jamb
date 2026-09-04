import React from 'react';
import { 
  TrendingUp, 
  Flame, 
  Target, 
  AlertTriangle, 
  ArrowRight, 
  Clock, 
  Calendar, 
  Trophy,
  History,
  CheckCircle2,
  Zap,
  BarChart2,
  ChevronLeft
} from 'lucide-react';
import { ExamResultSummary, WeakTopicAnalysis, SubjectId } from '../types';
import { offlineDB } from '../services/db';

interface AnalyticsDashboardProps {
  onStartTargetedDrill: (topic: string, subjectId: SubjectId) => void;
  onReviewPastExam: (result: ExamResultSummary) => void;
  onStartFullMock: () => void;
  onBack?: () => void;
}

export const AnalyticsDashboard: React.FC<AnalyticsDashboardProps> = ({
  onStartTargetedDrill,
  onReviewPastExam,
  onStartFullMock,
  onBack
}) => {
  const profile = offlineDB.getStudentProfile();
  const examHistory = offlineDB.getExamHistory();
  const weakTopics = offlineDB.getWeakTopicsAnalysis();

  const totalTestsTaken = examHistory.length;
  const bestScore = examHistory.reduce((max, h) => Math.max(max, h.totalScore), 0);
  const averageScore = totalTestsTaken > 0
    ? Math.round(examHistory.reduce((sum, h) => sum + h.totalScore, 0) / totalTestsTaken)
    : 0;

  return (
    <div className="space-y-8" id="offline-analytics-dashboard-view">
      {onBack && (
        <div className="flex items-center justify-between">
          <button
            onClick={onBack}
            className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 hover:text-white rounded-xl text-xs font-bold transition flex items-center gap-1.5 border border-slate-700 cursor-pointer"
            id="btn-analytics-go-back"
          >
            <ChevronLeft className="w-4 h-4 text-emerald-400" />
            <span>Go Back to Dashboard</span>
          </button>
        </div>
      )}

      {/* ======================================================== */}
      {/* 1. TOP STATS OVERVIEW CARDS                              */}
      {/* ======================================================== */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Daily Streak Card */}
        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-5 relative overflow-hidden shadow-lg">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
              Practice Streak
            </span>
            <div className="w-8 h-8 rounded-xl bg-orange-500/20 text-orange-400 flex items-center justify-center">
              <Flame className="w-5 h-5 fill-orange-400 text-orange-400" />
            </div>
          </div>
          <div className="mt-3 flex items-baseline gap-1.5">
            <span className="text-3xl font-extrabold text-white font-mono">
              {profile.streakDays}
            </span>
            <span className="text-xs text-slate-400 font-semibold">Days Active</span>
          </div>
          <p className="text-[11px] text-slate-400 mt-1">
            Logged 100% locally on this device.
          </p>
        </div>

        {/* Target UTME Score */}
        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-5 relative overflow-hidden shadow-lg">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
              Target UTME Goal
            </span>
            <div className="w-8 h-8 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center">
              <Target className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-3 flex items-baseline gap-1.5">
            <span className="text-3xl font-extrabold text-emerald-400 font-mono">
              {profile.targetScore}
            </span>
            <span className="text-xs text-slate-400 font-semibold">/ 400</span>
          </div>
          <p className="text-[11px] text-slate-400 mt-1 truncate">
            Target: {profile.targetCourse}
          </p>
        </div>

        {/* Best Mock Score */}
        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-5 relative overflow-hidden shadow-lg">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
              Best Mock Score
            </span>
            <div className="w-8 h-8 rounded-xl bg-indigo-500/20 text-indigo-400 flex items-center justify-center">
              <Trophy className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-3 flex items-baseline gap-1.5">
            <span className="text-3xl font-extrabold text-white font-mono">
              {bestScore > 0 ? bestScore : '--'}
            </span>
            <span className="text-xs text-slate-400 font-semibold">
              {bestScore > 0 ? `/ 400` : 'Take a Mock'}
            </span>
          </div>
          <p className="text-[11px] text-slate-400 mt-1">
            Avg: <strong className="text-indigo-300 font-mono">{averageScore > 0 ? averageScore : '--'}</strong> pts across {totalTestsTaken} mocks
          </p>
        </div>

        {/* Readiness Level */}
        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-5 relative overflow-hidden shadow-lg">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
              Exam Readiness
            </span>
            <div className="w-8 h-8 rounded-xl bg-teal-500/20 text-teal-400 flex items-center justify-center">
              <Zap className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-3 flex items-baseline gap-1.5">
            <span className="text-3xl font-extrabold text-teal-400 font-mono">
              {bestScore >= 280 ? '94%' : bestScore >= 240 ? '78%' : '65%'}
            </span>
            <span className="text-xs text-slate-400 font-semibold">Prepared</span>
          </div>
          <p className="text-[11px] text-slate-400 mt-1">
            {bestScore >= 280 ? 'Tier 1 Cut-off Ready' : 'Drill weak topics to reach 290+'}
          </p>
        </div>
      </div>

      {/* ======================================================== */}
      {/* 2. WEAK TOPIC DIAGNOSTIC & REMEDIATION PLANNER           */}
      {/* ======================================================== */}
      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-6 shadow-xl">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
          <div>
            <div className="flex items-center space-x-2">
              <AlertTriangle className="w-5 h-5 text-amber-400" />
              <h3 className="text-lg font-bold text-white">
                Weak Topic Diagnostic Engine
              </h3>
            </div>
            <p className="text-xs text-slate-400 mt-0.5">
              Identifies specific topics where your accuracy is below 70% and generates targeted drill sessions.
            </p>
          </div>

          <button
            onClick={onStartFullMock}
            className="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs rounded-xl transition shadow-lg shadow-emerald-600/20 flex items-center gap-1.5"
          >
            <Zap className="w-3.5 h-3.5" />
            <span>Launch Full UTME Mock</span>
          </button>
        </div>

        {/* Weak Topic List */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {weakTopics.map(item => (
            <div 
              key={item.topic}
              className="bg-slate-950 border border-slate-800/80 hover:border-slate-700 rounded-2xl p-5 space-y-3 transition flex flex-col justify-between"
            >
              <div className="space-y-1.5">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-slate-400 font-mono uppercase">
                    {item.subjectName}
                  </span>
                  <span className={`text-xs font-mono font-bold px-2 py-0.5 rounded ${
                    item.accuracy < 45 ? 'bg-rose-500/20 text-rose-300' : 'bg-amber-500/20 text-amber-300'
                  }`}>
                    {item.accuracy}% Accuracy
                  </span>
                </div>
                <div className="text-sm font-bold text-slate-100">{item.topic}</div>
                <p className="text-xs text-slate-400 leading-relaxed">
                  {item.recommendation}
                </p>
              </div>

              <div className="pt-3 border-t border-slate-800/80 flex items-center justify-between">
                <span className="text-[11px] text-slate-400 font-mono">
                  {item.correct}/{item.attempted} Qs Correct
                </span>
                <button
                  onClick={() => onStartTargetedDrill(item.topic, item.subjectId)}
                  className="px-3 py-1.5 bg-indigo-600/30 hover:bg-indigo-600 text-indigo-200 hover:text-white rounded-lg text-xs font-semibold transition flex items-center gap-1.5"
                >
                  <span>1-Tap Drill</span>
                  <ArrowRight className="w-3 h-3" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ======================================================== */}
      {/* 3. PAST MOCK TEST LOG & SCORE HISTORY                    */}
      {/* ======================================================== */}
      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-4 shadow-xl">
        <div className="flex items-center justify-between border-b border-slate-800 pb-3">
          <div className="flex items-center space-x-2">
            <History className="w-5 h-5 text-indigo-400" />
            <h3 className="text-base font-bold text-white">
              Recent Offline Mock Test History
            </h3>
          </div>
          <span className="text-xs text-slate-400 font-mono">
            {totalTestsTaken} Tests Logged
          </span>
        </div>

        {examHistory.length > 0 ? (
          <div className="space-y-3">
            {examHistory.map(res => (
              <div 
                key={res.id}
                className="bg-slate-950 border border-slate-800 rounded-2xl p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:border-slate-700 transition"
              >
                <div className="space-y-1">
                  <div className="flex items-center space-x-2">
                    <span className="text-xs font-bold text-emerald-400 font-mono uppercase bg-emerald-500/10 px-2 py-0.5 rounded">
                      {res.examType} Mock
                    </span>
                    <span className="text-xs text-slate-400 font-mono">
                      {new Date(res.date).toLocaleDateString()} at {new Date(res.date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </span>
                  </div>
                  <div className="text-sm font-semibold text-slate-200">
                    {res.title}
                  </div>
                  <div className="flex items-center gap-3 text-xs text-slate-400 font-mono pt-0.5">
                    <span>Score: <strong className="text-white">{res.totalScore}</strong> / {res.maxScore}</span>
                    <span>•</span>
                    <span>Accuracy: {Math.round((res.totalCorrect / (res.totalQuestions || 1)) * 100)}%</span>
                  </div>
                </div>

                <button
                  onClick={() => onReviewPastExam(res)}
                  className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold rounded-xl transition flex items-center justify-center gap-1.5 self-start sm:self-center"
                >
                  <span>View Review</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            ))}
          </div>
        ) : (
          <div className="p-8 text-center text-slate-400 bg-slate-950 rounded-2xl border border-slate-800">
            <p className="text-sm">No exam sessions logged yet.</p>
            <button
              onClick={onStartFullMock}
              className="mt-3 px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs rounded-xl transition"
            >
              Start First UTME Mock Exam
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
