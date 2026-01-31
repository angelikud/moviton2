/* ═══════════════════════════════════════════════════
   MovitOn Presale — Main JavaScript
   
   ⚙️ QUICK EDIT GUIDE:
   - Change TGE date: edit tgeDate below
   - Change raised amount: edit raisedPercent below
   - Change roadmap progress: edit roadmapPercent below
   ═══════════════════════════════════════════════════ */

// ── CONFIG (edit these values) ──────────────────────
const tgeDate = new Date('2026-03-15T12:00:00Z').getTime();
const raisedPercent = 57;   // progress bar fill %
const roadmapPercent = 58;  // roadmap line fill %
// ────────────────────────────────────────────────────


// ═══════════ COUNTDOWN TIMER ═══════════
function initCountdown() {
  function update() {
    const now = Date.now();
    const diff = Math.max(0, tgeDate - now);
    const d = Math.floor(diff / 86400000);
    const h = Math.floor((diff % 86400000) / 3600000);
    const m = Math.floor((diff % 3600000) / 60000);
    const s = Math.floor((diff % 60000) / 1000);
    const pad = n => String(n).padStart(2, '0');

    // Main widget
    document.getElementById('cdd').textContent = pad(d);
    document.getElementById('cdh').textContent = pad(h);
    document.getElementById('cdm').textContent = pad(m);
    document.getElementById('cds').textContent = pad(s);

    // Sticky bar
    document.getElementById('sbd').textContent = pad(d);
    document.getElementById('sbh').textContent = pad(h);
    document.getElementById('sbm').textContent = pad(m);
    document.getElementById('sbs').textContent = pad(s);
  }
  update();
  setInterval(update, 1000);
}


// ═══════════ SCROLL REVEAL ═══════════
function initReveal() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('vis');
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

  document.querySelectorAll('.rv').forEach(el => observer.observe(el));
}


// ═══════════ STICKY BOTTOM BAR ═══════════
function initStickyBar() {
  window.addEventListener('scroll', () => {
    document.getElementById('sb').classList.toggle('vis', window.scrollY > 600);
  });
}


// ═══════════ FAQ TOGGLE ═══════════
function toggleFaq(btn) {
  const item = btn.parentElement;
  const wasOpen = item.classList.contains('op');
  document.querySelectorAll('.fqi').forEach(i => i.classList.remove('op'));
  if (!wasOpen) item.classList.add('op');
}

// Make global for onclick
window.tfaq = toggleFaq;


// ═══════════ TABS + PHONE SCREEN SYNC ═══════════
const appScreenMap = { home: 'tf', orders: 'th', marketplace: 'tm' };
const appScreens = ['home', 'orders', 'marketplace'];

function switchAppScreen(screenId) {
  var current = document.querySelector('.app-demo .scr.active');
  var next = document.getElementById('app-' + screenId);
  if (!current || !next || current === next) return;
  current.classList.add('exit');
  current.classList.remove('active');
  setTimeout(function() {
    current.classList.remove('exit');
    next.classList.add('active');
  }, 50);
  // Update phone tabs
  document.querySelectorAll('.app-demo .tab').forEach(function(t) { t.classList.remove('on'); });
  var phoneTab = document.querySelector('[data-app-screen="' + screenId + '"]');
  if (phoneTab) phoneTab.classList.add('on');
}

function switchTab(btn, id) {
  document.querySelectorAll('.ptb').forEach(function(b) { b.classList.remove('act'); });
  document.querySelectorAll('.tc').forEach(function(c) { c.classList.remove('act'); });
  btn.classList.add('act');
  document.getElementById(id).classList.add('act');
  // Switch phone screen
  var phoneScreen = btn.dataset.phone;
  if (phoneScreen) switchAppScreen(phoneScreen);
}

// Make global for onclick
window.stab = switchTab;

function initPhoneTabs() {
  document.querySelectorAll('.app-demo .tab').forEach(function(tab) {
    tab.addEventListener('click', function() {
      var screenId = tab.dataset.appScreen;
      if (appScreens.indexOf(screenId) !== -1) {
        switchAppScreen(screenId);
        // Sync section tabs
        var tabId = appScreenMap[screenId];
        if (tabId) {
          var sectionBtn = document.querySelector('.ptb[data-phone="' + screenId + '"]');
          if (sectionBtn) {
            document.querySelectorAll('.ptb').forEach(function(b) { b.classList.remove('act'); });
            document.querySelectorAll('.tc').forEach(function(c) { c.classList.remove('act'); });
            sectionBtn.classList.add('act');
            document.getElementById(tabId).classList.add('act');
          }
        }
      } else {
        // Wallet/Chat - just highlight the phone tab
        document.querySelectorAll('.app-demo .tab').forEach(function(t) { t.classList.remove('on'); });
        tab.classList.add('on');
      }
    });
  });
}


