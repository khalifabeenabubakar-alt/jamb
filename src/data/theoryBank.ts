import { TheoryQuestion } from '../types';

export const THEORY_QUESTIONS_BANK: TheoryQuestion[] = [
  // WAEC Mathematics Theory (Paper 2)
  {
    id: 'theory-waec-math-2024-q1',
    examType: 'WAEC',
    subjectId: 'mathematics',
    subjectName: 'Mathematics',
    year: 2024,
    paper: 'Paper 2 (Section B - Pure Mathematics)',
    section: 'Section B',
    questionNumber: 'Question 3',
    topic: 'Circle Geometry & Theorems',
    diagram: {
      type: 'circle_theorem',
      title: 'WAEC 2024 Theorem Construction',
      data: { angleCenter: 140, angleCircumference: 70, chordLabel: 'PQ' }
    },
    questionText: `(a) In the diagram, O is the center of circle PQR. If ∠POR = 140° and ∠OPQ = 35°, calculate:
(i) ∠PQR
(ii) ∠OQR.
(b) A ladder of length 13 m leans against a vertical wall such that its base is 5 m away from the foot of the wall. Find:
(i) The height reached on the wall;
(ii) The angle of inclination of the ladder to the horizontal ground (correct to the nearest degree).`,
    totalMarks: 12,
    rubrics: [
      {
        id: 'r1',
        step: 'Calculation of angle at circumference ∠PQR = 1/2 × ∠POR',
        mark: 2,
        markType: 'M',
        criteria: 'Correct application of theorem (Angle at center is twice angle at circumference): ∠PQR = 140° / 2 = 70°.'
      },
      {
        id: 'r2',
        step: 'Evaluation of base angles in isosceles triangle ΔOPR',
        mark: 2,
        markType: 'M',
        criteria: 'Recognizing OP = OR = radius. ∠OPR = ∠ORP = (180° - 140°) / 2 = 20°.'
      },
      {
        id: 'r3',
        step: 'Finding ∠OQR using angle sum in quadrilateral or Δ',
        mark: 2,
        markType: 'A',
        criteria: 'Correct computation of ∠OQR = 70° - 35° = 35°.'
      },
      {
        id: 'r4',
        step: 'Applying Pythagoras Theorem for ladder height: h² = 13² - 5²',
        mark: 2,
        markType: 'M',
        criteria: 'Correct formula setup h = √(169 - 25) = √144.'
      },
      {
        id: 'r5',
        step: 'Correct value and unit for wall height: h = 12 m',
        mark: 1,
        markType: 'A',
        criteria: 'Obtaining exactly 12 meters with correct unit.'
      },
      {
        id: 'r6',
        step: 'Trigonometric setup for angle of inclination: cos(θ) = 5/13 or sin(θ) = 12/13',
        mark: 2,
        markType: 'M',
        criteria: 'Correct trig ratio selection and substitution.'
      },
      {
        id: 'r7',
        step: 'Accuracy of inclination angle θ = 67° (nearest degree)',
        mark: 1,
        markType: 'A',
        criteria: 'θ = cos⁻¹(5/13) = 67.38° ≈ 67°.'
      }
    ],
    modelAnswer: `(a)(i) Angle at circumference ∠PQR = 1/2 × ∠POR = 1/2 × 140° = 70° (Reason: Angle subtended at center is twice angle at circumference).
(ii) In ΔOPR, OP = OR (radii), hence ∠OPR = ∠ORP = (180° - 140°) / 2 = 20°. In ΔOPQ, since OP = OQ (radii), ∠OQP = ∠OPQ = 35°. Therefore, ∠OQR = ∠PQR - ∠OQP = 70° - 35° = 35°.

(b)(i) Let h = height on wall. By Pythagoras theorem:
h² + 5² = 13²
h² = 169 - 25 = 144
h = √144 = 12 m.
(ii) Let θ be the angle of inclination.
cos(θ) = Adjacent / Hypotenuse = 5 / 13 = 0.3846
θ = cos⁻¹(0.3846) = 67.38° ≈ 67° (to nearest degree).`,
    examinerRemarks: `Most candidates answered the Pythagoras part correctly. However, common deductions occurred in part (a) where candidates failed to state reasons for geometric statements (e.g. radii equality in circle) leading to loss of Method marks.`,
    commonPitfalls: [
      'Omitting geometric theorem reasons (costing 1 Method mark)',
      'Forgetting unit (meters) in length answers',
      'Rounding angles before final calculation step instead of nearest degree'
    ]
  },

  // WAEC Physics Theory (Paper 2)
  {
    id: 'theory-waec-phy-2024-q1',
    examType: 'WAEC',
    subjectId: 'physics',
    subjectName: 'Physics',
    year: 2024,
    paper: 'Paper 2 (Theory Essay)',
    section: 'Part II (Essay)',
    questionNumber: 'Question 8',
    topic: 'Electric Current & Circuit Analysis',
    diagram: {
      type: 'circuit',
      title: 'Internal Resistance & Potentiometer',
      data: { r1: '6 Ω', r2: '3 Ω', rSeries: '4 Ω', voltage: '12 V', internalR: '1 Ω' }
    },
    questionText: `(a) State Ohm's Law and write down two conditions under which the law is strictly obeyed.
(b) An electric cell of e.m.f. 12.0 V and internal resistance r = 1.0 Ω is connected to a combination of two parallel resistors of 6.0 Ω and 3.0 Ω, connected in series with an external resistor R = 4.0 Ω.
Calculate:
(i) The effective external resistance of the circuit;
(ii) The total current supplied by the cell;
(iii) The terminal potential difference across the cell;
(iv) The rate of electrical energy dissipated in the 4.0 Ω resistor.`,
    totalMarks: 15,
    rubrics: [
      {
        id: 'p1',
        step: 'Definition of Ohm\'s Law with physical conditions',
        mark: 2,
        markType: 'B',
        criteria: 'Current is directly proportional to potential difference provided temperature and other physical factors remain constant.'
      },
      {
        id: 'p2',
        step: 'Two conditions for Ohm\'s law (constant temperature, constant physical state)',
        mark: 2,
        markType: 'B',
        criteria: 'Stating constant temperature and no mechanical deformation/strain.'
      },
      {
        id: 'p3',
        step: 'Parallel resistance calculation: 1/Rp = 1/6 + 1/3 = 3/6 => Rp = 2 Ω',
        mark: 2,
        markType: 'M',
        criteria: 'Correct parallel formula and calculation.'
      },
      {
        id: 'p4',
        step: 'Total external resistance: R_ext = 2 + 4 = 6.0 Ω',
        mark: 1,
        markType: 'A',
        criteria: 'Adding series resistor: 6.0 Ω.'
      },
      {
        id: 'p5',
        step: 'Total circuit current: I = E / (R_ext + r) = 12 / (6 + 1)',
        mark: 2,
        markType: 'M',
        criteria: 'Correct inclusion of internal resistance in total resistance (7.0 Ω).'
      },
      {
        id: 'p6',
        step: 'Current value: I = 1.71 A',
        mark: 1,
        markType: 'A',
        criteria: '12 / 7 = 1.714 A ≈ 1.71 A (with unit).'
      },
      {
        id: 'p7',
        step: 'Terminal p.d. formula: V = E - Ir or V = I × R_ext',
        mark: 2,
        markType: 'M',
        criteria: 'V = 1.714 × 6.0 = 10.28 V or 12 - (1.714 × 1).'
      },
      {
        id: 'p8',
        step: 'Terminal p.d. value: V = 10.29 V',
        mark: 1,
        markType: 'A',
        criteria: 'Correct voltage 10.29 V with unit.'
      },
      {
        id: 'p9',
        step: 'Power dissipation in 4 Ω: P = I²R = (1.714)² × 4.0 = 11.75 W',
        mark: 2,
        markType: 'A',
        criteria: 'Using P = I²R with series current and unit Watts (W).'
      }
    ],
    modelAnswer: `(a) Ohm's Law states that the current flowing through a metallic conductor is directly proportional to the potential difference across its ends, provided temperature and other physical conditions remain constant (V = IR).
Two conditions: Constant temperature; No mechanical strain or magnetic interference.

(b)(i) Parallel resistors: 1/Rp = 1/6 + 1/3 = 3/6 => Rp = 2.0 Ω.
Total external resistance R_ext = Rp + 4.0 = 2.0 + 4.0 = 6.0 Ω.

(ii) Total circuit resistance R_total = R_ext + r = 6.0 + 1.0 = 7.0 Ω.
Total Current I = E / R_total = 12.0 V / 7.0 Ω = 1.714 A ≈ 1.71 A.

(iii) Terminal potential difference V = I × R_ext = 1.714 A × 6.0 Ω = 10.28 V (or V = E - Ir = 12 - 1.714 = 10.29 V).

(iv) Power in 4.0 Ω resistor: P = I²R = (1.714)² × 4.0 = 2.938 × 4 = 11.75 W (Watts).`,
    examinerRemarks: `Chief Examiner noted candidates frequently omitted the internal resistance 'r' when calculating total circuit current, obtaining I = 12/6 = 2.0 A instead of dividing by (R+r) = 7.0 Ω.`,
    commonPitfalls: [
      'Neglecting the cell internal resistance in total resistance',
      'Confusing terminal potential difference V with total e.m.f. E',
      'Omitting units (A, V, W) in final answers'
    ]
  },

  // WAEC Chemistry Theory (Paper 2)
  {
    id: 'theory-waec-chem-2024-q1',
    examType: 'WAEC',
    subjectId: 'chemistry',
    subjectName: 'Chemistry',
    year: 2024,
    paper: 'Paper 2 (Essay & Practical Concepts)',
    section: 'Section B',
    questionNumber: 'Question 5',
    topic: 'Volumetric Analysis & Titration',
    diagram: {
      type: 'titration',
      title: 'Volumetric Burette & Titration Flask',
      data: { acid: '0.050 M H₂SO₄', base: '25.0 cm³ Na₂CO₃', indicator: 'Methyl Orange' }
    },
    questionText: `(a) Define the term 'standard solution' and mention two characteristics of a primary standard.
(b) 25.0 cm³ of hydrated sodium trioxocarbonate(IV), Na₂CO₃·xH₂O, containing 7.15 g of the crystals per dm³ of solution, was titrated with 0.050 mol/dm³ tetraoxosulphate(VI) acid, H₂SO₄, using methyl orange as indicator. The average titre volume of acid used was 25.0 cm³.
Equation for reaction:
Na₂CO₃ + H₂SO₄ → Na₂SO₄ + H₂O + CO₂
Calculate:
(i) Concentration of anhydrous Na₂CO₃ in mol/dm³;
(ii) Molar mass of Na₂CO₃·xH₂O;
(iii) The value of x (water of crystallization).
[Na = 23, C = 12, O = 16, H = 1]`,
    totalMarks: 15,
    rubrics: [
      {
        id: 'c1',
        step: 'Definition of standard solution',
        mark: 2,
        markType: 'B',
        criteria: 'A solution whose exact concentration/molarity is accurately known.'
      },
      {
        id: 'c2',
        step: 'Characteristics of primary standard (high purity, stable in air, high molar mass)',
        mark: 2,
        markType: 'B',
        criteria: 'High purity, non-deliquescent/non-hygroscopic, high molar mass.'
      },
      {
        id: 'c3',
        step: 'Application of (Ca × Va) / (Cb × Vb) = na / nb',
        mark: 2,
        markType: 'M',
        criteria: '(0.050 × 25.0) / (Cb × 25.0) = 1 / 1.'
      },
      {
        id: 'c4',
        step: 'Concentration of base Cb = 0.050 mol/dm³',
        mark: 2,
        markType: 'A',
        criteria: 'Cb = 0.050 mol/dm³ with unit.'
      },
      {
        id: 'c5',
        step: 'Molar mass formula: Molar Mass = Mass concentration (g/dm³) / Molar concentration (mol/dm³)',
        mark: 2,
        markType: 'M',
        criteria: 'Molar mass = 7.15 g/dm³ / 0.050 mol/dm³.'
      },
      {
        id: 'c6',
        step: 'Molar mass of Na₂CO₃·xH₂O = 286 g/mol',
        mark: 2,
        markType: 'A',
        criteria: 'Obtaining 286 g/mol with unit.'
      },
      {
        id: 'c7',
        step: 'Calculation of x: (23×2 + 12 + 48) + 18x = 286 => 106 + 18x = 286',
        mark: 2,
        markType: 'M',
        criteria: '18x = 286 - 106 = 180.'
      },
      {
        id: 'c8',
        step: 'Value of x = 10',
        mark: 1,
        markType: 'A',
        criteria: 'x = 10 (washing soda decahydrate).'
      }
    ],
    modelAnswer: `(a) A standard solution is a solution of accurately known concentration.
Characteristics of primary standard:
1. It must be obtained in high state of purity (100% pure).
2. It must be stable at room temperature and not deliquescent or hygroscopic.
3. It should have a high molar mass to minimize weighing errors.

(b)(i) (Ca × Va) / (Cb × Vb) = na / nb
(0.050 × 25.0) / (Cb × 25.0) = 1 / 1
Cb = 0.050 mol/dm³.

(ii) Molar Mass = Mass concentration / Molar concentration
Molar mass = 7.15 g/dm³ / 0.050 mol/dm³ = 143 / 0.5 = 286 g/mol.

(iii) Molar mass of Na₂CO₃·xH₂O = 286 g/mol
(23 × 2) + 12 + (16 × 3) + x(2 × 1 + 16) = 286
46 + 12 + 48 + 18x = 286
106 + 18x = 286
18x = 286 - 106 = 180
x = 180 / 18 = 10.
The chemical formula is Na₂CO₃·10H₂O.`,
    examinerRemarks: `Performance on this question was generally good. Weak candidates lost marks by stating 'x = 10 H₂O' rather than just the integer value 10 for x.`,
    commonPitfalls: [
      'Inverting the titration ratio formula (putting base on top without adjusting mole ratio)',
      'Rounding molar mass prematurely to 280 instead of 286',
      'Forgetting to show clear arithmetic steps for 18x = 180'
    ]
  }
];
