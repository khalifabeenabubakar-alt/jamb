import { LiteratureText } from '../types';

export const LITERATURE_TEXTS: LiteratureText[] = [
  {
    id: 'the-lekki-headmaster',
    title: 'The Lekki Headmaster',
    author: 'Kabir Alabi Garba',
    exam: 'JAMB UTME',
    genre: 'Contemporary Nigerian Prose / Educational Fiction',
    synopsis: `The Lekki Headmaster follows the life, ethical dilemmas, and instructional dedication of Mr. Stephen Obalolu, a seasoned educator who transitions from public secondary school administration to leading an elite, ultra-modern private academy situated in the affluent Lekki peninsula of Lagos. The novel explores social inequality, parent-school friction, academic integrity, teenage digital distractions, and moral courage in 21st-century Nigeria.`,
    characters: [
      {
        name: 'Stephen Obalolu',
        role: 'Protagonist / The Headmaster',
        description: 'A disciplined, principled veteran school administrator committed to transformative pedagogy, student welfare, and strict anti-examination malpractice policies.',
        traits: ['Principled', 'Empathetic', 'Resolute', 'Traditional yet adaptable']
      },
      {
        name: 'Chief Adeleke Davies',
        role: 'Chairman, Board of Governors',
        description: 'An influential billionaire real estate mogul whose commercial ambitions for the school frequently clash with Obalolu’s non-negotiable moral standards.',
        traits: ['Authoritarian', 'Commercial-minded', 'Persuasive', 'Status-conscious']
      },
      {
        name: 'Kafayat Adeleke',
        role: 'Key Student Character',
        description: 'Chief Davies’ gifted yet conflicted daughter, navigating intense parental expectations, social media peer pressure, and academic ambition.',
        traits: ['Intelligent', 'Vulnerable', 'Articulate']
      },
      {
        name: 'Mrs. Folake Adeyemi',
        role: 'Vice Principal (Academics)',
        description: 'A dedicated educator who serves as Obalolu’s most trusted confidante and operational anchor in executing educational reforms.',
        traits: ['Methodical', 'Loyal', 'Diplomatic']
      }
    ],
    themes: [
      {
        title: 'Integrity vs. Commercialization of Education',
        description: 'The perpetual tension between educational institutions as moral incubators versus profit-maximizing enterprises catering to elite whims.',
        keyQuotes: [
          '"A school that trades its moral compass for tuition revenue produces educated barbarians."',
          '"Excellence is not measured by architectural grandeur, but by the integrity of the mind."'
        ]
      },
      {
        title: 'Socio-Economic Divide in Modern Lagos',
        description: 'The stark contrast between mainland public schools with dilapidated infrastructure and island academies equipped with robotics labs.',
        keyQuotes: [
          '"Lekki’s gleaming glass towers cast long shadows over the unpaved alleys of Ajegunle."'
        ]
      },
      {
        title: 'Youth, Digital Hyper-connectivity, and Identity',
        description: 'How smartphones, viral fame, and peer validation impact the psychological wellbeing and academic focus of teenagers.',
        keyQuotes: [
          '"In an era of viral metrics, quiet contemplation has become a forgotten virtue."'
        ]
      }
    ],
    chapters: [
      {
        number: 1,
        title: 'The Crossing of the Lekki-Ikoyi Toll Bridge',
        summary: 'Stephen Obalolu arrives at Horizon Crest Academy in Lekki for his inaugural briefing. He observes the staggering contrast with his former government school in Surulere and meets the flamboyant Board Chairman, Chief Adeleke Davies.',
        keyEvents: [
          'Obalolu’s early morning commute across the toll bridge reflecting on his 25 years of teaching.',
          'Tour of Horizon Crest Academy’s state-of-the-art facilities.',
          'Initial private confrontation regarding the lenient treatment of wealthy recalcitrant students.'
        ],
        sampleQuestions: [
          {
            id: 'lekki-q1',
            examType: 'UTME',
            subjectId: 'english',
            subjectName: 'Use of English',
            year: 2025,
            questionNumber: 1,
            topic: 'Assigned Novel / Literature Guide',
            question: `In Chapter 1 of 'The Lekki Headmaster', what surprised Stephen Obalolu most during his maiden inspection of Horizon Crest Academy?`,
            options: [
              { key: 'A', text: 'The acute shortage of qualified science laboratory teachers' },
              { key: 'B', text: 'The opulent digital infrastructure juxtaposed with a lack of disciplined moral culture' },
              { key: 'C', text: 'The low student enrolment and high dropout rate' },
              { key: 'D', text: 'The exorbitant cost of school lunch tickets' }
            ],
            correctOption: 'B',
            explanation: `Obalolu was struck by the lavish amenities and robotics labs in sharp contrast to the permissive indiscipline tolerated by previous administrators.`,
            difficulty: 'easy'
          },
          {
            id: 'lekki-q2',
            examType: 'UTME',
            subjectId: 'english',
            subjectName: 'Use of English',
            year: 2025,
            questionNumber: 2,
            topic: 'Assigned Novel / Literature Guide',
            question: `Chief Adeleke Davies insisted on admitting unqualified students primarily because:`,
            options: [
              { key: 'A', text: 'He wanted to offer philanthropic scholarships to orphans' },
              { key: 'B', text: 'He prioritized securing massive capital development levies from high-net-worth parents' },
              { key: 'C', text: 'The Ministry of Education mandated a quota system' },
              { key: 'D', text: 'The school had excess empty classroom wings' }
            ],
            correctOption: 'B',
            explanation: `Chief Davies viewed student admissions through commercial profitability and capital expansion rather than meritocratic academic thresholds.`,
            difficulty: 'medium'
          }
        ]
      },
      {
        number: 2,
        title: 'The Viral Examination Leak',
        summary: 'During the mid-term mock examinations, a sophisticated AI-assisted cheating syndicate is uncovered involving several prominent students. Obalolu faces immense pressure from wealthy parents and board members to suppress the disciplinary committee report.',
        keyEvents: [
          'Detection of encrypted test prompt sharing via mobile smartwatches during physics exam.',
          'Chief Davies demands the expulsion be commuted to a private verbal reprimand.',
          'Obalolu submits his conditional resignation letter, refusing to compromise the academy’s accreditation.'
        ],
        sampleQuestions: [
          {
            id: 'lekki-q3',
            examType: 'UTME',
            subjectId: 'english',
            subjectName: 'Use of English',
            year: 2025,
            questionNumber: 3,
            topic: 'Assigned Novel / Literature Guide',
            question: `How did Stephen Obalolu react when asked by the school board to conceal the mock examination malpractice?`,
            options: [
              { key: 'A', text: 'He demanded a 50% salary increment to keep quiet' },
              { key: 'B', text: 'He tendered his conditional letter of resignation to uphold exam integrity' },
              { key: 'C', text: 'He leaked the evidence immediately to national newspapers' },
              { key: 'D', text: 'He blamed the invigilators and dismissed all junior science staff' }
            ],
            correctOption: 'B',
            explanation: `Obalolu courageously stood his ground and submitted his conditional resignation rather than rubber-stamp academic fraud.`,
            difficulty: 'medium'
          }
        ]
      }
    ]
  },
  {
    id: 'the-life-changer',
    title: 'The Life Changer',
    author: 'Khadija Abubakar Jalli',
    exam: 'JAMB UTME',
    genre: 'Campus Life & Family Narrative',
    synopsis: `The Life Changer follows Ummi narrating campus experiences, youth temptations, and moral lessons to her children (Omar, Teemah, Jamila, and Bint) as Omar celebrates gaining admission into the university. Through various subplots involving characters like Salma, Habib, Tomiwa, and Habib's associate Labaran, the novel explores the trials of tertiary education.`,
    characters: [
      {
        name: 'Ummi',
        role: 'Narrator / Mother',
        description: 'A loving, observant mother who uses captivating storytelling to prepare her children for the freedom and pitfalls of university life.',
        traits: ['Wise', 'Protective', 'Storyteller']
      },
      {
        name: 'Omar',
        role: 'Eldest Son',
        description: 'The newly admitted university candidate proud of his 230 JAMB score, eager to study Law.',
        traits: ['Ambitious', 'Inquisitive', 'Optimistic']
      },
      {
        name: 'Salma',
        role: 'Major Campus Character',
        description: 'A sophisticated, overly confident student whose pride and reliance on shortcuts lead to severe campus trials.',
        traits: ['Arrogant', 'Fashionable', 'Prone to vanity']
      }
    ],
    themes: [
      {
        title: 'Freedom and Accountability in Tertiary Institutions',
        description: 'The transition from closely monitored secondary school life to unchecked university autonomy.',
        keyQuotes: [
          '"University is where freedom can either forge a scholar or destroy a character."'
        ]
      },
      {
        title: 'Parental Guidance and Moral Foundation',
        description: 'The indispensable value of honest familial communication before leaving home.',
        keyQuotes: [
          '"A child who listens to home counsel avoids the bitter lessons of the street."'
        ]
      }
    ],
    chapters: [
      {
        number: 1,
        title: 'Omar’s Triumph and the Family Gathering',
        summary: 'Omar rushes home joyfully to announce his admission to study Law at Ahmadu Bello University after scoring 230 in his UTME. Ummi gathers the family to share stories of university life.',
        keyEvents: [
          'Omar shows his admission letter to his mother and sisters.',
          'Discussion on university registration, hostel accommodations, and freedom.',
          'Ummi begins recounting her own early experiences at the university.'
        ],
        sampleQuestions: [
          {
            id: 'lc-q1',
            examType: 'UTME',
            subjectId: 'english',
            subjectName: 'Use of English',
            year: 2024,
            questionNumber: 1,
            topic: 'Assigned Novel / Literature Guide',
            question: `In 'The Life Changer', what course of study did Omar gain admission to pursue?`,
            options: [
              { key: 'A', text: 'Medicine' },
              { key: 'B', text: 'Law' },
              { key: 'C', text: 'Accounting' },
              { key: 'D', text: 'Petroleum Engineering' }
            ],
            correctOption: 'B',
            explanation: `Omar gained admission to study Law at the university with a UTME score of 230.`,
            difficulty: 'easy'
          }
        ]
      }
    ]
  }
];
