'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

interface PricingAnalysis {
  propertyName: string;
  currentPrice: number;
  suggestedPrice: number;
  marketAverage: number;
  priceRange: {
    min: number;
    max: number;
  };
  recommendations: string[];
  seasonalAdjustments: {
    season: string;
    adjustment: number;
  }[];
  competitiveAnalysis: {
    similarProperties: number;
    pricePosition: 'above' | 'below' | 'average';
    marketShare: number;
  };
}

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

  const handleSubmit = async (e) => {
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
      const response = await fetch('/api/generate-guide', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          url,
          email,
          address,
          selectedSections: ['pricing'],
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
    } catch (err) {
      console.error('Error generating pricing strategy:', err);
      setError(err.message || 'Failed to generate pricing strategy. Please try again.');
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
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-center mb-8">Optimize Your Airbnb Pricing Strategy</h1>
      
      <div className="bg-white shadow-md rounded-lg p-6 mb-8">
        <h2 className="text-xl font-semibold mb-4">How It Works</h2>
        <ol className="list-decimal pl-5 space-y-2">
          <li>Enter your Airbnb listing URL</li>
          <li>Provide your email address where we&apos;ll send updates</li>
          <li>Enter your property address</li>
          <li>Our AI will analyze your listing and generate an optimized pricing strategy</li>
        </ol>
      </div>
      
      {error && (
        <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-6">
          <p className="text-red-700">{error}</p>
        </div>
      )}
      
      <form onSubmit={handleSubmit} className="bg-white shadow-md rounded-lg p-6">
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
            required
          />
          <p className="text-sm text-gray-500 mt-1">
            We&apos;ll analyze your listing to generate an optimized pricing strategy
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
            required
          />
          <p className="text-sm text-gray-500 mt-1">
            We&apos;ll send you updates and the final pricing strategy to this email
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
            placeholder="City, State, Country"
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
          <p className="text-sm text-gray-500 mt-1">
            Format: City, State, Country (e.g., &quot;Miami, Florida, USA&quot;)
          </p>
        </div>
        
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
                Generating Pricing Strategy...
              </div>
            ) : (
              'Generate Pricing Strategy'
            )}
          </button>
        </div>
      </form>
      
      <div className="mt-10 bg-blue-50 rounded-lg p-6">
        <h2 className="text-xl font-semibold mb-4">Why Optimize Your Pricing?</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <h3 className="font-medium text-lg mb-2">Maximize Revenue</h3>
            <p>Dynamic pricing helps you capture the highest possible revenue while maintaining high occupancy rates.</p>
          </div>
          <div>
            <h3 className="font-medium text-lg mb-2">Stay Competitive</h3>
            <p>Keep your prices aligned with market trends and similar properties in your area.</p>
          </div>
          <div>
            <h3 className="font-medium text-lg mb-2">Seasonal Optimization</h3>
            <p>Automatically adjust prices based on peak seasons, local events, and market demand.</p>
          </div>
          <div>
            <h3 className="font-medium text-lg mb-2">Data-Driven Decisions</h3>
            <p>Make pricing decisions based on real market data and competitor analysis.</p>
          </div>
        </div>
      </div>
    </div>
  );
} 