# Job Hunt Daily Planner

A personal **year-long offline job hunt tracker** built with React for Full Stack / Software Engineer roles. No server, no login, no internet required — just double-click and go.

---

## What is this?

This planner structures a focused **March 31 – December 31, 2026** job search. It gives you a strict daily schedule tailored to a full stack developer, tracks every application you send, keeps a pipeline of your interview progress, stores all your recruiter/vendor contacts, and guides you through a curated AI project build every weekend — all saved locally in your browser.

---

## Features

### Daily Planner — Full Year View (Mar 31 – Dec 31, 2026)

Month-by-month calendar with `‹` / `›` navigation. Click any day to open a full schedule. Each day shows:
- Day type (Study+Apply / AI Build / Revision)
- DSA indicator (◆L Learn · ◆R Revise)
- Progress bar + completion percentage

**Monthly progress bar** at the top of each month view.

---

### Weekday Study Rotation (5:30 – 7:00 AM)

Each weekday focuses on a different full stack topic:

| Day | Focus Area |
|-----|-----------|
| Monday | Backend — Java Core, Spring Boot, JPA/Hibernate, REST API design |
| Tuesday | Frontend — React Hooks, patterns, JavaScript/TypeScript |
| Wednesday | Database — SQL joins, CTEs, indexing, MongoDB, transactions |
| Thursday | System Design — microservices, REST vs GraphQL, architecture diagrams |
| Friday | DevOps + Behavioral — Docker, AWS, CI/CD, STAR answers |

---

### Weekday Job Search (7:00 AM – 7:00 PM)

- **7:00 – 11:30 AM** — LinkedIn, Dice C2C, Dice W2 (Round 1)
- **1:00 – 2:00 PM** — Full-Time applications (LinkedIn / Indeed / Glassdoor)
- **2:00 – 4:30 PM** — LinkedIn, Dice C2C, Dice W2 (Round 2)
- **6:00 – 7:00 PM** — Log responses, update Interview Tracker, plan follow-ups

---

### Weekend — AI Project Build (Primary Priority)

Weekends are dedicated to building **AI-powered full stack projects** using your existing Java/Spring Boot + React + PostgreSQL stack.

**Saturday — AI Project Build Day**

| Time | Task |
|------|------|
| 8:00 – 9:30 AM | Read official docs for this week's AI project |
| 10:00 – 10:30 AM | Set up repo, install deps, configure API keys |
| 10:30 AM – 1:00 PM | Build core AI feature (Spring AI chain / RAG / LLM integration) |
| 1:00 – 2:30 PM | Add React UI + Spring Boot REST endpoint |
| 2:30 – 3:30 PM | Test AI responses, refine prompts, fix edge cases |
| 3:30 – 4:00 PM | Push to GitHub — README + demo screenshots + LinkedIn update |
| 4:30 – 5:30 PM | *(Secondary)* Full stack integration polish |
| 6:00 PM+ | DSA practice |

**Sunday — AI Study + Light Revision**

| Time | Task |
|------|------|
| 9:00 – 10:30 AM | Deep-dive AI concept + read AI news/papers |
| 10:30 AM – 12:30 PM | Continue/improve Saturday's project + deploy |
| 12:30 – 2:30 PM | *(Secondary)* Compressed full stack revision + behavioral |
| 3:00 PM+ | DSA practice |

---

### 12 AI Projects — Spring Boot + React + PostgreSQL

One project per week, rotating automatically. All projects use your skill set — no Python, no FastAPI.

| # | Project | Impact | Stack |
|---|---------|--------|-------|
| 1 | AI Interview Coach | 🔥 Very High | Spring Boot · React · PostgreSQL · Claude API |
| 2 | AI Resume Analyzer & JD Matcher | 🔥 Very High | Spring AI · pgvector · OpenAI |
| 3 | Full Stack AI Chatbot with Memory | 🔥 Very High | Spring WebFlux · React · OpenAI Streaming |
| 4 | Natural Language to SQL | 🔥 Very High | Spring AI · PostgreSQL · OpenAI |
| 5 | AI Job Description Analyzer | 🔥 Very High | Spring Boot · React · Claude API |
| 6 | AI Smart Task Manager | ⚡ High | Spring Boot · JPA · Claude API |
| 7 | AI Code Reviewer | ⚡ High | Spring Boot · React · Claude API |
| 8 | RAG Knowledge Base | 🔥 Very High | Spring AI · pgvector · PDF ingestion |
| 9 | AI Expense Tracker with Insights | ⚡ High | Spring Boot · Chart.js · OpenAI |
| 10 | AI Blog Platform with SEO | ⚡ High | Spring Boot · React Quill · OpenAI |
| 11 | Real-Time AI Collaboration Notes | ⚡ High | Spring WebSocket · React · OpenAI |
| 12 | AI Customer Support Bot (RAG) | 🔥 Very High | Spring AI · RAG · pgvector |

Each project shows **3 direct documentation links** (Spring AI docs, API docs, step-by-step guide) inside the day modal.

---

### Coding Practice Rotation

**April (March 31 – April 30) — MNC Practice Programs**

16 topics of common programs asked in TCS, Infosys, Wipro, Cognizant, Accenture, Capgemini — each with a direct GeeksforGeeks link.

