import React, { useState } from 'react';
import { 
  BookOpen, 
  Layers, 
  Calendar, 
  Clock, 
  HelpCircle, 
  Play, 
  Filter, 
  Sparkles,
  Zap,
  CheckCircle2,
  ChevronLeft
} from 'lucide-react';
import { ExamType, SubjectId, ExamSessionState, Question } from '../types';
import { ALL_SUBJECTS } from '../data/subjects';
import { offlineDB } from '../services/db';

interface SubjectDrillSelectorProps {
  onStartDrill: (session: ExamSessionState) => void;
  preselectedSubject?: SubjectId;
  preselectedTopic?: string;
  onBack?: () => void;
}

export const SubjectDrillSelector: React.FC<SubjectDrillSelectorProps> = ({
  onStartDrill,
  preselectedSubject,
  preselectedTopic,
  onBack
}) => {
  const [examType, setExamType] = useState<ExamType>('UTME');
  const [selectedSubjectId, setSelectedSubjectId] = useState<SubjectId>(preselectedSubject || 'mathematics');
  const [selectedTopic, setSelectedTopic] = useState<string>(preselectedTopic || 'all');
  const [selectedYear, setSelectedYear] = useState<number>(0); // 0 = all years
  const [questionCount, setQuestionCount] = useState<number>(20);
  const [isTimed, setIsTimed] = useState<boolean>(true);

  const subjectMeta = ALL_SUBJECTS.find(s => s.id === selectedSubjectId) || ALL_SUBJECTS[0];

  const handleLaunchDrill = () => {
    const questions = offlineDB.getQuestionsBySubject(
      selectedSubjectId,
      questionCount,
      examType,
      selectedTopic !== 'all' ? selectedTopic : undefined,
      selectedYear > 0 ? selectedYear : undefined
    );

    const questionsBySubject: Record<SubjectId, Question[]> = {
      [selectedSubjectId]: questions
    } as any;

    const timeLimitMinutes = isTimed ? Math.max(10, Math.round(questionCount * 1.2)) : 3600;

    const session: ExamSessionState = {
      id: `drill-${Date.now()}`,
      examType,
      mode: 'single_subject',
      title: `${examType} ${subjectMeta.name} ${selectedTopic !== 'all' ? `(${selectedTopic})` : 'Practice'}`,
      startedAt: Date.now(),
      timeLimitSeconds: timeLimitMinutes * 60,
      timeRemainingSeconds: timeLimitMinutes * 60,
      subjects: [selectedSubjectId],
      activeSubjectIndex: 0,
      questionsBySubject,
      userAnswers: {},
      flaggedQuestions: {},
      isCompleted: false
    };

    onStartDrill(session);
  };

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-6 max-w-4xl mx-auto shadow-2xl" id="subject-drill-selector-view">
      {/* Header */}
      <div className="border-b border-slate-800 pb-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold font-mono tracking-wider bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 mb-2">
            <Zap className="w-3.5 h-3.5" />
            Targeted Subject & Topic Practice
          </span>
          <h2 className="text-xl sm:text-2xl font-extrabold text-white">
            Single Subject Mastery Engine
          </h2>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Customize exam type, specific syllabus topics, past question years, and timed conditions.
          </p>
        </div>

        {onBack && (
          <button
            onClick={onBack}
            className="self-start sm:self-center px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 hover:text-white rounded-xl text-xs font-bold transition flex items-center gap-1.5 border border-slate-700 cursor-pointer flex-shrink-0"
            id="btn-drill-go-back"
          >
            <ChevronLeft className="w-4 h-4 text-emerald-400" />
            <span>Go Back</span>
          </button>
        )}
      </div>

      {/* Step 1: Select Exam Body */}
      <div className="space-y-2">
        <label className="text-xs font-bold uppercase tracking-wider text-slate-400">
          1. Select Examination Body
        </label>
        <div className="grid grid-cols-3 gap-2.5">
          {(['UTME', 'WAEC', 'NECO'] as ExamType[]).map(type => (
            <button
              key={type}
              onClick={() => setExamType(type)}
              className={`py-3 px-4 rounded-2xl text-xs font-bold transition border flex items-center justify-center space-x-2 cursor-pointer ${
                examType === type
                  ? 'bg-emerald-500/20 border-emerald-500 text-emerald-300 shadow-md shadow-emerald-500/10'
                  : 'bg-slate-950 border-slate-800 text-slate-300 hover:bg-slate-800'
              }`}
            >
              <span>{type === 'UTME' ? 'JAMB UTME' : type === 'WAEC' ? 'WAEC SSCE' : 'NECO SSCE'}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Step 2: Select Subject */}
      <div className="space-y-2">
        <label className="text-xs font-bold uppercase tracking-wider text-slate-400">
          2. Select Subject ({ALL_SUBJECTS.length} Preloaded)
        </label>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-2">
          {ALL_SUBJECTS.map(sub => (
            <button
              key={sub.id}
              onClick={() => {
                setSelectedSubjectId(sub.id);
                setSelectedTopic('all');
              }}
              className={`p-3 rounded-2xl text-xs font-semibold transition border text-left flex flex-col justify-between h-20 cursor-pointer ${
                selectedSubjectId === sub.id
                  ? 'bg-indigo-600/30 border-indigo-500 text-white shadow-md'
                  : 'bg-slate-950 border-slate-800 text-slate-300 hover:bg-slate-800'
              }`}
            >
              <span className="font-bold">{sub.shortName}</span>
              <span className="text-[10px] text-slate-400 font-mono">
                {sub.topics.length} Topics
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Step 3: Topic Filter & Past Year */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {/* Topic selector */}
        <div className="space-y-2">
          <label className="text-xs font-bold uppercase tracking-wider text-slate-400">
            3. Specific Syllabus Topic
          </label>
          <select
            value={selectedTopic}
            onChange={e => setSelectedTopic(e.target.value)}
            className="w-full bg-slate-950 border border-slate-800 rounded-2xl p-3 text-xs sm:text-sm text-slate-200 focus:outline-none focus:border-emerald-500"
          >
            <option value="all">All Topics (Full Syllabus Mixed)</option>
            {subjectMeta.topics.map(t => (
              <option key={t} value={t}>{t}</option>
            ))}
          </select>
        </div>

        {/* Year Selector */}
        <div className="space-y-2">
          <label className="text-xs font-bold uppercase tracking-wider text-slate-400">
            4. Past Exam Year
          </label>
          <select
            value={selectedYear}
            onChange={e => setSelectedYear(Number(e.target.value))}
            className="w-full bg-slate-950 border border-slate-800 rounded-2xl p-3 text-xs sm:text-sm text-slate-200 focus:outline-none focus:border-emerald-500"
          >
            <option value={0}>All Years Mixed (2000–2027)</option>
            <option value={2026}>2026/2027 Mock Special</option>
            <option value={2025}>2025 Past Series</option>
            <option value={2024}>2024 Past Series</option>
            <option value={2023}>2023 Past Series</option>
            <option value={2022}>2022 Past Series</option>
            <option value={2020}>2020 Past Series</option>
            <option value={2018}>2018 Past Series</option>
          </select>
        </div>
      </div>

      {/* Step 4: Question Count & Timer Mode */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
        {/* Question Count */}
        <div className="space-y-2">
          <label className="text-xs font-bold uppercase tracking-wider text-slate-400">
            5. Number of Questions
          </label>
          <div className="flex items-center space-x-2">
            {[10, 20, 40, 60].map(count => (
              <button
                key={count}
                onClick={() => setQuestionCount(count)}
                className={`flex-1 py-2.5 rounded-xl text-xs font-bold font-mono transition border ${
                  questionCount === count
                    ? 'bg-emerald-500 text-slate-950 border-emerald-400'
                    : 'bg-slate-950 border-slate-800 text-slate-300 hover:bg-slate-800'
                }`}
              >
                {count} Qs
              </button>
            ))}
          </div>
        </div>

        {/* Timer Mode Toggle */}
        <div className="space-y-2">
          <label className="text-xs font-bold uppercase tracking-wider text-slate-400">
            6. Timer Constraint
          </label>
          <div className="flex items-center space-x-2">
            <button
              onClick={() => setIsTimed(true)}
              className={`flex-1 py-2.5 rounded-xl text-xs font-bold transition border flex items-center justify-center gap-1.5 ${
                isTimed
                  ? 'bg-emerald-500/20 border-emerald-500 text-emerald-300'
                  : 'bg-slate-950 border-slate-800 text-slate-400 hover:bg-slate-800'
              }`}
            >
              <Clock className="w-3.5 h-3.5" />
              <span>Timed (~{Math.round(questionCount * 1.2)}m)</span>
            </button>
            <button
              onClick={() => setIsTimed(false)}
              className={`flex-1 py-2.5 rounded-xl text-xs font-bold transition border flex items-center justify-center gap-1.5 ${
                !isTimed
                  ? 'bg-indigo-500/20 border-indigo-500 text-indigo-300'
                  : 'bg-slate-950 border-slate-800 text-slate-400 hover:bg-slate-800'
              }`}
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Untimed Study</span>
            </button>
          </div>
        </div>
      </div>

      {/* Launch Button */}
      <div className="pt-4 border-t border-slate-800 flex items-center justify-between">
        <div className="text-xs text-slate-400 font-mono">
          Ready: {questionCount} questions in <strong className="text-slate-200">{subjectMeta.name}</strong>
        </div>

        <button
          onClick={handleLaunchDrill}
          className="px-6 py-3 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-bold text-xs sm:text-sm rounded-2xl transition shadow-xl shadow-emerald-600/30 flex items-center gap-2"
          id="btn-start-subject-drill"
        >
          <Play className="w-4 h-4 fill-white" />
          <span>Start Drill Session</span>
        </button>
      </div>
    </div>
  );
};
