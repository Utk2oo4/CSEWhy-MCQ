# 🏛️ UPSC MCQ Challenge — Interactive Quiz & Leaderboard Platform

An interactive, high-conversion web application designed for UPSC civil services aspirants. It presents scenario-based case studies (such as GS Paper IV Ethics), captures leads, delivers instant examiner-style feedback, ranks candidates on a live leaderboard, and seamlessly converts users to course offerings.

---

## 🌟 Key Features

- **📖 Realistic Case Study Panel**: Collapsible reading panel containing comprehensive administrative dilemmas and stakeholder situations.
- **⏱️ Per-Question Countdown Timer**: Visual SVG countdown ring with pulse and urgency alerts (e.g., last 10 seconds).
- **🎓 Examiner-Style Feedback Engine**:
  - Compares the candidate's chosen response against the model answer.
  - Granular, per-option feedback cards (e.g., *Too narrow*, *Good base*, *Strongest*, *Abdication*).
  - Detailed overall ethical/analytical explanation for each question.
- **🏆 Live Real-Time Leaderboard**:
  - Displays top 50 scores with real-time polling updates every 8 seconds.
  - Automatically highlights the active candidate's rank with a `"You"` tag.
  - Gold, silver, and bronze rank badges.
- **🎯 Lead Capture & Form Validation**:
  - Validates full name and candidate contact (email or 10-digit Indian mobile number) before entry.
- **📢 Course Showcase & Auto-Redirect CTA**:
  - Course promotional card highlighting upcoming masterclasses, dates, perks, and pricing.
  - Configurable countdown bar that automatically navigates candidates to the course enrollment page.
- **🔌 Multi-Backend Support**:
  - **MongoDB + Express**: High-concurrency Node.js REST API.
  - **Google Sheets / Apps Script**: Serverless logging directly into a Google Sheet.
  - **Offline / LocalStorage Fallback**: Works zero-config straight out of the box in offline and demo modes.

---

## 🛠️ Tech Stack

| Layer | Technologies |
| :--- | :--- |
| **Frontend** | Vanilla HTML5, CSS3 (Modern Glassmorphism & Custom Properties), JavaScript (ES6+) |
| **Backend** | Node.js, Express.js |
| **Database** | MongoDB (Native Driver 6.x) / MongoDB Atlas |
| **Alternative Backend** | Google Apps Script (GAS) for Google Sheets integration |
| **Development** | Nodemon, Dotenv, CORS |

---

## 📁 Project Structure

```text
MCQ-Online/
├── index.html              # Main single-page application (Entry, Quiz, Results/Leaderboard)
├── style.css               # Design tokens, typography, glassmorphism UI, responsive layouts
├── config.js               # Centralized configuration (quiz metadata, questions, CTA, timers)
├── server.js               # Express + MongoDB backend server (score submission, leaderboard)
├── apps-script-backend.gs  # Optional Google Apps Script backend for Google Sheets
├── questions.txt           # Reference question bank and examiner rubrics
├── package.json            # Node.js dependencies and run scripts
├── .env.example            # Template for environment variables
└── README.md               # Project documentation
```

---

