'use client';

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    message: '',
    subject: 'General Inquiry'
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    setSubmitted(true);
    setIsSubmitting(false);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  if (submitted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-900 via-purple-900 to-black text-white">
        <div className="container mx-auto px-4 py-20">
          <div className="max-w-2xl mx-auto text-center">
            <div className="mb-8">
              <div className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h1 className="text-4xl font-bold mb-4">Message Sent!</h1>
              <p className="text-xl text-gray-300">
                Thank you for contacting AlphaAI StockX. Our team will get back to you within 24 hours.
              </p>
            </div>
            <Button 
              onClick={() => setSubmitted(false)}
              className="bg-blue-600 hover:bg-blue-700"
            >
              Send Another Message
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-purple-900 to-black text-white">
      <div className="container mx-auto px-4 py-20">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-5xl font-bold mb-6 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              Contact AlphaAI StockX
            </h1>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Ready to revolutionize your trading? Get in touch with our AI trading experts.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <Card className="p-8 bg-gray-900/50 border-gray-700">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">Name *</label>
                    <Input
                      type="text"
                      name="name"
                      required
                      value={formData.name}
                      onChange={handleChange}
                      className="bg-gray-800 border-gray-600 text-white"
                      placeholder="Your full name"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Email *</label>
                    <Input
                      type="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      className="bg-gray-800 border-gray-600 text-white"
                      placeholder="your@email.com"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Company</label>
                  <Input
                    type="text"
                    name="company"
                    value={formData.company}
                    onChange={handleChange}
                    className="bg-gray-800 border-gray-600 text-white"
                    placeholder="Your company (optional)"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Subject</label>
                  <select
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    className="w-full px-3 py-2 bg-gray-800 border border-gray-600 rounded-md text-white"
                  >
                    <option value="General Inquiry">General Inquiry</option>
                    <option value="Enterprise Solutions">Enterprise Solutions</option>
                    <option value="API Integration">API Integration</option>
                    <option value="Technical Support">Technical Support</option>
                    <option value="Partnership">Partnership Opportunity</option>
                    <option value="Investment">Investment Inquiry</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Message *</label>
                  <textarea
                    name="message"
                    required
                    rows={6}
                    value={formData.message}
                    onChange={handleChange}
                    className="w-full px-3 py-2 bg-gray-800 border border-gray-600 rounded-md text-white resize-none"
                    placeholder="Tell us about your trading goals and how we can help..."
                  />
                </div>

                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold py-3"
                >
                  {isSubmitting ? 'Sending...' : 'Send Message'}
                </Button>
              </form>
            </Card>

            {/* Contact Info */}
            <div className="space-y-8">
              <Card className="p-6 bg-gray-900/50 border-gray-700">
                <h3 className="text-xl font-semibold mb-4">Get Started Today</h3>
                <p className="text-gray-300 mb-4">
                  Join thousands of traders who have transformed their portfolios with our AI-powered trading platform.
                </p>
                <div className="space-y-3">
                  <div className="flex items-center">
                    <div className="w-2 h-2 bg-green-500 rounded-full mr-3"></div>
                    <span>Average 23.7% annual returns</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-2 h-2 bg-green-500 rounded-full mr-3"></div>
                    <span>95%+ trade accuracy</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-2 h-2 bg-green-500 rounded-full mr-3"></div>
                    <span>24/7 automated trading</span>
                  </div>
                </div>
              </Card>

              <Card className="p-6 bg-gray-900/50 border-gray-700">
                <h3 className="text-xl font-semibold mb-4">Contact Information</h3>
                <div className="space-y-4">
                  <div>
                    <h4 className="font-medium text-blue-400">Email</h4>
                    <p className="text-gray-300">support@alphaaistockx.com</p>
                  </div>
                  <div>
                    <h4 className="font-medium text-blue-400">Enterprise Sales</h4>
                    <p className="text-gray-300">enterprise@alphaaistockx.com</p>
                  </div>
                  <div>
                    <h4 className="font-medium text-blue-400">Response Time</h4>
                    <p className="text-gray-300">Within 24 hours</p>
                  </div>
                </div>
              </Card>

              <Card className="p-6 bg-gray-900/50 border-gray-700">
                <h3 className="text-xl font-semibold mb-4">Quick Links</h3>
                <div className="space-y-2">
                  <a href="/demo" className="block text-blue-400 hover:text-blue-300">
                    → Try Live Demo
                  </a>
                  <a href="/subscription" className="block text-blue-400 hover:text-blue-300">
                    → View Pricing Plans
                  </a>
                  <a href="/faq" className="block text-blue-400 hover:text-blue-300">
                    → Frequently Asked Questions
                  </a>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
