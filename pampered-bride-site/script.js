/* =========================================================================
   THE PAMPERED BRIDE — scroll-scrubbed film engine
   - Progressively preloads an ordered B&W frame sequence (assets.js)
   - Scroll progress 0→1 drives the film: down = forward, stop = hold,
     up = rewind. Eased (lerp) so it never feels jumpy.
   - Frames drawn to a <canvas> with object-fit:cover + crossfade — buttery on
     iOS (no <video> decode/seek stutter). Reveals after the first few frames
     load and keeps loading the rest; always draws the nearest loaded frame so
     it never flashes blank on slow cellular.
   ========================================================================= */
(function () {
  'use strict';

  var A = window.TPB_ASSETS || {};
  var FRAMES = (A.frames || []).slice();
  var prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  var canvas = document.getElementById('film');
  var ctx = canvas.getContext('2d', { alpha: false });
  var scrim = document.getElementById('scrim');
  var loader = document.getElementById('loader');
  var loaderFill = document.getElementById('loaderFill');
  var railFill = document.getElementById('railFill');
  var scrollCue = document.getElementById('scrollCue');
  var igCorner = document.getElementById('igCorner');
  var spacer = document.getElementById('spacer');
  var chapters = Array.prototype.slice.call(document.querySelectorAll('.chapter'));

  var FILM_END = 0.82;   /* film reaches its final frame by this progress, then holds */
  var SCROLL_VH = 6.0;   /* total scroll length as a multiple of viewport height */
  var REVEAL_AFTER = Math.min(3, FRAMES.length || 1);  /* start once this many frames are in */

  var images = [], loaded = 0, revealed = false, running = false;
  var dpr = Math.min(window.devicePixelRatio || 1, 2);
  var cw = 0, ch = 0;
  var target = 0, eased = 0;

  /* ----------------------------------------------------------- preload ----- */
  function preload() {
    if (!FRAMES.length) { reveal(); return; }
    FRAMES.forEach(function (frame, i) {
      var local  = (typeof frame === 'string') ? null : frame.local;
      var remote = (typeof frame === 'string') ? frame : frame.remote;
      var img = new Image();
      img.decoding = 'async';
      var triedRemote = false;
      function done() {
        loaded++;
        if (loaderFill) loaderFill.style.width = Math.round((loaded / FRAMES.length) * 100) + '%';
        if (!revealed && loaded >= REVEAL_AFTER) reveal();
      }
      img.onload = done;
      img.onerror = function () {
        if (local && remote && !triedRemote) { triedRemote = true; img.src = remote; }
        else { done(); }
      };
      img.src = local || remote;   // local first, CDN fallback
      images[i] = img;
    });
    setTimeout(reveal, 8000);  // never hang on a stalled asset
  }

  function reveal() {
    if (revealed) return; revealed = true;
    if (loader) setTimeout(function () { loader.classList.add('is-done'); }, 200);
    if (prefersReduced) { drawStatic(); return; }
    if (running) return; running = true;
    resize();
    requestAnimationFrame(loop);
  }

  /* --------------------------------------------------------- sizing -------- */
  function resize() {
    cw = Math.floor(window.innerWidth * dpr);
    ch = Math.floor(window.innerHeight * dpr);
    canvas.width = cw; canvas.height = ch;
    canvas.style.width = window.innerWidth + 'px';
    canvas.style.height = window.innerHeight + 'px';
    if (spacer && !prefersReduced) spacer.style.height = (SCROLL_VH * 100) + 'svh';
    if (prefersReduced) drawStatic(); else draw();
  }

  function isLoaded(i) { var im = images[i]; return (im && im.complete && im.naturalWidth) ? im : null; }
  function nearest(i) {
    if (isLoaded(i)) return images[i];
    for (var d = 1; d < images.length; d++) {
      if (isLoaded(i - d)) return images[i - d];
      if (isLoaded(i + d)) return images[i + d];
    }
    return null;
  }

  function cover(img, alpha) {
    if (!img || !img.naturalWidth) return;
    var iw = img.naturalWidth, ih = img.naturalHeight;
    var s = Math.max(cw / iw, ch / ih);
    var dw = iw * s, dh = ih * s;
    ctx.globalAlpha = alpha;
    ctx.drawImage(img, (cw - dw) / 2, (ch - dh) / 2, dw, dh);
    ctx.globalAlpha = 1;
  }

  /* --------------------------------------------------------- progress ------ */
  function scrollProgress() {
    var max = (document.documentElement.scrollHeight - window.innerHeight);
    if (max <= 0) return 0;
    return Math.min(1, Math.max(0, window.scrollY / max));
  }
  function smoothstep(a, b, x) {
    if (x <= a) return 0; if (x >= b) return 1;
    var t = (x - a) / (b - a); return t * t * (3 - 2 * t);
  }

  function draw() {
    if (!cw) return;
    var n = images.length;
    ctx.fillStyle = '#dcd7cf';
    ctx.fillRect(0, 0, cw, ch);
    if (!n) return;
    var filmP = Math.min(1, eased / FILM_END);
    var f = filmP * (n - 1);
    var i = Math.floor(f), frac = f - i;
    cover(nearest(i), 1);                             // nearest loaded → never blank
    if (frac > 0.001 && isLoaded(i + 1)) cover(images[i + 1], frac);
  }

  function updateOverlays(p) {
    chapters.forEach(function (ch2) {
      var r = (ch2.getAttribute('data-range') || '0,1').split(',');
      var a = parseFloat(r[0]), b = parseFloat(r[1]);
      var stay = ch2.getAttribute('data-stay') === '1';
      var fade = (b - a) * 0.30;
      var fadeIn = (a <= 0.001) ? 1 : smoothstep(a, a + fade, p);
      var op;
      if (stay) {
        op = fadeIn;
        ch2.classList.toggle('is-on', p >= a + fade * 0.5);
      } else {
        op = Math.min(fadeIn, 1 - smoothstep(b - fade, b, p));
      }
      ch2.style.opacity = op.toFixed(3);
      ch2.style.transform = 'translateY(' + ((1 - op) * 12).toFixed(1) + 'px)';
      // The tall closing spread only captures taps/scroll once you're basically
      // at the bottom — so approaching it never traps the page scroll on mobile.
      var interactive = stay ? (p > 0.965) : (op > 0.5);
      ch2.style.pointerEvents = interactive ? 'auto' : 'none';
    });

    var dim = smoothstep(FILM_END - 0.04, 1, p) * 0.26;
    if (scrim) scrim.style.background =
      'linear-gradient(180deg, rgba(242,239,234,' + (0.40 + dim) + ') 0%, rgba(242,239,234,' + (0.28 + dim) + ') 40%, rgba(242,239,234,' + (0.50 + dim) + ') 100%)';
    if (railFill) railFill.style.height = (p * 100).toFixed(1) + '%';
    if (scrollCue) scrollCue.style.opacity = (1 - smoothstep(0.93, 1, p)).toFixed(2);
    if (igCorner) igCorner.classList.toggle('is-shown', p > 0.9);
  }

  function loop() {
    target = scrollProgress();
    eased += (target - eased) * 0.14;
    if (Math.abs(target - eased) < 0.0005) eased = target;
    draw();
    updateOverlays(target);
    requestAnimationFrame(loop);
  }

  /* --------------------------------------------------- reduced motion ------ */
  function drawStatic() {
    cw = Math.floor(window.innerWidth * dpr); ch = Math.floor(window.innerHeight * dpr);
    canvas.width = cw; canvas.height = ch;
    canvas.style.width = window.innerWidth + 'px'; canvas.style.height = window.innerHeight + 'px';
    ctx.fillStyle = '#dcd7cf'; ctx.fillRect(0, 0, cw, ch);
    var img = nearest(Math.floor(images.length * 0.5));
    if (img) cover(img, 1);
  }

  /* ----------------------------------------------------------- email ------- */
  function wireForm() {
    var form = document.getElementById('captureForm');
    if (!form) return;
    var input = document.getElementById('email');
    var note = document.getElementById('captureNote');
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var val = (input.value || '').trim();
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val)) {
        note.style.color = 'var(--greige)'; note.textContent = 'Kindly enter a valid email address.'; input.focus(); return;
      }
      note.style.color = 'var(--gold)'; note.textContent = 'Thank you — we will be in touch, beautifully soon.';
      input.value = ''; input.blur();
    });
  }

  /* ----------------------------------------------------------- init -------- */
  wireForm();
  if (prefersReduced) {
    document.body.classList.add('reduced');
    window.addEventListener('resize', drawStatic, { passive: true });
    window.addEventListener('orientationchange', function () { setTimeout(drawStatic, 250); });
  } else {
    window.addEventListener('resize', resize, { passive: true });
    window.addEventListener('orientationchange', function () { setTimeout(resize, 250); });
  }
  preload();
})();
