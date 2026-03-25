import React, { useState, useEffect } from 'react';
import TaskItem from './TaskItem';
import NoteSection from './NoteSection';
import * as storage from '../storage';

const LC = (num, name, diff, slug) => ({
  num, name, diff, url: `https://leetcode.com/problems/${slug}/`,
});

// DSA data: learn = 2 Easy problems, revise = 1 Medium problem
const DSA_DATA = [
  {
    topic: 'Arrays & Two Pointers',
    learn:  [LC(1,   'Two Sum',                         'Easy', 'two-sum'),
             LC(121, 'Best Time to Buy and Sell Stock', 'Easy', 'best-time-to-buy-and-sell-stock')],
    revise: [LC(15,  '3Sum', 'Medium', '3sum')],
  },
  {
    topic: 'Strings & Sliding Window',
    learn:  [LC(242, 'Valid Anagram',    'Easy', 'valid-anagram'),
             LC(125, 'Valid Palindrome', 'Easy', 'valid-palindrome')],
    revise: [LC(3, 'Longest Substring Without Repeating Characters', 'Medium', 'longest-substring-without-repeating-characters')],
  },
  {
    topic: 'LinkedList',
    learn:  [LC(206, 'Reverse Linked List', 'Easy', 'reverse-linked-list'),
             LC(141, 'Linked List Cycle',   'Easy', 'linked-list-cycle')],
    revise: [LC(19, 'Remove Nth Node From End of List', 'Medium', 'remove-nth-node-from-end-of-list')],
  },
  {
    topic: 'Stack & Queue',
    learn:  [LC(20,  'Valid Parentheses',            'Easy', 'valid-parentheses'),
             LC(232, 'Implement Queue using Stacks', 'Easy', 'implement-queue-using-stacks')],
    revise: [LC(739, 'Daily Temperatures', 'Medium', 'daily-temperatures')],
  },
  {
    topic: 'Binary Search',
    learn:  [LC(704, 'Binary Search',          'Easy', 'binary-search'),
             LC(35,  'Search Insert Position', 'Easy', 'search-insert-position')],
    revise: [LC(33, 'Search in Rotated Sorted Array', 'Medium', 'search-in-rotated-sorted-array')],
  },
  {
    topic: 'Trees — BFS & DFS',
    learn:  [LC(104, 'Maximum Depth of Binary Tree', 'Easy', 'maximum-depth-of-binary-tree'),
             LC(226, 'Invert Binary Tree',            'Easy', 'invert-binary-tree')],
    revise: [LC(102, 'Binary Tree Level Order Traversal', 'Medium', 'binary-tree-level-order-traversal')],
  },
  {
    topic: 'Dynamic Programming (1D)',
    learn:  [LC(70,  'Climbing Stairs',   'Easy', 'climbing-stairs'),
             LC(118, "Pascal's Triangle", 'Easy', 'pascals-triangle')],
    revise: [LC(198, 'House Robber', 'Medium', 'house-robber')],
  },
  {
    topic: 'Graphs — BFS & DFS',
    learn:  [LC(733,  'Flood Fill',                   'Easy', 'flood-fill'),
             LC(1971, 'Find if Path Exists in Graph',  'Easy', 'find-if-path-exists-in-graph')],
    revise: [LC(200, 'Number of Islands', 'Medium', 'number-of-islands')],
  },
  {
    topic: 'HashMap & HashSet',
    learn:  [LC(217, 'Contains Duplicate', 'Easy', 'contains-duplicate'),
             LC(383, 'Ransom Note',         'Easy', 'ransom-note')],
    revise: [LC(49, 'Group Anagrams', 'Medium', 'group-anagrams')],
  },
  {
    topic: 'Recursion & Backtracking',
    learn:  [LC(509, 'Fibonacci Number', 'Easy', 'fibonacci-number'),
             LC(231, 'Power of Two',     'Easy', 'power-of-two')],
    revise: [LC(78, 'Subsets', 'Medium', 'subsets')],
  },
  {
    topic: 'Heaps & Priority Queue',
    learn:  [LC(1046, 'Last Stone Weight', 'Easy', 'last-stone-weight'),
             LC(506,  'Relative Ranks',    'Easy', 'relative-ranks')],
    revise: [LC(215, 'Kth Largest Element in an Array', 'Medium', 'kth-largest-element-in-an-array')],
  },
  {
    topic: 'Sorting & Intervals',
    learn:  [LC(977, 'Squares of a Sorted Array', 'Easy', 'squares-of-a-sorted-array'),
             LC(905, 'Sort Array By Parity',       'Easy', 'sort-array-by-parity')],
    revise: [LC(56, 'Merge Intervals', 'Medium', 'merge-intervals')],
  },
  {
    topic: "Prefix Sum & Kadane's",
    learn:  [LC(53,   'Maximum Subarray',        'Easy', 'maximum-subarray'),
             LC(1480, 'Running Sum of 1d Array', 'Easy', 'running-sum-of-1d-array')],
    revise: [LC(238, 'Product of Array Except Self', 'Medium', 'product-of-array-except-self')],
  },
  {
    topic: 'Bit Manipulation',
    learn:  [LC(191, 'Number of 1 Bits', 'Easy', 'number-of-1-bits'),
             LC(268, 'Missing Number',   'Easy', 'missing-number')],
    revise: [LC(371, 'Sum of Two Integers', 'Medium', 'sum-of-two-integers')],
  },
  {
    topic: 'Greedy Algorithms',
    learn:  [LC(455, 'Assign Cookies',  'Easy', 'assign-cookies'),
             LC(860, 'Lemonade Change', 'Easy', 'lemonade-change')],
    revise: [LC(55, 'Jump Game', 'Medium', 'jump-game')],
  },
  {
    topic: 'Tries',
    learn:  [LC(208, 'Implement Trie (Prefix Tree)',               'Medium', 'implement-trie-prefix-tree'),
             LC(211, 'Design Add and Search Words Data Structure', 'Medium', 'design-add-and-search-words-data-structure')],
    revise: [LC(648, 'Replace Words', 'Medium', 'replace-words')],
  },
];

