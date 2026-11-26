// Pulse — renders each section from data/<id>/latest.json (or data/<id>/<date>.json).
const SECTIONS = [
  { id: 'daily',   title: 'Briefing', name: 'The Daily Briefing', topic: 'World news', cadence: 'Mon, Wed and Fri', art: 'globe',
    days: [1, 3, 5],
    c1: '#3D5AFE', c2: '#FFB938', hi: '#8FE3FF', wide: true },
  { id: 'reading', title: 'Reading',  name: 'The Monday Bookshelf', topic: 'What to read', cadence: 'Mondays', art: 'openbook',
    days: [1],
    c1: '#6D3BEB', c2: '#D4F25A', hi: '#B9A2FF' },
  { id: 'gaming',  title: 'Gaming',   name: 'The Tuesday Checkpoint', topic: 'Gaming news', cadence: 'Tuesdays', art: 'controller',
    days: [2],
    c1: '#E0242F', c2: '#4FE8DC', hi: '#FF7A80' },
  { id: 'design',  title: 'Design',   name: 'The Thursday Crit', topic: 'Design news', cadence: 'Thursdays', art: 'bezier',
    days: [4],
    c1: '#00845A', c2: '#FF7FB0', hi: '#4FE0A6' },
  { id: 'ai',      title: 'AI',       name: 'The Friday Prompt', topic: 'AI news', cadence: 'Fridays', art: 'brain',
    days: [5],
    c1: '#C2410C', c2: '#B4BEFF', hi: '#FF9A5C' }
];

const app = document.getElementById('app');
const cache = {};

// ---------- helpers ----------
const esc = (s = '') => String(s).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
// *word* in data becomes Gambetta italic emphasis
const rich = (s = '') => esc(s).replace(/\*([^*]+)\*/g, '<span class="em">$1</span>');
// summary may be one string with blank lines between paragraphs, or an array of paragraphs
const paras = v => (Array.isArray(v) ? v : String(v || '').split(/\n\s*\n/))
  .map(x => String(x).trim()).filter(Boolean).map(x => `<p>${rich(x)}</p>`).join('');
