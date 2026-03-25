import React from 'react';

export default function TaskItem({ task, completed, onToggle, color }) {
  return (
    <div
      className={`task-item ${completed ? 'completed' : ''}`}
      onClick={onToggle}
      role="checkbox"
      aria-checked={completed}
      tabIndex={0}
      onKeyDown={e => (e.key === 'Enter' || e.key === ' ') && onToggle()}
    >
      <div
        className="task-checkbox"
        style={{
          borderColor: color,
          background: completed ? color : 'transparent',
        }}
      >
        {completed && <span className="checkmark">✓</span>}
      </div>
      <div className="task-content">
        <div className="task-label-row">
          <span className="task-label">{task.label}</span>
          {task.url && (
            <a
              href={task.url}
              target="_blank"
              rel="noopener noreferrer"
              className="lc-link"
              style={{ color }}
              onClick={e => e.stopPropagation()}
            >
              Open ↗
            </a>
          )}
        </div>
        {task.time && (
          <span className="task-time" style={{ color }}>
            {task.time}
          </span>
        )}
      </div>
    </div>
  );
}
