/* ==========================================================================
   Roo Management Inc. — interactions
   Vanilla JS, no dependencies. Progressive enhancement only.
   ========================================================================== */
(function () {
  "use strict";

  var doc = document;

  /* -------- Inline SVG icon set (keeps everything self-contained) -------- */
  var ICONS = {
    megaphone: '<path d="M3 11v2a1 1 0 0 0 1 1h1l3 4h2v-4l9 3V6l-9 3H4a1 1 0 0 0-1 1z"/>',
    shield: '<path d="M12 2l8 3v6c0 5-3.4 8.4-8 9-4.6-.6-8-4-8-9V5l8-3z"/><path d="M9 12l2 2 4-4" fill="none" stroke="#fff" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/>',
    wallet: '<rect x="3" y="6" width="18" height="13" rx="2.5"/><path d="M3 9h18" stroke="#fff" stroke-width="1.6"/><circle cx="17" cy="13" r="1.4" fill="#fff"/>',
    wrench: '<path d="M14.7 6.3a4 4 0 0 0-5.4 5l-6 6 2.4 2.4 6-6a4 4 0 0 0 5-5.4l-2.6 2.6-2-2 2.6-2.6z"/>',
    chart: '<rect x="3" y="12" width="4" height="8" rx="1"/><rect x="10" y="7" width="4" height="13" rx="1"/><rect x="17" y="3" width="4" height="17" rx="1"/>',
    clipboard: '<rect x="5" y="4" width="14" height="17" rx="2.5"/><rect x="9" y="2.5" width="6" height="3.5" rx="1.2" fill="#fff"/><path d="M8.5 11h7M8.5 14.5h7M8.5 18h4" stroke="#fff" stroke-width="1.5" stroke-linecap="round"/>',
    gavel: '<path d="M14 3l7 7-2.5 2.5L11.5 5.5 14 3z" /><path d="M4 20l7-7 2.5 2.5-7 7L4 20z"/><path d="M3 21h8" stroke="#fff" stroke-width="1.8" stroke-linecap="round"/>',
    key: '<circle cx="8" cy="8" r="4.5"/><path d="M11 11l9 9M17 17l2-2M15 15l2-2" stroke="#fff" stroke-width="1.8" stroke-linecap="round"/>',
    building: '<rect x="5" y="3" width="14" height="18" rx="1.5"/><path d="M9 7h2M13 7h2M9 11h2M13 11h2M9 15h2M13 15h2" stroke="#0f3d3e" stroke-width="1.5" stroke-linecap="round"/>',
    home: '<path d="M3 11l9-8 9 8"/><path d="M5 10v10h14V10" fill="none" stroke="currentColor" stroke-width="1.8"/><path d="M10 20v-5h4v5" fill="#0f3d3e"/>',
    search: '<circle cx="10.5" cy="10.5" r="6.5" fill="none" stroke="currentColor" stroke-width="2"/><path d="M15.5 15.5L21 21" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"/>',
    pin: '<path d="M12 22s7-6.2 7-12A7 7 0 0 0 5 10c0 5.8 7 12 7 12z"/><circle cx="12" cy="10" r="2.6" fill="#fff"/>',
    phone: '<path d="M6 3h3l2 5-2.5 1.5a11 11 0 0 0 5 5L17 17l5 2v3a2 2 0 0 1-2 2A17 17 0 0 1 3 7a2 2 0 0 1 2-2z"/>',
    mail: '<rect x="3" y="5" width="18" height="14" rx="2.5"/><path d="M4 7l8 6 8-6" fill="none" stroke="#fff" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/>',
    clock: '<circle cx="12" cy="12" r="9" fill="none" stroke="currentColor" stroke-width="2"/><path d="M12 7v5l3.5 2" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>'
  };

  function paintIcons() {
    var nodes = doc.querySelectorAll("[data-icon]");
    nodes.forEach(function (el) {
      var name = el.getAttribute("data-icon");
      if (!ICONS[name]) return;
      var svg =
        '<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">' +
        ICONS[name] +
        "</svg>";
      el.innerHTML = svg;
    });
  }

  /* -------- Mobile nav -------- */
  function setupNav() {
    var toggle = doc.querySelector(".nav__toggle");
    var menu = doc.getElementById("nav-menu");
    if (!toggle || !menu) return;

    var scrim = doc.createElement("div");
    scrim.className = "nav-scrim";
    doc.body.appendChild(scrim);

    function open() {
      menu.classList.add("is-open");
      scrim.classList.add("is-open");
      toggle.setAttribute("aria-expanded", "true");
      doc.body.classList.add("nav-open");
    }
    function close() {
      menu.classList.remove("is-open");
      scrim.classList.remove("is-open");
      toggle.setAttribute("aria-expanded", "false");
      doc.body.classList.remove("nav-open");
    }
    toggle.addEventListener("click", function () {
      toggle.getAttribute("aria-expanded") === "true" ? close() : open();
    });
    scrim.addEventListener("click", close);
    menu.addEventListener("click", function (e) {
      if (e.target.closest("a")) close();
    });
    doc.addEventListener("keydown", function (e) {
      if (e.key === "Escape") close();
    });
  }

  /* -------- Sticky header shadow -------- */
  function setupHeader() {
    var header = doc.getElementById("site-header");
    if (!header) return;
    var onScroll = function () {
      header.classList.toggle("is-stuck", window.scrollY > 8);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
  }

  /* -------- Animated stat counters -------- */
  function animateCount(el) {
    var target = parseFloat(el.getAttribute("data-count")) || 0;
    var suffix = el.getAttribute("data-suffix") || "";
    var dur = 1400;
    var start = null;
    function tick(ts) {
      if (!start) start = ts;
      var p = Math.min((ts - start) / dur, 1);
      var eased = 1 - Math.pow(1 - p, 3);
      var val = Math.round(target * eased);
      el.textContent = val.toLocaleString() + suffix;
      if (p < 1) requestAnimationFrame(tick);
    }
    requestAnimationFrame(tick);
  }

  /* -------- Reveal-on-scroll + counters via IntersectionObserver -------- */
  function setupObservers() {
    var reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    // tag elements for reveal
    var revealSel = ".card, .step, .portal-card, .plan, .quote, .values li, .chips li, .section__head, .split__content, .split__media, .hero__card";
    doc.querySelectorAll(revealSel).forEach(function (el) {
      el.setAttribute("data-reveal", "");
    });

    if (reduce || !("IntersectionObserver" in window)) {
      doc.querySelectorAll("[data-reveal]").forEach(function (el) { el.classList.add("is-visible"); });
      doc.querySelectorAll(".stat__num").forEach(function (el) {
        el.textContent = (parseFloat(el.getAttribute("data-count")) || 0).toLocaleString() + (el.getAttribute("data-suffix") || "");
      });
      return;
    }

    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: "0px 0px -40px 0px" });
    doc.querySelectorAll("[data-reveal]").forEach(function (el) { io.observe(el); });

    var statsIO = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          animateCount(entry.target);
          statsIO.unobserve(entry.target);
        }
      });
    }, { threshold: 0.5 });
    doc.querySelectorAll(".stat__num").forEach(function (el) { statsIO.observe(el); });
  }

  /* -------- Forms --------
     No form backend: on submit, open a pre-filled email to the office.
     If a real action URL is set later, the browser submits normally.
  */
  var OFFICE_EMAIL = "roomanagementtx@gmail.com";

  function setupForms() {
    doc.querySelectorAll("form[data-form]").forEach(function (form) {
      form.addEventListener("submit", function (e) {
        var action = form.getAttribute("action");
        if (action && action !== "#") return;

        e.preventDefault();
        if (!form.checkValidity()) {
          form.reportValidity();
          return;
        }

        var lines = [];
        form.querySelectorAll("input, select, textarea").forEach(function (el) {
          if (!el.name) return;
          var label = el.name.replace(/_/g, " ");
          if (el.type === "checkbox") {
            if (el.name === "sms_consent") lines.push("SMS consent: " + (el.checked ? "YES, agreed to receive texts" : "no"));
            return;
          }
          if (el.value) lines.push(label.charAt(0).toUpperCase() + label.slice(1) + ": " + el.value);
        });
        var subject = form.getAttribute("data-form") === "rental-analysis" ? "Free rental analysis request" : "Website inquiry";
        window.location.href = "mailto:" + OFFICE_EMAIL +
          "?subject=" + encodeURIComponent(subject) +
          "&body=" + encodeURIComponent(lines.join("
"));

        var status = form.querySelector("[data-status]");
        if (status) {
          status.hidden = false;
          status.className = "form__status is-success";
          status.textContent = "Your email app should open with your message ready to send. If it doesn't, email us at " + OFFICE_EMAIL + " or call (346) 327-0525.";
        }
      });
    });
  }

  /* -------- Footer year -------- */
  function setYear() {
    doc.querySelectorAll("[data-year]").forEach(function (el) {
      el.textContent = String(new Date().getFullYear());
    });
  }

  /* -------- Init -------- */
  function init() {
    paintIcons();
    setupNav();
    setupHeader();
    setupObservers();
    setupForms();
    setYear();
  }

  if (doc.readyState === "loading") {
    doc.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
