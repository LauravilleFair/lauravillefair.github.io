// ===== Settings: edit these =====

// The day applications open, e.g. '2027-04-15'. Before this date every
// application area shows the "notify me" form; from this date on it shows
// the real application. Leave as null to keep showing "notify me".
const APPLICATIONS_OPEN = null;

// Google Form links. Use each form's normal share link (ends in /viewform).
const FORMS = {
  artisan: '',
  budding: 'https://square.link/u/dtzwu9ip',
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

// Square payment links for the hidden "Pay your booth fee" page (pay-booth-fee.html).
// Paste each Square payment link between the quotes.
const PAYMENT_LINKS = {
  artisan: 'https://square.link/u/KQYYYqcs',
  budding: 'https://square.link/u/dtzwu9ip',
  food: '',
  orgs: '',
  sponsorship: '',   // one link; sponsors pick their tier at checkout
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

// ===== Payment buttons =====
document.querySelectorAll('[data-pay]').forEach(btn => {
  const url = PAYMENT_LINKS[btn.dataset.pay];
  if (url) {
    btn.href = url;
  } else {
    btn.removeAttribute('href');
    btn.classList.add('btn--disabled');
    btn.textContent = 'Payment link coming soon';
  }
});

// ===== Gallery lightbox =====
const lightbox = document.querySelector('.lightbox');
if (lightbox) {
  const items = [...document.querySelectorAll('[data-lightbox]')];
  const img = lightbox.querySelector('img');
  const caption = lightbox.querySelector('.lightbox__caption');
  let current = 0;
  const show = i => {
    current = (i + items.length) % items.length;
    const thumb = items[current].querySelector('img');
    img.src = items[current].href;
    img.alt = thumb.alt;
    caption.textContent = thumb.alt;
  };
  items.forEach((a, i) => a.addEventListener('click', e => {
    e.preventDefault();
    show(i);
    lightbox.showModal();
  }));
  lightbox.querySelector('.lightbox__close').addEventListener('click', () => lightbox.close());
  lightbox.querySelector('.lightbox__prev').addEventListener('click', () => show(current - 1));
  lightbox.querySelector('.lightbox__next').addEventListener('click', () => show(current + 1));
  lightbox.addEventListener('click', e => { if (e.target === lightbox) lightbox.close(); });
  lightbox.addEventListener('keydown', e => {
    if (e.key === 'ArrowLeft') show(current - 1);
    if (e.key === 'ArrowRight') show(current + 1);
  });
}

// ===== Home page photo slideshow =====
// Swaps one tile at a time with a fade, cycling through every gallery photo.
// Pauses on hover/focus, with the pause button, or when the tab is hidden.
// Doesn't move at all for visitors who ask their device to reduce motion.
const rotator = document.querySelector('.rotator');
if (rotator) {
  const photos = JSON.parse(rotator.dataset.photos);
  const tiles = [...rotator.querySelectorAll('.gallery__item')];
  const pauseBtn = document.querySelector('.rotator__pause');
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const queue = photos.slice(tiles.length);            // photos not currently showing
  const showing = photos.slice(0, tiles.length);
  let nextTile = 0, userPaused = false, hovered = false;

  const swap = () => {
    if (userPaused || hovered || document.hidden || !queue.length) return;
    const i = nextTile;
    nextTile = (nextTile + 1) % tiles.length;
    const incoming = queue.shift();
    queue.push(showing[i]);
    showing[i] = incoming;
    const tile = tiles[i];
    const oldImg = tile.querySelector('img');
    const img = new Image();
    img.alt = incoming.alt;
    img.width = 640; img.height = 480;
    img.className = 'rotator__incoming';
    img.onload = () => {
      tile.appendChild(img);
      requestAnimationFrame(() => img.classList.add('is-in'));
      setTimeout(() => { oldImg.remove(); img.classList.remove('rotator__incoming', 'is-in'); }, 900);
    };
    img.src = incoming.src;
  };

  if (reduceMotion || photos.length <= tiles.length) {
    if (pauseBtn) pauseBtn.parentElement.hidden = true;
  } else {
    setInterval(swap, 3000);
    rotator.addEventListener('mouseenter', () => { hovered = true; });
    rotator.addEventListener('mouseleave', () => { hovered = false; });
    rotator.addEventListener('focusin', () => { hovered = true; });
    rotator.addEventListener('focusout', () => { hovered = false; });
    pauseBtn.addEventListener('click', () => {
      userPaused = !userPaused;
      pauseBtn.setAttribute('aria-pressed', userPaused);
      pauseBtn.textContent = userPaused ? 'Play slideshow' : 'Pause slideshow';
    });
  }
}
