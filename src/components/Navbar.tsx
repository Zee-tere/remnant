"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, UserCircle, Search } from "lucide-react";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [scrollingUp, setScrollingUp] = useState(true);
  const pathname = usePathname();

  const isHomePage = pathname === "/" || pathname === "/home";

  useEffect(() => {
    let lastScrollY = window.scrollY;

    const handleScroll = () => {
      setScrollingUp(window.scrollY < lastScrollY || window.scrollY < 50);
      lastScrollY = window.scrollY;
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Mock auth state: Replace with your auth provider logic
  const isAuthenticated = true; // Replace with actual auth check
  const userName = "John Doe";  // Replace with actual user name

  return (
    <header
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${
        scrollingUp ? "opacity-100" : "opacity-0"
      }`}
    >
      <div className="container mx-auto px-4 py-3 flex justify-between items-center relative">
        {/* Logo (Only on Home Page) */}
        {isHomePage && (
          <Link href="/" className="flex items-center space-x-2">
            <motion.div
              className="bg-black text-white rounded-full h-10 w-10 flex items-center justify-center text-lg font-bold shadow-md"
              whileHover={{ rotate: 10 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              R
            </motion.div>
            <span className="text-xl font-bold text-black">Remnant</span>
          </Link>
        )}

        {/* Search Bar (Only on Home/Landing Page) */}
        {isHomePage && (
          <div className="relative w-64 md:w-96">
            <input
              type="text"
              placeholder="Search for a pair..."
              className="w-full py-2 pl-4 pr-10 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-black"
            />
            <button className="absolute right-3 top-2 text-gray-600 hover:text-black">
              <Search size={20} />
            </button>
          </div>
        )}

        {/* Desktop Navigation */}
        <nav className="hidden md:flex space-x-8 items-center">
          <NavItem href="/">Home</NavItem>
          <NavItem href="/find-a-pair">Find a Pair</NavItem>
          <NavItem href="/sell-item">Sell an Item</NavItem>
        </nav>

        {/* Profile Section (Visible on all pages, styled differently on Home Page) */}
        {isAuthenticated && (
          <div className="relative">
            <button
              onClick={() => setProfileOpen(!profileOpen)}
              className={`flex items-center space-x-2 px-4 py-2 rounded-md transition ${
                isHomePage ? "bg-black text-white" : "bg-transparent text-black"
              }`}
            >
              <UserCircle size={20} />
              <span>{userName.split(" ")[0]}</span>
            </button>

            {/* Profile Dropdown */}
            <AnimatePresence>
              {profileOpen && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg border"
                >
                  <ul className="flex flex-col py-2">
                    <li>
                      <Link
                        href="/profile"
                        onClick={() => setProfileOpen(false)}
                        className="block px-4 py-2 text-gray-700 hover:bg-gray-100 transition"
                      >
                        View Profile
                      </Link>
                    </li>
                    <li>
                      <Link
                        href="/settings"
                        onClick={() => setProfileOpen(false)}
                        className="block px-4 py-2 text-gray-700 hover:bg-gray-100 transition"
                      >
                        Settings
                      </Link>
                    </li>
                    <li>
                      <button
                        onClick={() => {
                          setProfileOpen(false);
                          console.log("Logging out...");
                        }}
                        className="w-full text-left px-4 py-2 text-red-600 hover:bg-red-50 transition"
                      >
                        Logout
                      </button>
                    </li>
                  </ul>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        )}
      </div>
    </header>
  );
}

// Desktop Nav Item with Hover Animation
const NavItem = ({ href, children }: { href: string; children: React.ReactNode }) => (
  <motion.div whileHover={{ scale: 1.05 }} className="relative group">
    <Link
      href={href}
      className="text-black hover:text-gray-600 font-medium transition"
    >
      {children}
    </Link>
    {/* Underline Animation */}
    <motion.div
      className="absolute bottom-0 left-0 h-0.5 bg-black origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-300"
      style={{ width: "100%" }}
    />
  </motion.div>
);
