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

// ── MNC Practice Programs (March 31 – April 30) ───────────────────────────────
// Common programs asked in TCS, Infosys, Wipro, Cognizant, Accenture, Capgemini
const GFG = (label, slug) => ({ label, url: `https://www.geeksforgeeks.org/${slug}/` });

const MNC_DATA = [
  {
    topic: 'Palindrome & Reverse',
    learn:  [GFG('Write: Reverse a string without using built-in reverse',              'reverse-a-string-in-java'),
             GFG('Write: Check if a number is a palindrome (e.g. 121, 1331)',           'check-if-a-number-is-palindrome')],
    revise: [GFG('Write: Check if a string is a palindrome (ignore spaces & case)',     'c-program-check-given-string-palindrome')],
  },
  {
    topic: 'Fibonacci & Factorial',
    learn:  [GFG('Write: Print Fibonacci series up to N (iterative)',                   'program-for-nth-fibonacci-number'),
             GFG('Write: Factorial — iterative and recursive approaches',               'program-for-factorial-of-a-number')],
    revise: [GFG('Write: Nth Fibonacci using recursion + memoization',                  'program-for-nth-fibonacci-number')],
  },
  {
    topic: 'Prime Numbers',
    learn:  [GFG('Write: Check if a number is prime (loop only till √N)',               'java-program-to-check-whether-a-number-is-prime-or-not'),
             GFG('Write: Print all prime numbers up to N',                              'print-all-prime-numbers-less-than-or-equal-to-n')],
    revise: [GFG('Write: Sieve of Eratosthenes — all primes up to N efficiently',       'sieve-of-eratosthenes')],
  },
  {
    topic: 'Pattern Programs',
    learn:  [GFG('Write: Right-angle star triangle (5 rows)',                            'programs-printing-pyramid-patterns-java'),
             GFG('Write: Inverted triangle + number pyramid pattern',                   'number-pattern-programs-java')],
    revise: [GFG('Write: Diamond star pattern + Pascal\'s triangle pattern',            'java-program-to-print-diamond-shape')],
  },
  {
    topic: 'Armstrong & Number Properties',
    learn:  [GFG('Write: Armstrong number check (153 = 1³+5³+3³)',                      'program-for-armstrong-numbers'),
             GFG('Write: Perfect number check (6 = 1+2+3) and sum of digits',          'perfect-number')],
    revise: [GFG('Write: Find all Armstrong numbers between 1 and 1000',                'program-for-armstrong-numbers')],
  },
  {
    topic: 'GCD, LCM & Math Programs',
    learn:  [GFG('Write: GCD of two numbers (Euclidean algorithm)',                      'euclidean-algorithms-basic-and-extended'),
             GFG('Write: LCM of two numbers using GCD formula',                         'java-program-to-find-the-lcm-of-two-numbers')],
    revise: [GFG('Write: Swap two numbers without a temp variable (3 methods)',          'swap-two-numbers-without-using-temporary-variable')],
  },
  {
    topic: 'String Basics',
    learn:  [GFG('Write: Count vowels and consonants in a string',                       'program-count-vowels-string-iterative-recursive'),
             GFG('Write: Find first non-repeating character in a string',               'given-a-string-find-its-first-non-repeating-character')],
    revise: [GFG('Write: Check if two strings are anagrams of each other',              'check-whether-two-strings-are-anagram-of-each-other')],
  },
  {
    topic: 'String Manipulation',
    learn:  [GFG('Write: Reverse words in a sentence ("Hello World" → "World Hello")',  'reverse-words-in-a-given-string'),
             GFG('Write: Remove duplicate characters from a string',                    'remove-duplicates-from-a-given-string')],
    revise: [GFG('Write: Count frequency of each character using HashMap',              'print-all-the-duplicates-in-the-input-string')],
  },
  {
    topic: 'Array Basics',
    learn:  [GFG('Write: Find max, min, and second largest in an array',                'second-largest-in-array'),
             GFG('Write: Find the missing number in an array of 1 to N',               'find-the-missing-number')],
    revise: [GFG('Write: Find all duplicate elements in an array',                      'find-duplicates-in-on-time-and-constant-extra-space')],
  },
  {
    topic: 'Array Operations',
    learn:  [GFG('Write: Reverse an array in-place',                                    'write-a-program-to-reverse-an-array-or-string'),
             GFG('Write: Rotate array by K positions (left and right)',                 'array-rotation')],
    revise: [GFG('Write: Move all zeros to the end of an array (maintain order)',       'move-zeroes-to-end-of-array-set-1')],
  },
  {
    topic: 'Sorting Algorithms',
    learn:  [GFG('Write: Bubble sort — implement from scratch, trace through example',  'bubble-sort'),
             GFG('Write: Selection sort — implement and compare with bubble sort',      'selection-sort')],
    revise: [GFG('Write: Insertion sort — implement and explain time complexity',       'insertion-sort')],
  },
  {
    topic: 'Searching Algorithms',
    learn:  [GFG('Write: Linear search — find element in unsorted array',              'linear-search'),
             GFG('Write: Binary search — iterative implementation',                    'binary-search')],
    revise: [GFG('Write: Binary search — recursive implementation + edge cases',       'binary-search')],
  },
  {
    topic: 'Matrix Programs',
    learn:  [GFG('Write: Transpose a matrix (swap rows and columns)',                   'program-to-find-transpose-of-a-matrix'),
             GFG('Write: Print diagonal elements of a matrix',                         'efficiently-print-diagonals-of-a-matrix')],
    revise: [GFG('Write: Rotate a matrix 90 degrees clockwise',                        'rotate-a-matrix-by-90-degree-in-clockwise-direction-without-using-any-extra-space')],
  },
  {
    topic: 'Recursion Programs',
    learn:  [GFG('Write: Power of a number using recursion (x^n)',                      'write-a-c-program-to-calculate-powxn'),
             GFG('Write: Sum of all elements in an array using recursion',             'sum-of-array-elements-using-recursion')],
    revise: [GFG('Write: Tower of Hanoi — solve for 3 disks, explain recursion',       'java-program-for-tower-of-hanoi')],
  },
  {
    topic: 'Stack & Queue (Manual)',
    learn:  [GFG('Write: Implement a Stack using an array (push, pop, peek, isEmpty)', 'stack-data-structure-introduction-program'),
             GFG('Write: Implement a Queue using an array (enqueue, dequeue, front)',  'queue-data-structure')],
    revise: [GFG('Write: Implement a Queue using two Stacks',                          'queue-using-stacks')],
  },
  {
    topic: 'Classic MNC Problems',
    learn:  [GFG('Write: FizzBuzz — Fizz(3), Buzz(5), FizzBuzz(both) for 1–100',      'fizz-buzz-implementation'),
             GFG('Write: Convert integer to Roman numeral (1–3999)',                   'converting-decimal-number-lying-between-1-to-3999-to-roman-numerals')],
    revise: [GFG('Write: Check balanced parentheses using a stack — (){}[]',           'check-for-balanced-parentheses-in-an-expression')],
  },
];

