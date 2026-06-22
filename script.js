// ========================================
// TYPING ANIMATION
// ========================================

const roleTexts = [
  "Data Scientist",
  "Data Analyst",
  "Machine Learning Enthusiast",
];

const roleElement = document.getElementById("typing-role");

let roleIndex = 0;
let charIndex = 0;
let isDeleting = false;

function typeEffect() {
  const currentRole = roleTexts[roleIndex];

  if (!isDeleting) {
    roleElement.textContent = currentRole.substring(0, charIndex + 1);

    charIndex++;

    if (charIndex === currentRole.length) {
      isDeleting = true;

      setTimeout(typeEffect, 1500);
      return;
    }
  } else {
    roleElement.textContent = currentRole.substring(0, charIndex - 1);

    charIndex--;

    if (charIndex === 0) {
      isDeleting = false;
      roleIndex++;

      if (roleIndex >= roleTexts.length) {
        roleIndex = 0;
      }
    }
  }

  setTimeout(typeEffect, isDeleting ? 50 : 100);
}

document.addEventListener("DOMContentLoaded", () => {
  typeEffect();
});

// ========================================
// ACTIVE NAVBAR ON SCROLL
// ========================================

const sections = document.querySelectorAll("section, main");

const navLinks = document.querySelectorAll(".nav-link");

window.addEventListener("scroll", () => {
  let current = "";

  sections.forEach((section) => {
    const sectionTop = section.offsetTop - 150;

    const sectionHeight = section.clientHeight;

    if (pageYOffset >= sectionTop && pageYOffset < sectionTop + sectionHeight) {
      current = section.getAttribute("id");
    }
  });

  navLinks.forEach((link) => {
    link.classList.remove("active");

    if (link.getAttribute("href") === `#${current}`) {
      link.classList.add("active");
    }
  });
});

// ========================================
// SMOOTH SCROLL
// ========================================

document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();

    const target = document.querySelector(this.getAttribute("href"));

    if (target) {
      window.scrollTo({
        top: target.offsetTop - 90,
        behavior: "smooth",
      });
    }
  });
});

// ========================================
// REVEAL ANIMATION
// ========================================

const revealElements = document.querySelectorAll(
  ".skill-card, .project-card, .certificate-card, .edu-card",
);

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("show");
      }
    });
  },

  {
    threshold: 0.15,
  },
);

revealElements.forEach((element) => {
  element.classList.add("hidden");

  revealObserver.observe(element);
});

// ========================================
// SCROLL PROGRESS BAR
// ========================================

const progressBar = document.createElement("div");

progressBar.id = "scroll-progress";

document.body.appendChild(progressBar);

window.addEventListener("scroll", () => {
  const scrollTop = document.documentElement.scrollTop;

  const scrollHeight =
    document.documentElement.scrollHeight -
    document.documentElement.clientHeight;

  const scrollPercent = (scrollTop / scrollHeight) * 100;

  progressBar.style.width = scrollPercent + "%";
});

// ========================================
// PARALLAX PROFILE IMAGE
// ========================================

const profileImage = document.querySelector(".profile-img");

window.addEventListener("scroll", () => {
  if (!profileImage) return;

  let offset = window.scrollY * 0.08;

  profileImage.style.transform = `translateY(${offset}px)`;
});

// ========================================
// PROJECT CARD HOVER EFFECT
// ========================================

const cards = document.querySelectorAll(".project-card");

cards.forEach((card) => {
  card.addEventListener("mousemove", (e) => {
    const rect = card.getBoundingClientRect();

    const x = e.clientX - rect.left;

    const y = e.clientY - rect.top;

    card.style.transform = `
        perspective(1000px)
        rotateX(${(y - rect.height / 2) / 20}deg)
        rotateY(${-(x - rect.width / 2) / 20}deg)
        translateY(-5px)
      `;
  });

  card.addEventListener("mouseleave", () => {
    card.style.transform = "translateY(0)";
  });
});

// ========================================
// COUNTER ANIMATION
// ========================================

const counters = document.querySelectorAll(".counter");

const counterObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      const counter = entry.target;

      const target = parseInt(counter.dataset.target);

      let count = 0;

      const speed = target / 100;

      const update = () => {
        count += speed;

        if (count < target) {
          counter.textContent = Math.floor(count);

          requestAnimationFrame(update);
        } else {
          counter.textContent = target;
        }
      };

      update();

      counterObserver.unobserve(counter);
    }
  });
});

counters.forEach((counter) => {
  counterObserver.observe(counter);
});

// ========================================
// PAGE LOADER EFFECT
// ========================================

window.addEventListener("load", () => {
  document.body.classList.add("loaded");
});