// ═══════════ ANIMATED COUNTER ═══════════
function initCounters() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const el = entry.target;
        const target = parseInt(el.dataset.count);
        if (!target || el.dataset.animated) return;
        el.dataset.animated = '1';
        let current = 0;
        const step = target / 60;
        const timer = setInterval(() => {
          current += step;
          if (current >= target) {
            current = target;
            clearInterval(timer);
          }
          el.textContent = Math.floor(current) + 'M';
        }, 16);
      }
    });
  }, { threshold: 0.5 });

  document.querySelectorAll('[data-count]').forEach(el => observer.observe(el));
}


// ═══════════ GLOBE CANVAS — ANIMATED DOTS ═══════════
function initGlobe() {
  const canvas = document.getElementById('gc');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  let w, h;
  const dots = [];

  function resize() {
    w = canvas.width = canvas.offsetWidth;
    h = canvas.height = canvas.offsetHeight;
  }
  resize();
  window.addEventListener('resize', resize);

  function addDot() {
    if (dots.length > 40) return;
    const isCourier = Math.random() > 0.5;
    dots.push({
      x: Math.random() * w,
      y: h * 0.2 + Math.random() * h * 0.6,
      r: 2 + Math.random() * 3,
      type: isCourier ? 'c' : 's',  // courier or sender
      alpha: 0,
      maxAlpha: 0.4 + Math.random() * 0.5,
      speed: 0.01 + Math.random() * 0.02,
      life: 0,
      maxLife: 200 + Math.random() * 300
    });
  }

  function draw() {
    ctx.clearRect(0, 0, w, h);

    // Draw connections between different types
    for (let i = 0; i < dots.length; i++) {
      for (let j = i + 1; j < dots.length; j++) {
        const dx = dots[i].x - dots[j].x;
        const dy = dots[i].y - dots[j].y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 200 && dots[i].type !== dots[j].type) {
          ctx.beginPath();
          const mx = (dots[i].x + dots[j].x) / 2;
          const my = (dots[i].y + dots[j].y) / 2 - 30;
          ctx.moveTo(dots[i].x, dots[i].y);
          ctx.quadraticCurveTo(mx, my, dots[j].x, dots[j].y);
          const alpha = Math.max(0, 1 - dist / 200) * 0.3 * Math.min(dots[i].alpha, dots[j].alpha);
          ctx.strokeStyle = `rgba(240,194,74,${alpha})`;
          ctx.lineWidth = 1;
          ctx.stroke();
        }
      }
    }

    // Draw dots with glow
    dots.forEach(dot => {
      dot.life++;
      // Fade in/out
      if (dot.life < 30) {
        dot.alpha = (dot.life / 30) * dot.maxAlpha;
      } else if (dot.life > dot.maxLife - 30) {
        dot.alpha = ((dot.maxLife - dot.life) / 30) * dot.maxAlpha;
      } else {
        dot.alpha = dot.maxAlpha + Math.sin(dot.life * dot.speed) * 0.15;
      }

      // Color: green=courier, gold=sender
      const color = dot.type === 'c' ? [150, 255, 153] : [240, 194, 74];

      // Outer glow
      const gradient = ctx.createRadialGradient(dot.x, dot.y, 0, dot.x, dot.y, dot.r * 5);
      gradient.addColorStop(0, `rgba(${color},${dot.alpha})`);
      gradient.addColorStop(1, `rgba(${color},0)`);
      ctx.beginPath();
      ctx.arc(dot.x, dot.y, dot.r * 5, 0, Math.PI * 2);
      ctx.fillStyle = gradient;
      ctx.fill();

      // Core dot
      ctx.beginPath();
      ctx.arc(dot.x, dot.y, dot.r, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(${color},${dot.alpha})`;
      ctx.fill();
    });

    // Remove dead dots
    for (let i = dots.length - 1; i >= 0; i--) {
      if (dots[i].life >= dots[i].maxLife) dots.splice(i, 1);
    }

    // Spawn new dots occasionally
    if (Math.random() < 0.05) addDot();

    requestAnimationFrame(draw);
  }

  // Initial population
  for (let i = 0; i < 20; i++) addDot();
  draw();
}


// ═══════════ INIT ═══════════
document.addEventListener('DOMContentLoaded', () => {
  initCountdown();

  // Animate progress bar
  setTimeout(() => {
    document.getElementById('pf').style.width = raisedPercent + '%';
  }, 800);

  // Animate roadmap line
  setTimeout(() => {
    document.getElementById('rl').style.width = roadmapPercent + '%';
  }, 1200);

  initReveal();
  initStickyBar();
  initGlobe();
  initCounters();
  initPhoneTabs();
});
