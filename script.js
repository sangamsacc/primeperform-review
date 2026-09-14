/* ==========================================================================
   Prime Perform Review — script.js
   Lightweight vanilla JS: header, mobile nav, scroll reveal, FAQ, sticky CTA.
   ========================================================================== */
(function () {
  "use strict";

  var prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ---------- Sticky header (compact after scroll) ---------- */
  var header = document.getElementById("siteHeader");
  var headerTicking = false;

  function onScroll() {
    if (headerTicking) return;
    headerTicking = true;
    window.requestAnimationFrame(function () {
      header.classList.toggle("scrolled", window.scrollY > 20);
      headerTicking = false;
    });
  }

  /* ---------- Sticky mobile CTA ---------- */
  var stickyCta = document.getElementById("stickyCta");
  var ctaSection = document.querySelector(".cta");
  var mqSticky = window.matchMedia("(max-width: 720px)");

  function updateStickyCta() {
    if (!stickyCta || !ctaSection) return;
    var inCta = ctaSection.getBoundingClientRect().top < window.innerHeight * 0.75;
    var show = mqSticky.matches && window.scrollY > 520 && !inCta;
    stickyCta.classList.toggle("show", show);
    stickyCta.inert = !show;
  }

  if (mqSticky.addEventListener) {
    mqSticky.addEventListener("change", updateStickyCta);
  } else if (mqSticky.addListener) {
    mqSticky.addListener(updateStickyCta);
  }

  /* ---------- Mobile navigation ---------- */
  var navToggle = document.getElementById("navToggle");
  var siteNav = document.getElementById("siteNav");

  function setNav(open) {
    if (!mqMobileNav.matches) {
      document.body.classList.remove("nav-open");
      navToggle.setAttribute("aria-expanded", "false");
      siteNav.removeAttribute("aria-hidden");
      return;
    }
    document.body.classList.toggle("nav-open", open);
    navToggle.setAttribute("aria-expanded", String(open));
    siteNav.setAttribute("aria-hidden", String(!open));
    if (open) {
      var link = siteNav.querySelector("a");
      if (link) link.focus({ preventScroll: true });
    }
  }

  navToggle.addEventListener("click", function () {
    setNav(!document.body.classList.contains("nav-open"));
  });

  // Close the menu when a link inside it is clicked.
  siteNav.addEventListener("click", function (e) {
    if (e.target.closest("a")) setNav(false);
  });

  // Close the menu when the viewport grows past the mobile breakpoint.
  var mqMobileNav = window.matchMedia("(max-width: 920px)");
  mqMobileNav.addEventListener("change", function (e) {
    if (!e.matches) setNav(false);
  });

  /* ---------- Scroll reveal ---------- */
  var revealEls = Array.prototype.slice.call(document.querySelectorAll(".reveal"));

  if ("IntersectionObserver" in window && !prefersReduced) {
    var revealObserver = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("in-view");
            revealObserver.unobserve(entry.target);
          }
        });
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.08 }
    );
    revealEls.forEach(function (el) {
      revealObserver.observe(el);
    });
  } else {
    // No observer support or reduced motion: show everything immediately.
    revealEls.forEach(function (el) {
      el.classList.add("in-view");
    });
  }

  /* ---------- FAQ accordion (one open at a time) ---------- */
  var faqItems = Array.prototype.slice.call(document.querySelectorAll(".faq-item"));

  faqItems.forEach(function (item) {
    var toggle = item.querySelector(".faq-toggle");
    toggle.addEventListener("click", function () {
      var isOpen = item.classList.contains("open");

      // Close everything else so only one item stays open.
      faqItems.forEach(function (other) {
        other.classList.remove("open");
        other.querySelector(".faq-toggle").setAttribute("aria-expanded", "false");
      });

      if (!isOpen) {
        item.classList.add("open");
        toggle.setAttribute("aria-expanded", "true");
      }
    });
  });

  // Allow closing via Escape when a FAQ toggle has focus.
  document.addEventListener("keydown", function (e) {
    if (e.key !== "Escape") return;
    faqItems.forEach(function (item) {
      item.classList.remove("open");
      item.querySelector(".faq-toggle").setAttribute("aria-expanded", "false");
    });
  });

  /* ---------- Footer year ---------- */
  var yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  /* ---------- Boot ---------- */
  onScroll();
  updateStickyCta();
  window.addEventListener("scroll", function () {
    onScroll();
    updateStickyCta();
  }, { passive: true });
  setNav(false);
})();
