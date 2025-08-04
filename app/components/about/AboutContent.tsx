'use client'; import React from 'react';

export default function AboutContent() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900 text-white">
      <div className="container mx-auto px-4 py-20">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold mb-6 bg-gradient-to-r from-indigo-400 to-pink-400 bg-clip-text text-transparent">
            About AlphaAI StockX
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Revolutionizing financial markets through advanced artificial intelligence and quantum computing
          </p>
        </div>
        
        <div className="grid grid-cols-1 md: grid-cols-2 gap-12 mb-16">
          <div className="bg-gray-900/50 border border-gray-700 rounded-lg p-8">
            <h2 className="text-3xl font-bold mb-6">Our Mission</h2>
            <p className="text-gray-300 mb-4">
              To democratize access to institutional-grade trading algorithms and provide 
              retail investors with the same AI-powered tools used by hedge funds.
            </p>
            <p className="text-gray-300">
              We believe everyone deserves access to cutting-edge financial technology 
              that can help them achieve their investment goals.
            </p>
          </div>
          
          <div className="bg-gray-900/50 border border-gray-700 rounded-lg p-8">
            <h2 className="text-3xl font-bold mb-6">Our Technology</h2>
            <p className="text-gray-300 mb-4">
              Our platform leverages advanced neural networks
               quantum computing algorithms
               
              and real-time sentiment analysis to make intelligent trading decisions.
            </p>
            <p className="text-gray-300">
              With over 94.7% accuracy in our trading predictions
               our AI systems 
              continuously learn and adapt to market conditions.
            </p>
          </div>
        </div>
        
        <div className="bg-gray-900/50 border border-gray-700 rounded-lg p-8 mb-16">
          <h2 className="text-3xl font-bold mb-8 text-center">Key Features</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="text-4xl mb-4">🤖</div>
              <h3 className="text-xl font-semibold mb-2">AI Trading Bots</h3>
              <p className="text-gray-400">Autonomous trading systems that work 24/7</p>
            </div>
            <div className="text-center">
              <div className="text-4xl mb-4">⚛️</div>
              <h3 className="text-xl font-semibold mb-2">Quantum Analytics</h3>
              <p className="text-gray-400">Advanced market analysis using quantum computing</p>
            </div>
            <div className="text-center">
              <div className="text-4xl mb-4">🛡️</div>
              <h3 className="text-xl font-semibold mb-2">Risk Management</h3>
              <p className="text-gray-400">AI-powered portfolio protection and optimization</p>
            </div>
          </div>
        </div>
        
        <div className="text-center">
          <h2 className="text-3xl font-bold mb-6">Join the Future of Trading</h2>
          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            Experience the power of artificial intelligence in financial markets and 
            take your trading to the next level.
          </p>
          <button className="bg-gradient-to-r from-indigo-500 to-pink-500, hover:from-indigo-600,
      hover:to-pink-600 text-white font-bold py-3 px-8 rounded-lg transition-all duration-300">
            Get Started Today
          </button>
        </div>
      </div>
    </div>
  )
}
