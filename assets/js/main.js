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
  const start = new Date(fair); start.setHours(10); // TODO: confirm start time
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
