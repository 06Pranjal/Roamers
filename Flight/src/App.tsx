import React, { useState } from 'react';
import { Plane, Calendar, MapPin, Users, Search, TrendingUp } from 'lucide-react';

interface Flight {
  id: string;
  from: string;
  to: string;
  airline: string;
  departure: string;
  arrival: string;
  price: number;
  duration: string;
}

function App() {
  const [searchParams, setSearchParams] = useState({
    from: '',
    to: '',
    departDate: '',
    returnDate: '',
    passengers: '1',
  });

  const popularDestinations = [
    { city: 'Paris', image: 'https://images.unsplash.com/photo-1499856871958-5b9627545d1a?w=800&auto=format&fit=crop' },
    { city: 'Tokyo', image: 'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=800&auto=format&fit=crop' },
    { city: 'New York', image: 'https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?w=800&auto=format&fit=crop' },
  ];

  const mockFlights: Flight[] = [
    {
      id: '1',
      from: 'London',
      to: 'Paris',
      airline: 'SkyWings',
      departure: '08:00',
      arrival: '10:30',
      price: 199,
      duration: '2h 30m',
    },
    {
      id: '2',
      from: 'London',
      to: 'New York',
      airline: 'TransAtlantic',
      departure: '14:00',
      arrival: '22:30',
      price: 499,
      duration: '8h 30m',
    },
  ];

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // Implement search logic here
    console.log('Searching with params:', searchParams);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section with Search */}
      <div className="relative h-[500px] bg-gradient-to-r from-blue-600 to-blue-800">
        <div className="absolute inset-0 bg-black opacity-30"></div>
        <div className="relative container mx-auto px-4 py-20">
          <h1 className="text-4xl font-bold text-white mb-6">Find Your Perfect Flight</h1>
          
          {/* Search Form */}
          <div className="bg-white rounded-lg p-6 shadow-lg max-w-4xl">
            <form onSubmit={handleSearch} className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <MapPin className="w-5 h-5 text-blue-600" />
                  <input
                    type="text"
                    placeholder="From"
                    className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 outline-none"
                    value={searchParams.from}
                    onChange={(e) => setSearchParams({ ...searchParams, from: e.target.value })}
                  />
                </div>
                <div className="flex items-center space-x-2">
                  <MapPin className="w-5 h-5 text-blue-600" />
                  <input
                    type="text"
                    placeholder="To"
                    className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 outline-none"
                    value={searchParams.to}
                    onChange={(e) => setSearchParams({ ...searchParams, to: e.target.value })}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <Calendar className="w-5 h-5 text-blue-600" />
                  <input
                    type="date"
                    className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 outline-none"
                    value={searchParams.departDate}
                    onChange={(e) => setSearchParams({ ...searchParams, departDate: e.target.value })}
                  />
                </div>
                <div className="flex items-center space-x-2">
                  <Calendar className="w-5 h-5 text-blue-600" />
                  <input
                    type="date"
                    className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 outline-none"
                    value={searchParams.returnDate}
                    onChange={(e) => setSearchParams({ ...searchParams, returnDate: e.target.value })}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <Users className="w-5 h-5 text-blue-600" />
                  <select
                    className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 outline-none"
                    value={searchParams.passengers}
                    onChange={(e) => setSearchParams({ ...searchParams, passengers: e.target.value })}
                  >
                    {[1, 2, 3, 4, 5].map((num) => (
                      <option key={num} value={num}>
                        {num} {num === 1 ? 'Passenger' : 'Passengers'}
                      </option>
                    ))}
                  </select>
                </div>
                <button
                  type="submit"
                  className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700 transition-colors flex items-center justify-center space-x-2"
                >
                  <Search className="w-5 h-5" />
                  <span>Search Flights</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>

      {/* Dashboard Content */}
      <div className="container mx-auto px-4 py-12">
        {/* Popular Destinations */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-6">Popular Destinations</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {popularDestinations.map((dest) => (
              <div key={dest.city} className="relative rounded-lg overflow-hidden h-48 group">
                <img
                  src={dest.image}
                  alt={dest.city}
                  className="w-full h-full object-cover transition-transform group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                <h3 className="absolute bottom-4 left-4 text-white text-xl font-bold">{dest.city}</h3>
              </div>
            ))}
          </div>
        </section>

        {/* Available Flights */}
        <section>
          <h2 className="text-2xl font-bold mb-6">Available Flights</h2>
          <div className="space-y-4">
            {mockFlights.map((flight) => (
              <div
                key={flight.id}
                className="bg-white rounded-lg p-6 shadow-md hover:shadow-lg transition-shadow"
              >
                <div className="flex flex-col md:flex-row justify-between items-center">
                  <div className="flex items-center space-x-4">
                    <Plane className="w-8 h-8 text-blue-600" />
                    <div>
                      <p className="font-bold">{flight.airline}</p>
                      <div className="flex items-center space-x-2">
                        <span>{flight.from}</span>
                        <TrendingUp className="w-4 h-4" />
                        <span>{flight.to}</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="text-center">
                    <p className="text-sm text-gray-600">Duration</p>
                    <p className="font-bold">{flight.duration}</p>
                  </div>

                  <div className="text-center">
                    <p className="text-sm text-gray-600">Departure</p>
                    <p className="font-bold">{flight.departure}</p>
                  </div>

                  <div className="text-center">
                    <p className="text-sm text-gray-600">Arrival</p>
                    <p className="font-bold">{flight.arrival}</p>
                  </div>

                  <div className="text-center">
                    <p className="text-2xl font-bold text-blue-600">${flight.price}</p>
                    <button className="mt-2 bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition-colors">
                      Book Now
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}

export default App;