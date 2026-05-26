document.addEventListener("DOMContentLoaded", () => {
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
});