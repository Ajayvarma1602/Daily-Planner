import React from 'react';
import { formatDate } from '../App';

// learn day: +3 DSA tasks (concept + 2 Easy LC)
// revise day: +2 DSA tasks (concept + 1 Medium LC)
const getTaskCount = (date) => {
  const day  = date.getDay();
  const learn = date.getDate() % 2 === 0;
  const dsa  = learn ? 3 : 2;
  if (day === 6) return 4 + dsa;   // 4 project
  if (day === 0) return 5 + dsa;   // 5 revision
  return 14 + dsa;                  // 14 regular
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

export default function MonthView({ days, allData, onDayClick }) {
  const weekDayLabels = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const firstDayOfWeek = days[0].getDay();

  return (
    <div className="month-view">
      <div className="month-title">
        {days[0].toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
        {' — '}
        {days[days.length - 1].toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
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
          const today = new Date();
          today.setHours(0, 0, 0, 0);
          const isToday = date.getTime() === today.getTime();

          return (
            <div
              key={dateStr}
              className={`day-cell ${dayType} ${isToday ? 'today' : ''} ${percent === 100 ? 'complete' : ''}`}
              onClick={() => onDayClick(date)}
              title={`Click to open ${date.toLocaleDateString('en-US', { weekday: 'long', month: 'short', day: 'numeric' })}`}
            >
              <div className="day-number">
                {date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
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
