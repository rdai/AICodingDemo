const detailContainer = document.querySelector("#detail");
const params = new URLSearchParams(window.location.search);
const ref = params.get("ref");
const item = opportunities.find((opportunity) => opportunity.ref === ref);

function categoryClass(category) {
  return `category-${category.toLowerCase()}`;
}

if (!item) {
  detailContainer.innerHTML = `
    <div class="detail-card">
      <h1>Opportunity not found</h1>
      <p>The reference number in the link does not match one of the sample opportunities.</p>
      <a class="submit-button inline-button" href="index.html">View all opportunities</a>
    </div>
  `;
} else {
  document.title = `${item.ref} | ${item.title}`;
  detailContainer.innerHTML = `
    <article class="detail-card">
      <img class="detail-image" src="${item.image}" alt="${item.alt}">
      <div class="detail-content">
        <div class="card-meta">
          <span class="ref">${item.ref}</span>
          <span class="category ${categoryClass(item.category)}">${item.category}</span>
        </div>
        <h1>${item.title}</h1>
        <p class="lead">${item.summary}</p>
        <p>${item.details}</p>
        <dl class="detail-list">
          <div>
            <dt>Location</dt>
            <dd>${item.location}</dd>
          </div>
          <div>
            <dt>Commitment</dt>
            <dd>${item.commitment}</dd>
          </div>
          <div>
            <dt>Reference</dt>
            <dd>${item.ref}</dd>
          </div>
        </dl>
        <a class="submit-button inline-button" href="index.html#contact-title">Ask about this opportunity</a>
      </div>
    </article>
  `;
}
