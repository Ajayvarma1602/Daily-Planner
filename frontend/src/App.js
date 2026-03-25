import React, { useState, useCallback } from 'react';
import MonthView from './components/MonthView';
import DayModal from './components/DayModal';
import InterviewTracker from './components/InterviewTracker';
import ContactBook from './components/ContactBook';
import { getAllData, getPlannerStart } from './storage';
import './App.css';

// Generate 31 days from the fixed planner start date (stored in localStorage)
const generateDays = () => {
  const start = getPlannerStart();
  const days = [];
  for (let i = 0; i < 31; i++) {
    const d = new Date(start);
    d.setDate(start.getDate() + i);
    days.push(d);
  }
  return days;
};

export const formatDate = (date) => {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, '0');
  const d = String(date.getDate()).padStart(2, '0');
  return `${y}-${m}-${d}`;
};

function App() {
  const [days] = useState(generateDays());
  const [selectedDate, setSelectedDate] = useState(null);
  const [allData, setAllData] = useState(() => getAllData());
  const [activeTab, setActiveTab] = useState('planner');

  const refreshData = useCallback(() => setAllData(getAllData()), []);

  const handleDayClick = (date) => setSelectedDate(date);
  const handleClose = () => { setSelectedDate(null); refreshData(); };

  return (
    <div className="app">
      <header className="app-header">
        <div className="header-content">
          <h1>Job Hunt Planner</h1>
          <p className="subtitle">31-Day Daily Tracker — Full Stack & Software Engineer Roles</p>
          <div className="header-meta">
            <span className="badge weekday-badge">Mon–Fri: Study + Apply</span>
            <span className="badge saturday-badge">Sat: Build Projects</span>
            <span className="badge sunday-badge">Sun: Revision</span>
            <span className="badge dsa-badge">Alt Days: DSA + LeetCode</span>
          </div>
        </div>
      </header>

      <nav className="tab-nav">
        <button
          className={`tab-btn ${activeTab === 'planner' ? 'active' : ''}`}
          onClick={() => setActiveTab('planner')}
        >
          Daily Planner
        </button>
        <button
          className={`tab-btn ${activeTab === 'interviews' ? 'active' : ''}`}
          onClick={() => setActiveTab('interviews')}
        >
          Interview Tracker
        </button>
        <button
          className={`tab-btn ${activeTab === 'contacts' ? 'active' : ''}`}
          onClick={() => setActiveTab('contacts')}
        >
          Contacts
        </button>
      </nav>

      {activeTab === 'planner' && (
        <>
          <MonthView days={days} allData={allData} onDayClick={handleDayClick} />
          {selectedDate && (
            <DayModal
              date={selectedDate}
              dateStr={formatDate(selectedDate)}
              onClose={handleClose}
            />
          )}
        </>
      )}

      {activeTab === 'interviews' && <InterviewTracker />}
      {activeTab === 'contacts' && <ContactBook />}
    </div>
  );
}

export default App;
