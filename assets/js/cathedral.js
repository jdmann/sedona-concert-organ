/* ═══════════════════════════════════════════════════════════════════════════
   THE SEDONA CONCERT ORGAN — behaviour
   Progressive enhancement only: every section stands without this file.
   ═══════════════════════════════════════════════════════════════════════════ */
(function () {
  'use strict';

  /* ══ CONFIGURATION ═══════════════════════════════════════════════════════
     Two values the Conservatory must supply. Both are inert until set — the
     page never pretends to have something it does not.

     CONTACT_EMAIL  the address the contact modal composes to.
     PIPE_UP_VIDEO  the "Pipe Up" film. Set `provider` to 'vimeo' or
                    'youtube' and `id` to the numeric/alphanumeric id, e.g.
                    { provider: 'vimeo', id: '123456789' }.
     ═══════════════════════════════════════════════════════════════════════ */
  var CONTACT_EMAIL = 'info@sedonaconservatory.org';   // ← verify before launch
  var PIPE_UP_VIDEO = { provider: 'vimeo', id: '345343665' };

  var calm = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ── The Pipe Up film ───────────────────────────────────────────────────
     Click-to-load: nothing is requested from the video host until the
     visitor asks for it, so the page sets no third-party cookies on load. */
  Array.prototype.forEach.call(document.querySelectorAll('.film'), function (film) {
    var btn = film.querySelector('.film__btn');
    var awaiting = film.querySelector('.film__await');
    var ready = Boolean(PIPE_UP_VIDEO.provider && PIPE_UP_VIDEO.id);

    if (!ready) {
      film.classList.add('is-unset');
      if (btn) { btn.setAttribute('aria-disabled', 'true'); btn.disabled = true; }
      return;
    }
    if (awaiting) awaiting.remove();

    btn.addEventListener('click', function () {
      var src = PIPE_UP_VIDEO.provider === 'youtube'
        ? 'https://www.youtube-nocookie.com/embed/' + PIPE_UP_VIDEO.id + '?autoplay=1&rel=0'
        : 'https://player.vimeo.com/video/' + PIPE_UP_VIDEO.id + '?autoplay=1';

      var frame = document.createElement('iframe');
      frame.src = src;
      frame.title = film.dataset.title || 'Pipe Up';
      frame.allow = 'autoplay; fullscreen; picture-in-picture';
      frame.setAttribute('allowfullscreen', '');
      film.replaceChildren(frame);
    });
  });

  /* ── Contact modal ──────────────────────────────────────────────────────
     Native <dialog>, so focus trapping and Escape come from the browser. */
  var dialog = document.getElementById('contact-modal');
  if (dialog) {
    var openers = document.querySelectorAll('[data-opens-contact]');
    var opener = null;

    Array.prototype.forEach.call(openers, function (link) {
      link.addEventListener('click', function (e) {
        e.preventDefault();
        opener = link;
        var drawerEl = document.getElementById('nav-drawer');
        if (drawerEl && !drawerEl.hidden) drawerEl.hidden = true;
        if (typeof dialog.showModal === 'function') dialog.showModal();
        else window.location.href = 'mailto:' + CONTACT_EMAIL;
      });
    });

    dialog.addEventListener('close', function () {
      if (opener) { opener.focus(); opener = null; }
    });

    var closer = dialog.querySelector('.modal__close');
    if (closer) closer.addEventListener('click', function () { dialog.close(); });

    /* Click on the backdrop (outside the panel) dismisses */
    dialog.addEventListener('click', function (e) {
      if (e.target === dialog) dialog.close();
    });

    /* No backend on a static site — compose the message in the visitor's own
       mail client rather than pretending to send it. */
    var form = dialog.querySelector('form[data-mailto]');
    if (form) {
      var target = dialog.querySelector('[data-contact-email]');
      if (target) { target.textContent = CONTACT_EMAIL; target.href = 'mailto:' + CONTACT_EMAIL; }

      form.addEventListener('submit', function (e) {
        e.preventDefault();
        var get = function (n) {
          var el = form.elements[n];
          return el && el.value ? el.value.trim() : '';
        };
        var subject = get('subject') || 'Sedona Concert Organ enquiry';
        var body = 'Name: ' + get('name') + '\n'
                 + 'Email: ' + get('email') + '\n\n'
                 + get('message') + '\n';

        window.location.href = 'mailto:' + CONTACT_EMAIL
          + '?subject=' + encodeURIComponent(subject)
          + '&body=' + encodeURIComponent(body);
        dialog.close();
      });
    }
  }

  /* ── Organ façades ──────────────────────────────────────────────────────
     Pipes are laid out in the classic mitred arrangement: tallest at the
     flanks and centre, stepping down into the flats between. */
  /* Five towers, each a mitred triangle stepping down into the flats
     between them — the arrangement of a classic case front. */
  var TOWERS = [
    { c: 0.02, h: 58, w: 0.15 },
    { c: 0.26, h: 34, w: 0.14 },
    { c: 0.50, h: 70, w: 0.17 },
    { c: 0.74, h: 34, w: 0.14 },
    { c: 0.98, h: 58, w: 0.15 }
  ];

  function profile(t) {
    var h = 26;                                  // the flats
    for (var i = 0; i < TOWERS.length; i++) {
      var T = TOWERS[i];
      var reach = 1 - Math.abs(t - T.c) / T.w;
      if (reach > 0) h = Math.max(h, 26 + T.h * reach);
    }
    return h;
  }

  function buildFacade(host, count) {
    var frag = document.createDocumentFragment();

    for (var i = 0; i < count; i++) {
      var t = i / (count - 1);                   // 0 → 1 across the façade
      var pipe = document.createElement('span');
      pipe.className = 'pipe';
      pipe.style.height = Math.min(profile(t), 100).toFixed(2) + '%';
      pipe.style.animationDelay = (-i * 0.13).toFixed(2) + 's';
      frag.appendChild(pipe);
    }
    host.appendChild(frag);
  }

  var facades = document.querySelectorAll('[data-pipes]');
  Array.prototype.forEach.call(facades, function (host) {
    var wide = window.innerWidth > 760;
    buildFacade(host, host.dataset.pipes === 'hero' ? (wide ? 47 : 27)
                                                    : (wide ? 39 : 23));
  });

  /* Patronage façade: light a pipe on click, as a sponsored pipe would be. */
  var patronage = document.querySelector('.facade--interactive');
  if (patronage) {
    patronage.addEventListener('click', function (e) {
      var pipe = e.target.closest('.pipe');
      if (pipe) pipe.classList.toggle('is-lit');
    });
  }

  /* ── Photograph plates ──────────────────────────────────────────────────
     Each plate ships with the <img> already pointing at its intended file.
     Until that file exists the engraved legend shows instead, so dropping a
     photograph into assets/img/ is the only step needed to publish it. */
  Array.prototype.forEach.call(document.querySelectorAll('.plate'), function (plate) {
    var img = plate.querySelector('.plate__img');
    if (!img) { plate.classList.add('is-empty'); return; }

    function empty() { plate.classList.add('is-empty'); }
    if (img.complete) {
      if (!img.naturalWidth) empty();
    } else {
      img.addEventListener('error', empty);
    }
  });

  /* ── Masthead: settles into stone once you leave the west front ───────── */
  var masthead = document.getElementById('masthead');
  var sunk = false;
  function onScroll() {
    var should = window.scrollY > 80;
    if (should !== sunk) {
      sunk = should;
      masthead.classList.toggle('is-sunk', sunk);
    }
    if (!calm) parallax();
  }

  /* ── Rose window drifts against the scroll ───────────────────────────── */
  var drifters = document.querySelectorAll('[data-parallax]');
  function parallax() {
    var y = window.scrollY;
    Array.prototype.forEach.call(drifters, function (el) {
      var rate = parseFloat(el.dataset.parallax) || 0.15;
      el.style.transform = 'translate3d(0,' + (y * rate).toFixed(1) + 'px,0)';
    });
  }

  var ticking = false;
  window.addEventListener('scroll', function () {
    if (ticking) return;
    ticking = true;
    window.requestAnimationFrame(function () { onScroll(); ticking = false; });
  }, { passive: true });
  onScroll();

  /* ── Reveal on approach, in processional order ───────────────────────── */
  if ('IntersectionObserver' in window && !calm) {
    var seen = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        var el = entry.target;
        var group = el.closest('.reveal-group');
        var delay = 0;
        if (group) {
          var sibs = group.querySelectorAll('.reveal');
          delay = Math.min(Array.prototype.indexOf.call(sibs, el), 6) * 110;
        }
        setTimeout(function () { el.classList.add('is-revealed'); }, delay);
        seen.unobserve(el);
      });
    }, { rootMargin: '0px 0px -12% 0px', threshold: 0.12 });

    document.querySelectorAll('.reveal').forEach(function (el) { seen.observe(el); });
  } else {
    document.querySelectorAll('.reveal').forEach(function (el) {
      el.classList.add('is-revealed');
    });
  }

  /* ── Numerals count up as the eye reaches them ───────────────────────── */
  function tally(el) {
    var target = parseInt(el.dataset.count, 10);
    var suffix = el.dataset.suffix || '';
    if (isNaN(target) || calm) return;

    var duration = 1700;
    var start = null;

    function step(now) {
      if (start === null) start = now;
      var p = Math.min((now - start) / duration, 1);
      var eased = 1 - Math.pow(1 - p, 3);          // ease-out cubic
      el.textContent = Math.round(target * eased).toLocaleString('en-US') + suffix;
      if (p < 1) window.requestAnimationFrame(step);
    }
    el.textContent = '0' + suffix;
    window.requestAnimationFrame(step);
  }

  var numerals = document.querySelectorAll('[data-count]');
  if ('IntersectionObserver' in window && numerals.length) {
    var counter = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        tally(entry.target);
        counter.unobserve(entry.target);
      });
    }, { threshold: 0.6 });
    Array.prototype.forEach.call(numerals, function (el) { counter.observe(el); });
  }

  /* ── Narrow-screen drawer ────────────────────────────────────────────── */
  var burger = document.querySelector('.burger');
  var drawer = document.getElementById('nav-drawer');

  function setDrawer(open) {
    burger.setAttribute('aria-expanded', String(open));
    drawer.hidden = !open;
    burger.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
  }

  if (burger && drawer) {
    burger.addEventListener('click', function () {
      setDrawer(burger.getAttribute('aria-expanded') !== 'true');
    });
    drawer.addEventListener('click', function (e) {
      if (e.target.tagName === 'A') setDrawer(false);
    });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && !drawer.hidden) { setDrawer(false); burger.focus(); }
    });
    window.addEventListener('resize', function () {
      if (window.innerWidth > 900 && !drawer.hidden) setDrawer(false);
    });
  }
})();
