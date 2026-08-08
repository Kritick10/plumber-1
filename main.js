"use strict";

/* Mobile navigation */

const menuToggle = document.querySelector(".menu-toggle");
const primaryNavigation = document.querySelector(".primary-navigation");
const navigationLinks = document.querySelectorAll(".primary-navigation a");

if (menuToggle && primaryNavigation) {
  menuToggle.addEventListener("click", () => {
    const isOpen = primaryNavigation.classList.toggle("is-open");

    menuToggle.setAttribute("aria-expanded", String(isOpen));
    document.body.classList.toggle("no-scroll", isOpen);

    const menuLines = menuToggle.querySelectorAll(".menu-line");

    if (isOpen) {
      menuLines[0].style.transform = "translateY(7px) rotate(45deg)";
      menuLines[1].style.opacity = "0";
      menuLines[2].style.transform = "translateY(-7px) rotate(-45deg)";
    } else {
      menuLines[0].style.transform = "";
      menuLines[1].style.opacity = "";
      menuLines[2].style.transform = "";
    }
  });
}

/* Close mobile navigation after selecting a link */

navigationLinks.forEach((link) => {
  link.addEventListener("click", () => {
    if (!primaryNavigation || !menuToggle) return;

    primaryNavigation.classList.remove("is-open");
    menuToggle.setAttribute("aria-expanded", "false");
    document.body.classList.remove("no-scroll");

    const menuLines = menuToggle.querySelectorAll(".menu-line");

    menuLines[0].style.transform = "";
    menuLines[1].style.opacity = "";
    menuLines[2].style.transform = "";
  });
});

/* Close mobile navigation when pressing Escape */

document.addEventListener("keydown", (event) => {
  if (event.key !== "Escape") return;

  if (primaryNavigation && primaryNavigation.classList.contains("is-open")) {
    primaryNavigation.classList.remove("is-open");
    document.body.classList.remove("no-scroll");

    if (menuToggle) {
      menuToggle.setAttribute("aria-expanded", "false");

      const menuLines = menuToggle.querySelectorAll(".menu-line");

      menuLines[0].style.transform = "";
      menuLines[1].style.opacity = "";
      menuLines[2].style.transform = "";
    }
  }
});

/* Sticky header shadow */

const siteHeader = document.querySelector(".site-header");

function updateHeaderOnScroll() {
  if (!siteHeader) return;

  if (window.scrollY > 20) {
    siteHeader.classList.add("scrolled");
  } else {
    siteHeader.classList.remove("scrolled");
  }
}

window.addEventListener("scroll", updateHeaderOnScroll, {
  passive: true
});

updateHeaderOnScroll();

/* Scroll reveal animation */

const revealElements = document.querySelectorAll(
  ".service-card, .process-step, .project-card, .testimonial-panel, .area-list a"
);

if ("IntersectionObserver" in window) {
  const revealObserver = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;

        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      });
    },
    {
      threshold: 0.12
    }
  );

  revealElements.forEach((element) => {
    element.classList.add("reveal-element");
    revealObserver.observe(element);
  });
} else {
  revealElements.forEach((element) => {
    element.classList.add("is-visible");
  });
}

/* Smooth scrolling for same-page links */

document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", (event) => {
    const targetId = anchor.getAttribute("href");

    if (!targetId || targetId === "#") return;

    const targetElement = document.querySelector(targetId);

    if (!targetElement) return;

    event.preventDefault();

    targetElement.scrollIntoView({
      behavior: "smooth",
      block: "start"
    });
  });
});

/* Current year support */

document.querySelectorAll("[data-current-year]").forEach((element) => {
  element.textContent = new Date().getFullYear();
});
