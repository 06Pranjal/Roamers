// Mock flight data
const mockFlights = [
  {
    id: "1",
    from: "London",
    to: "Paris",
    airline: "SkyWings",
    departure: "08:00",
    arrival: "10:30",
    price: 1999,
    duration: "2h 30m",
  },
  {
    id: "2",
    from: "London",
    to: "New York",
    airline: "TransAtlantic",
    departure: "14:00",
    arrival: "22:30",
    price: 4999,
    duration: "8h 30m",
  },
];

// DOM Elements
const flightSearchForm = document.getElementById("flightSearch");
const flightsList = document.getElementById("flightsList");

// Set minimum date for date inputs
const departDateInput = document.getElementById("departDate");
const returnDateInput = document.getElementById("returnDate");
const today = new Date().toISOString().split("T")[0];
departDateInput.min = today;
returnDateInput.min = today;

// Handle form submission
flightSearchForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const searchParams = {
    from: document.getElementById("from").value,
    to: document.getElementById("to").value,
    departDate: document.getElementById("departDate").value,
    returnDate: document.getElementById("returnDate").value,
    passengers: document.getElementById("passengers").value,
  };

  console.log("Searching with params:", searchParams);
  // In a real application, you would make an API call here
  // For now, we'll just display the mock flights
  displayFlights(mockFlights);
});

// Display flights in the UI
function displayFlights(flights) {
  flightsList.innerHTML = flights
    .map(
      (flight) => `
    <div class="flight-card">
      <div class="flight-content">
        <div class="flight-info">
          <span class="icon">✈️</span>
          <div>
            <div class="airline">${flight.airline}</div>
            <div class="flight-route">
              <span>${flight.from}</span>
              <span class="icon">➡️</span>
              <span>${flight.to}</span>
            </div>
          </div>
        </div>
        
        <div class="flight-details">
          <div class="detail-label">Duration</div>
          <div class="detail-value">${flight.duration}</div>
        </div>

        <div class="flight-details">
          <div class="detail-label">Departure</div>
          <div class="detail-value">${flight.departure}</div>
        </div>

        <div class="flight-details">
          <div class="detail-label">Arrival</div>
          <div class="detail-value">${flight.arrival}</div>
        </div>

        <div class="flight-price">
          <div class="price-value">Rs ${flight.price}</div>
          <button class="book-button">Book Now</button>
        </div>
      </div>
    </div>
  `
    )
    .join("");
}

// Initialize the flights list
displayFlights(mockFlights);
