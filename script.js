const opportunities = [
  {
    title: "Media Outreach Helper",
    location: "Online",
    skillArea: "Media",
    type: "Remote",
    description: "Help create simple social media content for outreach campaigns.",
  },
  {
    title: "Language Resource Reviewer",
    location: "Thailand",
    skillArea: "Translation",
    type: "Ongoing",
    description: "Review gospel resources and help organize them by language.",
  },
  {
    title: "Japan Digital Outreach Volunteer",
    location: "Japan / Online",
    skillArea: "Follow-up",
    type: "Remote",
    description: "Help respond to people who are exploring faith through online ads.",
  },
  {
    title: "Training Support Assistant",
    location: "Kenya",
    skillArea: "Admin",
    type: "Short-term",
    description: "Help organize training materials, signups, and participant follow-up.",
  },
  {
    title: "Discipleship Content Helper",
    location: "Online",
    skillArea: "Teaching",
    type: "Remote",
    description: "Help prepare simple discipleship lessons and discussion guides.",
  },
];

const locationFilter = document.querySelector("#locationFilter");
const skillFilter = document.querySelector("#skillFilter");
const typeFilter = document.querySelector("#typeFilter");
const opportunityList = document.querySelector("#opportunityList");

function getUniqueValues(fieldName) {
  return [...new Set(opportunities.map((opportunity) => opportunity[fieldName]))];
}

function addOptions(selectElement, options) {
  options.forEach((optionText) => {
    const option = document.createElement("option");
    option.value = optionText;
    option.textContent = optionText;
    selectElement.appendChild(option);
  });
}

function createCard(opportunity) {
  const card = document.createElement("article");
  card.className = "card";

  card.innerHTML = `
    <h2>${opportunity.title}</h2>
    <p class="meta"><strong>Location:</strong> ${opportunity.location}</p>
    <p class="meta"><strong>Skill Area:</strong> ${opportunity.skillArea}</p>
    <p class="meta"><strong>Type:</strong> ${opportunity.type}</p>
    <p>${opportunity.description}</p>
    <button type="button">Click here</button>
  `;

  return card;
}

function filterOpportunities() {
  const selectedLocation = locationFilter.value;
  const selectedSkill = skillFilter.value;
  const selectedType = typeFilter.value;

  const filteredOpportunities = opportunities.filter((opportunity) => {
    const locationMatches =
      selectedLocation === "All" || opportunity.location === selectedLocation;
    const skillMatches =
      selectedSkill === "All" || opportunity.skillArea === selectedSkill;
    const typeMatches = selectedType === "All" || opportunity.type === selectedType;

    return locationMatches && skillMatches && typeMatches;
  });

  renderOpportunities(filteredOpportunities);
}

function renderOpportunities(items) {
  opportunityList.innerHTML = "";

  if (items.length === 0) {
    const message = document.createElement("p");
    message.className = "empty-message";
    message.textContent = "No opportunities match those filters.";
    opportunityList.appendChild(message);
    return;
  }

  items.forEach((opportunity) => {
    opportunityList.appendChild(createCard(opportunity));
  });
}

addOptions(locationFilter, getUniqueValues("location"));
addOptions(skillFilter, getUniqueValues("skillArea"));
addOptions(typeFilter, getUniqueValues("type"));

locationFilter.addEventListener("change", filterOpportunities);
skillFilter.addEventListener("change", filterOpportunities);
typeFilter.addEventListener("change", filterOpportunities);

renderOpportunities(opportunities);