const MNC_PHASE_END = new Date('2026-05-01'); // LeetCode starts May 1

const isMNCPhase = (date) => date < MNC_PHASE_END;

const getMNCData = (date) => {
  const start = new Date('2026-03-31');
  const dayIndex = Math.floor((date - start) / (1000 * 60 * 60 * 24));
  const topicIndex = Math.floor(Math.max(0, dayIndex) / 2);
  return MNC_DATA[topicIndex % MNC_DATA.length];
};

// Even date = Learn, Odd date = Revise
const isLearnDay = (date) => date.getDate() % 2 === 0;

const getDSAData = (date) => {
  const startOf2026 = new Date('2026-01-01');
  const dayIndex = Math.floor((date - startOf2026) / (1000 * 60 * 60 * 24));
  const topicIndex = Math.floor((isLearnDay(date) ? dayIndex : dayIndex - 1) / 2);
  return DSA_DATA[topicIndex % DSA_DATA.length];
};

// Returns the right data & labels based on phase
const getPracticeData = (date) => {
  if (isMNCPhase(date)) {
    const d = getMNCData(date);
    const learn = isLearnDay(date);
    return { topic: d.topic, problems: learn ? d.learn : d.revise, isLC: false };
  }
  const d = getDSAData(date);
  const learn = isLearnDay(date);
  return { topic: d.topic, problems: learn ? d.learn : d.revise, isLC: true };
};

