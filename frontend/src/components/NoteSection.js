import React from 'react';

export default function NoteSection({ notes, onChange, onSave, saving, saved }) {
  return (
    <div className="task-group">
      <h3 className="category-heading" style={{ color: '#6366f1' }}>
        Daily Notes — Responses, Calls, Contacts
      </h3>
      <textarea
        className="notes-area"
        placeholder="Write today's notes here... (positive responses, interview calls, contacts made, salary discussed, etc.)"
        value={notes}
        onChange={e => onChange(e.target.value)}
        rows={6}
      />
      <div className="notes-footer">
        <button
          className={`save-btn ${saved ? 'saved' : ''}`}
          onClick={onSave}
          disabled={saving}
        >
          {saving ? 'Saving...' : saved ? 'Saved!' : 'Save Notes'}
        </button>
        {saved && <span className="saved-hint">Notes saved successfully.</span>}
      </div>
    </div>
  );
}
