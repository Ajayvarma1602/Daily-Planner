const KEY = 'job-planner-data';

const load = () => {
  try {
    return JSON.parse(localStorage.getItem(KEY)) || { days: {} };
  } catch {
    return { days: {} };
  }
};

const save = (data) => {
  localStorage.setItem(KEY, JSON.stringify(data));
};

const ensureDay = (data, dateStr) => {
  if (!data.days[dateStr]) {
    data.days[dateStr] = { tasks: {}, notes: '', followUps: [] };
  }
};

export const getAllData = () => load();

export const getDay = (dateStr) => {
  const data = load();
  return data.days[dateStr] || { tasks: {}, notes: '', followUps: [] };
};

export const setTask = (dateStr, taskId, completed) => {
  const data = load();
  ensureDay(data, dateStr);
  data.days[dateStr].tasks[taskId] = completed;
  save(data);
};

export const setNotes = (dateStr, notes) => {
  const data = load();
  ensureDay(data, dateStr);
  data.days[dateStr].notes = notes;
  save(data);
};

export const addFollowUp = (dateStr, text) => {
  const data = load();
  ensureDay(data, dateStr);
  data.days[dateStr].followUps.push({ id: Date.now(), text, done: false });
  save(data);

  // Auto-add to Contacts if no contact with this name exists yet
  const existing = loadContacts();
  const alreadyExists = existing.some(c => c.name.toLowerCase() === text.toLowerCase());
  if (!alreadyExists) {
    existing.push({
      id: Date.now() + 1,
      name: text,
      company: '',
      email: '',
      phone: '',
      platform: 'Other',
      type: 'C2C',
      notes: `Added from Daily Planner on ${dateStr}`,
      lastContacted: '',
    });
    saveContacts(existing);
  }
};

export const toggleFollowUp = (dateStr, id) => {
  const data = load();
  const day = data.days[dateStr];
  if (day) {
    const fu = day.followUps.find(f => f.id === id);
    if (fu) fu.done = !fu.done;
    save(data);
  }
};

export const deleteFollowUp = (dateStr, id) => {
  const data = load();
  const day = data.days[dateStr];
  if (day) {
    day.followUps = day.followUps.filter(f => f.id !== id);
    save(data);
  }
};

// ─── Interviews ───────────────────────────────────────────────────────────────
const KEY_INTERVIEWS = 'job-planner-interviews';
const loadInterviews = () => {
  try { return JSON.parse(localStorage.getItem(KEY_INTERVIEWS)) || []; }
  catch { return []; }
};
const saveInterviews = (list) => localStorage.setItem(KEY_INTERVIEWS, JSON.stringify(list));

export const getInterviews = () => loadInterviews();

export const addInterview = (fields) => {
  const list = loadInterviews();
  list.push({ id: Date.now(), ...fields, stage: fields.stage || 'applied', notes: fields.notes || '' });
  saveInterviews(list);
};

export const updateInterview = (id, updates) => {
  saveInterviews(loadInterviews().map(i => i.id === id ? { ...i, ...updates } : i));
};

export const deleteInterview = (id) => {
  saveInterviews(loadInterviews().filter(i => i.id !== id));
};

// ─── Planner Start Date ───────────────────────────────────────────────────────
const KEY_START = 'job-planner-start';

export const getPlannerStart = () => {
  const stored = localStorage.getItem(KEY_START);
  if (stored) return new Date(stored);
  // First open: anchor to tomorrow
  const start = new Date();
  start.setDate(start.getDate() + 1);
  start.setHours(0, 0, 0, 0);
  localStorage.setItem(KEY_START, start.toISOString());
  return start;
};

// ─── Contacts ─────────────────────────────────────────────────────────────────
const KEY_CONTACTS = 'job-planner-contacts';
const loadContacts = () => {
  try { return JSON.parse(localStorage.getItem(KEY_CONTACTS)) || []; }
  catch { return []; }
};
const saveContacts = (list) => localStorage.setItem(KEY_CONTACTS, JSON.stringify(list));

export const getContacts = () => loadContacts();

export const addContact = (fields) => {
  const list = loadContacts();
  list.push({ id: Date.now(), email: '', phone: '', platform: 'LinkedIn', type: 'C2C', notes: '', lastContacted: '', ...fields });
  saveContacts(list);
};

export const updateContact = (id, updates) => {
  saveContacts(loadContacts().map(c => c.id === id ? { ...c, ...updates } : c));
};

export const deleteContact = (id) => {
  saveContacts(loadContacts().filter(c => c.id !== id));
};
