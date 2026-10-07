// ===== Settings: edit these =====

// The day applications open, e.g. '2027-04-15'. Before this date every
// application area shows the "notify me" form; from this date on it shows
// the real application. Leave as null to keep showing "notify me".
const APPLICATIONS_OPEN = null;

// Google Form links. Use each form's normal share link (ends in /viewform).
const FORMS = {
  notify: '',         // "Notify me when applications open"
  artisan: '',
  budding: '',
  food: '',
  orgs: '',
  entertainment: '',
  sponsor: '',
  volunteer: 'https://docs.google.com/forms/d/e/1FAIpQLSeDDVWm9sAnAsSfnVpJs2xV83ABrG366GGnju-wbQtdi0TFZA/viewform',
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
