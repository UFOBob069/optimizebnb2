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
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {strategy.pricingStrategy?.seasonalStrategy?.map((season, index) => (
              <div key={index} className="bg-green-50 p-4 rounded-lg">
                <div className="flex justify-between items-center mb-2">
                  <h4 className="font-medium">{season.season}</h4>
                  <span className={`px-2 py-1 rounded-full text-sm font-medium ${
                    season.adjustment > 0 
                      ? 'bg-green-100 text-green-800' 
                      : 'bg-red-100 text-red-800'
                  }`}>
                    {season.adjustment > 0 ? '+' : ''}{season.adjustment}%
                  </span>
                </div>
                <p className="text-sm text-gray-600 mb-1">{season.months}</p>
                <p className="text-sm text-gray-600">{season.reasoning}</p>
              </div>
            )) || (
              <>
                <div className="bg-green-50 p-4 rounded-lg">
                  <div className="flex justify-between items-center mb-2">
                    <h4 className="font-medium">High Season</h4>
                    <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-sm font-medium">+15%</span>
                  </div>
                  <p className="text-sm text-gray-600 mb-1">June-August</p>
                  <p className="text-sm text-gray-600">Summer months typically see higher demand for vacation rentals</p>
                </div>
                <div className="bg-green-50 p-4 rounded-lg">
                  <div className="flex justify-between items-center mb-2">
                    <h4 className="font-medium">Shoulder Season</h4>
                    <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-sm font-medium">+5%</span>
                  </div>
                  <p className="text-sm text-gray-600 mb-1">April-May, September-October</p>
                  <p className="text-sm text-gray-600">Moderate demand with pleasant weather conditions</p>
                </div>
                <div className="bg-green-50 p-4 rounded-lg">
                  <div className="flex justify-between items-center mb-2">
                    <h4 className="font-medium">Low Season</h4>
                    <span className="bg-red-100 text-red-800 px-2 py-1 rounded-full text-sm font-medium">-10%</span>
                  </div>
                  <p className="text-sm text-gray-600 mb-1">November-March</p>
                  <p className="text-sm text-gray-600">Lower demand during colder months requires competitive pricing</p>
                </div>
              </>
            )}
          </div>
        </div>
        
        <div className="mb-8">
          <h3 className="font-medium text-lg mb-3 text-purple-700">Discount Strategies</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {strategy.pricingStrategy?.discountStrategies?.map((discount, index) => (
              <div key={index} className="bg-purple-50 p-4 rounded-lg">
                <div className="flex justify-between items-center mb-2">
                  <h4 className="font-medium">{discount.stayLength}</h4>
                  <span className="bg-purple-100 text-purple-800 px-2 py-1 rounded-full text-sm font-medium">
                    {discount.discountPercentage}% off
                  </span>
                </div>
                <p className="text-sm text-gray-600">{discount.reasoning}</p>
              </div>
            )) || (
              <>
                <div className="bg-purple-50 p-4 rounded-lg">
                  <div className="flex justify-between items-center mb-2">
                    <h4 className="font-medium">Weekly (7+ nights)</h4>
                    <span className="bg-purple-100 text-purple-800 px-2 py-1 rounded-full text-sm font-medium">10% off</span>
                  </div>
                  <p className="text-sm text-gray-600">Encourages longer bookings and reduces turnover costs</p>
                </div>
                <div className="bg-purple-50 p-4 rounded-lg">
                  <div className="flex justify-between items-center mb-2">
                    <h4 className="font-medium">Monthly (28+ nights)</h4>
                    <span className="bg-purple-100 text-purple-800 px-2 py-1 rounded-full text-sm font-medium">25% off</span>
                  </div>
                  <p className="text-sm text-gray-600">Guarantees occupancy and eliminates vacancy risks</p>
                </div>
                <div className="bg-purple-50 p-4 rounded-lg">
                  <div className="flex justify-between items-center mb-2">
                    <h4 className="font-medium">Last-minute (2-3 days before)</h4>
                    <span className="bg-purple-100 text-purple-800 px-2 py-1 rounded-full text-sm font-medium">15% off</span>
                  </div>
                  <p className="text-sm text-gray-600">Fills potential vacancies when booking window is closing</p>
                </div>
              </>
            )}
          </div>
        </div>
        
        <div className="mb-8">
          <h3 className="font-medium text-lg mb-3 text-orange-700">Premium Charges</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {strategy.pricingStrategy?.premiumCharges?.map((premium, index) => (
              <div key={index} className="bg-orange-50 p-4 rounded-lg">
                <div className="flex justify-between items-center mb-2">
                  <h4 className="font-medium">{premium.event}</h4>
                  <span className="bg-orange-100 text-orange-800 px-2 py-1 rounded-full text-sm font-medium">
                    +{premium.premiumPercentage}%
                  </span>
                </div>
                <p className="text-sm text-gray-600">{premium.reasoning}</p>
              </div>
            )) || (
              <>
                <div className="bg-orange-50 p-4 rounded-lg">
                  <div className="flex justify-between items-center mb-2">
                    <h4 className="font-medium">Holidays</h4>
                    <span className="bg-orange-100 text-orange-800 px-2 py-1 rounded-full text-sm font-medium">+25%</span>
                  </div>
                  <p className="text-sm text-gray-600">High demand periods with limited supply</p>
                </div>
                <div className="bg-orange-50 p-4 rounded-lg">
                  <div className="flex justify-between items-center mb-2">
                    <h4 className="font-medium">Local Events</h4>
                    <span className="bg-orange-100 text-orange-800 px-2 py-1 rounded-full text-sm font-medium">+20%</span>
                  </div>
                  <p className="text-sm text-gray-600">Conferences, festivals, and sporting events drive demand</p>
                </div>
                <div className="bg-orange-50 p-4 rounded-lg">
                  <div className="flex justify-between items-center mb-2">
                    <h4 className="font-medium">Peak Weekends</h4>
                    <span className="bg-orange-100 text-orange-800 px-2 py-1 rounded-full text-sm font-medium">+15%</span>
                  </div>
                  <p className="text-sm text-gray-600">Friday and Saturday nights during high season</p>
                </div>
              </>
            )}
          </div>
        </div>
        
        <div className="mb-8">
          <h3 className="font-medium text-lg mb-3 text-blue-700">Competitive Positioning</h3>
          <div className="bg-blue-50 p-4 rounded-lg">
            <ul className="space-y-3">
              <li className="flex items-start">
                <span className="text-blue-500 mr-2">•</span>
                <span>{strategy.pricingStrategy?.competitivePositioning?.superhostAdvantage || "Work toward Superhost status for premium pricing"}</span>
              </li>
              <li className="flex items-start">
                <span className="text-blue-500 mr-2">•</span>
                <span>{strategy.pricingStrategy?.competitivePositioning?.reviewStrategy || "Actively solicit positive reviews to build credibility"}</span>
              </li>
              <li className="flex items-start">
                <span className="text-blue-500 mr-2">•</span>
                <span>{strategy.pricingStrategy?.competitivePositioning?.photographyTip || "Invest in professional photography to showcase value"}</span>
              </li>
              <li className="flex items-start">
                <span className="text-blue-500 mr-2">•</span>
                <span>{strategy.pricingStrategy?.competitivePositioning?.amenityHighlights || "Emphasize high-value amenities in your listing"}</span>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="mb-8">
          <h3 className="font-medium text-lg mb-3 text-red-700">Promotional Recommendations</h3>
          <div className="bg-red-50 p-4 rounded-lg">
            <ul className="space-y-3">
              {strategy.pricingStrategy?.promotionalRecommendations?.map((promo, index) => (
                <li key={index} className="flex items-start">
                  <span className="text-red-500 mr-2">•</span>
                  <span>{promo}</span>
                </li>
              )) || (
                <>
                  <li className="flex items-start">
                    <span className="text-red-500 mr-2">•</span>
                    <span>Offer a 'Book 2 nights, get 1 free' promotion during low season</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-red-500 mr-2">•</span>
                    <span>Create special packages that include local experiences or amenities</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-red-500 mr-2">•</span>
                    <span>Implement a referral program offering discounts for guests who refer friends</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-red-500 mr-2">•</span>
                    <span>Run limited-time flash sales for specific dates with low bookings</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-red-500 mr-2">•</span>
                    <span>Partner with local businesses to offer exclusive discounts to your guests</span>
                  </li>
                </>
              )}
            </ul>
          </div>
        </div>
        
        <div>
          <h3 className="font-medium text-lg mb-3 text-gray-700">Recommended Tools</h3>
          <div className="bg-gray-50 p-4 rounded-lg">
            <p className="mb-2">Consider using these dynamic pricing tools to automate your pricing strategy:</p>
            <div className="flex flex-wrap gap-2">
              {strategy.pricingStrategy?.dynamicPricingTools?.map((tool, index) => (
                <a 
                  key={index} 
                  href={tool.website || '#'} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="bg-gray-200 px-3 py-1 rounded-full text-gray-700 hover:bg-gray-300 flex items-center"
                >
                  <span>{tool.name}</span>
                  {tool.website && <span className="ml-1 text-xs">↗</span>}
                </a>
              )) || (
                <>
                  <span className="bg-gray-200 px-3 py-1 rounded-full text-gray-700">PriceLabs</span>
                  <span className="bg-gray-200 px-3 py-1 rounded-full text-gray-700">Beyond Pricing</span>
                  <span className="bg-gray-200 px-3 py-1 rounded-full text-gray-700">Wheelhouse</span>
                </>
              )}
            </div>
            
            {strategy.pricingStrategy?.dynamicPricingTools?.length > 0 && (
              <div className="mt-4 space-y-3">
                {strategy.pricingStrategy.dynamicPricingTools.map((tool, index) => (
                  <div key={index} className="border-l-2 border-blue-300 pl-3">
                    <h4 className="font-medium">{tool.name}</h4>
                    <p className="text-sm text-gray-600">{tool.description}</p>
                    {tool.website && (
                      <a 
                        href={tool.website} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-xs text-blue-600 hover:underline"
                      >
                        Visit website ↗
                      </a>
                    )}
                  </div>
                ))}
              </div>
            )}
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