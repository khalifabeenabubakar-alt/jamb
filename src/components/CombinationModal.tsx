import React, { useState } from 'react';
import { 
  X, 
  Check, 
  Target, 
  GraduationCap, 
  Layers, 
  Save, 
  Sparkles, 
  ChevronRight 
} from 'lucide-react';
import { SubjectId, StudentProfile, SavedCombination } from '../types';
import { ALL_SUBJECTS, PRESET_COMBINATIONS } from '../data/subjects';
import { offlineDB } from '../services/db';

interface CombinationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onProfileUpdated: (profile: StudentProfile) => void;
}

export const CombinationModal: React.FC<CombinationModalProps> = ({
  isOpen,
  onClose,
  onProfileUpdated
}) => {
  const currentProfile = offlineDB.getStudentProfile();

  const [studentName, setStudentName] = useState(currentProfile.name);
  const [targetScore, setTargetScore] = useState(currentProfile.targetScore);
  const [targetCourse, setTargetCourse] = useState(currentProfile.targetCourse);
  const [targetUniversity, setTargetUniversity] = useState(currentProfile.targetUniversity);
  const [selectedSubjects, setSelectedSubjects] = useState<SubjectId[]>(currentProfile.combination);

  if (!isOpen) return null;

  const handleApplyPreset = (preset: SavedCombination) => {
    setSelectedSubjects([...preset.subjects]);
  };

  const handleToggleSubject = (subId: SubjectId) => {
    if (subId === 'english') return; // English is mandatory for UTME

    if (selectedSubjects.includes(subId)) {
      setSelectedSubjects(prev => prev.filter(id => id !== subId));
    } else {
      if (selectedSubjects.length < 4) {
        setSelectedSubjects(prev => [...prev, subId]);
      }
    }
  };

  const handleSave = () => {
    if (selectedSubjects.length !== 4) return;

    const updated = offlineDB.saveStudentProfile({
      name: studentName,
      targetScore,
      targetCourse,
      targetUniversity,
      combination: selectedSubjects as [SubjectId, SubjectId, SubjectId, SubjectId]
    });

    onProfileUpdated(updated);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-slate-900 border border-slate-800 rounded-3xl max-w-2xl w-full p-6 sm:p-8 shadow-2xl space-y-6 max-h-[90vh] overflow-y-auto scrollbar-thin animate-in fade-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-800 pb-4">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-2xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center">
              <GraduationCap className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-white">
                Student Profile & 4-Subject Combination
              </h3>
              <p className="text-xs text-slate-400">
                Configure your target UTME goal and official subject combo
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-xl text-slate-400 hover:text-slate-100 hover:bg-slate-800 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Profile Inputs */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-300">Candidate Name</label>
            <input
              type="text"
              value={studentName}
              onChange={e => setStudentName(e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2 text-xs sm:text-sm text-slate-100 focus:outline-none focus:border-emerald-500"
              placeholder="e.g. Chidi Okafor"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-300">Target UTME Score (Max 400)</label>
            <input
              type="number"
              min={180}
              max={400}
              value={targetScore}
              onChange={e => setTargetScore(Number(e.target.value))}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2 text-xs sm:text-sm text-emerald-400 font-mono font-bold focus:outline-none focus:border-emerald-500"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-300">Target Course of Study</label>
            <input
              type="text"
              value={targetCourse}
              onChange={e => setTargetCourse(e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2 text-xs sm:text-sm text-slate-100 focus:outline-none focus:border-emerald-500"
              placeholder="e.g. Medicine & Surgery"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-300">Target University (First Choice)</label>
            <input
              type="text"
              value={targetUniversity}
              onChange={e => setTargetUniversity(e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2 text-xs sm:text-sm text-slate-100 focus:outline-none focus:border-emerald-500"
              placeholder="e.g. University of Lagos (UNILAG)"
            />
          </div>
        </div>

        {/* Quick Faculty Presets */}
        <div className="space-y-2">
          <label className="text-xs font-bold uppercase tracking-wider text-slate-400">
            Quick Faculty Combination Presets
          </label>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {PRESET_COMBINATIONS.map(preset => (
              <button
                key={preset.id}
                onClick={() => handleApplyPreset(preset)}
                className="p-3 bg-slate-950 border border-slate-800 hover:border-slate-700 rounded-2xl text-left transition flex items-center justify-between group cursor-pointer"
              >
                <div>
                  <div className="text-xs font-bold text-slate-200 group-hover:text-emerald-400">
                    {preset.name}
                  </div>
                  <div className="text-[10px] text-slate-400 font-mono mt-0.5">
                    {preset.subjects.map(s => ALL_SUBJECTS.find(sub => sub.id === s)?.shortName).join(' + ')}
                  </div>
                </div>
                <ChevronRight className="w-4 h-4 text-slate-500 group-hover:text-emerald-400" />
              </button>
            ))}
          </div>
        </div>

        {/* Custom Subject Selector (Must pick exactly 4) */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <label className="text-xs font-bold uppercase tracking-wider text-slate-400">
              Selected 4 Subjects ({selectedSubjects.length}/4 chosen)
            </label>
            {selectedSubjects.length !== 4 && (
              <span className="text-[11px] text-rose-400 font-semibold">
                Please select exactly 4 subjects
              </span>
            )}
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
            {ALL_SUBJECTS.map(sub => {
              const isSelected = selectedSubjects.includes(sub.id);
              const isEnglish = sub.id === 'english';

              return (
                <button
                  key={sub.id}
                  onClick={() => handleToggleSubject(sub.id)}
                  className={`p-3 rounded-2xl border text-xs font-semibold transition text-left flex items-center justify-between cursor-pointer ${
                    isSelected
                      ? 'bg-emerald-500/20 border-emerald-500 text-white font-bold'
                      : 'bg-slate-950 border-slate-800 text-slate-400 hover:bg-slate-800'
                  }`}
                >
                  <span>{sub.name} {isEnglish ? '(Compulsory)' : ''}</span>
                  {isSelected && <Check className="w-4 h-4 text-emerald-400" />}
                </button>
              );
            })}
          </div>
        </div>

        {/* Footer Actions */}
        <div className="border-t border-slate-800 pt-4 flex items-center justify-end space-x-3">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold rounded-xl transition"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            disabled={selectedSubjects.length !== 4}
            className="px-6 py-2.5 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 text-white font-bold text-xs rounded-xl transition shadow-lg shadow-emerald-600/30 disabled:opacity-40 disabled:cursor-not-allowed flex items-center gap-1.5"
            id="btn-save-profile"
          >
            <Save className="w-3.5 h-3.5" />
            <span>Save Profile</span>
          </button>
        </div>
      </div>
    </div>
  );
};