| Topic | Learn (Even dates) | Revise (Odd dates) |
|-------|--------------------|--------------------|
| Palindrome & Reverse | Reverse string + palindrome number | Palindrome string check |
| Fibonacci & Factorial | Print series + factorial | Nth Fibonacci with memoization |
| Prime Numbers | Check prime + print all primes | Sieve of Eratosthenes |
| Pattern Programs | Star triangle + number pyramid | Diamond + Pascal's triangle |
| Armstrong & Number Props | Armstrong + perfect number | All Armstrong 1–1000 |
| GCD, LCM & Math | GCD + LCM | Swap without temp variable |
| String Basics | Count vowels + first non-repeating char | Anagram check |
| String Manipulation | Reverse words + remove duplicates | Char frequency HashMap |
| Array Basics | Max/min/second largest + missing number | Find all duplicates |
| Array Operations | Reverse + rotate by K | Move zeros to end |
| Sorting | Bubble sort + Selection sort | Insertion sort |
| Searching | Linear search + Binary search (iter) | Binary search (recursive) |
| Matrix | Transpose + diagonal elements | Rotate 90° |
| Recursion | Power + sum of array | Tower of Hanoi |
| Stack & Queue | Stack impl + Queue impl | Queue using two stacks |
| Classic MNC | FizzBuzz + Roman numerals | Balanced parentheses |

**May 1 onwards — LeetCode Problems**

Switches automatically to 16 DSA topics with curated LeetCode problems:
- **Even dates → Learn day:** New topic + 2 Easy problems (clickable links)
- **Odd dates → Revise day:** Revise topic + 1 Medium problem

Topics: Arrays & Two Pointers, Strings & Sliding Window, LinkedList, Stack & Queue, Binary Search, Trees (BFS/DFS), Dynamic Programming, Graphs, HashMap & HashSet, Recursion & Backtracking, Heaps, Sorting & Intervals, Prefix Sum & Kadane's, Bit Manipulation, Greedy Algorithms, Tries

---

### Interview Tracker

Two views — toggle between them at any time.

**Daily Log (default)** — grouped by applied date, newest first:
- Shows: Company · Role · Source badge · Type badge · Stage badge
- Inline stage update dropdown on every card
- Stats bar: Today / This week / Total applications
- Search by company, role, or source
- Date picker to filter by any specific day

**Pipeline view** — Kanban board across 6 stages:
Applied → Phone Screen → Technical → Onsite → Offer 🎉 → Rejected

Fields per entry: Company, Role, Source (LinkedIn / Dice C2C / Dice W2 / Indeed / Glassdoor / Referral / Other), Type (C2C / W2 / Full-Time), Applied Date, Stage, Notes.

---

### Follow-Up Tracker

Inside each day's modal — add recruiter/vendor follow-ups. Each follow-up:
- Marks as done / undone
- Auto-creates a contact in the Contact Book (no duplicates)
- Can be deleted

---

### Recruiter & Vendor Contact Book

Searchable address book for everyone you interact with.

Fields: Name, Company, Email, Phone, Platform, Job Type, Notes, Last Contacted (one-click "✓ Today" button).

---

## Tech Stack

| Layer | Technology |
|-------|-----------|
| UI | React 18 (functional components, hooks) |
| Styling | Plain CSS — dark theme (#0f172a) |
| Storage | Browser `localStorage` — no backend, no database |
| Build | Create React App with `"homepage": "."` for file:// support |
| Runtime | Static HTML/JS/CSS — open directly in any browser |

---

## How to Run

### Option 1 — Offline (recommended)

**macOS:** Double-click `Open Planner.command` in the project root.

**Any OS:** Open `frontend/build/index.html` directly in any browser.

No internet required after cloning.

### Option 2 — Development mode

```bash
cd frontend
npm install
npm start
```

Opens at `http://localhost:3000` with hot reload.

### Option 3 — Rebuild production bundle

```bash
cd frontend
npm install
npm run build
```

Then open `frontend/build/index.html` directly in any browser.

---

## Project Structure

```
Daily Task/
├── Open Planner.command              # macOS launcher — double-click to open
├── README.md
└── frontend/
    ├── public/
    │   └── index.html
    ├── src/
    │   ├── App.js                    # Root — year generation, month navigation
    │   ├── App.css                   # Global dark theme styles
    │   ├── storage.js                # All localStorage read/write operations
    │   ├── index.js                  # React entry point
    │   └── components/
    │       ├── MonthView.js          # Monthly calendar grid with nav buttons
    │       ├── DayModal.js           # Daily schedule, MNC/LeetCode, AI projects
    │       ├── TaskItem.js           # Single task row with checkbox + link
    │       ├── NoteSection.js        # Daily notes textarea
    │       ├── InterviewTracker.js   # Daily Log + Pipeline views
    │       └── ContactBook.js        # Recruiter/vendor address book
    ├── build/                        # Production build (ready to open offline)
    └── package.json
```

---

## Data & Privacy

All data is saved in your **browser's localStorage** — nothing is sent to any server. Your tasks, notes, contacts, and interview entries live entirely on your machine.

> Clearing browser data/cache will erase planner data. Export or back up localStorage manually if needed.

---

## Schedule Philosophy

- **Weekday morning rotation** keeps full stack skills sharp without feeling like a second job
- **Two job search rounds daily** catches newly posted roles on the same platforms
- **Weekend AI projects** build a portfolio of production-grade AI applications using your exact stack — the most in-demand skill set in 2026
- **MNC programs first** build coding confidence before jumping into LeetCode
- **DSA alternating learn/revise** builds problem-solving stamina gradually alongside the heavy job search workload
- **Interview Tracker daily log** makes it trivially easy to answer "where did I apply this week?" in any interview
