document.addEventListener("DOMContentLoaded", function () {
  // ================== Carousel Functionality ====================
  const carousel = document.querySelector("#homeCarousel");
  if (carousel) {
    let slideIndex = 0;
    const slides = document.querySelectorAll(".carousel-item");

    if (slides.length > 0 && !document.querySelector(".carousel-item.active")) {
      slides[0].classList.add("active");
    }

    function autoSlide() {
      if (slides.length > 0) {
        slides[slideIndex].classList.remove("active");
        slideIndex = (slideIndex + 1) % slides.length;
        slides[slideIndex].classList.add("active");
      }
    }

    setInterval(autoSlide, 5000);
  }

  // ================== jQuery Filter Functionality ====================
  if (typeof $ !== "undefined") {
    $(".filter-item").click(function () {
      const value = $(this).attr("data-filter");
      if (value === "all") {
        $(".post").show(1000);
      } else {
        $(".post").not("." + value).hide(1000);
        $(".post").filter("." + value).show(1000);
      }
    });
  }

  // ================== Sticky Navbar ====================
  const navbar = document.getElementById("navbar-top");
  if (navbar) {
    window.addEventListener("scroll", function () {
      if (window.scrollY > 50) {
        navbar.classList.add("fixed-top");
        document.body.classList.add("fixed-navbar");
      } else {
        navbar.classList.remove("fixed-top");
        document.body.classList.remove("fixed-navbar");
      }
    });
  }

  // ================== Back to Top Button ====================
  const backToTopButton = document.getElementById("btn-back-to-top");
  if (backToTopButton) {
    window.addEventListener("scroll", function () {
      backToTopButton.style.display = window.scrollY > 20 ? "block" : "none";
    });

    backToTopButton.addEventListener("click", function () {
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  }

  // ================== About Section Scroll Animation ====================
  const aboutSection = document.querySelector("#about");
  if (aboutSection) {
    aboutSection.style.opacity = "0";
    aboutSection.style.transform = "translateY(30px)";
    aboutSection.style.transition = "opacity 0.8s ease-out, transform 0.8s ease-out";

    const observer = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            aboutSection.style.opacity = "1";
            aboutSection.style.transform = "translateY(0)";
            observer.unobserve(aboutSection);
          }
        });
      },
      { threshold: 0.3 }
    );
    observer.observe(aboutSection);
  }

  // ================== Form Validation ====================
  const contactForm = document.getElementById("contactForm");
  if (contactForm) {
    contactForm.addEventListener("submit", function (event) {
      event.preventDefault();
      let isValid = true;

      const name = document.getElementById("name").value.trim();
      const email = document.getElementById("email").value.trim();
      const mobile = document.getElementById("mobile").value.trim();
      const message = document.getElementById("message").value.trim();

      // Name validation
      if (name === "") {
        isValid = false;
        document.getElementById("nameError").classList.remove("d-none");
      } else {
        document.getElementById("nameError").classList.add("d-none");
      }

      // Email validation
      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailPattern.test(email)) {
        isValid = false;
        document.getElementById("emailError").classList.remove("d-none");
      } else {
        document.getElementById("emailError").classList.add("d-none");
      }

      // Mobile number validation
      const mobilePattern = /^[0-9]{10}$/;
      if (!mobilePattern.test(mobile)) {
        isValid = false;
        document.getElementById("mobileError").classList.remove("d-none");
      } else {
        document.getElementById("mobileError").classList.add("d-none");
      }

      // Message validation
      if (message === "") {
        isValid = false;
        document.getElementById("messageError").classList.remove("d-none");
      } else {
        document.getElementById("messageError").classList.add("d-none");
      }

      if (isValid) {
        alert("Form submitted successfully!");
        contactForm.reset();
      }
    });
  }

  // ================== Close Mobile Menu when clicking outside ====================
  const navbarToggler = document.querySelector(".navbar-toggler");
  const navbarCollapse = document.querySelector("#navbarNav");

  document.addEventListener("click", function (event) {
    if (
      navbarToggler &&
      navbarCollapse &&
      !navbarToggler.contains(event.target) &&
      !navbarCollapse.contains(event.target)
    ) {
      navbarCollapse.classList.remove("show");
    }
  });

  // ================== Read More Buttons ====================
  const readMoreButtons = document.querySelectorAll(".read-more-btn");
  if (readMoreButtons.length > 0) {
    readMoreButtons.forEach((button) => {
      button.addEventListener("click", function () {
        const content = this.nextElementSibling;
        if (content) {
          if (content.style.display === "block") {
            content.style.display = "none";
            this.textContent = "Read More";
          } else {
            content.style.display = "block";
            this.textContent = "Read Less";
          }
        }
      });
    });
  }

  // ================== Footer Logo Animation ====================
  const logo = document.querySelector(".footer-logo");
  if (logo) {
    logo.style.opacity = 0;
    logo.style.transition = "opacity 1s ease-in-out";
    setTimeout(() => {
      logo.style.opacity = 1;
    }, 200);
  }
});


let phraseIndex = 0;
let charIndex = 0;
let typingDelay = 100;
let erasingDelay = 60;
let nextPhraseDelay = 2000;

function type() {
  if (!typedText) return;
  if (charIndex < phrases[phraseIndex].length) {
    typedText.textContent += phrases[phraseIndex].charAt(charIndex);
    charIndex++;
    setTimeout(type, typingDelay);
  } else {
    setTimeout(erase, nextPhraseDelay);
  }
}

function erase() {
  if (!typedText) return;
  if (charIndex > 0) {
    typedText.textContent = phrases[phraseIndex].substring(0, charIndex - 1);
    charIndex--;
    setTimeout(erase, erasingDelay);
  } else {
    phraseIndex++;
    if (phraseIndex >= phrases.length) phraseIndex = 0;
    setTimeout(type, typingDelay);
  }
}

document.addEventListener('DOMContentLoaded', () => {
  if (typedText && phrases.length) setTimeout(type, 800);
});


  const hamburger = document.querySelector(".hamburger");
  const navBox = document.querySelector(".nav-box");

  hamburger.addEventListener("click", () => {
    navBox.classList.toggle("open");
  });

