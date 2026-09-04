import React, { useState } from 'react';
import { 
  BookOpen, 
  Users, 
  Key, 
  HelpCircle, 
  CheckCircle2, 
  XCircle, 
  Sparkles, 
  ChevronRight,
  BookMarked,
  ChevronLeft
} from 'lucide-react';
import { LiteratureText, Question } from '../types';
import { offlineDB } from '../services/db';

interface LiteratureHubProps {
  onBack?: () => void;
}

export const LiteratureHub: React.FC<LiteratureHubProps> = ({ onBack }) => {
  const literatureTexts = offlineDB.getLiteratureTexts();
  const [selectedNovelId, setSelectedNovelId] = useState(literatureTexts[0]?.id || 'the-lekki-headmaster');
  const [activeTab, setActiveTab] = useState<'chapters' | 'characters' | 'themes' | 'quiz'>('chapters');
  const [selectedChapterIdx, setSelectedChapterIdx] = useState(0);

  // Quiz state
  const [quizAnswers, setQuizAnswers] = useState<Record<string, 'A' | 'B' | 'C' | 'D' | 'E'>>({});
  const [quizSubmitted, setQuizSubmitted] = useState(false);

  const currentNovel: LiteratureText = 
    literatureTexts.find(n => n.id === selectedNovelId) || literatureTexts[0];

  const currentChapter = currentNovel.chapters[selectedChapterIdx] || currentNovel.chapters[0];
  const chapterQuestions = currentChapter.sampleQuestions || [];

  const handleSelectQuizOption = (qId: string, optKey: 'A' | 'B' | 'C' | 'D' | 'E') => {
    if (quizSubmitted) return;
    setQuizAnswers(prev => ({ ...prev, [qId]: optKey }));
  };

  const handleResetQuiz = () => {
    setQuizAnswers({});
    setQuizSubmitted(false);
  };

  const calculateQuizScore = () => {
    let correct = 0;
    chapterQuestions.forEach(q => {
      if (quizAnswers[q.id] === q.correctOption) correct++;
    });
    return correct;
  };

  return (
    <div className="space-y-6" id="literature-hub-view">
      {/* Novel Header Card */}
      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 relative overflow-hidden">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="space-y-2 max-w-2xl">
            <div className="flex items-center space-x-2">
              <span className="px-3 py-1 rounded-full text-xs font-bold font-mono tracking-wider bg-pink-500/20 text-pink-300 border border-pink-500/30">
                JAMB UTME Assigned Novel
              </span>
              <span className="text-xs text-slate-400 font-mono">
                {currentNovel.genre}
              </span>
              {onBack && (
                <button
                  onClick={onBack}
                  className="ml-auto px-3 py-1 bg-slate-800 hover:bg-slate-700 text-slate-200 hover:text-white rounded-lg text-xs font-bold transition flex items-center gap-1 border border-slate-700 cursor-pointer"
                  id="btn-literature-go-back"
                >
                  <ChevronLeft className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Go Back</span>
                </button>
              )}
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              {currentNovel.title}
            </h2>
            <div className="text-xs sm:text-sm font-semibold text-emerald-400">
              Author: {currentNovel.author}
            </div>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed pt-1">
              {currentNovel.synopsis}
            </p>
          </div>

          {/* Novel Switcher Tabs */}
          <div className="flex flex-wrap lg:flex-col gap-2">
            {literatureTexts.map(novel => (
              <button
                key={novel.id}
                onClick={() => {
                  setSelectedNovelId(novel.id);
                  setSelectedChapterIdx(0);
                  handleResetQuiz();
                }}
                className={`px-4 py-2.5 rounded-2xl text-xs font-bold transition text-left border flex items-center justify-between gap-3 ${
                  selectedNovelId === novel.id
                    ? 'bg-pink-500 text-slate-950 border-pink-400 shadow-lg shadow-pink-500/20'
                    : 'bg-slate-950/70 border-slate-800 text-slate-300 hover:bg-slate-800'
                }`}
              >
                <span>{novel.title}</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            ))}
          </div>
        </div>

        {/* Inner Tabs (Chapters, Characters, Themes, Quiz) */}
        <div className="flex items-center space-x-2 mt-6 pt-4 border-t border-slate-800">
          <button
            onClick={() => setActiveTab('chapters')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition flex items-center gap-1.5 ${
              activeTab === 'chapters'
                ? 'bg-slate-800 text-white border border-slate-700'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <BookOpen className="w-4 h-4 text-emerald-400" />
            <span>Chapter Summaries</span>
          </button>
          <button
            onClick={() => setActiveTab('characters')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition flex items-center gap-1.5 ${
              activeTab === 'characters'
                ? 'bg-slate-800 text-white border border-slate-700'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Users className="w-4 h-4 text-sky-400" />
            <span>Character Dossier</span>
          </button>
          <button
            onClick={() => setActiveTab('themes')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition flex items-center gap-1.5 ${
              activeTab === 'themes'
                ? 'bg-slate-800 text-white border border-slate-700'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Key className="w-4 h-4 text-amber-400" />
            <span>Themes & Key Quotes</span>
          </button>
        </div>
      </div>

      {/* ======================================================== */}
      {/* TAB 1: CHAPTER SUMMARIES & QUIZZES                       */}
      {/* ======================================================== */}
      {activeTab === 'chapters' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Chapter Selector Sidebar */}
          <div className="lg:col-span-4 space-y-2">
            <div className="text-xs font-bold uppercase tracking-wider text-slate-400 px-1 mb-2">
              Chapters & Plotlines
            </div>
            {currentNovel.chapters.map((ch, idx) => (
              <button
                key={ch.number}
                onClick={() => {
                  setSelectedChapterIdx(idx);
                  handleResetQuiz();
                }}
                className={`w-full text-left p-4 rounded-2xl border transition space-y-1 cursor-pointer ${
                  selectedChapterIdx === idx
                    ? 'bg-slate-900 border-pink-500/60 text-white shadow-md'
                    : 'bg-slate-950 border-slate-800 text-slate-300 hover:bg-slate-900'
                }`}
              >
                <div className="text-xs font-mono font-bold text-pink-400">
                  Chapter {ch.number}
                </div>
                <div className="text-sm font-semibold">{ch.title}</div>
              </button>
            ))}
          </div>

          {/* Chapter Detail View */}
          <div className="lg:col-span-8 space-y-6">
            <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-5">
              <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                <span className="text-xs font-mono font-bold text-pink-400 bg-pink-500/10 px-3 py-1 rounded-full border border-pink-500/20">
                  Chapter {currentChapter.number} Comprehensive Analysis
                </span>
                <span className="text-xs text-slate-400 font-mono">
                  {currentChapter.sampleQuestions.length} Practice Questions
                </span>
              </div>

              <h3 className="text-xl font-bold text-white">
                {currentChapter.title}
              </h3>

              <div className="space-y-2">
                <div className="text-xs font-bold uppercase tracking-wider text-slate-400">
                  Plot Summary
                </div>
                <p className="text-xs sm:text-sm text-slate-200 leading-relaxed bg-slate-950 p-4 rounded-2xl border border-slate-800">
                  {currentChapter.summary}
                </p>
              </div>

              {/* Key Events Bulletins */}
              <div className="space-y-2">
                <div className="text-xs font-bold uppercase tracking-wider text-slate-400">
                  Key Plot Events to Remember
                </div>
                <ul className="space-y-2 text-xs sm:text-sm text-slate-300">
                  {currentChapter.keyEvents.map((evt, i) => (
                    <li key={i} className="flex items-start space-x-2 bg-slate-950/60 p-2.5 rounded-xl border border-slate-800/80">
                      <span className="text-pink-400 font-bold">•</span>
                      <span>{evt}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Attached Chapter Quiz Section */}
            {chapterQuestions.length > 0 && (
              <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-5">
                <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                  <div className="flex items-center space-x-2">
                    <HelpCircle className="w-5 h-5 text-emerald-400" />
                    <h4 className="text-base font-bold text-white">
                      Chapter {currentChapter.number} Quick UTME Quiz
                    </h4>
                  </div>

                  {quizSubmitted && (
                    <span className="text-xs font-mono font-bold text-emerald-400 bg-emerald-500/10 px-3 py-1 rounded-full">
                      Score: {calculateQuizScore()} / {chapterQuestions.length}
                    </span>
                  )}
                </div>

                <div className="space-y-4">
                  {chapterQuestions.map((q, qIdx) => {
                    const chosen = quizAnswers[q.id];
                    const isCorrect = chosen === q.correctOption;

                    return (
                      <div key={q.id} className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-3">
                        <div className="text-xs font-semibold text-slate-200">
                          {qIdx + 1}. {q.question}
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                          {q.options.map(opt => {
                            const isPicked = chosen === opt.key;
                            let style = 'bg-slate-900 border-slate-800 text-slate-300 hover:border-slate-700';

                            if (quizSubmitted) {
                              if (opt.key === q.correctOption) {
                                style = 'bg-emerald-500/20 border-emerald-500 text-emerald-300 font-semibold';
                              } else if (isPicked && !isCorrect) {
                                style = 'bg-rose-500/20 border-rose-500 text-rose-300';
                              }
                            } else if (isPicked) {
                              style = 'bg-pink-500/20 border-pink-500 text-pink-200 font-semibold';
                            }

                            return (
                              <button
                                key={opt.key}
                                onClick={() => handleSelectQuizOption(q.id, opt.key)}
                                className={`text-left p-3 rounded-xl border text-xs flex items-center space-x-2 transition cursor-pointer ${style}`}
                              >
                                <span className="font-mono font-bold">{opt.key}.</span>
                                <span>{opt.text}</span>
                              </button>
                            );
                          })}
                        </div>

                        {quizSubmitted && (
                          <div className="text-xs text-slate-400 pt-2 border-t border-slate-800">
                            <strong className="text-emerald-400">Explanation:</strong> {q.explanation}
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>

                {/* Quiz Submit & Reset */}
                <div className="flex items-center justify-end space-x-3 pt-2">
                  {!quizSubmitted ? (
                    <button
                      onClick={() => setQuizSubmitted(true)}
                      className="px-5 py-2.5 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 text-white font-bold text-xs rounded-xl transition shadow-lg shadow-emerald-600/20"
                    >
                      Submit Chapter Quiz
                    </button>
                  ) : (
                    <button
                      onClick={handleResetQuiz}
                      className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold rounded-xl transition"
                    >
                      Retake Quiz
                    </button>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* ======================================================== */}
      {/* TAB 2: CHARACTER DOSSIER                                */}
      {/* ======================================================== */}
      {activeTab === 'characters' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {currentNovel.characters.map(char => (
            <div key={char.name} className="bg-slate-900 border border-slate-800 rounded-3xl p-6 space-y-3">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-bold text-white">{char.name}</h3>
                <span className="text-xs font-mono font-bold text-sky-400 bg-sky-500/10 px-2.5 py-0.5 rounded-full border border-sky-500/20">
                  {char.role}
                </span>
              </div>

              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                {char.description}
              </p>

              <div className="pt-2 flex flex-wrap gap-1.5">
                {char.traits.map(t => (
                  <span key={t} className="text-[11px] font-mono px-2.5 py-1 rounded-lg bg-slate-950 border border-slate-800 text-slate-400">
                    #{t}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* ======================================================== */}
      {/* TAB 3: THEMES & KEY QUOTES                              */}
      {/* ======================================================== */}
      {activeTab === 'themes' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {currentNovel.themes.map(theme => (
            <div key={theme.title} className="bg-slate-900 border border-slate-800 rounded-3xl p-6 space-y-4">
              <div className="flex items-center space-x-2">
                <Key className="w-4 h-4 text-amber-400" />
                <h3 className="text-base font-bold text-white">{theme.title}</h3>
              </div>

              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                {theme.description}
              </p>

              <div className="space-y-2 pt-2 border-t border-slate-800">
                <div className="text-[11px] font-bold uppercase tracking-wider text-amber-400">
                  Memorable Quotes for Exam Citations
                </div>
                {theme.keyQuotes.map((q, i) => (
                  <blockquote key={i} className="text-xs italic text-slate-300 bg-slate-950 p-3 rounded-xl border border-slate-800/80">
                    {q}
                  </blockquote>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
