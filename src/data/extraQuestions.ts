import { Question } from '../types';

export const EXTRA_QUESTIONS: Question[] = [
  // Mathematics Extra
  {
    id: 'math-waec-2023-01',
    examType: 'WAEC',
    subjectId: 'mathematics',
    subjectName: 'Mathematics',
    year: 2023,
    questionNumber: 6,
    topic: 'Algebra & Quadratic Equations',
    question: `If α and β are the roots of the quadratic equation 2x² - 7x + 3 = 0, find the value of (1/α + 1/β).`,
    options: [
      { key: 'A', text: '7/3' },
      { key: 'B', text: '3/7' },
      { key: 'C', text: '-7/3' },
      { key: 'D', text: '7/6' }
    ],
    correctOption: 'A',
    explanation: `For ax² + bx + c = 0:\nSum of roots (α + β) = -b/a = -(-7)/2 = 7/2.\nProduct of roots (αβ) = c/a = 3/2.\n1/α + 1/β = (α + β) / (αβ) = (7/2) / (3/2) = 7/3.`,
    syllabusReference: 'WAEC Syllabus: Quadratic Equations and Roots Relations',
    difficulty: 'medium'
  },
  {
    id: 'math-utme-2023-07',
    examType: 'UTME',
    subjectId: 'mathematics',
    subjectName: 'Mathematics',
    year: 2023,
    questionNumber: 7,
    topic: 'Logarithms, Indices & Surds',
    question: `Simplify: log₁₀(25) + log₁₀(40) - log₁₀(10).`,
    options: [
      { key: 'A', text: '2' },
      { key: 'B', text: '3' },
      { key: 'C', text: '4' },
      { key: 'D', text: '100' }
    ],
    correctOption: 'A',
    explanation: `Using logarithm laws: log(a) + log(b) - log(c) = log((a × b) / c).\nlog₁₀((25 × 40) / 10) = log₁₀(1000 / 10) = log₁₀(100) = log₁₀(10²) = 2.`,
    syllabusReference: 'JAMB Syllabus: Laws of Logarithms',
    difficulty: 'easy'
  },
  {
    id: 'math-utme-2023-08',
    examType: 'UTME',
    subjectId: 'mathematics',
    subjectName: 'Mathematics',
    year: 2023,
    questionNumber: 8,
    topic: 'Calculus (Differentiation & Integration)',
    question: `Evaluate the definite integral ∫ from 1 to 3 of (3x² - 2x + 1) dx.`,
    options: [
      { key: 'A', text: '18' },
      { key: 'B', text: '20' },
      { key: 'C', text: '26' },
      { key: 'D', text: '28' }
    ],
    correctOption: 'B',
    explanation: `Indefinite integral F(x) = x³ - x² + x.\nAt upper limit x = 3: F(3) = 3³ - 3² + 3 = 27 - 9 + 3 = 21.\nAt lower limit x = 1: F(1) = 1³ - 1² + 1 = 1 - 1 + 1 = 1.\nDefinite integral = F(3) - F(1) = 21 - 1 = 20.`,
    syllabusReference: 'JAMB Syllabus: Definite Integration and Area',
    difficulty: 'medium'
  },

  // Physics Extra
  {
    id: 'phy-utme-2023-06',
    examType: 'UTME',
    subjectId: 'physics',
    subjectName: 'Physics',
    year: 2023,
    questionNumber: 6,
    topic: 'Thermal Physics & Gas Laws',
    question: `A fixed mass of gas occupies a volume of 400 cm³ at 27°C. What volume will it occupy at 127°C if the pressure remains constant?`,
    options: [
      { key: 'A', text: '533.3 cm³' },
      { key: 'B', text: '300.0 cm³' },
      { key: 'C', text: '1880 cm³' },
      { key: 'D', text: '450.0 cm³' }
    ],
    correctOption: 'A',
    explanation: `Using Charles's Law: V₁ / T₁ = V₂ / T₂ (temperatures in Kelvin).\nT₁ = 27 + 273 = 300 K; T₂ = 127 + 273 = 400 K.\n400 / 300 = V₂ / 400 => V₂ = (400 × 400) / 300 = 1600 / 3 ≈ 533.33 cm³.`,
    syllabusReference: 'JAMB Syllabus: Charles\'s Law and Absolute Temperature',
    difficulty: 'easy'
  },
  {
    id: 'phy-utme-2023-07',
    examType: 'UTME',
    subjectId: 'physics',
    subjectName: 'Physics',
    year: 2023,
    questionNumber: 7,
    topic: 'Electromagnetism & Induction',
    question: `Faraday's Law of Electromagnetic Induction states that the magnitude of induced electromotive force (e.m.f.) is directly proportional to:`,
    options: [
      { key: 'A', text: 'The resistance of the conductor' },
      { key: 'B', text: 'The time rate of change of magnetic flux linkage' },
      { key: 'C', text: 'The temperature of the solenoid core' },
      { key: 'D', text: 'The electrostatic potential difference' }
    ],
    correctOption: 'B',
    explanation: `Faraday's law mathematically states ε = -N (dΦ/dt), where the induced emf is proportional to the rate of change of magnetic flux linkage.`,
    syllabusReference: 'WAEC/JAMB Syllabus: Electromagnetic Induction',
    difficulty: 'easy'
  },

  // Chemistry Extra
  {
    id: 'chem-utme-2023-05',
    examType: 'UTME',
    subjectId: 'chemistry',
    subjectName: 'Chemistry',
    year: 2023,
    questionNumber: 5,
    topic: 'Periodic Table & Chemical Bonding',
    question: `Which of the following electronic configurations represents an element with the highest first ionization energy?`,
    options: [
      { key: 'A', text: '1s² 2s² 2p⁶' },
      { key: 'B', text: '1s² 2s² 2p⁶ 3s¹' },
      { key: 'C', text: '1s² 2s² 2p⁶ 3s² 3p⁴' },
      { key: 'D', text: '1s² 2s² 2p³' }
    ],
    correctOption: 'A',
    explanation: `1s² 2s² 2p⁶ is the electron configuration of Neon (a noble gas with a completely filled octet in the second shell), which has the highest ionization energy due to high nuclear charge and noble gas stability.`,
    syllabusReference: 'JAMB Syllabus: Periodic Trends in Ionization Energy',
    difficulty: 'medium'
  },
  {
    id: 'chem-utme-2023-06',
    examType: 'UTME',
    subjectId: 'chemistry',
    subjectName: 'Chemistry',
    year: 2023,
    questionNumber: 6,
    topic: 'Stoichiometry & Gas Calculations',
    question: `What volume of carbon(IV) oxide at s.t.p. is produced when 20.0 g of calcium trioxocarbonate(IV) (CaCO₃) is completely decomposed by heating? [Ca = 40, C = 12, O = 16, Molar volume at s.t.p. = 22.4 dm³]`,
    options: [
      { key: 'A', text: '2.24 dm³' },
      { key: 'B', text: '4.48 dm³' },
      { key: 'C', text: '22.4 dm³' },
      { key: 'D', text: '44.8 dm³' }
    ],
    correctOption: 'B',
    explanation: `CaCO₃ → CaO + CO₂ (g).\nMolar mass of CaCO₃ = 40 + 12 + (3 × 16) = 100 g/mol.\nMoles of CaCO₃ = 20 g / 100 g/mol = 0.20 mol.\nFrom stoichiometry, 1 mole CaCO₃ yields 1 mole CO₂.\nMoles of CO₂ = 0.20 mol.\nVolume at s.t.p. = 0.20 mol × 22.4 dm³/mol = 4.48 dm³.`,
    syllabusReference: 'WAEC/JAMB Syllabus: Stoichiometry and Gas Molar Volume',
    difficulty: 'medium'
  },

  // Biology Extra
  {
    id: 'bio-utme-2023-05',
    examType: 'UTME',
    subjectId: 'biology',
    subjectName: 'Biology',
    year: 2023,
    questionNumber: 5,
    topic: 'Cell Biology & Organelles',
    question: `The organelle responsible for aerobic cellular respiration and ATP synthesis in eukaryotic cells is the:`,
    options: [
      { key: 'A', text: 'Ribosome' },
      { key: 'B', text: 'Mitochondrion' },
      { key: 'C', text: 'Endoplasmic Reticulum' },
      { key: 'D', text: 'Golgi Apparatus' }
    ],
    correctOption: 'B',
    explanation: `The mitochondrion is known as the powerhouse of the cell, where the Krebs cycle and oxidative phosphorylation generate ATP through aerobic respiration.`,
    syllabusReference: 'JAMB Syllabus: Cell Structure and Functions',
    difficulty: 'easy'
  },
  {
    id: 'bio-utme-2023-06',
    examType: 'UTME',
    subjectId: 'biology',
    subjectName: 'Biology',
    year: 2023,
    questionNumber: 6,
    topic: 'Ecology & Energy Flow',
    question: `In an ecological pyramid of energy, why does the amount of available energy decrease progressively from producers to tertiary consumers?`,
    options: [
      { key: 'A', text: 'Energy is destroyed according to the First Law of Thermodynamics.' },
      { key: 'B', text: 'Energy is lost as metabolic heat, respiration, and excretion at each trophic level (~90% loss).' },
      { key: 'C', text: 'Carnivores do not consume food regularly.' },
      { key: 'D', text: 'Solar radiation does not reach secondary consumers.' }
    ],
    correctOption: 'B',
    explanation: `According to Lindeman's 10% ecological efficiency rule, approximately 90% of energy at each trophic transfer is dissipated as metabolic heat and waste, leaving only ~10% for the next consumer level.`,
    syllabusReference: 'JAMB Syllabus: Energy Flow and Trophic Levels in Ecosystems',
    difficulty: 'medium'
  },

  // Use of English Extra
  {
    id: 'eng-utme-2023-06',
    examType: 'UTME',
    subjectId: 'english',
    subjectName: 'Use of English',
    year: 2023,
    questionNumber: 6,
    topic: 'Lexis & Structure',
    question: `Choose the correct option to fill in the blank:\n\n"Neither the principal nor the teachers ________ in attendance at yesterday's emergency assembly."`,
    options: [
      { key: 'A', text: 'was' },
      { key: 'B', text: 'were' },
      { key: 'C', text: 'are' },
      { key: 'D', text: 'is' }
    ],
    correctOption: 'B',
    explanation: `Rule of Proximity for 'neither... nor': The verb agrees with the closer subject. 'The teachers' is plural, and the event occurred in the past ('yesterday'), hence the past plural verb 'were' is required.`,
    syllabusReference: 'JAMB Syllabus: Subject-Verb Agreement (Concord)',
    difficulty: 'medium'
  },
  {
    id: 'eng-utme-2023-07',
    examType: 'UTME',
    subjectId: 'english',
    subjectName: 'Use of English',
    year: 2023,
    questionNumber: 7,
    topic: 'Sentence Interpretation',
    question: `Interpret the sentence:\n\n"Had Zainab arrived ten minutes earlier, she would have caught the morning train to Kaduna."`,
    options: [
      { key: 'A', text: 'Zainab arrived early and boarded the train.' },
      { key: 'B', text: 'Zainab arrived late and missed the train.' },
      { key: 'C', text: 'The train was delayed by ten minutes.' },
      { key: 'D', text: 'Zainab decided not to travel to Kaduna.' }
    ],
    correctOption: 'B',
    explanation: `This is a third conditional construction describing an unfulfilled past condition. Zainab arrived late; consequently, she missed the train.`,
    syllabusReference: 'JAMB Syllabus: Sentence Interpretation & Conditionals',
    difficulty: 'easy'
  }
];
