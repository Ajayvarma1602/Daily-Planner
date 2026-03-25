import React, { useState } from 'react';
import * as storage from '../storage';

const STAGES = [
  { id: 'applied',      label: 'Applied',       color: '#3b82f6' },
  { id: 'phone_screen', label: 'Phone Screen',   color: '#8b5cf6' },
  { id: 'technical',    label: 'Technical',      color: '#f59e0b' },
  { id: 'onsite',       label: 'Onsite',         color: '#06b6d4' },
  { id: 'offer',        label: 'Offer 🎉',       color: '#22c55e' },
  { id: 'rejected',     label: 'Rejected',       color: '#ef4444' },
];

const TYPE_COLORS = { 'C2C': '#f97316', 'W2': '#8b5cf6', 'Full-Time': '#10b981' };

const BLANK = { company: '', role: '', type: 'Full-Time', appliedDate: '', stage: 'applied', notes: '' };

export default function InterviewTracker() {
  const [interviews, setInterviews] = useState(() => storage.getInterviews());
  const [showForm, setShowForm]     = useState(false);
  const [editingId, setEditingId]   = useState(null);
  const [form, setForm]             = useState(BLANK);

  const refresh = () => setInterviews(storage.getInterviews());

  const openAdd = () => {
    setForm({ ...BLANK, appliedDate: new Date().toISOString().slice(0, 10) });
    setEditingId(null);
    setShowForm(true);
  };

  const openEdit = (item) => {
    setForm({ company: item.company, role: item.role, type: item.type, appliedDate: item.appliedDate, stage: item.stage, notes: item.notes });
    setEditingId(item.id);
    setShowForm(true);
  };

  const handleSubmit = () => {
    if (!form.company.trim() || !form.role.trim()) return;
    if (editingId) storage.updateInterview(editingId, form);
    else storage.addInterview(form);
    setShowForm(false);
    refresh();
  };

  const handleDelete = (id) => {
    if (window.confirm('Remove this entry?')) { storage.deleteInterview(id); refresh(); }
  };

  const moveStage = (id, stageId) => { storage.updateInterview(id, { stage: stageId }); refresh(); };

  const byStage = STAGES.reduce((acc, s) => {
    acc[s.id] = interviews.filter(i => i.stage === s.id);
    return acc;
  }, {});

  return (
    <div className="tracker-page">
      <div className="tracker-header">
        <div>
          <h2 className="tracker-title">Interview Pipeline</h2>
          <p className="tracker-subtitle">{interviews.length} application{interviews.length !== 1 ? 's' : ''} tracked</p>
        </div>
        <button className="add-btn" onClick={openAdd}>+ Add Interview</button>
      </div>

      <div className="pipeline">
        {STAGES.map(stage => (
          <div key={stage.id} className="pipeline-col">
            <div className="pipeline-col-header" style={{ borderColor: stage.color }}>
              <span className="pipeline-col-label" style={{ color: stage.color }}>{stage.label}</span>
              <span className="pipeline-col-count" style={{ background: stage.color + '33', color: stage.color }}>
                {byStage[stage.id].length}
              </span>
            </div>
            <div className="pipeline-cards">
              {byStage[stage.id].length === 0 && <div className="pipeline-empty">—</div>}
              {byStage[stage.id].map(item => (
                <div key={item.id} className="pipeline-card">
                  <div className="pipeline-card-top">
                    <div className="pipeline-card-info">
                      <div className="pipeline-company">{item.company}</div>
                      <div className="pipeline-role">{item.role}</div>
                    </div>
                    <span
                      className="type-badge"
                      style={{ color: TYPE_COLORS[item.type], borderColor: TYPE_COLORS[item.type] + '66' }}
                    >
                      {item.type}
                    </span>
                  </div>
                  {item.appliedDate && <div className="pipeline-date">Applied: {item.appliedDate}</div>}
                  {item.notes && <div className="pipeline-notes">{item.notes}</div>}
                  <div className="pipeline-card-actions">
                    <select
                      className="stage-select"
                      value={item.stage}
                      onChange={e => moveStage(item.id, e.target.value)}
                    >
                      {STAGES.map(s => <option key={s.id} value={s.id}>{s.label}</option>)}
                    </select>
                    <button className="edit-btn-sm" onClick={() => openEdit(item)}>Edit</button>
                    <button className="del-btn-sm" onClick={() => handleDelete(item.id)}>✕</button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {showForm && (
        <div className="modal-overlay" onClick={() => setShowForm(false)}>
          <div className="modal form-modal" onClick={e => e.stopPropagation()}>
            <div className="modal-header">
              <div className="modal-header-info">
                <h2>{editingId ? 'Edit Interview' : 'Add Interview'}</h2>
              </div>
              <button className="close-btn" onClick={() => setShowForm(false)}>✕</button>
            </div>
            <div className="modal-body form-body">
              <div className="form-grid">
                <label className="form-label">
                  Company *
                  <input className="form-input" value={form.company}
                    onChange={e => setForm(f => ({ ...f, company: e.target.value }))}
                    placeholder="e.g. Google" />
                </label>
                <label className="form-label">
                  Role *
                  <input className="form-input" value={form.role}
                    onChange={e => setForm(f => ({ ...f, role: e.target.value }))}
                    placeholder="e.g. Full Stack Engineer" />
                </label>
                <label className="form-label">
                  Type
                  <select className="form-input" value={form.type}
                    onChange={e => setForm(f => ({ ...f, type: e.target.value }))}>
                    <option>Full-Time</option>
                    <option>C2C</option>
                    <option>W2</option>
                  </select>
                </label>
                <label className="form-label">
                  Applied Date
                  <input className="form-input" type="date" value={form.appliedDate}
                    onChange={e => setForm(f => ({ ...f, appliedDate: e.target.value }))} />
                </label>
                <label className="form-label">
                  Current Stage
                  <select className="form-input" value={form.stage}
                    onChange={e => setForm(f => ({ ...f, stage: e.target.value }))}>
                    {STAGES.map(s => <option key={s.id} value={s.id}>{s.label}</option>)}
                  </select>
                </label>
              </div>
              <label className="form-label" style={{ marginTop: 8 }}>
                Notes
                <textarea className="form-input form-textarea" value={form.notes}
                  onChange={e => setForm(f => ({ ...f, notes: e.target.value }))}
                  placeholder="Contact name, recruiter details, next steps..." rows={3} />
              </label>
              <div className="form-actions">
                <button className="cancel-btn" onClick={() => setShowForm(false)}>Cancel</button>
                <button className="save-btn" onClick={handleSubmit}>
                  {editingId ? 'Save Changes' : 'Add Interview'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
