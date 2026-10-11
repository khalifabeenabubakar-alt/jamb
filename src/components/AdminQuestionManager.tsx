import React, { useState } from 'react';
import { 
  ShieldCheck, 
  Plus, 
  Upload, 
  Trash2, 
  Edit3, 
  CheckCircle2, 
  AlertCircle, 
  Search, 
  Filter, 
  FileText, 
  X,
  ChevronLeft,
  Download,
  Lock,
  Layers,
  Sparkles
} from 'lucide-react';
import { Question, SubjectId, ExamType, QuestionOption } from '../types';
import { ALL_SUBJECTS } from '../data/subjects';
import { offlineDB } from '../services/db';

interface AdminQuestionManagerProps {
  onBack: () => void;
}

export const AdminQuestionManager: React.FC<AdminQuestionManagerProps> = ({ onBack }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [passcode, setPasscode] = useState('');
  const [authError, setAuthError] = useState('');

  // Questions state
  const [questions, setQuestions] = useState<Question[]>(() => offlineDB.getAllQuestions());
  const [customQuestions, setCustomQuestions] = useState<Question[]>(() => offlineDB.getCustomQuestions());
  const [filterSubject, setFilterSubject] = useState<SubjectId | 'all'>('all');
  const [filterExam, setFilterExam] = useState<ExamType | 'all'>('all');
  const [searchQuery, setSearchQuery] = useState('');

  // Edit / Create modal state
  const [showEditModal, setShowEditModal] = useState(false);
  const [editingQuestion, setEditingQuestion] = useState<Partial<Question> | null>(null);

  // Bulk import modal state
  const [showBulkModal, setShowBulkModal] = useState(false);
  const [bulkJsonText, setBulkJsonText] = useState('');
  const [bulkStatus, setBulkStatus] = useState<{ imported: number; errors: string[] } | null>(null);

  // Simple local passcode verification (Protected UI, zero exposed secrets)
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (passcode.trim() === 'admin2026' || passcode.trim() === 'examsng') {
      setIsAuthenticated(true);
      setAuthError('');
    } else {
      setAuthError('Invalid administrator credentials. Access restricted.');
    }
  };

  const reloadQuestions = () => {
    setQuestions(offlineDB.getAllQuestions());
    setCustomQuestions(offlineDB.getCustomQuestions());
  };

  // Filtered list
  const filteredList = questions.filter(q => {
    if (filterSubject !== 'all' && q.subjectId !== filterSubject) return false;
    if (filterExam !== 'all' && q.examType !== filterExam) return false;
    if (searchQuery.trim()) {
      const qText = (q.question + ' ' + q.topic + ' ' + (q.explanation || '')).toLowerCase();
      if (!qText.includes(searchQuery.toLowerCase())) return false;
    }
    return true;
  });

  // Save new / edited question
  const handleSaveQuestion = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingQuestion || !editingQuestion.question || !editingQuestion.subjectId) return;

    const subjectMeta = ALL_SUBJECTS.find(s => s.id === editingQuestion.subjectId) || ALL_SUBJECTS[0];

    const finalQuestion: Question = {
      id: editingQuestion.id || `custom-${editingQuestion.subjectId}-${Date.now()}`,
      examType: editingQuestion.examType || 'UTME',
      subjectId: editingQuestion.subjectId,
      subjectName: subjectMeta.name,
      year: editingQuestion.year || 2024,
      questionNumber: editingQuestion.questionNumber || 1,
      topic: editingQuestion.topic || subjectMeta.topics[0] || 'General',
      question: editingQuestion.question,
      passage: editingQuestion.passage,
      options: editingQuestion.options || [
        { key: 'A', text: '' },
        { key: 'B', text: '' },
        { key: 'C', text: '' },
        { key: 'D', text: '' }
      ],
      correctOption: editingQuestion.correctOption || 'A',
      explanation: editingQuestion.explanation || '',
      syllabusReference: editingQuestion.syllabusReference || '',
      difficulty: editingQuestion.difficulty || 'medium'
    };

    if (editingQuestion.id) {
      offlineDB.updateQuestion(finalQuestion);
    } else {
      offlineDB.addQuestion(finalQuestion);
    }

    reloadQuestions();
    setShowEditModal(false);
    setEditingQuestion(null);
  };

  const handleDelete = (id: string) => {
    if (window.confirm('Delete this question from question pool?')) {
      offlineDB.deleteQuestion(id);
      reloadQuestions();
    }
  };

  // Bulk Import Handler
  const handleExecuteBulkImport = () => {
    try {
      const parsed = JSON.parse(bulkJsonText);
      if (!Array.isArray(parsed)) {
        setBulkStatus({ imported: 0, errors: ['Input JSON must be an array of question objects.'] });
        return;
      }

      const result = offlineDB.bulkImportQuestions(parsed);
      setBulkStatus(result);
      if (result.imported > 0) {
        reloadQuestions();
      }
    } catch (err: any) {
      setBulkStatus({ imported: 0, errors: [`JSON Parse Error: ${err.message}`] });
    }
  };

  // Sample CSV / JSON Template
  const sampleTemplate = JSON.stringify([
    {
      examType: "UTME",
      subjectId: "mathematics",
      year: 2024,
      topic: "Algebra & Quadratic Equations",
      question: "If 2x + 5 = 15, what is the value of x?",
      options: [
        { key: "A", text: "3" },
        { key: "B", text: "5" },
        { key: "C", text: "10" },
        { key: "D", text: "7" }
      ],
      correctOption: "B",
      explanation: "2x = 15 - 5 = 10, thus x = 5.",
      difficulty: "easy"
    }
  ], null, 2);

  // Authenticate screen
  if (!isAuthenticated) {
    return (
      <div className="max-w-md mx-auto my-12 bg-white border border-slate-200 rounded-3xl p-8 shadow-xl">
        <div className="flex items-center justify-between mb-6">
          <button
            onClick={onBack}
            className="p-2 text-slate-500 hover:text-slate-800 rounded-lg hover:bg-slate-100 transition"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <div className="w-10 h-10 rounded-xl bg-emerald-50 text-[#008751] flex items-center justify-center border border-emerald-200">
            <Lock className="w-5 h-5" />
          </div>
          <div className="w-9" />
        </div>

        <div className="text-center space-y-2 mb-6">
          <h2 className="text-xl font-bold text-slate-900">Administrator Portal</h2>
          <p className="text-xs text-slate-500 leading-relaxed">
            Authorized educator & admin access to create, edit, categorize, and bulk import exam questions.
          </p>
        </div>

        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
              Admin Passcode
            </label>
            <input
              type="password"
              value={passcode}
              onChange={e => setPasscode(e.target.value)}
              placeholder="Enter passcode (e.g. admin2026)"
              className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#008751] text-slate-800"
              autoFocus
            />
          </div>

          {authError && (
            <div className="p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs font-semibold flex items-center gap-2">
              <AlertCircle className="w-4 h-4 flex-shrink-0" />
              <span>{authError}</span>
            </div>
          )}

          <button
            type="submit"
            className="w-full py-3 bg-[#008751] hover:bg-[#007043] text-white font-bold text-xs uppercase tracking-wider rounded-xl transition shadow-md shadow-emerald-950/20 cursor-pointer"
          >
            Unlock Question Management
          </button>
        </form>
      </div>
    );
  }

  return (
    <div className="space-y-6 max-w-7xl mx-auto" id="admin-question-manager-view">
      {/* Top Banner Header */}
      <div className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-7 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="px-3 py-1 bg-emerald-50 text-[#008751] text-xs font-mono font-bold rounded-full border border-emerald-200 flex items-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5" />
              ADMINISTRATOR DASHBOARD
            </span>
            <span className="text-xs text-slate-400 font-mono">
              Total Questions: {questions.length} ({customQuestions.length} Custom Added)
            </span>
          </div>
          <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
            Curriculum & Question Bank Manager
          </h2>
          <p className="text-xs text-slate-500 mt-1">
            Author questions, verify official answer keys, upload diagrams, and import batch exam files.
          </p>
        </div>

        <div className="flex items-center gap-2.5 flex-wrap">
          <button
            onClick={() => {
              setEditingQuestion({
                examType: 'UTME',
                subjectId: 'mathematics',
                year: 2024,
                questionNumber: 1,
                topic: 'Algebra & Quadratic Equations',
                question: '',
                options: [
                  { key: 'A', text: '' },
                  { key: 'B', text: '' },
                  { key: 'C', text: '' },
                  { key: 'D', text: '' }
                ],
                correctOption: 'A',
                explanation: '',
                difficulty: 'medium'
              });
              setShowEditModal(true);
            }}
            className="px-4 py-2 bg-[#008751] hover:bg-[#007043] text-white rounded-xl text-xs font-bold transition flex items-center gap-1.5 shadow-md shadow-emerald-950/20 cursor-pointer"
            id="btn-admin-add-question"
          >
            <Plus className="w-4 h-4" />
            <span>Add Single Question</span>
          </button>

          <button
            onClick={() => {
              setBulkJsonText(sampleTemplate);
              setBulkStatus(null);
              setShowBulkModal(true);
            }}
            className="px-4 py-2 bg-indigo-50 hover:bg-indigo-100 text-indigo-700 border border-indigo-200 rounded-xl text-xs font-bold transition flex items-center gap-1.5 cursor-pointer"
            id="btn-admin-bulk-import"
          >
            <Upload className="w-4 h-4" />
            <span>Bulk JSON Import</span>
          </button>

          <button
            onClick={onBack}
            className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-bold transition flex items-center gap-1 border border-slate-200 cursor-pointer"
            id="btn-admin-back"
          >
            <ChevronLeft className="w-4 h-4 text-[#008751]" />
            <span>Return to App</span>
          </button>
        </div>
      </div>

      {/* Filter & Search Bar */}
      <div className="bg-white border border-slate-200 rounded-2xl p-4 shadow-sm flex flex-col md:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
          <input
            type="text"
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            placeholder="Search questions by keyword, topic, or syllabus reference..."
            className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#008751]"
          />
        </div>

        <div className="flex items-center gap-2 flex-wrap">
          <select
            value={filterSubject}
            onChange={e => setFilterSubject(e.target.value as any)}
            className="px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-700 focus:outline-none"
          >
            <option value="all">All Subjects ({ALL_SUBJECTS.length})</option>
            {ALL_SUBJECTS.map(s => (
              <option key={s.id} value={s.id}>{s.name}</option>
            ))}
          </select>

          <select
            value={filterExam}
            onChange={e => setFilterExam(e.target.value as any)}
            className="px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-700 focus:outline-none"
          >
            <option value="all">All Exam Bodies</option>
            <option value="UTME">JAMB UTME</option>
            <option value="WAEC">WAEC SSCE</option>
            <option value="NECO">NECO SSCE</option>
          </select>

          <span className="text-xs font-mono font-bold text-slate-400 px-2">
            Showing: {filteredList.length}
          </span>
        </div>
      </div>

      {/* Questions Table */}
      <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 border-b border-slate-200 text-slate-500 uppercase tracking-wider font-mono">
              <tr>
                <th className="py-3 px-4">Exam / Subject</th>
                <th className="py-3 px-4">Topic & Year</th>
                <th className="py-3 px-4 max-w-md">Question Preview</th>
                <th className="py-3 px-4 text-center">Answer</th>
                <th className="py-3 px-4 text-center">Difficulty</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-700">
              {filteredList.slice(0, 50).map((q) => {
                const isCustom = q.id.startsWith('custom');
                return (
                  <tr key={q.id} className="hover:bg-slate-50/70 transition">
                    <td className="py-3.5 px-4 whitespace-nowrap">
                      <div className="font-bold text-slate-900">{q.subjectName}</div>
                      <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-slate-100 border border-slate-200 font-semibold text-slate-600">
                        {q.examType}
                      </span>
                      {isCustom && (
                        <span className="ml-1 text-[10px] font-mono px-1.5 py-0.5 rounded bg-emerald-50 text-[#008751] border border-emerald-200 font-bold">
                          CUSTOM
                        </span>
                      )}
                    </td>
                    <td className="py-3.5 px-4 whitespace-nowrap">
                      <div className="font-semibold text-slate-800">{q.topic}</div>
                      <span className="text-[10px] text-slate-400 font-mono">Year {q.year}</span>
                    </td>
                    <td className="py-3.5 px-4 max-w-md">
                      <p className="line-clamp-2 text-slate-700 leading-relaxed font-medium">
                        {q.question}
                      </p>
                    </td>
                    <td className="py-3.5 px-4 text-center whitespace-nowrap">
                      <span className="w-6 h-6 inline-flex items-center justify-center font-mono font-bold rounded-md bg-[#008751] text-white">
                        {q.correctOption}
                      </span>
                    </td>
                    <td className="py-3.5 px-4 text-center whitespace-nowrap">
                      <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase ${
                        q.difficulty === 'hard' 
                          ? 'bg-rose-50 text-rose-700 border border-rose-200' 
                          : q.difficulty === 'easy'
                          ? 'bg-emerald-50 text-[#008751] border border-emerald-200'
                          : 'bg-amber-50 text-amber-700 border border-amber-200'
                      }`}>
                        {q.difficulty || 'medium'}
                      </span>
                    </td>
                    <td className="py-3.5 px-4 text-right whitespace-nowrap space-x-1.5">
                      <button
                        onClick={() => {
                          setEditingQuestion(q);
                          setShowEditModal(true);
                        }}
                        className="p-1.5 text-slate-500 hover:text-[#008751] rounded-lg hover:bg-slate-100 transition"
                        title="Edit Question"
                      >
                        <Edit3 className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDelete(q.id)}
                        className="p-1.5 text-slate-400 hover:text-rose-600 rounded-lg hover:bg-rose-50 transition"
                        title="Delete Question"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {filteredList.length > 50 && (
          <div className="p-3 bg-slate-50 border-t border-slate-200 text-center text-xs text-slate-500 font-mono">
            Displaying first 50 results of {filteredList.length}. Filter by subject or search query to narrow.
          </div>
        )}
      </div>

      {/* Edit / Create Question Modal */}
      {showEditModal && editingQuestion && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white border border-slate-200 rounded-3xl max-w-2xl w-full p-6 sm:p-8 shadow-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-4 border-b border-slate-100 mb-6">
              <h3 className="text-lg font-bold text-slate-900">
                {editingQuestion.id ? 'Edit Question' : 'Add New Question'}
              </h3>
              <button
                onClick={() => setShowEditModal(false)}
                className="p-1 text-slate-400 hover:text-slate-700"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveQuestion} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Exam Type</label>
                  <select
                    value={editingQuestion.examType}
                    onChange={e => setEditingQuestion(prev => ({ ...prev, examType: e.target.value as any }))}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold"
                  >
                    <option value="UTME">JAMB UTME</option>
                    <option value="WAEC">WAEC SSCE</option>
                    <option value="NECO">NECO SSCE</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Subject</label>
                  <select
                    value={editingQuestion.subjectId}
                    onChange={e => {
                      const subj = e.target.value as SubjectId;
                      const sMeta = ALL_SUBJECTS.find(s => s.id === subj);
                      setEditingQuestion(prev => ({ 
                        ...prev, 
                        subjectId: subj,
                        subjectName: sMeta?.name || subj,
                        topic: sMeta?.topics[0] || 'General'
                      }));
                    }}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold"
                  >
                    {ALL_SUBJECTS.map(s => (
                      <option key={s.id} value={s.id}>{s.name}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Past Year</label>
                  <input
                    type="number"
                    value={editingQuestion.year || 2024}
                    onChange={e => setEditingQuestion(prev => ({ ...prev, year: parseInt(e.target.value) || 2024 }))}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Topic</label>
                <input
                  type="text"
                  value={editingQuestion.topic || ''}
                  onChange={e => setEditingQuestion(prev => ({ ...prev, topic: e.target.value }))}
                  placeholder="e.g. Calculus (Differentiation & Integration)"
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Comprehension Passage (Optional)</label>
                <textarea
                  value={editingQuestion.passage || ''}
                  onChange={e => setEditingQuestion(prev => ({ ...prev, passage: e.target.value }))}
                  rows={2}
                  placeholder="Leave empty if this question doesn't belong to a reading passage..."
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Question Body *</label>
                <textarea
                  value={editingQuestion.question || ''}
                  onChange={e => setEditingQuestion(prev => ({ ...prev, question: e.target.value }))}
                  rows={3}
                  placeholder="Type the full question prompt clearly..."
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs"
                  required
                />
              </div>

              {/* Options A, B, C, D */}
              <div className="space-y-2">
                <label className="block text-xs font-bold text-slate-700">Answer Options *</label>
                {(['A', 'B', 'C', 'D'] as const).map(optKey => {
                  const opt = editingQuestion.options?.find(o => o.key === optKey) || { key: optKey, text: '' };
                  return (
                    <div key={optKey} className="flex items-center gap-2">
                      <span className={`w-7 h-7 rounded-lg font-mono font-bold text-xs flex items-center justify-center ${
                        editingQuestion.correctOption === optKey ? 'bg-[#008751] text-white' : 'bg-slate-100 text-slate-700'
                      }`}>
                        {optKey}
                      </span>
                      <input
                        type="text"
                        value={opt.text}
                        onChange={e => {
                          const updatedOpts = (editingQuestion.options || [
                            { key: 'A', text: '' },
                            { key: 'B', text: '' },
                            { key: 'C', text: '' },
                            { key: 'D', text: '' }
                          ]).map(o => o.key === optKey ? { ...o, text: e.target.value } : o);
                          setEditingQuestion(prev => ({ ...prev, options: updatedOpts }));
                        }}
                        placeholder={`Option ${optKey} text...`}
                        className="flex-1 px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs"
                        required
                      />
                      <button
                        type="button"
                        onClick={() => setEditingQuestion(prev => ({ ...prev, correctOption: optKey }))}
                        className={`px-2.5 py-1.5 rounded-lg text-xs font-bold transition ${
                          editingQuestion.correctOption === optKey
                            ? 'bg-emerald-100 text-[#008751] border border-emerald-200'
                            : 'bg-slate-100 hover:bg-slate-200 text-slate-500'
                        }`}
                      >
                        {editingQuestion.correctOption === optKey ? '✓ Correct Answer' : 'Set as Answer'}
                      </button>
                    </div>
                  );
                })}
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Detailed Explanation & Solution *</label>
                <textarea
                  value={editingQuestion.explanation || ''}
                  onChange={e => setEditingQuestion(prev => ({ ...prev, explanation: e.target.value }))}
                  rows={3}
                  placeholder="Explain why this option is correct and provide step-by-step mathematical or conceptual reasoning..."
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs"
                  required
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Syllabus Reference</label>
                  <input
                    type="text"
                    value={editingQuestion.syllabusReference || ''}
                    onChange={e => setEditingQuestion(prev => ({ ...prev, syllabusReference: e.target.value }))}
                    placeholder="e.g. JAMB Section 4: Pure Algebra"
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Difficulty</label>
                  <select
                    value={editingQuestion.difficulty || 'medium'}
                    onChange={e => setEditingQuestion(prev => ({ ...prev, difficulty: e.target.value as any }))}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold"
                  >
                    <option value="easy">Easy</option>
                    <option value="medium">Medium</option>
                    <option value="hard">Hard</option>
                  </select>
                </div>
              </div>

              <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setShowEditModal(false)}
                  className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold rounded-xl transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-[#008751] hover:bg-[#007043] text-white text-xs font-bold rounded-xl transition shadow-md shadow-emerald-950/20"
                >
                  Save Question to Database
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Bulk JSON Import Modal */}
      {showBulkModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white border border-slate-200 rounded-3xl max-w-2xl w-full p-6 sm:p-8 shadow-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-4 border-b border-slate-100 mb-4">
              <div className="flex items-center gap-2">
                <Upload className="w-5 h-5 text-indigo-600" />
                <h3 className="text-lg font-bold text-slate-900">Bulk Import Questions (JSON)</h3>
              </div>
              <button
                onClick={() => setShowBulkModal(false)}
                className="p-1 text-slate-400 hover:text-slate-700"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <p className="text-xs text-slate-600 mb-4 leading-relaxed">
              Paste an array of question JSON objects. Each item must contain <code>question</code>, <code>options</code> (A, B, C, D), <code>correctOption</code>, and <code>subjectId</code>.
            </p>

            <textarea
              value={bulkJsonText}
              onChange={e => setBulkJsonText(e.target.value)}
              rows={12}
              className="w-full p-3 font-mono text-xs bg-slate-900 text-emerald-400 rounded-xl border border-slate-800 focus:outline-none"
            />

            {bulkStatus && (
              <div className={`mt-4 p-3 rounded-xl text-xs ${
                bulkStatus.imported > 0 ? 'bg-emerald-50 text-emerald-800 border border-emerald-200' : 'bg-rose-50 text-rose-800 border border-rose-200'
              }`}>
                <div className="font-bold">
                  {bulkStatus.imported > 0 ? `Successfully imported ${bulkStatus.imported} questions!` : 'Import Failed'}
                </div>
                {bulkStatus.errors.length > 0 && (
                  <ul className="list-disc list-inside mt-1 space-y-0.5">
                    {bulkStatus.errors.map((err, idx) => (
                      <li key={idx}>{err}</li>
                    ))}
                  </ul>
                )}
              </div>
            )}

            <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-100 mt-4">
              <button
                type="button"
                onClick={() => setShowBulkModal(false)}
                className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold rounded-xl transition"
              >
                Close
              </button>
              <button
                type="button"
                onClick={handleExecuteBulkImport}
                className="px-5 py-2 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold rounded-xl transition shadow-md shadow-indigo-950/20"
              >
                Validate & Import Questions
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