const safeUrl = u => (typeof u === 'string' && /^https:\/\//i.test(u)) ? u : null;

function parseDate(iso) {
  const [y, m, d] = String(iso).split('-').map(Number);
  return new Date(y, (m || 1) - 1, d || 1);
}
const fmt = (iso, opts) => parseDate(iso).toLocaleDateString('en-US', opts);
const longDate = iso => fmt(iso, { weekday: 'long', month: 'long', day: 'numeric' });
const shortDate = iso => fmt(iso, { weekday: 'short', month: 'short', day: 'numeric' });
const chipDate = iso => fmt(iso, { month: 'short', day: 'numeric' });

function colorway(s) {
  // text and line art are always white on the section color
  return `--c1:${s.c1};--c2:${s.c2};--ink:#FFFFFF;--line:#FFFFFF;--hi:${s.hi}`;
}

function store(key, val) {
  try {
    if (val === undefined) return JSON.parse(localStorage.getItem(key) || 'null');
    localStorage.setItem(key, JSON.stringify(val));
  } catch (e) { return null; }
}

async function getJSON(path) {
  if (cache[path]) return cache[path];
  const res = await fetch(path, { cache: 'no-cache' });
  if (!res.ok) throw new Error(res.status);
  const data = await res.json();
  cache[path] = data;
  return data;
}

const ICON_BACK = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M15 5l-7 7 7 7"/></svg>';
const ICON_DOWN = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 5v14M6 13l6 6 6-6"/></svg>';
const ICON_OUT = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M9 5h10v10M19 5L6 18"/></svg>';

function navigate(hash) {
  const go = () => { location.hash = hash; };
  if (document.startViewTransition && !matchMedia('(prefers-reduced-motion: reduce)').matches) {
    document.startViewTransition(go);
  } else go();
}

// ---------- home ----------
const DAYS = [[1, 'Mon'], [2, 'Tue'], [3, 'Wed'], [4, 'Thu'], [5, 'Fri']];

function weekStrip() {
  const today = new Date().getDay();
  const cols = DAYS.map(([n, label]) => {
    const arriving = SECTIONS.filter(s => s.days.includes(n));
    return `
      <li class="day${n === today ? ' is-today' : ''}"${n === today ? ' aria-current="date"' : ''}>
        <span class="day-name display">${label}</span>
        ${arriving.map(s => `<span class="day-item" style="${colorway(s)}">${esc(s.title)}</span>`).join('')}
      </li>`;
  }).join('');
  return `
    <section class="week" aria-labelledby="week-h">
      <div class="rule-head"><h2 id="week-h" class="display">The week</h2><p>Lands at 5 a.m.</p></div>
      <ol class="days">${cols}</ol>
    </section>`;
}

async function renderHome() {
  document.title = 'Pulse';
  const seen = store('pulse-seen') || {};
  const today = new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' });

  const latest = await Promise.all(SECTIONS.map(s =>
    getJSON(`data/${s.id}/latest.json`).catch(() => null)));
  const fresh = SECTIONS.filter((s, i) => latest[i] && seen[s.id] !== latest[i].edition).length;

  const tiles = SECTIONS.map((s, i) => {
    const d = latest[i];
    const isNew = d && seen[s.id] !== d.edition;
    const meta = d ? `Updated ${chipDate(d.edition)}` : `Arrives ${s.cadence.toLowerCase()}`;
    return `
      <a class="tile${s.wide ? ' wide' : ''}" href="#/${s.id}" style="${colorway(s)}" data-go="#/${s.id}"
         aria-label="${esc(s.title)}, ${esc(s.name)}. ${esc(meta)}${isNew ? '. New edition' : ''}">
        <div class="tile-top">
          ${isNew ? `<span class="new">${dropDot()}New</span>` : '<span></span>'}
          ${art(s.art)}
        </div>
        <div>
          <h2 class="tile-title display">${esc(s.title)}</h2>
          <p class="tile-sub">${esc(s.name)}</p>
          <p class="tile-meta">${esc(meta)}</p>
        </div>
      </a>`;
  }).join('');

  app.innerHTML = `
    <header class="home-head">
      <h1 class="wordmark display">Pulse ${beat()}</h1>
      <div class="dateline">
        <p class="today">${esc(today)}</p>
        <p class="count">${fresh ? `${fresh} new edition${fresh > 1 ? 's' : ''}` : 'All caught up'}</p>
      </div>
    </header>
    <nav class="tiles" aria-label="Sections">${tiles}</nav>
    ${weekStrip()}`;
}

// signature mark: white heartbeat line, blue dot dropping from the low peak
function beat() {
  return `<svg class="beat" viewBox="0 0 64 50" aria-hidden="true">
    <path d="M3 22h12l5-12 9 24 7-18 4 6h21"/><ellipse class="drop" cx="29" cy="44" rx="3.8" ry="4.6"/></svg>`;
}
const dropDot = () => '<svg class="drop-dot" viewBox="0 0 8 10" aria-hidden="true"><ellipse cx="4" cy="5" rx="3.3" ry="4"/></svg>';

// ---------- section ----------
const pad2 = n => String(n).padStart(2, '0');

function media(item, cls) {
  const src = safeUrl(item.image);
  if (src) {
    return `<div class="${cls}"><img src="${esc(src)}" alt="${esc(item.imageAlt || '')}" loading="lazy" decoding="async"
      referrerpolicy="no-referrer" data-art="${esc(item.art || '')}"></div>`;
  }
  return `<div class="${cls} art-panel">${art(item.art)}</div>`;
}

function openLink(item, label = 'Read the full article') {
  const url = safeUrl(item.url);
  if (!url) return '';
  return `<a class="open" href="${esc(url)}" target="_blank" rel="noopener noreferrer">${label} ${ICON_OUT}</a>`;
}

function metaLine(item) {
  const bits = [item.source, item.date ? chipDate(item.date) : null].filter(Boolean).map(esc);
  return bits.length ? `<p class="meta">${bits.join(' · ')}</p>` : '';
}

// Explainer illustrations arrive as SVG text in the data. Keep only plain shapes and geometry
// attributes, so nothing in the data can run code or load anything.
const SVG_EL = new Set(['svg', 'g', 'path', 'circle', 'ellipse', 'rect', 'line', 'polyline', 'polygon']);
const SVG_AT = new Set(['viewBox', 'd', 'cx', 'cy', 'r', 'rx', 'ry', 'x', 'y', 'width', 'height', 'x1', 'y1', 'x2', 'y2', 'points', 'transform', 'class']);
function safeSvg(src) {
  if (typeof src !== 'string' || !src.trim()) return '';
  try {
    const doc = new DOMParser().parseFromString(src, 'image/svg+xml');
    const root = doc.documentElement;
    if (root.nodeName !== 'svg' || doc.getElementsByTagName('parsererror').length) return '';
    const walk = el => {
      [...el.children].forEach(child => {
        if (!SVG_EL.has(child.nodeName)) { child.remove(); return; }
        [...child.attributes].forEach(a => {
          const ok = SVG_AT.has(a.name) && (a.name !== 'class' || /^(f|d)$/.test(a.value)) && !/[<>]|url\(|javascript:/i.test(a.value);
          if (!ok) child.removeAttribute(a.name);
        });
        walk(child);
      });
    };
    walk(root);
    const vb = /^[\d.\s-]+$/.test(root.getAttribute('viewBox') || '') ? root.getAttribute('viewBox') : '0 0 240 150';
    const body = [...root.children].map(c => new XMLSerializer().serializeToString(c).replace(/ xmlns="[^"]*"/g, '')).join('');
    return `<svg class="art illus" viewBox="${vb}" aria-hidden="true">${body}</svg>`;
  } catch (e) { return ''; }
}

// One visual per story: a photo, an explainer illustration, or the icon.
// The cover story's photo is already on the cover, so below it gets the illustration or icon instead.
function storyVisual(item) {
  // photos always run big at full width; icons always sit small on the right
  const illus = safeSvg(item.illustration);
  const photo = !item.isCover && safeUrl(item.image);
  if (photo) {
    const credit = item.credit ? `<p class="credit">${esc(item.credit)}</p>` : '';
    return { wide: media(item, 'media') + credit, thumb: '' };
  }
  if (illus) return { wide: `<div class="media illus-panel">${illus}</div>`, thumb: '' };
  return { wide: '', thumb: `<div class="thumb art-panel">${art(item.art)}</div>` };
}

function story(item, isLead) {
  const v = storyVisual(item);
  return `
    <article class="story${v.wide ? ' has-wide' : ''}" id="story-${item.n}">
      ${v.wide}
      <div class="story-head${v.thumb ? ' with-thumb' : ''}">
        <span class="num display">${pad2(item.n)}</span>
        <div>
          <h3>${rich(item.title)}</h3>
          ${metaLine(item)}
        </div>
        ${v.thumb}
      </div>
      <div class="summary">${paras(item.summary)}</div>
      ${openLink(item)}
    </article>`;
}

function group(g) {
  const items = g.items || [];
  if (!items.length) return '';
  return `
    <section class="group">
      <div class="rule-head"><h2 class="display">${esc(g.name)}</h2></div>
      ${g.intro ? `<p class="group-intro">${rich(g.intro)}</p>` : ''}
      ${items.map((it, i) => story(it, i === 0)).join('')}
    </section>`;
}

// Magazine cover: nameplate on top, then one big frame for the cover story — its photo
// (or its illustration) with the story number and headline set on it, then the button.
// Magazine cover: nameplate on top, then one big frame with the cover story's own photo,
// its number and headline set on it, then the button. The cover is always a real photo.
function cover(s, d, top) {
  const photo = top && safeUrl(top.image);
  const frame = photo ? `
      <div class="cover-story">
        <div class="cover-frame is-photo">
          <img src="${esc(photo)}" alt="${esc(top.imageAlt || '')}" decoding="async" referrerpolicy="no-referrer" data-cover>
          <div class="cover-caption">
            <span class="num display">${pad2(top.n)}</span>
            <h2 class="cover-head">${rich(top.title)}</h2>
          </div>
        </div>
        <button class="cover-link" data-scroll="story-${top.n}">Read the story ${ICON_DOWN}</button>
      </div>` : '';
  return `
    <header class="cover">
      <div class="cover-top">
        <div>
          <p class="edition-name">${esc(s.name)}</p>
          <p class="edition-date">${esc(longDate(d.edition))}</p>
        </div>
        ${art(s.art)}
      </div>
      <h1 class="cover-title display">${esc(s.title)}</h1>
      ${frame}
    </header>`;
}

function feature(f) {
  if (!f) return '';
  const steps = (f.steps || []).map(s => `<li><span>${rich(s)}</span></li>`).join('');
  return `
    <section class="feature">
      <div class="feature-top">
        <div>
          <p class="kicker">${esc(f.kicker || 'Explain it from the start')}</p>
          <h2>${rich(f.title)}</h2>
        </div>
        ${art(f.art)}
      </div>
      ${steps ? `<ol>${steps}</ol>` : ''}
      ${openLink(f, 'Read the explainer')}
    </section>`;
}

function recap(r) {
  if (!r || !r.length) return '';
  return `
    <section class="recap">
      <div class="rule-head"><h2 class="display">Quick recap</h2></div>
      <ul>${r.map(x => `<li><div class="mini">${art(x.art)}</div><p><b>${esc(x.label)}.</b> <span>${rich(x.line)}</span></p></li>`).join('')}</ul>
    </section>`;
}

async function renderSection(id, date) {
  const s = SECTIONS.find(x => x.id === id);
  if (!s) return renderHome();
  document.title = `${s.title} — Pulse`;
  app.setAttribute('style', colorway(s));

  let d = null, index = null;
  try { d = await getJSON(date ? `data/${id}/${date}.json` : `data/${id}/latest.json`); } catch (e) { d = null; }
  try { index = await getJSON(`data/${id}/index.json`); } catch (e) { index = null; }

  const bar = `<div class="bar"><a class="back" href="#/" data-go="#/">${ICON_BACK} Pulse</a></div>`;

  if (!d) {
    app.innerHTML = `${bar}${cover(s, { edition: new Date().toISOString().slice(0, 10) }, null)}
      <div class="empty"><h2 class="display">No edition yet</h2>
      <p>The first ${esc(s.name)} arrives ${esc(s.cadence.toLowerCase())} at 5 a.m.</p></div>`;
    return;
  }

  if (!date) { const seen = store('pulse-seen') || {}; seen[id] = d.edition; store('pulse-seen', seen); }

  // number every story across the edition; the cover story is the one marked "cover", else the first
  let n = 0;
  const groups = (d.groups || []).map(g => ({ ...g, items: (g.items || []).map(it => ({ ...it, n: ++n })) }));
  const all = groups.flatMap(g => g.items);
  // the cover needs the story's own photo: the marked story if it has one, else the first story with a photo
  const top = all.find(it => it.cover && safeUrl(it.image)) || all.find(it => safeUrl(it.image)) || null;
  if (top) top.isCover = true;

  const editions = (index && index.editions) || [d.edition];
  const current = date || editions[0];
  const chips = editions.slice(0, 8).map((e, i) =>
    `<button class="chip" data-go="#/${id}${i === 0 ? '' : '/' + e}" aria-current="${e === current}">${esc(chipDate(e))}</button>`).join('');

  const brief = (d.brief || []).length ? `
    <section class="brief"><div class="rule-head"><h2 class="display">In brief</h2></div>
    <ul>${d.brief.map(l => `<li>${rich(l)}</li>`).join('')}</ul></section>` : '';

  app.innerHTML = `${bar}
    ${cover(s, d, top)}
    ${d.sample ? '<p class="sample-note"><strong>Sample edition.</strong> These stories are placeholders to preview the design, not real news. Your first real edition replaces them.</p>' : ''}
    ${brief}
    ${groups.map(group).join('')}
    ${feature(d.feature)}
    ${recap(d.recap)}
    ${editions.length > 1 ? `<section class="archive"><div class="rule-head"><h2 class="display">Past editions</h2></div><div class="chips">${chips}</div></section>` : ''}`;

  // cover photo that fails to load: keep the headline on a dark frame
  // cover photo that fails to load: move the cover to the next story with a photo
  const coverImg = app.querySelector('img[data-cover]');
  if (coverImg) {
    const backups = all.filter(it => it !== top && safeUrl(it.image));
    coverImg.addEventListener('error', () => {
      const next = backups.shift();
      if (!next) { coverImg.remove(); return; }
      const frame = coverImg.closest('.cover-story');
      frame.querySelector('.cover-caption .num').textContent = pad2(next.n);
      frame.querySelector('.cover-head').innerHTML = rich(next.title);
      frame.querySelector('.cover-link').dataset.scroll = `story-${next.n}`;
      coverImg.src = safeUrl(next.image);
    });
  }

  // broken story photo -> swap in the illustration
  app.querySelectorAll('img[data-art]').forEach(img => {
    img.addEventListener('error', () => {
      const box = img.parentElement;
      box.classList.add('art-panel');
      box.innerHTML = art(img.dataset.art);
      const credit = box.nextElementSibling;
      if (credit && credit.classList.contains('credit')) credit.remove();
    }, { once: true });
  });
}

// ---------- router ----------
async function route() {
  const [, id, date] = (location.hash.replace(/^#\/?/, '#/').match(/^#\/([a-z]+)?\/?([\d-]+)?/) || []);
  app.removeAttribute('style');
  if (id) await renderSection(id, date);
  else await renderHome();
  window.scrollTo(0, 0);
}

app.addEventListener('click', e => {
  const jump = e.target.closest('[data-scroll]');
  if (jump) {
    const target = document.getElementById(jump.dataset.scroll);
    if (target) target.scrollIntoView({ behavior: matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth' });
    return;
  }
  const el = e.target.closest('[data-go]');
  if (!el) return;
  e.preventDefault();
  navigate(el.dataset.go);
});

window.addEventListener('hashchange', route);
app.classList.add('first-load');
route().then(() => setTimeout(() => app.classList.remove('first-load'), 900));

if ('serviceWorker' in navigator && location.protocol === 'https:') {
  navigator.serviceWorker.register('sw.js').catch(() => {});
}
