document.addEventListener("DOMContentLoaded", () => {

  // Panel 2
  const cards = document.querySelectorAll("#panel-2 .project-card");
  const image = document.querySelector("#project-image");
  const captionTitle = document.querySelector("#project-caption-title");
  const captionText = document.querySelector("#project-caption-text");

  const imageClasses = [
    "showcase-image--bomberman",
    "showcase-image--ecommerce",
    "showcase-image--holeinbin"
  ];

  cards.forEach((card) => {
    card.addEventListener("click", () => {
      cards.forEach((item) => {
        item.classList.remove("is-active");
        item.setAttribute("aria-pressed", "false");
      });

      card.classList.add("is-active");
      card.setAttribute("aria-pressed", "true");

      image.classList.remove(...imageClasses);
      image.classList.add(card.dataset.imageClass);

      captionTitle.textContent = card.dataset.captionTitle;
      captionText.textContent = card.dataset.captionText;
    });
  });

// Panel 3
  function diffInMonths(startDate, endDate) {
    let months =
      (endDate.getFullYear() - startDate.getFullYear()) * 12 +
      (endDate.getMonth() - startDate.getMonth());

    if (endDate.getDate() < startDate.getDate()) {
      months--;
    }

    return Math.max(0, months);
  }

  const experienceMonths = document.querySelector("#experience-months");

  if (experienceMonths) {
    const startedAt = new Date("2024-09-01");
    const now = new Date();
    const months = diffInMonths(startedAt, now);
    experienceMonths.textContent = `${months} months`;
  }


  // Scroll Sideways
  // Panel navigation
  const shell = document.querySelector(".horizontal-shell");
  const panels = Array.from(document.querySelectorAll(".panel"));
  const prevBtn = document.querySelector(".panel-nav__btn--prev");
  const nextBtn = document.querySelector(".panel-nav__btn--next");
  const navLinks = Array.from(document.querySelectorAll('.nav a[href^="#panel-"]'));

  if (shell && panels.length) {
    const getActivePanelIndex = () => {
      const shellCenter = shell.scrollLeft + shell.clientWidth / 2;

      let closestIndex = 0;
      let closestDistance = Infinity;

      panels.forEach((panel, index) => {
        const panelCenter = panel.offsetLeft + panel.offsetWidth / 2;
        const distance = Math.abs(panelCenter - shellCenter);

        if (distance < closestDistance) {
          closestDistance = distance;
          closestIndex = index;
        }
      });

      return closestIndex;
    };

    const scrollToPanel = (target) => {
      let panel = target;

      if (typeof target === "number") {
        const safeIndex = Math.max(0, Math.min(target, panels.length - 1));
        panel = panels[safeIndex];
      }

      if (!panel) return;

      panel.scrollIntoView({
        behavior: "smooth",
        block: "nearest",
        inline: "start"
      });
    };

    const updatePanelNav = () => {
      const activeIndex = getActivePanelIndex();

      if (prevBtn) {
        prevBtn.disabled = activeIndex === 0;
      }

      if (nextBtn) {
        nextBtn.disabled = activeIndex === panels.length - 1;
      }

      navLinks.forEach((link, index) => {
        const isActive = index === activeIndex;
        link.classList.toggle("is-active", isActive);
        link.setAttribute("aria-current", isActive ? "page" : "false");
      });
    };

    if (prevBtn) {
      prevBtn.addEventListener("click", () => {
        scrollToPanel(getActivePanelIndex() - 1);
      });
    }

    if (nextBtn) {
      nextBtn.addEventListener("click", () => {
        scrollToPanel(getActivePanelIndex() + 1);
      });
    }

    navLinks.forEach((link) => {
      link.addEventListener("click", (event) => {
        const targetId = link.getAttribute("href");
        const targetPanel = targetId ? document.querySelector(targetId) : null;

        if (!targetPanel) return;

        event.preventDefault();
        scrollToPanel(targetPanel);
      });
    });

    shell.addEventListener("scroll", updatePanelNav, { passive: true });
    window.addEventListener("resize", updatePanelNav);

    updatePanelNav();
  }


});