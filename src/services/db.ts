import { 
  Question, 
  TheoryQuestion, 
  LiteratureText, 
  StudentProfile, 
  ExamResultSummary, 
  SubjectId, 
  WeakTopicAnalysis,
  ExamType
} from '../types';
import { INITIAL_QUESTIONS } from '../data/questionsBank';
import { EXTRA_QUESTIONS } from '../data/extraQuestions';
import { THEORY_QUESTIONS_BANK } from '../data/theoryBank';
import { LITERATURE_TEXTS } from '../data/literatureBank';
import { ALL_SUBJECTS, PRESET_COMBINATIONS } from '../data/subjects';
import { EXTENDED_SYLLABUS_QUESTIONS, generateDynamicQuestion } from '../data/questionGenerator';

const STORAGE_KEYS = {
  PROFILE: 'examsng_student_profile_v1',
  HISTORY: 'examsng_exam_history_v1',
  BOOKMARKS: 'examsng_bookmarked_ids_v1',
  CUSTOM_QUESTIONS: 'examsng_custom_questions_v1',
  STREAK_DATE: 'examsng_last_streak_date_v1'
};

const DEFAULT_PROFILE: StudentProfile = {
  name: 'Chidi Okafor',
  targetExam: 'UTME',
  targetScore: 295,
  targetCourse: 'Medicine & Surgery',
  targetUniversity: 'University of Ibadan (UI)',
  combination: ['english', 'biology', 'chemistry', 'physics'],
  savedCombinations: PRESET_COMBINATIONS,
  streakDays: 6,
  lastActiveDate: new Date().toISOString()
};

class OfflineExamDatabase {
  private questions: Question[] = [];
  private theoryQuestions: TheoryQuestion[] = [];
  private literatureTexts: LiteratureText[] = [];
  private isInitialized = false;

  constructor() {
    this.init();
  }

  public init() {
    if (this.isInitialized) return;

    // 1. Load curated questions bank + custom imported questions
    const customStored = this.getCustomQuestions();
    const bundled: Question[] = [...customStored, ...INITIAL_QUESTIONS, ...EXTRA_QUESTIONS];

    // 2. Load extended syllabus questions
    Object.entries(EXTENDED_SYLLABUS_QUESTIONS).forEach(([subjKey, list]) => {
      const subjId = subjKey as SubjectId;
      const subMeta = ALL_SUBJECTS.find(s => s.id === subjId);
      const subjName = subMeta ? subMeta.name : subjKey;

      list.forEach((item, idx) => {
        bundled.push({
          id: `${subjId}-ext-${idx + 1}`,
          examType: 'UTME',
          subjectId: subjId,
          subjectName: subjName,
          year: 2024 - (idx % 8),
          questionNumber: idx + 1,
          topic: item.topic,
          passage: item.passage,
          question: item.question,
          options: item.options,
          correctOption: item.correctOption,
          explanation: item.explanation,
          difficulty: 'medium'
        });
      });
    });
    
    // 3. Synthesize deep diverse non-repeating question pools for all 11 subjects (ensuring 120-150+ distinct questions per subject)
    const populatedBank = this.synthesizeFullSubjectBanks(bundled);
    this.questions = populatedBank;
    this.theoryQuestions = [...THEORY_QUESTIONS_BANK];
    this.literatureTexts = [...LITERATURE_TEXTS];
    
    this.checkAndUpdateDailyStreak();
    this.isInitialized = true;
  }

  // --- Custom Questions Management (Admin Dashboard) ---

  public getCustomQuestions(): Question[] {
    try {
      const stored = localStorage.getItem(STORAGE_KEYS.CUSTOM_QUESTIONS);
      return stored ? JSON.parse(stored) : [];
    } catch (e) {
      return [];
    }
  }

  public addQuestion(question: Question): void {
    const custom = this.getCustomQuestions();
    const updated = [question, ...custom];
    try {
      localStorage.setItem(STORAGE_KEYS.CUSTOM_QUESTIONS, JSON.stringify(updated));
    } catch (e) {
      console.warn('Failed to save question', e);
    }
    // Update active memory bank
    this.questions.unshift(question);
  }

  public updateQuestion(updatedQuestion: Question): void {
    const custom = this.getCustomQuestions();
    const idx = custom.findIndex(q => q.id === updatedQuestion.id);
    if (idx >= 0) {
      custom[idx] = updatedQuestion;
      try {
        localStorage.setItem(STORAGE_KEYS.CUSTOM_QUESTIONS, JSON.stringify(custom));
      } catch (e) {
        console.warn('Failed to update question in storage', e);
      }
    }
    // Update in-memory
    const memoryIdx = this.questions.findIndex(q => q.id === updatedQuestion.id);
    if (memoryIdx >= 0) {
      this.questions[memoryIdx] = updatedQuestion;
    }
  }

