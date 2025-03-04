"use client";

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function AmenityRecommendationsPage() {
  const router = useRouter();
  const [url, setUrl] = useState('');
  const [email, setEmail] = useState('');
  const [propertyType, setPropertyType] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [mounted, setMounted] = useState(false);
  const [scrapingStatus, setScrapingStatus] = useState('');

  // Only run client-side code after component has mounted
  useEffect(() => {
    setMounted(true);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    // Validate inputs
    if (!url && !propertyType) {
      setError('Please enter your Airbnb listing URL or select a property type');
      return;
    }
    
    if (url && !url.includes('airbnb.com')) {
      setError('Please enter a valid Airbnb URL');
      return;
    }
    
    if (!email) {
      setError('Please enter your email address');
      return;
    }
    
    setIsLoading(true);
    setScrapingStatus(url ? 'Scraping your Airbnb listing...' : 'Analyzing your property type...');
    
    try {
      const response = await fetch('/api/amenity-recommendations', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          url,
          email,
          propertyType: propertyType || undefined,
        }),
      });
      
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.message || 'Failed to generate amenity recommendations');
      }
      
      // Store the recommendations data in localStorage for the results page
      if (mounted) {
        localStorage.setItem('amenityRecommendations', JSON.stringify(data.recommendations));
        router.push('/amenity-recommendations/results');
      }
    } catch (err: unknown) {
      console.error('Error generating amenity recommendations:', err);
      setError(err instanceof Error ? err.message : 'Failed to generate amenity recommendations. Please try again.');
    } finally {
      setIsLoading(false);
      setScrapingStatus('');
    }
  };

  if (!mounted) {
    return <div className="min-h-screen flex items-center justify-center">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
    </div>;
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-center mb-8">Get Premium Amenity Recommendations</h1>
      
      <div className="bg-white shadow-md rounded-lg p-6 mb-8">
        <h2 className="text-xl font-semibold mb-4">How It Works</h2>
        <ol className="list-decimal pl-5 space-y-2">
          <li>Enter your Airbnb listing URL or select your property type</li>
          <li>Our AI will analyze your property and location</li>
          <li>Receive personalized amenity recommendations that can increase your bookings and revenue</li>
          <li>Get detailed explanations of why each amenity is recommended for your specific property</li>
          <li>Learn which amenities have the highest ROI for your property type and location</li>
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
            Airbnb Listing URL (Optional)
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
            We&apos;ll scrape your listing to provide more accurate recommendations
          </p>
        </div>
        
        <div className="mb-6">
          <label htmlFor="propertyType" className="block text-gray-700 font-medium mb-2">
            Property Type (If URL not provided)
          </label>
          <select
            id="propertyType"
            value={propertyType}
            onChange={(e) => setPropertyType(e.target.value)}
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            disabled={!!url}
          >
            <option value="">Select property type</option>
            <option value="apartment">Apartment</option>
            <option value="house">House</option>
            <option value="condo">Condominium</option>
            <option value="cabin">Cabin</option>
            <option value="villa">Villa</option>
            <option value="beach_house">Beach House</option>
            <option value="mountain_retreat">Mountain Retreat</option>
            <option value="urban_loft">Urban Loft</option>
            <option value="guest_suite">Guest Suite</option>
            <option value="tiny_home">Tiny Home</option>
          </select>
          <p className="text-sm text-gray-500 mt-1">
            If you don&apos;t provide a URL, select your property type for general recommendations
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
            We&apos;ll send you updates and the final recommendations to this email
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
                {scrapingStatus || 'Generating Recommendations...'}
              </div>
            ) : (
              'Get Amenity Recommendations'
            )}
          </button>
        </div>
      </form>
      
      <div className="mt-10 bg-blue-50 rounded-lg p-6">
        <h2 className="text-xl font-semibold mb-4">Why Amenities Matter</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="flex">
            <div className="flex-shrink-0 h-12 w-12 bg-blue-100 rounded-full flex items-center justify-center">
              <span className="text-blue-600 text-xl">💰</span>
            </div>
            <div className="ml-4">
              <h3 className="font-medium text-lg mb-2">Higher Nightly Rates</h3>
              <p className="text-gray-600">Properties with premium amenities command 15-25% higher nightly rates than similar properties without them.</p>
            </div>
          </div>
          
          <div className="flex">
            <div className="flex-shrink-0 h-12 w-12 bg-green-100 rounded-full flex items-center justify-center">
              <span className="text-green-600 text-xl">📊</span>
            </div>
            <div className="ml-4">
              <h3 className="font-medium text-lg mb-2">Increased Occupancy</h3>
              <p className="text-gray-600">Strategic amenities can increase your occupancy rate by up to 20%, especially during off-peak seasons.</p>
            </div>
          </div>
          
          <div className="flex">
            <div className="flex-shrink-0 h-12 w-12 bg-purple-100 rounded-full flex items-center justify-center">
              <span className="text-purple-600 text-xl">⭐</span>
            </div>
            <div className="ml-4">
              <h3 className="font-medium text-lg mb-2">Better Reviews</h3>
              <p className="text-gray-600">Properties with thoughtful amenities receive higher ratings and more positive reviews from guests.</p>
            </div>
          </div>
          
          <div className="flex">
            <div className="flex-shrink-0 h-12 w-12 bg-yellow-100 rounded-full flex items-center justify-center">
              <span className="text-yellow-600 text-xl">🔍</span>
            </div>
            <div className="ml-4">
              <h3 className="font-medium text-lg mb-2">Search Visibility</h3>
              <p className="text-gray-600">Airbnb&apos;s algorithm favors listings with popular amenities, increasing your visibility in search results.</p>
            </div>
          </div>
          
          <div className="flex">
            <div className="flex-shrink-0 h-12 w-12 bg-red-100 rounded-full flex items-center justify-center">
              <span className="text-red-600 text-xl">🏆</span>
            </div>
            <div className="ml-4">
              <h3 className="font-medium text-lg mb-2">Competitive Edge</h3>
              <p className="text-gray-600">Stand out from similar properties in your area with unique amenities that attract more bookings.</p>
            </div>
          </div>
          
          <div className="flex">
            <div className="flex-shrink-0 h-12 w-12 bg-indigo-100 rounded-full flex items-center justify-center">
              <span className="text-indigo-600 text-xl">📱</span>
            </div>
            <div className="ml-4">
              <h3 className="font-medium text-lg mb-2">Guest Experience</h3>
              <p className="text-gray-600">Thoughtful amenities create memorable stays that lead to repeat bookings and referrals.</p>
            </div>
          </div>
        </div>
      </div>
      
      <div className="mt-8 bg-gray-50 p-6 rounded-lg">
        <h2 className="text-xl font-semibold mb-4">Our Recommendation Process</h2>
        <div className="space-y-4">
          <div className="flex items-start">
            <div className="flex-shrink-0 h-8 w-8 bg-blue-500 rounded-full flex items-center justify-center text-white font-bold">1</div>
            <div className="ml-4">
              <h3 className="font-medium">Location Analysis</h3>
              <p className="text-gray-600">We analyze your property&apos;s location to identify climate-specific, seasonal, and local amenities that guests value.</p>
            </div>
          </div>
          
          <div className="flex items-start">
            <div className="flex-shrink-0 h-8 w-8 bg-blue-500 rounded-full flex items-center justify-center text-white font-bold">2</div>
            <div className="ml-4">
              <h3 className="font-medium">Property Type Assessment</h3>
              <p className="text-gray-600">Different property types benefit from different amenities. We tailor recommendations to your specific property.</p>
            </div>
          </div>
          
          <div className="flex items-start">
            <div className="flex-shrink-0 h-8 w-8 bg-blue-500 rounded-full flex items-center justify-center text-white font-bold">3</div>
            <div className="ml-4">
              <h3 className="font-medium">Competitor Analysis</h3>
              <p className="text-gray-600">We examine top-performing properties in your area to identify amenity gaps you can fill to stand out.</p>
            </div>
          </div>
          
          <div className="flex items-start">
            <div className="flex-shrink-0 h-8 w-8 bg-blue-500 rounded-full flex items-center justify-center text-white font-bold">4</div>
            <div className="ml-4">
              <h3 className="font-medium">ROI Calculation</h3>
              <p className="text-gray-600">We prioritize amenities with the highest return on investment for your specific property and target guest demographic.</p>
            </div>
          </div>
          
          <div className="flex items-start">
            <div className="flex-shrink-0 h-8 w-8 bg-blue-500 rounded-full flex items-center justify-center text-white font-bold">5</div>
            <div className="ml-4">
              <h3 className="font-medium">Trend Forecasting</h3>
              <p className="text-gray-600">We identify emerging amenity trends that can give your property a competitive advantage in the coming seasons.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 