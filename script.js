/* ============================================================
   NUESTRO UNIVERSO — Para Mi Amor ❤️
   JavaScript: interacciones, animaciones y personalización
   ============================================================ */

// ===============================
// PERSONALIZACIÓN
// ===============================
// Edita aquí todo lo personal de la página.
// Las fotografías deben colocarse en: assets/photos/
// La música debe colocarse en: assets/music/

const CONFIG = {
  girlfriendName: "Mi amor",
  relationshipStart: "1 de julio",
  nickname: "Mi Amor",        // Apodo cariñoso
  signature: "Bambam",         // Tu nombre o apodo para la firma final
  music: "assets/music/cancion.mp3",

  // --- Fotografías (coloca los archivos en assets/photos/) ---
  photos: [
    { file: "MB.jpeg",  caption: "Michelle ✨" },
    { file: "MB1.jpeg", caption: "Tu sonrisa 💫" },
    { file: "MB2.jpeg", caption: "Siempre radiante 🌙" },
    { file: "MB3.jpeg", caption: "Nuestro primer momento ❤️" },
    { file: "MB4.jpeg", caption: "Juntos, siempre 🌌" },
    { file: "MB5.jpeg", caption: "Nuestra historia 📖" },
    { file: "MB6.jpeg", caption: "Tú y yo 💕" },
    { file: "MB7.jpeg", caption: "Siempre juntos ❤️" },
    { file: "MB8.jpeg", caption: "Mi lugar favorito 🌙" },
    { file: "MB9.jpeg", caption: "Nuestro universo especial 💫" }
  ],

  // --- Línea del tiempo (edita fechas y textos) ---
  timeline: [
    {
       date: "30 DE ABRIL",
      text: "Nuestro primer beso.",
      star: "✨"
    },
    {
      date: "03 DE MAYO", // <-- Coloca aquí la fecha del siguiente momento
      text: "Primera cita ", // <-- Coloca aquí una breve descripción
      star: "💫"
    },
    {
      date: "",
      text: "",
      star: "🌙"
    },
    {
      date: "25 DE MAYO ",
      text: "Hiciste especial mi dia",
      star: "❤️"
    },
    {
      date: "01 JULIO",
      text: "El día en que comenzó nuestra historia.",
      star: "🌌"
    }
  ],

  // --- Cualidades que amas de ella (edita libremente) ---
  qualities: [
    "Tu forma de ser",
    "Tu sonrisa",
    "La manera en que haces especiales los momentos",
    "Tu forma de querer",
    "Tu manera de hacerme sentir en casa"
  ],

  // --- Carta de amor (coloca aquí tu propio mensaje) ---
  // Puedes usar \n para saltos de línea.
  birthdayLetter: `Feliz cumpleaños, Amor ❤️

Hoy no quiero solamente desearte un feliz cumpleaños. Quiero aprovechar este día para recordarte lo especial que eres para mí y lo feliz que me hace poder compartir una parte de mi vida contigo.

Aunque nuestra historia comenzó hace relativamente poco, en este tiempo has logrado ocupar un lugar muy importante en mi corazón. He disfrutado cada conversación, cada momento, cada risa, cada detalle y hasta esos pequeños instantes que quizá parecen insignificantes, pero que para mí terminan convirtiéndose en recuerdos que quiero guardar para siempre.

Me gusta conocerte cada día un poquito más, descubrir tu forma de pensar, tus gustos, tus sueños y todas esas pequeñas cosas que te hacen ser tú. Y mientras más te conozco, más razones encuentro para admirarte, quererte y sentirme afortunado de haberte encontrado.

Quiero que hoy, en tu cumpleaños, recuerdes algo: eres una persona increíble y mereces todo lo bonito que la vida pueda darte. Deseo de corazón que este nuevo año de tu vida esté lleno de momentos felices, sueños cumplidos, nuevas experiencias, muchas sonrisas y personas que te quieran tan bonito como mereces.

Y cuando lleguen esos días difíciles, espero que nunca olvides lo mucho que vales. Quiero que sepas que aquí tienes a alguien que está muy feliz de tenerte en su vida, alguien que quiere verte crecer, cumplir tus sueños y estar a tu lado para celebrar cada uno de tus logros.

Gracias por permitirme formar parte de tu vida y por dejarme vivir contigo esta historia que apenas estamos comenzando a escribir. Gracias por cada momento, por cada sonrisa, por cada palabra bonita y por todo lo que poco a poco hemos ido construyendo juntos.

Espero poder estar presente en muchos cumpleaños más. Quiero acompañarte en tus sueños, celebrar tus logros, abrazarte en tus días difíciles y crear contigo tantos recuerdos que algún día podamos mirar hacia atrás y decir: “Mira todo lo que hemos vivido juntos.”

No sé qué nos depare el futuro, pero sí sé que me hace mucha ilusión seguir descubriéndolo contigo. Porque si algo tengo claro es que quiero seguir conociéndote, seguir enamorándome de ti y seguir construyendo esta historia a tu lado. ❤️

Feliz cumpleaños, mi Amor. ❤️

Te quiero muchísimo y espero que este nuevo año de tu vida sea tan bonito, especial y maravilloso como tú mereces.

Hoy celebro tu vida, pero también celebro la suerte que tengo de poder compartir un pedacito de ella contigo.

Feliz cumpleaños, mi niña hermosa. ❤️
Te quiero muchísimo.`
};

