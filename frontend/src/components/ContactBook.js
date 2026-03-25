import React, { useState } from 'react';
import * as storage from '../storage';

const PLATFORMS = ['LinkedIn', 'Dice', 'Indeed', 'Glassdoor', 'Email', 'Phone', 'Other'];
const TYPES     = ['C2C', 'W2', 'Full-Time'];

const TYPE_COLORS = { 'C2C': '#f97316', 'W2': '#8b5cf6', 'Full-Time': '#10b981' };
const PLATFORM_COLORS = {
  'LinkedIn': '#0a66c2', 'Dice': '#e84117', 'Indeed': '#003a9b',
  'Glassdoor': '#0caa41', 'Email': '#6366f1', 'Phone': '#14b8a6', 'Other': '#64748b',
};

const BLANK = { name: '', company: '', email: '', phone: '', platform: 'LinkedIn', type: 'C2C', notes: '', lastContacted: '' };

export default function ContactBook() {
  const [contacts, setContacts] = useState(() => storage.getContacts());
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [form, setForm]         = useState(BLANK);
  const [search, setSearch]     = useState('');

  const refresh = () => setContacts(storage.getContacts());

  const openAdd = () => { setForm(BLANK); setEditingId(null); setShowForm(true); };

  const openEdit = (c) => {
    setForm({ name: c.name, company: c.company, email: c.email, phone: c.phone,
              platform: c.platform, type: c.type, notes: c.notes, lastContacted: c.lastContacted });
    setEditingId(c.id);
    setShowForm(true);
  };

  const handleSubmit = () => {
    if (!form.name.trim()) return;
    if (editingId) storage.updateContact(editingId, form);
    else storage.addContact(form);
    setShowForm(false);
    refresh();
  };

  const handleDelete = (id) => {
    if (window.confirm('Remove this contact?')) { storage.deleteContact(id); refresh(); }
  };

  const markContacted = (id) => {
    storage.updateContact(id, { lastContacted: new Date().toISOString().slice(0, 10) });
    refresh();
  };

  const filtered = contacts.filter(c =>
    c.name.toLowerCase().includes(search.toLowerCase()) ||
    c.company.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="tracker-page">
      <div className="tracker-header">
        <div>
          <h2 className="tracker-title">Recruiter & Vendor Contacts</h2>
          <p className="tracker-subtitle">{contacts.length} contact{contacts.length !== 1 ? 's' : ''} saved</p>
        </div>
        <button className="add-btn" onClick={openAdd}>+ Add Contact</button>
      </div>

      <input
        className="search-input"
        placeholder="Search by name or company..."
        value={search}
        onChange={e => setSearch(e.target.value)}
      />

      {filtered.length === 0 && (
        <p className="empty-page-hint">
          {contacts.length === 0
            ? 'No contacts yet. Add your first recruiter or vendor.'
            : 'No results for your search.'}
        </p>
      )}

      <div className="contact-grid">
        {filtered.map(c => (
          <div key={c.id} className="contact-card">
            <div className="contact-card-top">
              <div>
                <div className="contact-name">{c.name}</div>
                {c.company && <div className="contact-company">{c.company}</div>}
              </div>
              <div className="contact-badges">
                <span className="type-badge"
                  style={{ color: TYPE_COLORS[c.type], borderColor: TYPE_COLORS[c.type] + '66' }}>
                  {c.type}
                </span>
                <span className="platform-badge"
                  style={{ background: (PLATFORM_COLORS[c.platform] || '#64748b') + '22',
                           color: PLATFORM_COLORS[c.platform] || '#64748b' }}>
                  {c.platform}
                </span>
              </div>
            </div>

            {(c.email || c.phone) && (
              <div className="contact-info">
                {c.email && <span>✉ {c.email}</span>}
                {c.phone && <span>📞 {c.phone}</span>}
              </div>
            )}

            {c.notes && <div className="contact-notes">{c.notes}</div>}

            <div className="contact-footer">
              <span className="contact-last">
                {c.lastContacted ? `Last contacted: ${c.lastContacted}` : 'Not contacted yet'}
              </span>
              <div className="contact-actions">
                <button className="contact-btn" onClick={() => markContacted(c.id)}>✓ Today</button>
                <button className="edit-btn-sm" onClick={() => openEdit(c)}>Edit</button>
                <button className="del-btn-sm" onClick={() => handleDelete(c.id)}>✕</button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {showForm && (
        <div className="modal-overlay" onClick={() => setShowForm(false)}>
          <div className="modal form-modal" onClick={e => e.stopPropagation()}>
            <div className="modal-header">
              <div className="modal-header-info">
                <h2>{editingId ? 'Edit Contact' : 'Add Contact'}</h2>
              </div>
              <button className="close-btn" onClick={() => setShowForm(false)}>✕</button>
            </div>
            <div className="modal-body form-body">
              <div className="form-grid">
                <label className="form-label">
                  Name *
                  <input className="form-input" value={form.name}
                    onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
                    placeholder="e.g. John Smith" />
                </label>
                <label className="form-label">
                  Company
                  <input className="form-input" value={form.company}
                    onChange={e => setForm(f => ({ ...f, company: e.target.value }))}
                    placeholder="e.g. TechCorp Staffing" />
                </label>
                <label className="form-label">
                  Email
                  <input className="form-input" type="email" value={form.email}
                    onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
                    placeholder="john@techcorp.com" />
                </label>
                <label className="form-label">
                  Phone
                  <input className="form-input" value={form.phone}
                    onChange={e => setForm(f => ({ ...f, phone: e.target.value }))}
                    placeholder="+1 555-000-0000" />
                </label>
                <label className="form-label">
                  Platform
                  <select className="form-input" value={form.platform}
                    onChange={e => setForm(f => ({ ...f, platform: e.target.value }))}>
                    {PLATFORMS.map(p => <option key={p}>{p}</option>)}
                  </select>
                </label>
                <label className="form-label">
                  Type
                  <select className="form-input" value={form.type}
                    onChange={e => setForm(f => ({ ...f, type: e.target.value }))}>
                    {TYPES.map(t => <option key={t}>{t}</option>)}
                  </select>
                </label>
              </div>
              <label className="form-label" style={{ marginTop: 8 }}>
                Notes
                <textarea className="form-input form-textarea" value={form.notes}
                  onChange={e => setForm(f => ({ ...f, notes: e.target.value }))}
                  placeholder="Any notes about this contact..." rows={3} />
              </label>
              <div className="form-actions">
                <button className="cancel-btn" onClick={() => setShowForm(false)}>Cancel</button>
                <button className="save-btn" onClick={handleSubmit}>
                  {editingId ? 'Save Changes' : 'Add Contact'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