## 🚀 Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v16 or higher)
- [MongoDB](https://www.mongodb.com/) (Local instance or free [MongoDB Atlas](https://www.mongodb.com/atlas) cluster)

### 1. Clone & Install Dependencies

```bash
git clone <repository-url>
cd MCQ-Oniine
npm install
```

### 2. Configure Environment Variables

Create a `.env` file from the provided `.env.example`:

```bash
cp .env.example .env
```

Edit `.env` with your settings:

```env
# MongoDB Connection String (Atlas or Local)
MONGODB_URI=mongodb+srv://<username>:<password>@<cluster>.mongodb.net/?retryWrites=true&w=majority

# Database & Collection Names
DB_NAME=upsc_quiz
COL_NAME=leaderboard

# Server Port
PORT=3001
```

### 3. Start the Server

**Production mode:**
```bash
npm start
```

**Development mode (auto-reload via nodemon):**
```bash
npm run dev
```

The application will be served at `http://localhost:3001`.

---

## ⚙️ Configuration (`config.js`)

All quiz content, questions, branding, and redirection logic are customizable in [config.js](file:///Users/utk_2oo4/Desktop/WORK-1/MCQ-Oniine/config.js) without editing the application code:

```javascript
const QUIZ_CONFIG = {
  // Brand & Header
  title: "GS4 Ethics Challenge",
  subtitle: "A real UPSC Paper IV case study. Three questions...",

  // Case Study (Set to "" to omit)
  caseStudyTag: "GS Paper IV · Ethics Case Study · Delhi Metro",
  caseStudy: `...`,

  // API Configuration
  apiUrl: "http://localhost:3001", // Or empty "" for localStorage offline mode

  // Per-question timer (seconds, 0 to disable)
  secondsPerQuestion: 90,

  // Redirect after quiz completion
  redirectUrl: "https://your-course-platform.com/enroll",
  redirectSeconds: 5,

  // Course CTA Card
  courseName: "AI Masterclass for UPSC Aspirants",
  coursePrice: "₹500",
  courseBenefits: [ ... ],

  // Questions Array
  questions: [
    {
      marks: 10,
      q: "Question text here?",
      hint: "Guidance for candidates",
      options: ["Option A", "Option B", "Option C"],
      correct: 2, // 0-indexed correct option
      explain: "Comprehensive explanation...",
      feedback: [
        { label: "Too narrow", detail: "..." },
        { label: "Good base",  detail: "..." },
        { label: "Strongest",  detail: "..." }
      ]
    }
  ]
};
```

---

## 🌐 Backend Integrations

### Option A: Node.js + MongoDB (Default)
- High-performance, scalable storage for candidate scores.
- Includes automatic index creation for leaderboard queries (`{ score: -1, createdAt: 1 }`).
- Real-time polling support for live participant boards.

### Option B: Google Apps Script (Google Sheets)
If you prefer saving candidate contacts and scores directly into Google Sheets:
1. Create a Google Sheet and name a tab `Leaderboard`.
2. Open **Extensions** → **Apps Script**.
3. Copy and paste the contents of [apps-script-backend.gs](file:///Users/utk_2oo4/Desktop/WORK-1/MCQ-Oniine/apps-script-backend.gs).
4. Deploy as **Web App** with:
   - *Execute as*: `Me`
   - *Who has access*: `Anyone`
5. Copy the deployed Web App URL and set it as `apiUrl` in [config.js](file:///Users/utk_2oo4/Desktop/WORK-1/MCQ-Oniine/config.js).

### Option C: Offline / Standalone Mode
Leave `apiUrl: ""` in [config.js](file:///Users/utk_2oo4/Desktop/WORK-1/MCQ-Oniine/config.js). Scores and leaderboard rankings will be stored locally in the browser's `localStorage`.

---

## 📡 API Reference

### Health Check
- **Endpoint**: `GET /api/health`
- **Response**:
  ```json
  { "ok": true, "ts": "2026-09-23T05:48:37.000Z" }
  ```

### Save Quiz Score
- **Endpoint**: `POST /api/score`
- **Request Body**:
  ```json
  {
    "name": "Priya Sharma",
    "score": 3,
    "total": 3,
    "contact": "priya@example.com"
  }
  ```
- **Response**:
  ```json
  { "ok": true }
  ```

### Fetch Leaderboard
- **Endpoint**: `GET /api/leaderboard`
- **Response**:
  ```json
  {
    "ok": true,
    "data": [
      {
        "name": "Priya Sharma",
        "score": 3,
        "total": 3,
        "createdAt": "2026-09-23T05:48:37.000Z"
      }
    ]
  }
  ```

---

## 🔒 Security Best Practices

- **Never commit `.env`**: Make sure your `.env` containing database credentials remains in `.gitignore`.
- **CORS restriction in production**: Update `app.use(cors())` in [server.js](file:///Users/utk_2oo4/Desktop/WORK-1/MCQ-Oniine/server.js) with your specific production origin before deploying.
- **Input Sanitization**: Score submissions are typed and truncated to safe lengths by the API.

---

## 📄 License

This project is licensed under the [MIT License](LICENSE).
