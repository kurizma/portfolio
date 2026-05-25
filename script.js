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
});