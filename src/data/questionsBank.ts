import { Question } from '../types';

export const INITIAL_QUESTIONS: Question[] = [
  // ==========================================
  // USE OF ENGLISH (Comprehension, Lexis, Antonyms, Novel)
  // ==========================================
  {
    id: 'eng-utme-2024-01',
    examType: 'UTME',
    subjectId: 'english',
    subjectName: 'Use of English',
    year: 2024,
    questionNumber: 1,
    topic: 'Comprehension & Passage Analysis',
    passage: `In recent decades, artificial intelligence and renewable energy technologies have reshaped sub-Saharan Africa's economic prospects. While traditional extractive industries generated concentrated wealth without proportionate employment growth, distributed solar microgrids and mobile fintech platforms have democratized access to capital and power. However, digital infrastructure without foundational institutional governance risks creating a new digital divide where unbanked agrarian communities remain marginalized.`,
    question: `According to the passage, what distinguishes mobile fintech platforms and solar microgrids from traditional extractive industries?`,
    options: [
      { key: 'A', text: 'They require massive state subsidies and foreign direct investment.' },
      { key: 'B', text: 'They distribute economic access and utility more democratically across the populace.' },
      { key: 'C', text: 'They operate exclusively in urban commercial banking centers.' },
      { key: 'D', text: 'They eliminate the necessity for institutional governance and rule of law.' }
    ],
    correctOption: 'B',
    explanation: `The passage explicitly notes that traditional extractive industries generated concentrated wealth without employment growth, whereas solar microgrids and mobile fintech platforms 'democratized access to capital and power'. Option B is the correct deduction.`,
    syllabusReference: 'JAMB Syllabus: Comprehension / Critical Reading Skills',
    difficulty: 'medium'
  },
  {
    id: 'eng-utme-2024-02',
    examType: 'UTME',
    subjectId: 'english',
    subjectName: 'Use of English',
    year: 2024,
    questionNumber: 2,
    topic: 'Antonyms & Synonyms',
    question: `In the sentence below, select the option that is nearest in meaning to the underlined word:\n\n"The committee found the candidate's explanation rather **tenuous** and lacking verifiable documentary evidence."`,
    options: [
      { key: 'A', text: 'Convincing and robust' },
      { key: 'B', text: 'Weak and unsubstantiated' },
      { key: 'C', text: 'Lengthy and convoluted' },
      { key: 'D', text: 'Concise and authoritative' }
    ],
    correctOption: 'B',
    explanation: `'Tenuous' means very weak, slight, or flimsy; lacking a sound basis. 'Weak and unsubstantiated' is the precise synonym.`,
    syllabusReference: 'JAMB Syllabus: Lexis and Structure / Vocabulary',
    difficulty: 'easy'
  },
  {
    id: 'eng-utme-2024-03',
    examType: 'UTME',
    subjectId: 'english',
    subjectName: 'Use of English',
    year: 2024,
    questionNumber: 3,
    topic: 'Antonyms & Synonyms',
    question: `Choose the option opposite in meaning to the capitalized word:\n\n"The state governor took **METICULOUS** care to audit every infrastructural procurement contract."`,
    options: [
      { key: 'A', text: 'Careless' },
      { key: 'B', text: 'Cautious' },
      { key: 'C', text: 'Diligent' },
      { key: 'D', text: 'Rigorous' }
    ],
    correctOption: 'A',
    explanation: `'Meticulous' means showing great attention to detail; very careful and precise. The direct opposite is 'Careless' (Option A). Options B, C, and D are synonyms.`,
    syllabusReference: 'JAMB Syllabus: Antonyms',
    difficulty: 'easy'
  },
  {
    id: 'eng-utme-2024-04',
    examType: 'UTME',
    subjectId: 'english',
    subjectName: 'Use of English',
    year: 2024,
    questionNumber: 4,
    topic: 'Oral Forms (Vowels & Consonants)',
    question: `Which of the following words contains the same vowel sound as the one underlined in "b**ir**d" /ɜː/?`,
    options: [
      { key: 'A', text: 'Heard' },
      { key: 'B', text: 'Beard' },
      { key: 'C', text: 'Heart' },
      { key: 'D', text: 'Bread' }
    ],
    correctOption: 'A',
    explanation: `'Heard' /hɜːd/ has the same central long vowel sound /ɜː/ as in 'bird' /bɜːd/. 'Beard' is /bɪəd/, 'heart' is /hɑːt/, and 'bread' is /bred/.`,
    syllabusReference: 'JAMB Syllabus: Oral English - Pure Vowels (Monophthongs)',
    difficulty: 'medium'
  },
  {
    id: 'eng-utme-2024-05',
    examType: 'UTME',
    subjectId: 'english',
    subjectName: 'Use of English',
    year: 2024,
    questionNumber: 5,
    topic: 'Idioms & Collocations',
    question: `To "turn over a new leaf" means to:`,
    options: [
      { key: 'A', text: 'Begin an agricultural venture' },
      { key: 'B', text: 'Change one’s behavior for the better' },
      { key: 'C', text: 'Abandon a long-held conviction' },
      { key: 'D', text: 'Inspect a botanical specimen' }
    ],
    correctOption: 'B',
    explanation: `The idiom 'turn over a new leaf' universally denotes reforming one's conduct, starting afresh, or adopting improved moral and behavioral habits.`,
    syllabusReference: 'JAMB Syllabus: Idiomatic Expressions',
    difficulty: 'easy'
  },

  // ==========================================
  // MATHEMATICS (Calculus, Geometry, Algebra, Trig)
  // ==========================================
  {
    id: 'math-utme-2024-01',
    examType: 'UTME',
    subjectId: 'mathematics',
    subjectName: 'Mathematics',
    year: 2024,
    questionNumber: 1,
    topic: 'Calculus (Differentiation & Integration)',
    question: `Find the derivative dy/dx of the function y = (3x² - 5x + 2)⁴ at x = 1.`,
    options: [
      { key: 'A', text: '0' },
      { key: 'B', text: '4' },
      { key: 'C', text: '-4' },
      { key: 'D', text: '12' }
    ],
    correctOption: 'A',
    explanation: `Using the chain rule: dy/dx = 4(3x² - 5x + 2)³ · (6x - 5).\nAt x = 1:\nInside term = 3(1)² - 5(1) + 2 = 3 - 5 + 2 = 0.\nTherefore, dy/dx = 4(0)³ · (6(1) - 5) = 4(0)(1) = 0.`,
    syllabusReference: 'JAMB Syllabus: Differential Calculus - Chain Rule',
    difficulty: 'medium'
  },
  {
    id: 'math-utme-2024-02',
    examType: 'UTME',
    subjectId: 'mathematics',
    subjectName: 'Mathematics',
    year: 2024,
    questionNumber: 2,
    topic: 'Circle Geometry & Theorems',
    diagram: {
      type: 'circle_theorem',
      title: 'Subtended Angles in Circle',
      data: { angleCenter: 130, angleCircumference: 65, chordLabel: 'AB' }
    },
    question: `In the diagram provided, O is the center of the circle. If the angle subtended at the center ∠AOB = 130°, calculate the angle subtended at the circumference ∠ACB.`,
    options: [
      { key: 'A', text: '65°' },
      { key: 'B', text: '50°' },
      { key: 'C', text: '130°' },
      { key: 'D', text: '260°' }
    ],
    correctOption: 'A',
    explanation: `According to the circle theorem: 'The angle subtended by an arc at the center of a circle is twice the angle subtended by it at any point on the remaining part of the circumference.'\n∠ACB = ∠AOB / 2 = 130° / 2 = 65°.`,
    syllabusReference: 'WAEC/JAMB Syllabus: Circle Theorems',
    difficulty: 'easy'
  },
  {
    id: 'math-utme-2024-03',
    examType: 'UTME',
    subjectId: 'mathematics',
    subjectName: 'Mathematics',
    year: 2024,
    questionNumber: 3,
    topic: 'Trigonometry & Bearing',
    diagram: {
      type: 'bearing',
      title: '3-Figure Bearing Diagram',
      data: { pointA: 'Port Harcourt', pointB: 'Enugu', bearingAngle: 60, distance: '120 km' }
    },
    question: `A ship sails 120 km from Point A on a bearing of 060° to Point B. Calculate how far east of Point A the ship is (correct to 1 decimal place).`,
    options: [
      { key: 'A', text: '60.0 km' },
      { key: 'B', text: '103.9 km' },
      { key: 'C', text: '69.3 km' },
      { key: 'D', text: '120.0 km' }
    ],
    correctOption: 'B',
    explanation: `The eastward displacement is the horizontal component: East = Distance × sin(bearing angle) (or cos(90°-60°)).\nEast = 120 × sin(60°) = 120 × (√3 / 2) = 120 × 0.8660 = 103.92 km ≈ 103.9 km.`,
    syllabusReference: 'JAMB Syllabus: Trigonometry and Bearings',
    difficulty: 'medium'
  },
  {
    id: 'math-utme-2024-04',
    examType: 'UTME',
    subjectId: 'mathematics',
    subjectName: 'Mathematics',
    year: 2024,
    questionNumber: 4,
    topic: 'Matrices & Determinants',
    question: `Evaluate the determinant of the 2x2 matrix M = [[4, 7], [3, 6]].`,
    options: [
      { key: 'A', text: '3' },
      { key: 'B', text: '5' },
      { key: 'C', text: '45' },
      { key: 'D', text: '-3' }
    ],
    correctOption: 'A',
    explanation: `For matrix [[a, b], [c, d]], det(M) = (a × d) - (b × c).\ndet(M) = (4 × 6) - (7 × 3) = 24 - 21 = 3.`,
    syllabusReference: 'JAMB Syllabus: Matrices and Determinants',
    difficulty: 'easy'
  },
  {
    id: 'math-utme-2024-05',
    examType: 'UTME',
    subjectId: 'mathematics',
    subjectName: 'Mathematics',
    year: 2024,
    questionNumber: 5,
    topic: 'Statistics & Probability',
    question: `A bag contains 5 red balls, 4 blue balls, and 3 green balls. If two balls are drawn at random one after another without replacement, find the probability that both are red.`,
    options: [
      { key: 'A', text: '5/33' },
      { key: 'B', text: '25/144' },
      { key: 'C', text: '5/12' },
      { key: 'D', text: '1/6' }
    ],
    correctOption: 'A',
    explanation: `Total balls = 5 + 4 + 3 = 12.\nP(1st red) = 5/12.\nRemaining balls = 11, remaining red = 4.\nP(2nd red | 1st red) = 4/11.\nP(Both red) = (5/12) × (4/11) = 20 / 132 = 5/33.`,
    syllabusReference: 'JAMB Syllabus: Probability without replacement',
    difficulty: 'medium'
  },

  // ==========================================
  // PHYSICS (Circuits, Optics, Mechanics, Waves)
  // ==========================================
  {
    id: 'phy-utme-2024-01',
    examType: 'UTME',
    subjectId: 'physics',
    subjectName: 'Physics',
    year: 2024,
    questionNumber: 1,
    topic: 'Electric Current & Circuit Analysis',
    diagram: {
      type: 'circuit',
      title: 'Parallel-Series Resistor Network',
      data: { r1: '6 Ω', r2: '3 Ω', rSeries: '4 Ω', voltage: '12 V', internalR: '0 Ω' }
    },
    question: `In the circuit diagram shown, two resistors of 6 Ω and 3 Ω are connected in parallel, and the combination is connected in series with a 4 Ω resistor across a 12 V battery of negligible internal resistance. Calculate the total current flowing from the battery.`,
    options: [
      { key: 'A', text: '1.2 A' },
      { key: 'B', text: '2.0 A' },
      { key: 'C', text: '3.0 A' },
      { key: 'D', text: '4.0 A' }
    ],
    correctOption: 'B',
    explanation: `1. Calculate parallel resistance (Rp):\n1/Rp = 1/6 + 1/3 = (1 + 2)/6 = 3/6 => Rp = 2 Ω.\n2. Total circuit resistance (R_total) = Rp + R_series = 2 Ω + 4 Ω = 6 Ω.\n3. Total current (I) = V / R_total = 12 V / 6 Ω = 2.0 A.`,
    syllabusReference: 'WAEC/JAMB Syllabus: Current Electricity - Ohm\'s Law',
    difficulty: 'medium'
  },
  {
    id: 'phy-utme-2024-02',
    examType: 'UTME',
    subjectId: 'physics',
    subjectName: 'Physics',
    year: 2024,
    questionNumber: 2,
    topic: 'Optics, Lenses & Mirrors',
    diagram: {
      type: 'lens',
      title: 'Convex Lens Image Formation',
      data: { focalLength: '15 cm', objectDistance: '30 cm', nature: 'Real, Inverted' }
    },
    question: `An object is placed 30 cm in front of a converging (convex) lens of focal length 15 cm. Determine the magnification of the image formed.`,
    options: [
      { key: 'A', text: '0.5' },
      { key: 'B', text: '1.0' },
      { key: 'C', text: '2.0' },
      { key: 'D', text: '4.0' }
    ],
    correctOption: 'B',
    explanation: `Using lens formula: 1/f = 1/u + 1/v.\n1/15 = 1/30 + 1/v => 1/v = 1/15 - 1/30 = (2 - 1)/30 = 1/30 => v = 30 cm.\nMagnification m = v / u = 30 cm / 30 cm = 1.0.\n(Since object is at 2F, the image forms at 2F with magnification = 1).`,
    syllabusReference: 'JAMB Syllabus: Geometrical Optics - Lens Formula',
    difficulty: 'easy'
  },
  {
    id: 'phy-utme-2024-03',
    examType: 'UTME',
    subjectId: 'physics',
    subjectName: 'Physics',
    year: 2024,
    questionNumber: 3,
    topic: 'Mechanics (Motion, Pulleys & Work)',
    diagram: {
      type: 'pulley',
      title: 'Block and Tackle Pulley System',
      data: { pulleys: 4, velocityRatio: 4, efficiency: '75%' }
    },
    question: `A block and tackle pulley system has 4 pulleys. If an effort of 250 N is required to lift a load of 750 N, calculate the efficiency of the machine.`,
    options: [
      { key: 'A', text: '60%' },
      { key: 'B', text: '75%' },
      { key: 'C', text: '80%' },
      { key: 'D', text: '90%' }
    ],
    correctOption: 'B',
    explanation: `Mechanical Advantage (MA) = Load / Effort = 750 N / 250 N = 3.0.\nVelocity Ratio (VR) = Number of pulleys = 4.\nEfficiency = (MA / VR) × 100% = (3.0 / 4) × 100% = 75%.`,
    syllabusReference: 'JAMB Syllabus: Simple Machines - Efficiency',
    difficulty: 'medium'
  },
  {
    id: 'phy-utme-2024-04',
    examType: 'UTME',
    subjectId: 'physics',
    subjectName: 'Physics',
    year: 2024,
    questionNumber: 4,
    topic: 'Waves & Sound Resonance',
    question: `A tuning fork produces sound of frequency 256 Hz in air at room temperature. If the speed of sound in air is 340 m/s, calculate the wavelength of the sound wave.`,
    options: [
      { key: 'A', text: '0.75 m' },
      { key: 'B', text: '1.33 m' },
      { key: 'C', text: '2.50 m' },
      { key: 'D', text: '87.04 m' }
    ],
    correctOption: 'B',
    explanation: `Wave equation: v = f × λ.\nλ = v / f = 340 m/s / 256 Hz ≈ 1.328 m ≈ 1.33 m.`,
    syllabusReference: 'JAMB Syllabus: Waves and Sound Properties',
    difficulty: 'easy'
  },
  {
    id: 'phy-utme-2024-05',
    examType: 'UTME',
    subjectId: 'physics',
    subjectName: 'Physics',
    year: 2024,
    questionNumber: 5,
    topic: 'Atomic & Nuclear Physics',
    question: `A radioactive isotope has a half-life of 4 days. If the initial mass is 64 g, what mass of the isotope remains undecayed after 16 days?`,
    options: [
      { key: 'A', text: '16 g' },
      { key: 'B', text: '8 g' },
      { key: 'C', text: '4 g' },
      { key: 'D', text: '2 g' }
    ],
    correctOption: 'C',
    explanation: `Number of half-lives elapsed n = Total time / Half-life = 16 days / 4 days = 4.\nRemaining mass N = N₀ / (2^n) = 64 g / 2⁴ = 64 / 16 = 4 g.`,
    syllabusReference: 'JAMB Syllabus: Radioactivity and Nuclear Decay',
    difficulty: 'easy'
  },

  // ==========================================
  // CHEMISTRY (Organic, Titration, Electrochemistry)
  // ==========================================
  {
    id: 'chem-utme-2024-01',
    examType: 'UTME',
    subjectId: 'chemistry',
    subjectName: 'Chemistry',
    year: 2024,
    questionNumber: 1,
    topic: 'Volumetric Analysis & Titration',
    diagram: {
      type: 'titration',
      title: 'Acid-Base Titration Setup',
      data: { acid: '0.10 M HCl', base: '25.0 cm³ NaOH', indicator: 'Phenolphthalein' }
    },
    question: `In a titration experiment, 25.0 cm³ of 0.10 mol/dm³ NaOH solution requires exactly 20.0 cm³ of dilute H₂SO₄ for complete neutralization according to the equation:\n2NaOH + H₂SO₄ → Na₂SO₄ + 2H₂O\nCalculate the molar concentration of the H₂SO₄ solution.`,
    options: [
      { key: 'A', text: '0.0625 mol/dm³' },
      { key: 'B', text: '0.1250 mol/dm³' },
      { key: 'C', text: '0.2500 mol/dm³' },
      { key: 'D', text: '0.5000 mol/dm³' }
    ],
    correctOption: 'A',
    explanation: `Using the volumetric titration formula: (Ca × Va) / (Cb × Vb) = na / nb\nWhere:\nCa = unknown concentration of H₂SO₄\nVa = 20.0 cm³\nCb = 0.10 mol/dm³\nVb = 25.0 cm³\nna = 1 (mole ratio of H₂SO₄)\nnb = 2 (mole ratio of NaOH)\n\n(Ca × 20.0) / (0.10 × 25.0) = 1 / 2\nCa × 20.0 = (2.5) / 2 = 1.25\nCa = 1.25 / 20.0 = 0.0625 mol/dm³.`,
    syllabusReference: 'WAEC/JAMB Syllabus: Volumetric Analysis',
    difficulty: 'medium'
  },
  {
    id: 'chem-utme-2024-02',
    examType: 'UTME',
    subjectId: 'chemistry',
    subjectName: 'Chemistry',
    year: 2024,
    questionNumber: 2,
    topic: 'Organic Chemistry (Alkanes, Alkanols, Esters)',
    question: `The IUPAC name for the organic compound with structure CH₃-CH(CH₃)-CH₂-COOH is:`,
    options: [
      { key: 'A', text: '2-methylbutanoic acid' },
      { key: 'B', text: '3-methylbutanoic acid' },
      { key: 'C', text: 'Pentanoic acid' },
      { key: 'D', text: '3-methylpropanoic acid' }
    ],
    correctOption: 'B',
    explanation: `Number the carbon chain starting from the carboxylic carbon (-COOH as C-1):\nC-1: -COOH\nC-2: -CH₂-\nC-3: -CH(CH₃)- (contains methyl substituent)\nC-4: -CH₃\nLongest chain = 4 carbons (butanoic acid) with methyl at position 3 => 3-methylbutanoic acid.`,
    syllabusReference: 'JAMB Syllabus: IUPAC Nomenclature of Carboxylic Acids',
    difficulty: 'medium'
  },
  {
    id: 'chem-utme-2024-03',
    examType: 'UTME',
    subjectId: 'chemistry',
    subjectName: 'Chemistry',
    year: 2024,
    questionNumber: 3,
    topic: 'Electrochemistry & Electrolysis',
    diagram: {
      type: 'galvanic',
      title: 'Daniell Electrochemical Cell',
      data: { anode: 'Zn / Zn²⁺ (Oxidation)', cathode: 'Cu / Cu²⁺ (Reduction)', saltBridge: 'KNO₃' }
    },
    question: `During the electrolysis of acidified water using platinum electrodes, the ratio of the volume of Hydrogen gas collected at the cathode to Oxygen gas at the anode at standard conditions is:`,
    options: [
      { key: 'A', text: '1 : 1' },
      { key: 'B', text: '1 : 2' },
      { key: 'C', text: '2 : 1' },
      { key: 'D', text: '4 : 1' }
    ],
    correctOption: 'C',
    explanation: `Cathode reaction: 4H⁺ + 4e⁻ → 2H₂ (g) [2 moles of Hydrogen]\nAnode reaction: 4OH⁻ - 4e⁻ → 2H₂O + O₂ (g) [1 mole of Oxygen]\nAccording to Avogadro's law, equal moles of gases occupy equal volumes. The volume ratio H₂ : O₂ is 2 : 1.`,
    syllabusReference: 'JAMB Syllabus: Electrolysis of Aqueous Electrolytes',
    difficulty: 'easy'
  },
  {
    id: 'chem-utme-2024-04',
    examType: 'UTME',
    subjectId: 'chemistry',
    subjectName: 'Chemistry',
    year: 2024,
    questionNumber: 4,
    topic: 'Acids, Bases, Salts & pH',
    question: `Calculate the pH of a 0.001 mol/dm³ solution of hydrochloric acid (HCl).`,
    options: [
      { key: 'A', text: '1' },
      { key: 'B', text: '2' },
      { key: 'C', text: '3' },
      { key: 'D', text: '11' }
    ],
    correctOption: 'C',
    explanation: `HCl is a strong monoprotic acid, completely ionizing to give [H⁺] = 0.001 M = 10⁻³ M.\npH = -log₁₀[H⁺] = -log₁₀(10⁻³) = -(-3) = 3.`,
    syllabusReference: 'JAMB Syllabus: Hydrogen Ion Concentration and pH Scale',
    difficulty: 'easy'
  },

  // ==========================================
  // BIOLOGY (Genetics, Nephron, Eye, Plants)
  // ==========================================
  {
    id: 'bio-utme-2024-01',
    examType: 'UTME',
    subjectId: 'biology',
    subjectName: 'Biology',
    year: 2024,
    questionNumber: 1,
    topic: 'Excretion & Human Kidney (Nephron)',
    diagram: {
      type: 'nephron',
      title: 'Structure of the Nephron',
      data: { partA: 'Bowman\'s Capsule / Glomerulus', partB: 'Proximal Convoluted Tubule', partC: 'Loop of Henle' }
    },
    question: `In the mammalian kidney nephron shown in the diagram, ultrafiltration of blood under high hydrostatic pressure occurs primarily in the:`,
    options: [
      { key: 'A', text: 'Bowman\'s capsule and glomerulus' },
      { key: 'B', text: 'Loop of Henle' },
      { key: 'C', text: 'Distal convoluted tubule' },
      { key: 'D', text: 'Collecting duct' }
    ],
    correctOption: 'A',
    explanation: `Ultrafiltration occurs in the glomerulus/Bowman's capsule where the afferent arteriole is wider than the efferent arteriole, creating high hydrostatic pressure that forces small molecules into the capsular space.`,
    syllabusReference: 'WAEC/JAMB Syllabus: Excretory Systems in Mammals',
    difficulty: 'easy'
  },
  {
    id: 'bio-utme-2024-02',
    examType: 'UTME',
    subjectId: 'biology',
    subjectName: 'Biology',
    year: 2024,
    questionNumber: 2,
    topic: 'Genetics & Heredity',
    question: `A man with blood group AB marries a woman with blood group O. What is the phenotypic probability of their offspring having blood group O?`,
    options: [
      { key: 'A', text: '0%' },
      { key: 'B', text: '25%' },
      { key: 'C', text: '50%' },
      { key: 'D', text: '100%' }
    ],
    correctOption: 'A',
    explanation: `Father alleles: Iᴬ, Iᴮ. Mother alleles: i, i.\nPunnett cross produces:\n- 50% Iᴬi (Blood group A)\n- 50% Iᴮi (Blood group B)\nNone of the children can inherit the homozygous genotype 'ii' (Blood group O). The probability is 0%.`,
    syllabusReference: 'JAMB Syllabus: Genetics - Codominance and ABO Blood Grouping',
    difficulty: 'medium'
  },
  {
    id: 'bio-utme-2024-03',
    examType: 'UTME',
    subjectId: 'biology',
    subjectName: 'Biology',
    year: 2024,
    questionNumber: 3,
    topic: 'Plant Reproduction & Flower Anatomy',
    diagram: {
      type: 'flower',
      title: 'Longitudinal Section of a Dicot Flower',
      data: { sepal: 'Calyx', petal: 'Corolla', stamen: 'Anther + Filament', carpel: 'Stigma, Style, Ovary' }
    },
    question: `Which floral structure develops directly into the pericarp of a true fruit after fertilization?`,
    options: [
      { key: 'A', text: 'The fertilized ovule' },
      { key: 'B', text: 'The ovary wall' },
      { key: 'C', text: 'The receptacle' },
      { key: 'D', text: 'The pollen tube' }
    ],
    correctOption: 'B',
    explanation: `In angiosperms, following double fertilization, the ovule develops into the seed, while the ovary wall thickens and ripens into the fruit wall (pericarp).`,
    syllabusReference: 'JAMB Syllabus: Reproduction in Flowering Plants',
    difficulty: 'easy'
  },
  {
    id: 'bio-utme-2024-04',
    examType: 'UTME',
    subjectId: 'biology',
    subjectName: 'Biology',
    year: 2024,
    questionNumber: 4,
    topic: 'Sensory Organs (Eye & Ear)',
    diagram: {
      type: 'eye',
      title: 'Human Eye Cross-Section',
      data: { defect: 'Myopia (Short-sightedness)', correction: 'Concave (Diverging) Lens' }
    },
    question: `A student cannot clearly see writing on the classroom chalkboard because light rays from distant objects converge in front of the retina. This eye defect and its corrective lens are respectively:`,
    options: [
      { key: 'A', text: 'Hypermetropia; Convex lens' },
      { key: 'B', text: 'Myopia; Concave lens' },
      { key: 'C', text: 'Astigmatism; Cylindrical lens' },
      { key: 'D', text: 'Presbyopia; Bifocal lens' }
    ],
    correctOption: 'B',
    explanation: `Short-sightedness (myopia) occurs when the eyeball is too long or the cornea is too curved, focusing distant images in front of the retina. It is corrected using diverging/concave lenses.`,
    syllabusReference: 'JAMB Syllabus: Eye Defects and Corrections',
    difficulty: 'easy'
  },

  // ==========================================
  // ECONOMICS
  // ==========================================
  {
    id: 'eco-utme-2024-01',
    examType: 'UTME',
    subjectId: 'economics',
    subjectName: 'Economics',
    year: 2024,
    questionNumber: 1,
    topic: 'Price Determination & Elasticity',
    question: `If a 10% increase in the price of petrol leads to a 2% decrease in quantity demanded, the price elasticity of demand (PED) is:`,
    options: [
      { key: 'A', text: '0.2 (Inelastic)' },
      { key: 'B', text: '5.0 (Elastic)' },
      { key: 'C', text: '1.0 (Unitary)' },
      { key: 'D', text: '0.0 (Perfect Inelastic)' }
    ],
    correctOption: 'A',
    explanation: `PED = (% Change in Quantity Demanded) / (% Change in Price) = (-2%) / (+10%) = -0.2.\nTaking absolute value |PED| = 0.2 < 1, which represents relatively price inelastic demand.`,
    syllabusReference: 'JAMB Syllabus: Theory of Demand - Elasticity',
    difficulty: 'easy'
  },
  {
    id: 'eco-utme-2024-02',
    examType: 'UTME',
    subjectId: 'economics',
    subjectName: 'Economics',
    year: 2024,
    questionNumber: 2,
    topic: 'National Income Accounting',
    question: `Gross Domestic Product (GDP) differs from Gross National Product (GNP) by:`,
    options: [
      { key: 'A', text: 'Net Indirect Taxes' },
      { key: 'B', text: 'Depreciation of capital assets' },
      { key: 'C', text: 'Net Factor Income from Abroad (NFIA)' },
      { key: 'D', text: 'Transfer payments' }
    ],
    correctOption: 'C',
    explanation: `GNP = GDP + Net Property/Factor Income from Abroad (NFIA). NFIA accounts for income earned by domestic citizens abroad minus income earned by foreign factors of production within the domestic economy.`,
    syllabusReference: 'JAMB Syllabus: National Income Accounting',
    difficulty: 'medium'
  },

  // ==========================================
  // GOVERNMENT
  // ==========================================
  {
    id: 'govt-utme-2024-01',
    examType: 'UTME',
    subjectId: 'government',
    subjectName: 'Government',
    year: 2024,
    questionNumber: 1,
    topic: 'Constitutional Development in Nigeria',
    question: `Which colonial Nigerian constitution introduced the principle of direct election for the first time in Lagos and Calabar?`,
    options: [
      { key: 'A', text: 'Clifford Constitution of 1922' },
      { key: 'B', text: 'Richards Constitution of 1946' },
      { key: 'C', text: 'Macpherson Constitution of 1951' },
      { key: 'D', text: 'Lyttelton Constitution of 1954' }
    ],
    correctOption: 'A',
    explanation: `The Sir Hugh Clifford Constitution of 1922 introduced the elective principle for the first time in British West Africa, providing 4 elected seats (3 for Lagos, 1 for Calabar) in the Legislative Council.`,
    syllabusReference: 'JAMB Syllabus: Pre-Independence Constitutional Development',
    difficulty: 'easy'
  },
  {
    id: 'govt-utme-2024-02',
    examType: 'UTME',
    subjectId: 'government',
    subjectName: 'Government',
    year: 2024,
    questionNumber: 2,
    topic: 'Federalism & Division of Powers',
    question: `In the 1999 Constitution of the Federal Republic of Nigeria, items contained in the Exclusive Legislative List are reserved solely for the:`,
    options: [
      { key: 'A', text: 'State Houses of Assembly' },
      { key: 'B', text: 'Local Government Councils' },
      { key: 'C', text: 'National Assembly (Federal Legislature)' },
      { key: 'D', text: 'Council of State' }
    ],
    correctOption: 'C',
    explanation: `The Exclusive Legislative List (Part I of the Second Schedule to the 1999 Constitution) contains 68 items such as defense, foreign affairs, currency, and customs, which only the National Assembly can legislate on.`,
    syllabusReference: 'JAMB Syllabus: Structure of Nigerian Federalism',
    difficulty: 'easy'
  },

  // ==========================================
  // LITERATURE IN ENGLISH
  // ==========================================
  {
    id: 'lit-utme-2024-01',
    examType: 'UTME',
    subjectId: 'literature',
    subjectName: 'Literature in English',
    year: 2024,
    questionNumber: 1,
    topic: 'Literary Devices & Figures of Speech',
    question: `"The angry thunder roared and shook the fragile rooftops with vengeance." The literary device predominantly used here is:`,
    options: [
      { key: 'A', text: 'Personification' },
      { key: 'B', text: 'Euphemism' },
      { key: 'C', text: 'Litotes' },
      { key: 'D', text: 'Hyperbole' }
    ],
    correctOption: 'A',
    explanation: `Personification is giving inanimate objects or natural phenomena human traits ('angry', 'roared with vengeance').`,
    syllabusReference: 'JAMB Syllabus: Literary Terms and Appreciation',
    difficulty: 'easy'
  },

  // ==========================================
  // FINANCIAL ACCOUNTING
  // ==========================================
  {
    id: 'acc-utme-2024-01',
    examType: 'UTME',
    subjectId: 'accounting',
    subjectName: 'Financial Accounting',
    year: 2024,
    questionNumber: 1,
    topic: 'Double Entry Principle & Ledger',
    question: `A customer, Babatunde, pays ₦50,000 by cheque to settle his account. The correct double entry to record this transaction in the books is:`,
    options: [
      { key: 'A', text: 'Debit Bank Account; Credit Babatunde Account' },
      { key: 'B', text: 'Debit Babatunde Account; Credit Bank Account' },
      { key: 'C', text: 'Debit Cash Account; Credit Sales Account' },
      { key: 'D', text: 'Debit Purchases Account; Credit Bank Account' }
    ],
    correctOption: 'A',
    explanation: `Debit the receiver of asset / increase in asset (Bank Account) and credit the giver / reduction in debtor asset (Babatunde Account).`,
    syllabusReference: 'WAEC/JAMB Syllabus: Principles of Double Entry',
    difficulty: 'easy'
  }
];
