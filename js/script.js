document.addEventListener("DOMContentLoaded", function () {

  /* ===== SCROLL PROGRESS BAR ===== */
  function updateScrollProgress() {
    var progress = document.getElementById("scroll-progress");
    if (!progress) return;
    var scrollTop = window.scrollY;
    var docHeight = document.documentElement.scrollHeight - window.innerHeight;
    var scrollPercent = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
    progress.style.width = scrollPercent + "%";
  }
  window.addEventListener("scroll", updateScrollProgress);
  updateScrollProgress();

  /* ===== CURSOR GLOW ===== */
  var cursorGlow = document.getElementById("cursor-glow");
  if (cursorGlow) {
    document.addEventListener("mousemove", function (e) {
      cursorGlow.style.left = e.clientX + "px";
      cursorGlow.style.top = e.clientY + "px";
    });
    document.addEventListener("mouseleave", function () {
      cursorGlow.style.opacity = "0";
    });
    document.addEventListener("mouseenter", function () {
      cursorGlow.style.opacity = "1";
    });
  }

  /* ===== HERO PARALLAX ===== */
  var heroVideo = document.querySelector(".hero-video");
  var heroSection = document.querySelector(".hero-section");
  if (heroVideo && heroSection) {
    window.addEventListener("scroll", function () {
      var rect = heroSection.getBoundingClientRect();
      var scrollProgress = 1 - (rect.bottom / (window.innerHeight + rect.height));
      var offset = Math.max(0, Math.min(1, scrollProgress)) * 30;
      heroVideo.style.transform = "scale(1.05) translateY(" + (-offset) + "px)";
    });
  }

  /* ===== COUNT-UP ANIMATION ===== */
  function animateCounters() {
    var stats = document.querySelectorAll(".impact-stats .stat-number");
    if (!stats.length) return;
    stats.forEach(function (el) {
      var target = parseFloat(el.getAttribute("data-count"));
      if (isNaN(target)) return;
      var suffix = el.textContent.replace(/[\d.]+/, "").trim();
      var current = 0;
      var increment = target / 60;
      var timer = setInterval(function () {
        current += increment;
        if (current >= target) {
          current = target;
          clearInterval(timer);
        }
        if (Number.isInteger(target)) {
          el.textContent = Math.floor(current) + suffix;
        } else {
          el.textContent = current.toFixed(1) + suffix;
        }
      }, 20);
    });
  }

  /* Trigger count-up on scroll into view */
  var impactSection = document.querySelector(".impact-stats");
  if (impactSection) {
    var counted = false;
    function checkCounters() {
      if (counted) return;
      var rect = impactSection.getBoundingClientRect();
      if (rect.top < window.innerHeight - 100) {
        counted = true;
        animateCounters();
      }
    }
    window.addEventListener("scroll", checkCounters);
    checkCounters();
  }

  function refreshBackToTop() {
    const btn = document.getElementById("btn-back-to-top");
    if (!btn) return;
    btn.style.display = window.scrollY > 20 ? "block" : "none";
  }

  const backToTopButton = document.getElementById("btn-back-to-top");
  if (backToTopButton) {
    window.addEventListener("scroll", refreshBackToTop);
    backToTopButton.addEventListener("click", function () {
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  }

  const logo = document.querySelector(".footer-logo");
  if (logo) {
    logo.style.opacity = 0;
    logo.style.transition = "opacity 1s ease-in-out";
    setTimeout(function () { logo.style.opacity = 1; }, 200);
  }

  const form = document.querySelector(".contact-form") || document.getElementById("contact-form");
  if (form) {
    form.addEventListener("submit", function (event) {
      event.preventDefault();
      var isValid = true;

      var requiredFields = form.querySelectorAll("[required]");
      requiredFields.forEach(function (field) {
        if (!field.value.trim()) {
          field.style.borderColor = "#ef4444";
          isValid = false;
        } else {
          field.style.borderColor = "";
        }
      });

      var emailField = form.querySelector('input[type="email"]');
      if (emailField && emailField.value.trim()) {
        var emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailPattern.test(emailField.value.trim())) {
          emailField.style.borderColor = "#ef4444";
          isValid = false;
        }
      }

      if (isValid) {
        if (typeof emailjs !== 'undefined') {
          emailjs.sendForm('service_ak980si', 'template_3az6qp9', form, 'h_eq-MuFpNf1CyphV')
            .then(function() {
              form.reset();
              alert('Thank you! We will get back to you shortly.');
            }, function(err) {
              alert('Something went wrong. Please try again later.');
            });
        } else {
          form.reset();
          alert("Form submitted successfully!");
        }
      } else {
        alert("Please fill in all required fields correctly.");
      }
    });
  }

  document.addEventListener("click", function (event) {
    var nav = document.querySelector(".navbar-nav-mobile.show");
    if (!nav) return;
    if (event.target === nav) {
      nav.classList.remove("show");
      var toggle = document.getElementById("mobileMenuToggle");
      if (toggle) {
        toggle.classList.remove("active");
        toggle.setAttribute("aria-expanded", "false");
      }
      document.body.classList.remove("menu-open");
    }
  });

  // ===== DEMO MODAL SYSTEM (cross-page, zero HTML edits) =====
  var modalHtml =
    '<div class="demo-modal-overlay" id="demoModal">' +
      '<div class="demo-modal-container">' +
        '<button type="button" class="demo-modal-close" id="demoModalClose">&times;</button>' +
        '<div class="demo-modal-body">' +
          '<div class="contact-visual">' +
            '<div class="contact-bg"></div>' +
            '<form class="contact-form" id="demoForm">' +
              '<div class="form-grid">' +
                '<div class="form-group full">' +
                  '<label for="demo-name">Name*</label>' +
                  '<input id="demo-name" name="from_name" type="text" placeholder="Enter your full name" required>' +
                '</div>' +
                '<div class="form-group full">' +
                  '<label for="demo-company">Company*</label>' +
                  '<input id="demo-company" name="from_company" type="text" placeholder="Where do you work?" required>' +
                '</div>' +
                '<div class="form-group full">' +
                  '<label for="demo-email">Email Address*</label>' +
                  '<input id="demo-email" name="from_email" type="email" placeholder="Enter your email" required>' +
                '</div>' +
                '<div class="form-group full">' +
                  '<label for="demo-phone">Phone Number*</label>' +
                  '<input id="demo-phone" name="from_phone" type="text" placeholder="Enter your phone number" required>' +
                '</div>' +
                '<div class="form-group full">' +
                  '<label for="demo-message">Message*</label>' +
                  '<textarea id="demo-message" name="message" rows="4" placeholder="How can we help you?" required></textarea>' +
                '</div>' +
              '</div>' +
              '<button type="submit" class="submit-btn">Contact MMA InfoSec →</button>' +
            '</form>' +
          '</div>' +
        '</div>' +
      '</div>' +
    '</div>';

  if (!document.getElementById('demoModal')) {
    document.body.insertAdjacentHTML('beforeend', modalHtml);
  }

  var modal = document.getElementById('demoModal');
  var demoForm = document.getElementById('demoForm');

  function openDemoModal(e) {
    e.preventDefault();
    if (modal) modal.classList.add('open');
  }

  document.querySelectorAll('.btn.primary, .highlight-btn, .endpoint-btn.light, .cta-bar .btn-outline').forEach(function (btn) {
    btn.addEventListener('click', openDemoModal);
  });

  var closeBtn = document.getElementById('demoModalClose');
  if (closeBtn) {
    closeBtn.addEventListener('click', function () {
      if (modal) modal.classList.remove('open');
    });
  }

  if (modal) {
    modal.addEventListener('click', function (e) {
      if (e.target === modal) modal.classList.remove('open');
    });
  }

  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && modal && modal.classList.contains('open')) {
      modal.classList.remove('open');
    }
  });

  if (demoForm) {
    demoForm.addEventListener('submit', function (e) {
      e.preventDefault();
      var required = demoForm.querySelectorAll('[required]');
      var valid = true;
      required.forEach(function (f) {
        if (!f.value.trim()) { f.style.borderColor = '#ef4444'; valid = false; }
        else { f.style.borderColor = ''; }
      });
      var emailF = demoForm.querySelector('input[type="email"]');
      if (emailF && emailF.value.trim()) {
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailF.value.trim())) {
          emailF.style.borderColor = '#ef4444'; valid = false;
        }
      }
      if (!valid) { alert('Please fill in all required fields correctly.'); return; }
      if (typeof emailjs !== 'undefined') {
        emailjs.sendForm('service_ak980si', 'template_3az6qp9', this, 'h_eq-MuFpNf1CyphV')
          .then(function () {
            demoForm.reset(); if (modal) modal.classList.remove('open');
            alert('Thank you! We will get back to you shortly.');
          }, function () {
            alert('Something went wrong. Please try again later.');
          });
      } else {
        demoForm.reset(); if (modal) modal.classList.remove('open');
        alert('Thank you! We will get back to you shortly.');
      }
    });
  }
});
