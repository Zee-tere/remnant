'use client';

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, UserCircle, Search, Home, Package, Upload } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  // Mock auth state
  const isAuthenticated = true;
  const userName = "John Doe";

  // Handle scroll effect safely for SSR
  useEffect(() => {
    if (typeof window === 'undefined') return;
    
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Handle mobile menu close when clicking outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (!target.closest('.navbar-menu') && !target.closest('.mobile-menu-button')) {
        setMenuOpen(false);
      }
      if (!target.closest('.profile-menu') && !target.closest('.profile-button')) {
        setProfileOpen(false);
      }
    };

    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, []);

  const navItems = [
    { label: "Home", href: "/", icon: Home },
    { label: "Find a Pair", href: "/find-a-pair", icon: Package },
    { label: "Sell Item", href: "/dashboard?section=upload", icon: Upload },
  ];

  return (
    <header 
      className={`sticky top-0 z-50 w-full transition-all duration-300 ${
        scrolled 
          ? 'bg-white/95 dark:bg-neutral-900/95 backdrop-blur-md shadow-md' 
          : 'bg-white dark:bg-neutral-900'
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo - Always visible */}
          <Link href="/" className="flex items-center space-x-2 navbar-logo">
            <motion.div
              className="bg-black text-white rounded-full h-10 w-10 flex items-center justify-center text-lg font-bold"
              whileHover={{ rotate: 10 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              R
            </motion.div>
            <span className="text-xl font-bold text-black dark:text-white">Remnant</span>
          </Link>

          {/* Desktop Navigation - Hidden on mobile */}
          <nav className="hidden md:flex items-center space-x-6">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center space-x-1 px-3 py-2 rounded-lg transition-colors ${
                  pathname === item.href
                    ? 'bg-neutral-100 dark:bg-neutral-800 text-black dark:text-white'
                    : 'text-neutral-600 dark:text-neutral-300 hover:bg-neutral-50 dark:hover:bg-neutral-800'
                }`}
              >
                <item.icon size={18} />
                <span className="font-medium">{item.label}</span>
              </Link>
            ))}
          </nav>

          {/* Search Bar - Desktop only */}
          <div className="hidden md:block flex-1 max-w-md mx-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-neutral-400" size={20} />
              <input
                type="text"
                placeholder="Search items, categories..."
                className="w-full pl-10 pr-4 py-2 border border-neutral-300 dark:border-neutral-700 rounded-full bg-neutral-50 dark:bg-neutral-800 focus:outline-none focus:ring-2 focus:ring-black dark:focus:ring-white"
                aria-label="Search marketplace"
              />
            </div>
          </div>

          {/* Right side actions */}
          <div className="flex items-center space-x-4">
            {/* Mobile Search Button */}
            <button 
              className="md:hidden p-2 rounded-lg hover:bg-neutral-100 dark:hover:bg-neutral-800"
              aria-label="Search"
            >
              <Search size={20} />
            </button>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden p-2 rounded-lg hover:bg-neutral-100 dark:hover:bg-neutral-800 mobile-menu-button"
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label="Toggle menu"
              aria-expanded={menuOpen}
            >
              {menuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>

            {/* Profile Section */}
            {isAuthenticated ? (
              <div className="relative profile-menu">
                <button
                  onClick={() => setProfileOpen(!profileOpen)}
                  className="flex items-center space-x-2 px-4 py-2 rounded-lg bg-neutral-100 dark:bg-neutral-800 hover:bg-neutral-200 dark:hover:bg-neutral-700 transition-colors profile-button"
                  aria-label="User menu"
                  aria-expanded={profileOpen}
                >
                  <UserCircle size={20} />
                  <span className="hidden sm:inline font-medium">{userName.split(" ")[0]}</span>
                </button>

                <AnimatePresence>
                  {profileOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      className="absolute right-0 mt-2 w-56 bg-white dark:bg-neutral-900 rounded-lg shadow-lg border border-neutral-200 dark:border-neutral-700 py-2"
                    >
                      <div className="px-4 py-2 border-b border-neutral-100 dark:border-neutral-800">
                        <p className="font-medium">{userName}</p>
                        <p className="text-sm text-neutral-500 dark:text-neutral-400">Free Plan</p>
                      </div>
                      <Link
                        href="/dashboard"
                        onClick={() => setProfileOpen(false)}
                        className="flex items-center space-x-2 px-4 py-3 hover:bg-neutral-50 dark:hover:bg-neutral-800 transition-colors"
                      >
                        <Home size={18} />
                        <span>Dashboard</span>
                      </Link>
                      <Link
                        href="/profile"
                        onClick={() => setProfileOpen(false)}
                        className="flex items-center space-x-2 px-4 py-3 hover:bg-neutral-50 dark:hover:bg-neutral-800 transition-colors"
                      >
                        <UserCircle size={18} />
                        <span>My Profile</span>
                      </Link>
                      <Link
                        href="/settings"
                        onClick={() => setProfileOpen(false)}
                        className="flex items-center space-x-2 px-4 py-3 hover:bg-neutral-50 dark:hover:bg-neutral-800 transition-colors"
                      >
                        <span>Settings</span>
                      </Link>
                      <div className="border-t border-neutral-100 dark:border-neutral-800 mt-2 pt-2">
                        <button
                          onClick={() => {
                            setProfileOpen(false);
                            console.log("Logging out...");
                          }}
                          className="w-full text-left px-4 py-3 text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
                        >
                          Logout
                        </button>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ) : (
              <div className="flex items-center space-x-2">
                <Link href="/login">
                  <Button variant="outline" size="sm">Login</Button>
                </Link>
                <Link href="/signup">
                  <Button size="sm">Sign Up</Button>
                </Link>
              </div>
            )}
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {menuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden overflow-hidden"
            >
              <div className="py-4 border-t border-neutral-200 dark:border-neutral-800">
                {/* Mobile Search */}
                <div className="mb-4 px-2">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-neutral-400" size={20} />
                    <input
                      type="text"
                      placeholder="Search..."
                      className="w-full pl-10 pr-4 py-2 border border-neutral-300 dark:border-neutral-700 rounded-full bg-neutral-50 dark:bg-neutral-800"
                    />
                  </div>
                </div>

                {/* Mobile Nav Items */}
                <div className="space-y-1">
                  {navItems.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={() => setMenuOpen(false)}
                      className={`flex items-center space-x-3 px-4 py-3 rounded-lg ${
                        pathname === item.href
                          ? 'bg-neutral-100 dark:bg-neutral-800 text-black dark:text-white'
                          : 'text-neutral-600 dark:text-neutral-300 hover:bg-neutral-50 dark:hover:bg-neutral-800'
                      }`}
                    >
                      <item.icon size={20} />
                      <span className="font-medium">{item.label}</span>
                    </Link>
                  ))}
                  
                  {/* Additional mobile-only links */}
                  <div className="border-t border-neutral-100 dark:border-neutral-800 pt-2 mt-2">
                    <Link
                      href="/help"
                      onClick={() => setMenuOpen(false)}
                      className="flex items-center space-x-3 px-4 py-3 rounded-lg text-neutral-600 dark:text-neutral-300 hover:bg-neutral-50 dark:hover:bg-neutral-800"
                    >
                      <span>Help Center</span>
                    </Link>
                    <Link
                      href="/about"
                      onClick={() => setMenuOpen(false)}
                      className="flex items-center space-x-3 px-4 py-3 rounded-lg text-neutral-600 dark:text-neutral-300 hover:bg-neutral-50 dark:hover:bg-neutral-800"
                    >
                      <span>About Us</span>
                    </Link>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </header>
  );
}