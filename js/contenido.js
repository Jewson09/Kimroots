/* =========================================================
   KimRoots — Contenido editable
   Lee contenido/sitio.json (editado desde el panel Pages CMS)
   y actualiza el sitio. Si el archivo no carga, el sitio
   muestra el texto original escrito en index.html.
   ========================================================= */
(function () {
  "use strict";

  function el(tag, cls, text) {
    var e = document.createElement(tag);
    if (cls) e.className = cls;
    if (text) e.textContent = text;
    return e;
  }
  function has(v) { return typeof v === "string" && v.trim() !== ""; }
  function get(obj, path) {
    return path.split(".").reduce(function (o, k) { return o ? o[k] : undefined; }, obj);
  }
  function wa(num, msg) {
    return "https://wa.me/" + num + "?text=" + encodeURIComponent(msg);
  }

  fetch("contenido/sitio.json", { cache: "no-cache" })
    .then(function (r) { if (!r.ok) throw new Error(r.status); return r.json(); })
    .then(aplicar)
    .catch(function (e) { console.warn("KimRoots: contenido no cargado, se usa el texto original.", e); });

  function aplicar(d) {
    var c = d.contacto || {};
    var num = has(c.whatsapp) ? c.whatsapp.replace(/\D/g, "") : "18094454151";

    /* Aviso */
    var aviso = document.getElementById("cmsAviso");
    if (aviso && has(d.aviso)) { aviso.textContent = d.aviso; aviso.hidden = false; }

    /* Textos simples */
    document.querySelectorAll("[data-cms]").forEach(function (n) {
      var v = get(d, n.getAttribute("data-cms"));
      if (has(v)) n.textContent = v;
    });

    /* Foto de la fundadora */
    var f = document.getElementById("cmsFundadora");
    if (d.historia && has(d.historia.foto)) {
      var nf = el("img", "founder-photo");
      nf.id = "cmsFundadora"; nf.alt = "Kimberlie Jean Baptiste, fundadora de KimRoots"; nf.loading = "lazy";
      nf.src = d.historia.foto;
      if (f) f.remove();
      document.querySelector(".about-visual").prepend(nf);
    }

    /* Servicios */
    var grid = document.getElementById("cmsServicios");
    if (grid && Array.isArray(d.servicios) && d.servicios.length) {
      var icons = Array.prototype.map.call(grid.querySelectorAll(".service-icon"), function (i) { return i.outerHTML; });
      var cta = grid.querySelector(".service-card-cta");
      grid.querySelectorAll(".service-card:not(.service-card-cta)").forEach(function (n) { n.remove(); });
      d.servicios.forEach(function (s, i) {
        if (!s || !has(s.nombre)) return;
        var card = el("article", "service-card");
        if (icons.length) card.insertAdjacentHTML("beforeend", icons[i % icons.length]);
        card.appendChild(el("h3", "", s.nombre));
        if (has(s.descripcion)) card.appendChild(el("p", "", s.descripcion));
        if (has(s.precio)) card.appendChild(el("p", "service-price", s.precio));
        var a = el("a", "service-link", "Pedir información ");
        a.href = wa(num, "Hola KimRoots, me interesa: " + s.nombre);
        a.target = "_blank"; a.rel = "noopener";
        var arrow = el("span", "", "→"); arrow.setAttribute("aria-hidden", "true");
        a.appendChild(arrow);
        card.appendChild(a);
        grid.insertBefore(card, cta);
      });
    }

    /* Galería */
    var gal = document.getElementById("cmsGaleria");
    var fotos = (d.galeria || []).filter(function (g) { return g && has(g.foto); });
    if (gal && fotos.length) {
      gal.innerHTML = "";
      fotos.forEach(function (g) {
        var fig = el("figure", "gallery-photo");
        var img = el("img");
        img.src = g.foto; img.loading = "lazy";
        img.alt = has(g.titulo) ? g.titulo + " — trabajo de KimRoots" : "Trabajo de KimRoots";
        fig.appendChild(img);
        if (has(g.titulo)) fig.appendChild(el("figcaption", "", g.titulo));
        gal.appendChild(fig);
      });
    }

    /* Preguntas frecuentes */
    var faq = document.getElementById("cmsPreguntas");
    if (faq && Array.isArray(d.preguntas) && d.preguntas.length) {
      faq.innerHTML = "";
      d.preguntas.forEach(function (q) {
        if (!q || !has(q.pregunta)) return;
        var det = el("details");
        det.appendChild(el("summary", "", q.pregunta));
        if (has(q.respuesta)) det.appendChild(el("p", "", q.respuesta));
        faq.appendChild(det);
      });
    }

    /* Contacto */
    if (num !== "18094454151") {
      document.querySelectorAll('a[href^="https://wa.me/"]').forEach(function (a) {
        a.href = a.href.replace(/wa\.me\/\d+/, "wa.me/" + num);
      });
    }
    var tel = document.getElementById("cmsTelefono");
    if (tel && has(c.telefono)) {
      tel.textContent = c.telefono;
      tel.href = "tel:+" + (c.telefono.replace(/\D/g, "").length === 10 ? "1" : "") + c.telefono.replace(/\D/g, "");
    }
    var dir = document.getElementById("cmsDireccion");
    if (dir && has(c.direccion)) {
      dir.textContent = c.direccion;
      dir.href = "https://www.google.com/maps/search/?api=1&query=" + encodeURIComponent(c.direccion);
    }
    if (has(c.horario)) {
      document.getElementById("cmsHorario").textContent = c.horario;
      document.getElementById("cmsHorarioItem").hidden = false;
    }
  }
})();
