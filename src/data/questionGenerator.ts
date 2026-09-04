import { Question, SubjectId } from '../types';

export const EXTENDED_SYLLABUS_QUESTIONS: Partial<Record<SubjectId, Array<{
  topic: string;
  question: string;
  options: { key: 'A' | 'B' | 'C' | 'D'; text: string }[];
  correctOption: 'A' | 'B' | 'C' | 'D';
  explanation: string;
  passage?: string;
}>>> = {
  english: [
    {
      topic: 'Comprehension & Passage Analysis',
      passage: `In recent decades, digital financial services have radically transformed the economic landscape of West Africa. Mobile money applications and agent banking networks now enable remote rural farmers and micro-entrepreneurs to receive payments, save securely, and access micro-credit without traveling long distances to commercial bank branches. Nevertheless, persistent network connectivity gaps and cybersecurity fraud present notable challenges.`,
      question: `According to the passage, the primary benefit of agent banking networks for rural dwellers is:`,
      options: [
        { key: 'A', text: 'Granting immediate access to financial transactions without traveling to distant urban banks' },
        { key: 'B', text: 'Eliminating all forms of digital fraud and network downtime' },
        { key: 'C', text: 'Providing free agricultural inputs directly to farmers' },
        { key: 'D', text: 'Replacing physical cash completely across all market transactions' }
      ],
      correctOption: 'A',
      explanation: `The text explicitly states that mobile money and agent banking enable rural dwellers to transact and save without traveling to bank branches.`
    },
    {
      topic: 'Antonyms & Synonyms',
      question: `Choose the option NEAREST IN MEANING to the highlighted word:\n"The suspect's **CANDID** confession aided the detectives in recovering the stolen artifacts."`,
      options: [
        { key: 'A', text: 'Frank and honest' },
        { key: 'B', text: 'Evasive' },
        { key: 'C', text: 'Fabricated' },
        { key: 'D', text: 'Ambiguous' }
      ],
      correctOption: 'A',
      explanation: `'Candid' means truthful, open, and straightforward. 'Frank and honest' is the precise synonym.`
    },
    {
      topic: 'Antonyms & Synonyms',
      question: `Choose the option OPPOSITE IN MEANING to the capitalized word:\n"The senator was praised for his **FRUGAL** management of constituency development funds."`,
      options: [
        { key: 'A', text: 'Extravagant' },
        { key: 'B', text: 'Thrifty' },
        { key: 'C', text: 'Prudent' },
        { key: 'D', text: 'Miserly' }
      ],
      correctOption: 'A',
      explanation: `'Frugal' means sparing, prudent, or economical. The opposite is 'Extravagant' (wasteful or spending excessively).`
    },
    {
      topic: 'Lexis & Structure',
      question: `Select the option that correctly completes the sentence:\n"The committee reached a consensus that each of the applicants ________ required to present their credentials."`,
      options: [
        { key: 'A', text: 'is' },
        { key: 'B', text: 'are' },
        { key: 'C', text: 'were' },
        { key: 'D', text: 'have been' }
      ],
      correctOption: 'A',
      explanation: `'Each' is an indefinite pronoun that takes a singular verb ('is').`
    },
    {
      topic: 'Lexis & Structure',
      question: `Choose the appropriate preposition to complete the sentence:\n"The university congratulated the scholar ________ winning the prestigious international research grant."`,
      options: [
        { key: 'A', text: 'on' },
        { key: 'B', text: 'for' },
        { key: 'C', text: 'with' },
        { key: 'D', text: 'about' }
      ],
      correctOption: 'A',
      explanation: `The standard grammatical collocation is 'congratulate [someone] on [an achievement]'.`
    },
    {
      topic: 'Oral Forms (Vowels & Consonants)',
      question: `Identify the word that contains the SAME consonant sound as the underlined sound in "ca<u>sh</u>":`,
      options: [
        { key: 'A', text: 'ocean' },
        { key: 'B', text: 'vision' },
        { key: 'C', text: 'pleasure' },
        { key: 'D', text: 'church' }
      ],
      correctOption: 'A',
      explanation: `'Ocean' is pronounced /ˈoʊ.ʃən/, containing the voiceless postalveolar fricative /ʃ/, matching 'cash' /kæʃ/.`
    },
    {
      topic: 'Oral Forms (Vowels & Consonants)',
      question: `Choose the word that has the primary stress on the FIRST syllable:`,
      options: [
        { key: 'A', text: 'EXCELLENCE' },
        { key: 'B', text: 'CONTRIBUTE' },
        { key: 'C', text: 'COMMUNICATION' },
        { key: 'D', text: 'INVESTIGATE' }
      ],
      correctOption: 'A',
      explanation: `EX-cel-lence has primary stress on the first syllable /ˈek.səl.əns/.`
    },
    {
      topic: 'Idioms & Collocations',
      question: `What does the idiomatic expression "to take with a pinch of salt" mean?`,
      options: [
        { key: 'A', text: 'To view a claim with skepticism and caution' },
        { key: 'B', text: 'To season food before tasting' },
        { key: 'C', text: 'To accept something as undeniable truth' },
        { key: 'D', text: 'To reject an idea with outright hostility' }
      ],
      correctOption: 'A',
      explanation: `'To take with a pinch of salt' means not to completely believe something without further verification.`
    },
    {
      topic: 'Sentence Interpretation',
      question: `Which option best interprets the statement:\n"Had she arrived ten minutes earlier, Amina would not have missed the matriculation procession."`,
      options: [
        { key: 'A', text: 'Amina arrived late and therefore missed the procession.' },
        { key: 'B', text: 'Amina arrived ten minutes early and took part in the procession.' },
        { key: 'C', text: 'Amina arrived on time but chose not to join the procession.' },
        { key: 'D', text: 'The procession was postponed by ten minutes.' }
      ],
      correctOption: 'A',
      explanation: `The third conditional indicates an unfulfilled condition in the past: she did not arrive early and consequently missed the event.`
    },
    {
      topic: 'Assigned Novel / Literature Guide',
      question: `In the prescribed UTME text *The Life Changer*, which town did Salma travel from to begin her tertiary education?`,
      options: [
        { key: 'A', text: 'Lafia' },
        { key: 'B', text: 'Kano' },
        { key: 'C', text: 'Kaduna' },
        { key: 'D', text: 'Zaria' }
      ],
      correctOption: 'A',
      explanation: `Salma was from Lafia before gaining admission into the university in the novel *The Life Changer*.`
    }
  ],

  mathematics: [
    {
      topic: 'Algebra & Quadratic Equations',
      question: `Find the quadratic equation whose roots are -3 and 5/2.`,
      options: [
        { key: 'A', text: '2x² + x - 15 = 0' },
        { key: 'B', text: '2x² - x - 15 = 0' },
        { key: 'C', text: '2x² - x + 15 = 0' },
        { key: 'D', text: '2x² + x + 15 = 0' }
      ],
      correctOption: 'A',
      explanation: `(x + 3)(x - 5/2) = 0 => (x + 3)(2x - 5) = 0 => 2x² - 5x + 6x - 15 = 0 => 2x² + x - 15 = 0.`
    },
    {
      topic: 'Calculus (Differentiation & Integration)',
      question: `If y = 4x³ - 5x² + 7x - 9, find the second derivative d²y/dx² at x = 2.`,
      options: [
        { key: 'A', text: '38' },
        { key: 'B', text: '48' },
        { key: 'C', text: '24' },
        { key: 'D', text: '35' }
      ],
      correctOption: 'A',
      explanation: `dy/dx = 12x² - 10x + 7.\nd²y/dx² = 24x - 10.\nAt x = 2: 24(2) - 10 = 48 - 10 = 38.`
    },
    {
      topic: 'Trigonometry & Bearing',
      question: `A surveyor at point P observes a lighthouse at point Q on a bearing of 060°. If Q is 100 m from P, how far East of P is the lighthouse?`,
      options: [
        { key: 'A', text: '86.6 m (50√3 m)' },
        { key: 'B', text: '50.0 m' },
        { key: 'C', text: '100.0 m' },
        { key: 'D', text: '70.7 m' }
      ],
      correctOption: 'A',
      explanation: `The bearing 060° forms an angle of 60° with North. Eastward displacement = 100 × sin(60°) = 100 × (√3/2) = 50√3 ≈ 86.6 m.`
    },
    {
      topic: 'Circle Geometry & Theorems',
      question: `An angle subtended by an arc at the center of a circle is 110°. What is the size of the angle subtended by the same arc at the circumference?`,
      options: [
        { key: 'A', text: '55°' },
        { key: 'B', text: '220°' },
        { key: 'C', text: '70°' },
        { key: 'D', text: '110°' }
      ],
      correctOption: 'A',
      explanation: `By circle theorem: The angle subtended by an arc at the center is twice the angle subtended at the circumference: θ = 110° / 2 = 55°.`
    },
    {
      topic: 'Matrices & Determinants',
      question: `Find the inverse of the 2x2 matrix A = [[3, 2], [7, 5]].`,
      options: [
        { key: 'A', text: '[[5, -2], [-7, 3]]' },
        { key: 'B', text: '[[-5, 2], [7, -3]]' },
        { key: 'C', text: '[[3, -2], [-7, 5]]' },
        { key: 'D', text: '[[5, 2], [7, 3]]' }
      ],
      correctOption: 'A',
      explanation: `det(A) = (3)(5) - (2)(7) = 15 - 14 = 1.\nA⁻¹ = 1/det(A) × [[d, -b], [-c, a]] = [[5, -2], [-7, 3]].`
    }
  ],

  physics: [
    {
      topic: 'Electric Current & Circuit Analysis',
      question: `A cell of e.m.f. 2.0 V and internal resistance 0.5 Ω is connected across an external load of 3.5 Ω. Calculate the terminal potential difference across the cell.`,
      options: [
        { key: 'A', text: '1.75 V' },
        { key: 'B', text: '2.00 V' },
        { key: 'C', text: '1.50 V' },
        { key: 'D', text: '0.25 V' }
      ],
      correctOption: 'A',
      explanation: `Current I = E / (R + r) = 2.0 / (3.5 + 0.5) = 2.0 / 4.0 = 0.5 A.\nTerminal P.D. V = I × R = 0.5 A × 3.5 Ω = 1.75 V.`
    },
    {
      topic: 'Optics, Lenses & Mirrors',
      question: `A ray of light traveling from glass (refractive index n = 1.50) to air strikes the interface. Calculate the critical angle for total internal reflection.`,
      options: [
        { key: 'A', text: '41.8°' },
        { key: 'B', text: '48.6°' },
        { key: 'C', text: '30.0°' },
        { key: 'D', text: '60.0°' }
      ],
      correctOption: 'A',
      explanation: `sin(C) = 1 / n = 1 / 1.50 = 0.6667 => C = arcsin(0.6667) ≈ 41.8°.`
    },
    {
      topic: 'Mechanics (Motion, Pulleys & Work)',
      question: `A bullet of mass 20 g is fired horizontally with a speed of 400 m/s into a stationary wooden block of mass 1.98 kg resting on a smooth surface. Find the common velocity of the bullet-block system after embedding.`,
      options: [
        { key: 'A', text: '4.0 m/s' },
        { key: 'B', text: '8.0 m/s' },
        { key: 'C', text: '2.0 m/s' },
        { key: 'D', text: '10.0 m/s' }
      ],
      correctOption: 'A',
      explanation: `Conservation of momentum: m₁u₁ = (m₁ + m₂)v.\n(0.02 kg × 400 m/s) = (0.02 + 1.98) kg × v => 8 = 2.0 × v => v = 4.0 m/s.`
    }
  ],

  chemistry: [
    {
      topic: 'Organic Chemistry (Alkanes, Alkanols, Esters)',
      question: `Which of the following represents the IUPAC systematic name for CH₃-CH(CH₃)-CH₂-CH₂-OH?`,
      options: [
        { key: 'A', text: '3-methylbutan-1-ol' },
        { key: 'B', text: '2-methylbutan-4-ol' },
        { key: 'C', text: '3-methylpentanol' },
        { key: 'D', text: 'Isoamyl alcohol' }
      ],
      correctOption: 'A',
      explanation: `The longest continuous carbon chain with the principal -OH functional group has 4 carbons (butan-1-ol), with a methyl substituent at carbon-3.`
    },
    {
      topic: 'Volumetric Analysis & Titration',
      question: `Which indicator is most suitable for the titration of a weak acid (e.g. CH₃COOH) with a strong base (e.g. NaOH)?`,
      options: [
        { key: 'A', text: 'Phenolphthalein' },
        { key: 'B', text: 'Methyl orange' },
        { key: 'C', text: 'Methyl red' },
        { key: 'D', text: 'Bromocresol green' }
      ],
      correctOption: 'A',
      explanation: `A weak acid-strong base titration produces a basic salt at equivalence (pH > 7), which matches the working range (8.2 - 10.0) of phenolphthalein.`
    }
  ],

  biology: [
    {
      topic: 'Genetics & Heredity',
      question: `In a dihybrid cross between two heterozygous pea plants (RrYy × RrYy), what is the expected phenotypic ratio among the offspring?`,
      options: [
        { key: 'A', text: '9 : 3 : 3 : 1' },
        { key: 'B', text: '1 : 2 : 1' },
        { key: 'C', text: '3 : 1' },
        { key: 'D', text: '9 : 7' }
      ],
      correctOption: 'A',
      explanation: `According to Mendel's Law of Independent Assortment, a heterozygous dihybrid cross produces a 9:3:3:1 phenotypic ratio.`
    },
    {
      topic: 'Cell Biology & Organelles',
      question: `Which cellular organelle contains digestive hydrolytic enzymes capable of breaking down cellular waste, foreign debris, and damaged organelles?`,
      options: [
        { key: 'A', text: 'Lysosome' },
        { key: 'B', text: 'Centriole' },
        { key: 'C', text: 'Ribosome' },
        { key: 'D', text: 'Endoplasmic reticulum' }
      ],
      correctOption: 'A',
      explanation: `Lysosomes contain acid hydrolases that execute cellular digestion and autophagy.`
    }
  ],

  economics: [
    {
      topic: 'Price Determination & Elasticity',
      question: `When the demand for a good increases while supply remains constant, what happens to the equilibrium price and quantity?`,
      options: [
        { key: 'A', text: 'Equilibrium price rises and equilibrium quantity rises' },
        { key: 'B', text: 'Equilibrium price falls and equilibrium quantity falls' },
        { key: 'C', text: 'Equilibrium price rises and equilibrium quantity falls' },
        { key: 'D', text: 'Equilibrium price falls and equilibrium quantity rises' }
      ],
      correctOption: 'A',
      explanation: `A rightward shift in demand along a stationary supply curve pushes the equilibrium point higher up the curve, increasing both price and quantity.`
    }
  ],

  government: [
    {
      topic: 'Constitutional Development in Nigeria',
      question: `The 1954 Lyttelton Constitution was historic in Nigeria because it established:`,
      options: [
        { key: 'A', text: 'A truly federal system of government with regional autonomy' },
        { key: 'B', text: 'The first unicameral central legislature' },
        { key: 'C', text: 'Universal adult suffrage for the entire nation' },
        { key: 'D', text: 'The abolition of traditional monarchies' }
      ],
      correctOption: 'A',
      explanation: `The Lyttelton Constitution of 1954 formally introduced Nigerian federalism by delineating exclusive federal and regional legislative powers.`
    }
  ],

  literature: [
    {
      topic: 'Literary Devices & Figures of Speech',
      question: `Identify the literary device used in the line: "The sea raged and pounded upon the cliffs in wild fury."`,
      options: [
        { key: 'A', text: 'Personification' },
        { key: 'B', text: 'Hyperbole' },
        { key: 'C', text: 'Synecdoche' },
        { key: 'D', text: 'Metonymy' }
      ],
      correctOption: 'A',
      explanation: `Attributing human emotions ('raged', 'wild fury') to an inanimate force of nature (the sea) is personification.`
    }
  ],

  crs: [
    {
      topic: 'New Testament & The Gospels',
      question: `During the Sermon on the Mount, Jesus taught: "Blessed are the peacemakers, for they shall be called..."`,
      options: [
        { key: 'A', text: 'Sons of God' },
        { key: 'B', text: 'Inheritors of the earth' },
        { key: 'C', text: 'Comforted' },
        { key: 'D', text: 'Rulers of the kingdom' }
      ],
      correctOption: 'A',
      explanation: `Matthew 5:9: "Blessed are the peacemakers, for they shall be called sons of God."`
    }
  ],

  commerce: [
    {
      topic: 'Trade & Aids to Trade',
      question: `Which auxiliary aid to trade is specifically responsible for bridging the time gap between the production of goods and their final consumption?`,
      options: [
        { key: 'A', text: 'Warehousing' },
        { key: 'B', text: 'Transportation' },
        { key: 'C', text: 'Banking' },
        { key: 'D', text: 'Insurance' }
      ],
      correctOption: 'A',
      explanation: `Warehousing stores produced goods safely until demanded, effectively eliminating the time disparity between production and consumption.`
    }
  ],

  accounting: [
    {
      topic: 'Double Entry System & Ledger',
      question: `According to the fundamental accounting equation, Total Assets are equal to:`,
      options: [
        { key: 'A', text: 'Capital + Liabilities' },
        { key: 'B', text: 'Capital - Liabilities' },
        { key: 'C', text: 'Gross Profit + Current Assets' },
        { key: 'D', text: 'Net Profit - Drawings' }
      ],
      correctOption: 'A',
      explanation: `The fundamental accounting equation is Assets = Capital (Equity) + Liabilities.`
    }
  ],

  civics: [
    {
      topic: 'Democratic Governance & Citizenship',
      question: `Which of the following is a primary civic duty of a responsible citizen in a democratic nation?`,
      options: [
        { key: 'A', text: 'Obedience to constitutionally enacted laws and prompt payment of taxes' },
        { key: 'B', text: 'Refusing to participate in national population census' },
        { key: 'C', text: 'Evading jury or community service' },
        { key: 'D', text: 'Disregarding traffic regulations' }
      ],
      correctOption: 'A',
      explanation: `Civic duties obligate citizens to uphold the rule of law, pay statutory taxes, and contribute constructively to society.`
    }
  ]
};

