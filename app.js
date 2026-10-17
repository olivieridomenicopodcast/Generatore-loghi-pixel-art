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

function drawLogo(seed) {
  document.getElementById('name').textContent = logoName(seed);
  const canvas = document.getElementById('logo');
  const ctx = canvas.getContext('2d');
  ctx.clearRect(0, 0, SIZE, SIZE);
  for (const [x, y, color] of logoPixels(seed)) {
    ctx.fillStyle = color;
    ctx.fillRect(x, y, 1, 1);
  }
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

const seedInput = document.getElementById('seed');
seedInput.addEventListener('input', () => drawLogo(seedInput.value));
document.getElementById('gen').addEventListener('click', () => {
  seedInput.value = randomSeed();
  drawLogo(seedInput.value);
});

seedInput.value = randomSeed();
drawLogo(seedInput.value);

if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('sw.js').catch(() => {});
  });
}
