'use strict';

const SIZE = 32;

// Dal testo del seme a un numero, poi a una sequenza di numeri sempre uguale per lo stesso seme.
function hashSeed(text) {
  let h = 2166136261;
  for (let i = 0; i < text.length; i++) {
    h ^= text.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return h >>> 0;
}

function makeRng(seed) {
  let a = hashSeed(seed);
  return function () {
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

// Quattro sagome: cerchio, quadrato smussato, rombo, scudo.
const SHAPES = [
  (dx, dy) => Math.hypot(dx, dy) <= 14,
  (dx, dy) => Math.max(Math.abs(dx), Math.abs(dy)) <= 13.5 && Math.abs(dx) + Math.abs(dy) <= 20,
  (dx, dy) => Math.abs(dx) + Math.abs(dy) <= 15,
  (dx, dy) => dy >= -13 && dy <= 14 && Math.abs(dx) <= (dy <= 0 ? 12.5 : 13 - dy * 0.85),
];

function logoPixels(seed) {
  const rng = makeRng(seed);
  const hue = Math.floor(rng() * 360);
  const hueAlt = (hue + 120 + Math.floor(rng() * 90)) % 360;
  const colors = {
    main: `hsl(${hue} 70% 52%)`,
    edge: `hsl(${hue} 60% 78%)`,
    accent: `hsl(${hueAlt} 80% 66%)`,
  };
  const shape = SHAPES[Math.floor(rng() * SHAPES.length)];
  const inside = (x, y) => shape(x - 15.5, y - 15.5);

  // Metà sinistra dell'emblema a 4x8 celle da 2 pixel, poi specchiata a destra.
  const half = [];
  for (let r = 0; r < 8; r++) {
    half.push([]);
    for (let c = 0; c < 4; c++) half[r].push(rng() < (c === 3 ? 0.6 : 0.5));
  }

  const px = [];
  for (let y = 0; y < SIZE; y++) {
    for (let x = 0; x < SIZE; x++) {
      if (!inside(x, y)) continue;
      const border = !inside(x - 1, y) || !inside(x + 1, y) || !inside(x, y - 1) || !inside(x, y + 1);
      let color = border ? colors.edge : colors.main;
      if (!border && x >= 8 && x < 24 && y >= 8 && y < 24) {
        const cx = Math.floor((x - 8) / 2);
        const cy = Math.floor((y - 8) / 2);
        if (half[cy][cx < 4 ? cx : 7 - cx]) color = colors.accent;
      }
      px.push([x, y, color]);
    }
  }
  return px;
}

function paintLogo(canvas, seed) {
  const ctx = canvas.getContext('2d');
  ctx.clearRect(0, 0, SIZE, SIZE);
  for (const [x, y, color] of logoPixels(seed)) {
    ctx.fillStyle = color;
    ctx.fillRect(x, y, 1, 1);
  }
}

function drawLogo(seed) {
  document.getElementById('name').textContent = logoName(seed);
  paintLogo(document.getElementById('logo'), seed);
  updateStar(seed);
}

// Nomi: «Sostantivo Aggettivo», con l'aggettivo concordato nel genere.
// Sequenza casuale separata da quella del logo, così il disegno non cambia.
const NOUNS = [
  ['Gufo', 'm'], ['Pinguino', 'm'], ['Tostapane', 'm'], ['Cactus', 'm'], ['Drago', 'm'],
  ['Granchio', 'm'], ['Fungo', 'm'], ['Razzo', 'm'], ['Biscotto', 'm'], ['Castello', 'm'],
  ['Polpo', 'm'], ['Ombrello', 'm'], ['Gatto', 'm'], ['Robot', 'm'], ['Faro', 'm'],
  ['Luna', 'f'], ['Pizza', 'f'], ['Lumaca', 'f'], ['Volpe', 'f'], ['Nuvola', 'f'],
  ['Medusa', 'f'], ['Torre', 'f'], ['Fabbrica', 'f'], ['Stella', 'f'], ['Chitarra', 'f'],
  ['Rana', 'f'], ['Cometa', 'f'], ['Valigia', 'f'], ['Zucca', 'f'], ['Bussola', 'f'],
];

// [maschile, femminile]
const ADJECTIVES = [
  ['Elettrico', 'Elettrica'], ['Cosmico', 'Cosmica'], ['Sospetto', 'Sospetta'], ['Storto', 'Storta'],
  ['Pigro', 'Pigra'], ['Furioso', 'Furiosa'], ['Segreto', 'Segreta'], ['Dorato', 'Dorata'],
  ['Magnetico', 'Magnetica'], ['Nebbioso', 'Nebbiosa'], ['Veloce', 'Veloce'], ['Gentile', 'Gentile'],
  ['Spaziale', 'Spaziale'], ['Rumoroso', 'Rumorosa'], ['Tascabile', 'Tascabile'], ['Metallico', 'Metallica'],
  ['Ribelle', 'Ribelle'], ['Notturno', 'Notturna'], ['Curioso', 'Curiosa'], ['Instabile', 'Instabile'],
  ['Fortunato', 'Fortunata'], ['Lucente', 'Lucente'], ['Elegante', 'Elegante'], ['Selvaggio', 'Selvaggia'],
  ['Strano', 'Strana'], ['Vulcanico', 'Vulcanica'], ['Cremoso', 'Cremosa'], ['Brillante', 'Brillante'],
  ['Solitario', 'Solitaria'], ['Imprevedibile', 'Imprevedibile'],
];

function logoName(seed) {
  const rng = makeRng(seed + '|nome');
  const [noun, gender] = NOUNS[Math.floor(rng() * NOUNS.length)];
  const adj = ADJECTIVES[Math.floor(rng() * ADJECTIVES.length)][gender === 'm' ? 0 : 1];
  return noun + ' ' + adj;
}

function randomSeed() {
  return Math.random().toString(36).slice(2, 8);
}

// Preferiti: in localStorage, nello stesso formato che userà la sincronizzazione col Gist.
const FAV_KEY = 'pixellogo.preferiti';
const FAV_BACKUP_KEY = 'pixellogo.preferiti.backup';

function isValidFav(f) {
  return f && typeof f.seed === 'string' && typeof f.name === 'string' && typeof f.savedAt === 'string';
}

function loadFavorites() {
  let raw = null;
  try {
    raw = localStorage.getItem(FAV_KEY);
  } catch (e) {
    return [];
  }
  if (raw === null) return [];
  try {
    const doc = JSON.parse(raw);
    if (doc && doc.version === 1 && doc.data && Array.isArray(doc.data.favorites) && doc.data.favorites.every(isValidFav)) {
      return doc.data.favorites;
    }
  } catch (e) {
    // dati illeggibili: si passa al backup qui sotto
  }
  try {
    localStorage.setItem(FAV_BACKUP_KEY, raw);
  } catch (e) {
    // niente da fare: si riparte da una lista vuota
  }
  return [];
}

function saveFavorites() {
  const doc = { version: 1, updatedAt: new Date().toISOString(), data: { favorites } };
  try {
    localStorage.setItem(FAV_KEY, JSON.stringify(doc));
    return true;
  } catch (e) {
    showToast('Il browser non mi lascia salvare: i preferiti non resteranno.');
    return false;
  }
}

let favorites = loadFavorites();
let toastTimer = null;

function showToast(text) {
  const toast = document.getElementById('toast');
  toast.textContent = text;
  toast.classList.add('show');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toast.classList.remove('show'), 2400);
}

function findFavorite(seed) {
  return favorites.find(f => f.seed === seed);
}

const seedInput = document.getElementById('seed');
const favButton = document.getElementById('fav');

function updateStar(seed) {
  const saved = !!findFavorite(seed);
  favButton.disabled = seed === '';
  favButton.title = seed === '' ? 'Scrivi un seme per salvarlo' : '';
  favButton.setAttribute('aria-pressed', String(saved));
  favButton.setAttribute('aria-label', saved ? 'Togli dai preferiti' : 'Salva nei preferiti');
}

function askRemove(fav) {
  const dialog = document.getElementById('confirm');
  document.getElementById('confirmText').textContent = 'Togliere «' + fav.name + '» dai preferiti?';
  if (typeof dialog.showModal !== 'function') {
    return Promise.resolve(window.confirm('Togliere «' + fav.name + '» dai preferiti?'));
  }
  return new Promise(resolve => {
    dialog.addEventListener('close', () => resolve(dialog.returnValue === 'ok'), { once: true });
    dialog.showModal();
  });
}

async function removeFavorite(fav) {
  if (!(await askRemove(fav))) return;
  const before = favorites;
  favorites = favorites.filter(f => f.seed !== fav.seed);
  if (!saveFavorites()) favorites = before;
  else showToast('Tolto dai preferiti.');
  renderFavorites();
  updateStar(seedInput.value);
}

function renderFavorites() {
  const list = document.getElementById('favlist');
  list.replaceChildren();
  document.getElementById('favs').hidden = favorites.length === 0;
  for (const fav of favorites) {
    const li = document.createElement('li');
    li.className = 'fav';

    const open = document.createElement('button');
    open.type = 'button';
    open.className = 'fav-open';
    open.setAttribute('aria-label', 'Apri ' + fav.name + ', seme ' + fav.seed);
    const canvas = document.createElement('canvas');
    canvas.width = SIZE;
    canvas.height = SIZE;
    paintLogo(canvas, fav.seed);
    open.appendChild(canvas);
    open.addEventListener('click', () => {
      seedInput.value = fav.seed;
      drawLogo(fav.seed);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    const foot = document.createElement('div');
    foot.className = 'fav-foot';
    const label = document.createElement('span');
    label.className = 'fav-name';
    label.textContent = fav.name;
    const remove = document.createElement('button');
    remove.type = 'button';
    remove.className = 'icon-btn';
    remove.setAttribute('aria-label', 'Togli ' + fav.name + ' dai preferiti');
    remove.innerHTML = '<svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true"><path d="M6 6l12 12M18 6L6 18" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>';
    remove.addEventListener('click', () => removeFavorite(fav));
    foot.append(label, remove);

    li.append(open, foot);
    list.appendChild(li);
  }
}

favButton.addEventListener('click', () => {
  const seed = seedInput.value;
  if (seed === '') return;
  const existing = findFavorite(seed);
  if (existing) {
    removeFavorite(existing);
    return;
  }
  const before = favorites;
  favorites = [{ seed, name: logoName(seed), savedAt: new Date().toISOString() }, ...favorites];
  if (!saveFavorites()) favorites = before;
  else showToast('Salvato nei preferiti.');
  renderFavorites();
  updateStar(seed);
});

seedInput.addEventListener('input', () => drawLogo(seedInput.value));
document.getElementById('gen').addEventListener('click', () => {
  seedInput.value = randomSeed();
  drawLogo(seedInput.value);
});

seedInput.value = randomSeed();
drawLogo(seedInput.value);
renderFavorites();

if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('sw.js').catch(() => {});
  });
}