// ── High-Impact AI Projects — Built with YOUR Stack (Spring Boot · React · SQL) ─
const DOC = (label, url) => ({ label, url });

const AI_PROJECTS = [
  {
    name: 'AI Interview Coach',
    impact: '🔥 Very High',
    stack: 'Spring Boot · React · PostgreSQL · Claude API',
    desc: 'Ask it behavioral/technical questions, record your answer, get AI scoring + STAR feedback + model answer. Use it to prep for your own interviews.',
    docs: [
      DOC('Spring AI — Getting Started',              'https://docs.spring.io/spring-ai/reference/getting-started.html'),
      DOC('Claude API — Messages (Java HTTP)',        'https://docs.anthropic.com/en/api/messages'),
      DOC('How to build: Spring Boot REST + React',  'https://spring.io/guides/gs/rest-service/'),
    ],
  },
  {
    name: 'AI Resume Analyzer & JD Matcher',
    impact: '🔥 Very High',
    stack: 'Spring Boot · React · PostgreSQL · OpenAI API · pgvector',
    desc: 'Paste your resume + a JD, AI scores the match, highlights missing keywords, rewrites your bullet points. Directly useful for your job hunt.',
    docs: [
      DOC('Spring AI — OpenAI Chat Client',           'https://docs.spring.io/spring-ai/reference/api/chatclient.html'),
      DOC('pgvector — Vector search in PostgreSQL',  'https://github.com/pgvector/pgvector'),
      DOC('Spring AI — Vector Store (pgvector)',      'https://docs.spring.io/spring-ai/reference/api/vectordbs/pgvector.html'),
    ],
  },
  {
    name: 'Full Stack AI Chatbot with Memory',
    impact: '🔥 Very High',
    stack: 'Spring Boot WebFlux · React · PostgreSQL · OpenAI Streaming',
    desc: 'Real-time streaming chat with conversation history saved in PostgreSQL. Shows token-by-token output in the React UI — portfolio gold.',
    docs: [
      DOC('Spring AI — Streaming Chat',               'https://docs.spring.io/spring-ai/reference/api/chatclient.html#_streaming_responses'),
      DOC('Spring WebFlux — Reactive REST',           'https://docs.spring.io/spring-framework/reference/web/webflux.html'),
      DOC('React — useEffect + fetch streaming',      'https://react.dev/reference/react/useEffect'),
    ],
  },
  {
    name: 'Natural Language to SQL (NL2SQL)',
    impact: '🔥 Very High',
    stack: 'Spring Boot · React · PostgreSQL · Spring AI · OpenAI',
    desc: 'Type a question in plain English, AI generates the SQL, executes it against your DB, returns results in a table. Non-technical teams love this.',
    docs: [
      DOC('Spring AI — Structured Output',            'https://docs.spring.io/spring-ai/reference/api/structured-output-converter.html'),
      DOC('Spring Data JPA — Native Queries',         'https://docs.spring.io/spring-data/jpa/reference/jpa/query-methods.html'),
      DOC('OpenAI — Function Calling',               'https://platform.openai.com/docs/guides/function-calling'),
    ],
  },
  {
    name: 'AI Job Description Analyzer',
    impact: '🔥 Very High',
    stack: 'Spring Boot · React · PostgreSQL · Claude API',
    desc: 'Paste any JD — AI extracts required skills, years of experience, salary range, red flags, and rates how well your profile fits. Saves hours of reading.',
    docs: [
      DOC('Claude API — Tool Use / JSON output',      'https://docs.anthropic.com/en/docs/build-with-claude/tool-use'),
      DOC('Spring AI — Prompt Templates',             'https://docs.spring.io/spring-ai/reference/api/prompt.html'),
      DOC('React — Form + Textarea component',        'https://react.dev/reference/react-dom/components/textarea'),
    ],
  },
  {
    name: 'AI-Powered Smart Task Manager',
    impact: '⚡ High',
    stack: 'Spring Boot · React · PostgreSQL · Claude API',
    desc: 'Add tasks with deadlines — AI auto-prioritizes your list, detects scheduling conflicts, and suggests daily plans. Great CRUD + AI combo for portfolios.',
    docs: [
      DOC('Spring Boot + JPA — Full CRUD Guide',      'https://spring.io/guides/gs/accessing-data-jpa/'),
      DOC('Spring AI — Chat Memory',                  'https://docs.spring.io/spring-ai/reference/api/chatclient.html#_chat_memory'),
      DOC('React — State management with hooks',      'https://react.dev/learn/managing-state'),
    ],
  },
  {
    name: 'AI Code Reviewer',
    impact: '⚡ High',
    stack: 'Spring Boot · React · PostgreSQL · Claude API',
    desc: 'Paste any Java/React code snippet, AI reviews it for bugs, performance issues, security vulnerabilities, and suggests refactors with explanations.',
    docs: [
      DOC('Claude API — Long context & code review',  'https://docs.anthropic.com/en/docs/build-with-claude/best-practices-for-prompting'),
      DOC('Spring Boot REST — File/text upload',      'https://spring.io/guides/gs/uploading-files/'),
      DOC('React — Code highlighting (react-syntax)', 'https://github.com/react-syntax-highlighter/react-syntax-highlighter'),
    ],
  },
  {
    name: 'RAG Knowledge Base (Spring AI + pgvector)',
    impact: '🔥 Very High',
    stack: 'Spring Boot · React · PostgreSQL + pgvector · Spring AI · OpenAI',
    desc: 'Upload company docs/PDFs, store as vector embeddings in PostgreSQL, ask questions — AI answers from YOUR data only. Enterprise favourite.',
    docs: [
      DOC('Spring AI — RAG (Retrieval Augmented Generation)', 'https://docs.spring.io/spring-ai/reference/concepts.html#concept-rag'),
      DOC('Spring AI — PDF Document Reader',          'https://docs.spring.io/spring-ai/reference/api/etl-pipeline.html'),
      DOC('pgvector Install + Spring AI config',      'https://docs.spring.io/spring-ai/reference/api/vectordbs/pgvector.html'),
    ],
  },
  {
    name: 'AI Expense Tracker with Insights',
    impact: '⚡ High',
    stack: 'Spring Boot · React · PostgreSQL · OpenAI API',
    desc: 'Log expenses by natural language ("spent $12 on lunch"), AI categorizes them, generates weekly/monthly spending summaries and savings tips.',
    docs: [
      DOC('Spring AI — Chat Client basics',           'https://docs.spring.io/spring-ai/reference/api/chatclient.html'),
      DOC('Spring Boot — REST + JPA CRUD',            'https://spring.io/guides/tutorials/rest/'),
      DOC('React — Chart.js integration',             'https://www.chartjs.org/docs/latest/getting-started/integration.html'),
    ],
  },
  {
    name: 'AI-Powered Blog Platform with SEO',
    impact: '⚡ High',
    stack: 'Spring Boot · React · PostgreSQL · OpenAI API',
    desc: 'Write a topic title — AI drafts the full blog post, suggests SEO keywords, generates meta description. Full CRUD blog with AI writing assistant.',
    docs: [
      DOC('Spring Boot — Full REST API tutorial',     'https://spring.io/guides/tutorials/rest/'),
      DOC('OpenAI — Text generation best practices',  'https://platform.openai.com/docs/guides/text-generation/best-practices'),
      DOC('React — Rich text editor (React Quill)',   'https://github.com/zenoamaro/react-quill'),
    ],
  },
  {
    name: 'Real-Time AI Collaboration Notes',
    impact: '⚡ High',
    stack: 'Spring Boot WebSocket · React · PostgreSQL · OpenAI API',
    desc: 'Shared notes app — multiple users edit in real-time (WebSocket), AI suggests completions and summarizes long notes on demand.',
    docs: [
      DOC('Spring Boot — WebSocket + STOMP guide',    'https://spring.io/guides/gs/messaging-stomp-websocket/'),
      DOC('React — WebSocket with useEffect hook',    'https://developer.mozilla.org/en-US/docs/Web/API/WebSocket'),
      DOC('Spring AI — Chat completion integration',  'https://docs.spring.io/spring-ai/reference/api/chatclient.html'),
    ],
  },
  {
    name: 'AI Customer Support Bot (RAG + Spring Boot)',
    impact: '🔥 Very High',
    stack: 'Spring Boot · React · PostgreSQL + pgvector · Spring AI · OpenAI',
    desc: 'Upload your product FAQ/docs as embeddings. Users chat with a bot that answers only from your data, escalates to human if unsure. Production-ready pattern.',
    docs: [
      DOC('Spring AI — RAG complete tutorial',        'https://docs.spring.io/spring-ai/reference/concepts.html#concept-rag'),
      DOC('Spring AI — Vector Store + similarity',    'https://docs.spring.io/spring-ai/reference/api/vectordbs.html'),
      DOC('Spring Boot WebSocket chat tutorial',      'https://spring.io/guides/gs/messaging-stomp-websocket/'),
    ],
  },
];

