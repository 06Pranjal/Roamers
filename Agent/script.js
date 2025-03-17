const serviceFields = {
  hotel: [
    { key: "rooms", label: "Number of Rooms" },
    { key: "priceRange", label: "Price Range per Night" },
    { key: "amenities", label: "Amenities" },
  ],
  transportation: [
    { key: "vehicleTypes", label: "Vehicle Types" },
    { key: "capacity", label: "Fleet Size" },
    { key: "coverage", label: "Service Coverage Area" },
  ],
  restaurant: [
    { key: "cuisine", label: "Cuisine Type" },
    { key: "seating", label: "Seating Capacity" },
    { key: "specialties", label: "Specialties" },
  ],
};

const serviceIcons = {
  hotel: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <path d="M3 14h18v7H3z"/><path d="M21 7v7H3V7l9-4 9 4"/><path d="M6 14v7"/><path d="M18 14v7"/>
    </svg>`,
  transportation: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <path d="M14 16H9m10 0h3v-3.15a1 1 0 0 0-.84-.99L16 11l-2.7-3.6a1 1 0 0 0-.8-.4H5.24a2 2 0 0 0-1.8 1.1l-.8 1.63A6 6 0 0 0 2 12.42V16h2"/><circle cx="6.5" cy="16.5" r="2.5"/><circle cx="16.5" cy="16.5" r="2.5"/>
    </svg>`,
  restaurant: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <path d="M3 2v7c0 1.1.9 2 2 2h4a2 2 0 0 0 2-2V2M7 2v20M19 2v7c0 1.1-.9 2-2 2h-4a2 2 0 0 1-2-2V2"/>
    </svg>`,
};

let agents = [];

function updateDynamicFields() {
  const serviceType = document.getElementById("serviceType").value;
  const dynamicFields = document.getElementById("dynamicFields");
  dynamicFields.innerHTML = "";

  serviceFields[serviceType].forEach((field) => {
    const div = document.createElement("div");
    div.className = "form-group";
    div.innerHTML = `
            <label for="${field.key}">${field.label}</label>
            <input type="text" id="${field.key}" required>
        `;
    dynamicFields.appendChild(div);
  });
}

function createAgentCard(agent) {
  const card = document.createElement("div");
  card.className = "agent-card";
  card.innerHTML = `
        <div class="card-header">
            <div class="business-info">
                ${serviceIcons[agent.serviceType]}
                <h3>${agent.businessName}</h3>
            </div>
            <span class="service-badge">${agent.serviceType}</span>
        </div>
        <div class="agent-info">
            <div class="info-item">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/>
                    <circle cx="12" cy="7" r="4"/>
                </svg>
                ${agent.name}
            </div>
            <div class="info-item">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                    <polyline points="22,6 12,13 2,6"/>
                </svg>
                ${agent.email}
            </div>
            <div class="info-item">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>
                </svg>
                ${agent.phone}
            </div>
            <div class="info-item">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
                    <circle cx="12" cy="10" r="3"/>
                </svg>
                ${agent.location}
            </div>
        </div>
        <div class="service-details">
            <h4>Service Details</h4>
            ${Object.entries(agent.details)
              .map(
                ([key, value]) => `
                    <div class="detail-item">
                        <span class="detail-label">${key}:</span>
                        <span>${value}</span>
                    </div>
                `
              )
              .join("")}
        </div>
    `;
  return card;
}

function handleSubmit(e) {
  e.preventDefault();

  const serviceType = document.getElementById("serviceType").value;
  const details = {};

  serviceFields[serviceType].forEach((field) => {
    details[field.key] = document.getElementById(field.key).value;
  });

  const agent = {
    name: document.getElementById("name").value,
    email: document.getElementById("email").value,
    phone: document.getElementById("phone").value,
    businessName: document.getElementById("businessName").value,
    location: document.getElementById("location").value,
    serviceType,
    details,
  };

  agents.push(agent);

  const agentCards = document.getElementById("agentCards");
  agentCards.appendChild(createAgentCard(agent));

  e.target.reset();
  updateDynamicFields();
}

document
  .getElementById("serviceType")
  .addEventListener("change", updateDynamicFields);
document
  .getElementById("registrationForm")
  .addEventListener("submit", handleSubmit);

// Initialize dynamic fields
updateDynamicFields();
