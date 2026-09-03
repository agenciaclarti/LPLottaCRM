(() => {
  "use strict";

  // Altere somente este valor quando o destino comercial estiver definido.
  const CTA_TARGET = "#contato";
  document.querySelectorAll("[data-primary-cta]").forEach((link) => {
    link.setAttribute("href", CTA_TARGET);
  });

  const header = document.querySelector(".site-header");
  const menuButton = document.querySelector(".menu-toggle");
  const navigation = document.querySelector(".primary-nav");
  const mobileBreakpoint = window.matchMedia("(max-width: 860px)");

  const setMenu = (open) => {
    menuButton.setAttribute("aria-expanded", String(open));
    menuButton.setAttribute("aria-label", open ? "Fechar menu" : "Abrir menu");
    navigation.classList.toggle("is-open", open);
    document.body.classList.toggle("menu-open", open);
  };

  menuButton.addEventListener("click", () => {
    setMenu(menuButton.getAttribute("aria-expanded") !== "true");
  });

  navigation.addEventListener("click", (event) => {
    if (event.target.closest("a") && mobileBreakpoint.matches) setMenu(false);
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && menuButton.getAttribute("aria-expanded") === "true") {
      setMenu(false);
      menuButton.focus();
    }
  });

  mobileBreakpoint.addEventListener("change", (event) => {
    if (!event.matches) setMenu(false);
  });

  const updateHeader = () => header.classList.toggle("is-scrolled", window.scrollY > 18);
  updateHeader();
  window.addEventListener("scroll", updateHeader, { passive: true });

  document.querySelectorAll("[data-product-image]").forEach((frame) => {
    const image = frame.querySelector("[data-product-img]");
    const showImage = () => frame.classList.add("has-image");
    const showPlaceholder = () => frame.classList.remove("has-image");

    image.addEventListener("load", showImage);
    image.addEventListener("error", showPlaceholder);

    if (image.complete) {
      image.naturalWidth > 0 ? showImage() : showPlaceholder();
    }
  });

  document.querySelectorAll(".faq-item button").forEach((button) => {
    button.addEventListener("click", () => {
      const isOpen = button.getAttribute("aria-expanded") === "true";
      const answer = document.getElementById(button.getAttribute("aria-controls"));

      document.querySelectorAll(".faq-item button[aria-expanded='true']").forEach((openButton) => {
        if (openButton === button) return;
        openButton.setAttribute("aria-expanded", "false");
        document.getElementById(openButton.getAttribute("aria-controls")).hidden = true;
      });

      button.setAttribute("aria-expanded", String(!isOpen));
      answer.hidden = isOpen;
    });
  });

  const revealItems = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver(
      (entries, currentObserver) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.classList.add("is-visible");
          currentObserver.unobserve(entry.target);
        });
      },
      { rootMargin: "0px 0px -8%", threshold: 0.08 },
    );

    revealItems.forEach((item) => observer.observe(item));
  } else {
    revealItems.forEach((item) => item.classList.add("is-visible"));
  }
})();
