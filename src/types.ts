export type ExamType = 'UTME' | 'WAEC' | 'NECO';

export type SubjectId = 
  | 'english'
  | 'mathematics'
  | 'physics'
  | 'chemistry'
  | 'biology'
  | 'economics'
  | 'government'
  | 'literature'
  | 'crs'
  | 'accounting'
  | 'commerce'
  | 'civics';

export interface SubjectMeta {
  id: SubjectId;
  name: string;
  shortName: string;
  icon: string;
  color: string;
  defaultUtmeQuestions: number;
  topics: string[];
}

export interface QuestionOption {
  key: 'A' | 'B' | 'C' | 'D' | 'E';
  text: string;
}

export type DiagramType = 
  | 'circuit'
  | 'lens'
  | 'vernier'
  | 'micrometer'
  | 'nephron'
  | 'eye'
  | 'cell'
  | 'flower'
  | 'circle_theorem'
  | 'bearing'
  | 'trigonometry'
  | 'titration'
  | 'galvanic'
  | 'pulley'
  | 'pendulum'
  | 'none';

export interface DiagramConfig {
  type: DiagramType;
  title?: string;
  data?: Record<string, any>;
}

export interface Question {
  id: string;
  examType: ExamType;
  subjectId: SubjectId;
  subjectName: string;
  year: number;
  questionNumber: number;
  topic: string;
  question: string;
  passage?: string; // Comprehension / Cloze passage
  diagram?: DiagramConfig;
  options: QuestionOption[];
  correctOption: 'A' | 'B' | 'C' | 'D' | 'E';
  explanation: string;
  syllabusReference?: string;
  difficulty?: 'easy' | 'medium' | 'hard';
}

export interface MarkingRubricStep {
  id: string;
  step: string;
  mark: number;
  markType: 'M' | 'A' | 'B'; // Method, Accuracy, Bonus
  criteria: string;
}

export interface TheoryQuestion {
  id: string;
  examType: 'WAEC' | 'NECO';
  subjectId: SubjectId;
  subjectName: string;
  year: number;
  paper: string;
  section: string;
  questionNumber: string;
  topic: string;
  questionText: string;
  diagram?: DiagramConfig;
  totalMarks: number;
  rubrics: MarkingRubricStep[];
  modelAnswer: string;
  examinerRemarks: string;
  commonPitfalls: string[];
}

export interface LiteratureCharacter {
  name: string;
  role: string;
  description: string;
  traits: string[];
}

export interface LiteratureTheme {
  title: string;
  description: string;
  keyQuotes: string[];
}

export interface LiteratureChapter {
  number: number;
  title: string;
  summary: string;
  keyEvents: string[];
  sampleQuestions: Question[];
}

export interface LiteratureText {
  id: string;
  title: string;
  author: string;
  exam: 'JAMB UTME' | 'WAEC';
  genre: string;
  synopsis: string;
  characters: LiteratureCharacter[];
  themes: LiteratureTheme[];
  chapters: LiteratureChapter[];
}

export interface SavedCombination {
  id: string;
  name: string;
  faculty: string;
  subjects: [SubjectId, SubjectId, SubjectId, SubjectId];
}

export interface StudentProfile {
  name: string;
  targetExam: ExamType;
  targetScore: number;
  targetCourse: string;
  targetUniversity: string;
  combination: [SubjectId, SubjectId, SubjectId, SubjectId];
  savedCombinations: SavedCombination[];
  streakDays: number;
  lastActiveDate: string;
}

export interface ExamSessionState {
  id: string;
  examType: ExamType;
  mode: 'utme_full_mock' | 'single_subject' | 'theory_grading' | 'weak_topic_drill' | 'literature_quiz';
  title: string;
  startedAt: number;
  timeLimitSeconds: number;
  timeRemainingSeconds: number;
  subjects: SubjectId[];
  activeSubjectIndex: number;
  questionsBySubject: Record<SubjectId, Question[]>;
  userAnswers: Record<string, 'A' | 'B' | 'C' | 'D' | 'E'>; // questionId -> answer
  flaggedQuestions: Record<string, boolean>; // questionId -> boolean
  isCompleted: boolean;
  scoreResult?: ExamResultSummary;
}

export interface SubjectResult {
  subjectId: SubjectId;
  subjectName: string;
  attempted: number;
  correct: number;
  total: number;
  percentage: number;
  scaledScore: number; // e.g. out of 100 for UTME
}

export interface ExamResultSummary {
  id: string;
  sessionId: string;
  date: string;
  examType: ExamType;
  mode: string;
  title: string;
  totalQuestions: number;
  totalAttempted: number;
  totalCorrect: number;
  totalScore: number; // out of 400 for UTME
  maxScore: number;
  timeSpentSeconds: number;
  subjects: SubjectResult[];
  topicBreakdown: Record<string, { correct: number; total: number }>;
}

export interface WeakTopicAnalysis {
  topic: string;
  subjectId: SubjectId;
  subjectName: string;
  attempted: number;
  correct: number;
  accuracy: number;
  recommendation: string;
}
