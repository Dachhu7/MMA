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
});
