// ===== Settings: edit these =====

// The day applications open, e.g. '2027-04-15'. Before this date every
// application area shows the "notify me" form; from this date on it shows
// the real application. Leave as null to keep showing "notify me".
const APPLICATIONS_OPEN = null;

// Google Form links. Use each form's normal share link (ends in /viewform).
const FORMS = {
  artisan: '',
  budding: '',
  food: '',
  orgs: '',
  entertainment: '',
  sponsor: '',
  volunteer: 'https://docs.google.com/forms/d/e/1FAIpQLSeDDVWm9sAnAsSfnVpJs2xV83ABrG366GGnju-wbQtdi0TFZA/viewform',
};

// The "notify me when applications open" list. Signups are sent to this
// Google Form (two short-answer questions: Email, Category).
// formId is the long code in the form's /forms/d/e/<formId>/viewform link;
// the entry numbers come from the form's "Get pre-filled link".
const NOTIFY_FORM = {
  formId: '1FAIpQLSdGzs9WuNaIiNrlgKD10tNyBR0ije07j8IzvKlerbxi06sZCw',
  emailEntry: 'entry.1523622232',
  categoryEntry: 'entry.846423299',
};

// Fair day start time (24-hour clock), used by the countdown.
const FAIR_START_HOUR = 11;

// ===== Mobile menu =====
const toggle = document.querySelector('.nav-toggle');
const links = document.getElementById('nav-links');
if (toggle && links) {
  toggle.addEventListener('click', () => {
    const open = links.classList.toggle('open');
    toggle.setAttribute('aria-expanded', open);
    toggle.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
  });
}

// ===== Fair date: always the last Saturday in September =====
function lastSaturdayOfSeptember(year) {
  const d = new Date(year, 8, 30); // Sept 30
  d.setDate(30 - ((d.getDay() + 1) % 7)); // back up to Saturday
  return d;
}

function nextFairDate() {
  const now = new Date();
  let fair = lastSaturdayOfSeptember(now.getFullYear());
  const dayAfter = new Date(fair); dayAfter.setDate(fair.getDate() + 1);
  if (now >= dayAfter) fair = lastSaturdayOfSeptember(now.getFullYear() + 1);
  return fair;
}

const fair = nextFairDate();
document.querySelectorAll('[data-fair-date]').forEach(el => {
  el.textContent = fair.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' });
});
document.querySelectorAll('[data-fair-year]').forEach(el => { el.textContent = fair.getFullYear(); });

// ===== Countdown =====
const countdown = document.querySelector('.countdown');
if (countdown) {
  const start = new Date(fair); start.setHours(FAIR_START_HOUR);
  const tick = () => {
    const ms = Math.max(0, start - new Date());
    const parts = {
      days: Math.floor(ms / 864e5),
      hours: Math.floor(ms / 36e5) % 24,
      minutes: Math.floor(ms / 6e4) % 60,
    };
    for (const [k, v] of Object.entries(parts)) {
      const el = countdown.querySelector(`[data-${k}]`);
      if (el) el.textContent = v;
    }
  };
  tick();
  setInterval(tick, 30000);
}

// ===== Footer year =====
document.querySelectorAll('[data-year]').forEach(el => { el.textContent = new Date().getFullYear(); });

// ===== Applications: "notify me" before they open, the real form after =====
const isOpen = APPLICATIONS_OPEN && new Date() >= new Date(APPLICATIONS_OPEN + 'T00:00:00');
document.querySelectorAll('.apply[data-form]').forEach(block => {
  block.querySelector('.apply__closed').hidden = !!isOpen;
  block.querySelector('.apply__open').hidden = !isOpen;
});

document.querySelectorAll('.form-embed[data-embed]').forEach(box => {
  if (box.closest('[hidden]')) return; // don't load forms nobody can see
  const url = FORMS[box.dataset.embed];
  if (!url) return;
  const src = url.replace(/\/viewform.*$/, '/viewform') + '?embedded=true';
  box.innerHTML = '';
  const frame = document.createElement('iframe');
  frame.src = src;
  frame.loading = 'lazy';
  frame.title = 'Sign-up form';
  box.appendChild(frame);
});

// ===== "Notify me" signups =====
document.querySelectorAll('form.notify').forEach(form => {
  const block = form.parentElement;
  const done = block.querySelector('.notify__done');
  const error = block.querySelector('.notify__error');
  form.addEventListener('submit', async e => {
    e.preventDefault();
    error.hidden = true;
    if (!NOTIFY_FORM.formId) { error.hidden = false; return; }
    const button = form.querySelector('button');
    button.disabled = true;
    const data = new URLSearchParams();
    data.append(NOTIFY_FORM.emailEntry, form.email.value.trim());
    data.append(NOTIFY_FORM.categoryEntry, form.dataset.category);
    try {
      // Google Forms doesn't let other sites read its reply ("no-cors"),
      // so a completed request is treated as success.
      await fetch(`https://docs.google.com/forms/d/e/${NOTIFY_FORM.formId}/formResponse`,
        { method: 'POST', mode: 'no-cors', body: data });
      form.hidden = true;
      done.hidden = false;
    } catch {
      error.hidden = false;
      button.disabled = false;
    }
  });
});

// ===== Which year of the fair (2026 was the 40th) =====
const edition = fair.getFullYear() - 1986;
const suffix = n => (n % 100 >= 11 && n % 100 <= 13) ? 'th' : ({ 1: 'st', 2: 'nd', 3: 'rd' }[n % 10] || 'th');
document.querySelectorAll('[data-fair-edition]').forEach(el => { el.textContent = edition + suffix(edition); });
