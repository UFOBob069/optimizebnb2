"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

interface AnalysisResult {
  pros: string[];
  cons: string[];
  recommendations: string[];
  overallScore?: number;
  listingName?: string;
}

export default function AnalyzePage() {
  const [url, setUrl] = useState("");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [analysisResult, setAnalysisResult] = useState<AnalysisResult | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!url) {
      setError("Please enter your Airbnb listing URL.");
      return;
    }

    if (!email) {
      setError("Please enter your email address to receive the analysis results.");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch('/api/analyze-listing', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ url, email }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to analyze listing');
      }

      const data = await response.json();
      
      // Parse the raw response if needed
      const result = typeof data.analysis === 'string' 
        ? parseRawResponse(data.analysis, data.listingName) 
        : data.analysis;
      
      setAnalysisResult(result);
    } catch (err: unknown) {
      console.error('Error analyzing listing:', err);
      const errorMessage = err instanceof Error ? err.message : 'Failed to analyze listing. Please try again.';
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const parseRawResponse = (text: string, listingName?: string): AnalysisResult => {
    // Extract overall score if available
    const overallScoreMatch = text.match(/Overall Score:?\s*(\d+)(?:\/100)?/i);
    const overallScore = overallScoreMatch ? parseInt(overallScoreMatch[1], 10) : undefined;
    
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
    
    return { pros, cons, recommendations, overallScore, listingName };
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Link href="/" className="inline-flex items-center text-blue-600 hover:text-blue-800 mb-8">
          <ArrowLeft size={16} className="mr-2" /> Back to Home
        </Link>
        
        <div className="bg-blue-50 border-l-4 border-blue-500 p-4 mb-6 rounded-md">
          <div className="flex">
            <div className="ml-3">
              <p className="text-sm text-blue-700">
                <strong>Try our listing analyzer for free!</strong> Create an account to unlock all premium features including photo analysis, pricing strategy, and more.
              </p>
              <p className="mt-2">
                <Link href="/account/signup" className="text-blue-700 hover:text-blue-600 font-medium">
                  Sign up now →
                </Link>
              </p>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          <div className="p-6 md:p-8 border-b border-gray-200">
            <h1 className="text-2xl md:text-3xl font-bold text-gray-900">Analyze Your Airbnb Listing</h1>
            <p className="mt-2 text-gray-600">
              Get AI-powered insights to improve your listing and boost your bookings.
            </p>
          </div>
          
          <div className="p-6 md:p-8 bg-blue-50 border-b border-gray-200">
            <h2 className="text-xl font-semibold text-blue-800 mb-3">Why Analyze Your Listing?</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex">
                <div className="flex-shrink-0 h-6 w-6 text-blue-600">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <p className="ml-3 text-blue-700">Identify strengths and weaknesses in your listing</p>
              </div>
              <div className="flex">
                <div className="flex-shrink-0 h-6 w-6 text-blue-600">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <p className="ml-3 text-blue-700">Get actionable recommendations to improve your listing</p>
              </div>
              <div className="flex">
                <div className="flex-shrink-0 h-6 w-6 text-blue-600">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <p className="ml-3 text-blue-700">Increase your visibility in search results</p>
              </div>
              <div className="flex">
                <div className="flex-shrink-0 h-6 w-6 text-blue-600">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <p className="ml-3 text-blue-700">Attract more bookings and increase revenue</p>
              </div>
            </div>
          </div>
          
          <div className="p-6 md:p-8">
            <form onSubmit={handleSubmit} className="space-y-6">
              {error && (
                <div className="bg-red-50 border-l-4 border-red-400 p-4">
                  <div className="flex">
                    <div className="flex-shrink-0">
                      <svg className="h-5 w-5 text-red-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <div className="ml-3">
                      <p className="text-sm text-red-700">{error}</p>
                    </div>
                  </div>
                </div>
              )}
              
              <div>
                <label htmlFor="url" className="block text-gray-700 font-medium mb-2">
                  Airbnb Listing URL*
                </label>
                <input
                  type="url"
                  id="url"
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                  placeholder="https://www.airbnb.com/rooms/12345678"
                  className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                  required
                />
                <p className="mt-1 text-sm text-gray-500">
                  Enter the full URL of your Airbnb listing
                </p>
              </div>
              
              <div>
                <label htmlFor="email" className="block text-gray-700 font-medium mb-2">
                  Your Email Address*
                </label>
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                  required
                />
                <p className="mt-1 text-sm text-gray-500">
                  We&apos;ll send the analysis results to this email
                </p>
              </div>
              
              <div>
                <button
                  type="submit"
                  disabled={loading}
                  className={`w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 ${loading ? 'opacity-70 cursor-not-allowed' : ''}`}
                >
                  {loading ? 'Analyzing...' : 'Analyze My Listing'}
                </button>
              </div>
            </form>
          </div>
        </div>
        
        {analysisResult && (
          <div className="mt-8 bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
            <div className="p-6 md:p-8 border-b border-gray-200">
              <h2 className="text-2xl font-bold text-gray-900">Analysis Results</h2>
              {analysisResult.listingName && (
                <p className="mt-2 text-gray-600">
                  Listing: <span className="font-semibold">{analysisResult.listingName}</span>
                </p>
              )}
            </div>
            
            <div className="p-6 md:p-8 space-y-8">
              {/* Overall Score Section */}
              {analysisResult.overallScore !== undefined && (
                <div className="bg-blue-50 rounded-lg p-6 flex items-center justify-between">
                  <div>
                    <h3 className="text-xl font-semibold text-blue-800">Overall Listing Score</h3>
                    <p className="text-gray-600">Based on our comprehensive analysis of your listing</p>
                  </div>
                  <div className="text-center">
                    <div className={`text-4xl font-bold rounded-full h-24 w-24 flex items-center justify-center ${
                      analysisResult.overallScore >= 80 ? 'bg-green-100 text-green-700' :
                      analysisResult.overallScore >= 60 ? 'bg-yellow-100 text-yellow-700' :
                      'bg-red-100 text-red-700'
                    }`}>
                      {analysisResult.overallScore}
                    </div>
                    <p className="mt-1 text-sm text-gray-500">out of 100</p>
                  </div>
                </div>
              )}
              
              {/* Pros Section */}
              <div>
                <h3 className="text-xl font-semibold text-green-700 mb-4">Pros</h3>
                <ul className="space-y-3">
                  {analysisResult.pros.map((pro, index) => (
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
                  {analysisResult.cons.map((con, index) => (
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
                  {analysisResult.recommendations.map((rec, index) => (
                    <li key={index} className="flex items-start">
                      <span className="text-blue-500 mr-2">→</span>
                      <span>{rec}</span>
                    </li>
                  ))}
                </ul>
              </div>
              
              {/* CTA for signup after showing results */}
              <div className="mt-8 bg-gradient-to-r from-blue-50 to-indigo-50 p-6 rounded-lg border border-blue-100">
                <h3 className="text-lg font-semibold text-blue-800 mb-2">Ready to take your Airbnb listing to the next level?</h3>
                <p className="text-blue-700 mb-4">
                  Sign up now to unlock all premium features including photo analysis, pricing strategy, amenity recommendations, and more!
                </p>
                <div className="flex flex-wrap gap-4">
                  <Link 
                    href="/account/signup" 
                    className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                  >
                    Create Free Account
                  </Link>
                  <Link 
                    href="/account/login" 
                    className="inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                  >
                    Sign In
                  </Link>
                </div>
              </div>
              
              {/* What's Next Section */}
              <div className="pt-6 border-t border-gray-200">
                <h3 className="text-lg font-semibold mb-4">What&apos;s Next?</h3>
                <p className="text-gray-700 mb-4">
                  Create an account to access these premium features:
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {/* Welcome Guide */}
                  <div className="bg-white border border-gray-200 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                    <div className="p-4">
                      <div className="text-3xl mb-2">📍</div>
                      <h4 className="font-semibold text-gray-900 mb-1">Custom Welcome Guide</h4>
                      <p className="text-gray-600 text-sm mb-3">Create a personalized welcome guide based on your location.</p>
                      <Link 
                        href="/account/signup" 
                        className="text-blue-600 hover:text-blue-800 font-medium text-sm flex items-center"
                      >
                        Sign Up <span className="ml-1">→</span>
                      </Link>
                    </div>
                  </div>
                  
                  {/* Photo Analysis */}
                  <div className="bg-white border border-gray-200 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                    <div className="p-4">
                      <div className="text-3xl mb-2">📸</div>
                      <h4 className="font-semibold text-gray-900 mb-1">Photo Analysis</h4>
                      <p className="text-gray-600 text-sm mb-3">Get professional feedback on your listing photos.</p>
                      <Link 
                        href="/account/signup" 
                        className="text-blue-600 hover:text-blue-800 font-medium text-sm flex items-center"
                      >
                        Sign Up <span className="ml-1">→</span>
                      </Link>
                    </div>
                  </div>
                  
                  {/* SEO Optimization */}
                  <div className="bg-white border border-gray-200 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                    <div className="p-4">
                      <div className="text-3xl mb-2">🔍</div>
                      <h4 className="font-semibold text-gray-900 mb-1">SEO Optimization</h4>
                      <p className="text-gray-600 text-sm mb-3">Optimize your title and description to rank higher in search results.</p>
                      <Link 
                        href="/account/signup" 
                        className="text-blue-600 hover:text-blue-800 font-medium text-sm flex items-center"
                      >
                        Sign Up <span className="ml-1">→</span>
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