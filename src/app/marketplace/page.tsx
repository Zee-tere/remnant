"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, Bell, Heart } from "lucide-react";

// Mock data for now
const mockItems = [
  {
    id: "1",
    name: "Vintage Wooden Chair",
    description: "A classic wooden chair, perfect for your living room.",
    image: "https://via.placeholder.com/400x300.png?text=Chair",
    category: "Furniture",
    location: "Lagos",
    condition: "Used - Good",
    price: 25,
    type: "🔄 Donate or give away",
  },
  {
    id: "2",
    name: "Electric Drill",
    description: "Powerful electric drill, lightly used, includes bits.",
    image: "https://via.placeholder.com/400x300.png?text=Drill",
    category: "Tools",
    location: "Abuja",
    condition: "Used - Like New",
    price: 50,
    type: "🔧 Looking for someone to fix/repurpose",
  },
  {
    id: "3",
    name: "Leather Backpack",
    description: "Genuine leather, perfect condition, stylish and durable.",
    image: "https://via.placeholder.com/400x300.png?text=Backpack",
    category: "Accessories",
    location: "Port Harcourt",
    condition: "New",
    price: 80,
    type: "🤝 Looking to trade/barter",
  },
];

type ItemType = typeof mockItems[0];

export default function MarketplacePage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [category, setCategory] = useState("");
  const [location, setLocation] = useState("");
  const [condition, setCondition] = useState("");
  const [priceRange, setPriceRange] = useState([0, 100]);
  const [selectedItem, setSelectedItem] = useState<ItemType | null>(null);
  const [alertModalOpen, setAlertModalOpen] = useState(false);
  const [alertForm, setAlertForm] = useState({ email: "", item: "" });

  const filteredItems = mockItems.filter((item) => {
    const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = category ? item.category === category : true;
    const matchesLocation = location ? item.location === location : true;
    const matchesCondition = condition ? item.condition === condition : true;
    const matchesPrice = item.price >= priceRange[0] && item.price <= priceRange[1];

    return matchesSearch && matchesCategory && matchesLocation && matchesCondition && matchesPrice;
  });

  const handleAlertSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Alert created:", alertForm);
    setAlertForm({ email: "", item: "" });
    setAlertModalOpen(false);
    alert("Alert Created! We'll notify you when we find a match.");
  };

  return (
    <div className="min-h-screen bg-[#f5f3ef] text-black px-4 py-16 md:px-20">
      {/* Header Section */}
      <div className="text-center mb-12">
        <motion.h1
          initial={{ y: -30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="text-5xl font-extrabold text-[#3b2f2f]"
        >
          The Marketplace
        </motion.h1>
        <p className="text-gray-700 mt-2 text-lg">Give, trade, or sell. Let's make things useful again!</p>
      </div>

      {/* Filters */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-14">
        {/* Search Bar */}
        <div className="col-span-2 relative">
          <input
            type="text"
            placeholder="Search items..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full p-4 pr-12 rounded-xl border border-gray-300 focus:ring-2 focus:ring-black focus:outline-none"
          />
          <Search className="absolute right-4 top-4 text-gray-400" />
        </div>

        {/* Category Filter */}
        <div className="col-span-1">
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full p-4 rounded-xl border border-gray-300 focus:ring-2 focus:ring-black focus:outline-none"
          >
            <option value="">All Categories</option>
            <option value="Electronics & Gadgets">Electronics & Gadgets</option>
            <option value="Furniture & Home Decor">Furniture & Home Decor</option>
            <option value="Clothing & Fashion">Clothing & Fashion</option>
            <option value="Vehicles & Auto Parts">Vehicles & Auto Parts</option>
            <option value="Books & Education">Books & Education</option>
            <option value="Hobbies & Leisure">Hobbies & Leisure</option>
            <option value="Sports & Outdoor">Sports & Outdoor</option>
            <option value="Kitchen & Home Essentials">Kitchen & Home Essentials</option>
            <option value="Tools & DIY">Tools & DIY</option>
            <option value="Real Estate & Property">Real Estate & Property</option>
            <option value="Health & Beauty">Health & Beauty</option>
            <option value="Pets & Animals">Pets & Animals</option>
            <option value="Business & Industrial">Business & Industrial</option>
            <option value="Toys & Games">Toys & Games</option>
            <option value="Musical Instruments">Musical Instruments</option>
            <option value="Office & Stationery">Office & Stationery</option>
            <option value="Collectibles & Antiques">Collectibles & Antiques</option>
            <option value="Baby & Kids">Baby & Kids</option>
            <option value="Garden & Outdoor">Garden & Outdoor</option>
            <option value="Event & Party Supplies">Event & Party Supplies</option>

          </select>
        </div>

        {/* Price Range */}
        <div className="col-span-1 flex flex-col justify-center">
          <label className="text-sm text-gray-600 mb-1">Price: ${priceRange[0]} - ${priceRange[1]}</label>
          <input
            type="range"
            min={0}
            max={100}
            value={priceRange[1]}
            onChange={(e) => setPriceRange([priceRange[0], Number(e.target.value)])}
            className="w-full"
          />
        </div>

        {/* Smart Search Placeholder */}
        <div className="col-span-1 flex items-center justify-center border-2 border-dashed border-gray-400 rounded-xl p-4">
          <p className="text-sm text-gray-500 text-center">🔍 Smart Search (Coming Soon!)</p>
        </div>
      </div>

      {/* Items Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {filteredItems.length === 0 && (
          <div className="col-span-full text-center text-gray-500">No items found. Try changing your filters!</div>
        )}

        {filteredItems.map((item) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-3xl shadow-xl overflow-hidden border border-black hover:shadow-2xl transition-all duration-300"
          >
            <img src={item.image} alt={item.name} className="h-56 w-full object-cover" />

            <div className="p-6 flex flex-col justify-between min-h-[320px]">
              <div>
                <div className="flex justify-between items-center mb-2">
                  <h2 className="text-xl font-bold text-[#3b2f2f]">{item.name}</h2>
                  <span className="text-xs bg-yellow-100 text-yellow-800 px-2 py-1 rounded-full">{item.type}</span>
                </div>

                <p className="text-gray-600 mb-4">{item.description}</p>

                <div className="text-sm text-gray-500 mb-4">
                  📍 {item.location} • {item.condition}
                </div>

                <p className="text-lg font-bold text-black">${item.price}</p>
              </div>

              <div className="flex flex-col space-y-2 mt-6">
                <button
                  onClick={() => setSelectedItem(item)}
                  className="bg-black hover:bg-[#3b2f2f] text-white font-semibold py-3 rounded-xl transition"
                >
                  Contact Seller
                </button>
                <button
                  onClick={() => {
                    setAlertModalOpen(true);
                    setAlertForm((prev) => ({ ...prev, item: item.name }));
                  }}
                  className="flex items-center justify-center gap-2 bg-yellow-500 hover:bg-yellow-600 text-white font-semibold py-3 rounded-xl transition"
                >
                  <Bell size={18} /> Set an Alert
                </button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Contact Seller Modal */}
      <AnimatePresence>
        {selectedItem && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50"
          >
            <motion.div
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.8 }}
              className="bg-white rounded-2xl p-8 w-full max-w-lg shadow-2xl space-y-6"
            >
              <h2 className="text-2xl font-bold text-black">Contact Seller</h2>
              <p className="text-gray-700">You’re interested in: <span className="font-semibold">{selectedItem.name}</span></p>

              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  alert("Message sent to seller!");
                  setSelectedItem(null);
                }}
                className="space-y-4"
              >
                <input
                  type="text"
                  placeholder="Your Name"
                  required
                  className="w-full border border-gray-300 rounded-xl p-3 focus:ring-2 focus:ring-black"
                />
                <input
                  type="email"
                  placeholder="Your Email"
                  required
                  className="w-full border border-gray-300 rounded-xl p-3 focus:ring-2 focus:ring-black"
                />
                <textarea
                  rows={4}
                  placeholder="Your Message"
                  required
                  className="w-full border border-gray-300 rounded-xl p-3 focus:ring-2 focus:ring-black"
                />

                <div className="flex gap-2">
                  <button type="submit" className="flex-1 bg-black hover:bg-[#3b2f2f] text-white py-3 rounded-xl">
                    Send
                  </button>
                  <button
                    type="button"
                    onClick={() => setSelectedItem(null)}
                    className="flex-1 bg-gray-300 hover:bg-gray-400 text-black py-3 rounded-xl"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Set Alert Modal */}
      <AnimatePresence>
        {alertModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50"
          >
            <motion.div
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.8 }}
              className="bg-white rounded-2xl p-8 w-full max-w-lg shadow-2xl space-y-6"
            >
              <h2 className="text-2xl font-bold text-yellow-600">Set an Alert</h2>
              <p className="text-gray-700">We’ll notify you about: <span className="font-semibold">{alertForm.item}</span></p>

              <form onSubmit={handleAlertSubmit} className="space-y-4">
                <input
                  type="email"
                  placeholder="Your Email"
                  value={alertForm.email}
                  onChange={(e) => setAlertForm((prev) => ({ ...prev, email: e.target.value }))}
                  required
                  className="w-full border border-gray-300 rounded-xl p-3 focus:ring-2 focus:ring-yellow-500"
                />

                <div className="flex gap-2">
                  <button type="submit" className="flex-1 bg-yellow-500 hover:bg-yellow-600 text-white py-3 rounded-xl">
                    Create Alert
                  </button>
                  <button
                    type="button"
                    onClick={() => setAlertModalOpen(false)}
                    className="flex-1 bg-gray-300 hover:bg-gray-400 text-black py-3 rounded-xl"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
