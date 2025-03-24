// DOM Elements
const searchForm = document.getElementById("searchForm");
const flightsList = document.getElementById("flightsList");
const bookingModal = document.getElementById("bookingModal");
const bookingForm = document.getElementById("bookingForm");
const closeBtn = document.querySelector(".close-btn");
const flightSummary = document.getElementById("flightSummary");
const mainPage = document.getElementById("mainPage");
const dashboardPage = document.getElementById("dashboardPage");
const bookingsPage = document.getElementById("bookingsPage");
const flightDetailsPage = document.getElementById("flightDetailsPage");
const flightDetailsTitle = document.getElementById("flightDetailsTitle");
const flightDetailsInfo = document.getElementById("flightDetailsInfo");

// Current selected flight
let selectedFlight = null;

// Navigation functions
function showMainPage() {
  mainPage.style.display = "block";
  dashboardPage.style.display = "none";
  bookingsPage.style.display = "none";
  flightDetailsPage.style.display = "none";
  updateNavLinks("home");
}

function showDashboard() {
  mainPage.style.display = "none";
  dashboardPage.style.display = "block";
  bookingsPage.style.display = "none";
  flightDetailsPage.style.display = "none";
  updateNavLinks("dashboard");
}

function showMyBookings() {
  mainPage.style.display = "none";
  dashboardPage.style.display = "none";
  bookingsPage.style.display = "block";
  flightDetailsPage.style.display = "none";
  updateNavLinks("bookings");
}

function updateNavLinks(active) {
  document.querySelectorAll(".nav-link").forEach((link) => {
    link.classList.remove("active");
    if (link.textContent.toLowerCase().includes(active)) {
      link.classList.add("active");
    }
  });
}

// Search flights
searchForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const from = document.getElementById("from").value.toLowerCase();
  const to = document.getElementById("to").value.toLowerCase();
  const date = document.getElementById("date").value;

  const filteredFlights = flights.filter(
    (flight) =>
      flight.from.toLowerCase().includes(from) &&
      flight.to.toLowerCase().includes(to) &&
      flight.departureDate === date
  );

  displayFlights(filteredFlights);
});

// Display flights
function displayFlights(flightsList) {
  const flightsHTML = flightsList.length
    ? flightsList
        .map(
          (flight) => `
    <div class="flight-card">
      <div class="flight-header">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="plane-icon">
          <path d="M17.8 19.2 16 11l3.5-3.5C21 6 21.5 4 21 3c-1-.5-3 0-4.5 1.5L13 8 4.8 6.2c-.5-.1-.9.1-1.1.5l-.3.5c-.2.5-.1 1 .3 1.3L9 12l-2 3H4l-1 1 3 2 2 3 1-1v-3l3-2 3.5 5.3c.3.4.8.5 1.3.3l.5-.2c.4-.3.6-.7.5-1.2z"></path>
        </svg>
        <div>
          <h4>${flight.airline}</h4>
          <p>Flight ${flight.flightNumber}</p>
        </div>
      </div>
      <div class="flight-details">
        <div class="flight-info">
          <h4>Departure</h4>
          <p>${flight.from}</p>
          <p>${flight.departureDate} - ${flight.departureTime}</p>
        </div>
        <div class="flight-info">
          <h4>Arrival</h4>
          <p>${flight.to}</p>
          <p>${flight.arrivalDate} - ${flight.arrivalTime}</p>
        </div>
        <div class="flight-info">
          <p class="flight-price">$${flight.price}</p>
          <p>Duration: ${flight.duration}</p>
          <p>${flight.seatsAvailable} seats available</p>
        </div>
      </div>
      <div style="display: flex; gap: 1rem;">
        <button class="book-now-btn" onclick="openBooking('${flight.id}')">
          Book Now
        </button>
        <button class="book-now-btn" style="background-color: #4b5563;" onclick="showFlightDetails('${flight.id}')">
          View Details
        </button>
      </div>
    </div>
  `
        )
        .join("")
    : '<p class="no-flights">No flights found matching your criteria.</p>';

  document.getElementById("flightsList").innerHTML = flightsHTML;
}

// Initialize with all flights
displayFlights(flights);

// Show flight details page
function showFlightDetails(flightId) {
  const flight = flights.find((f) => f.id === flightId);
  if (!flight) return;

  mainPage.style.display = "none";
  flightDetailsPage.style.display = "block";

  flightDetailsTitle.textContent = `${flight.from} to ${flight.to}`;

  flightDetailsInfo.innerHTML = `
    <div class="flight-info-grid">
      <div class="flight-info-card">
        <h3>Flight Information</h3>
        <p><strong>Airline:</strong> ${flight.airline}</p>
        <p><strong>Flight Number:</strong> ${flight.flightNumber}</p>
        <p><strong>Duration:</strong> ${flight.duration}</p>
        <p><strong>Available Seats:</strong> ${flight.seatsAvailable}</p>
      </div>
      
      <div class="flight-info-card">
        <h3>Departure</h3>
        <p><strong>From:</strong> ${flight.from}</p>
        <p><strong>Date:</strong> ${flight.departureDate}</p>
        <p><strong>Time:</strong> ${flight.departureTime}</p>
      </div>
      
      <div class="flight-info-card">
        <h3>Arrival</h3>
        <p><strong>To:</strong> ${flight.to}</p>
        <p><strong>Date:</strong> ${flight.arrivalDate}</p>
        <p><strong>Time:</strong> ${flight.arrivalTime}</p>
      </div>
      
      <div class="flight-info-card">
        <h3>Price</h3>
        <p class="flight-price">$${flight.price}</p>
        <button class="book-now-btn" style="width: 100%; margin-top: 1rem;" onclick="openBooking('${flight.id}')">
          Book Now
        </button>
      </div>
    </div>
    
    <div style="margin-top: 2rem;">
      <h3>Flight Route</h3>
      <img src="https://images.unsplash.com/photo-1539683255143-73a6b838b106?auto=format&fit=crop&w=2000&q=80" 
           alt="World Map" 
           style="width: 100%; height: 300px; object-fit: cover; border-radius: 0.5rem; margin-top: 1rem;">
    </div>
  `;
}

// Booking modal functions
function openBooking(flightId) {
  selectedFlight = flights.find((f) => f.id === flightId);
  if (!selectedFlight) return;

  flightSummary.innerHTML = `
    <h3>Flight Details</h3>
    <p>${selectedFlight.from} → ${selectedFlight.to}</p>
    <p>Date: ${selectedFlight.departureDate} at ${selectedFlight.departureTime}</p>
    <p>Price: $${selectedFlight.price}</p>
  `;

  bookingModal.style.display = "block";
}

// Close modal
closeBtn.addEventListener("click", () => {
  bookingModal.style.display = "none";
  selectedFlight = null;
});

// Close modal when clicking outside
window.addEventListener("click", (e) => {
  if (e.target === bookingModal) {
    bookingModal.style.display = "none";
    selectedFlight = null;
  }
});

// Handle booking form submission
bookingForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const formData = {
    firstName: document.getElementById("firstName").value,
    lastName: document.getElementById("lastName").value,
    email: document.getElementById("email").value,
    phone: document.getElementById("phone").value,
    passportNumber: document.getElementById("passportNumber").value,
    dateOfBirth: document.getElementById("dateOfBirth").value,
  };

  // In a real application, this would send the booking data to a server
  console.log("Booking submitted:", {
    flight: selectedFlight,
    passenger: formData,
  });
  alert("Booking successful! Thank you for choosing our airline.");

  bookingModal.style.display = "none";
  bookingForm.reset();
  selectedFlight = null;
});