// ===============================
// UTILIDADES
// ===============================

/** ¿El usuario prefiere menos animaciones? */
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

/** Selección rápida de elementos */
const $ = (selector) => document.querySelector(selector);
const $$ = (selector) => document.querySelectorAll(selector);

/** Retorna una promesa que se resuelve tras `ms` milisegundos */
const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

/** Limita la velocidad de ejecución de una función */
function debounce(fn, wait) {
  let timeout;
  return (...args) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => fn(...args), wait);
  };
}

// ===============================
// FONDO ESPACIAL (Canvas)
// ===============================
const canvas = $('#space-canvas');
const ctx = canvas.getContext('2d');
let stars = [];
let shootingStars = [];

/** Genera un campo de estrellas con profundidad (parallax) */
function createStars() {
  const count = prefersReducedMotion ? 60 : window.innerWidth < 640 ? 80 : 180;
  stars = [];

  for (let i = 0; i < count; i++) {
    stars.push({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      radius: Math.random() * 1.8 + 0.3,
      depth: Math.random(),                 // 0 = lejos, 1 = cerca
      speed: Math.random() * 0.15 + 0.03,   // velocidad de drift
      alpha: Math.random() * 0.7 + 0.3,
      twinkleSpeed: Math.random() * 0.02 + 0.005,
      twinklePhase: Math.random() * Math.PI * 2
    });
  }
}

/** Redimensiona el canvas al tamaño de la ventana */
function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  createStars();
}
window.addEventListener('resize', debounce(resizeCanvas, 150));
resizeCanvas();

/** Crea una estrella fugaz */
function createShootingStar() {
  shootingStars.push({
    x: Math.random() * canvas.width * 0.8 + canvas.width * 0.1,
    y: Math.random() * canvas.height * 0.3,
    vx: -(Math.random() * 6 + 4),
    vy: Math.random() * 2 + 1.5,
    life: 1,
    maxLife: 1
  });
}

