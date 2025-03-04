'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function PricingStrategyResultsPage() {
  const router = useRouter();
  const [strategy, setStrategy] = useState(null);
  const [loading, setLoading] = useState(true);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    
    // Retrieve strategy data from localStorage
    const storedStrategy = localStorage.getItem('pricingStrategy');
    
    if (storedStrategy) {
      try {
        setStrategy(JSON.parse(storedStrategy));
      } catch (error) {
        console.error('Error parsing strategy data:', error);
      }
    }
    
    setLoading(false);
  }, []);

  if (!mounted) {
    return <div className="min-h-screen flex items-center justify-center">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
    </div>;
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (!strategy) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-12 text-center">
        <h1 className="text-3xl font-bold mb-6">No Pricing Strategy Found</h1>
        <p className="text-lg mb-8">
          We couldn&apos;t find your pricing strategy. Please try creating a new one.
        </p>
        <Link
          href="/pricing-strategy"
          className="px-6 py-3 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700"
        >
          Create New Strategy
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Your Pricing Strategy</h1>
        <Link
          href="/pricing-strategy"
          className="px-4 py-2 text-blue-600 border border-blue-600 rounded-md hover:bg-blue-50"
        >
          Create New Strategy
        </Link>
      </div>
      
      <div className="bg-white shadow-md rounded-lg p-6 mb-8">
        <h2 className="text-xl font-semibold mb-4">
          Property: {strategy.propertyName || 'Your Property'}
        </h2>
        
        <div className="mb-8">
          <h3 className="font-medium text-lg mb-3 text-blue-700">Pricing Principles</h3>
          <div className="bg-blue-50 p-4 rounded-lg">
            <ul className="space-y-2">
              {strategy.pricingStrategy?.pricingPrinciples?.map((principle, index) => (
                <li key={index} className="flex items-start">
                  <span className="text-blue-500 mr-2">•</span>
                  <span>{principle}</span>
                </li>
              )) || (
                <li className="flex items-start">
                  <span className="text-blue-500 mr-2">•</span>
                  <span>Set your base price by researching similar properties in your area</span>
                </li>
              )}
            </ul>
          </div>
        </div>
        
        <div className="mb-8">
          <h3 className="font-medium text-lg mb-3 text-green-700">Seasonal Adjustments</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {strategy.pricingStrategy?.seasonalStrategy?.map((season, index) => (
              <div key={index} className="bg-green-50 p-4 rounded-lg">
                <h4 className="font-medium mb-1">{season.season}</h4>
                <p>{season.strategy}</p>
              </div>
            )) || (
              <>
                <div className="bg-green-50 p-4 rounded-lg">
                  <h4 className="font-medium mb-1">Peak Season</h4>
                  <p>Increase rates by 20-40%</p>
                </div>
                <div className="bg-green-50 p-4 rounded-lg">
                  <h4 className="font-medium mb-1">Off Season</h4>
                  <p>Reduce rates by 15-25%</p>
                </div>
              </>
            )}
          </div>
        </div>
        
        <div className="mb-8">
          <h3 className="font-medium text-lg mb-3 text-purple-700">Discount Strategies</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {strategy.pricingStrategy?.discountStrategies?.map((discount, index) => (
              <div key={index} className="bg-purple-50 p-4 rounded-lg">
                <h4 className="font-medium mb-1">{discount.type}</h4>
                <p>{discount.recommendation}</p>
              </div>
            )) || (
              <>
                <div className="bg-purple-50 p-4 rounded-lg">
                  <h4 className="font-medium mb-1">Length of Stay</h4>
                  <p>10-15% for weekly, 20-30% for monthly</p>
                </div>
                <div className="bg-purple-50 p-4 rounded-lg">
                  <h4 className="font-medium mb-1">Last-Minute</h4>
                  <p>10-15% for bookings within 3-7 days</p>
                </div>
              </>
            )}
          </div>
        </div>
        
        <div className="mb-8">
          <h3 className="font-medium text-lg mb-3 text-orange-700">Premium Charges</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {strategy.pricingStrategy?.premiumCharges?.map((premium, index) => (
              <div key={index} className="bg-orange-50 p-4 rounded-lg">
                <h4 className="font-medium mb-1">{premium.type}</h4>
                <p>{premium.recommendation}</p>
              </div>
            )) || (
              <>
                <div className="bg-orange-50 p-4 rounded-lg">
                  <h4 className="font-medium mb-1">Weekend</h4>
                  <p>10-20% for Friday and Saturday nights</p>
                </div>
                <div className="bg-orange-50 p-4 rounded-lg">
                  <h4 className="font-medium mb-1">Holiday</h4>
                  <p>25-40% for major holidays</p>
                </div>
              </>
            )}
          </div>
        </div>
        
        <div className="mb-8">
          <h3 className="font-medium text-lg mb-3 text-indigo-700">Competitive Positioning</h3>
          <div className="bg-indigo-50 p-4 rounded-lg">
            <ul className="space-y-2">
              <li className="flex items-start">
                <span className="text-indigo-500 mr-2">•</span>
                <span>{strategy.pricingStrategy?.competitivePositioning?.superhostAdvantage || "Work toward Superhost status for premium pricing"}</span>
              </li>
              <li className="flex items-start">
                <span className="text-indigo-500 mr-2">•</span>
                <span>{strategy.pricingStrategy?.competitivePositioning?.reviewStrategy || "Actively solicit positive reviews to build credibility"}</span>
              </li>
              <li className="flex items-start">
                <span className="text-indigo-500 mr-2">•</span>
                <span>{strategy.pricingStrategy?.competitivePositioning?.photographyTip || "Invest in professional photography to showcase value"}</span>
              </li>
              <li className="flex items-start">
                <span className="text-indigo-500 mr-2">•</span>
                <span>{strategy.pricingStrategy?.competitivePositioning?.amenityHighlights || "Emphasize high-value amenities in your listing"}</span>
              </li>
            </ul>
          </div>
        </div>
        
        <div>
          <h3 className="font-medium text-lg mb-3 text-gray-700">Recommended Tools</h3>
          <div className="bg-gray-50 p-4 rounded-lg">
            <p className="mb-2">Consider using these dynamic pricing tools to automate your pricing strategy:</p>
            <div className="flex flex-wrap gap-2">
              {strategy.pricingStrategy?.dynamicPricingTools?.map((tool, index) => (
                <span key={index} className="bg-gray-200 px-3 py-1 rounded-full text-gray-700">{tool}</span>
              )) || (
                <>
                  <span className="bg-gray-200 px-3 py-1 rounded-full text-gray-700">PriceLabs</span>
                  <span className="bg-gray-200 px-3 py-1 rounded-full text-gray-700">Beyond Pricing</span>
                  <span className="bg-gray-200 px-3 py-1 rounded-full text-gray-700">Wheelhouse</span>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
      
      <div className="bg-blue-50 border-l-4 border-blue-500 p-4">
        <h3 className="font-medium text-lg text-blue-800 mb-2">Implementation Tips</h3>
        <p className="mb-2">
          To maximize the effectiveness of this pricing strategy:
        </p>
        <ul className="list-disc pl-5 space-y-1">
          <li>Research your local market thoroughly before setting your base price</li>
          <li>Implement seasonal adjustments based on your location&apos;s tourism patterns</li>
          <li>Monitor your occupancy rate and adjust pricing accordingly</li>
          <li>Consider using a dynamic pricing tool to automate adjustments</li>
          <li>Review and update your pricing strategy quarterly</li>
        </ul>
      </div>
      
      <div className="mt-8 bg-gray-50 rounded-lg p-6">
        <h3 className="font-medium text-lg mb-3">Why This Strategy Works</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="border-l-2 border-green-500 pl-4">
            <h4 className="font-medium text-green-700">Market-Responsive</h4>
            <p className="text-sm text-gray-600">Adapts to seasonal demand and local events for optimal pricing.</p>
          </div>
          <div className="border-l-2 border-green-500 pl-4">
            <h4 className="font-medium text-green-700">Discount Structure</h4>
            <p className="text-sm text-gray-600">Strategic discounts increase occupancy without sacrificing revenue.</p>
          </div>
          <div className="border-l-2 border-green-500 pl-4">
            <h4 className="font-medium text-green-700">Premium Opportunities</h4>
            <p className="text-sm text-gray-600">Identifies key opportunities to charge premium rates.</p>
          </div>
          <div className="border-l-2 border-green-500 pl-4">
            <h4 className="font-medium text-green-700">Competitive Edge</h4>
            <p className="text-sm text-gray-600">Positions your property effectively against local competition.</p>
          </div>
        </div>
      </div>
    </div>
  );
} 