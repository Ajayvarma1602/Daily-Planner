import React, { useState, useMemo } from 'react';
import * as storage from '../storage';

const STAGES = [
  { id: 'applied',      label: 'Applied',      color: '#3b82f6' },
  { id: 'phone_screen', label: 'Phone Screen',  color: '#8b5cf6' },
  { id: 'technical',    label: 'Technical',     color: '#f59e0b' },
  { id: 'onsite',       label: 'Onsite',        color: '#06b6d4' },
  { id: 'offer',        label: 'Offer 🎉',      color: '#22c55e' },
  { id: 'rejected',     label: 'Rejected',      color: '#ef4444' },
];

const SOURCES = ['LinkedIn', 'Dice C2C', 'Dice W2', 'Indeed', 'Glassdoor', 'Referral', 'Other'];

const TYPE_COLORS  = { 'C2C': '#f97316', 'W2': '#8b5cf6', 'Full-Time': '#10b981' };
const SOURCE_COLORS = {
  'LinkedIn':  '#0a66c2',
  'Dice C2C':  '#e84117',
  'Dice W2':   '#e84117',
  'Indeed':    '#003a9b',
  'Glassdoor': '#0caa41',
  'Referral':  '#a855f7',
  'Other':     '#64748b',
};

const stageColor = (id) => STAGES.find(s => s.id === id)?.color ?? '#64748b';
const stageLabel = (id) => STAGES.find(s => s.id === id)?.label ?? id;

const todayStr = () => new Date().toISOString().slice(0, 10);
const fmtDate  = (d) => {
  const today = todayStr();
  const yesterday = new Date(); yesterday.setDate(yesterday.getDate() - 1);
  const yStr = yesterday.toISOString().slice(0, 10);
  if (d === today) return 'Today';
  if (d === yStr)  return 'Yesterday';
  return new Date(d + 'T00:00:00').toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' });
};

const BLANK = { company: '', role: '', type: 'Full-Time', source: 'LinkedIn', appliedDate: '', stage: 'applied', notes: '' };

