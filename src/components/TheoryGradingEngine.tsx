import React, { useState } from 'react';
import { 
  CheckSquare, 
  Square, 
  HelpCircle, 
  BookOpen, 
  Award, 
  AlertCircle, 
  ChevronRight, 
  FileText,
  Filter,
  CheckCircle2,
  ChevronLeft
} from 'lucide-react';
import { TheoryQuestion, SubjectId } from '../types';
import { offlineDB } from '../services/db';
import { ALL_SUBJECTS } from '../data/subjects';
import { DiagramRenderer } from './DiagramRenderer';

interface TheoryGradingEngineProps {
  onBack?: () => void;
}

export const TheoryGradingEngine: React.FC<TheoryGradingEngineProps> = ({ onBack }) => {
  const [selectedSubject, setSelectedSubject] = useState<SubjectId>('mathematics');
  const [selectedExamType, setSelectedExamType] = useState<'WAEC' | 'NECO'>('WAEC');
  const [activeQuestionId, setActiveQuestionId] = useState<string>('');
  const [checkedRubrics, setCheckedRubrics] = useState<Record<string, boolean>>({});
  const [showModelAnswer, setShowModelAnswer] = useState(false);

  const theoryQuestions = offlineDB.getTheoryQuestions(selectedSubject, selectedExamType);
  const activeQuestion: TheoryQuestion | undefined = 
    theoryQuestions.find(q => q.id === activeQuestionId) || theoryQuestions[0];

  const handleToggleRubric = (rubricId: string) => {
    setCheckedRubrics(prev => ({
      ...prev,
      [rubricId]: !prev[rubricId]
    }));
  };

  // Calculate earned marks for active question
  const currentEarnedMarks = activeQuestion ? activeQuestion.rubrics.reduce((sum, r) => {
    return checkedRubrics[r.id] ? sum + r.mark : sum;
  }, 0) : 0;

  const markPercentage = activeQuestion ? Math.round((currentEarnedMarks / activeQuestion.totalMarks) * 100) : 0;

  return (
    <div className="space-y-6" id="theory-grading-engine-view">
      {/* Header Bar */}
      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold font-mono tracking-wider bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
                <Award className="w-3.5 h-3.5" />
                WAEC & NECO Theory Marking Scheme Engine
              </span>
              {onBack && (
                <button
                  onClick={onBack}
                  className="px-3 py-1 bg-slate-800 hover:bg-slate-700 text-slate-200 hover:text-white rounded-lg text-xs font-bold transition flex items-center gap-1 border border-slate-700 cursor-pointer"
                  id="btn-theory-go-back"
                >
                  <ChevronLeft className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Go Back</span>
                </button>
              )}
            </div>
            <h2 className="text-xl sm:text-2xl font-bold text-slate-100">
              Essay & Practical Theory Self-Grading Studio
            </h2>
            <p className="text-xs sm:text-sm text-slate-400 mt-1 max-w-2xl">
              Understand exact point allocation across Method Marks (M), Accuracy Marks (A), and Bonus Marks (B) according to official West African Examinations Council standards.
            </p>
          </div>

          {/* Subject & Exam Type Switcher */}
          <div className="flex flex-wrap items-center gap-2">
            <div className="flex bg-slate-950 p-1 rounded-xl border border-slate-800">
              <button
                onClick={() => setSelectedExamType('WAEC')}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition ${
                  selectedExamType === 'WAEC' ? 'bg-emerald-500 text-slate-950' : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                WAEC SSCE
              </button>
              <button
                onClick={() => setSelectedExamType('NECO')}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition ${
                  selectedExamType === 'NECO' ? 'bg-emerald-500 text-slate-950' : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                NECO SSCE
              </button>
            </div>
          </div>
        </div>

        {/* Subject Pill Filters */}
        <div className="flex items-center space-x-2 mt-5 overflow-x-auto pb-1 scrollbar-none">
          {ALL_SUBJECTS.slice(0, 5).map(sub => (
            <button
              key={sub.id}
              onClick={() => {
                setSelectedSubject(sub.id);
                setCheckedRubrics({});
              }}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition border ${
                selectedSubject === sub.id
                  ? 'bg-emerald-500/20 border-emerald-500 text-emerald-300'
                  : 'bg-slate-800/60 border-slate-700/60 text-slate-300 hover:bg-slate-800'
              }`}
            >
              {sub.name}
            </button>
          ))}
        </div>
      </div>

      {/* Main Content Layout */}
      {activeQuestion ? (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Left Column: Theory Question Paper & Rubric Checklist */}
          <div className="lg:col-span-7 space-y-6">
            {/* Question Card */}
            <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 space-y-4 shadow-xl">
              <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                <div className="flex items-center space-x-2">
                  <span className="text-xs font-mono font-bold text-slate-200 bg-slate-800 px-2.5 py-1 rounded-md border border-slate-700">
                    {activeQuestion.paper}
                  </span>
                  <span className="text-xs text-slate-400">
                    {activeQuestion.questionNumber} ({activeQuestion.year})
                  </span>
                </div>
                <span className="text-xs font-bold text-amber-400 font-mono bg-amber-500/10 px-2.5 py-1 rounded-full border border-amber-500/30">
                  Total: {activeQuestion.totalMarks} Marks
                </span>
              </div>

              <div className="text-xs text-slate-400 font-semibold uppercase tracking-wider">
                Topic: <strong className="text-slate-200">{activeQuestion.topic}</strong>
              </div>

              {/* Question Text */}
              <div className="text-slate-100 font-medium leading-relaxed whitespace-pre-line text-sm sm:text-base">
                {activeQuestion.questionText}
              </div>

              {/* Diagram */}
              {activeQuestion.diagram && (
                <DiagramRenderer diagram={activeQuestion.diagram} />
              )}
            </div>

            {/* Interactive Marking Scheme Checkbox Rubrics */}
            <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 space-y-4 shadow-xl">
              <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                <div className="flex items-center space-x-2">
                  <CheckSquare className="w-5 h-5 text-emerald-400" />
                  <h3 className="text-base font-bold text-slate-100">
                    Official WAEC Marking Scheme Rubric
                  </h3>
                </div>
                <div className="text-xs font-mono text-slate-400">
                  Earned: <strong className="text-emerald-400">{currentEarnedMarks}</strong> / {activeQuestion.totalMarks} Marks ({markPercentage}%)
                </div>
              </div>

              <p className="text-xs text-slate-400">
                Self-evaluate your handwritten working: Check each step and calculation you successfully wrote to calculate your earned score.
              </p>

              {/* Rubric Items */}
              <div className="space-y-2.5">
                {activeQuestion.rubrics.map(r => {
                  const isChecked = !!checkedRubrics[r.id];

                  return (
                    <button
                      key={r.id}
                      onClick={() => handleToggleRubric(r.id)}
                      className={`w-full text-left p-3.5 sm:p-4 rounded-2xl border transition flex items-start space-x-3.5 cursor-pointer ${
                        isChecked 
                          ? 'bg-emerald-500/15 border-emerald-500 text-slate-100 shadow-sm' 
                          : 'bg-slate-950 border-slate-800/80 text-slate-300 hover:border-slate-700'
                      }`}
                      id={`rubric-chk-${r.id}`}
                    >
                      <div className="mt-0.5">
                        {isChecked ? (
                          <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                        ) : (
                          <Square className="w-5 h-5 text-slate-500" />
                        )}
                      </div>

                      <div className="flex-1 space-y-1">
                        <div className="flex items-center justify-between gap-2">
                          <span className="text-xs sm:text-sm font-semibold">{r.step}</span>
                          <span className={`text-xs font-mono font-bold px-2 py-0.5 rounded ${
                            isChecked ? 'bg-emerald-500/20 text-emerald-300' : 'bg-slate-800 text-slate-400'
                          }`}>
                            +{r.mark} {r.markType} Mark{r.mark > 1 ? 's' : ''}
                          </span>
                        </div>
                        <p className="text-xs text-slate-400 leading-relaxed">
                          {r.criteria}
                        </p>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Right Column: Examiner Remarks, Common Pitfalls, Model Answer */}
          <div className="lg:col-span-5 space-y-6">
            {/* Live Scorecard Box */}
            <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 text-center space-y-3 shadow-xl">
              <div className="text-xs font-bold uppercase tracking-wider text-slate-400">
                Self-Assessed Score
              </div>
              <div className="text-5xl font-extrabold text-white font-mono flex items-baseline justify-center gap-1">
                <span className={markPercentage >= 75 ? 'text-emerald-400' : markPercentage >= 50 ? 'text-amber-400' : 'text-rose-400'}>
                  {currentEarnedMarks}
                </span>
                <span className="text-xl text-slate-400">/ {activeQuestion.totalMarks}</span>
              </div>
              <div className="text-xs font-semibold text-slate-300">
                Grade Estimate: {markPercentage >= 75 ? 'A1 (Excellent)' : markPercentage >= 65 ? 'B2/B3 (Very Good)' : markPercentage >= 50 ? 'C4/C6 (Credit)' : 'F9 (Fail)'}
              </div>

              <div className="pt-2">
                <button
                  onClick={() => setShowModelAnswer(!showModelAnswer)}
                  className="w-full py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs rounded-xl transition shadow-md shadow-indigo-600/20 flex items-center justify-center gap-1.5"
                  id="btn-toggle-model-answer"
                >
                  <FileText className="w-4 h-4" />
                  <span>{showModelAnswer ? 'Hide Model Answer' : 'View Full Model Answer'}</span>
                </button>
              </div>
            </div>

            {/* Model Answer (Collapsible/Toggle) */}
            {showModelAnswer && (
              <div className="bg-slate-900 border border-emerald-500/40 rounded-3xl p-6 space-y-3 shadow-xl animate-in fade-in duration-200">
                <div className="text-xs font-bold uppercase tracking-wider text-emerald-400 flex items-center gap-1.5">
                  <BookOpen className="w-4 h-4" />
                  <span>Step-by-Step Model Answer</span>
                </div>
                <div className="text-xs sm:text-sm text-slate-200 font-mono leading-relaxed bg-slate-950 p-4 rounded-2xl border border-slate-800 whitespace-pre-line max-h-96 overflow-y-auto">
                  {activeQuestion.modelAnswer}
                </div>
              </div>
            )}

            {/* Chief Examiner's Remarks */}
            <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 space-y-3 shadow-xl">
              <div className="text-xs font-bold uppercase tracking-wider text-amber-400 flex items-center gap-1.5">
                <AlertCircle className="w-4 h-4" />
                <span>Chief Examiner's Report & Observations</span>
              </div>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                {activeQuestion.examinerRemarks}
              </p>
            </div>

            {/* Common Candidate Pitfalls */}
            <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 space-y-3 shadow-xl">
              <div className="text-xs font-bold uppercase tracking-wider text-rose-400 flex items-center gap-1.5">
                <HelpCircle className="w-4 h-4" />
                <span>Frequent Point Deductions (Pitfalls)</span>
              </div>
              <ul className="space-y-2 text-xs text-slate-300">
                {activeQuestion.commonPitfalls.map((pitfall, i) => (
                  <li key={i} className="flex items-start space-x-2">
                    <span className="text-rose-400 font-bold">•</span>
                    <span>{pitfall}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      ) : (
        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-12 text-center text-slate-400">
          No theory questions loaded for {selectedSubject}. Select another subject above.
        </div>
      )}
    </div>
  );
};