// Rotate AI project by week number (0-based from March 31 2026)
const getAIProject = (date) => {
  const start = new Date('2026-03-31');
  const weekIndex = Math.floor((date - start) / (7 * 24 * 60 * 60 * 1000));
  return AI_PROJECTS[Math.abs(weekIndex) % AI_PROJECTS.length];
};

// Morning study blocks keyed by weekday (1=Mon … 5=Fri)
const MORNING_BLOCKS = {
  1: [ // Monday — Backend (Java / Spring Boot)
    { id: 'task_0', label: 'Java Core — OOP, Interfaces, Generics, Streams',            category: 'backend', time: '5:30 – 5:52 AM' },
    { id: 'task_1', label: 'Spring Boot — REST Controllers, @Service, Dependency Injection', category: 'backend', time: '5:52 – 6:14 AM' },
    { id: 'task_2', label: 'JPA / Hibernate — Entities, Repositories, Relationships',    category: 'backend', time: '6:14 – 6:36 AM' },
    { id: 'task_3', label: 'API Design — HTTP methods, status codes, request/response',  category: 'backend', time: '6:36 – 7:00 AM' },
  ],
  2: [ // Tuesday — Frontend (React / JavaScript)
    { id: 'task_0', label: 'React Hooks — useState, useEffect, useRef, useMemo',         category: 'frontend', time: '5:30 – 5:52 AM' },
    { id: 'task_1', label: 'React Patterns — Context, Custom Hooks, Component Design',   category: 'frontend', time: '5:52 – 6:14 AM' },
    { id: 'task_2', label: 'JavaScript/TypeScript — ES6+, Promises, async/await, types', category: 'frontend', time: '6:14 – 6:36 AM' },
    { id: 'task_3', label: 'Frontend Best Practices — performance, accessibility, routing', category: 'frontend', time: '6:36 – 7:00 AM' },
  ],
  3: [ // Wednesday — Database (SQL / NoSQL)
    { id: 'task_0', label: 'SQL — Joins (INNER/LEFT/RIGHT), GROUP BY, HAVING',           category: 'database', time: '5:30 – 5:48 AM' },
    { id: 'task_1', label: 'SQL — Subqueries, CTEs, Window Functions',                   category: 'database', time: '5:48 – 6:06 AM' },
    { id: 'task_2', label: 'Indexing — B-tree, composite, query optimization, EXPLAIN',  category: 'database', time: '6:06 – 6:24 AM' },
    { id: 'task_3', label: 'NoSQL — MongoDB basics, document model vs relational',       category: 'database', time: '6:24 – 6:42 AM' },
    { id: 'task_4', label: 'DB Transactions — ACID, isolation levels, deadlocks',        category: 'database', time: '6:42 – 7:00 AM' },
  ],
  4: [ // Thursday — System Design & Architecture
    { id: 'task_0', label: 'System Design — scalability, load balancing, caching',       category: 'systemdesign', time: '5:30 – 5:52 AM' },
    { id: 'task_1', label: 'Microservices — service separation, API Gateway, messaging', category: 'systemdesign', time: '5:52 – 6:14 AM' },
    { id: 'task_2', label: 'REST vs GraphQL — trade-offs, versioning, pagination',       category: 'systemdesign', time: '6:14 – 6:36 AM' },
    { id: 'task_3', label: 'Draw 1 system design diagram (e.g. URL shortener, chat)',    category: 'systemdesign', time: '6:36 – 7:00 AM' },
  ],
  5: [ // Friday — DevOps + Behavioral
    { id: 'task_0', label: 'Docker — images, containers, Dockerfile, docker-compose',    category: 'devops', time: '5:30 – 5:48 AM' },
    { id: 'task_1', label: 'AWS Basics — EC2, S3, RDS, Lambda, IAM overview',            category: 'devops', time: '5:48 – 6:06 AM' },
    { id: 'task_2', label: 'CI/CD — GitHub Actions, pipelines, deployment strategies',   category: 'devops', time: '6:06 – 6:24 AM' },
    { id: 'task_3', label: 'Behavioral — STAR for 2 questions (leadership, problem-solving)', category: 'devops', time: '6:24 – 6:42 AM' },
    { id: 'task_4', label: 'Rehearse 1 full-stack project explanation (end-to-end)',     category: 'devops', time: '6:42 – 7:00 AM' },
  ],
};

