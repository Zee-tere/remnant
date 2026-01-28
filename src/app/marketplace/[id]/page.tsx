"use client";

import React, { useState } from "react";
import { useParams } from "next/navigation";
import { motion } from "framer-motion";
import Link from "next/link";

// Mock product data
const products = [
  {
    id: "1",
    name: "Single Airpod (Left)",
    price: 10000,
    image: "https://via.placeholder.com/600x400.png?text=Airpod+Left",
    description: "A single left Airpod in good condition. Compatible with Airpod 2nd gen.",
  },
  {
    id: "2",
    name: "Nike Sneaker (Right)",
    price: 15000,
    image: "https://via.placeholder.com/600x400.png?text=Nike+Sneaker+Right",
    description: "Only the right foot of Nike's Air Max 2022. Worn twice.",
  },
  {
    id: "3",
    name: "TV Remote Without Batteries",
    price: 3000,
    image: "https://via.placeholder.com/600x400.png?text=TV+Remote",
    description: "Universal TV remote. Needs AA batteries.",
  },
];

export default function ItemDetailPage() {
  const params = useParams();
  const { id } = params;

  const product = products.find((item) => item.id === id);

  const [isContactOpen, setContactOpen] = useState(false);
  const [contactForm, setContactForm] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleContactChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setContactForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Contact Form Submitted:", contactForm);

    // Future: Send to backend or email service

    alert("Message sent to seller!");
    setContactForm({
      name: "",
      email: "",
      message: "",
    });
    setContactOpen(false);
  };

  if (!product) {
    return (
      <div className="min-h-screen flex justify-center items-center text-center">
        <h2 className="text-2xl font-semibold text-gray-700">Item not found</h2>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white px-4 py-10 md:px-20 relative">
      {/* Contact Modal */}
      {isContactOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white rounded-2xl p-6 w-full max-w-md shadow-lg space-y-4">
            <h2 className="text-xl font-bold text-green-700">Contact Seller</h2>
            <form onSubmit={handleContactSubmit} className="space-y-4">
              <input
                type="text"
                name="name"
                placeholder="Your Name"
                value={contactForm.name}
                onChange={handleContactChange}
                required
                className="w-full border border-gray-300 rounded-lg p-3 text-black focus:outline-none focus:ring-2 focus:ring-green-500"
              />
              <input
                type="email"
                name="email"
                placeholder="Your Email"
                value={contactForm.email}
                onChange={handleContactChange}
                required
                className="w-full border border-gray-300 rounded-lg p-3 text-black focus:outline-none focus:ring-2 focus:ring-green-500"
              />
              <textarea
                name="message"
                rows={4}
                placeholder="Your Message"
                value={contactForm.message}
                onChange={handleContactChange}
                required
                className="w-full border border-gray-300 rounded-lg p-3 text-black focus:outline-none focus:ring-2 focus:ring-green-500"
              ></textarea>

              <div className="flex space-x-2">
                <button
                  type="submit"
                  className="flex-1 bg-green-600 hover:bg-green-700 text-white font-semibold py-2 rounded-lg transition duration-300"
                >
                  Send Message
                </button>
                <button
                  type="button"
                  onClick={() => setContactOpen(false)}
                  className="flex-1 bg-gray-300 hover:bg-gray-400 text-black font-semibold py-2 rounded-lg transition duration-300"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Product Details */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="max-w-4xl mx-auto bg-green-50 rounded-2xl shadow-md overflow-hidden"
      >
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-64 md:h-96 object-cover"
        />

        <div className="p-6 space-y-4">
          <h1 className="text-3xl font-bold text-green-700">{product.name}</h1>
          <p className="text-gray-600">{product.description}</p>
          <p className="text-green-700 text-2xl font-bold">₦{product.price.toLocaleString()}</p>

          <button
            onClick={() => setContactOpen(true)}
            className="mt-4 w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-3 rounded-lg transition duration-300"
          >
            Contact Seller
          </button>

          <Link href="/marketplace">
            <button className="mt-4 w-full bg-gray-300 hover:bg-gray-400 text-black font-semibold py-3 rounded-lg transition duration-300">
              Back to Marketplace
            </button>
          </Link>
        </div>
      </motion.div>
    </div>
  );
}
