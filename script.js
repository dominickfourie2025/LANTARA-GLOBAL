/* ==========================================================================
   Lantara Global — Shared behaviour
   Mobile nav toggle · scroll reveal · contact form handling
   ========================================================================== */

(function () {
  "use strict";

  /* Mobile navigation toggle */
  var toggle = document.querySelector("[data-nav-toggle]");
  var nav = document.getElementById("primary-nav");

  if (toggle && nav) {
    toggle.addEventListener("click", function () {
      var isOpen = nav.classList.toggle("is-open");
      toggle.setAttribute("aria-expanded", isOpen ? "true" : "false");
      document.body.style.overflow = isOpen ? "hidden" : "";
    });

    nav.querySelectorAll("a").forEach(function (link) {
      link.addEventListener("click", function () {
        nav.classList.remove("is-open");
        toggle.setAttribute("aria-expanded", "false");
        document.body.style.overflow = "";
      });
    });
  }

  /* Scroll-triggered reveal for section content.
     Elements start fully visible in the stylesheet; only once we know
     we can observe and reveal them do we "arm" the hidden starting
     state, then flip it visible as each scrolls into view. This way a
     blocked, slow, or erroring script never leaves content invisible. */
  var revealEls = document.querySelectorAll(".reveal");

  if ("IntersectionObserver" in window && revealEls.length) {
    revealEls.forEach(function (el) {
      el.classList.add("reveal-armed");
    });

    var observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15, rootMargin: "0px 0px -40px 0px" }
    );

    revealEls.forEach(function (el) {
      observer.observe(el);
    });
  }

  /* Contact form — static-site placeholder handling */
  var form = document.querySelector("[data-contact-form]");

  if (form) {
    form.addEventListener("submit", function (event) {
      event.preventDefault();
      var button = form.querySelector("button[type='submit']");
      var originalLabel = button.textContent;
      var sentLabel = button.getAttribute("data-sent-label") || originalLabel;

      button.disabled = true;
      button.textContent = sentLabel;

      window.setTimeout(function () {
        form.reset();
        button.disabled = false;
        button.textContent = originalLabel;
      }, 2200);
    });
  }
})();
