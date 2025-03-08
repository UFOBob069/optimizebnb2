"use client";

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import ProtectedRoute from '../components/ProtectedRoute';

export default function SEOOptimizationPage() {
  const router = useRouter();
  const [url, setUrl] = useState('');
  const [email, setEmail] = useState('');
  const [selectedSections, setSelectedSections] = useState([
    'title',
    'description',
    'amenities',
    'house_rules',
    'local_area',
    'host_bio'
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [mounted, setMounted] = useState(false);
  const [scrapingStatus, setScrapingStatus] = useState('');

  // Only run client-side code after component has mounted
  useEffect(() => {
    setMounted(true);
  }, []);

  const handleSectionToggle = (section: string) => {
    if (selectedSections.includes(section)) {
      setSelectedSections(selectedSections.filter(s => s !== section));
    } else {
      setSelectedSections([...selectedSections, section]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
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
    
    if (selectedSections.length === 0) {
      setError('Please select at least one section to optimize');
      return;
    }
    
    setIsLoading(true);
    setScrapingStatus('Analyzing your Airbnb listing...');
    
    try {
      const response = await fetch('/api/seo-optimize', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          url,
          email,
          selectedSections,
        }),
      });
      
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.message || 'Failed to generate optimized content');
      }
      
      // Store the guide data in localStorage for the results page
      if (mounted) {
        localStorage.setItem('generatedGuide', JSON.stringify(data.guide));
        router.push('/seo-optimization/results');
      }
    } catch (err: any) {
      console.error('Error generating optimized content:', err);
      setError(err.message || 'Failed to generate optimized content. Please try again.');
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
    <ProtectedRoute>
      <div className="max-w-4xl mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-center mb-8">Optimize Your Airbnb Listing SEO</h1>
        
        <div className="bg-white shadow-md rounded-lg p-6 mb-8">
          <h2 className="text-xl font-semibold mb-4">How It Works</h2>
          <ol className="list-decimal pl-5 space-y-2">
            <li>Enter your Airbnb listing URL</li>
            <li>Our AI will automatically scrape your listing details</li>
            <li>Select which sections you want to optimize</li>
            <li>We&apos;ll analyze your content against Airbnb&apos;s search algorithm</li>
            <li>Receive SEO-optimized content tailored to your specific property</li>
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
              We&apos;ll scrape your listing to generate SEO-optimized content
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
              We&apos;ll send you updates and the final optimized content to this email
            </p>
          </div>
          
          <div className="mb-6">
            <label className="block text-gray-700 font-medium mb-2">
              Sections to Optimize*
            </label>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="title"
                  checked={selectedSections.includes('title')}
                  onChange={() => handleSectionToggle('title')}
                  className="h-5 w-5 text-blue-600"
                />
                <label htmlFor="title" className="ml-2 text-gray-700">
                  Title & Headline
                </label>
              </div>
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="description"
                  checked={selectedSections.includes('description')}
                  onChange={() => handleSectionToggle('description')}
                  className="h-5 w-5 text-blue-600"
                />
                <label htmlFor="description" className="ml-2 text-gray-700">
                  Property Description
                </label>
              </div>
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="amenities"
                  checked={selectedSections.includes('amenities')}
                  onChange={() => handleSectionToggle('amenities')}
                  className="h-5 w-5 text-blue-600"
                />
                <label htmlFor="amenities" className="ml-2 text-gray-700">
                  Amenities Highlights
                </label>
              </div>
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="house_rules"
                  checked={selectedSections.includes('house_rules')}
                  onChange={() => handleSectionToggle('house_rules')}
                  className="h-5 w-5 text-blue-600"
                />
                <label htmlFor="house_rules" className="ml-2 text-gray-700">
                  House Rules
                </label>
              </div>
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="local_area"
                  checked={selectedSections.includes('local_area')}
                  onChange={() => handleSectionToggle('local_area')}
                  className="h-5 w-5 text-blue-600"
                />
                <label htmlFor="local_area" className="ml-2 text-gray-700">
                  Local Area Guide
                </label>
              </div>
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="host_bio"
                  checked={selectedSections.includes('host_bio')}
                  onChange={() => handleSectionToggle('host_bio')}
                  className="h-5 w-5 text-blue-600"
                />
                <label htmlFor="host_bio" className="ml-2 text-gray-700">
                  Host Bio
                </label>
              </div>
            </div>
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
                  {scrapingStatus || 'Generating Optimized Content...'}
                </div>
              ) : (
                'Generate SEO-Optimized Content'
              )}
            </button>
          </div>
        </form>
        
        <div className="mt-10 bg-blue-50 rounded-lg p-6">
          <h2 className="text-xl font-semibold mb-4">Airbnb SEO Optimization Benefits</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex">
              <div className="flex-shrink-0 h-12 w-12 bg-blue-100 rounded-full flex items-center justify-center">
                <span className="text-blue-600 text-xl">📈</span>
              </div>
              <div className="ml-4">
                <h3 className="font-medium text-lg mb-2">Higher Search Rankings</h3>
                <p className="text-gray-600">Properly optimized listings appear higher in Airbnb search results, increasing visibility to potential guests.</p>
              </div>
            </div>
            
            <div className="flex">
              <div className="flex-shrink-0 h-12 w-12 bg-green-100 rounded-full flex items-center justify-center">
                <span className="text-green-600 text-xl">🔍</span>
              </div>
              <div className="ml-4">
                <h3 className="font-medium text-lg mb-2">Keyword Optimization</h3>
                <p className="text-gray-600">We analyze top-performing Airbnb listings to identify high-converting keywords for your property type and location.</p>
              </div>
            </div>
            
            <div className="flex">
              <div className="flex-shrink-0 h-12 w-12 bg-purple-100 rounded-full flex items-center justify-center">
                <span className="text-purple-600 text-xl">💰</span>
              </div>
              <div className="ml-4">
                <h3 className="font-medium text-lg mb-2">Increased Bookings</h3>
                <p className="text-gray-600">Listings with SEO-optimized titles and descriptions convert browsers into bookers at a 25% higher rate.</p>
              </div>
            </div>
            
            <div className="flex">
              <div className="flex-shrink-0 h-12 w-12 bg-yellow-100 rounded-full flex items-center justify-center">
                <span className="text-yellow-600 text-xl">⭐</span>
              </div>
              <div className="ml-4">
                <h3 className="font-medium text-lg mb-2">Better Guest Experience</h3>
                <p className="text-gray-600">Clear, detailed descriptions set proper expectations and lead to more satisfied guests and better reviews.</p>
              </div>
            </div>
            
            <div className="flex">
              <div className="flex-shrink-0 h-12 w-12 bg-red-100 rounded-full flex items-center justify-center">
                <span className="text-red-600 text-xl">🏆</span>
              </div>
              <div className="ml-4">
                <h3 className="font-medium text-lg mb-2">Competitive Edge</h3>
                <p className="text-gray-600">Professional, keyword-rich content helps your property stand out in a crowded marketplace.</p>
              </div>
            </div>
            
            <div className="flex">
              <div className="flex-shrink-0 h-12 w-12 bg-indigo-100 rounded-full flex items-center justify-center">
                <span className="text-indigo-600 text-xl">🤖</span>
              </div>
              <div className="ml-4">
                <h3 className="font-medium text-lg mb-2">AI-Powered Analysis</h3>
                <p className="text-gray-600">Our advanced AI analyzes your specific property features and creates tailored content that highlights your unique selling points.</p>
              </div>
            </div>
          </div>
        </div>
        
        <div className="mt-8 bg-gray-50 p-6 rounded-lg">
          <h2 className="text-xl font-semibold mb-4">How Our SEO Optimization Works</h2>
          <div className="space-y-4">
            <div className="flex items-start">
              <div className="flex-shrink-0 h-8 w-8 bg-blue-500 rounded-full flex items-center justify-center text-white font-bold">1</div>
              <div className="ml-4">
                <h3 className="font-medium">Listing Analysis</h3>
                <p className="text-gray-600">We scrape your current Airbnb listing to understand your property&apos;s unique features and selling points.</p>
              </div>
            </div>
            
            <div className="flex items-start">
              <div className="flex-shrink-0 h-8 w-8 bg-blue-500 rounded-full flex items-center justify-center text-white font-bold">2</div>
              <div className="ml-4">
                <h3 className="font-medium">Keyword Research</h3>
                <p className="text-gray-600">Our AI identifies high-performing keywords for your property type, location, and target audience.</p>
              </div>
            </div>
            
            <div className="flex items-start">
              <div className="flex-shrink-0 h-8 w-8 bg-blue-500 rounded-full flex items-center justify-center text-white font-bold">3</div>
              <div className="ml-4">
                <h3 className="font-medium">Competitor Analysis</h3>
                <p className="text-gray-600">We analyze top-performing listings in your area to identify successful patterns and strategies.</p>
              </div>
            </div>
            
            <div className="flex items-start">
              <div className="flex-shrink-0 h-8 w-8 bg-blue-500 rounded-full flex items-center justify-center text-white font-bold">4</div>
              <div className="ml-4">
                <h3 className="font-medium">Content Generation</h3>
                <p className="text-gray-600">Our AI creates optimized content that highlights your property&apos;s unique features while incorporating strategic keywords.</p>
              </div>
            </div>
            
            <div className="flex items-start">
              <div className="flex-shrink-0 h-8 w-8 bg-blue-500 rounded-full flex items-center justify-center text-white font-bold">5</div>
              <div className="ml-4">
                <h3 className="font-medium">Readability Optimization</h3>
                <p className="text-gray-600">We ensure your content is not only SEO-friendly but also engaging and easy to read for potential guests.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </ProtectedRoute>
  );
} 