export const getTasksForDate = (date) => {
  const day = date.getDay();

  const learnDay  = isLearnDay(date);
  const practice  = getPracticeData(date);
  const { topic, problems, isLC } = practice;

  // Format task label — LeetCode gets the # prefix, MNC is plain label
  const taskLabel = (p, idx) =>
    isLC ? `LeetCode #${p.num} ${p.name} [${p.diff}]` : p.label;
  const taskUrl = (p) => p.url || undefined;

  const phaseLabel = isLC ? 'LeetCode' : 'Practice';

  // ── Saturday — AI Project Build Day (PRIMARY) ────────────────────────────────
  if (day === 6) {
    const proj = getAIProject(date);
    const base = [
      { id: 'task_0', label: `★ AI Project: "${proj.name}"  ${proj.impact}`,                                           category: 'aiproject', time: '8:00 – 8:30 AM'    },
      { id: 'task_1', label: `Stack: ${proj.stack}`,                                                                    category: 'aiproject', time: '8:00 – 8:30 AM'    },
      { id: 'task_2', label: `Read Docs: ${proj.docs[0].label}`,                    url: proj.docs[0].url,              category: 'aiproject', time: '8:30 – 9:30 AM'    },
      { id: 'task_3', label: `Read Docs: ${proj.docs[1]?.label ?? 'Review architecture'}`, url: proj.docs[1]?.url,     category: 'aiproject', time: '9:30 – 10:00 AM'   },
      { id: 'task_4', label: 'Set up — create GitHub repo, install deps, configure API keys in .env',                  category: 'aiproject', time: '10:00 – 10:30 AM'  },
      { id: 'task_5', label: 'Build core AI feature — LLM chain / agent / RAG pipeline',                               category: 'aiproject', time: '10:30 AM – 1:00 PM' },
      { id: 'task_6', label: 'Add full stack wrapper — React UI + FastAPI/Spring Boot endpoint',                        category: 'aiproject', time: '1:00 – 2:30 PM'    },
      { id: 'task_7', label: 'Test AI responses — refine prompts, handle edge cases, fix bugs',                         category: 'aiproject', time: '2:30 – 3:30 PM'    },
      { id: 'task_8', label: 'Push to GitHub — write README (setup guide + demo screenshots), update LinkedIn',         category: 'aiproject', time: '3:30 – 4:00 PM'    },
      { id: 'task_9', label: 'Secondary: Polish full stack integration (backend/API/UI improvements)',                  category: 'project',   time: '4:30 – 5:30 PM'   },
    ];
    if (learnDay) {
      base.push(
        { id: 'task_10', label: `${phaseLabel} — Learn: ${topic}`,               category: 'dsa',    time: '6:00 – 7:00 PM' },
        { id: 'task_11', label: taskLabel(problems[0]), url: taskUrl(problems[0]), category: 'dsa',    time: '7:00 – 7:45 PM' },
        { id: 'task_12', label: taskLabel(problems[1]), url: taskUrl(problems[1]), category: 'dsa',    time: '7:45 – 8:30 PM' },
      );
    } else {
      base.push(
        { id: 'task_10', label: `${phaseLabel} — Revise: ${topic}`,              category: 'dsarev', time: '6:00 – 6:45 PM' },
        { id: 'task_11', label: taskLabel(problems[0]), url: taskUrl(problems[0]), category: 'dsarev', time: '6:45 – 7:30 PM' },
      );
    }
    return base;
  }

  // ── Sunday — AI Study + Light Revision (PRIMARY: AI) ─────────────────────────
  if (day === 0) {
    const proj = getAIProject(date);
    const base = [
      { id: 'task_0', label: 'AI Concepts — Study LangChain / LangGraph / RAG / Prompt Engineering (1 deep topic)',    category: 'aistudy', time: '9:00 – 10:00 AM'   },
      { id: 'task_1', label: 'AI News — HuggingFace blog, Anthropic/OpenAI updates, Arxiv papers',                     category: 'aistudy', time: '10:00 – 10:30 AM'  },
      { id: 'task_2', label: `Continue / improve AI project: "${proj.name}"`,                                          category: 'aistudy', time: '10:30 AM – 12:00 PM'},
      { id: 'task_3', label: `Reference: ${proj.docs[2]?.label ?? proj.docs[0].label}`, url: proj.docs[2]?.url ?? proj.docs[0].url, category: 'aistudy', time: '10:30 AM – 12:00 PM'},
      { id: 'task_4', label: 'Deploy AI project (HuggingFace Spaces / Railway / Vercel) + share on LinkedIn',          category: 'aistudy', time: '12:00 – 12:30 PM'  },
      { id: 'task_5', label: 'Secondary: Backend + Frontend revision (Java/Spring Boot + React hooks, 20 min each)',   category: 'revision', time: '12:30 – 1:30 PM'  },
      { id: 'task_6', label: 'Secondary: DB + System Design (SQL joins + one architecture diagram)',                    category: 'revision', time: '1:30 – 2:00 PM'   },
      { id: 'task_7', label: 'Secondary: Behavioral — STAR practice for 2 questions out loud',                         category: 'revision', time: '2:00 – 2:30 PM'   },
    ];
    if (learnDay) {
      base.push(
        { id: 'task_8',  label: `${phaseLabel} — Learn: ${topic}`,               category: 'dsa',    time: '3:00 – 4:00 PM' },
        { id: 'task_9',  label: taskLabel(problems[0]), url: taskUrl(problems[0]), category: 'dsa',    time: '4:00 – 4:45 PM' },
        { id: 'task_10', label: taskLabel(problems[1]), url: taskUrl(problems[1]), category: 'dsa',    time: '4:45 – 5:30 PM' },
      );
    } else {
      base.push(
        { id: 'task_8', label: `${phaseLabel} — Revise: ${topic}`,               category: 'dsarev', time: '3:00 – 3:45 PM' },
        { id: 'task_9', label: taskLabel(problems[0]), url: taskUrl(problems[0]), category: 'dsarev', time: '3:45 – 4:30 PM' },
      );
    }
    return base;
  }

  // ── Monday–Friday ─────────────────────────────────────────────────────────────
  const morningStudy = MORNING_BLOCKS[day] || MORNING_BLOCKS[1];

  const base = [
    ...morningStudy,
    { id: 'task_10', label: 'LinkedIn — Apply to Full Stack / Software Engineer roles',              category: 'jobsearch',  time: '7:00 – 9:00 AM'   },
    { id: 'task_11', label: 'Dice — Apply to C2C Full Stack positions',                              category: 'jobsearch',  time: '9:00 – 10:15 AM'  },
    { id: 'task_12', label: 'Dice — Apply to W2 Full Stack positions',                               category: 'jobsearch',  time: '10:15 – 11:30 AM' },
    { id: 'task_13', label: 'Full-Time applications — LinkedIn / Indeed / Glassdoor (Full Stack)',   category: 'afternoon',  time: '1:00 – 2:00 PM'  },
    { id: 'task_14', label: 'LinkedIn — 2nd round, new Full Stack postings',                         category: 'jobsearch2', time: '2:00 – 3:00 PM'  },
    { id: 'task_15', label: 'Dice — 2nd round C2C positions',                                        category: 'jobsearch2', time: '3:00 – 3:45 PM'  },
    { id: 'task_16', label: 'Dice — 2nd round W2 positions',                                         category: 'jobsearch2', time: '3:45 – 4:30 PM'  },
    { id: 'task_17', label: 'Log all positive responses & update Interview Tracker',                  category: 'evening',    time: '6:00 – 6:30 PM'  },
    { id: 'task_18', label: 'Plan follow-ups for tomorrow (vendors / recruiters)',                    category: 'evening',    time: '6:30 – 7:00 PM'  },
  ];

  if (learnDay) {
    base.push(
      { id: 'task_19', label: `${phaseLabel} — Learn: ${topic}`,                 category: 'dsa',    time: '8:00 – 9:00 PM'  },
      { id: 'task_20', label: taskLabel(problems[0]), url: taskUrl(problems[0]), category: 'dsa',    time: '9:00 – 9:45 PM'  },
      { id: 'task_21', label: taskLabel(problems[1]), url: taskUrl(problems[1]), category: 'dsa',    time: '9:45 – 10:30 PM' },
    );
  } else {
    base.push(
      { id: 'task_19', label: `${phaseLabel} — Revise: ${topic}`,                category: 'dsarev', time: '8:00 – 8:45 PM' },
      { id: 'task_20', label: taskLabel(problems[0]), url: taskUrl(problems[0]), category: 'dsarev', time: '8:45 – 9:30 PM' },
    );
  }

  return base;
};

