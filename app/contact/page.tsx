import { Card } from '../../components/ui/card.js';
import { Card } from '../../components/ui/card.js';
import { Card } from '../../components/ui/card.js';
import { Card } from '../../components/ui/card.js';
import { Card } from '../../components/ui/card.js';
import { Card } from '../../components/ui/card.js';
import { Card } from '../../components/ui/card.js';
import { Card } from '../../components/ui/card.js';
import { Card } from '../../components/ui/card.js';
import { Card } from '../../components/ui/card.js';
import { Card } from '../../components/ui/card.js';
import { Card } from '../../components/ui/card.js';
import { Card } from '../../components/ui/card.js';
import { Card } from '../../components/ui/card.js';
import { Card } from '../../components/ui/card.tsx';
import { Card } from '../../components/ui/card.tsx';
import { Card } from '../../components/ui/card.tsx';
"use client";
import React, { useState } from 'react';
import { Card } from '../../components/ui/card';
import { Input } from '../../components/ui/input';
import { Button } from '../../components/ui/button';

// Force dynamic rendering to prevent static generation issues;
export const dynamic = 'force-dynamic';
export const revalidate = 0;

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',;
    email: '',;
    company: '',;
    message: '',;
    subject: 'General Inquiry',;
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate API call;
    await new Promise(resolve => setTimeout(resolve, 1000));

    setSubmitted(true);
    setIsSubmitting(false);
  };

  const handleChange = (;
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>;
  ) => {
    setFormData(prev => ({
      ...prev,;
      [e.target.name]: e.target.value,;
    }));
  };

  if (submitted) {
    return (;
      <div className="min-h-screen bg-gradient-to-br from-blue-900 via-purple-900 to-black text-white">;
        <div className="container mx-auto px-4 py-20">;
          <div className="max-w-2xl mx-auto text-center">;
            <div className="mb-8">;
              <div className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4">;
                <svg;
                  xmlns="http://www.w3.org/2000/svg";
                  fill="none";
                  viewBox="0 0 24 24";
                  strokeWidth={1.5}
                  stroke="currentColor";
                  className="w-12 h-12 text-white";
                >;
                  <path;
                    strokeLinecap="round";
                    strokeLinejoin="round";
                    d="M4.5 12.75l6 6 9-13.5";
                  />;
                </svg>;
              </div>;
              <h2 className="text-2xl font-bold mb-2">Thank you for contacting us!</h2>;
              <p className="text-gray-300">We have received your message and will get back to you soon.</p>;
            </div>;
            <Button asChild>;
              <a href="/">Back to Home</a>;
            </Button>;
          </div>;
        </div>;
      </div>;
    );
  }

  return (;
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-purple-900 to-black text-white">;
      <div className="container mx-auto px-4 py-20">;
        <div className="max-w-2xl mx-auto">;
          <Card className="bg-black/80 border border-gray-800 shadow-xl">;
            <form onSubmit={handleSubmit} className="p-8 space-y-6">;
              <h1 className="text-3xl font-bold mb-6 text-center">Contact Us</h1>;
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">;
                <div>;
                  <label htmlFor="name" className="block mb-2 text-sm font-medium">Name</label>;
                  <Input;
                    id="name";
                    name="name";
                    type="text";
                    value={formData.name}
                    onChange={handleChange}
                    required;
                    className="bg-gray-900 border-gray-700 text-white";
                  />;
                </div>;
                <div>;
                  <label htmlFor="email" className="block mb-2 text-sm font-medium">Email</label>;
                  <Input;
                    id="email";
                    name="email";
                    type="email";
                    value={formData.email}
                    onChange={handleChange}
                    required;
                    className="bg-gray-900 border-gray-700 text-white";
                  />;
                </div>;
                <div>;
                  <label htmlFor="company" className="block mb-2 text-sm font-medium">Company</label>;
                  <Input;
                    id="company";
                    name="company";
                    type="text";
                    value={formData.company}
                    onChange={handleChange}
                    className="bg-gray-900 border-gray-700 text-white";
                  />;
                </div>;
                <div>;
                  <label htmlFor="subject" className="block mb-2 text-sm font-medium">Subject</label>;
                  <select;
                    id="subject";
                    name="subject";
                    value={formData.subject}
                    onChange={handleChange}
                    className="bg-gray-900 border-gray-700 text-white rounded-md w-full h-10 px-3 py-2";
                  >;
                    <option>General Inquiry</option>;
                    <option>Support</option>;
                    <option>Partnership</option>;
                    <option>Press</option>;
                  </select>;
                </div>;
              </div>;
              <div>;
                <label htmlFor="message" className="block mb-2 text-sm font-medium">Message</label>;
                <textarea;
                  id="message";
                  name="message";
                  value={formData.message}
                  onChange={handleChange}
                  required;
                  rows={5}
                  className="bg-gray-900 border-gray-700 text-white rounded-md w-full px-3 py-2";
                />;
              </div>;
              <Button type="submit" disabled={isSubmitting} className="w-full mt-4">;
                {isSubmitting ? 'Sending...' : 'Send Message'}
              </Button>;
            </form>;
          </Card>;
        </div>;
      </div>;
    </div>;
  );
}
