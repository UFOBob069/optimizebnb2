'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import ProtectedRoute from '../components/ProtectedRoute';

export default function PricingStrategyPage() {
  const router = useRouter();
  const [url, setUrl] = useState('');
  const [email, setEmail] = useState('');
  const [address, setAddress] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError('');
    
    // Validate inputs
    if (!url) {
      setError('Please enter your Airbnb listing URL');
      return;
    }
    
    if (!url.includes('airbnb.com')) {
      setError('Please enter a valid Airbnb URL');
      return;
    }
    
    if (!email) {
      setError('Please enter your email address');
      return;
    }
    
    if (!address) {
      setError('Please enter your property address');
      return;
    }
    
    setIsLoading(true);
    
    try {
      const response = await fetch('/api/pricing-strategy', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          url,
          email,
          address,
        }),
      });
      
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.message || 'Failed to generate pricing strategy');
      }
      
      // Store the guide data in localStorage for the results page
      if (mounted) {
        localStorage.setItem('pricingStrategy', JSON.stringify(data.guide));
        router.push('/pricing-strategy/results');
      }
    } catch (err: unknown) {
      console.error('Error generating pricing strategy:', err);
      setError(err instanceof Error ? err.message : 'Failed to generate pricing strategy. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  if (!mounted) {
    return <div className="min-h-screen flex items-center justify-center">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
    </div>;
  }

  return (
    <ProtectedRoute>
      <div className="max-w-4xl mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-center mb-8">Get Your Optimal Pricing Strategy</h1>
        
        <div className="bg-gradient-to-r from-blue-600 to-indigo-700 rounded-xl overflow-hidden shadow-lg mb-8">
          <div className="p-6 md:p-8 text-white">
            <h2 className="text-2xl md:text-3xl font-bold mb-6">Why Optimize Your Pricing?</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-5 hover:bg-white/20 transition-all">
                <div className="flex items-start">
                  <span className="text-3xl mr-3">💰</span>
                  <div>
                    <h3 className="font-bold text-xl mb-2">Maximize Revenue</h3>
                    <p className="text-white/90">Dynamic pricing helps you capture the <span className="font-bold text-white">highest possible revenue</span> while maintaining high occupancy rates.</p>
                  </div>
                </div>
              </div>
              
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-5 hover:bg-white/20 transition-all">
                <div className="flex items-start">
                  <span className="text-3xl mr-3">📊</span>
                  <div>
                    <h3 className="font-bold text-xl mb-2">Stay Competitive</h3>
                    <p className="text-white/90">Keep your prices <span className="font-bold text-white">aligned with market trends</span> and similar properties in your area.</p>
                  </div>
                </div>
              </div>
              
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-5 hover:bg-white/20 transition-all">
                <div className="flex items-start">
                  <span className="text-3xl mr-3">🗓️</span>
                  <div>
                    <h3 className="font-bold text-xl mb-2">Seasonal Optimization</h3>
                    <p className="text-white/90">Automatically adjust prices based on <span className="font-bold text-white">peak seasons, local events, and market demand</span>.</p>
                  </div>
                </div>
              </div>
              
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-5 hover:bg-white/20 transition-all">
                <div className="flex items-start">
                  <span className="text-3xl mr-3">📈</span>
                  <div>
                    <h3 className="font-bold text-xl mb-2">Data-Driven Decisions</h3>
                    <p className="text-white/90">Make pricing decisions based on <span className="font-bold text-white">real market data</span> and competitor analysis.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="bg-white shadow-md rounded-lg p-6 mb-8">
          <h2 className="text-xl font-semibold mb-4">How It Works</h2>
          <ol className="list-decimal pl-5 space-y-2">
            <li>Enter your Airbnb listing URL</li>
            <li>Our AI will analyze your property and local market data</li>
            <li>Receive a personalized pricing strategy with seasonal adjustments</li>
            <li>Get recommendations for discounts, premiums, and promotions</li>
            <li>Learn how to position your property competitively in your market</li>
          </ol>
        </div>
        
        <div className="bg-white shadow-md rounded-lg p-6">
          <form onSubmit={handleSubmit}>
            <div className="mb-6">
              <label htmlFor="url" className="block text-gray-700 font-medium mb-2">
                Airbnb Listing URL*
              </label>
              <input
                type="url"
                id="url"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                placeholder="https://www.airbnb.com/rooms/12345678"
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <p className="text-sm text-gray-500 mt-1">
                We&apos;ll analyze your listing to provide accurate pricing recommendations
              </p>
            </div>
            
            <div className="mb-6">
              <label htmlFor="address" className="block text-gray-700 font-medium mb-2">
                Property Address*
              </label>
              <input
                type="text"
                id="address"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                placeholder="123 Main St, City, State, Country"
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <p className="text-sm text-gray-500 mt-1">
                We need this to analyze your local market
              </p>
            </div>
            
            <div className="mb-6">
              <label htmlFor="email" className="block text-gray-700 font-medium mb-2">
                Your Email Address*
              </label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="your@email.com"
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <p className="text-sm text-gray-500 mt-1">
                We&apos;ll send you the full pricing strategy report
              </p>
            </div>
            
            {error && (
              <div className="mb-6 bg-red-50 border-l-4 border-red-500 p-4">
                <p className="text-red-700">{error}</p>
              </div>
            )}
            
            <div className="flex justify-center">
              <button
                type="submit"
                disabled={isLoading}
                className={`px-6 py-3 text-white font-medium rounded-md ${
                  isLoading
                    ? 'bg-blue-400 cursor-not-allowed'
                    : 'bg-blue-600 hover:bg-blue-700'
                }`}
              >
                {isLoading ? (
                  <div className="flex items-center">
                    <div className="animate-spin mr-2 h-5 w-5 border-t-2 border-b-2 border-white rounded-full"></div>
                    Analyzing...
                  </div>
                ) : (
                  'Generate Pricing Strategy'
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </ProtectedRoute>
  );
} 