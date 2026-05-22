const yearElement = document.querySelector("#year");

if (yearElement) {
  yearElement.textContent = new Date().getFullYear();
}

const currentPage = window.location.pathname.split("/").pop() || "index.html";
const activeNav = currentPage === "contact.html" ? "contact" : "home";

document.querySelectorAll("[data-nav]").forEach((link) => {
  if (link.dataset.nav === activeNav) {
    link.classList.add("active");
  }
});

// Hamburger menu functionality
const hamburger = document.querySelector(".hamburger");
const sidebar = document.querySelector(".sidebar");
const sidebarLinks = document.querySelectorAll(".sidebar-link");

if (hamburger) {
  hamburger.addEventListener("click", () => {
    hamburger.classList.toggle("active");
    sidebar.classList.toggle("open");
    hamburger.setAttribute("aria-expanded", hamburger.classList.contains("active"));
  });
}

// Close sidebar when a link is clicked
sidebarLinks.forEach((link) => {
  link.addEventListener("click", () => {
    hamburger.classList.remove("active");
    sidebar.classList.remove("open");
    hamburger.setAttribute("aria-expanded", "false");
  });
});

// Close sidebar when clicking outside
if (hamburger && sidebar) {
  document.addEventListener("click", (e) => {
    if (!e.target.closest(".hamburger") && !e.target.closest(".sidebar")) {
      hamburger.classList.remove("active");
      sidebar.classList.remove("open");
      hamburger.setAttribute("aria-expanded", "false");
    }
  });
}

const revealElements = document.querySelectorAll(".reveal-on-scroll");

if ("IntersectionObserver" in window) {
  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          revealObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.18 }
  );

  revealElements.forEach((element) => revealObserver.observe(element));
} else {
  revealElements.forEach((element) => element.classList.add("is-visible"));
}