import React from "react";
import Link from "next/link";
import { FaFacebook, FaInstagram } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6"; // Updated Twitter icon (X)

export default function Footer() {
  return (
    <footer className="bg-black text-white py-6">
      <div className="container mx-auto px-4 text-center">
        {/* Navigation Links */}
        <div className="flex justify-center space-x-6">
          <Link href="/find-a-pair" className="text-gray-400 hover:text-white transition">
            Find a Pair
          </Link>
          <Link href="/profile" className="text-gray-400 hover:text-white transition">
            Profile
          </Link>
        </div>

        {/* Social Media Links */}
        <div className="flex justify-center space-x-6 mt-4">
          <Link href="https://facebook.com" target="_blank" className="hover:text-blue-500">
            <FaFacebook size={24} />
          </Link>
          <Link href="https://twitter.com" target="_blank" className="hover:text-gray-400">
            <FaXTwitter size={24} />
          </Link>
          <Link href="https://instagram.com" target="_blank" className="hover:text-pink-500">
            <FaInstagram size={24} />
          </Link>
        </div>

        <p className="text-gray-500 text-sm mt-4">&copy; {new Date().getFullYear()} Remnant. All rights reserved.</p>
      </div>
    </footer>
  );
}