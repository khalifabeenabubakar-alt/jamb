import { SubjectMeta, SubjectId, SavedCombination } from '../types';

export const ALL_SUBJECTS: SubjectMeta[] = [
  {
    id: 'english',
    name: 'Use of English',
    shortName: 'English',
    icon: 'BookOpen',
    color: 'emerald',
    defaultUtmeQuestions: 60,
    topics: [
      'Comprehension & Passage Analysis',
      'Lexis & Structure',
      'Antonyms & Synonyms',
      'Oral Forms (Vowels & Consonants)',
      'Sentence Interpretation',
      'Idioms & Collocations',
      'Assigned Novel / Literature Guide'
    ]
  },
  {
    id: 'mathematics',
    name: 'Mathematics',
    shortName: 'Maths',
    icon: 'Calculator',
    color: 'blue',
    defaultUtmeQuestions: 40,
    topics: [
      'Algebra & Quadratic Equations',
      'Calculus (Differentiation & Integration)',
      'Trigonometry & Bearing',
      'Circle Geometry & Theorems',
      'Matrices & Determinants',
      'Statistics & Probability',
      'Logarithms, Indices & Surds',
      'Coordinate Geometry'
    ]
  },
  {
    id: 'physics',
    name: 'Physics',
    shortName: 'Physics',
    icon: 'Zap',
    color: 'amber',
    defaultUtmeQuestions: 40,
    topics: [
      'Electric Current & Circuit Analysis',
      'Optics, Lenses & Mirrors',
      'Mechanics (Motion, Pulleys & Work)',
      'Thermal Physics & Gas Laws',
      'Waves & Sound Resonance',
      'Atomic & Nuclear Physics',
      'Electromagnetism & Induction',
      'Gravitational & Electric Fields'
    ]
  },
  {
    id: 'chemistry',
    name: 'Chemistry',
    shortName: 'Chemistry',
    icon: 'FlaskConical',
    color: 'purple',
    defaultUtmeQuestions: 40,
    topics: [
      'Organic Chemistry (Alkanes, Alkanols, Esters)',
      'Volumetric Analysis & Titration',
      'Electrochemistry & Electrolysis',
      'Periodic Table & Chemical Bonding',
      'Acids, Bases, Salts & pH',
      'Thermochemistry & Rate of Reactions',
      'Stoichiometry & Gas Calculations',
      'Metals, Non-metals & Extraction'
    ]
  },
  {
    id: 'biology',
    name: 'Biology',
    shortName: 'Biology',
    icon: 'Dna',
    color: 'teal',
    defaultUtmeQuestions: 40,
    topics: [
      'Genetics & Heredity',
      'Excretion & Human Kidney (Nephron)',
      'Cell Biology & Organelles',
      'Plant Reproduction & Flower Anatomy',
      'Circulation & Respiration',
      'Ecology & Energy Flow',
      'Sensory Organs (Eye & Ear)',
      'Nutrition & Enzymes'
    ]
  },
  {
    id: 'economics',
    name: 'Economics',
    shortName: 'Economics',
    icon: 'TrendingUp',
    color: 'indigo',
    defaultUtmeQuestions: 40,
    topics: [
      'Price Determination & Elasticity',
      'National Income Accounting',
      'Money & Banking Systems',
      'International Trade & Balance of Payments',
      'Production Theory & Diminishing Returns',
      'Public Finance & Taxation',
      'Market Structures (Monopoly, Perfect Comp.)',
      'Economic Planning in Nigeria'
    ]
  },
  {
    id: 'government',
    name: 'Government',
    shortName: 'Government',
    icon: 'Landmark',
    color: 'rose',
    defaultUtmeQuestions: 40,
    topics: [
      'Constitutional Development in Nigeria',
      'Federalism & Division of Powers',
      'Political Parties & Electoral Systems',
      'Public Administration & Civil Service',
      'Foreign Policy & International Orgs (ECOWAS, UN, AU)',
      'Basic Concepts of State & Sovereignty',
      'Military Rule in Nigeria'
    ]
  },
  {
    id: 'literature',
    name: 'Literature in English',
    shortName: 'Literature',
    icon: 'Feather',
    color: 'pink',
    defaultUtmeQuestions: 40,
    topics: [
      'Literary Devices & Figures of Speech',
      'African Prose & Novels',
      'Non-African Prose',
      'African Poetry',
      'Non-African Poetry',
      'Drama & Theatre Analysis'
    ]
  },
  {
    id: 'crs',
    name: 'Christian Religious Studies',
    shortName: 'CRS',
    icon: 'Cross',
    color: 'sky',
    defaultUtmeQuestions: 40,
    topics: [
      'Sovereignty of God & Creation',
      'Covenant & Deliverance in Israel',
      'Prophetic Teachings',
      'Life and Ministry of Jesus',
      'The Early Church & Apostles',
      'Christian Living in the Epistles'
    ]
  },
  {
    id: 'accounting',
    name: 'Financial Accounting',
    shortName: 'Accounting',
    icon: 'BarChart3',
    color: 'cyan',
    defaultUtmeQuestions: 40,
    topics: [
      'Double Entry Principle & Ledger',
      'Bank Reconciliation Statements',
      'Trading, Profit and Loss Accounts',
      'Partnership Accounts',
      'Company Accounts & Share Capital',
      'Depreciation & Bad Debts',
      'Control Accounts & Suspense Accounts'
    ]
  }
];

