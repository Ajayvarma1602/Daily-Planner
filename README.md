# Job Hunt Daily Planner

A personal 31-day offline job hunt tracker built with React. No server, no login, no internet required after setup — just double-click and go.

---

## What is this?

This planner was built to structure a focused 31-day job search for **Full Stack / Software Engineer** roles. It gives you a strict daily schedule, tracks every application you send, keeps a pipeline of your interview progress, and stores all your recruiter/vendor contacts — all saved locally in your browser.

---

## Features

### Daily Planner
A 31-day calendar view starting from when you first open the app. Click any day to open a detailed schedule.


**Saturday:** Project building tasks (plan, code, push to GitHub, write summary)

**Sunday:** Revision — Java, React, SQL, Behavioural, Project rehearsal

Each task shows a time slot and can be clicked to mark it complete. A progress bar tracks your completion percentage per day.

---

### DSA + LeetCode Rotation (16 Topics)
Every day alternates between learning and revising:

- **Even dates → Learn day:** Study a new DSA topic + solve 2 Easy LeetCode problems
- **Odd dates → Revise day:** Revise the same topic + solve 1 Medium LeetCode problem

All LeetCode problems are clickable links that open directly in the browser.

**Topics covered:**
Arrays & Two Pointers, Strings & Sliding Window, LinkedList, Stack & Queue, Binary Search, Trees (BFS & DFS), Dynamic Programming (1D), Graphs (BFS & DFS), HashMap & HashSet, Recursion & Backtracking, Heaps & Priority Queue, Sorting & Intervals, Prefix Sum & Kadane's, Bit Manipulation, Greedy Algorithms, Tries

---

### Follow-Up Tracker
Inside each day's modal, you can add follow-ups for recruiters and vendors (e.g. "Follow up with John @ TechCorp on Thursday"). Each follow-up can be:
- Marked as done
- Deleted
- **Automatically synced to your Contacts** — the moment you add a follow-up, a matching contact is created in the Contact Book (no duplicates)

---

### Interview Tracker
A Kanban-style pipeline to track every application.

**Stages:** Applied → Phone Screen → Technical → Onsite → Offer → Rejected

For each entry you can store:
- Company name and role
- Job type (C2C / W2 / Full-Time)
- Date applied
- Current stage (moveable via dropdown)
- Notes (recruiter name, next steps, etc.)

---

### Recruiter & Vendor Contact Book
A searchable address book for everyone you interact with during the job hunt.

For each contact:
- Name, company, email, phone
- Platform (LinkedIn, Dice, Indeed, Glassdoor, Email, Phone, Other)
- Job type (C2C / W2 / Full-Time)
- Notes
- Last contacted date (mark with one click)

Contacts added from the Follow-Up Tracker appear here automatically.

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

### Option 1 — Manual open
Open `frontend/build/index.html` directly in any browser.

### Option 2 — Development mode
```bash
cd frontend
npm install
npm start
```
Opens at `http://localhost:3000` with hot reload.

---

## Data & Privacy

All data is saved in your **browser's localStorage** — nothing is sent to any server. Your tasks, notes, contacts, and interview entries live entirely on your machine.

> If you clear browser data/cache, your planner data will be erased. Use the browser's localStorage export or take a manual backup if needed.

---

## Project Structure

```
Daily Task/
├── Open Planner.command          # macOS launcher — double-click to open
├── frontend/
│   ├── public/
│   │   └── index.html
│   ├── src/
│   │   ├── App.js                # Root component, tab navigation
│   │   ├── App.css               # Global dark theme styles
│   │   ├── storage.js            # All localStorage read/write operations
│   │   ├── index.js              # React entry point
│   │   └── components/
│   │       ├── MonthView.js      # 31-day calendar grid
│   │       ├── DayModal.js       # Daily schedule + DSA tasks + follow-ups
│   │       ├── TaskItem.js       # Single task row with checkbox and time
│   │       ├── NoteSection.js    # Daily notes textarea
│   │       ├── InterviewTracker.js  # Interview pipeline (Kanban)
│   │       └── ContactBook.js    # Recruiter/vendor address book
│   ├── build/                    # Production build (ready to open offline)
│   └── package.json
└── README.md
```

---

## Schedule Philosophy

The planner is built around maximising job search output while keeping skills sharp:

- **Morning study** keeps your interview preparation consistent without burning out
- **Two job search rounds** (morning + afternoon) on the same platforms ensures you catch newly posted roles
- **Dedicated full-time application slot** separates contract hunting from permanent role hunting
- **Evening tracking** ensures no positive response goes unnoticed and every follow-up is planned
- **DSA rotation** builds problem-solving stamina gradually — easy problems on learn days, one medium on revise days — so it never feels like extra work on top of a heavy job search day
