import React, { useState, useCallback } from 'react';
import MonthView from './components/MonthView';
import DayModal from './components/DayModal';
import InterviewTracker from './components/InterviewTracker';
import ContactBook from './components/ContactBook';
import { getAllData } from './storage';
import './App.css';

// Generate all days from a start date through end of its year
const generateDaysFrom = (startDate) => {
  const days = [];
  const end = new Date(startDate.getFullYear(), 11, 31);
  const d = new Date(startDate);
  while (d <= end) {
    days.push(new Date(d));
    d.setDate(d.getDate() + 1);
  }
  return days;
};

export const formatDate = (date) => {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, '0');
  const d = String(date.getDate()).padStart(2, '0');
  return `${y}-${m}-${d}`;
};

const PLAN_START = new Date('2026-04-02');
const PLAN_YEAR = PLAN_START.getFullYear();
const ALL_DAYS = generateDaysFrom(PLAN_START);

function App() {
  const today = new Date();
  const defaultMonth = today.getFullYear() === PLAN_YEAR && today >= PLAN_START
    ? today.getMonth()
    : PLAN_START.getMonth();

  const [viewMonth, setViewMonth] = useState(defaultMonth);
  const [selectedDate, setSelectedDate] = useState(null);
  const [allData, setAllData] = useState(() => getAllData());
  const [activeTab, setActiveTab] = useState('planner');

  const refreshData = useCallback(() => setAllData(getAllData()), []);

  const handleDayClick = (date) => setSelectedDate(date);
  const handleClose = () => { setSelectedDate(null); refreshData(); };

  const monthDays = ALL_DAYS.filter(d => d.getMonth() === viewMonth);

  const prevMonth = () => setViewMonth(m => Math.max(PLAN_START.getMonth(), m - 1));
  const nextMonth = () => setViewMonth(m => Math.min(11, m + 1));

  return (
    <div className="app">
      <header className="app-header">
        <div className="header-content">
          <h1>Job Hunt Planner</h1>
          <p className="subtitle">{PLAN_YEAR} Year-Long Tracker — Full Stack & Software Engineer Roles</p>
          <div className="header-meta">
            <span className="badge weekday-badge">Mon: Backend</span>
            <span className="badge weekday-badge" style={{background:'#10b981'}}>Tue: Frontend</span>
            <span className="badge weekday-badge" style={{background:'#f59e0b',color:'#0f172a'}}>Wed: Database</span>
            <span className="badge weekday-badge" style={{background:'#0ea5e9',color:'#0f172a'}}>Thu: System Design</span>
            <span className="badge weekday-badge" style={{background:'#f97316',color:'#0f172a'}}>Fri: DevOps</span>
            <span className="badge saturday-badge">Sat: AI Projects ★</span>
            <span className="badge sunday-badge">Sun: AI Study + Revision</span>
            <span className="badge dsa-badge">Alt Days: DSA</span>
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
          <MonthView
            days={monthDays}
            allData={allData}
            onDayClick={handleDayClick}
            viewMonth={viewMonth}
            viewYear={PLAN_YEAR}
            onPrevMonth={prevMonth}
            onNextMonth={nextMonth}
          />
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
