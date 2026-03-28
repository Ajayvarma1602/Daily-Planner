import React from 'react';
import { formatDate } from '../App';

const MONTH_NAMES = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December'
];

// Task counts per day type (must match DayModal getTasksForDate)
const getTaskCount = (date) => {
  const day   = date.getDay();
  const learn = date.getDate() % 2 === 0;
  const dsa   = learn ? 3 : 2;
  if (day === 6) return 5 + dsa;   // 5 project tasks
  if (day === 0) return 6 + dsa;   // 6 revision tasks
  // Mon: 4, Tue: 4, Wed: 5, Thu: 4, Fri: 5 morning tasks + 9 job/evening tasks
  const morningCount = [4, 4, 5, 4, 5][day - 1] || 4;
  return morningCount + 9 + dsa;
};

const getCompletionPercent = (dateStr, total, allData) => {
  const dayData = allData.days?.[dateStr];
  if (!dayData || !dayData.tasks) return 0;
  const done = Object.values(dayData.tasks).filter(Boolean).length;
  return Math.round((done / total) * 100);
};

const getDayType = (date) => {
  const d = date.getDay();
  if (d === 6) return 'saturday';
  if (d === 0) return 'sunday';
  return 'weekday';
};

export default function MonthView({ days, allData, onDayClick, viewMonth, viewYear, onPrevMonth, onNextMonth }) {
  const weekDayLabels = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const firstDayOfWeek = days.length > 0 ? days[0].getDay() : 0;

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  // Monthly progress summary
  const totalTasks = days.reduce((sum, d) => sum + getTaskCount(d), 0);
  const doneTasks = days.reduce((sum, d) => {
    const dateStr = formatDate(d);
    const dayData = allData.days?.[dateStr];
    if (!dayData?.tasks) return sum;
    return sum + Object.values(dayData.tasks).filter(Boolean).length;
  }, 0);
  const monthPercent = totalTasks > 0 ? Math.round((doneTasks / totalTasks) * 100) : 0;

  return (
    <div className="month-view">
      <div className="month-nav">
        <button
          className="month-nav-btn"
          onClick={onPrevMonth}
          disabled={viewMonth === 0}
          title="Previous month"
        >
          ‹
        </button>
        <div className="month-title">
          {MONTH_NAMES[viewMonth]} {viewYear}
        </div>
        <button
          className="month-nav-btn"
          onClick={onNextMonth}
          disabled={viewMonth === 11}
          title="Next month"
        >
          ›
        </button>
      </div>

      <div className="month-progress-bar">
        <div className="month-progress-fill" style={{ width: `${monthPercent}%` }} />
        <span className="month-progress-label">{monthPercent}% complete this month</span>
      </div>

      <div className="weekday-headers">
        {weekDayLabels.map(d => (
          <div key={d} className="weekday-label">{d}</div>
        ))}
      </div>
      <div className="days-grid">
        {Array(firstDayOfWeek).fill(null).map((_, i) => (
          <div key={`empty-${i}`} className="day-cell empty" />
        ))}
        {days.map((date) => {
          const dateStr = formatDate(date);
          const taskCount = getTaskCount(date);
          const percent = getCompletionPercent(dateStr, taskCount, allData);
          const dayType = getDayType(date);
          const isToday = date.getTime() === today.getTime();

          return (
            <div
              key={dateStr}
              className={`day-cell ${dayType} ${isToday ? 'today' : ''} ${percent === 100 ? 'complete' : ''}`}
              onClick={() => onDayClick(date)}
              title={`Click to open ${date.toLocaleDateString('en-US', { weekday: 'long', month: 'short', day: 'numeric' })}`}
            >
              <div className="day-number">
                {date.toLocaleDateString('en-US', { day: 'numeric' })}
              </div>
              <div className="day-name">
                {date.toLocaleDateString('en-US', { weekday: 'short' })}
              </div>
              <div className="day-type-label">
                {dayType === 'saturday' ? 'Projects' : dayType === 'sunday' ? 'Revision' : 'Study+Apply'}
                {date.getDate() % 2 === 0
                  ? <span className="dsa-dot learn" title="DSA Learn Day"> ◆L</span>
                  : <span className="dsa-dot revise" title="DSA Revise Day"> ◆R</span>
                }
              </div>
              <div className="progress-bar">
                <div className="progress-fill" style={{ width: `${percent}%` }} />
              </div>
              <div className="progress-text">
                {percent === 100 ? '✅ Done!' : `${percent}%`}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
