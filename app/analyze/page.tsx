"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

interface AnalysisResult {
  pros: string[];
  cons: string[];
  recommendations: string[];
}

export default function AnalyzePage() {
  const [url, setUrl] = useState("");
  const [analysisType, setAnalysisType] = useState<string>("comprehensive");
  const [result, setResult] = useState<AnalysisResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setResult(null);

    try {
      const res = await fetch("/api/analyze", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url, analysisType }),
      });
      
      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.error || "Failed to analyze listing");
      }
      
      const data = await res.json();
      
      // If we're getting raw response for debugging
      if (data.rawResponse) {
        // Parse the raw response into our expected format
        const parsedResult = parseRawResponse(data.rawResponse);
        setResult(parsedResult);
      } else {
        // Otherwise use the structured response
        setResult(data);
      }
    } catch (err) {
      console.error("Error analyzing listing:", err);
      setError(err instanceof Error ? err.message : "An unknown error occurred");
    } finally {
      setLoading(false);
    }
  };

  // Helper function to parse raw OpenAI response
  const parseRawResponse = (text: string): AnalysisResult => {
    const pros = text.match(/Pros:[\s\S]*?(?=Cons:)/)?.[0]
      .split('\n')
      .filter(line => line.trim().startsWith('-'))
      .map(line => line.replace(/^-\s*/, '').trim()) || [];
    
    const cons = text.match(/Cons:[\s\S]*?(?=Recommendations:)/)?.[0]
      .split('\n')
      .filter(line => line.trim().startsWith('-'))
      .map(line => line.replace(/^-\s*/, '').trim()) || [];
    
    const recommendations = text.match(/Recommendations:[\s\S]*/)?.[0]
      .split('\n')
      .filter(line => line.trim().startsWith('-'))
      .map(line => line.replace(/^-\s*/, '').trim()) || [];
    
    return { pros, cons, recommendations };
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <Link href="/" className="inline-flex items-center text-blue-600 hover:text-blue-800 mb-8">
          <ArrowLeft size={16} className="mr-2" /> Back to Home
        </Link>
        
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          <div className="p-6 md:p-8 border-b border-gray-200">
            <h1 className="text-2xl md:text-3xl font-bold text-gray-900">Analyze Your Airbnb Listing</h1>
            <p className="mt-2 text-gray-600">
              Get AI-powered insights to improve your listing and boost your bookings.
            </p>
          </div>
          
          {/* Enhanced CTA Section */}
          <div className="p-6 md:p-8 bg-blue-50 border-b border-gray-200">
            <h2 className="text-xl font-semibold text-blue-800 mb-3">Why Analyze Your Listing?</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex items-start">
                <div className="flex-shrink-0 h-6 w-6 text-blue-600 mt-0.5">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <div className="ml-3">
                  <p className="text-gray-700 font-medium">Increase Bookings by 32%</p>
                  <p className="text-gray-600 text-sm">Hosts who optimize their listings see an average 32% increase in bookings</p>
                </div>
              </div>
              <div className="flex items-start">
                <div className="flex-shrink-0 h-6 w-6 text-blue-600 mt-0.5">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <div className="ml-3">
                  <p className="text-gray-700 font-medium">Improve Guest Ratings</p>
                  <p className="text-gray-600 text-sm">Identify and fix issues that could be affecting your guest experience and ratings</p>
                </div>
              </div>
              <div className="flex items-start">
                <div className="flex-shrink-0 h-6 w-6 text-blue-600 mt-0.5">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <div className="ml-3">
                  <p className="text-gray-700 font-medium">Stand Out From Competition</p>
                  <p className="text-gray-600 text-sm">Get expert recommendations to make your listing more attractive than competitors</p>
                </div>
              </div>
              <div className="flex items-start">
                <div className="flex-shrink-0 h-6 w-6 text-blue-600 mt-0.5">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <div className="ml-3">
                  <p className="text-gray-700 font-medium">Maximize Your Revenue</p>
                  <p className="text-gray-600 text-sm">Discover opportunities to increase your nightly rate while maintaining high occupancy</p>
                </div>
              </div>
            </div>
            <div className="mt-4 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
              <p className="text-yellow-800 font-medium flex items-center">
                <span className="mr-2">⚡</span>
                <span>Limited Time: Get a free comprehensive analysis of your listing today!</span>
              </p>
            </div>
          </div>
          
          <div className="p-6 md:p-8">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="url" className="block text-sm font-medium text-gray-700 mb-1">
                  Airbnb Listing URL
                </label>
                <input
                  id="url"
                  type="url"
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                  placeholder="https://www.airbnb.com/rooms/12345678"
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  required
                />
              </div>
              
              {/* Hidden input for analysis type */}
              <input type="hidden" name="analysisType" value="comprehensive" />
              
              <div>
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-4 px-6 rounded-lg disabled:bg-blue-400 disabled:cursor-not-allowed transition-colors text-lg"
                >
                  {loading ? "Analyzing Your Listing..." : "Get Your Free Analysis Now →"}
                </button>
                <p className="text-center text-gray-500 text-sm mt-2">
                  Takes less than 60 seconds • No credit card required
                </p>
              </div>
            </form>
          </div>
        </div>
        
        {error && (
          <div className="mt-8 p-4 bg-red-50 border border-red-200 rounded-lg text-red-700">
            <p className="font-medium">Error</p>
            <p>{error}</p>
          </div>
        )}
        
        {result && (
          <div className="mt-8 bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
            <div className="p-6 md:p-8 border-b border-gray-200">
              <h2 className="text-2xl font-bold text-gray-900">Analysis Results</h2>
            </div>
            
            <div className="p-6 md:p-8 space-y-8">
              {/* Pros Section */}
              <div>
                <h3 className="text-xl font-semibold text-green-700 mb-4">Pros</h3>
                <ul className="space-y-3">
                  {result.pros.map((pro, index) => (
                    <li key={index} className="flex items-start">
                      <span className="text-green-500 mr-2">✓</span>
                      <span>{pro}</span>
                    </li>
                  ))}
                </ul>
              </div>
              
              {/* Cons Section */}
              <div>
                <h3 className="text-xl font-semibold text-red-700 mb-4">Areas for Improvement</h3>
                <ul className="space-y-3">
                  {result.cons.map((con, index) => (
                    <li key={index} className="flex items-start">
                      <span className="text-red-500 mr-2">✗</span>
                      <span>{con}</span>
                    </li>
                  ))}
                </ul>
              </div>
              
              {/* Recommendations Section */}
              <div>
                <h3 className="text-xl font-semibold text-blue-700 mb-4">Recommendations</h3>
                <ul className="space-y-3">
                  {result.recommendations.map((rec, index) => (
                    <li key={index} className="flex items-start">
                      <span className="text-blue-500 mr-2">→</span>
                      <span>{rec}</span>
                    </li>
                  ))}
                </ul>
              </div>
              
              <div className="pt-6 border-t border-gray-200">
                <h3 className="text-lg font-semibold mb-4">What's Next?</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {/* Welcome Guide */}
                  <div className="bg-white border border-gray-200 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                    <div className="p-4">
                      <div className="text-3xl mb-2">📍</div>
                      <h4 className="font-semibold text-gray-900 mb-1">Custom Welcome Guide</h4>
                      <p className="text-gray-600 text-sm mb-3">Create a personalized welcome guide based on your location. Highlight local attractions, emergency services, and house rules.</p>
                      <Link 
                        href="/welcome-guide" 
                        className="text-blue-600 hover:text-blue-800 font-medium text-sm flex items-center"
                      >
                        Create Guide <span className="ml-1">→</span>
                      </Link>
                    </div>
                  </div>
                  
                  {/* Photo Analysis */}
                  <div className="bg-white border border-gray-200 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                    <div className="p-4">
                      <div className="text-3xl mb-2">📸</div>
                      <h4 className="font-semibold text-gray-900 mb-1">Photo Analysis</h4>
                      <p className="text-gray-600 text-sm mb-3">Get professional feedback on your listing photos. Learn how to improve image quality, staging, and appeal to potential guests.</p>
                      <Link 
                        href="/photo-analysis" 
                        className="text-blue-600 hover:text-blue-800 font-medium text-sm flex items-center"
                      >
                        Analyze Photos <span className="ml-1">→</span>
                      </Link>
                    </div>
                  </div>
                  
                  {/* SEO Optimization */}
                  <div className="bg-white border border-gray-200 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                    <div className="p-4">
                      <div className="text-3xl mb-2">🔍</div>
                      <h4 className="font-semibold text-gray-900 mb-1">SEO Optimization</h4>
                      <p className="text-gray-600 text-sm mb-3">Optimize your title and description to rank higher in search results and attract more bookings.</p>
                      <Link 
                        href="/seo-optimization" 
                        className="text-blue-600 hover:text-blue-800 font-medium text-sm flex items-center"
                      >
                        Optimize SEO <span className="ml-1">→</span>
                      </Link>
                    </div>
                  </div>
                  
                  {/* Review Analysis */}
                  <div className="bg-white border border-gray-200 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                    <div className="p-4">
                      <div className="text-3xl mb-2">⭐</div>
                      <h4 className="font-semibold text-gray-900 mb-1">Review Analysis</h4>
                      <p className="text-gray-600 text-sm mb-3">Gain valuable insights from your guest reviews. Identify patterns, sentiment trends, and areas for improvement to enhance your listing.</p>
                      <Link 
                        href="/review-analysis" 
                        className="text-blue-600 hover:text-blue-800 font-medium text-sm flex items-center"
                      >
                        Analyze Reviews <span className="ml-1">→</span>
                      </Link>
                    </div>
                  </div>
                  
                  {/* Pricing Strategy */}
                  <div className="bg-white border border-gray-200 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                    <div className="p-4">
                      <div className="text-3xl mb-2">💰</div>
                      <h4 className="font-semibold text-gray-900 mb-1">Pricing Strategy</h4>
                      <p className="text-gray-600 text-sm mb-3">Get data-driven recommendations for optimal pricing based on seasonality, local events, and competition.</p>
                      <Link 
                        href="/pricing-strategy" 
                        className="text-blue-600 hover:text-blue-800 font-medium text-sm flex items-center"
                      >
                        Optimize Pricing <span className="ml-1">→</span>
                      </Link>
                    </div>
                  </div>
                  
                  {/* Amenity Recommendations */}
                  <div className="bg-white border border-gray-200 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                    <div className="p-4">
                      <div className="text-3xl mb-2">🛋️</div>
                      <h4 className="font-semibold text-gray-900 mb-1">Amenity Recommendations</h4>
                      <p className="text-gray-600 text-sm mb-3">Discover which amenities will have the biggest impact on your bookings and guest satisfaction.</p>
                      <Link 
                        href="/amenity-recommendations" 
                        className="text-blue-600 hover:text-blue-800 font-medium text-sm flex items-center"
                      >
                        Get Recommendations <span className="ml-1">→</span>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function AnalysisTypeCard({ 
  id, 
  title, 
  description, 
  selected, 
  onClick 
}: { 
  id: string; 
  title: string; 
  description: string; 
  selected: boolean; 
  onClick: () => void; 
}) {
  return (
    <div 
      className={`border rounded-lg p-4 cursor-pointer transition-all ${
        selected 
          ? "border-blue-500 bg-blue-50 ring-2 ring-blue-500" 
          : "border-gray-200 hover:border-blue-300 hover:bg-blue-50"
      }`}
      onClick={onClick}
    >
      <div className="flex items-start">
        <input
          type="radio"
          id={id}
          name="analysisType"
          checked={selected}
          onChange={() => {}}
          className="mt-1 mr-3"
        />
        <div>
          <label htmlFor={id} className="font-medium block mb-1 cursor-pointer">
            {title}
          </label>
          <p className="text-sm text-gray-600">{description}</p>
        </div>
      </div>
    </div>
  );
} 