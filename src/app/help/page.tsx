'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { useState } from 'react';
import { Search, MessageSquare, Phone, Mail, Book, Shield, CreditCard, Package } from 'lucide-react';

export default function HelpPage() {
  const [searchQuery, setSearchQuery] = useState('');

  const faqs = [
    {
      category: 'Getting Started',
      questions: [
        { question: 'How do I create an account?', answer: 'Click the "Sign Up" button in the top right corner, enter your email and password, and verify your email address.' },
        { question: 'Is Remnant free to use?', answer: 'Yes, creating an account and listing items is completely free. We only charge a 2.5% transaction fee when items are sold.' },
        { question: 'What kind of items can I list?', answer: 'You can list any single item, mismatched pair, or incomplete set. Popular categories include electronics, clothing, shoes, accessories, and home goods.' },
      ],
    },
    {
      category: 'Buying & Selling',
      questions: [
        { question: 'How does the matching system work?', answer: 'Our AI scans listings for complementary items. If you list a "Left AirPod", we\'ll match you with users looking for or selling "Right AirPod".' },
        { question: 'How do I make an offer on an item?', answer: 'Click the "Make Offer" button on any listing, enter your price, and send a message to the seller.' },
        { question: 'What payment methods are accepted?', answer: 'We support bank transfers, credit/debit cards, and mobile money. All payments are processed securely through our platform.' },
        { question: 'How do I know if a seller is trustworthy?', answer: 'Check their rating, reviews, and verification status. Always communicate through our platform and use our secure payment system.' },
      ],
    },
    {
      category: 'Safety & Security',
      questions: [
        { question: 'Is it safe to meet sellers/buyers in person?', answer: 'We recommend meeting in public places during daylight hours. Always bring a friend and let someone know where you\'re going.' },
        { question: 'What should I do if I encounter a scam?', answer: 'Immediately report the user through their profile and contact our support team. Never send money outside our platform.' },
        { question: 'How is my personal information protected?', answer: 'We use end-to-end encryption for all communications and never share your personal information with third parties.' },
      ],
    },
    {
      category: 'Account & Settings',
      questions: [
        { question: 'How do I reset my password?', answer: 'Click "Forgot Password" on the login page, enter your email, and follow the instructions in the email we send you.' },
        { question: 'Can I delete my account?', answer: 'Yes, go to Settings > Account > Delete Account. Note that this action is permanent and cannot be undone.' },
        { question: 'How do I change my notification preferences?', answer: 'Go to Settings > Notifications to customize which alerts you receive via email and push notifications.' },
      ],
    },
  ];

  const helpTopics = [
    { icon: Book, title: 'User Guide', description: 'Complete guide to using Remnant', link: '/help/guide' },
    { icon: Shield, title: 'Safety Tips', description: 'Stay safe while trading', link: '/safety' },
    { icon: CreditCard, title: 'Payments', description: 'Payment methods and fees', link: '/help/payments' },
    { icon: Package, title: 'Shipping', description: 'Shipping and delivery options', link: '/help/shipping' },
  ];

  const contactOptions = [
    { icon: MessageSquare, title: 'Live Chat', description: 'Chat with our support team', action: 'Start Chat' },
    { icon: Phone, title: 'Phone Support', description: 'Call us at 01-700-REMANT', action: 'Call Now' },
    { icon: Mail, title: 'Email Support', description: 'Send us an email', action: 'Send Email' },
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Hero Section */}
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4">How can we help you?</h1>
        <p className="text-lg text-neutral-600 dark:text-neutral-400 mb-8 max-w-2xl mx-auto">
          Find answers to common questions or contact our support team for personalized assistance
        </p>
        
        {/* Search */}
        <div className="max-w-2xl mx-auto">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-neutral-400" size={20} />
            <Input
              type="text"
              placeholder="Search for help articles..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-12 pr-4 py-6 text-lg"
            />
            <Button className="absolute right-2 top-2">Search</Button>
          </div>
        </div>
      </div>

      {/* Help Topics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
        {helpTopics.map((topic, index) => (
          <Card key={index} className="hover:shadow-lg transition-shadow">
            <CardContent className="p-6">
              <div className="flex flex-col items-center text-center">
                <div className="h-12 w-12 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center mb-4">
                  <topic.icon className="text-green-600 dark:text-green-400" size={24} />
                </div>
                <h3 className="font-semibold text-lg mb-2">{topic.title}</h3>
                <p className="text-sm text-neutral-500 mb-4">{topic.description}</p>
                <Button variant="outline" className="w-full">Learn More</Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* FAQ Section */}
      <div className="mb-12">
        <h2 className="text-3xl font-bold mb-8 text-center">Frequently Asked Questions</h2>
        
        <Accordion type="single" collapsible className="max-w-4xl mx-auto space-y-4">
          {faqs.map((category, catIndex) => (
            <Card key={catIndex}>
              <CardHeader>
                <CardTitle>{category.category}</CardTitle>
              </CardHeader>
              <CardContent>
                <Accordion type="single" collapsible>
                  {category.questions.map((faq, qIndex) => (
                    <AccordionItem key={qIndex} value={`${catIndex}-${qIndex}`}>
                      <AccordionTrigger className="text-left">
                        {faq.question}
                      </AccordionTrigger>
                      <AccordionContent className="text-neutral-600 dark:text-neutral-400">
                        {faq.answer}
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </CardContent>
            </Card>
          ))}
        </Accordion>
      </div>

      {/* Contact Section */}
      <Card className="max-w-4xl mx-auto mb-12">
        <CardHeader>
          <CardTitle className="text-2xl">Still need help?</CardTitle>
          <CardDescription>
            Our support team is here to assist you
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {contactOptions.map((option, index) => (
              <Card key={index} className="border-2">
                <CardContent className="p-6">
                  <div className="flex flex-col items-center text-center">
                    <div className="h-12 w-12 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center mb-4">
                      <option.icon className="text-blue-600 dark:text-blue-400" size={24} />
                    </div>
                    <h3 className="font-semibold text-lg mb-2">{option.title}</h3>
                    <p className="text-sm text-neutral-500 mb-4">{option.description}</p>
                    <Button className="w-full">{option.action}</Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Community Section */}
      <Card className="max-w-4xl mx-auto">
        <CardContent className="p-8">
          <div className="text-center">
            <h3 className="text-2xl font-bold mb-4">Join Our Community</h3>
            <p className="text-neutral-600 dark:text-neutral-400 mb-6">
              Connect with other Remnant users, share tips, and get help from the community
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Button>Community Forum</Button>
              <Button variant="outline">Facebook Group</Button>
              <Button variant="outline">WhatsApp Channel</Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}