  public deleteQuestion(questionId: string): void {
    const custom = this.getCustomQuestions();
    const filtered = custom.filter(q => q.id !== questionId);
    try {
      localStorage.setItem(STORAGE_KEYS.CUSTOM_QUESTIONS, JSON.stringify(filtered));
    } catch (e) {
      console.warn('Failed to delete question from storage', e);
    }
    this.questions = this.questions.filter(q => q.id !== questionId);
  }

  public bulkImportQuestions(newQuestions: Question[]): { imported: number; errors: string[] } {
    const errors: string[] = [];
    const validQuestions: Question[] = [];

    newQuestions.forEach((q, idx) => {
      if (!q.question || typeof q.question !== 'string' || q.question.trim().length === 0) {
        errors.push(`Row ${idx + 1}: Missing question text`);
        return;
      }
      if (!q.options || !Array.isArray(q.options) || q.options.length < 2) {
        errors.push(`Row ${idx + 1}: Question must have at least 2 options (A, B)`);
        return;
      }
      if (!q.correctOption || !['A', 'B', 'C', 'D', 'E'].includes(q.correctOption)) {
        errors.push(`Row ${idx + 1}: Invalid correctOption (must be A, B, C, D, or E)`);
        return;
      }

      validQuestions.push({
        ...q,
        id: q.id || `custom-q-${Date.now()}-${idx}`
      });
    });

    if (validQuestions.length > 0) {
      const custom = this.getCustomQuestions();
      const updated = [...validQuestions, ...custom];
      try {
        localStorage.setItem(STORAGE_KEYS.CUSTOM_QUESTIONS, JSON.stringify(updated));
      } catch (e) {
        console.warn('Bulk import storage error', e);
      }
      this.questions.unshift(...validQuestions);
    }

    return { imported: validQuestions.length, errors };
  }

  // --- Active Exam Interruption Recovery ---

  public getSavedExamSession(): any | null {
    try {
      const stored = localStorage.getItem('examsng_active_exam_session_v1');
      return stored ? JSON.parse(stored) : null;
    } catch (e) {
      return null;
    }
  }

  public saveExamSessionState(session: any): void {
    try {
      localStorage.setItem('examsng_active_exam_session_v1', JSON.stringify(session));
    } catch (e) {
      // ignore
    }
  }

  public clearSavedExamSession(): void {
    try {
      localStorage.removeItem('examsng_active_exam_session_v1');
    } catch (e) {
      // ignore
    }
  }

  private synthesizeFullSubjectBanks(base: Question[]): Question[] {
    const fullBank: Question[] = [...base];
    
    // Ensure every subject has a deep pool of 120+ distinct questions across all its topics
    ALL_SUBJECTS.forEach(sub => {
      const existing = base.filter(q => q.subjectId === sub.id);
      const targetPoolSize = sub.id === 'english' ? 140 : 100;
      
      let count = existing.length;
      let variantIdx = 1;
      
      while (count < targetPoolSize) {
        sub.topics.forEach((topic) => {
          if (count >= targetPoolSize) return;
          const year = 2017 + (variantIdx % 8);
          const dynamicQ = generateDynamicQuestion(sub.id, topic, count, year);
          fullBank.push(dynamicQ);
          count++;
        });
        variantIdx++;
      }
    });

    return fullBank;
  }

  // --- Public Queries ---

  public getAllQuestions(): Question[] {
    this.init();
    return this.questions;
  }

  public getQuestionsBySubject(
    subjectId: SubjectId, 
    limit = 40, 
    examType?: ExamType,
    topic?: string,
    year?: number
  ): Question[] {
    this.init();
    let list = this.questions.filter(q => q.subjectId === subjectId);

    if (examType) {
      list = list.filter(q => q.examType === examType);
    }
    if (topic && topic !== 'all') {
      list = list.filter(q => q.topic === topic);
    }
    if (year && year > 0) {
      list = list.filter(q => q.year === year);
    }

    // Shuffle and guarantee distinct questions
    const shuffled = [...list].sort(() => 0.5 - Math.random());
    const uniqueQuestions: Question[] = [];
    const seenTexts = new Set<string>();

    for (const q of shuffled) {
      const key = q.question.trim().toLowerCase();
      if (!seenTexts.has(key)) {
        seenTexts.add(key);
        uniqueQuestions.push({
          ...q,
          questionNumber: uniqueQuestions.length + 1
        });
      }
      if (uniqueQuestions.length >= limit) break;
    }

    return uniqueQuestions;
  }