/** Dibuja el cielo nocturno */
function drawStars(time) {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Fondo degradado
  const gradient = ctx.createRadialGradient(
    canvas.width * 0.5, canvas.height * 0.2, 0,
    canvas.width * 0.5, canvas.height * 0.5, canvas.height * 0.8
  );
  gradient.addColorStop(0, '#0b1026');
  gradient.addColorStop(0.6, '#070919');
  gradient.addColorStop(1, '#05060f');
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // Estrellas con parallax suave
  const mouseOffsetX = (mouseX / window.innerWidth - 0.5) * -20;
  const mouseOffsetY = (mouseY / window.innerHeight - 0.5) * -20;
  const scrollOffset = window.scrollY * 0.1;

  for (const star of stars) {
    const parallaxX = mouseOffsetX * (star.depth * 2);
    const parallaxY = mouseOffsetY * (star.depth * 2);
    const driftY = ((time * star.speed + star.y - scrollOffset) % canvas.height + canvas.height) % canvas.height;
    const twinkle = 0.55 + 0.45 * Math.sin(time * star.twinkleSpeed * 1000 + star.twinklePhase);

    ctx.beginPath();
    ctx.arc(
      (star.x + parallaxX + canvas.width) % canvas.width,
      (driftY + parallaxY + canvas.height) % canvas.height,
      star.radius,
      0,
      Math.PI * 2
    );
    ctx.fillStyle = `rgba(255, 244, 230, ${star.alpha * twinkle})`;
    ctx.shadowColor = 'rgba(255, 255, 255, 0.6)';
    ctx.shadowBlur = star.depth > 0.7 ? 8 : 3;
    ctx.fill();
    ctx.shadowBlur = 0;
  }

  // Estrellas fugaces
  for (let i = shootingStars.length - 1; i >= 0; i--) {
    const s = shootingStars[i];
    s.x += s.vx;
    s.y += s.vy;
    s.life -= 0.02;

    if (s.life <= 0) {
      shootingStars.splice(i, 1);
      continue;
    }

    const tailLength = 12;
    ctx.beginPath();
    ctx.moveTo(s.x, s.y);
    ctx.lineTo(s.x - s.vx * tailLength, s.y - s.vy * tailLength);
    ctx.strokeStyle = `rgba(255, 244, 214, ${s.life * 0.9})`;
    ctx.lineWidth = 1.6;
    ctx.stroke();

    ctx.beginPath();
    ctx.arc(s.x, s.y, 1.6, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(255, 255, 255, ${s.life})`;
    ctx.fill();
  }
}

/** Bucle principal de animación del cielo */
let lastStarTime = 0;
function animateStars(time) {
  const elapsed = (time - lastStarTime) / 1000;
  lastStarTime = time;

  if (!prefersReducedMotion) {
    // Generar estrellas fugaces ocasionalmente
    if (Math.random() < 0.003 * (elapsed * 60)) {
      createShootingStar();
    }
  }

  drawStars(time / 1000);
  requestAnimationFrame(animateStars);
}
requestAnimationFrame(animateStars);

// --- Parallax con el mouse / táctil ---
let mouseX = window.innerWidth / 2;
let mouseY = window.innerHeight / 2;

function updatePointer(x, y) {
  mouseX = x;
  mouseY = y;
}

window.addEventListener('mousemove', (e) => updatePointer(e.clientX, e.clientY));
window.addEventListener('touchmove', (e) => {
  const touch = e.touches[0];
  if (touch) updatePointer(touch.clientX, touch.clientY);
}, { passive: true });

// ===============================
// SISTEMA DE PARTÍCULAS (FX)
// ===============================
const fxLayer = $('#fx-layer');

/** Crea un conjunto de partículas de confeti */
function spawnConfetti(count = 60) {
  if (prefersReducedMotion) return;

  const colors = ['#ff85a2', '#e8c27a', '#ffb6c1', '#ffffff', '#6d4a9e', '#f7e0ac'];

  for (let i = 0; i < count; i++) {
    const el = document.createElement('div');
    el.className = 'fx-confetti';
    el.style.left = Math.random() * 100 + 'vw';
    el.style.top = '-10px';
    el.style.background = colors[Math.floor(Math.random() * colors.length)];
    el.style.animationDuration = (Math.random() * 2.5 + 2) + 's';
    el.style.animationDelay = Math.random() * 1.5 + 's';
    el.style.transform = `rotate(${Math.random() * 360}deg)`;
    el.style.width = (Math.random() * 8 + 6) + 'px';
    el.style.height = (Math.random() * 10 + 8) + 'px';
    fxLayer.appendChild(el);
    setTimeout(() => el.remove(), 5000);
  }
}

/** Crea corazones flotantes */
function spawnHearts(count = 15) {
  if (prefersReducedMotion) return;

  for (let i = 0; i < count; i++) {
    const el = document.createElement('div');
    el.className = 'fx-heart';
    el.textContent = ['❤️', '💖', '💕', '💗'][Math.floor(Math.random() * 4)];
    el.style.left = Math.random() * 100 + 'vw';
    el.style.bottom = '-20px';
    el.style.fontSize = (Math.random() * 16 + 12) + 'px';
    el.style.animationDuration = (Math.random() * 4 + 3) + 's';
    el.style.animationDelay = Math.random() * 2 + 's';
    fxLayer.appendChild(el);
    setTimeout(() => el.remove(), 7000);
  }
}

/** Explosión de estrellas desde el centro */
function spawnStarBurst(count = 40) {
  if (prefersReducedMotion) return;

  const centerX = window.innerWidth / 2;
  const centerY = window.innerHeight / 2;

  for (let i = 0; i < count; i++) {
    const el = document.createElement('div');
    el.className = 'fx-star';
    const angle = Math.random() * Math.PI * 2;
    const distance = Math.random() * Math.min(window.innerWidth, window.innerHeight) * 0.5;

    el.style.left = centerX + 'px';
    el.style.top = centerY + 'px';
    el.style.setProperty('--x0', '0px');
    el.style.setProperty('--y0', '0px');
    el.style.setProperty('--x1', Math.cos(angle) * distance + 'px');
    el.style.setProperty('--y1', Math.sin(angle) * distance + 'px');
    el.style.animationDelay = (Math.random() * 0.2) + 's';

    const size = Math.random() * 6 + 3;
    el.style.width = size + 'px';
    el.style.height = size + 'px';

    fxLayer.appendChild(el);
    setTimeout(() => el.remove(), 1800);
  }
}

// ===============================
// MÚSICA
// ===============================
const musicPlayer = $('#music-player');
const musicBtn = $('#music-btn');
const playPauseBtn = $('#play-pause-btn');
const muteBtn = $('#mute-btn');
const musicNote = $('#music-note');
let audio = null;
let isMusicLoaded = false;

/** Intenta cargar el archivo de música */
function initMusic() {
  audio = new Audio();
  audio.loop = true;
  audio.preload = 'auto';

  audio.addEventListener('canplaythrough', () => {
    isMusicLoaded = true;
    musicPlayer.classList.remove('hidden');
    // Animar entrada suave del reproductor
    musicPlayer.style.transition = 'opacity 0.6s ease, transform 0.6s ease';

    // Si el usuario ya hizo clic en "ABRIR MI REGALO", reproducir
    if (userWantsMusic) startMusic();
  });

  audio.addEventListener('error', () => {
    // Si el archivo no existe, la página sigue funcionando sin música
    isMusicLoaded = false;
    musicPlayer.classList.add('hidden');
  });

  audio.src = CONFIG.music;
}

// Velocidad base para la carta (ms por carácter). A mayor número, más lento
const LETTER_SPEED = 38;

// Si el usuario ya quiso reproducir música pero el archivo aún no cargaba
let userWantsMusic = false;

/** Inicia la música (requiere interacción del usuario) */
function startMusic() {
  userWantsMusic = true;

  if (!audio || !isMusicLoaded) return;

  audio.play().catch(() => {
    // Autoplay bloqueado: se intentará de nuevo con la interacción del usuario
  });
  playPauseBtn.textContent = '⏸';
  musicNote.classList.remove('hidden');
}

/** Reproduce o pausa la música */
function togglePlayPause() {
  if (!audio || !isMusicLoaded) return;

  if (audio.paused) {
    audio.play();
    playPauseBtn.textContent = '⏸';
    musicNote.classList.remove('hidden');
  } else {
    audio.pause();
    playPauseBtn.textContent = '▶';
    musicNote.classList.add('hidden');
  }
}

/** Silencia o activa el sonido */
function toggleMute() {
  if (!audio || !isMusicLoaded) return;

  audio.muted = !audio.muted;
  muteBtn.textContent = audio.muted ? '🔇' : '🔊';
}

musicBtn.addEventListener('click', togglePlayPause);
playPauseBtn.addEventListener('click', togglePlayPause);
muteBtn.addEventListener('click', toggleMute);

// ===============================
// NAVEGACIÓN ENTRE SECCIONES
// ===============================
const sections = $$('.section');
let currentSection = 'welcome';
let isTransitioning = false;

/** Muestra una sección con transición cinematográfica */
async function goToSection(targetId) {
  if (isTransitioning || targetId === currentSection) return;
  isTransitioning = true;

  const target = document.getElementById(targetId);
  if (!target) {
    isTransitioning = false;
    return;
  }

  // Crear el velo de transición
  const shade = document.createElement('div');
  shade.className = 'transition-shade';
  document.body.appendChild(shade);

  // Fase 1: fundir a negro
  await sleep(30);
  shade.classList.add('active');
  await sleep(480);

  // Fase 2: cambiar de sección
  sections.forEach((section) => section.classList.remove('active'));
  target.classList.add('active');
  currentSection = targetId;

  // Re-inicializar animaciones de la sección de destino
  handleSectionEntered(targetId);

  // Fase 3: fundir desde negro
  shade.classList.remove('active');
  await sleep(480);
  shade.remove();
  isTransitioning = false;

  window.scrollTo(0, 0);
}

/** Acciones al entrar en una sección */
function handleSectionEntered(targetId) {
  switch (targetId) {
    case 'memories':
      revealGalleryItems();
      break;
    case 'story':
      revealTimelineItems();
      break;
    case 'qualities':
      revealQualities();
      break;
    case 'letter':
      startLetterAnimation();
      break;
    case 'universe':
      drawConstellation();
      break;
  }
}

// Botones "Continuar" (siguiente sección)
$$('.next-btn').forEach((btn) => {
  btn.addEventListener('click', () => {
    const next = btn.dataset.next;
    if (next) goToSection(next);
  });
});

// Botones "Volver" (sección anterior)
$$('.back-btn').forEach((btn) => {
  btn.addEventListener('click', () => {
    const back = btn.dataset.back;
    if (back) goToSection(back);
  });
});

// ===============================
// PANTALLA INICIAL
// ===============================
$('#open-gift-btn').addEventListener('click', () => {
  startMusic();
  spawnHearts(10);
  goToSection('birthday');
});

// ===============================
// SECCIÓN 2 — GALERÍA DE RECUERDOS
// ===============================
const gallery = $('#gallery');

/** Verifica si una imagen existe */
function imageExists(src) {
  return new Promise((resolve) => {
    const img = new Image();
    img.onload = () => resolve(true);
    img.onerror = () => resolve(false);
    img.src = src;
  });
}

/** Construye la galería con placeholders elegantes */
async function buildGallery() {
  const loading = document.getElementById('gallery-loading');
  for (let i = 0; i < CONFIG.photos.length; i++) {
    const photo = CONFIG.photos[i];
    const src = `assets/photos/${photo.file}`;

    const card = document.createElement('div');
    card.className = 'photo-card fade-in-view';
    card.style.transitionDelay = `${(i % 4) * 0.12}s`;
    card.setAttribute('role', 'button');
    card.setAttribute('aria-label', photo.caption);
    card.setAttribute('tabindex', '0');

    const caption = document.createElement('p');
    caption.className = 'photo-caption';
    caption.textContent = photo.caption;

    const exists = await imageExists(src);

    if (exists) {
      const img = document.createElement('img');
      img.src = src;
      img.alt = photo.caption;
      img.loading = 'lazy';
      card.appendChild(img);
    } else {
      // Placeholder elegante
      const placeholder = document.createElement('div');
      placeholder.className = 'photo-placeholder';
      const icon = document.createElement('span');
      icon.className = 'icon';
      icon.textContent = '🌌';
      const text = document.createElement('span');
      text.textContent = 'Tu foto aquí';
      placeholder.appendChild(icon);
      placeholder.appendChild(text);
      card.appendChild(placeholder);
    }

    card.appendChild(caption);
    gallery.appendChild(card);

    // Observar para animación de aparición al hacer scroll
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15 });
    observer.observe(card);

    // Abrir lightbox al hacer clic
    const openLightbox = () => openImageViewer(card, src, photo.caption);
    card.addEventListener('click', openLightbox);
    card.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') openLightbox();
    });
  }

  // Ocultar indicador de carga
  if (loading) loading.classList.add('hidden');
}

// La animación de aparición se maneja desde buildGallery() con observadores individuales
function revealGalleryItems() {
  // No es necesario: cada foto ya tiene su propio IntersectionObserver
}

// ===============================
// LIGHTBOX
// ===============================
const lightbox = $('#lightbox');
const lightboxImg = $('#lightbox-img');
const lightboxCaption = $('#lightbox-caption');
const lightboxClose = $('#lightbox-close');

/** Abre el visor de fotografías */
function openImageViewer(card, src, caption) {
  // Si la foto no existe, no abrir el visor
  if (card.querySelector('.photo-placeholder')) return;

  lightboxImg.src = src;
  lightboxImg.alt = caption;
  lightboxCaption.textContent = caption;
  lightbox.classList.add('open');
  lightbox.setAttribute('aria-hidden', 'false');
  document.body.style.overflow = 'hidden';
}

/** Cierra el visor de fotografías */
function closeLightbox() {
  lightbox.classList.remove('open');
  lightbox.setAttribute('aria-hidden', 'true');
  document.body.style.overflow = '';
}

lightboxClose.addEventListener('click', closeLightbox);
lightbox.addEventListener('click', (e) => {
  if (e.target === lightbox) closeLightbox();
});
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') closeLightbox();
});

// ===============================
// SECCIÓN 3 — LÍNEA DEL TIEMPO
// ===============================
const timelineEl = $('#timeline');

/** Construye la línea del tiempo */
function buildTimeline() {
  timelineEl.innerHTML = '';

  CONFIG.timeline.forEach((event, index) => {
    if (!event.date && !event.text) return; // Saltar eventos vacíos

    const item = document.createElement('div');
    item.className = 'timeline-event fade-in-view';
    item.style.transitionDelay = `${index * 0.15}s`;

    if (event.star) {
      const star = document.createElement('span');
      star.className = 'event-star';
      star.textContent = event.star;
      item.appendChild(star);
    }

    if (event.date) {
      const date = document.createElement('div');
      date.className = 'event-date';
      date.textContent = event.date;
      item.appendChild(date);
    }

    if (event.text) {
      const text = document.createElement('p');
      text.className = 'event-text';
      text.textContent = event.text;
      item.appendChild(text);
    }

    timelineEl.appendChild(item);
  });
}

/** Aparecen los eventos con animación */
function revealTimelineItems() {
  const items = $$('.timeline-event.fade-in-view');

  if (prefersReducedMotion) {
    items.forEach((item) => item.classList.add('visible'));
    return;
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.2 });

  items.forEach((item) => observer.observe(item));
}

// ===============================
// SECCIÓN 4 — LO QUE AMO DE TI
// ===============================
const qualitiesList = $('#qualities-list');

/** Construye las tarjetas de cualidades */
function buildQualities() {
  qualitiesList.innerHTML = '';

  CONFIG.qualities.forEach((quality, index) => {
    const card = document.createElement('div');
    card.className = 'quality-card';
    card.style.animationDelay = `${index * 0.25}s`;
    card.textContent = quality;
    qualitiesList.appendChild(card);
  });
}

/** Aparecen una por una con animación */
function revealQualities() {
  const cards = $$('.quality-card');

  if (prefersReducedMotion) {
    cards.forEach((card) => card.classList.add('visible'));
    return;
  }

  // Animar una por una con retraso escalonado
  cards.forEach((card, index) => {
    setTimeout(() => {
      card.classList.add('visible');
    }, index * 300);
  });
}

// ===============================
// SECCIÓN 5 — CARTA CON EFECTO DE ESCRITURA
// ===============================
const letterText = $('#letter-text');
const letterCursor = $('#letter-cursor');
const replayLetterBtn = $('#replay-letter-btn');
let letterTimeout = null;
let isLetterTyping = false;

/** Escribe la carta con efecto de máquina de escribir */
function typeLetter() {
  // Limpiar animación anterior
  clearTimeout(letterTimeout);
  cancelAnimationFrame(letterAnimationFrame);
  letterText.textContent = '';
  letterCursor.classList.remove('hidden');
  isLetterTyping = true;
  replayLetterBtn.disabled = true;

  const text = CONFIG.birthdayLetter;
  let index = 0;

  // Pausas naturales (después de coma, punto, salto de línea)
  function getPause(char) {
    if (char === '.') return 500;
    if (char === ',') return 350;
    if (char === '\n') return 300;
    if (char === ' ') return 90;
    return LETTER_SPEED;
  }

  function writeNext() {
    if (index >= text.length) {
      // Terminó la carta
      isLetterTyping = false;
      replayLetterBtn.disabled = false;
      if (prefersReducedMotion) letterCursor.classList.add('hidden');
      return;
    }

    const char = text[index];
    letterText.textContent += char;
    index++;

    const pause = prefersReducedMotion ? 0 : getPause(char);
    letterTimeout = setTimeout(writeNext, pause);
  }

  writeNext();
}

/** Reinicia la carta */
function startLetterAnimation() {
  if (isLetterTyping) return; // Si ya se está escribiendo, no reiniciar
  typeLetter();
}

replayLetterBtn.addEventListener('click', typeLetter);

// Manejador para el bucle de animación de la hoja de la carta
let letterAnimationFrame = 0;

// ===============================
// SECCIÓN 6 — CONSTELACIÓN
// ===============================
const constellationSvg = $('#constellation');

/** Dibuja una constelación con puntos de luz */
function drawConstellation() {
  constellationSvg.innerHTML = '';

  const ns = 'http://www.w3.org/2000/svg';
  const usedPhotos = CONFIG.photos.filter((_, index) => index % 2 === 0); // Representa fotos de "nosotros"

  // Definir posiciones de los puntos (coordenadas de 0-100)
  const points = [
    { x: 50, y: 45 },  // Centro — el corazón
    { x: 30, y: 30 },
    { x: 68, y: 22 },
    { x: 80, y: 55 },
    { x: 62, y: 75 },
    { x: 24, y: 68 },
    { x: 15, y: 48 },
    { x: 75, y: 42 }
  ];

  // Filtro de resplandor
  const defs = document.createElementNS(ns, 'defs');
  const filter = document.createElementNS(ns, 'filter');
  filter.setAttribute('id', 'glow');
  const feGaussian = document.createElementNS(ns, 'feGaussianBlur');
  feGaussian.setAttribute('stdDeviation', '0.4');
  filter.appendChild(feGaussian);
  defs.appendChild(filter);
  constellationSvg.appendChild(defs);

  // Líneas conectando los puntos
  const connections = [
    [0, 1], [0, 2], [0, 3], [0, 4], [0, 5], [0, 6], [0, 7],
    [1, 6], [6, 5], [5, 4], [4, 3], [3, 2], [2, 7], [7, 1]
  ];

  for (const [a, b] of connections) {
    const line = document.createElementNS(ns, 'line');
    line.setAttribute('x1', points[a].x);
    line.setAttribute('y1', points[a].y);
    line.setAttribute('x2', points[b].x);
    line.setAttribute('y2', points[b].y);
    constellationSvg.appendChild(line);
  }

  // Puntos de luz
  points.forEach((point, index) => {
    const circle = document.createElementNS(ns, 'circle');
    circle.setAttribute('cx', point.x);
    circle.setAttribute('cy', point.y);
    circle.setAttribute('r', index === 0 ? 2.2 : 1.4);
    circle.classList.add('constellation-star');
    constellationSvg.appendChild(circle);
  });

  // Puntos que representan fotografías (etiquetas mínimas)
  usedPhotos.slice(0, 4).forEach((_, index) => {
    const p = points[index + 1];
    if (!p) return;
    const circle = document.createElementNS(ns, 'circle');
    circle.setAttribute('cx', p.x + 3);
    circle.setAttribute('cy', p.y + 3);
    circle.setAttribute('r', 0.9);
    circle.setAttribute('fill', '#ff85a2');
    constellationSvg.appendChild(circle);
  });

  // Animar con CSS si no se prefiere menos movimiento
  if (!prefersReducedMotion) {
    constellationSvg.querySelectorAll('circle').forEach((c, i) => {
      c.style.animation = `constellationPulse ${2 + (i % 4) * 0.6}s ease-in-out ${i * 0.3}s infinite`;
    });
  }

  spawnHearts(8);
}

// Animación CSS para la constelación (se define aquí con JS)
const styleEl = document.createElement('style');
styleEl.textContent = `
  @keyframes constellationPulse {
    0%, 100% { opacity: 0.6; }
    50% { opacity: 1; }
  }
  .constellation-star {
    opacity: 0.85;
  }
`;
document.head.appendChild(styleEl);

// ===============================
// SECCIÓN FINAL — TARTA Y VELA
// ===============================
const flame = $('#flame');
const blowCandleBtn = $('#blow-candle-btn');
const finalMessage = $('#final-message');
let candleBlown = false;

/** Apaga la vela y lanza la celebración */
function blowCandle() {
  if (candleBlown) return;
  candleBlown = true;

  // 1. Apagar la llama
  flame.classList.add('out');

  // 2. Crear humo (offset por scroll corregido)
  const candleTip = flame.getBoundingClientRect();
  const scrollY = window.scrollY || window.pageYOffset;
  for (let i = 0; i < 5; i++) {
    const smoke = document.createElement('div');
    smoke.className = 'smoke';
    smoke.style.left = (candleTip.left + candleTip.width / 2 + (Math.random() * 30 - 15)) + 'px';
    smoke.style.top = (candleTip.top + scrollY - 10) + 'px';
    smoke.style.setProperty('--drift', (Math.random() * 40 - 20) + 'px');
    smoke.style.animationDelay = (Math.random() * 0.4) + 's';
    document.body.appendChild(smoke);
    setTimeout(() => smoke.remove(), 3000);
  }

  // 3. Explosión de estrellas
  setTimeout(() => {
    spawnStarBurst(50);
  }, 400);

  // 4. Confeti y corazones
  setTimeout(() => {
    spawnConfetti(80);
    spawnHearts(20);
  }, 900);

  // 5. Cambiar el fondo (flash suave)
  document.body.style.transition = 'background 1s ease';
  document.body.style.background = 'radial-gradient(ellipse at 50% 20%, #1a0b2e 0%, #05060f 75%)';
  setTimeout(() => {
    document.body.style.background = '';
  }, 2000);

  // 6. Ocultar botón y mostrar mensaje final
  setTimeout(() => {
    blowCandleBtn.classList.add('hidden');
    finalMessage.classList.remove('hidden');
    finalMessage.scrollIntoView({ behavior: 'smooth', block: 'center' });
  }, 1500);

  // Permitir apagar la vela también al hacer clic en la llama
  flame.style.pointerEvents = 'none';
}

blowCandleBtn.addEventListener('click', blowCandle);
flame.addEventListener('click', blowCandle);

// ===============================
// INICIALIZACIÓN
// ===============================
async function init() {
  // Cargar música (si existe)
  initMusic();

  // Construir secciones dinámicas
  buildGallery();
  buildTimeline();
  buildQualities();

  // Mostrar la galería cuando se entra a esa sección
  // (se maneja con handleSectionEntered)
}

init();