export const PRESET_COMBINATIONS: SavedCombination[] = [
  {
    id: 'engineering',
    name: 'Engineering / Tech / Physical Sciences',
    faculty: 'Faculty of Engineering / Computing',
    subjects: ['english', 'mathematics', 'physics', 'chemistry']
  },
  {
    id: 'medicine',
    name: 'Medicine & Surgery / Health Sciences / Pharmacy',
    faculty: 'Faculty of Medicine / Basic Medical',
    subjects: ['english', 'biology', 'chemistry', 'physics']
  },
  {
    id: 'social_science',
    name: 'Economics / Accounting / Business Admin',
    faculty: 'Faculty of Social & Management Sciences',
    subjects: ['english', 'mathematics', 'economics', 'government']
  },
  {
    id: 'law_arts',
    name: 'Law / Mass Comm / Political Science',
    faculty: 'Faculty of Law / Arts & Humanities',
    subjects: ['english', 'literature', 'government', 'crs']
  },
  {
    id: 'agriculture',
    name: 'Agricultural Science / Food Technology',
    faculty: 'Faculty of Agriculture',
    subjects: ['english', 'chemistry', 'biology', 'physics']
  }
];

export const CUT_OFF_MARKS_REFERENCE = [
  {
    course: 'Medicine & Surgery',
    unilag: 300,
    ui: 295,
    oau: 285,
    uniben: 280,
    tier: 'Tier 1 (285+)'
  },
  {
    course: 'Law',
    unilag: 280,
    ui: 280,
    oau: 275,
    uniben: 270,
    tier: 'Tier 1 (270+)'
  },
  {
    course: 'Computer Science / Software Eng.',
    unilag: 270,
    ui: 265,
    oau: 260,
    uniben: 250,
    tier: 'Tier 2 (250+)'
  },
  {
    course: 'Mechanical / Electrical Engineering',
    unilag: 265,
    ui: 260,
    oau: 255,
    uniben: 245,
    tier: 'Tier 2 (245+)'
  },
  {
    course: 'Accounting / Finance',
    unilag: 255,
    ui: 250,
    oau: 245,
    uniben: 240,
    tier: 'Tier 2 (240+)'
  },
  {
    course: 'Economics',
    unilag: 250,
    ui: 245,
    oau: 240,
    uniben: 230,
    tier: 'Tier 3 (230+)'
  },
  {
    course: 'Nursing Science',
    unilag: 265,
    ui: 265,
    oau: 260,
    uniben: 255,
    tier: 'Tier 2 (255+)'
  },
  {
    course: 'Pharmacy',
    unilag: 275,
    ui: 270,
    oau: 265,
    uniben: 260,
    tier: 'Tier 2 (260+)'
  }
];
