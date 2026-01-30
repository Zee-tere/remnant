'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import { Users, Target, Globe, Heart, TrendingUp, Shield, Award, Zap } from 'lucide-react';

export default function AboutPage() {
  const teamMembers = [
    { name: 'Ude Fortune', role: 'Founder & CEO', image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop' },
    { name: 'Funmilayo Ude', role: 'CTO', image: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=400&h=400&fit=crop' },
    { name: 'Chinedu Okoro', role: 'Head of Operations', image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop' },
    { name: 'Amina Bello', role: 'Community Manager', image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&h=400&fit=crop' },
  ];

  const milestones = [
    { year: '2024', event: 'Remnant Idea Born', description: 'Concept development began' },
    { year: '2025', event: 'Beta Launch', description: 'First 1000 users in Lagos' },
    { year: '2026', event: 'National Expansion', description: 'Covered all 36 states' },
    { year: '2027', event: '1M Users', description: 'Reached milestone of 1 million users' },
  ];

  const values = [
    { icon: Heart, title: 'Sustainability', description: 'Reducing waste through circular economy' },
    { icon: Users, title: 'Community', description: 'Building trust among Nigerian users' },
    { icon: Shield, title: 'Safety', description: 'Secure transactions and verified users' },
    { icon: Zap, title: 'Innovation', description: 'AI-powered matching technology' },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-green-50 to-emerald-100 dark:from-emerald-950/30 dark:to-green-950/20 py-16 md:py-24">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center max-w-4xl mx-auto"
          >
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              About <span className="text-green-600">Remnant</span>
            </h1>
            <p className="text-xl md:text-2xl text-neutral-600 dark:text-neutral-300 mb-8">
              Africa's first dedicated marketplace for single items, mismatched pairs, and unwanted products
            </p>
            <p className="text-lg text-neutral-500 dark:text-neutral-400 max-w-3xl mx-auto">
              We're on a mission to transform consumption in Nigeria by giving every item a second chance at life
            </p>
          </motion.div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <Card className="h-full border-2 border-green-500/20">
                <CardHeader>
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-green-100 dark:bg-green-900/30 mb-6">
                    <Target className="text-green-600 dark:text-green-400" size={28} />
                  </div>
                  <CardTitle className="text-2xl">Our Mission</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-lg text-neutral-600 dark:text-neutral-400 mb-4">
                    To create Africa's most trusted circular economy platform where no item goes to waste
                  </p>
                  <ul className="space-y-3">
                    <li className="flex items-start">
                      <div className="h-2 w-2 bg-green-500 rounded-full mt-2 mr-3"></div>
                      <span>Reduce household waste by 30% in Nigeria</span>
                    </li>
                    <li className="flex items-start">
                      <div className="h-2 w-2 bg-green-500 rounded-full mt-2 mr-3"></div>
                      <span>Create economic opportunities for 5 million Nigerians</span>
                    </li>
                    <li className="flex items-start">
                      <div className="h-2 w-2 bg-green-500 rounded-full mt-2 mr-3"></div>
                      <span>Build a sustainable marketplace that benefits people and planet</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <Card className="h-full border-2 border-emerald-500/20">
                <CardHeader>
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-emerald-100 dark:bg-emerald-900/30 mb-6">
                    <Globe className="text-emerald-600 dark:text-emerald-400" size={28} />
                  </div>
                  <CardTitle className="text-2xl">Our Vision</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-lg text-neutral-600 dark:text-neutral-400 mb-4">
                    To become Africa's leading platform for sustainable consumption and circular economy
                  </p>
                  <ul className="space-y-3">
                    <li className="flex items-start">
                      <div className="h-2 w-2 bg-emerald-500 rounded-full mt-2 mr-3"></div>
                      <span>Expand to 10 African countries by 2030</span>
                    </li>
                    <li className="flex items-start">
                      <div className="h-2 w-2 bg-emerald-500 rounded-full mt-2 mr-3"></div>
                      <span>Divert 1 million tons of waste from landfills annually</span>
                    </li>
                    <li className="flex items-start">
                      <div className="h-2 w-2 bg-emerald-500 rounded-full mt-2 mr-3"></div>
                      <span>Empower 50 million Africans through circular economy</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>

      {/* The Problem & Solution */}
      <section className="py-16 md:py-24 bg-neutral-50 dark:bg-neutral-900/50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">The Problem We Solve</h2>
            <p className="text-lg text-neutral-600 dark:text-neutral-400 max-w-3xl mx-auto">
              Nigeria generates 32 million tons of solid waste annually, with only 20-30% collected
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <Card>
              <CardHeader>
                <CardTitle className="text-red-600">The Problem</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-4">
                  <li className="flex items-start">
                    <div className="h-6 w-6 rounded-full bg-red-100 dark:bg-red-900/30 flex items-center justify-center mr-3">
                      <span className="text-red-600 font-bold">!</span>
                    </div>
                    <div>
                      <h4 className="font-semibold">Waste Crisis</h4>
                      <p className="text-neutral-600 dark:text-neutral-400">
                        Nigeria faces growing waste management challenges with limited recycling infrastructure
                      </p>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <div className="h-6 w-6 rounded-full bg-red-100 dark:bg-red-900/30 flex items-center justify-center mr-3">
                      <span className="text-red-600 font-bold">!</span>
                    </div>
                    <div>
                      <h4 className="font-semibold">Economic Loss</h4>
                      <p className="text-neutral-600 dark:text-neutral-400">
                        Billions of Naira worth of usable items discarded annually
                      </p>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <div className="h-6 w-6 rounded-full bg-red-100 dark:bg-red-900/30 flex items-center justify-center mr-3">
                      <span className="text-red-600 font-bold">!</span>
                    </div>
                    <div>
                      <h4 className="font-semibold">Limited Access</h4>
                      <p className="text-neutral-600 dark:text-neutral-400">
                        No dedicated platform for buying/selling single items and mismatched pairs
                      </p>
                    </div>
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-green-600">Our Solution</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-4">
                  <li className="flex items-start">
                    <div className="h-6 w-6 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center mr-3">
                      <span className="text-green-600 font-bold">✓</span>
                    </div>
                    <div>
                      <h4 className="font-semibold">Circular Marketplace</h4>
                      <p className="text-neutral-600 dark:text-neutral-400">
                        Platform connecting buyers and sellers of single items across Nigeria
                      </p>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <div className="h-6 w-6 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center mr-3">
                      <span className="text-green-600 font-bold">✓</span>
                    </div>
                    <div>
                      <h4 className="font-semibold">Smart Matching</h4>
                      <p className="text-neutral-600 dark:text-neutral-400">
                        AI-powered matching system to find missing pairs and complementary items
                      </p>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <div className="h-6 w-6 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center mr-3">
                      <span className="text-green-600 font-bold">✓</span>
                    </div>
                    <div>
                      <h4 className="font-semibold">Economic Empowerment</h4>
                      <p className="text-neutral-600 dark:text-neutral-400">
                        Creating income opportunities while promoting sustainable consumption
                      </p>
                    </div>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Our Values</h2>
            <p className="text-lg text-neutral-600 dark:text-neutral-400 max-w-3xl mx-auto">
              The principles that guide everything we do at Remnant
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="h-full hover:shadow-lg transition-shadow">
                  <CardContent className="p-8">
                    <div className="flex flex-col items-center text-center">
                      <div className="h-16 w-16 rounded-2xl bg-green-100 dark:bg-green-900/30 flex items-center justify-center mb-6">
                        <value.icon className="text-green-600 dark:text-green-400" size={28} />
                      </div>
                      <h3 className="font-bold text-xl mb-3">{value.title}</h3>
                      <p className="text-neutral-600 dark:text-neutral-400">{value.description}</p>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-16 md:py-24 bg-neutral-50 dark:bg-neutral-900/50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Meet Our Team</h2>
            <p className="text-lg text-neutral-600 dark:text-neutral-400 max-w-3xl mx-auto">
              Passionate individuals working to build a sustainable future for Nigeria
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {teamMembers.map((member, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="overflow-hidden hover:shadow-xl transition-shadow">
                  <div className="aspect-square overflow-hidden">
                    <img
                      src={member.image}
                      alt={member.name}
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <CardContent className="p-6 text-center">
                    <h3 className="font-bold text-xl mb-1">{member.name}</h3>
                    <p className="text-green-600 font-medium">{member.role}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Milestones */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Our Journey</h2>
            <p className="text-lg text-neutral-600 dark:text-neutral-400 max-w-3xl mx-auto">
              From idea to impact: Our journey so far
            </p>
          </div>

          <div className="relative">
            <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-green-200 dark:bg-green-900/30"></div>
            
            <div className="space-y-12">
              {milestones.map((milestone, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  className={`flex items-center ${index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'}`}
                >
                  <div className={`w-1/2 ${index % 2 === 0 ? 'pr-12 text-right' : 'pl-12'}`}>
                    <Card>
                      <CardContent className="p-6">
                        <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-green-100 dark:bg-green-900/30 mb-4">
                          <span className="text-green-600 font-bold">{milestone.year}</span>
                        </div>
                        <h3 className="font-bold text-xl mb-2">{milestone.event}</h3>
                        <p className="text-neutral-600 dark:text-neutral-400">{milestone.description}</p>
                      </CardContent>
                    </Card>
                  </div>
                  
                  <div className="relative z-10">
                    <div className="h-4 w-4 rounded-full bg-green-500"></div>
                  </div>
                  
                  <div className="w-1/2"></div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 md:py-24 bg-gradient-to-r from-green-600 to-emerald-600">
        <div className="container mx-auto px-4 text-center text-white">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Join Our Mission
          </h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Be part of the movement transforming consumption in Nigeria
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button size="lg" className="bg-white text-green-600 hover:bg-white/90">
              Join Our Team
            </Button>
            <Button size="lg" variant="outline" className="text-white border-white hover:bg-white/10">
              Partner With Us
            </Button>
            <Button size="lg" variant="outline" className="text-white border-white hover:bg-white/10">
              Learn More
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}