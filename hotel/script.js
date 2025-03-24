// Room data
const rooms = [
  {
    id: "1",
    name: "Deluxe Ocean View",
    description:
      "Spacious room with breathtaking ocean views and modern amenities",
    price: 299,
    capacity: 2,
    imageUrl: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b",
    amenities: [
      "King Bed",
      "Ocean View",
      "Free Wi-Fi",
      "Mini Bar",
      "Room Service",
    ],
  },
  {
    id: "2",
    name: "Executive Suite",
    description:
      "Luxurious suite with separate living area and premium facilities",
    price: 499,
    capacity: 4,
    imageUrl: "https://images.unsplash.com/photo-1631049307264-da0ec9d70304",
    amenities: [
      "2 King Beds",
      "City View",
      "Free Wi-Fi",
      "Kitchenette",
      "Spa Access",
    ],
  },
  {
    id: "3",
    name: "Family Room",
    description:
      "Perfect for families, featuring multiple beds and extra space",
    price: 399,
    capacity: 5,
    imageUrl: "https://images.unsplash.com/photo-1566665797739-1674de7a421a",
    amenities: [
      "2 Queen Beds",
      "Garden View",
      "Free Wi-Fi",
      "Kids Area",
      "Breakfast",
    ],
  },
];

// Bookings array to store all bookings
let bookings = [];

// Current selected room for booking
let selectedRoom = null;

// Initialize the application
document.addEventListener("DOMContentLoaded", () => {
  renderRooms();
  setupEventListeners();
});

// Render all rooms
function renderRooms() {
  const roomsGrid = document.getElementById("roomsGrid");
  roomsGrid.innerHTML = rooms
    .map(
      (room) => `
      <div class="room-card">
        <img src="${room.imageUrl}" alt="${room.name}">
        <div class="room-card-content">
          <h3>${room.name}</h3>
          <p class="room-description">${room.description}</p>
          <div class="room-capacity">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
              <circle cx="9" cy="7" r="4"></circle>
              <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
              <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
            </svg>
            <span>Up to ${room.capacity} guests</span>
          </div>
          <div class="amenities">
            <h4>Amenities:</h4>
            <div class="amenities-list">
              ${room.amenities
                .map(
                  (amenity) => `
                <span class="amenity-tag">${amenity}</span>
              `
                )
                .join("")}
            </div>
          </div>
          <div class="room-price">
            <div class="price">
              $${room.price}<span>/night</span>
            </div>
            <button class="btn btn-primary" onclick="openBookingModal('${
              room.id
            }')">
              Book Now
            </button>
          </div>
        </div>
      </div>
    `
    )
    .join("");
}

// Setup event listeners
function setupEventListeners() {
  const bookingForm = document.getElementById("bookingForm");
  bookingForm.addEventListener("submit", handleBookingSubmit);

  // Set minimum date for check-in to today
  const checkInInput = document.getElementById("checkIn");
  const today = new Date().toISOString().split("T")[0];
  checkInInput.min = today;

  // Update check-out minimum date when check-in changes
  checkInInput.addEventListener("change", () => {
    const checkOutInput = document.getElementById("checkOut");
    checkOutInput.min = checkInInput.value;
    if (checkOutInput.value && checkOutInput.value < checkInInput.value) {
      checkOutInput.value = checkInInput.value;
    }
  });
}

// Open booking modal
function openBookingModal(roomId) {
  selectedRoom = rooms.find((room) => room.id === roomId);
  const modal = document.getElementById("bookingModal");
  modal.classList.add("active");

  // Reset form
  document.getElementById("bookingForm").reset();

  // Update guests input max value
  document.getElementById("guests").max = selectedRoom.capacity;
}

// Close booking modal
function closeBookingModal() {
  const modal = document.getElementById("bookingModal");
  modal.classList.remove("active");
  selectedRoom = null;
}

// Handle booking form submission
function handleBookingSubmit(e) {
  e.preventDefault();

  if (!selectedRoom) return;

  const formData = {
    guestName: document.getElementById("guestName").value,
    email: document.getElementById("email").value,
    checkIn: document.getElementById("checkIn").value,
    checkOut: document.getElementById("checkOut").value,
    guests: parseInt(document.getElementById("guests").value),
  };

  const booking = {
    id: Math.random().toString(36).substr(2, 9),
    roomId: selectedRoom.id,
    ...formData,
    totalPrice: calculateTotalPrice(
      formData.checkIn,
      formData.checkOut,
      selectedRoom.price
    ),
  };

  bookings.push(booking);
  closeBookingModal();
  showBookingConfirmation(booking);
}

// Calculate total price for the stay
function calculateTotalPrice(checkIn, checkOut, pricePerNight) {
  const start = new Date(checkIn);
  const end = new Date(checkOut);
  const nights = Math.ceil((end - start) / (1000 * 60 * 60 * 24));
  return nights * pricePerNight;
}

// Show booking confirmation
function showBookingConfirmation(booking) {
  const room = rooms.find((r) => r.id === booking.roomId);
  const message = `
      Booking Confirmed!
      
      Room: ${room.name}
      Check-in: ${booking.checkIn}
      Check-out: ${booking.checkOut}
      Guests: ${booking.guests}
      Total Price: $${booking.totalPrice}
      
      A confirmation email has been sent to ${booking.email}.
    `;
  alert(message);
}

function redirect() {
  window.location.href = "/Payment/paymentPage.html"; // Change to your target page
}
