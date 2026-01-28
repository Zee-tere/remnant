'use client';

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { motion, useAnimation } from "framer-motion";
import { 
  Search, Filter, Heart, Shield, TrendingUp, 
  Users, Package, Clock, CheckCircle, Star,
  ArrowRight, ChevronRight, Sparkles, Target
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function HomePage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [isScrolled, setIsScrolled] = useState(false);
  const controls = useAnimation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Featured listings mock data
  const featuredListings = [
    { id: 1, name: "Left AirPod Pro", category: "Electronics", price: "₦25,000", matches: 3, image: "https://images.unsplash.com/photo-1588423771077-8c31c5b2c0c3?w=400&h=300&fit=crop" },
    { id: 2, name: "Mens Right Shoe Size 42", category: "Fashion", price: "₦15,000", matches: 1, image: "https://images.unsplash.com/photo-1549298916-b41d501d3772?w=400&h=300&fit=crop" },
    { id: 3, name: "Single Gold Earring", category: "Jewelry", price: "₦12,000", matches: 2, image: "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=400&h=300&fit=crop" },
    { id: 4, name: "Broken iPhone Screen", category: "Electronics", price: "₦8,000", matches: 4, image: "https://images.unsplash.com/photo-1592899677977-9c10ca588bbd?w=400&h=300&fit=crop" },
  ];

  // Stats
  const stats = [
    { label: "Active Users", value: "10,000+", icon: Users },
    { label: "Successful Matches", value: "2,500+", icon: CheckCircle },
    { label: "Items Listed", value: "15,000+", icon: Package },
    { label: "Average Rating", value: "4.8/5", icon: Star },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-neutral-50 dark:from-neutral-950 dark:to-neutral-900">
      {/* Hero Section */}
      <section className="relative min-h-screen flex flex-col justify-center items-center px-4 md:px-8 py-16 md:py-24 overflow-hidden">
        {/* Background gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-green-50 via-white to-emerald-50 dark:from-emerald-950/20 dark:via-neutral-950 dark:to-emerald-950/10" />
        
        <div className="relative z-10 w-full max-w-7xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-8"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-green-500 to-emerald-500 text-white text-sm font-medium mb-6">
              <Sparkles size={16} />
              <span>Africa's First Single-Item Marketplace</span>
            </div>
            
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-6">
              Don't Discard,{" "}
              <span className="bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
                Remant
              </span>{" "}
              It
            </h1>
            
            <p className="text-xl md:text-2xl text-neutral-600 dark:text-neutral-300 mb-8 max-w-3xl mx-auto">
              Connect single items with their missing halves. Buy, sell, trade, or donate 
              unmatched products in Nigeria's circular economy marketplace.
            </p>
          </motion.div>

          {/* Search Bar */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="max-w-3xl mx-auto mb-8"
          >
            <div className="relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-neutral-400" size={24} />
              <Input
                type="text"
                placeholder="Search for single items, pairs, or specific parts..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="h-16 pl-14 pr-40 text-lg rounded-2xl border-2 shadow-lg"
              />
              <Button className="absolute right-2 top-2 h-12 px-6 rounded-xl">
                <Search className="mr-2" size={20} />
                Find Matches
              </Button>
            </div>
            <div className="flex flex-wrap justify-center gap-3 mt-4">
              {["AirPods", "Shoes", "Earrings", "Gloves", "Socks"].map((tag) => (
                <Button key={tag} variant="outline" size="sm" className="rounded-full">
                  {tag}
                </Button>
              ))}
            </div>
          </motion.div>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="flex flex-col sm:flex-row gap-4 justify-center mb-16"
          >
            <Link href="/dashboard?section=upload">
              <Button size="lg" className="h-14 px-8 rounded-xl text-lg bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700">
                <Package className="mr-3" />
                List an Item for Free
              </Button>
            </Link>
            <Link href="/marketplace">
              <Button size="lg" variant="outline" className="h-14 px-8 rounded-xl text-lg border-2">
                <TrendingUp className="mr-3" />
                Browse Marketplace
              </Button>
            </Link>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8 max-w-4xl mx-auto"
          >
            {stats.map((stat, index) => (
              <div key={stat.label} className="text-center p-4">
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-br from-green-100 to-emerald-100 dark:from-emerald-900/30 dark:to-green-900/30 mb-3">
                  <stat.icon className="text-green-600 dark:text-green-400" size={24} />
                </div>
                <div className="text-2xl md:text-3xl font-bold">{stat.value}</div>
                <div className="text-sm text-neutral-600 dark:text-neutral-400">{stat.label}</div>
              </div>
            ))}
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        >
          <ChevronRight className="rotate-90 text-neutral-400" size={24} />
        </motion.div>
      </section>

      {/* How It Works */}
      <section className="py-16 md:py-24 px-4 md:px-8 bg-white dark:bg-neutral-900">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">How Remnant Works</h2>
            <p className="text-lg text-neutral-600 dark:text-neutral-400 max-w-2xl mx-auto">
              From listing to matching in four simple steps
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { step: "1", title: "List Your Item", description: "Upload photos and details of your single item", icon: Package, color: "green" },
              { step: "2", title: "Tag Your Intent", description: "Choose to sell, trade, donate, or repair", icon: Target, color: "blue" },
              { step: "3", title: "Smart Matching", description: "Our AI finds potential matches instantly", icon: Sparkles, color: "purple" },
              { step: "4", title: "Connect & Complete", description: "Message matches and complete the exchange", icon: CheckCircle, color: "emerald" },
            ].map((item) => (
              <motion.div
                key={item.step}
                whileHover={{ y: -8 }}
                className="relative"
              >
                <Card className="h-full border-2 hover:border-green-500 transition-all duration-300">
                  <CardContent className="p-8">
                    <div className={`inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-${item.color}-100 dark:bg-${item.color}-900/30 mb-6`}>
                      <div className={`text-2xl font-bold text-${item.color}-600 dark:text-${item.color}-400`}>
                        {item.step}
                      </div>
                    </div>
                    <h3 className="text-xl font-bold mb-3">{item.title}</h3>
                    <p className="text-neutral-600 dark:text-neutral-400">
                      {item.description}
                    </p>
                  </CardContent>
                </Card>
                {item.step !== "4" && (
                  <div className="hidden lg:block absolute top-1/2 right-0 transform translate-x-1/2 -translate-y-1/2 text-neutral-300">
                    <ArrowRight size={24} />
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Matches */}
      <section className="py-16 md:py-24 px-4 md:px-8 bg-gradient-to-b from-neutral-50 to-white dark:from-neutral-900 dark:to-neutral-950">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12 gap-4">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                🔥 Hot Matches Right Now
              </h2>
              <p className="text-lg text-neutral-600 dark:text-neutral-400">
                Items with active seekers looking for their missing halves
              </p>
            </div>
            <Link href="/find-a-pair">
              <Button variant="outline" className="gap-2">
                View All Matches
                <ChevronRight size={16} />
              </Button>
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredListings.map((item) => (
              <motion.div
                key={item.id}
                whileHover={{ y: -8 }}
                className="group"
              >
                <Card className="overflow-hidden border-2 hover:border-green-500 transition-all duration-300">
                  <div className="relative aspect-square overflow-hidden">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    {item.matches > 0 && (
                      <div className="absolute top-3 right-3 bg-gradient-to-r from-green-500 to-emerald-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                        {item.matches} match{item.matches > 1 ? 'es' : ''}
                      </div>
                    )}
                  </div>
                  <CardContent className="p-6">
                    <h3 className="font-bold text-lg mb-2">{item.name}</h3>
                    <div className="flex justify-between items-center">
                      <span className="text-green-600 font-bold">{item.price}</span>
                      <span className="text-sm text-neutral-500">{item.category}</span>
                    </div>
                    <Button className="w-full mt-4" size="sm">
                      View Potential Matches
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Trust & Safety */}
      <section className="py-16 md:py-24 px-4 md:px-8 bg-white dark:bg-neutral-900">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Safe & Secure Trading
            </h2>
            <p className="text-lg text-neutral-600 dark:text-neutral-400 max-w-2xl mx-auto">
              Your safety is our priority. We've built multiple layers of protection.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { 
                icon: Shield, 
                title: "Verified Users", 
                description: "All users go through identity verification",
                features: ["Phone verification", "Profile completion", "Rating system"]
              },
              { 
                icon: Heart, 
                title: "Secure Payments", 
                description: "Protected transactions with escrow options",
                features: ["Payment protection", "Money-back guarantee", "Secure escrow"]
              },
              { 
                icon: Users, 
                title: "Community Support", 
                description: "24/7 support and community moderation",
                features: ["Live chat support", "Community guidelines", "Dispute resolution"]
              },
            ].map((feature) => (
              <Card key={feature.title} className="border-2 hover:border-green-500 transition-all duration-300">
                <CardContent className="p-8">
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-green-100 dark:bg-green-900/30 mb-6">
                    <feature.icon className="text-green-600 dark:text-green-400" size={28} />
                  </div>
                  <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
                  <p className="text-neutral-600 dark:text-neutral-400 mb-6">
                    {feature.description}
                  </p>
                  <ul className="space-y-2">
                    {feature.features.map((f) => (
                      <li key={f} className="flex items-center text-sm">
                        <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                        {f}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-16 md:py-24 px-4 md:px-8 bg-gradient-to-r from-green-600 to-emerald-600">
        <div className="max-w-4xl mx-auto text-center text-white">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-5xl font-bold mb-6">
              Ready to Find Your Missing Half?
            </h2>
            <p className="text-xl mb-8 text-green-100">
              Join thousands of Nigerians giving single items a second life.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/signup">
                <Button size="lg" className="h-14 px-8 rounded-xl text-lg bg-white text-green-600 hover:bg-white/90">
                  Start Free Today
                </Button>
              </Link>
              <Link href="/about">
                <Button size="lg" variant="outline" className="h-14 px-8 rounded-xl text-lg border-2 border-white text-white hover:bg-white/10">
                  Learn More
                </Button>
              </Link>
            </div>
            <p className="text-sm text-green-200 mt-6">
              No credit card required • Free to list • 2.5% transaction fee only
            </p>
          </motion.div>
        </div>
      </section>
    </div>
  );
}