const categoryColors = {
  backend:      '#3b82f6',   // blue
  frontend:     '#10b981',   // emerald
  database:     '#f59e0b',   // amber
  systemdesign: '#0ea5e9',   // sky
  devops:       '#f97316',   // orange
  jobsearch:    '#8b5cf6',   // purple
  afternoon:    '#ec4899',   // pink
  jobsearch2:   '#d946ef',   // magenta
  evening:      '#14b8a6',   // teal
  aiproject:    '#f59e0b',   // amber — AI primary build
  aistudy:      '#06b6d4',   // cyan  — AI study/polish
  project:      '#475569',   // slate — secondary full stack
  revision:     '#6366f1',   // indigo
  dsa:          '#a855f7',   // violet
  dsarev:       '#7c3aed',   // dark violet
};

const categoryLabels = {
  backend:      'Backend Study — Java / Spring Boot / REST API (5:30 – 7:00 AM)',
  frontend:     'Frontend Study — React / JavaScript / TypeScript (5:30 – 7:00 AM)',
  database:     'Database Study — SQL / NoSQL / Indexing (5:30 – 7:00 AM)',
  systemdesign: 'System Design — Architecture / Microservices / API Design (5:30 – 7:00 AM)',
  devops:       'DevOps + Behavioral — Docker / AWS / CI-CD / STAR (5:30 – 7:00 AM)',
  jobsearch:    'Morning Job Search — LinkedIn & Dice (7:00 – 11:30 AM)',
  afternoon:    'Afternoon — Full-Time Applications (1:00 – 2:00 PM)',
  jobsearch2:   'Afternoon Job Search — LinkedIn & Dice Round 2 (2:00 – 4:30 PM)',
  evening:      'Evening — Track Responses & Plan Follow-Ups (6:00 – 7:00 PM)',
  aiproject:    '★ PRIMARY — AI Project Build Day (Saturday)',
  aistudy:      '★ PRIMARY — AI Study & Project Polish (Sunday)',
  project:      '◆ Secondary — Full Stack Integration Polish',
  revision:     '◆ Secondary — Full Stack Revision',
  dsa:          'Practice — Learn New Topic (8:00 – 10:30 PM)  [Apr: MNC Programs → May+: LeetCode]',
  dsarev:       "Practice — Revise Yesterday's Topic (8:00 – 9:30 PM)  [Apr: MNC Programs → May+: LeetCode]",
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