export default function InterviewTracker() {
  const [interviews, setInterviews] = useState(() => storage.getInterviews());
  const [showForm, setShowForm]     = useState(false);
  const [editingId, setEditingId]   = useState(null);
  const [form, setForm]             = useState(BLANK);
  const [view, setView]             = useState('daily');   // 'daily' | 'pipeline'
  const [search, setSearch]         = useState('');
  const [filterDate, setFilterDate] = useState('');

  const refresh = () => setInterviews(storage.getInterviews());

  const openAdd = () => {
    setForm({ ...BLANK, appliedDate: todayStr() });
    setEditingId(null);
    setShowForm(true);
  };

  const openEdit = (item) => {
    setForm({ company: item.company, role: item.role, type: item.type,
              source: item.source || 'LinkedIn', appliedDate: item.appliedDate,
              stage: item.stage, notes: item.notes });
    setEditingId(item.id);
    setShowForm(true);
  };

  const handleSubmit = () => {
    if (!form.company.trim() || !form.role.trim()) return;
    if (editingId) storage.updateInterview(editingId, form);
    else           storage.addInterview(form);
    setShowForm(false);
    refresh();
  };

  const handleDelete = (id) => {
    if (window.confirm('Remove this entry?')) { storage.deleteInterview(id); refresh(); }
  };

  const moveStage = (id, stageId) => { storage.updateInterview(id, { stage: stageId }); refresh(); };

  // ── Filtered list ─────────────────────────────────────────────────────────────
  const filtered = useMemo(() => {
    let list = [...interviews];
    if (search.trim()) {
      const q = search.toLowerCase();
      list = list.filter(i =>
        i.company.toLowerCase().includes(q) ||
        i.role.toLowerCase().includes(q) ||
        (i.source || '').toLowerCase().includes(q)
      );
    }
    if (filterDate) list = list.filter(i => i.appliedDate === filterDate);
    return list;
  }, [interviews, search, filterDate]);

  // ── Stats ─────────────────────────────────────────────────────────────────────
  const todayCount = interviews.filter(i => i.appliedDate === todayStr()).length;
  const weekCount  = (() => {
    const d = new Date(); d.setDate(d.getDate() - 6); const cutoff = d.toISOString().slice(0, 10);
    return interviews.filter(i => i.appliedDate >= cutoff).length;
  })();

  // ── Daily log: group by date desc ─────────────────────────────────────────────
  const byDate = useMemo(() => {
    const map = {};
    filtered.forEach(i => {
      const k = i.appliedDate || 'unknown';
      if (!map[k]) map[k] = [];
      map[k].push(i);
    });
    return Object.entries(map).sort((a, b) => b[0].localeCompare(a[0]));
  }, [filtered]);

  // ── Pipeline: group by stage ──────────────────────────────────────────────────
  const byStage = useMemo(() => STAGES.reduce((acc, s) => {
    acc[s.id] = filtered.filter(i => i.stage === s.id);
    return acc;
  }, {}), [filtered]);

  return (
    <div className="tracker-page">
      {/* ── Header ── */}
      <div className="tracker-header">
        <div>
          <h2 className="tracker-title">Interview Tracker</h2>
          <div className="tracker-stats">
            <span className="stat-chip today-chip">Today: {todayCount} applied</span>
            <span className="stat-chip week-chip">This week: {weekCount}</span>
            <span className="stat-chip total-chip">Total: {interviews.length}</span>
          </div>
        </div>
        <button className="add-btn" onClick={openAdd}>+ Add Application</button>
      </div>

      {/* ── Toolbar ── */}
      <div className="tracker-toolbar">
        <div className="view-toggle">
          <button className={`view-btn ${view === 'daily' ? 'active' : ''}`}    onClick={() => setView('daily')}>    Daily Log</button>
          <button className={`view-btn ${view === 'pipeline' ? 'active' : ''}`} onClick={() => setView('pipeline')}> Pipeline</button>
        </div>
        <div className="toolbar-filters">
          <input
            className="search-input"
            placeholder="Search company, role, source…"
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
          <input
            className="form-input date-filter"
            type="date"
            value={filterDate}
            onChange={e => setFilterDate(e.target.value)}
            title="Filter by applied date"
          />
          {(search || filterDate) && (
            <button className="clear-filter-btn" onClick={() => { setSearch(''); setFilterDate(''); }}>✕ Clear</button>
          )}
        </div>
      </div>

      {/* ── Daily Log View ── */}
      {view === 'daily' && (
        <div className="daily-log">
          {byDate.length === 0 && (
            <div className="empty-state">No applications yet. Hit "+ Add Application" to log your first one.</div>
          )}
          {byDate.map(([date, items]) => (
            <div key={date} className="daily-log-group">
              <div className="daily-log-header">
                <span className="daily-log-date">{fmtDate(date)}</span>
                <span className="daily-log-count">{items.length} application{items.length !== 1 ? 's' : ''}</span>
                <span className="daily-log-raw">{date !== 'unknown' ? date : ''}</span>
              </div>
              <div className="daily-log-cards">
                {items.map(item => (
                  <div key={item.id} className="log-card">
                    <div className="log-card-main">
                      <div className="log-card-info">
                        <span className="log-company">{item.company}</span>
                        <span className="log-role">{item.role}</span>
                      </div>
                      <div className="log-card-badges">
                        {item.source && (
                          <span className="source-badge" style={{ background: SOURCE_COLORS[item.source] + '22', color: SOURCE_COLORS[item.source], borderColor: SOURCE_COLORS[item.source] + '55' }}>
                            {item.source}
                          </span>
                        )}
                        <span className="type-badge" style={{ color: TYPE_COLORS[item.type], borderColor: TYPE_COLORS[item.type] + '66' }}>
                          {item.type}
                        </span>
                        <span className="stage-badge" style={{ background: stageColor(item.stage) + '22', color: stageColor(item.stage), borderColor: stageColor(item.stage) + '55' }}>
                          {stageLabel(item.stage)}
                        </span>
                      </div>
                    </div>
                    {item.notes && <div className="log-notes">{item.notes}</div>}
                    <div className="log-card-actions">
                      <select
                        className="stage-select"
                        value={item.stage}
                        onChange={e => moveStage(item.id, e.target.value)}
                      >
                        {STAGES.map(s => <option key={s.id} value={s.id}>{s.label}</option>)}
                      </select>
                      <button className="edit-btn-sm"  onClick={() => openEdit(item)}>Edit</button>
                      <button className="del-btn-sm"   onClick={() => handleDelete(item.id)}>✕</button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* ── Pipeline View ── */}
      {view === 'pipeline' && (
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
                      <span className="type-badge" style={{ color: TYPE_COLORS[item.type], borderColor: TYPE_COLORS[item.type] + '66' }}>
                        {item.type}
                      </span>
                    </div>
                    {item.source && (
                      <span className="source-badge sm" style={{ background: SOURCE_COLORS[item.source] + '22', color: SOURCE_COLORS[item.source], borderColor: SOURCE_COLORS[item.source] + '55' }}>
                        {item.source}
                      </span>
                    )}
                    {item.appliedDate && <div className="pipeline-date">Applied: {item.appliedDate}</div>}
                    {item.notes && <div className="pipeline-notes">{item.notes}</div>}
                    <div className="pipeline-card-actions">
                      <select className="stage-select" value={item.stage} onChange={e => moveStage(item.id, e.target.value)}>
                        {STAGES.map(s => <option key={s.id} value={s.id}>{s.label}</option>)}
                      </select>
                      <button className="edit-btn-sm" onClick={() => openEdit(item)}>Edit</button>
                      <button className="del-btn-sm"  onClick={() => handleDelete(item.id)}>✕</button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* ── Add / Edit Form ── */}
      {showForm && (
        <div className="modal-overlay" onClick={() => setShowForm(false)}>
          <div className="modal form-modal" onClick={e => e.stopPropagation()}>
            <div className="modal-header">
              <div className="modal-header-info">
                <h2>{editingId ? 'Edit Application' : 'Log Application'}</h2>
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
                  Source
                  <select className="form-input" value={form.source}
                    onChange={e => setForm(f => ({ ...f, source: e.target.value }))}>
                    {SOURCES.map(s => <option key={s}>{s}</option>)}
                  </select>
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
                  placeholder="Recruiter name, JD link, next steps, pay rate…" rows={3} />
              </label>
              <div className="form-actions">
                <button className="cancel-btn" onClick={() => setShowForm(false)}>Cancel</button>
                <button className="save-btn" onClick={handleSubmit}>
                  {editingId ? 'Save Changes' : 'Log Application'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