// Even date = Learn new DSA topic, Odd date = Revise previous day's topic
const isLearnDay = (date) => date.getDate() % 2 === 0;

const getDSAData = (date) => {
  const startOf2026 = new Date('2026-01-01');
  const dayIndex = Math.floor((date - startOf2026) / (1000 * 60 * 60 * 24));
  const topicIndex = Math.floor((isLearnDay(date) ? dayIndex : dayIndex - 1) / 2);
  return DSA_DATA[topicIndex % DSA_DATA.length];
};

export const getTasksForDate = (date) => {
  const day = date.getDay();

  const learnDay = isLearnDay(date);
  const dsa = getDSAData(date);
  const { topic } = dsa;
  const problems = learnDay ? dsa.learn : dsa.revise;
  const fmt = (p) => `#${p.num} ${p.name} [${p.diff}]`;

  if (day === 6) {
    const base = [
      { id: 'task_0', label: 'Plan project tasks and features for the day',            category: 'project', time: '9:00 – 9:30 AM'  },
      { id: 'task_1', label: 'Code for at least 2–3 hours (Java / React / Full Stack)', category: 'project', time: '9:30 AM – 1:00 PM' },
      { id: 'task_2', label: 'Push code to GitHub with a meaningful commit message',    category: 'project', time: '1:00 – 1:30 PM'  },
      { id: 'task_3', label: 'Write a short summary of what you built today',           category: 'project', time: '1:30 – 2:00 PM'  },
    ];
    if (learnDay) {
      base.push(
        { id: 'task_4', label: `DSA — Learn: ${topic}`,                          category: 'dsa',    time: '3:00 – 4:00 PM' },
        { id: 'task_5', label: `LeetCode ${fmt(problems[0])}`, url: problems[0].url, category: 'dsa',    time: '4:00 – 4:45 PM' },
        { id: 'task_6', label: `LeetCode ${fmt(problems[1])}`, url: problems[1].url, category: 'dsa',    time: '4:45 – 5:30 PM' },
      );
    } else {
      base.push(
        { id: 'task_4', label: `DSA — Revise: ${topic}`,                          category: 'dsarev', time: '3:00 – 3:45 PM' },
        { id: 'task_5', label: `LeetCode ${fmt(problems[0])}`, url: problems[0].url, category: 'dsarev', time: '3:45 – 4:30 PM' },
      );
    }
    return base;
  }

  if (day === 0) {
    const base = [
      { id: 'task_0', label: 'Revise Java — OOP, Collections, Streams, Spring Boot',  category: 'revision', time: '9:00 – 9:45 AM'      },
      { id: 'task_1', label: 'Revise React — Hooks, State, Props, Redux basics',       category: 'revision', time: '9:45 – 10:30 AM'     },
      { id: 'task_2', label: 'Revise SQL — Joins, Indexes, Subqueries, Optimization',  category: 'revision', time: '10:30 – 11:15 AM'    },
      { id: 'task_3', label: 'Review 3 Behavioural questions using STAR method',       category: 'revision', time: '11:15 AM – 12:00 PM' },
      { id: 'task_4', label: 'Rehearse explanation of 1 past project out loud',        category: 'revision', time: '12:00 – 12:30 PM'    },
    ];
    if (learnDay) {
      base.push(
        { id: 'task_5', label: `DSA — Learn: ${topic}`,                          category: 'dsa',    time: '2:00 – 3:00 PM' },
        { id: 'task_6', label: `LeetCode ${fmt(problems[0])}`, url: problems[0].url, category: 'dsa',    time: '3:00 – 3:45 PM' },
        { id: 'task_7', label: `LeetCode ${fmt(problems[1])}`, url: problems[1].url, category: 'dsa',    time: '3:45 – 4:30 PM' },
      );
    } else {
      base.push(
        { id: 'task_5', label: `DSA — Revise: ${topic}`,                          category: 'dsarev', time: '2:00 – 2:45 PM' },
        { id: 'task_6', label: `LeetCode ${fmt(problems[0])}`, url: problems[0].url, category: 'dsarev', time: '2:45 – 3:30 PM' },
      );
    }
    return base;
  }

  const base = [
    // Morning — Study (5:30 – 7:00 AM)
    { id: 'task_0', label: 'Read Java basics — OOP / Collections / Streams / Spring Boot', category: 'morning',    time: '5:30 – 5:48 AM'  },
    { id: 'task_1', label: 'Read React basics — Hooks / State / Lifecycle / Context',       category: 'morning',    time: '5:48 – 6:06 AM'  },
    { id: 'task_2', label: 'Read SQL basics — Joins / Subqueries / Query Optimization',     category: 'morning',    time: '6:06 – 6:24 AM'  },
    { id: 'task_3', label: 'Study 1 Behavioural Question (STAR method)',                    category: 'morning',    time: '6:24 – 6:42 AM'  },
    { id: 'task_4', label: 'Review and rehearse 1 project explanation',                     category: 'morning',    time: '6:42 – 7:00 AM'  },
    // Morning Job Search (7:00 – 11:30 AM)
    { id: 'task_5', label: 'LinkedIn — Apply to Full Stack / Software Engineer roles',      category: 'jobsearch',  time: '7:00 – 9:00 AM'  },
    { id: 'task_6', label: 'Dice — Apply to C2C positions',                                 category: 'jobsearch',  time: '9:00 – 10:15 AM' },
    { id: 'task_7', label: 'Dice — Apply to W2 positions',                                  category: 'jobsearch',  time: '10:15 – 11:30 AM'},
    // Afternoon — Full-Time Applications
    { id: 'task_8', label: '1hr focused Full-Time job applications (LinkedIn / Indeed / Glassdoor)', category: 'afternoon', time: '1:00 – 2:00 PM' },
    // Afternoon Job Search Round 2 (2:00 – 4:30 PM)
    { id: 'task_9',  label: 'LinkedIn — 2nd round, apply to more roles',  category: 'jobsearch2', time: '2:00 – 3:00 PM' },
    { id: 'task_10', label: 'Dice — 2nd round C2C positions',             category: 'jobsearch2', time: '3:00 – 3:45 PM' },
    { id: 'task_11', label: 'Dice — 2nd round W2 positions',              category: 'jobsearch2', time: '3:45 – 4:30 PM' },
    // Evening
    { id: 'task_12', label: 'Log all positive responses received today',           category: 'evening', time: '6:00 – 6:30 PM' },
    { id: 'task_13', label: 'Plan follow-ups for tomorrow (vendors / recruiters)', category: 'evening', time: '6:30 – 7:00 PM' },
  ];

  if (learnDay) {
    base.push(
      { id: 'task_14', label: `DSA — Learn: ${topic}`,                          category: 'dsa',    time: '8:00 – 9:00 PM'  },
      { id: 'task_15', label: `LeetCode ${fmt(problems[0])}`, url: problems[0].url, category: 'dsa',    time: '9:00 – 9:45 PM'  },
      { id: 'task_16', label: `LeetCode ${fmt(problems[1])}`, url: problems[1].url, category: 'dsa',    time: '9:45 – 10:30 PM' },
    );
  } else {
    base.push(
      { id: 'task_14', label: `DSA — Revise: ${topic}`,                          category: 'dsarev', time: '8:00 – 8:45 PM' },
      { id: 'task_15', label: `LeetCode ${fmt(problems[0])}`, url: problems[0].url, category: 'dsarev', time: '8:45 – 9:30 PM' },
    );
  }

  return base;
};

