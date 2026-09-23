/**
 * ─────────────────────────────────────────────────────────────
 *  UPSC MCQ CHALLENGE — CONFIG FILE
 *  Edit this file to customize your quiz.
 *  No coding knowledge needed — just change the values below.
 * ─────────────────────────────────────────────────────────────
 */

const QUIZ_CONFIG = {

  /**
   * BRAND / META
   * Your quiz title and subtitle shown on the entry screen.
   */
  title: "GS4 Ethics Challenge",
  subtitle: "A real UPSC Paper IV case study. Three questions. See how an examiner would judge your answers.",

  /**
   * CASE STUDY
   * Shown as a reading panel before the first question.
   * Set to "" to skip the case panel entirely.
   */
  caseStudyTag: "GS Paper IV · Ethics Case Study · Delhi Metro",
  caseStudy: `You are Shashank Mehta, an IAS officer serving as Director (Projects) in the Delhi Metro Rail Corporation, overseeing Phase-IV construction. Three weeks before a new elevated corridor connecting a densely populated resettlement colony is due for final inspection and inauguration — an event the Chief Minister's office has publicly committed to before Diwali — a junior structural engineer, Priya, brings you test reports showing that a batch of reinforcement steel used in the corridor's viaduct fails prescribed tensile-strength norms.

The supply contract was awarded to a firm whose owner is known to be close to a senior member of your own board. Priya, the only engineer willing to put the findings in writing, tells you her earlier internal note was buried, and she has now been recommended for transfer to a remote maintenance site — she believes, in retaliation.

Rectifying the batch means breaking open a completed 400-metre stretch, delaying the inauguration by months and inviting a vigilance inquiry that will also scrutinise your own directorate's clearances. The alternative — certifying the stretch with "additional monitoring" — is defensible on paper, since the shortfall is marginal, but leaves a structure meant to last a century carrying lakhs of daily passengers on compromised steel. Meanwhile, colony residents, for whom this is their first direct metro link, are counting down to the inauguration.`,

  /**
   * REDIRECT URL
   * Where users are sent after the leaderboard countdown.
   * Replace with your actual course URL.
   */
  redirectUrl: "http://csewhy.com/courses/ai-masterclass",

  /**
   * REDIRECT COUNTDOWN
   * Seconds to wait on the leaderboard before redirecting.
   */
  redirectSeconds: 5,

  /**
   * MONGODB BACKEND API
   * URL of your running server instance.
   * Leave empty ("") to automatically use the current domain (recommended for Vercel & local server).
   * Or set an explicit URL like "http://localhost:3001" if running separately.
   */
  apiUrl: "",

  /**
   * COURSE CTA
   * The card shown below the leaderboard.
   */
  courseName:     "AI Masterclass for UPSC Aspirants",
  courseBy:       "CSEWhy",
  courseTagline:  "Ace Your UPSC Preparation with AI.",
  courseDesc:     "A 100-minute live masterclass to help you build a smarter preparation system for Prelims, Mains, Essay and Interview.",
  courseBenefits: [
    "100-Minute Live AI Masterclass",
    "UPSC AI Prompt Library — Prelims + Mains + CSAT",
    "Practical AI for UPSC E-Book",
    "AI-Powered UPSC Study & Revision Toolkit"
  ],
  courseEvent: {
    date:  "3 October 2026",
    time:  "5:00 PM",
    mode:  "Live Online"
  },
  coursePrice:    "₹199",
  courseTrust:    "Trusted by 10,000+ Aspirants",
  courseUrgency:  "Limited Seats Available 🚀",
  courseCtaText:  "Register Now →",

  /**
   * TIMER
   * Seconds per question. Set to 0 to disable the timer.
   * These are long GS4 answers — 90 seconds recommended.
   */
  secondsPerQuestion: 90,

  /**
   * QUESTIONS
   * Format:
   * {
   *   marks:   10,               // shown as "10 marks" label
   *   q:       "Question text",
   *   hint:    "Hint shown below the question",  // optional
   *   options: ["Option A text", "Option B text", "Option C text"],
   *   correct: 0,                // 0-indexed
   *   explain: "Overall explanation shown after answering.",
   *   feedback: [                // per-option feedback labels (optional)
   *     { label: "Too narrow", detail: "..." },
   *     { label: "Good base",  detail: "..." },
   *     { label: "Strongest",  detail: "..." }
   *   ]
   * }
   */
  questions: [
    {
      marks: 10,
      q: "Which answer best identifies the stakeholders and the core ethical dilemma?",
      hint: "Tap the response you would write in the exam.",
      options: [
        "The main stakeholders are DMRC and the contractor. The dilemma is whether the inauguration should be delayed.",
        "Stakeholders include DMRC, commuters, residents, Priya, the contractor and government. The dilemma is safety versus timely delivery.",
        "Stakeholders are Shashank and DMRC, Priya, the contractor and board member, commuters, colony residents, government and future users. The case pits safety, integrity and accountability against political deadlines, institutional convenience and personal risk, while raising conflict of interest, empathy and whistleblower protection."
      ],
      correct: 2,
      explain: "A strong GS4 answer maps both people and values: public safety, integrity, accountability, empathy, conflict of interest and whistleblower protection.",
      feedback: [
        { label: "Too narrow", detail: "It notices the operational decision, but misses passengers, Priya, residents, the government, future users and the values in conflict." },
        { label: "Good base",  detail: "This has broad coverage, but it still needs conflict of interest, retaliation against a whistleblower, institutional integrity and long-term public trust." },
        { label: "Strongest",  detail: "This combines stakeholder mapping with the individual and institutional dilemmas. It names the values an examiner can award marks for." }
      ]
    },
    {
      marks: 10,
      q: "Which option analysis is the most ethically complete?",
      hint: "Look for real alternatives with merits and demerits.",
      options: [
        "Certify the stretch with additional monitoring because the steel shortfall is marginal and residents need the metro.",
        "Compare three paths: certify with monitoring (fast, but unsafe and dishonest); independently re-test before deciding (due diligence, but delay leaves Priya exposed); or halt, rectify and investigate (safest and accountable, but politically costly and disruptive).",
        "Order more tests and wait for a consensus so that no stakeholder feels unfairly treated."
      ],
      correct: 1,
      explain: "Do not create fake balance. A good options analysis acknowledges the real cost of every path without treating avoidable risk to life as acceptable.",
      feedback: [
        { label: "Weak",         detail: "It values timely service but gambles with lives, normalises dishonest certification and ignores the retaliation and conflict of interest." },
        { label: "Strongest",    detail: "This presents distinct options, gives each a merit and demerit, and shows why the costs are ethically unequal." },
        { label: "Fence-sitting",detail: "Re-testing may support due diligence, but waiting for consensus avoids ownership. Safety and retaliation require time-bound action, not indefinite consultation." }
      ]
    },
    {
      marks: 10,
      q: "What is the best final course of action?",
      hint: "Choose the response with a clear sequence and ethical justification.",
      options: [
        "Halt certification, order an independent re-test, rectify the compromised stretch, begin a time-bound vigilance inquiry, stay Priya's transfer, and brief the board, government and public with a revised timeline. This follows integrity, accountability, empathy, duty, utilitarian harm prevention and courage of conviction.",
        "Allow inauguration of the unaffected stations, keep the questionable stretch closed and investigate after the public event.",
        "Ask the board to decide because it awarded the contract and has more institutional authority."
      ],
      correct: 0,
      explain: "Ethical administration turns values into steps: stop the unsafe act, verify independently, fix accountability, protect truth-tellers and communicate honestly.",
      feedback: [
        { label: "Strongest",          detail: "It is decisive, sequenced and transparent. It protects passengers and the whistleblower while accepting scrutiny of your own directorate." },
        { label: "Tempting compromise",detail: "Phasing may reduce disruption, but delaying the inquiry preserves the pressure network and leaves Priya vulnerable. Any partial opening also needs independent safety clearance." },
        { label: "Abdication",         detail: "Escalation is useful, but transferring the whole decision to a conflicted body abandons your own duty as Director (Projects)." }
      ]
    }
  ]

};
