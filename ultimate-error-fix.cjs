#!/usr/bin/env node

const fs = require('fs');
const { glob } = require('glob');

console.log('🔧 ULTIMATE PROJECT ERROR FIXING');
console.log('=================================');

async function recreateCleanFiles() {
  console.log('🧹 Recreating clean versions of corrupted core files...');
  
  // Clean layout.tsx
  const layoutContent = `import { Inter } from 'next/font/google';
import type { Metadata } from 'next';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'AlphaAI StockX - AI Trading Platform',
  description: 'Advanced AI-powered trading platform with quantum analytics and neural networks',
  keywords: 'AI trading, stock analysis, financial AI, trading automation',
  authors: [{ name: 'AlphaAIStockX Team' }],
  robots: 'index, follow',
  metadataBase: new URL('https://alphaaistockx.com'),
  openGraph: {
    title: 'AlphaAI StockX - AI Trading Platform',
    description: 'Advanced AI-powered trading platform',
    url: 'https://alphaaistockx.com',
    siteName: 'AlphaAiStockX',
    images: [{
      url: '/og-image.jpg',
      width: 1200,
      height: 630,
      alt: 'AlphaAI StockX'
    }],
    type: 'website'
  },
  twitter: {
    card: 'summary_large_image',
    title: 'AlphaAI StockX - AI Trading Platform',
    description: 'Advanced AI-powered trading platform',
    images: ['/twitter-image.jpg'],
    site: '@alphaaistockx',
    creator: '@alphaaistockx'
  },
  icons: {
    icon: [
      { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' }
    ],
    apple: [{ url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' }]
  }
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        {children}
      </body>
    </html>
  );
}`;

  // Clean contact page
  const contactContent = `"use client";
import React, { useState } from 'react';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    message: '',
    subject: 'General Inquiry'
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-purple-900 to-black text-white">
      <div className="container mx-auto px-4 py-20">
        <div className="max-w-2xl mx-auto text-center">
          <h1 className="text-5xl font-bold mb-6 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
            Contact Us
          </h1>
          <p className="text-xl text-gray-300 mb-12">
            Get in touch with our AI trading experts
          </p>
          
          <div className="bg-gray-900/50 border border-gray-700 rounded-lg p-8">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium mb-2">
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full px-4 py-2 bg-gray-800 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-blue-500"
                  required
                />
              </div>
              
              <div>
                <label htmlFor="email" className="block text-sm font-medium mb-2">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-4 py-2 bg-gray-800 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-blue-500"
                  required
                />
              </div>
              
              <div>
                <label htmlFor="message" className="block text-sm font-medium mb-2">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows={5}
                  className="w-full px-4 py-2 bg-gray-800 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-blue-500"
                  required
                />
              </div>
              
              <button
                type="submit"
                className="w-full bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white font-bold py-3 px-6 rounded-lg transition-all duration-300"
              >
                Send Message
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}`;

  // Clean investors page
  const investorsContent = `"use client";
import React from 'react';

export default function InvestorsPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-fuchsia-900 via-purple-900 to-black text-white">
      <div className="container mx-auto px-4 py-20">
        <h1 className="text-5xl font-bold text-center mb-8 bg-gradient-to-r from-fuchsia-400 to-purple-400 bg-clip-text text-transparent">
          Investor Relations
        </h1>
        <p className="text-xl text-gray-300 text-center max-w-3xl mx-auto mb-12">
          Join the future of AI-powered trading and investment
        </p>
        
        <div className="max-w-md mx-auto">
          <form className="space-y-4">
            <input
              type="text"
              placeholder="Your Name"
              className="w-full bg-black/30 text-fuchsia-100 rounded-lg px-4 py-2 border border-fuchsia-500/30 focus:outline-none focus:border-fuchsia-500"
              required
            />
            <input
              type="email"
              placeholder="Email Address"
              className="w-full bg-black/30 text-fuchsia-100 rounded-lg px-4 py-2 border border-fuchsia-500/30 focus:outline-none focus:border-fuchsia-500"
              required
            />
            <input
              type="text"
              placeholder="Company/Organization"
              className="w-full bg-black/30 text-fuchsia-100 rounded-lg px-4 py-2 border border-fuchsia-500/30 focus:outline-none focus:border-fuchsia-500"
            />
            <textarea
              placeholder="Investment Inquiry"
              rows={4}
              className="w-full bg-black/30 text-fuchsia-100 rounded-lg px-4 py-2 border border-fuchsia-500/30 focus:outline-none focus:border-fuchsia-500"
              required
            />
            <button
              type="submit"
              className="w-full bg-gradient-to-r from-fuchsia-600 to-purple-600 hover:from-fuchsia-700 hover:to-purple-700 text-white font-bold py-3 px-6 rounded-lg transition-all duration-300"
            >
              Submit Inquiry
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}`;

  try {
    // Write clean files
    fs.writeFileSync('app/layout.tsx', layoutContent);
    console.log('✅ Created clean layout.tsx');
    
    fs.writeFileSync('app/contact/page.tsx', contactContent);
    console.log('✅ Created clean contact/page.tsx');
    
    fs.writeFileSync('app/investors/page.tsx', investorsContent);
    console.log('✅ Created clean investors/page.tsx');
    
    console.log('\\n🎉 All core files recreated with clean syntax!');
    
  } catch (error) {
    console.error('❌ Error creating clean files:', error);
    process.exit(1);
  }
}

async function main() {
  await recreateCleanFiles();
  console.log('\\n🚀 Project error fixing complete!');
}

main().catch(console.error);