const categoryColors = {
  morning:    '#3b82f6',
  jobsearch:  '#8b5cf6',
  afternoon:  '#f59e0b',
  jobsearch2: '#d946ef',
  evening:    '#10b981',
  project:    '#f43f5e',
  revision:   '#0ea5e9',
  dsa:        '#a855f7',
  dsarev:     '#7c3aed',
};

const categoryLabels = {
  morning:    'Morning — Study Basics (5:30 – 7:00 AM)',
  jobsearch:  'Morning Job Search — LinkedIn & Dice (7:00 – 11:30 AM)',
  afternoon:  'Afternoon — Full-Time Applications (1:00 – 2:00 PM)',
  jobsearch2: 'Afternoon Job Search — LinkedIn & Dice Round 2 (2:00 – 4:30 PM)',
  evening:    'Evening — Track Responses & Plan Follow-Ups',
  project:    'Saturday — Build Projects',
  revision:   'Sunday — Revision',
  dsa:        'DSA — Learn New Concept + LeetCode (2 Problems)',
  dsarev:     'DSA — Revise Yesterday\'s Concept + LeetCode (2 Problems)',
};

export default function DayModal({ date, dateStr, onClose }) {
  const tasks = getTasksForDate(date);

  const loadDay = () => storage.getDay(dateStr);

  const [completedMap, setCompletedMap] = useState(() => loadDay().tasks || {});
  const [notes, setNotes]               = useState(() => loadDay().notes || '');
  const [followUps, setFollowUps]       = useState(() => loadDay().followUps || []);
  const [newFollowUp, setNewFollowUp]   = useState('');
  const [saving, setSaving]             = useState(false);
  const [notesSaved, setNotesSaved]     = useState(false);

  const refreshFollowUps = () => setFollowUps(storage.getDay(dateStr).followUps || []);

  // Close on Escape
  useEffect(() => {
    const handler = (e) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [onClose]);

  const toggleTask = (taskId) => {
    const newVal = !completedMap[taskId];
    setCompletedMap(prev => ({ ...prev, [taskId]: newVal }));
    storage.setTask(dateStr, taskId, newVal);
  };

  const saveNotes = () => {
    setSaving(true);
    storage.setNotes(dateStr, notes);
    setSaving(false);
    setNotesSaved(true);
    setTimeout(() => setNotesSaved(false), 2000);
  };

  const addFollowUp = () => {
    if (!newFollowUp.trim()) return;
    storage.addFollowUp(dateStr, newFollowUp);
    setNewFollowUp('');
    refreshFollowUps();
  };

  const toggleFollowUp = (id) => {
    storage.toggleFollowUp(dateStr, id);
    refreshFollowUps();
  };

  const deleteFollowUp = (id) => {
    storage.deleteFollowUp(dateStr, id);
    refreshFollowUps();
  };

  // Group tasks by category
  const grouped = tasks.reduce((acc, t) => {
    if (!acc[t.category]) acc[t.category] = [];
    acc[t.category].push(t);
    return acc;
  }, {});

  const totalTasks = tasks.length;
  const doneTasks = tasks.filter(t => completedMap[t.id]).length;
  const percent = Math.round((doneTasks / totalTasks) * 100);

  const dayLabel = date.toLocaleDateString('en-US', {
    weekday: 'long', month: 'long', day: 'numeric', year: 'numeric'
  });

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal" onClick={e => e.stopPropagation()}>
        <div className="modal-header">
          <div className="modal-header-info">
            <h2>{dayLabel}</h2>
            <div className="modal-progress">
              <div className="modal-progress-bar">
                <div className="modal-progress-fill" style={{ width: `${percent}%` }} />
              </div>
              <span className="progress-label">{doneTasks}/{totalTasks} tasks — {percent}%</span>
              {percent === 100 && <span className="all-done-badge">All Done!</span>}
            </div>
          </div>
          <button className="close-btn" onClick={onClose} title="Close (Esc)">✕</button>
        </div>

        <div className="modal-body">
          {Object.entries(grouped).map(([cat, catTasks]) => (
            <div key={cat} className="task-group">
              <h3 className="category-heading" style={{ color: categoryColors[cat] }}>
                {categoryLabels[cat]}
              </h3>
              {catTasks.map(task => (
                <TaskItem
                  key={task.id}
                  task={task}
                  completed={!!completedMap[task.id]}
                  onToggle={() => toggleTask(task.id)}
                  color={categoryColors[cat]}
                />
              ))}
            </div>
          ))}

          {/* Follow-up Tracker */}
          <div className="task-group">
            <h3 className="category-heading" style={{ color: '#f97316' }}>
              Follow-Up Tracker — Vendors & Recruiters
            </h3>
            <div className="followup-input">
              <input
                type="text"
                placeholder="e.g. Follow up with John @ TechCorp on Monday"
                value={newFollowUp}
                onChange={e => setNewFollowUp(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && addFollowUp()}
              />
              <button onClick={addFollowUp}>+ Add</button>
            </div>
            {followUps.length === 0 && (
              <p className="empty-hint">No follow-ups added yet. Add one above.</p>
            )}
            {followUps.map(fu => (
              <div key={fu.id} className={`followup-item ${fu.done ? 'done' : ''}`}>
                <div className="followup-main" onClick={() => toggleFollowUp(fu.id)}>
                  <span className="followup-check">{fu.done ? '✅' : '⬜'}</span>
                  <span className="followup-text">{fu.text}</span>
                </div>
                <button
                  className="followup-delete"
                  onClick={() => deleteFollowUp(fu.id)}
                  title="Remove"
                >✕</button>
              </div>
            ))}
          </div>

          {/* Notes */}
          <NoteSection
            notes={notes}
            onChange={setNotes}
            onSave={saveNotes}
            saving={saving}
            saved={notesSaved}
          />
        </div>
      </div>
    </div>
  );
}
