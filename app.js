const searchInput = document.querySelector("#search");
const filterButtons = document.querySelectorAll(".filter");
const cardsContainer = document.querySelector("#opportunities");
const emptyMessage = document.querySelector(".empty");
const contactForm = document.querySelector("#contact-form");
const formStatus = document.querySelector("#form-status");
let activeCategory = "All";

function categoryClass(category) {
  return `category-${category.toLowerCase()}`;
}

function renderCards() {
  cardsContainer.innerHTML = opportunities.map((item) => `
    <a class="card" href="detail.html?ref=${item.ref}" data-category="${item.category}" data-search="${item.search}">
      <img src="${item.image}" alt="${item.alt}" loading="lazy">
      <div class="card-body">
        <div class="card-meta">
          <span class="ref">${item.ref}</span>
          <span class="category ${categoryClass(item.category)}">${item.category}</span>
        </div>
        <h2>${item.title}</h2>
        <p>${item.summary}</p>
        <dl>
          <div>
            <dt>Location</dt>
            <dd>${item.location}</dd>
          </div>
          <div>
            <dt>Commitment</dt>
            <dd>${item.commitment}</dd>
          </div>
        </dl>
      </div>
    </a>
  `).join("");
}

function updateCards() {
  const searchTerm = searchInput.value.trim().toLowerCase();
  const cards = document.querySelectorAll(".card");
  let visibleCount = 0;

  cards.forEach((card) => {
    const matchesCategory = activeCategory === "All" || card.dataset.category === activeCategory;
    const searchableText = `${card.textContent} ${card.dataset.search}`.toLowerCase();
    const matchesSearch = searchableText.includes(searchTerm);
    const isVisible = matchesCategory && matchesSearch;

    card.hidden = !isVisible;
    if (isVisible) {
      visibleCount += 1;
    }
  });

  emptyMessage.hidden = visibleCount > 0;
}

filterButtons.forEach((button) => {
  button.addEventListener("click", () => {
    activeCategory = button.dataset.category;
    filterButtons.forEach((item) => item.classList.remove("is-active"));
    button.classList.add("is-active");
    updateCards();
  });
});

searchInput.addEventListener("input", updateCards);

contactForm.addEventListener("submit", (event) => {
  event.preventDefault();
  contactForm.reset();
  formStatus.textContent = "Thanks. This demo form does not send yet, but your message was captured for the prototype.";
});

renderCards();
