// Hotel data
const hotels = [
    {
        name: "Grand Luxury Resort & Spa",
        location: "Maldives",
        rating: 4.8,
        price: 599,
        image: "https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&q=80"
    },
    {
        name: "Mountain View Lodge",
        location: "Swiss Alps",
        rating: 4.7,
        price: 399,
        image: "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?auto=format&fit=crop&q=80"
    },
    {
        name: "Coastal Paradise Hotel",
        location: "Bali, Indonesia",
        rating: 4.9,
        price: 499,
        image: "https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?auto=format&fit=crop&q=80"
    },
    {
        name: "Urban Boutique Hotel",
        location: "New York City",
        rating: 4.6,
        price: 299,
        image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&q=80"
    },
    {
        name: "Desert Oasis Resort",
        location: "Dubai, UAE",
        rating: 4.8,
        price: 699,
        image: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&q=80"
    },
    {
        name: "Tropical Beach Resort",
        location: "Cancun, Mexico",
        rating: 4.7,
        price: 449,
        image: "https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&q=80"
    }
];

// DOM Elements
const guestsToggle = document.getElementById('guests-toggle');
const guestsOptions = document.getElementById('guests-options');
const guestsSummary = document.getElementById('guests-summary');
const adultCount = document.getElementById('adult-count');
const childCount = document.getElementById('child-count');
const counterBtns = document.querySelectorAll('.counter-btn');
const hotelGrid = document.getElementById('hotel-grid');
const searchInput = document.querySelector('.search-input input');

// Initialize guests count
let guests = {
    adult: 2,
    child: 0
};

// Toggle guests dropdown
guestsToggle.addEventListener('click', () => {
    guestsOptions.classList.toggle('active');
});

// Close guests dropdown when clicking outside
document.addEventListener('click', (e) => {
    if (!e.target.closest('.guests-dropdown')) {
        guestsOptions.classList.remove('active');
    }
});

// Handle guest counter buttons
counterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        const type = btn.dataset.type;
        const action = btn.dataset.action;
        
        if (action === 'increase') {
            if (guests[type] < 10) {
                guests[type]++;
            }
        } else {
            if (type === 'adult' && guests[type] > 1) {
                guests[type]--;
            } else if (type === 'child' && guests[type] > 0) {
                guests[type]--;
            }
        }
        
        // Update counter display
        if (type === 'adult') {
            adultCount.textContent = guests.adult;
        } else {
            childCount.textContent = guests.child;
        }
        
        // Update summary
        guestsSummary.textContent = `${guests.adult} Adults, ${guests.child} Children`;
    });
});

// Create hotel cards
function createHotelCard(hotel) {
    return `
        <div class="hotel-card">
            <img src="${hotel.image}" alt="${hotel.name}" class="hotel-image">
            <div class="hotel-info">
                <h3 class="hotel-name">${hotel.name}</h3>
                <p class="hotel-location">
                    <i class="fas fa-map-marker-alt"></i>
                    ${hotel.location}
                </p>
                <div class="hotel-rating">
                    <div class="rating-stars">
                        ${createStarRating(hotel.rating)}
                    </div>
                    <span>${hotel.rating}</span>
                </div>
                <p class="hotel-price">$${hotel.price}<span style="font-size: 1rem; color: #6b7280;"> / night</span></p>
                <button class="book-now">Book Now</button>
            </div>
        </div>
    `;
}

// Create star rating
function createStarRating(rating) {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;
    let stars = '';
    
    for (let i = 0; i < fullStars; i++) {
        stars += '<i class="fas fa-star"></i>';
    }
    
    if (hasHalfStar) {
        stars += '<i class="fas fa-star-half-alt"></i>';
    }
    
    return stars;
}

// Populate hotel grid
function populateHotels(hotelList) {
    hotelGrid.innerHTML = hotelList.map(hotel => createHotelCard(hotel)).join('');
}

// Initial population
populateHotels(hotels);

// Search functionality
searchInput.addEventListener('input', (e) => {
    const searchTerm = e.target.value.toLowerCase();
    const filteredHotels = hotels.filter(hotel => 
        hotel.name.toLowerCase().includes(searchTerm) ||
        hotel.location.toLowerCase().includes(searchTerm)
    );
    populateHotels(filteredHotels);
});

// Set minimum date for check-in and check-out
const today = new Date().toISOString().split('T')[0];
const tomorrow = new Date();
tomorrow.setDate(tomorrow.getDate() + 1);
const tomorrowStr = tomorrow.toISOString().split('T')[0];

document.getElementById('check-in').min = today;
document.getElementById('check-out').min = tomorrowStr;

// Update check-out minimum date when check-in date changes
document.getElementById('check-in').addEventListener('change', (e) => {
    const checkInDate = new Date(e.target.value);
    const minCheckOutDate = new Date(checkInDate);
    minCheckOutDate.setDate(checkInDate.getDate() + 1);
    document.getElementById('check-out').min = minCheckOutDate.toISOString().split('T')[0];
});