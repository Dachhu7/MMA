document.addEventListener("DOMContentLoaded", function () {
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
        alert("Form submitted successfully!");
        form.reset();
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
                '<div class="form-group">' +
                  '<label for="demo-fname">First Name*</label>' +
                  '<input id="demo-fname" type="text" placeholder="Enter your first name" required>' +
                '</div>' +
                '<div class="form-group">' +
                  '<label for="demo-lname">Last Name*</label>' +
                  '<input id="demo-lname" type="text" placeholder="Enter your last name" required>' +
                '</div>' +
                '<div class="form-group">' +
                  '<label for="demo-email">Business Email*</label>' +
                  '<input id="demo-email" type="email" placeholder="Enter your email" required>' +
                '</div>' +
                '<div class="form-group">' +
                  '<label for="demo-phone">Phone*</label>' +
                  '<input id="demo-phone" type="text" placeholder="Enter your phone number" required>' +
                '</div>' +
                '<div class="form-group">' +
                  '<label for="demo-company">Company*</label>' +
                  '<input id="demo-company" type="text" placeholder="Where do you work?" required>' +
                '</div>' +
                '<div class="form-group">' +
                  '<label for="demo-title">Job Title*</label>' +
                  '<input id="demo-title" type="text" placeholder="What\'s your title?" required>' +
                '</div>' +
                '<div class="form-group full">' +
                  '<label for="demo-help">How can we assist you?*</label>' +
                  '<select id="demo-help" required>' +
                    '<option value="">Select...</option>' +
                    '<option>Request Demo</option>' +
                    '<option>Pricing</option>' +
                    '<option>General Inquiry</option>' +
                  '</select>' +
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

  document.querySelectorAll('.btn.primary, .highlight-btn, .endpoint-btn.light, a.whyus-btn[href="#"], .cta-bar .btn-outline').forEach(function (btn) {
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
        emailjs.sendForm('service_default', 'template_default', this, 'user_default')
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
