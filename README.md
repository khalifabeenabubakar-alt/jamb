# ExamsNG — 100% Free Computer-Based Testing (CBT) & Exam Preparation Platform

ExamsNG is a high-performance, offline-capable Computer-Based Testing (CBT) examination simulator designed specifically for Nigerian secondary school students preparing for **JAMB UTME**, **WAEC SSCE**, and **NECO SSCE**.

The platform is **100% completely free for all students**:
* **No payment restrictions**: Zero subscriptions, no payment gateways, no premium tier paywalls, and no activation codes required.
* **Open access to all content**: All question pools, full timed mock exams, comprehensive explanations, theory marking guides, novel literature summaries, and diagnostic analytics are freely accessible to every student.
* **Offline-ready**: Works smoothly without continuous internet connectivity via Progressive Web App (PWA) client-side caching and browser persistence.

---

## Key Features

### 1. Authentic JAMB UTME 4-Subject CBT Simulator
* **Full 4-Subject Mock**: Simulates the authentic JAMB configuration with 180 questions across 4 selected subjects (60 English + 40/40/40 departmental subjects), a 120-minute unified timer, and a 400-point composite scoring model.
* **Standard 8-Key Navigation**: Supports standard CBT hardware keyboard shortcuts:
  * `A`, `B`, `C`, `D` — Select answer options
  * `N` / Right Arrow — Next question
  * `P` / Left Arrow — Previous question
  * `R` / `F` — Flag / Unflag question for review
  * `S` — Open submission confirmation dialog
* **Live Question Palette**: Interactive navigation grid showing instant answered (green), unanswered (slate), flagged (amber), and active (blue) statuses.
* **Approved On-Screen Scientific Calculator**: Includes trigonometric, logarithmic, powers, square root, factorial, and memory functions.
* **Comprehensive Pre-Exam Briefing**: Displays examination rules, timing, subject counts, and scoring rubrics before starting.

### 2. Reliable Auto-Saving & Interruption Recovery
* **Real-Time Answer Saving**: Selected answers and flags are automatically saved in local storage.
* **Session Restoration**: Interrupted sessions (caused by accidental tab close, page refresh, or device sleep) prompt students with a **Resume Examination** recovery banner so no progress is lost.
* **Anti-Double Submission**: Submissions lock with confirmation modals to prevent accidental duplicate scoring.

### 3. Subject Drills & Topic Mastery Engine
* Practice by examination body (**JAMB UTME**, **WAEC**, **NECO**), individual subject, syllabus topic, past question year, and timed/untimed modes.
* Full syllabus coverage for:
  * Use of English (Comprehension passages, Lexis, Antonyms, Oral Forms, Literature)
  * Mathematics (Algebra, Calculus, Trigonometry, Circle Geometry, Statistics, Coordinate Geometry)
  * Physics (Circuits, Optics, Mechanics, Thermal Physics, Waves, Modern Physics)
  * Chemistry (Organic Chemistry, Titration, Electrochemistry, Periodic Table, Stoichiometry)
  * Biology (Genetics, Nephron/Excretion, Cell Biology, Flower Anatomy, Ecology)
  * Economics, Government, Literature in English, CRS, and Financial Accounting.

### 4. WAEC & NECO Theory Marking Lab
* Authentic Paper 2 theory and essay questions with official West African Examinations Council (WAEC) marking schemes.
* Step-by-step scoring based on **Method (M)**, **Accuracy (A)**, and **Bonus (B)** marks, complete with Chief Examiner remarks and common pitfalls.

### 5. Literature & Novel Guides
* Complete chapter-by-chapter summaries, character profiles, themes, and practice quizzes for prescribed novels (including *The Lekki Headmaster* and *The Life Changer*).

### 6. Score Reports & Admission Cut-Off Index
* Full percentage breakdown, correct count, incorrect count, skipped count, and time spent per question.
* Real-time benchmark comparison with Federal University cut-off marks for competitive courses (Medicine, Law, Computer Science, Engineering, Accounting) across UNILAG, UI, OAU, and UNIBEN.
* Question-by-question review with detailed explanations and syllabus citations.

### 7. Protected Administrator Question Management System
* Dedicated admin portal accessible via the sidebar navigation (`/admin_questions`).
* **CRUD operations**: Add new questions, edit existing questions, or remove questions from the pool.
* **Bulk Import**: Validate and import batch questions in structured JSON format with error reporting.
* Security: Credentials and administrator tools remain strictly segregated from student examination testing.

---

## Technologies Used

* **Framework**: React 19 (TypeScript)
* **Build Tool**: Vite 6
* **Styling**: Tailwind CSS
* **Icons**: Lucide React
* **Confetti**: canvas-confetti
* **Storage**: Browser LocalStorage & Cache API with Progressive Web App (PWA) Service Worker

---

## Installation & Setup

### Prerequisites
* Node.js (version 18 or higher recommended)
* npm or bun

### 1. Clone & Install Dependencies
```bash
git clone <repository-url>
cd examsng
npm install
```

### 2. Environment Variables Configuration
Copy the sample environment file:
```bash
cp .env.example .env
```
Ensure `.env` contains:
```env
GEMINI_API_KEY="YOUR_API_KEY_HERE"
APP_URL="http://localhost:3000"
```
*(No secret administrator passwords or private database keys should ever be committed or exposed in frontend code).*

### 3. Run Development Server
```bash
npm run dev
```
The application will launch on `http://localhost:3000`.

### 4. Build for Production
```bash
npm run build
npm run preview
```

### 5. Lint & Type Check
```bash
npm run lint
```

---

## Question Management & Bulk Import Format

To bulk import questions through the Administrator Portal:
1. Log into the Administrator Portal from the sidebar (default local passcode: `admin2026`).
2. Click **Bulk JSON Import**.
3. Input JSON matching the following schema:

```json
[
  {
    "examType": "UTME",
    "subjectId": "mathematics",
    "year": 2024,
    "topic": "Algebra & Quadratic Equations",
    "question": "If 2x + 5 = 15, calculate the value of x.",
    "options": [
      { "key": "A", "text": "3" },
      { "key": "B", "text": "5" },
      { "key": "C", "text": "10" },
      { "key": "D", "text": "7" }
    ],
    "correctOption": "B",
    "explanation": "2x = 15 - 5 = 10, thus x = 5.",
    "difficulty": "easy"
  }
]
```

---

## Offline & PWA Usage

* **Install to Device**: On Chrome (Android / Desktop) and Safari (iOS), use the browser menu to **Install App** or **Add to Home Screen**.
* **Offline Operation**: The app shell, question assets, and local exam engines are cached using the service worker (`/sw.js`) and manifest (`/manifest.json`), allowing students to practice even without an active internet connection.

---

## Testing Verification

* **Full Mock Examination**: Tested from instructions briefing to timer expiration and manual submission.
* **Question Navigation**: Tested Next, Previous, Flag, Option select, and Palette jumps.
* **Auto-Save & Resume**: Tested tab interruption and session recovery.
* **Marking Engine**: Verified score compilation and percentage calculations.
* **Admin Portal**: Verified question authoring, editing, deletion, and bulk validation.
