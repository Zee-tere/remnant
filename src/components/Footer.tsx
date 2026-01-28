import React from "react";
import Link from "next/link";
import { FaFacebook, FaInstagram, FaXTwitter, FaLinkedin, FaGithub } from "react-icons/fa6";
import { Button } from "@/components/ui/button";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const footerLinks = {
    Marketplace: [
      { label: "Browse All", href: "/marketplace" },
      { label: "Find a Pair", href: "/find-a-pair" },
      { label: "Trending Items", href: "/trending" },
      { label: "Recently Added", href: "/new-listings" },
    ],
    Sell: [
      { label: "Sell an Item", href: "/dashboard?section=upload" },
      { label: "Seller Guidelines", href: "/seller-guide" },
      { label: "Pricing & Fees", href: "/pricing" },
      { label: "Success Stories", href: "/success-stories" },
    ],
    Company: [
      { label: "About Us", href: "/about" },
      { label: "Blog", href: "/blog" },
      { label: "Careers", href: "/careers" },
      { label: "Press", href: "/press" },
    ],
    Support: [
      { label: "Help Center", href: "/help" },
      { label: "Safety Tips", href: "/safety" },
      { label: "Contact Us", href: "/contact" },
      { label: "Privacy Policy", href: "/privacy" },
    ],
  };

  const socialLinks = [
    { icon: FaFacebook, href: "https://facebook.com", label: "Facebook" },
    { icon: FaXTwitter, href: "https://twitter.com", label: "Twitter/X" },
    { icon: FaInstagram, href: "https://instagram.com", label: "Instagram" },
    { icon: FaLinkedin, href: "https://linkedin.com", label: "LinkedIn" },
    { icon: FaGithub, href: "https://github.com", label: "GitHub" },
  ];

  return (
    <footer className="bg-neutral-950 text-white">
      {/* Main Footer Content */}
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* Brand Column */}
          <div className="lg:col-span-2">
            <Link href="/" className="inline-flex items-center space-x-2 mb-6">
              <div className="bg-white text-black rounded-full h-12 w-12 flex items-center justify-center text-2xl font-bold">
                R
              </div>
              <span className="text-2xl font-bold">Remnant</span>
            </Link>
            <p className="text-neutral-400 mb-6 max-w-md">
              Connecting buyers and sellers of single items, mismatched pairs, and unwanted products. 
              Join Africa's first dedicated marketplace for the circular economy.
            </p>
            
            {/* Newsletter Signup */}
            <div className="mb-8">
              <h3 className="text-lg font-semibold mb-3">Stay Updated</h3>
              <div className="flex flex-col sm:flex-row gap-2">
                <input
                  type="email"
                  placeholder="Your email address"
                  className="flex-1 px-4 py-2 rounded-lg bg-neutral-800 border border-neutral-700 focus:outline-none focus:ring-2 focus:ring-white"
                  aria-label="Email for newsletter"
                />
                <Button className="bg-white text-black hover:bg-neutral-200">
                  Subscribe
                </Button>
              </div>
              <p className="text-sm text-neutral-500 mt-2">
                Get updates on new features and matches
              </p>
            </div>
          </div>

          {/* Links Columns */}
          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category}>
              <h3 className="text-lg font-semibold mb-4">{category}</h3>
              <ul className="space-y-3">
                {links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-neutral-400 hover:text-white transition-colors inline-flex items-center group"
                    >
                      <span>{link.label}</span>
                      <span className="ml-2 opacity-0 group-hover:opacity-100 transition-opacity">→</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-neutral-800 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            {/* Social Links */}
            <div className="flex items-center space-x-4">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-neutral-400 hover:text-white transition-colors p-2 hover:bg-neutral-800 rounded-full"
                  aria-label={social.label}
                >
                  <social.icon size={20} />
                </a>
              ))}
            </div>

            {/* Copyright & Legal */}
            <div className="text-center md:text-left">
              <p className="text-neutral-500 text-sm">
                © {currentYear} Remnant Marketplace. All rights reserved.
              </p>
              <div className="flex flex-wrap justify-center md:justify-start gap-4 mt-2">
                <Link href="/terms" className="text-neutral-500 hover:text-white text-sm transition-colors">
                  Terms of Service
                </Link>
                <Link href="/privacy" className="text-neutral-500 hover:text-white text-sm transition-colors">
                  Privacy Policy
                </Link>
                <Link href="/cookies" className="text-neutral-500 hover:text-white text-sm transition-colors">
                  Cookie Policy
                </Link>
                <Link href="/sitemap" className="text-neutral-500 hover:text-white text-sm transition-colors">
                  Sitemap
                </Link>
              </div>
            </div>

            {/* App Badges */}
            <div className="flex items-center space-x-3">
              <button 
                className="px-4 py-2 bg-neutral-800 hover:bg-neutral-700 rounded-lg text-sm transition-colors"
                aria-label="Download on App Store"
              >
                App Store
              </button>
              <button 
                className="px-4 py-2 bg-neutral-800 hover:bg-neutral-700 rounded-lg text-sm transition-colors"
                aria-label="Get it on Google Play"
              >
                Google Play
              </button>
            </div>
          </div>

          {/* Trust Badges */}
          <div className="mt-8 pt-6 border-t border-neutral-800">
            <div className="flex flex-wrap items-center justify-center gap-6 text-neutral-500 text-sm">
              <span className="flex items-center space-x-1">
                <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                <span>SSL Secured</span>
              </span>
              <span>•</span>
              <span>100% Buyer Protection</span>
              <span>•</span>
              <span>Verified Sellers</span>
              <span>•</span>
              <span>Escrow Available</span>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Bottom Navigation (Sticky on mobile) */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-neutral-950 border-t border-neutral-800 py-3 px-4">
        <div className="flex justify-around items-center">
          <Link href="/" className="flex flex-col items-center text-neutral-400 hover:text-white">
            <span className="text-xs">Home</span>
          </Link>
          <Link href="/marketplace" className="flex flex-col items-center text-neutral-400 hover:text-white">
            <span className="text-xs">Browse</span>
          </Link>
          <Link href="/dashboard?section=upload" className="flex flex-col items-center text-neutral-400 hover:text-white">
            <span className="text-xs bg-green-500 text-black px-3 py-1 rounded-full">Sell</span>
          </Link>
          <Link href="/dashboard" className="flex flex-col items-center text-neutral-400 hover:text-white">
            <span className="text-xs">Dashboard</span>
          </Link>
          <Link href="/profile" className="flex flex-col items-center text-neutral-400 hover:text-white">
            <span className="text-xs">Profile</span>
          </Link>
        </div>
      </div>
    </footer>
  );
}