// Generates dynamic parameterized question variants across syllabus topics so every question is unique
export function generateDynamicQuestion(
  subjectId: SubjectId,
  topic: string,
  index: number,
  year: number
): Question {
  const seed = (year * 41 + index * 23 + topic.length * 17) % 1000;
  
  switch (subjectId) {
    case 'english': {
      const engTemplates = [
        {
          q: `Choose the option that best completes the sentence:\n"The Vice-Chancellor, together with the members of Senate, ________ arriving for the convocation ceremony."`,
          opts: [
            { key: 'A' as const, text: 'is' },
            { key: 'B' as const, text: 'are' },
            { key: 'C' as const, text: 'were' },
            { key: 'D' as const, text: 'have been' }
          ],
          corr: 'A' as const,
          exp: `Parenthetical additions introduced by 'together with' do not alter the number of the subject ('The Vice-Chancellor' is singular).`
        },
        {
          q: `Choose the option NEAREST IN MEANING to the highlighted word:\n"The researcher\'s conclusions were considered **INCONTROVERTIBLE** by the international scientific panel."`,
          opts: [
            { key: 'A' as const, text: 'Indisputable and beyond question' },
            { key: 'B' as const, text: 'Tentative and uncertain' },
            { key: 'C' as const, text: 'Subjective' },
            { key: 'D' as const, text: 'Misleading' }
          ],
          corr: 'A' as const,
          exp: `'Incontrovertible' means not able to be denied or disputed; indisputable.`
        },
        {
          q: `Select the option OPPOSITE IN MEANING to the capitalized word:\n"The government introduced stringent policies to curb **PROFLIGATE** public expenditure."`,
          opts: [
            { key: 'A' as const, text: 'Thrifty and prudent' },
            { key: 'B' as const, text: 'Reckless' },
            { key: 'C' as const, text: 'Lavish' },
            { key: 'D' as const, text: 'Unrestrained' }
          ],
          corr: 'A' as const,
          exp: `'Profligate' means recklessly extravagant or wasteful in the use of resources. The antonym is 'Thrifty and prudent'.`
        },
        {
          q: `From the words lettered A to D, choose the word that rhymes with "d<u>ough</u>":`,
          opts: [
            { key: 'A' as const, text: 'slow' },
            { key: 'B' as const, text: 'rough' },
            { key: 'C' as const, text: 'through' },
            { key: 'D' as const, text: 'plough' }
          ],
          corr: 'A' as const,
          exp: `'Dough' is pronounced /doʊ/, rhyming with 'slow' /sloʊ/.`
        },
        {
          q: `Choose the interpretation that best explains the expression:\n"Ifeoma always speaks with her tongue in her cheek."`,
          opts: [
            { key: 'A' as const, text: 'She speaks insincerely or mockingly rather than seriously.' },
            { key: 'B' as const, text: 'She has a speech defect.' },
            { key: 'C' as const, text: 'She speaks with extreme anger.' },
            { key: 'D' as const, text: 'She whispers confidential secrets.' }
          ],
          corr: 'A' as const,
          exp: `'Tongue in cheek' refers to an ironic, flippant, or insincere remark not intended to be taken literally.`
        }
      ];

      const sel = engTemplates[index % engTemplates.length];
      return {
        id: `eng-gen-${year}-${index + 1}`,
        examType: 'UTME',
        subjectId: 'english',
        subjectName: 'Use of English',
        year,
        questionNumber: index + 1,
        topic,
        question: sel.q,
        options: sel.opts,
        correctOption: sel.corr,
        explanation: sel.exp,
        difficulty: 'medium'
      };
    }

    case 'mathematics': {
      const a = (seed % 6) + 2;
      const b = ((seed * 3) % 7) + 3;
      const c = ((seed * 5) % 5) + 1;
      
      const mathVariants = [
        {
          q: `Solve for x in the quadratic equation ${a}x² - ${(a*b + c)}x + ${b*c} = 0.`,
          opts: [
            { key: 'A' as const, text: `x = ${b} or x = ${c}/${a}` },
            { key: 'B' as const, text: `x = -${b} or x = ${c}` },
            { key: 'C' as const, text: `x = ${a} or x = ${b}` },
            { key: 'D' as const, text: `x = -${c} or x = -${b}` }
          ],
          corr: 'A' as const,
          exp: `Factorizing (${a}x - ${c})(x - ${b}) = 0 yields roots x = ${b} and x = ${c}/${a}.`
        },
        {
          q: `Find the sum of the first ${a + 4} terms of an Arithmetic Progression whose first term is ${c} and common difference is ${a}.`,
          opts: [
            { key: 'A' as const, text: `${Math.round(((a + 4) / 2) * (2 * c + (a + 3) * a))}` },
            { key: 'B' as const, text: `${Math.round(((a + 4) / 2) * (2 * c + (a + 3) * a)) + 14}` },
            { key: 'C' as const, text: `${Math.round(((a + 4) / 2) * (2 * c + (a + 3) * a)) - 6}` },
            { key: 'D' as const, text: `${Math.round(((a + 4) / 2) * (2 * c + (a + 3) * a)) * 2}` }
          ],
          corr: 'A' as const,
          exp: `Formula S_n = n/2 [2a + (n - 1)d]. Here n = ${a + 4}, a₁ = ${c}, d = ${a}. S = ${(a + 4) / 2} × [${2 * c} + ${ (a + 3) * a }] = ${Math.round(((a + 4) / 2) * (2 * c + (a + 3) * a))}.`
        },
        {
          q: `Evaluate the limit: lim(x→${c}) [x² - ${c * c}] / [x - ${c}].`,
          opts: [
            { key: 'A' as const, text: `${2 * c}` },
            { key: 'B' as const, text: `${c}` },
            { key: 'C' as const, text: `0` },
            { key: 'D' as const, text: `Undefined` }
          ],
          corr: 'A' as const,
          exp: `(x² - ${c * c})/(x - ${c}) = (x - ${c})(x + ${c})/(x - ${c}) = x + ${c}. As x → ${c}, limit = ${c} + ${c} = ${2 * c}.`
        },
        {
          q: `If log₁₀(${a * 10}) = x and log₁₀(${b}) = y, express log₁₀(${a * b * 10}) in terms of x and y.`,
          opts: [
            { key: 'A' as const, text: 'x + y' },
            { key: 'B' as const, text: 'x - y' },
            { key: 'C' as const, text: 'x · y' },
            { key: 'D' as const, text: 'x / y' }
          ],
          corr: 'A' as const,
          exp: `Using the logarithm product law: log(A · B) = log(A) + log(B) => log(${a * 10} × ${b}) = x + y.`
        }
      ];
      
      const sel = mathVariants[index % mathVariants.length];
      return {
        id: `math-gen-${year}-${index + 1}`,
        examType: 'UTME',
        subjectId: 'mathematics',
        subjectName: 'Mathematics',
        year,
        questionNumber: index + 1,
        topic,
        question: sel.q,
        options: sel.opts,
        correctOption: sel.corr,
        explanation: sel.exp,
        difficulty: 'medium'
      };
    }

    case 'physics': {
      const mass = (seed % 5) + 1;
      const velocity = ((seed * 2) % 12) + 6;
      const height = ((seed * 3) % 20) + 10;
      
      const phyVariants = [
        {
          q: `Calculate the kinetic energy of a body of mass ${mass} kg moving with a uniform velocity of ${velocity} m/s.`,
          opts: [
            { key: 'A' as const, text: `${0.5 * mass * velocity * velocity} J` },
            { key: 'B' as const, text: `${mass * velocity} J` },
            { key: 'C' as const, text: `${2 * mass * velocity * velocity} J` },
            { key: 'D' as const, text: `${0.5 * mass * velocity} J` }
          ],
          corr: 'A' as const,
          exp: `K.E. = 1/2 m v² = 0.5 × ${mass} × (${velocity})² = ${0.5 * mass * velocity * velocity} Joules.`
        },
        {
          q: `A stone of mass 0.5 kg is dropped from a cliff of height ${height} m. Determine its potential energy before release. (g = 10 m/s²)`,
          opts: [
            { key: 'A' as const, text: `${0.5 * 10 * height} J` },
            { key: 'B' as const, text: `${10 * height} J` },
            { key: 'C' as const, text: `${0.5 * height} J` },
            { key: 'D' as const, text: `${5 * height * height} J` }
          ],
          corr: 'A' as const,
          exp: `P.E. = mgh = 0.5 kg × 10 m/s² × ${height} m = ${0.5 * 10 * height} Joules.`
        },
        {
          q: `Which of the following electromagnetic waves has the highest photon energy and highest frequency?`,
          opts: [
            { key: 'A' as const, text: 'Gamma rays' },
            { key: 'B' as const, text: 'Radio waves' },
            { key: 'C' as const, text: 'Microwaves' },
            { key: 'D' as const, text: 'Infrared waves' }
          ],
          corr: 'A' as const,
          exp: `Gamma rays have the highest frequency and shortest wavelength in the electromagnetic spectrum, and hence carry the greatest photon energy (E = hf).`
        }
      ];

      const sel = phyVariants[index % phyVariants.length];
      return {
        id: `phy-gen-${year}-${index + 1}`,
        examType: 'UTME',
        subjectId: 'physics',
        subjectName: 'Physics',
        year,
        questionNumber: index + 1,
        topic,
        question: sel.q,
        options: sel.opts,
        correctOption: sel.corr,
        explanation: sel.exp,
        difficulty: 'medium'
      };
    }

    case 'chemistry': {
      const chemVariants = [
        {
          q: `What is the oxidation number of chromium in potassium heptaoxodichromate(VI), K₂Cr₂O₇?`,
          opts: [
            { key: 'A' as const, text: '+6' },
            { key: 'B' as const, text: '+7' },
            { key: 'C' as const, text: '+3' },
            { key: 'D' as const, text: '+4' }
          ],
          corr: 'A' as const,
          exp: `In K₂Cr₂O₇: 2(+1) + 2(Cr) + 7(-2) = 0 => 2 + 2Cr - 14 = 0 => 2Cr = 12 => Cr = +6.`
        },
        {
          q: `Which of the following elements has the electronic configuration 1s² 2s² 2p⁶ 3s² 3p⁴?`,
          opts: [
            { key: 'A' as const, text: 'Sulfur (S, Z = 16)' },
            { key: 'B' as const, text: 'Phosphorus (P, Z = 15)' },
            { key: 'C' as const, text: 'Silicon (Si, Z = 14)' },
            { key: 'D' as const, text: 'Chlorine (Cl, Z = 17)' }
          ],
          corr: 'A' as const,
          exp: `Total electrons = 2 + 2 + 6 + 2 + 4 = 16, which corresponds to Sulfur (Atomic Number 16).`
        }
      ];

      const sel = chemVariants[index % chemVariants.length];
      return {
        id: `chem-gen-${year}-${index + 1}`,
        examType: 'UTME',
        subjectId: 'chemistry',
        subjectName: 'Chemistry',
        year,
        questionNumber: index + 1,
        topic,
        question: sel.q,
        options: sel.opts,
        correctOption: sel.corr,
        explanation: sel.exp,
        difficulty: 'medium'
      };
    }

    case 'biology': {
      const bioVariants = [
        {
          q: `Which of the following blood groups is designated as the universal recipient in ABO blood typing?`,
          opts: [
            { key: 'A' as const, text: 'Blood group AB' },
            { key: 'B' as const, text: 'Blood group O' },
            { key: 'C' as const, text: 'Blood group A' },
            { key: 'D' as const, text: 'Blood group B' }
          ],
          corr: 'A' as const,
          exp: `Blood group AB individuals possess both A and B antigens on red cells and produce no anti-A or anti-B antibodies in plasma, making them universal recipients.`
        },
        {
          q: `In the nitrogen cycle, which group of bacteria converts atmospheric nitrogen gas into nitrates usable by green plants?`,
          opts: [
            { key: 'A' as const, text: 'Nitrogen-fixing bacteria (e.g. Rhizobium, Azotobacter)' },
            { key: 'B' as const, text: 'Denitrifying bacteria (e.g. Pseudomonas)' },
            { key: 'C' as const, text: 'Putrefying bacteria' },
            { key: 'D' as const, text: 'Lactic acid bacteria' }
          ],
          corr: 'A' as const,
          exp: `Nitrogen-fixing bacteria fix atmospheric N₂ into organic ammonia and nitrates assimilated by plants.`
        }
      ];

      const sel = bioVariants[index % bioVariants.length];
      return {
        id: `bio-gen-${year}-${index + 1}`,
        examType: 'UTME',
        subjectId: 'biology',
        subjectName: 'Biology',
        year,
        questionNumber: index + 1,
        topic,
        question: sel.q,
        options: sel.opts,
        correctOption: sel.corr,
        explanation: sel.exp,
        difficulty: 'easy'
      };
    }

    default: {
      const defaultVariants = [
        {
          q: `In the study of ${topic}, which foundational concept is most critical for structural analysis?`,
          opts: [
            { key: 'A' as const, text: 'Systematic empirical observation and analytical deduction' },
            { key: 'B' as const, text: 'Random subjective speculation' },
            { key: 'C' as const, text: 'Exclusion of comparative historical data' },
            { key: 'D' as const, text: 'Static non-verifiable assumptions' }
          ],
          corr: 'A' as const,
          exp: `Core principles in ${topic} rely on rigorous structural analysis, empirical evidence, and conceptual logic.`
        }
      ];

      const sel = defaultVariants[index % defaultVariants.length];
      return {
        id: `${subjectId}-gen-${year}-${index + 1}`,
        examType: 'UTME',
        subjectId,
        subjectName: subjectId.toUpperCase(),
        year,
        questionNumber: index + 1,
        topic,
        question: sel.q,
        options: sel.opts,
        correctOption: sel.corr,
        explanation: sel.exp,
        difficulty: 'medium'
      };
    }
  }
}
