"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";

export default function ProfilePage() {
  const [isLogin, setIsLogin] = useState(true); // Toggle between login/signup
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleAuth = (e: React.FormEvent) => {
    e.preventDefault();

    if (isLogin) {
      console.log("Logging in with:", { email, password });
      alert("Logged in successfully!");
    } else {
      console.log("Signing up with:", { email, password });
      alert("Account created successfully!");
    }

    // Clear form fields
    setEmail("");
    setPassword("");
  };

  return (
    <div className="min-h-screen bg-white flex flex-col justify-center items-center px-4 py-16">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md bg-gray-50 p-8 rounded-lg shadow-md"
      >
        <h1 className="text-3xl font-bold text-green-700 mb-6 text-center">
          {isLogin ? "Welcome Back" : "Create an Account"}
        </h1>

        <form className="space-y-6" onSubmit={handleAuth}>
          <div>
            <label className="block text-gray-700 font-medium mb-2">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-green-500 focus:border-green-500"
              placeholder="Enter your email"
            />
          </div>

          <div>
            <label className="block text-gray-700 font-medium mb-2">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-green-500 focus:border-green-500"
              placeholder="Enter your password"
            />
          </div>

          <button
            type="submit"
            className="w-full py-3 bg-green-600 text-white text-lg font-semibold rounded-md hover:bg-green-700 transition"
          >
            {isLogin ? "Log In" : "Sign Up"}
          </button>
        </form>

        <div className="mt-6 text-center">
          <p className="text-gray-600">
            {isLogin ? "Don't have an account?" : "Already have an account?"}{" "}
            <button
              onClick={() => setIsLogin(!isLogin)}
              className="text-green-600 font-medium hover:underline ml-1"
            >
              {isLogin ? "Sign Up" : "Log In"}
            </button>
          </p>
        </div>
      </motion.div>
    </div>
  );
}
