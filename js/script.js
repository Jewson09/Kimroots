(function () {
  "use strict";

  var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ----- Encabezado: fondo al hacer scroll ----- */
  var header = document.getElementById("siteHeader");
  function onScroll() {
    header.classList.toggle("scrolled", window.scrollY > 12);
  }
  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });

  /* ----- Menú móvil ----- */
  var toggle = document.getElementById("navToggle");
  var nav = document.getElementById("mainNav");
  var backdrop = document.getElementById("navBackdrop");

  function setMenu(open) {
    nav.classList.toggle("open", open);
    document.body.classList.toggle("menu-open", open);
    if (backdrop) backdrop.hidden = !open;
    toggle.setAttribute("aria-expanded", open ? "true" : "false");
    toggle.setAttribute("aria-label", open ? "Cerrar el menú" : "Abrir el menú");
  }

  toggle.addEventListener("click", function () {
    setMenu(!nav.classList.contains("open"));
  });
  if (backdrop) {
    backdrop.addEventListener("click", function () { setMenu(false); });
  }
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape" && nav.classList.contains("open")) {
      setMenu(false);
      toggle.focus();
    }
  });
  nav.querySelectorAll("a").forEach(function (link) {
    link.addEventListener("click", function () { setMenu(false); });
  });

  /* ----- Aparición al hacer scroll ----- */
  var revealTargets = document.querySelectorAll(
    ".service-card, .gallery-swatch, .gallery-photo, .about-copy, .about-visual, .cta-copy, .steps-list li, .faq-list"
  );
  revealTargets.forEach(function (el) {
    el.classList.add("reveal");
  });

  if (reduceMotion || !("IntersectionObserver" in window)) {
    revealTargets.forEach(function (el) {
      el.classList.add("is-visible");
    });
  } else {
    var observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15 }
    );
    revealTargets.forEach(function (el) {
      observer.observe(el);
    });
  }

  /* ----- Año en el pie de página ----- */
  var yearEl = document.getElementById("year");
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }
})();