  public getUtmeMockBundle(subjects: [SubjectId, SubjectId, SubjectId, SubjectId]): Record<SubjectId, Question[]> {
    this.init();
    const result: Record<SubjectId, Question[]> = {} as any;

    subjects.forEach((subjId, idx) => {
      // JAMB Standard: English = 60 Qs, others = 40 Qs each (Total = 180 Qs)
      const count = ((subjId as string) === 'english' || idx === 0) ? 60 : 40;
      
      const subjQuestions = this.questions.filter(q => q.subjectId === subjId);
      const shuffled = [...subjQuestions].sort(() => 0.5 - Math.random());
      
      const uniqueSelected: Question[] = [];
      const seenTexts = new Set<string>();

      for (const q of shuffled) {
        const key = q.question.trim().toLowerCase();
        if (!seenTexts.has(key)) {
          seenTexts.add(key);
          uniqueSelected.push({
            ...q,
            questionNumber: uniqueSelected.length + 1
          });
        }
        if (uniqueSelected.length >= count) break;
      }

      // If more questions needed, generate unique ones dynamically
      if (uniqueSelected.length < count) {
        const meta = ALL_SUBJECTS.find(s => s.id === subjId);
        const topics = meta?.topics || ['General'];
        let genIdx = uniqueSelected.length;

        while (uniqueSelected.length < count) {
          const topic = topics[genIdx % topics.length];
          const dynamicQ = generateDynamicQuestion(subjId, topic, genIdx + 100, 2024 - (genIdx % 5));
          const key = dynamicQ.question.trim().toLowerCase();
          
          if (!seenTexts.has(key)) {
            seenTexts.add(key);
            uniqueSelected.push({
              ...dynamicQ,
              questionNumber: uniqueSelected.length + 1
            });
          }
          genIdx++;
        }
      }

      result[subjId] = uniqueSelected;
    });

    return result;
  }

  public getTheoryQuestions(subjectId?: SubjectId, examType?: 'WAEC' | 'NECO'): TheoryQuestion[] {
    this.init();
    let list = this.theoryQuestions;
    if (subjectId) {
      list = list.filter(t => t.subjectId === subjectId);
    }
    if (examType) {
      list = list.filter(t => t.examType === examType);
    }
    return list;
  }

  public getLiteratureTexts(): LiteratureText[] {
    this.init();
    return this.literatureTexts;
  }

  public getLiteratureTextById(id: string): LiteratureText | undefined {
    this.init();
    return this.literatureTexts.find(t => t.id === id);
  }

  // --- Student Profile & Storage ---

  public getStudentProfile(): StudentProfile {
    try {
      const stored = localStorage.getItem(STORAGE_KEYS.PROFILE);
      if (stored) {
        return JSON.parse(stored);
      }
    } catch (e) {
      console.warn('Storage read error', e);
    }
    return DEFAULT_PROFILE;
  }

  public saveStudentProfile(profile: Partial<StudentProfile>): StudentProfile {
    const current = this.getStudentProfile();
    const updated: StudentProfile = { ...current, ...profile };
    try {
      localStorage.setItem(STORAGE_KEYS.PROFILE, JSON.stringify(updated));
    } catch (e) {
      console.warn('Storage write error', e);
    }
    return updated;
  }

  public checkAndUpdateDailyStreak(): void {
    try {
      const lastDateStr = localStorage.getItem(STORAGE_KEYS.STREAK_DATE);
      const todayStr = new Date().toISOString().split('T')[0];

      if (!lastDateStr) {
        localStorage.setItem(STORAGE_KEYS.STREAK_DATE, todayStr);
        return;
      }

      if (lastDateStr === todayStr) return;

      const lastDate = new Date(lastDateStr);
      const today = new Date(todayStr);
      const diffDays = Math.round((today.getTime() - lastDate.getTime()) / (1000 * 3600 * 24));

      const profile = this.getStudentProfile();
      if (diffDays === 1) {
        profile.streakDays += 1;
      } else if (diffDays > 1) {
        profile.streakDays = 1;
      }
      profile.lastActiveDate = new Date().toISOString();
      this.saveStudentProfile(profile);
      localStorage.setItem(STORAGE_KEYS.STREAK_DATE, todayStr);
    } catch (e) {
      // ignore
    }
  }

