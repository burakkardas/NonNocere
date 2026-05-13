/* ============================================================
   Nonnocere — Web app.js
   Handles: localization, ambient background canvas,
            orbital core canvas, and page navigation transitions.
   ============================================================ */

(() => {
  "use strict";

  /* -------------------------------------------------- *
   *  Localization
   * -------------------------------------------------- */
  const COPY = {
    en: {
      tagline: "IMMERSIVE SURGICAL TRAINING",
      heroTitle: "Forging the missing link<br>in surgery education",
      heroLead:
        "In medical education, learners are exposed to live patients to acquire the necessary skills. There is also the necessity to ensure the patient's safety and well-being. These two needs can sometimes pose a dilemma in medical education. At Non Nocere, we offer an immersive learning experience that helps learners to improve their ability to perform surgery efficiently and safely.",
      menuPresentation: "Presentation",
      menuPresentationHint: "Curated visual narrative",
      menuVideo: "Video",
      menuVideoHint: "Cinematic storytelling",
      menuQuiz: "Quiz",
      menuQuizHint: "Interactive knowledge test",
      enter: "Enter",
      back: "Back",
      comingSoon: "In production",
      stagePresentation: "Slider experience will live here.",
      stageVideo: "Video player will live here.",
      stageQuiz: "Quiz mechanic will live here.",
      quizQuestion: "Question",
      quizPrev: "Previous",
      quizNext: "Next",
      quizSubmit: "Submit",
      quizRestart: "Restart",
      quizHome: "Home",
      quizResultBadge: "Complete",
      quizThankYouTitle: "Thank you",
      quizThankYouMessage:
        "Thank you for taking part in the Nonnocere experience.",
      galleryEmptyPresentations:
        "No presentations yet. Drop files into content/presentations/ and refresh.",
      galleryEmptyVideos:
        "No videos yet. Drop files into content/videos/ and refresh.",
      galleryOpen: "Open",
      galleryPlay: "Play",
      galleryClose: "Close",
      galleryLoading: "Loading…",
      galleryError: "Could not load the content list.",
    },
    tr: {
      tagline: "SÜRÜKLEYİCİ CERRAHİ EĞİTİM",
      heroTitle: "Cerrah eğitimindeki<br>eksik halkayı tamamlıyoruz",
      heroLead:
        "Tıp eğitiminde öğrenenlerin gerekli becerileri kazanmak için bazen hastaların üzerinde çalışmaları gerekir. Diğer taraftan hastanın güvenliğini sağlama ve refahını gözetme zorunluluğu da vardır. Bu iki gereklilik bazen tıp eğitiminde bir ikilem yaratabilmektedir. Non Nocere olarak, öğrenenlerin ameliyatları verimli ve güvenli bir şekilde tamamlama yetilerini geliştirmelerine yardımcı olan kapsamlı bir öğrenme deneyimi sunuyoruz.",
      menuPresentation: "Sunum",
      menuPresentationHint: "Görsel anlatı",
      menuVideo: "Video",
      menuVideoHint: "Sinematik hikâye",
      menuQuiz: "Quiz",
      menuQuizHint: "Etkileşimli bilgi testi",
      enter: "Başla",
      back: "Geri",
      comingSoon: "Yapım aşamasında",
      stagePresentation: "Slider deneyimi burada yer alacak.",
      stageVideo: "Video oynatıcı burada yer alacak.",
      stageQuiz: "Quiz mekaniği burada yer alacak.",
      quizQuestion: "Soru",
      quizPrev: "Geri",
      quizNext: "İleri",
      quizSubmit: "Gönder",
      quizRestart: "Tekrar Başla",
      quizHome: "Ana Sayfa",
      quizResultBadge: "Tamamlandı",
      quizThankYouTitle: "Teşekkürler",
      quizThankYouMessage:
        "Nonnocere deneyimine katıldığınız için teşekkür ederiz.",
      galleryEmptyPresentations:
        "Henüz sunum yok. Dosyaları content/presentations/ klasörüne koyup sayfayı yenileyin.",
      galleryEmptyVideos:
        "Henüz video yok. Dosyaları content/videos/ klasörüne koyup sayfayı yenileyin.",
      galleryOpen: "Aç",
      galleryPlay: "Oynat",
      galleryClose: "Kapat",
      galleryLoading: "Yükleniyor…",
      galleryError: "İçerik listesi yüklenemedi.",
    },
    de: {
      tagline: "IMMERSIVES CHIRURGIE-TRAINING",
      heroTitle: "Wir schließen die Lücke<br>in der chirurgischen Ausbildung",
      heroLead:
        "In der medizinischen Ausbildung müssen Lernende an realen Patienten Erfahrungen sammeln, um die nötigen Fähigkeiten zu erwerben. Gleichzeitig muss die Sicherheit und das Wohlbefinden der Patientinnen und Patienten gewährleistet bleiben. Diese beiden Anforderungen können in der medizinischen Ausbildung zu einem Dilemma führen. Bei Non Nocere bieten wir eine immersive Lernerfahrung, die Lernenden dabei hilft, Operationen effizient und sicher durchzuführen.",
      menuPresentation: "Präsentation",
      menuPresentationHint: "Kuratierte visuelle Erzählung",
      menuVideo: "Video",
      menuVideoHint: "Cinematisches Storytelling",
      menuQuiz: "Quiz",
      menuQuizHint: "Interaktiver Wissenstest",
      enter: "Starten",
      back: "Zurück",
      comingSoon: "In Arbeit",
      stagePresentation: "Der Slider lebt später hier.",
      stageVideo: "Der Videoplayer lebt später hier.",
      stageQuiz: "Die Quiz-Mechanik lebt später hier.",
      quizQuestion: "Frage",
      quizPrev: "Zurück",
      quizNext: "Weiter",
      quizSubmit: "Absenden",
      quizRestart: "Neu Starten",
      quizHome: "Startseite",
      quizResultBadge: "Abgeschlossen",
      quizThankYouTitle: "Vielen Dank",
      quizThankYouMessage:
        "Vielen Dank für deine Teilnahme am Nonnocere-Erlebnis.",
      galleryEmptyPresentations:
        "Noch keine Präsentationen. Lege Dateien in content/presentations/ ab und lade die Seite neu.",
      galleryEmptyVideos:
        "Noch keine Videos. Lege Dateien in content/videos/ ab und lade die Seite neu.",
      galleryOpen: "Öffnen",
      galleryPlay: "Abspielen",
      galleryClose: "Schließen",
      galleryLoading: "Wird geladen…",
      galleryError: "Inhaltsliste konnte nicht geladen werden.",
    },
  };

  /* -------------------------------------------------- *
   *  Quiz questions
   *
   *  Loaded from content/quiz.json at runtime. The constant
   *  below is only a fallback that ships in the code so the
   *  site still works when opened via file:// (no fetch).
   * -------------------------------------------------- */
  // Each entry: { q: question, options: [5 strings], answer: indexOfCorrect }
  const QUIZ_FALLBACK = {
    en: [
      {
        q: "Which platform is the Nonnocere experience designed for?",
        options: [
          "Meta Quest",
          "PlayStation VR",
          "HTC Vive",
          "Apple Vision Pro",
          "Valve Index",
        ],
        answer: 0,
      },
      {
        q: "What is the central theme of Nonnocere?",
        options: [
          "Speed and competition",
          "Presence, perception and play",
          "Combat simulation",
          "Open-world exploration",
          "Puzzle solving",
        ],
        answer: 1,
      },
      {
        q: "Which best describes the visual language of the experience?",
        options: [
          "Photorealistic landscapes",
          "Cartoon and cel-shaded",
          "Spatial, minimal, luminous",
          "Pixel-art retro",
          "Hand-drawn 2D animation",
        ],
        answer: 2,
      },
      {
        q: "Which Latin maxim does the name “Nonnocere” evoke?",
        options: [
          "Cogito ergo sum",
          "Carpe diem",
          "Memento mori",
          "Primum non nocere",
          "Veni vidi vici",
        ],
        answer: 3,
      },
      {
        q: "What is the intended mode of engagement with the work?",
        options: [
          "Passive observation only",
          "High-intensity reflex play",
          "Multiplayer team battles",
          "Speedrun leaderboards",
          "Immersive contemplative interaction",
        ],
        answer: 4,
      },
    ],
    tr: [
      {
        q: "Nonnocere deneyimi hangi platform için tasarlandı?",
        options: [
          "Meta Quest",
          "PlayStation VR",
          "HTC Vive",
          "Apple Vision Pro",
          "Valve Index",
        ],
        answer: 0,
      },
      {
        q: "Nonnocere'in merkezindeki tema nedir?",
        options: [
          "Hız ve rekabet",
          "Varoluş, algı ve oyun",
          "Çatışma simülasyonu",
          "Açık dünya keşfi",
          "Bulmaca çözme",
        ],
        answer: 1,
      },
      {
        q: "Deneyimin görsel dilini en iyi hangisi tanımlar?",
        options: [
          "Fotogerçekçi manzaralar",
          "Çizgi film / cel-shaded",
          "Uzamsal, minimal, ışıltılı",
          "Piksel-art retro",
          "El çizimi 2D animasyon",
        ],
        answer: 2,
      },
      {
        q: "“Nonnocere” adı hangi Latince ilkeyi çağrıştırır?",
        options: [
          "Cogito ergo sum",
          "Carpe diem",
          "Memento mori",
          "Primum non nocere",
          "Veni vidi vici",
        ],
        answer: 3,
      },
      {
        q: "Eserle hedeflenen etkileşim biçimi nedir?",
        options: [
          "Yalnızca pasif izleme",
          "Yüksek tempolu refleks oyunu",
          "Çok oyunculu takım savaşı",
          "Speedrun sıralaması",
          "Sürükleyici, tefekküre dayalı etkileşim",
        ],
        answer: 4,
      },
    ],
    de: [
      {
        q: "Für welche Plattform wurde Nonnocere entwickelt?",
        options: [
          "Meta Quest",
          "PlayStation VR",
          "HTC Vive",
          "Apple Vision Pro",
          "Valve Index",
        ],
        answer: 0,
      },
      {
        q: "Was ist das zentrale Thema von Nonnocere?",
        options: [
          "Geschwindigkeit und Wettkampf",
          "Präsenz, Wahrnehmung und Spiel",
          "Kampfsimulation",
          "Open-World-Erkundung",
          "Rätsel lösen",
        ],
        answer: 1,
      },
      {
        q: "Welche Beschreibung passt am besten zur Bildsprache?",
        options: [
          "Fotorealistische Landschaften",
          "Cartoon / Cel-Shading",
          "Räumlich, minimal, leuchtend",
          "Pixelart-Retro",
          "Handgezeichnete 2D-Animation",
        ],
        answer: 2,
      },
      {
        q: "An welchen lateinischen Leitsatz erinnert der Name „Nonnocere“?",
        options: [
          "Cogito ergo sum",
          "Carpe diem",
          "Memento mori",
          "Primum non nocere",
          "Veni vidi vici",
        ],
        answer: 3,
      },
      {
        q: "Welche Interaktionsform ist mit dem Werk beabsichtigt?",
        options: [
          "Nur passives Beobachten",
          "Hochintensives Reflexspiel",
          "Mehrspieler-Team-Kämpfe",
          "Speedrun-Bestenlisten",
          "Immersive, kontemplative Interaktion",
        ],
        answer: 4,
      },
    ],
  };

  const STORAGE_KEY = "nonnocere.locale";
  const UPPERCASE_KEYS = new Set(["enter", "back", "comingSoon"]);

  function getInitialLocale() {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved && COPY[saved]) return saved;
    const nav = (navigator.language || "en").slice(0, 2).toLowerCase();
    return COPY[nav] ? nav : "en";
  }

  let currentLocale = "en";
  const localeListeners = new Set();

  function applyLocale(locale) {
    const dict = COPY[locale] || COPY.en;
    currentLocale = locale;
    document.documentElement.lang = locale;

    document.querySelectorAll("[data-i18n]").forEach((el) => {
      const key = el.getAttribute("data-i18n");
      const raw = dict[key];
      if (raw == null) return;

      const value = UPPERCASE_KEYS.has(key) ? raw.toUpperCase() : raw;
      if (value.includes("<br")) {
        el.innerHTML = value;
      } else {
        el.textContent = value;
      }
    });

    document.querySelectorAll(".lang-pill").forEach((btn) => {
      btn.classList.toggle("is-active", btn.dataset.locale === locale);
    });

    localeListeners.forEach((fn) => {
      try {
        fn(locale);
      } catch (e) {
        console.error(e);
      }
    });
  }

  function onLocaleChange(fn) {
    localeListeners.add(fn);
  }

  function bindLocaleSwitcher() {
    document.querySelectorAll(".lang-pill").forEach((btn) => {
      btn.addEventListener("click", () => {
        const next = btn.dataset.locale;
        if (!next || !COPY[next]) return;
        localStorage.setItem(STORAGE_KEY, next);
        applyLocale(next);
      });
    });
  }

  /* -------------------------------------------------- *
   *  HiDPI canvas helper
   * -------------------------------------------------- */
  function setupCanvas(canvas) {
    const ctx = canvas.getContext("2d");
    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    function resize() {
      const rect = canvas.getBoundingClientRect();
      canvas.width = Math.max(1, Math.floor(rect.width * dpr));
      canvas.height = Math.max(1, Math.floor(rect.height * dpr));
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    }

    resize();

    let resizeTimer = null;
    window.addEventListener("resize", () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(resize, 100);
    });

    return { ctx, getSize: () => canvas.getBoundingClientRect() };
  }

  /* -------------------------------------------------- *
   *  Ambient background — drifting radial glows
   *  Mirrors AmbientBackground / _AmbientPainter (32s loop)
   * -------------------------------------------------- */
  function initAmbient() {
    const canvas = document.getElementById("ambient-canvas");
    if (!canvas) return;

    const { ctx, getSize } = setupCanvas(canvas);
    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    const PERIOD_MS = 32_000;
    const start = performance.now();

    function paintGlow(cx, cy, radius, alpha) {
      const grad = ctx.createRadialGradient(cx, cy, 0, cx, cy, radius);
      grad.addColorStop(0, `rgba(36, 142, 141, ${alpha})`);
      grad.addColorStop(1, "rgba(36, 142, 141, 0)");
      ctx.fillStyle = grad;
      ctx.beginPath();
      ctx.arc(cx, cy, radius, 0, Math.PI * 2);
      ctx.fill();
    }

    function draw(now) {
      const { width: w, height: h } = getSize();
      ctx.clearRect(0, 0, w, h);

      const t = reduceMotion ? 0 : ((now - start) % PERIOD_MS) / PERIOD_MS;
      const angle = t * Math.PI * 2;
      const shortest = Math.min(w, h);

      const leftX = w * (0.18 + 0.04 * Math.sin(angle));
      const leftY = h * (0.32 + 0.04 * Math.cos(angle * 0.8));
      const rightX = w * (0.78 + 0.05 * Math.sin(angle * 0.6 + 1.2));
      const rightY = h * (0.72 + 0.05 * Math.cos(angle * 0.9 + 0.4));

      paintGlow(leftX, leftY, shortest * 0.55, 0.18);
      paintGlow(rightX, rightY, shortest * 0.65, 0.12);

      requestAnimationFrame(draw);
    }

    requestAnimationFrame(draw);
  }

  /* -------------------------------------------------- *
   *  Orbital core — 2D layer
   *
   *  Draws the ECG/heartbeat trace, the ambient center
   *  glow, and the outer "scope" ring. The 3D model (loaded
   *  via Three.js) renders on a sibling canvas in front of
   *  this one.
   * -------------------------------------------------- */
  function initOrbital() {
    const canvas = document.getElementById("orbital-canvas");
    if (!canvas) return;

    const { ctx, getSize } = setupCanvas(canvas);
    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    const SPIN_MS = 22_000;
    const BREATHE_MS = 6_000;
    const start = performance.now();

    function draw(now) {
      const { width: w, height: h } = getSize();
      ctx.clearRect(0, 0, w, h);

      const elapsed = now - start;
      const spin = reduceMotion ? 0 : (elapsed % SPIN_MS) / SPIN_MS;
      const breatheRaw = (elapsed % (BREATHE_MS * 2)) / BREATHE_MS;
      const breathe = reduceMotion
        ? 0.5
        : breatheRaw <= 1
          ? breatheRaw
          : 2 - breatheRaw;

      const cx = w / 2;
      const cy = h / 2;
      const radius = Math.min(w, h) / 2;

      const tSec = elapsed / 1000;

      drawECG(tSec, w, h);
      drawCenterGlow(cx, cy, radius, breathe);
      drawOuterRing(cx, cy, radius, spin);

      requestAnimationFrame(draw);
    }

    /* ----- ECG / heart-rhythm trace ----- */
    const ECG_WINDOW_SEC = 3.6;   // seconds of trace visible across full width
    const ECG_BPM_MIN = 52;       // slowest beat
    const ECG_BPM_MAX = 76;       // fastest beat

    // Pre-generated beat schedule with natural variance — populated lazily
    // as time advances. Each entry: { start, dur, amp, qrsShift }
    const beats = [];
    let beatCursor = 0;

    function rngBeatDuration() {
      const bpm = ECG_BPM_MIN + Math.random() * (ECG_BPM_MAX - ECG_BPM_MIN);
      return 60 / bpm;
    }

    function ensureBeats(tSec) {
      // Generate ahead of the leading edge
      while (beatCursor < tSec + 1.0) {
        const dur = rngBeatDuration();
        const amp = 0.82 + Math.random() * 0.32;     // 0.82..1.14 R height
        const qrsShift = (Math.random() - 0.5) * 0.02; // tiny horizontal jitter
        const skipT = Math.random() < 0.03;           // 3% chance: missed beat
        beats.push({
          start: beatCursor,
          dur: skipT ? dur * 1.6 : dur,
          amp: skipT ? 0.0 : amp,
          qrsShift,
        });
        beatCursor += skipT ? dur * 1.6 : dur;
      }
      // Trim beats that have fully scrolled off the left edge
      const cutoff = tSec - ECG_WINDOW_SEC - 1;
      while (beats.length > 0 && beats[0].start + beats[0].dur < cutoff) {
        beats.shift();
      }
    }

    function ecgShape(t) {
      // t ∈ [0, 1) — one full heartbeat (P, Q, R, S, T composite)
      let y = 0;
      if (t >= 0.08 && t <= 0.20)
        y += 0.18 * Math.sin((Math.PI * (t - 0.08)) / 0.12);
      if (t >= 0.24 && t <= 0.27)
        y -= 0.14 * Math.sin((Math.PI * (t - 0.24)) / 0.03);
      if (t >= 0.27 && t <= 0.32)
        y += 1.0 * Math.sin((Math.PI * (t - 0.27)) / 0.05);
      if (t >= 0.32 && t <= 0.36)
        y -= 0.32 * Math.sin((Math.PI * (t - 0.32)) / 0.04);
      if (t >= 0.42 && t <= 0.65)
        y += 0.30 * Math.sin((Math.PI * (t - 0.42)) / 0.23);
      return y;
    }

    function ecgValueAt(tSec) {
      // Find the beat covering tSec (linear scan is cheap — beats list stays small)
      for (let i = 0; i < beats.length; i++) {
        const b = beats[i];
        if (tSec >= b.start && tSec < b.start + b.dur) {
          const phase = (tSec - b.start) / b.dur + b.qrsShift;
          if (phase < 0 || phase >= 1) return 0;
          return ecgShape(phase) * b.amp;
        }
      }
      return 0;
    }

    function ecgBaselineDrift(tSec) {
      // Very slow low-amplitude wander — breath / motion artifact feel
      return 0.04 * Math.sin(tSec * 0.45) + 0.025 * Math.sin(tSec * 1.13 + 0.7);
    }

    function ecgMicroNoise(tSec) {
      // Deterministic high-freq noise via summed sines (no per-frame jitter)
      return (
        0.012 * Math.sin(tSec * 47.3 + 1.7) +
        0.008 * Math.sin(tSec * 113.1 + 0.4)
      );
    }

    function drawECG(tSec, w, h) {
      const baselineY = h * 0.5;
      const amplitude = h * 0.20;

      ensureBeats(tSec);

      // Faint horizontal baseline — "monitor" feel
      ctx.strokeStyle = "rgba(63, 177, 176, 0.08)";
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(0, baselineY);
      ctx.lineTo(w, baselineY);
      ctx.stroke();

      // Sample points across the canvas (every 2 px is plenty)
      const pts = [];
      for (let x = 0; x <= w; x += 2) {
        const pixelTime = tSec - ((w - x) / w) * ECG_WINDOW_SEC;
        const signal =
          ecgValueAt(pixelTime) +
          ecgBaselineDrift(pixelTime) +
          ecgMicroNoise(pixelTime);
        const y = baselineY - signal * amplitude;
        pts.push({ x, y });
      }

      // Horizontal alpha gradient — older parts fade, recent is bright
      const fadeGrad = ctx.createLinearGradient(0, 0, w, 0);
      fadeGrad.addColorStop(0, "rgba(63, 177, 176, 0.0)");
      fadeGrad.addColorStop(0.15, "rgba(63, 177, 176, 0.25)");
      fadeGrad.addColorStop(0.55, "rgba(63, 177, 176, 0.65)");
      fadeGrad.addColorStop(1, "rgba(63, 177, 176, 1.0)");

      // Glow pass (soft halo around the trace)
      ctx.save();
      ctx.shadowColor = "rgba(63, 177, 176, 0.85)";
      ctx.shadowBlur = 10;
      ctx.strokeStyle = fadeGrad;
      ctx.globalAlpha = 0.55;
      ctx.lineWidth = 2.2;
      ctx.lineCap = "round";
      ctx.lineJoin = "round";
      ctx.beginPath();
      for (let i = 0; i < pts.length; i++) {
        const p = pts[i];
        if (i === 0) ctx.moveTo(p.x, p.y);
        else ctx.lineTo(p.x, p.y);
      }
      ctx.stroke();
      ctx.restore();

      // Crisp trace
      ctx.strokeStyle = fadeGrad;
      ctx.lineWidth = 1.4;
      ctx.lineCap = "round";
      ctx.lineJoin = "round";
      ctx.beginPath();
      for (let i = 0; i < pts.length; i++) {
        const p = pts[i];
        if (i === 0) ctx.moveTo(p.x, p.y);
        else ctx.lineTo(p.x, p.y);
      }
      ctx.stroke();

      // Leading "reader" dot at the right edge
      const lead = pts[pts.length - 1];
      ctx.save();
      ctx.shadowColor = "rgba(232, 241, 242, 0.95)";
      ctx.shadowBlur = 14;
      ctx.fillStyle = "rgba(232, 241, 242, 0.95)";
      ctx.beginPath();
      ctx.arc(lead.x, lead.y, 3.2, 0, Math.PI * 2);
      ctx.fill();
      // Outer glow halo
      ctx.shadowBlur = 22;
      ctx.fillStyle = "rgba(63, 177, 176, 0.35)";
      ctx.beginPath();
      ctx.arc(lead.x, lead.y, 6, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();
    }

    function drawCenterGlow(cx, cy, radius, breathe) {
      const grad = ctx.createRadialGradient(cx, cy, 0, cx, cy, radius);
      grad.addColorStop(0, `rgba(36, 142, 141, ${0.28 + 0.05 * breathe})`);
      grad.addColorStop(0.55, "rgba(36, 142, 141, 0.10)");
      grad.addColorStop(1, "rgba(36, 142, 141, 0)");
      ctx.fillStyle = grad;
      ctx.beginPath();
      ctx.arc(cx, cy, radius, 0, Math.PI * 2);
      ctx.fill();
    }

    function drawOuterRing(cx, cy, radius, spin) {
      const ringRadius = radius * 0.94;

      ctx.strokeStyle = "rgba(36, 142, 141, 0.18)";
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.arc(cx, cy, ringRadius, 0, Math.PI * 2);
      ctx.stroke();

      const DOT_COUNT = 64;
      const rotation = spin * Math.PI * 2 * 0.4;
      for (let i = 0; i < DOT_COUNT; i++) {
        const theta = (i / DOT_COUNT) * Math.PI * 2 + rotation;
        const emphasis = (Math.sin(theta * 3 + spin * Math.PI * 2) + 1) / 2;
        const alpha = 0.1 + 0.55 * emphasis * emphasis;
        const px = cx + Math.cos(theta) * ringRadius;
        const py = cy + Math.sin(theta) * ringRadius;
        ctx.fillStyle = `rgba(63, 177, 176, ${alpha})`;
        ctx.beginPath();
        ctx.arc(px, py, 1.2 + 0.8 * emphasis, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    requestAnimationFrame(draw);
  }

  /* -------------------------------------------------- *
   *  3D model — Quest3 (Three.js, dynamic import)
   *
   *  Renders on the #orbital-3d canvas with a transparent
   *  background so the ECG / ring / glow drawn on the 2D
   *  canvas underneath remain visible.
   * -------------------------------------------------- */
  async function initThreeModel() {
    const canvas = document.getElementById("orbital-3d");
    if (!canvas) return;

    let THREE, GLTFLoader, RoomEnvironment;
    try {
      THREE = await import("https://esm.sh/three@0.160.0");
      const gltfMod = await import(
        "https://esm.sh/three@0.160.0/examples/jsm/loaders/GLTFLoader.js"
      );
      GLTFLoader = gltfMod.GLTFLoader;
      const envMod = await import(
        "https://esm.sh/three@0.160.0/examples/jsm/environments/RoomEnvironment.js"
      );
      RoomEnvironment = envMod.RoomEnvironment;
    } catch (e) {
      console.warn("Three.js failed to load:", e);
      return;
    }

    const rect = canvas.getBoundingClientRect();

    const renderer = new THREE.WebGLRenderer({
      canvas,
      alpha: true,
      antialias: true,
    });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    renderer.setSize(rect.width, rect.height, false);
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.1;

    const scene = new THREE.Scene();

    // Procedural indoor environment for nice PBR reflections
    const pmrem = new THREE.PMREMGenerator(renderer);
    scene.environment = pmrem.fromScene(new RoomEnvironment(), 0.04).texture;

    const camera = new THREE.PerspectiveCamera(
      32,
      rect.width / rect.height,
      0.01,
      100
    );
    camera.position.set(0, 0.05, 5);
    camera.lookAt(0, 0, 0);

    // Lighting — cool teal accents
    scene.add(new THREE.AmbientLight(0xa0c8c8, 0.35));

    const key = new THREE.DirectionalLight(0xffffff, 1.2);
    key.position.set(3, 3.5, 5);
    scene.add(key);

    const fill = new THREE.DirectionalLight(0x3fb1b0, 0.9);
    fill.position.set(-4, 1, 3);
    scene.add(fill);

    const rim = new THREE.DirectionalLight(0x88ddd9, 1.1);
    rim.position.set(0, -1, -5);
    scene.add(rim);

    let model = null;
    let mixer = null;
    let targetScale = 1;
    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    const loader = new GLTFLoader();
    loader.load(
      "assets/models/Model.glb",
      (gltf) => {
        model = gltf.scene;

        // Center
        const box = new THREE.Box3().setFromObject(model);
        const size = box.getSize(new THREE.Vector3());
        const center = box.getCenter(new THREE.Vector3());
        model.position.sub(center);

        // Scale so the visible front (width × height) fills the viewport.
        // We ignore depth here because the strap/back extends along Z and
        // doesn't add to the apparent size when the lenses face the camera.
        const fovHeight =
          2 * Math.tan((camera.fov * Math.PI) / 360) * camera.position.z;
        const target = fovHeight * 0.85;
        const maxVisible = Math.max(size.x, size.y);
        targetScale = target / maxVisible;
        model.scale.setScalar(0); // start at 0, animate up

        scene.add(model);

        // Pop-in animation
        const fadeStart = performance.now();
        const fadeMs = 700;
        function fadeIn() {
          const t = Math.min(1, (performance.now() - fadeStart) / fadeMs);
          const eased = 1 - Math.pow(1 - t, 3);
          model.scale.setScalar(eased * targetScale);
          if (t < 1) requestAnimationFrame(fadeIn);
        }
        fadeIn();

        // Embedded animations (if any)
        if (gltf.animations && gltf.animations.length > 0) {
          mixer = new THREE.AnimationMixer(model);
          for (const clip of gltf.animations) {
            mixer.clipAction(clip).play();
          }
        }
      },
      undefined,
      (err) => {
        console.warn("GLB load failed:", err);
      }
    );

    const clock = new THREE.Clock();
    function animate() {
      requestAnimationFrame(animate);
      const dt = clock.getDelta();
      if (mixer) mixer.update(dt);

      if (model && !reduceMotion) {
        // Continuous gentle yaw — full revolution every ~18s
        model.rotation.y += dt * ((Math.PI * 2) / 18);
        // Subtle bob
        model.position.y = Math.sin(clock.elapsedTime * 0.7) * 0.04;
      }

      renderer.render(scene, camera);
    }
    animate();

    // Resize handler
    let resizeTimer = null;
    window.addEventListener("resize", () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(() => {
        const r = canvas.getBoundingClientRect();
        if (r.width === 0 || r.height === 0) return;
        camera.aspect = r.width / r.height;
        camera.updateProjectionMatrix();
        renderer.setSize(r.width, r.height, false);
      }, 100);
    });
  }

  /* -------------------------------------------------- *
   *  Quiz controller
   *
   *  Loads questions from content/quiz.json. Two supported
   *  shapes:
   *    A) Per-locale arrays (same as fallback):
   *       { "en": [...], "tr": [...], "de": [...] }
   *    B) Per-question objects with locale fields:
   *       { "questions": [
   *           { "answer": 0,
   *             "en": { "q": "...", "options": ["...", ...] },
   *             "tr": { ... }, "de": { ... } }
   *         ] }
   * -------------------------------------------------- */
  let QUIZ_DATA = QUIZ_FALLBACK;

  async function loadQuizData() {
    try {
      const res = await fetch("content/quiz.json", { cache: "no-cache" });
      if (!res.ok) return;
      const json = await res.json();
      const normalized = normalizeQuizData(json);
      if (normalized) QUIZ_DATA = normalized;
    } catch (_) {
      // Stay on fallback (e.g. file:// or missing JSON)
    }
  }

  function normalizeQuizData(json) {
    if (!json || typeof json !== "object") return null;

    // Shape A: { en: [...], tr: [...], de: [...] }
    if (Array.isArray(json.en) || Array.isArray(json.tr) || Array.isArray(json.de)) {
      const out = {};
      for (const loc of ["en", "tr", "de"]) {
        if (Array.isArray(json[loc])) out[loc] = json[loc];
      }
      return Object.keys(out).length ? out : null;
    }

    // Shape B: { questions: [{ answer, en:{q,options}, tr:{...}, de:{...} }] }
    if (Array.isArray(json.questions)) {
      const out = { en: [], tr: [], de: [] };
      for (const item of json.questions) {
        if (typeof item.answer !== "number") continue;
        for (const loc of ["en", "tr", "de"]) {
          const localized = item[loc] || item.en;
          if (!localized || !localized.q || !Array.isArray(localized.options)) {
            continue;
          }
          out[loc].push({
            q: localized.q,
            options: localized.options,
            answer: item.answer,
          });
        }
      }
      return out.en.length || out.tr.length || out.de.length ? out : null;
    }

    return null;
  }

  function initQuiz() {
    const card = document.getElementById("quiz-card");
    if (!card) return;

    const optionsEl = document.getElementById("quiz-options");
    const questionEl = document.getElementById("quiz-question");
    const currentEl = document.getElementById("quiz-current");
    const totalEl = document.getElementById("quiz-total");
    const progressEl = document.getElementById("quiz-progress-fill");
    const prevBtn = document.getElementById("quiz-prev");
    const nextBtn = document.getElementById("quiz-next");
    const submitBtn = document.getElementById("quiz-submit");

    const resultEl = document.getElementById("quiz-result");
    const restartBtn = document.getElementById("quiz-restart");

    const OPTION_LETTERS = ["A", "B", "C", "D", "E", "F", "G", "H"];

    const state = {
      index: 0,
      answers: [],
      submitted: false,
    };

    function questions() {
      const data = QUIZ_DATA || QUIZ_FALLBACK;
      return (
        data[currentLocale] ||
        data.en ||
        data.tr ||
        data.de ||
        []
      );
    }

    function total() {
      return questions().length;
    }

    function render() {
      const qs = questions();
      if (qs.length === 0) {
        questionEl.textContent = "—";
        optionsEl.innerHTML = "";
        prevBtn.disabled = true;
        nextBtn.disabled = true;
        submitBtn.hidden = true;
        return;
      }

      if (state.index >= qs.length) state.index = qs.length - 1;
      const q = qs[state.index];

      totalEl.textContent = qs.length;
      currentEl.textContent = state.index + 1;

      const progress = ((state.index + 1) / qs.length) * 100;
      progressEl.style.width = progress + "%";

      questionEl.textContent = q.q;

      // Rebuild options
      optionsEl.innerHTML = "";
      q.options.forEach((label, i) => {
        const li = document.createElement("li");
        const btn = document.createElement("button");
        btn.type = "button";
        btn.className = "quiz-option";
        btn.setAttribute("role", "radio");
        const isSelected = state.answers[state.index] === i;
        btn.setAttribute("aria-checked", isSelected ? "true" : "false");
        if (isSelected) btn.classList.add("is-selected");

        const marker = document.createElement("span");
        marker.className = "quiz-option__marker";
        marker.textContent = OPTION_LETTERS[i] || String(i + 1);

        const text = document.createElement("span");
        text.className = "quiz-option__label";
        text.textContent = label;

        const check = document.createElementNS(
          "http://www.w3.org/2000/svg",
          "svg"
        );
        check.setAttribute("class", "quiz-option__check");
        check.setAttribute("viewBox", "0 0 24 24");
        check.setAttribute("fill", "none");
        check.setAttribute("stroke", "currentColor");
        check.setAttribute("stroke-width", "2.4");
        check.setAttribute("stroke-linecap", "round");
        check.setAttribute("stroke-linejoin", "round");
        const path = document.createElementNS(
          "http://www.w3.org/2000/svg",
          "path"
        );
        path.setAttribute("d", "M20 6 9 17l-5-5");
        check.appendChild(path);

        btn.appendChild(marker);
        btn.appendChild(text);
        btn.appendChild(check);

        btn.addEventListener("click", () => selectOption(i));

        li.appendChild(btn);
        optionsEl.appendChild(li);
      });

      // Navigation state
      const isLast = state.index === qs.length - 1;
      const hasAnswer = state.answers[state.index] != null;

      prevBtn.disabled = state.index === 0;

      if (isLast) {
        nextBtn.hidden = true;
        submitBtn.hidden = false;
        submitBtn.disabled = !hasAnswer;
      } else {
        nextBtn.hidden = false;
        submitBtn.hidden = true;
        nextBtn.disabled = !hasAnswer;
      }
    }

    function selectOption(i) {
      state.answers[state.index] = i;
      Array.from(optionsEl.querySelectorAll(".quiz-option")).forEach(
        (el, idx) => {
          const sel = idx === i;
          el.classList.toggle("is-selected", sel);
          el.setAttribute("aria-checked", sel ? "true" : "false");
        }
      );

      const isLast = state.index === total() - 1;
      if (isLast) {
        submitBtn.disabled = false;
      } else {
        nextBtn.disabled = false;
      }
    }

    function go(delta) {
      const next = state.index + delta;
      if (next < 0 || next >= total()) return;
      state.index = next;
      render();
      card.scrollIntoView({ behavior: "smooth", block: "start" });
    }

    function submit() {
      state.submitted = true;
      card.hidden = true;
      resultEl.hidden = false;
      resultEl.scrollIntoView({ behavior: "smooth", block: "start" });
    }

    function restart() {
      state.index = 0;
      state.answers = [];
      state.submitted = false;
      resultEl.hidden = true;
      card.hidden = false;
      render();
      card.scrollIntoView({ behavior: "smooth", block: "start" });
    }

    prevBtn.addEventListener("click", () => go(-1));
    nextBtn.addEventListener("click", () => go(1));
    submitBtn.addEventListener("click", submit);
    restartBtn.addEventListener("click", restart);

    onLocaleChange(() => {
      // Re-render with new locale; answers stay (indices unchanged).
      if (!card.hidden) render();
    });

    // Initial paint with whatever data is available (fallback first),
    // then re-render after JSON loads.
    render();
    loadQuizData().then(() => {
      // Clamp state in case the new question count is smaller.
      if (state.index >= total()) state.index = Math.max(0, total() - 1);
      // If items were previously answered with stale indices, leave them —
      // the user can re-select. We just refresh the view.
      if (!card.hidden) render();
    });
  }

  /* -------------------------------------------------- *
   *  Gallery (presentation / video)
   *
   *  Loads content/<folder>/manifest.json. Manifest shape:
   *    { "items": [
   *        { "file": "intro.pdf", "title": "Introduction" }
   *        — title is optional and may be a string OR
   *          { "en": "...", "tr": "...", "de": "..." }
   *      ]
   *    }
   * -------------------------------------------------- */
  const VIDEO_EXT = new Set(["mp4", "webm", "ogg", "mov", "m4v"]);
  const IMAGE_EXT = new Set(["png", "jpg", "jpeg", "webp", "gif", "avif", "svg"]);
  const PDF_EXT = new Set(["pdf"]);

  function fileExt(name) {
    const dot = name.lastIndexOf(".");
    return dot === -1 ? "" : name.slice(dot + 1).toLowerCase();
  }

  function fileBaseName(name) {
    const slash = Math.max(name.lastIndexOf("/"), name.lastIndexOf("\\"));
    const base = slash >= 0 ? name.slice(slash + 1) : name;
    const dot = base.lastIndexOf(".");
    return dot === -1 ? base : base.slice(0, dot);
  }

  function fileKind(name) {
    const ext = fileExt(name);
    if (VIDEO_EXT.has(ext)) return "video";
    if (IMAGE_EXT.has(ext)) return "image";
    if (PDF_EXT.has(ext)) return "pdf";
    return "other";
  }

  const VIDEO_MIME = {
    mp4: "video/mp4",
    m4v: "video/mp4",
    webm: "video/webm",
    ogg: "video/ogg",
    mov: "video/quicktime",
  };

  // Build <source> elements for a video. We always emit a WebM sibling first
  // (VP9/Opus works in OSS Chromium webviews — e.g. Unity Vuplex on Windows —
  // which lack H.264/AAC), then the original file as a fallback for browsers
  // that don't have a WebM. If the WebM doesn't exist on disk the browser
  // just falls through to the next <source>.
  function setVideoSources(vid, src) {
    const ext = fileExt(src);
    const dot = src.lastIndexOf(".");
    const base = dot >= 0 ? src.slice(0, dot) : src;
    const sources = [];
    if (ext !== "webm") sources.push({ src: `${base}.webm`, type: "video/webm" });
    sources.push({ src, type: VIDEO_MIME[ext] || "" });
    sources.forEach(({ src: s, type }) => {
      const el = document.createElement("source");
      el.src = s;
      if (type) el.type = type;
      vid.appendChild(el);
    });
  }

  function resolveTitle(item) {
    if (!item) return "";
    const raw = item.title;
    if (!raw) return fileBaseName(item.file || "");
    if (typeof raw === "string") return raw;
    if (typeof raw === "object") {
      return raw[currentLocale] || raw.en || raw.tr || raw.de || fileBaseName(item.file || "");
    }
    return fileBaseName(item.file || "");
  }

  function initGallery() {
    const root = document.querySelector("[data-gallery]");
    if (!root) return;

    const folder = root.dataset.gallery; // "presentations" | "videos"
    const emptyKey =
      folder === "videos" ? "galleryEmptyVideos" : "galleryEmptyPresentations";

    let items = [];

    async function load() {
      renderState("loading");
      try {
        const res = await fetch(`content/${folder}/manifest.json`, {
          cache: "no-cache",
        });
        if (!res.ok) {
          items = [];
          renderItems();
          return;
        }
        const json = await res.json();
        items = Array.isArray(json) ? json : Array.isArray(json.items) ? json.items : [];
        // Normalize entries that are bare filename strings.
        items = items
          .map((it) => (typeof it === "string" ? { file: it } : it))
          .filter((it) => it && typeof it.file === "string" && it.file.length);
        renderItems();
      } catch (e) {
        renderState("error");
      }
    }

    function renderState(kind) {
      const dict = COPY[currentLocale] || COPY.en;
      const message =
        kind === "loading"
          ? dict.galleryLoading
          : kind === "error"
            ? dict.galleryError
            : dict[emptyKey];
      root.innerHTML = `<div class="gallery__empty">${escapeHtml(message)}</div>`;
    }

    function renderItems() {
      if (items.length === 0) {
        renderState("empty");
        return;
      }
      const dict = COPY[currentLocale] || COPY.en;
      const grid = document.createElement("ul");
      grid.className = "gallery__grid";
      grid.setAttribute("role", "list");

      items.forEach((item, idx) => {
        const li = document.createElement("li");
        const card = document.createElement("button");
        card.type = "button";
        card.className = "gallery-card";
        card.dataset.index = String(idx);

        const kind = fileKind(item.file);
        const src = `content/${folder}/${item.file}`;

        const thumb = document.createElement("span");
        thumb.className = "gallery-card__thumb";
        thumb.dataset.kind = kind;

        if (kind === "image") {
          const img = document.createElement("img");
          img.src = src;
          img.alt = "";
          img.loading = "lazy";
          thumb.appendChild(img);
        } else if (kind === "video") {
          // Lightweight preview: video with no controls, paused.
          const vid = document.createElement("video");
          vid.muted = true;
          vid.playsInline = true;
          vid.preload = "metadata";
          setVideoSources(vid, src);
          thumb.appendChild(vid);
          thumb.appendChild(iconPlay());
        } else if (kind === "pdf") {
          thumb.appendChild(iconDoc());
        } else {
          thumb.appendChild(iconDoc());
        }

        const body = document.createElement("span");
        body.className = "gallery-card__body";

        const title = document.createElement("span");
        title.className = "gallery-card__title";
        title.textContent = resolveTitle(item);

        const meta = document.createElement("span");
        meta.className = "gallery-card__meta";
        meta.textContent = (kind === "other" ? fileExt(item.file) : kind).toUpperCase();

        const action = document.createElement("span");
        action.className = "gallery-card__action";
        action.textContent = (kind === "video"
          ? dict.galleryPlay
          : dict.galleryOpen
        ).toUpperCase();

        body.appendChild(title);
        body.appendChild(meta);

        card.appendChild(thumb);
        card.appendChild(body);
        card.appendChild(action);

        card.addEventListener("click", () => openViewer(item, kind, src));

        li.appendChild(card);
        grid.appendChild(li);
      });

      root.innerHTML = "";
      root.appendChild(grid);
    }

    onLocaleChange(() => {
      // Re-render with new copy / titles
      if (items.length === 0) renderState("empty");
      else renderItems();
    });

    load();
  }

  function iconPlay() {
    const svgNS = "http://www.w3.org/2000/svg";
    const wrap = document.createElement("span");
    wrap.className = "gallery-card__play";
    const svg = document.createElementNS(svgNS, "svg");
    svg.setAttribute("viewBox", "0 0 24 24");
    svg.setAttribute("aria-hidden", "true");
    const path = document.createElementNS(svgNS, "path");
    path.setAttribute("d", "M9 7v10l8-5z");
    path.setAttribute("fill", "currentColor");
    svg.appendChild(path);
    wrap.appendChild(svg);
    return wrap;
  }

  function iconDoc() {
    const svgNS = "http://www.w3.org/2000/svg";
    const wrap = document.createElement("span");
    wrap.className = "gallery-card__doc";
    const svg = document.createElementNS(svgNS, "svg");
    svg.setAttribute("viewBox", "0 0 24 24");
    svg.setAttribute("fill", "none");
    svg.setAttribute("stroke", "currentColor");
    svg.setAttribute("stroke-width", "1.5");
    svg.setAttribute("stroke-linecap", "round");
    svg.setAttribute("stroke-linejoin", "round");
    svg.setAttribute("aria-hidden", "true");
    const path1 = document.createElementNS(svgNS, "path");
    path1.setAttribute("d", "M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8z");
    const path2 = document.createElementNS(svgNS, "path");
    path2.setAttribute("d", "M14 3v5h5");
    const path3 = document.createElementNS(svgNS, "path");
    path3.setAttribute("d", "M9 13h6M9 17h6M9 9h2");
    svg.appendChild(path1);
    svg.appendChild(path2);
    svg.appendChild(path3);
    wrap.appendChild(svg);
    return wrap;
  }

  function escapeHtml(s) {
    return String(s).replace(/[&<>"']/g, (c) =>
      ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]
    );
  }

  /* -------------------------------------------------- *
   *  Slideshow (one-at-a-time, prev/next, keyboard)
   *
   *  Reads content/<folder>/manifest.json — same shape as
   *  the gallery. Images, videos and PDFs are all supported.
   * -------------------------------------------------- */
  function initSlideshow() {
    const root = document.querySelector("[data-slideshow]");
    if (!root) return;

    const folder = root.dataset.slideshow;
    const viewport = root.querySelector("#slideshow-viewport");
    const prevBtn = root.querySelector("#slideshow-prev");
    const nextBtn = root.querySelector("#slideshow-next");
    const currentEl = root.querySelector("#slideshow-current");
    const totalEl = root.querySelector("#slideshow-total");
    const dotsEl = root.querySelector("#slideshow-dots");
    const titleEl = root.querySelector("#slideshow-title");
    const emptyEl = root.querySelector("#slideshow-empty");
    const fsBtn = root.querySelector("#slideshow-fullscreen");

    const emptyKey =
      folder === "videos" ? "galleryEmptyVideos" : "galleryEmptyPresentations";

    let items = [];
    let index = 0;
    const slideNodes = new Map(); // index -> media element (lazy)

    async function load() {
      try {
        const res = await fetch(`content/${folder}/manifest.json`, {
          cache: "no-cache",
        });
        if (!res.ok) {
          showEmpty();
          return;
        }
        const json = await res.json();
        const raw = Array.isArray(json) ? json : Array.isArray(json.items) ? json.items : [];
        items = raw
          .map((it) => (typeof it === "string" ? { file: it } : it))
          .filter((it) => it && typeof it.file === "string" && it.file.length);

        if (items.length === 0) {
          showEmpty();
          return;
        }
        render();
      } catch (e) {
        showEmpty(true);
      }
    }

    function showEmpty(isError = false) {
      items = [];
      viewport.innerHTML = "";
      slideNodes.clear();
      prevBtn.hidden = true;
      nextBtn.hidden = true;
      currentEl.textContent = "0";
      totalEl.textContent = "0";
      dotsEl.innerHTML = "";
      titleEl.textContent = "";
      const dict = COPY[currentLocale] || COPY.en;
      emptyEl.hidden = false;
      emptyEl.textContent = isError ? dict.galleryError : dict[emptyKey];
    }

    function ensureSlideNode(i) {
      if (slideNodes.has(i)) return slideNodes.get(i);
      const item = items[i];
      const kind = fileKind(item.file);
      const src = `content/${folder}/${item.file}`;

      const slide = document.createElement("div");
      slide.className = "slideshow__slide";
      slide.dataset.kind = kind;

      if (kind === "image") {
        const img = document.createElement("img");
        img.src = src;
        img.alt = resolveTitle(item);
        img.loading = "lazy";
        slide.appendChild(img);
      } else if (kind === "video") {
        const vid = document.createElement("video");
        vid.controls = true;
        vid.playsInline = true;
        vid.preload = "metadata";
        setVideoSources(vid, src);
        slide.appendChild(vid);
      } else if (kind === "pdf") {
        const iframe = document.createElement("iframe");
        iframe.src = src + "#view=FitH";
        iframe.title = resolveTitle(item);
        slide.appendChild(iframe);
      } else {
        const link = document.createElement("a");
        link.href = src;
        link.target = "_blank";
        link.rel = "noopener";
        link.textContent = resolveTitle(item);
        slide.appendChild(link);
      }

      viewport.appendChild(slide);
      slideNodes.set(i, slide);
      return slide;
    }

    function render() {
      emptyEl.hidden = true;
      prevBtn.hidden = items.length <= 1;
      nextBtn.hidden = items.length <= 1;

      totalEl.textContent = items.length;
      currentEl.textContent = index + 1;
      titleEl.textContent = resolveTitle(items[index]);

      // Dots
      dotsEl.innerHTML = "";
      items.forEach((_, i) => {
        const dot = document.createElement("button");
        dot.type = "button";
        dot.className = "slideshow__dot";
        dot.setAttribute("role", "tab");
        dot.setAttribute("aria-label", `Slide ${i + 1}`);
        if (i === index) {
          dot.classList.add("is-active");
          dot.setAttribute("aria-selected", "true");
        } else {
          dot.setAttribute("aria-selected", "false");
        }
        dot.addEventListener("click", () => goTo(i));
        dotsEl.appendChild(dot);
      });

      // Materialize current + neighbors for snappy transitions
      ensureSlideNode(index);
      if (items.length > 1) {
        ensureSlideNode((index + 1) % items.length);
        ensureSlideNode((index - 1 + items.length) % items.length);
      }

      // Activate the right slide, deactivate others
      slideNodes.forEach((node, i) => {
        const active = i === index;
        node.classList.toggle("is-active", active);
        // Pause any video on inactive slides
        if (!active) {
          const v = node.querySelector("video");
          if (v && !v.paused) v.pause();
        }
      });
    }

    function goTo(i) {
      if (items.length === 0) return;
      index = ((i % items.length) + items.length) % items.length;
      render();
    }

    function next() {
      goTo(index + 1);
    }
    function prev() {
      goTo(index - 1);
    }

    prevBtn.addEventListener("click", prev);
    nextBtn.addEventListener("click", next);

    document.addEventListener("keydown", (e) => {
      const tag = (e.target.tagName || "").toLowerCase();
      if (tag === "input" || tag === "textarea") return;
      if (items.length > 1) {
        if (e.key === "ArrowRight") {
          e.preventDefault();
          next();
          return;
        }
        if (e.key === "ArrowLeft") {
          e.preventDefault();
          prev();
          return;
        }
      }
      // "f" toggles fullscreen (only when the slideshow page is active)
      if (e.key === "f" || e.key === "F") {
        e.preventDefault();
        toggleFullscreen();
      }
    });

    /* Fullscreen toggle */
    function isFullscreen() {
      return (
        document.fullscreenElement === root ||
        document.webkitFullscreenElement === root
      );
    }

    function toggleFullscreen() {
      if (isFullscreen()) {
        if (document.exitFullscreen) document.exitFullscreen();
        else if (document.webkitExitFullscreen) document.webkitExitFullscreen();
        return;
      }
      const req =
        root.requestFullscreen || root.webkitRequestFullscreen;
      if (req) {
        const p = req.call(root);
        if (p && typeof p.catch === "function") p.catch(() => {});
      }
    }

    function syncFullscreenClass() {
      const isFs = isFullscreen();
      root.classList.toggle("is-fullscreen", isFs);
    }

    if (fsBtn) {
      fsBtn.addEventListener("click", toggleFullscreen);
    }
    document.addEventListener("fullscreenchange", syncFullscreenClass);
    document.addEventListener("webkitfullscreenchange", syncFullscreenClass);

    // Swipe / drag on touch & mouse
    let pointerDown = null;
    viewport.addEventListener("pointerdown", (e) => {
      if (e.target.closest("video, iframe, a, button")) return;
      pointerDown = { x: e.clientX, y: e.clientY };
    });
    viewport.addEventListener("pointerup", (e) => {
      if (!pointerDown) return;
      const dx = e.clientX - pointerDown.x;
      const dy = e.clientY - pointerDown.y;
      pointerDown = null;
      if (Math.abs(dx) > 40 && Math.abs(dx) > Math.abs(dy)) {
        if (dx < 0) next();
        else prev();
      }
    });
    viewport.addEventListener("pointercancel", () => {
      pointerDown = null;
    });

    onLocaleChange(() => {
      if (items.length === 0) {
        // Re-render empty message
        showEmpty(false);
      } else {
        titleEl.textContent = resolveTitle(items[index]);
      }
    });

    load();
  }

  /* -------------------------------------------------- *
   *  Viewer modal
   * -------------------------------------------------- */
  function ensureViewer() {
    let overlay = document.getElementById("viewer-overlay");
    if (overlay) return overlay;

    overlay = document.createElement("div");
    overlay.id = "viewer-overlay";
    overlay.className = "viewer";
    overlay.hidden = true;
    overlay.innerHTML = `
      <button type="button" class="viewer__close" aria-label="Close">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <path d="M18 6 6 18M6 6l12 12"/>
        </svg>
      </button>
      <div class="viewer__stage" id="viewer-stage"></div>
      <p class="viewer__caption" id="viewer-caption"></p>
    `;
    document.body.appendChild(overlay);

    overlay.addEventListener("click", (e) => {
      if (e.target === overlay) closeViewer();
    });
    overlay.querySelector(".viewer__close").addEventListener("click", closeViewer);
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && !overlay.hidden) closeViewer();
    });
    return overlay;
  }

  function openViewer(item, kind, src) {
    const overlay = ensureViewer();
    const stage = overlay.querySelector("#viewer-stage");
    const caption = overlay.querySelector("#viewer-caption");
    stage.innerHTML = "";
    caption.textContent = resolveTitle(item);

    if (kind === "video") {
      const v = document.createElement("video");
      v.controls = true;
      v.autoplay = true;
      v.playsInline = true;
      v.className = "viewer__video";
      setVideoSources(v, src);
      stage.appendChild(v);
    } else if (kind === "image") {
      const img = document.createElement("img");
      img.src = src;
      img.alt = resolveTitle(item);
      img.className = "viewer__image";
      stage.appendChild(img);
    } else if (kind === "pdf") {
      const iframe = document.createElement("iframe");
      iframe.src = src + "#view=FitH";
      iframe.title = resolveTitle(item);
      iframe.className = "viewer__pdf";
      stage.appendChild(iframe);
    } else {
      const a = document.createElement("a");
      a.href = src;
      a.target = "_blank";
      a.rel = "noopener";
      a.className = "viewer__download";
      a.textContent = resolveTitle(item);
      stage.appendChild(a);
    }

    overlay.hidden = false;
    document.body.style.overflow = "hidden";
  }

  function closeViewer() {
    const overlay = document.getElementById("viewer-overlay");
    if (!overlay) return;
    const stage = overlay.querySelector("#viewer-stage");
    // Stop any playing video to release audio
    const video = stage.querySelector("video");
    if (video) {
      video.pause();
      video.removeAttribute("src");
      video.load();
    }
    stage.innerHTML = "";
    overlay.hidden = true;
    document.body.style.overflow = "";
  }

  /* -------------------------------------------------- *
   *  Page enter transition (fade + slight slide-up)
   *  Mirrors GoRouter's CustomTransitionPage fade.
   * -------------------------------------------------- */
  function playEnterTransition() {
    document.body.style.opacity = "0";
    document.body.style.transform = "translateY(6px)";
    requestAnimationFrame(() => {
      document.body.style.transition =
        "opacity 420ms cubic-bezier(0.22, 1, 0.36, 1), transform 420ms cubic-bezier(0.22, 1, 0.36, 1)";
      document.body.style.opacity = "1";
      document.body.style.transform = "translateY(0)";
    });
  }

  /* -------------------------------------------------- *
   *  Boot
   * -------------------------------------------------- */
  function boot() {
    // Set initial locale first so quiz/gallery render with the right language.
    currentLocale = getInitialLocale();
    applyLocale(currentLocale);
    bindLocaleSwitcher();
    initAmbient();
    initOrbital();
    initQuiz();
    initGallery();
    initSlideshow();
    initThreeModel();
    playEnterTransition();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", boot);
  } else {
    boot();
  }
})();
