"use client";

import React, { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Bell, Search } from "lucide-react";

// Define the item type
type ItemType = {
  id: string;
  name: string;
  description: string;
  image: string;
  category: string;
};

const items: ItemType[] = [
  {
    id: "1",
    name: "Left Nike Sneaker",
    description: "Single left sneaker, Nike Air Max 2022. Like new!",
    image: "https://via.placeholder.com/400x300.png?text=Left+Sneaker",
    category: "Shoes",
  },
  {
    id: "2",
    name: "Right Airpod Pro",
    description: "Right side AirPod Pro, second generation. Works perfectly.",
    image: "https://via.placeholder.com/400x300.png?text=Right+AirPod",
    category: "Electronics",
  },
  {
    id: "3",
    name: "Left Glove (Leather)",
    description: "High-quality leather glove, left hand only.",
    image: "https://via.placeholder.com/400x300.png?text=Left+Glove",
    category: "Accessories",
  },
];

export default function FindPairPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedItem, setSelectedItem] = useState<ItemType | null>(null);
  const [alertModalOpen, setAlertModalOpen] = useState(false);
  const [alertForm, setAlertForm] = useState({
    email: "",
    item: "",
  });

  const filteredItems = items.filter((item) =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAlertSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Alert created:", alertForm);
    setAlertForm({ email: "", item: "" });
    setAlertModalOpen(false);
    alert("Alert Created! We'll notify you when we find a match.");
  };

  return (
    <div className="min-h-screen bg-green-50 px-4 py-16 md:px-20">
      {/* Hero Section */}
      <div className="text-center mb-10">
        <motion.h1
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="text-4xl font-extrabold text-green-700 mb-4"
        >
          Find Your Missing Piece!
        </motion.h1>
        <p className="text-gray-600 text-lg">
          Search for items, pair up, and complete your set.
        </p>
      </div>

      {/* Search Bar */}
      <div className="flex justify-center mb-10">
        <div className="relative w-full max-w-md">
          <input
            type="text"
            placeholder="Search for an item..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full p-4 pr-12 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500 text-black"
          />
          <Search className="absolute right-4 top-4 text-gray-400" />
        </div>
      </div>

      {/* Items Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {filteredItems.length === 0 && (
          <div className="col-span-full text-center text-gray-500">
            No items found. Try another search.
          </div>
        )}
        {filteredItems.map((item) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-2xl shadow-lg overflow-hidden flex flex-col"
          >
            <img
              src={item.image}
              alt={item.name}
              className="h-48 w-full object-cover"
            />
            <div className="p-4 flex-1 flex flex-col justify-between">
              <div>
                <h2 className="text-xl font-bold text-green-700">{item.name}</h2>
                <p className="text-gray-600 mb-4">{item.description}</p>
              </div>
              <div className="flex flex-col space-y-2">
                <button
                  onClick={() => setSelectedItem(item)}
                  className="bg-green-600 hover:bg-green-700 text-white font-semibold py-2 rounded-lg transition"
                >
                  Contact Seller
                </button>
                <button
                  onClick={() => {
                    setAlertModalOpen(true);
                    setAlertForm((prev) => ({ ...prev, item: item.name }));
                  }}
                  className="flex items-center justify-center gap-2 bg-yellow-500 hover:bg-yellow-600 text-white font-semibold py-2 rounded-lg transition"
                >
                  <Bell size={18} />
                  Set an Alert
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
              className="bg-white rounded-2xl p-6 w-full max-w-md shadow-xl space-y-4"
            >
              <h2 className="text-xl font-bold text-green-700">Contact Seller</h2>
              <p className="text-gray-700 mb-4">
                You are interested in:{" "}
                <span className="font-semibold">{selectedItem?.name}</span>
              </p>
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
                  className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-green-500"
                />
                <input
                  type="email"
                  placeholder="Your Email"
                  required
                  className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-green-500"
                />
                <textarea
                  rows={4}
                  placeholder="Your Message"
                  required
                  className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-green-500"
                ></textarea>
                <div className="flex gap-2">
                  <button
                    type="submit"
                    className="flex-1 bg-green-600 hover:bg-green-700 text-white font-semibold py-2 rounded-lg transition"
                  >
                    Send
                  </button>
                  <button
                    type="button"
                    onClick={() => setSelectedItem(null)}
                    className="flex-1 bg-gray-300 hover:bg-gray-400 text-black font-semibold py-2 rounded-lg transition"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Alert Modal */}
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
              className="bg-white rounded-2xl p-6 w-full max-w-md shadow-xl space-y-4"
            >
              <h2 className="text-xl font-bold text-yellow-600">Set an Alert</h2>
              <p className="text-gray-700 mb-4">
                We'll notify you when we find a matching pair for{" "}
                <span className="font-semibold">{alertForm.item}</span>
              </p>
              <form onSubmit={handleAlertSubmit} className="space-y-4">
                <input
                  type="email"
                  placeholder="Your Email"
                  value={alertForm.email}
                  onChange={(e) =>
                    setAlertForm((prev) => ({ ...prev, email: e.target.value }))
                  }
                  required
                  className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-yellow-500"
                />
                <div className="flex gap-2">
                  <button
                    type="submit"
                    className="flex-1 bg-yellow-500 hover:bg-yellow-600 text-white font-semibold py-2 rounded-lg transition"
                  >
                    Create Alert
                  </button>
                  <button
                    type="button"
                    onClick={() => setAlertModalOpen(false)}
                    className="flex-1 bg-gray-300 hover:bg-gray-400 text-black font-semibold py-2 rounded-lg transition"
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