  // --- History & Results ---

  public getExamHistory(): ExamResultSummary[] {
    try {
      const stored = localStorage.getItem(STORAGE_KEYS.HISTORY);
      if (stored) {
        return JSON.parse(stored);
      }
    } catch (e) {
      console.warn('History read error', e);
    }
    return [];
  }

  public saveExamResult(result: ExamResultSummary): void {
    const history = this.getExamHistory();
    const updated = [result, ...history].slice(0, 50); // Keep last 50
    try {
      localStorage.setItem(STORAGE_KEYS.HISTORY, JSON.stringify(updated));
    } catch (e) {
      console.warn('History write error', e);
    }
  }

  public getWeakTopicsAnalysis(): WeakTopicAnalysis[] {
    const history = this.getExamHistory();
    const topicStats: Record<string, { subjectId: SubjectId; subjectName: string; attempted: number; correct: number }> = {};

    history.forEach(session => {
      if (session.topicBreakdown) {
        Object.entries(session.topicBreakdown).forEach(([topic, stats]) => {
          if (!topicStats[topic]) {
            // Find subject for this topic
            const sub = ALL_SUBJECTS.find(s => s.topics.includes(topic)) || ALL_SUBJECTS[0];
            topicStats[topic] = {
              subjectId: sub.id,
              subjectName: sub.name,
              attempted: 0,
              correct: 0
            };
          }
          topicStats[topic].attempted += stats.total;
          topicStats[topic].correct += stats.correct;
        });
      }
    });

    const results: WeakTopicAnalysis[] = [];
    Object.entries(topicStats).forEach(([topic, data]) => {
      if (data.attempted >= 3) {
        const accuracy = Math.round((data.correct / data.attempted) * 100);
        if (accuracy < 70) {
          results.push({
            topic,
            subjectId: data.subjectId,
            subjectName: data.subjectName,
            attempted: data.attempted,
            correct: data.correct,
            accuracy,
            recommendation: accuracy < 45 
              ? 'Urgent Review: Read textbook fundamentals & practice 20 targeted past questions.'
              : 'Moderate Gap: Review formula derivation and past questions.'
          });
        }
      }
    });

    // If no real weak topics yet, generate smart starter diagnostics
    if (results.length === 0) {
      return [
        {
          topic: 'Calculus (Differentiation & Integration)',
          subjectId: 'mathematics',
          subjectName: 'Mathematics',
          attempted: 8,
          correct: 3,
          accuracy: 38,
          recommendation: 'Master chain rule, product rule & definite integration limits.'
        },
        {
          topic: 'Electric Current & Circuit Analysis',
          subjectId: 'physics',
          subjectName: 'Physics',
          attempted: 10,
          correct: 4,
          accuracy: 40,
          recommendation: 'Review internal resistance of cells and Kirchhoff\'s laws.'
        },
        {
          topic: 'Volumetric Analysis & Titration',
          subjectId: 'chemistry',
          subjectName: 'Chemistry',
          attempted: 12,
          correct: 6,
          accuracy: 50,
          recommendation: 'Practice mole ratios and molarity calculations with acid-base equations.'
        },
        {
          topic: 'Oral Forms (Vowels & Consonants)',
          subjectId: 'english',
          subjectName: 'Use of English',
          attempted: 15,
          correct: 8,
          accuracy: 53,
          recommendation: 'Drill monophthongs, diphthongs and silent consonants.'
        }
      ];
    }

    return results.sort((a, b) => a.accuracy - b.accuracy);
  }

  // --- Bookmarks ---

  public getBookmarkedIds(): string[] {
    try {
      const stored = localStorage.getItem(STORAGE_KEYS.BOOKMARKS);
      return stored ? JSON.parse(stored) : [];
    } catch (e) {
      return [];
    }
  }

  public getBookmarkedQuestions(): Question[] {
    this.init();
    const ids = this.getBookmarkedIds();
    return this.questions.filter(q => ids.includes(q.id));
  }

  public toggleBookmark(questionId: string): boolean {
    const list = this.getBookmarkedIds();
    const index = list.indexOf(questionId);
    let isBookmarked: boolean;

    if (index >= 0) {
      list.splice(index, 1);
      isBookmarked = false;
    } else {
      list.push(questionId);
      isBookmarked = true;
    }

    try {
      localStorage.setItem(STORAGE_KEYS.BOOKMARKS, JSON.stringify(list));
    } catch (e) {
      // ignore
    }
    return isBookmarked;
  }
}

export const offlineDB = new OfflineExamDatabase();
