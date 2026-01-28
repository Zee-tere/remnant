"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";



export default function HomePage() {
  return (
    <div className="bg-white text-gray-800">
      {/* Hero Section */}
      <section className="min-h-screen flex flex-col justify-center items-center px-6 text-center bg-gradient-to-b from-green-100 to-white">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-4xl md:text-6xl font-extrabold text-green-700 mb-6"
        >
          Welcome to Remnant
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-lg md:text-2xl text-gray-600 mb-8 max-w-2xl"
        >
          Buy, Sell, and Discover Single Items Like Never Before!
        </motion.p>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="flex gap-4"
        >
          <Link href="/marketplace">
            <button className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg text-lg font-medium transition">
              Explore Marketplace
            </button>
          </Link>

          <Link href="/profile">
            <button className="bg-white border border-green-600 text-green-600 px-6 py-3 rounded-lg text-lg font-medium hover:bg-green-50 transition">
              Get Started
            </button>
          </Link>
        </motion.div>
      </section>

      {/* Features Section */}
      <section className="py-16 px-6 bg-white text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-green-700 mb-10">
          Why Choose Remnant?
        </h2>

        <div className="grid gap-8 md:grid-cols-3 max-w-6xl mx-auto">
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="p-6 border rounded-2xl shadow hover:shadow-lg transition"
          >
            <h3 className="text-xl font-semibold mb-4 text-green-600">Unique Marketplace</h3>
            <p className="text-gray-600">
              Buy and sell single or unwanted items easily, whether it's a left shoe or an empty earbud case.
            </p>
          </motion.div>

          <motion.div
            whileHover={{ scale: 1.05 }}
            className="p-6 border rounded-2xl shadow hover:shadow-lg transition"
          >
            <h3 className="text-xl font-semibold mb-4 text-green-600">Fast & Simple</h3>
            <p className="text-gray-600">
              Post an item in seconds and connect with buyers instantly. Seamless and user-friendly.
            </p>
          </motion.div>

          <motion.div
            whileHover={{ scale: 1.05 }}
            className="p-6 border rounded-2xl shadow hover:shadow-lg transition"
          >
            <h3 className="text-xl font-semibold mb-4 text-green-600">Community Driven</h3>
            <p className="text-gray-600">
              Join a growing community focused on giving items a second chance and reducing waste.
            </p>
          </motion.div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-16 px-6 bg-green-50 text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-green-700 mb-10">
          How It Works
        </h2>

        <div className="grid gap-8 md:grid-cols-3 max-w-6xl mx-auto">
          <div className="flex flex-col items-center space-y-4">
            <div className="bg-green-600 text-white w-16 h-16 flex items-center justify-center rounded-full text-2xl font-bold">
              1
            </div>
            <h3 className="text-xl font-semibold">Sign Up</h3>
            <p className="text-gray-600">Create a free account in minutes.</p>
          </div>

          <div className="flex flex-col items-center space-y-4">
            <div className="bg-green-600 text-white w-16 h-16 flex items-center justify-center rounded-full text-2xl font-bold">
              2
            </div>
            <h3 className="text-xl font-semibold">Post or Browse</h3>
            <p className="text-gray-600">List your item or explore what's available.</p>
          </div>

          <div className="flex flex-col items-center space-y-4">
            <div className="bg-green-600 text-white w-16 h-16 flex items-center justify-center rounded-full text-2xl font-bold">
              3
            </div>
            <h3 className="text-xl font-semibold">Connect & Trade</h3>
            <p className="text-gray-600">Contact sellers or buyers directly and make deals happen.</p>
          </div>
        </div>
      </section>
    </div>
  );
}
