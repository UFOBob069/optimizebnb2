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
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  Analysis Type
                </label>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <AnalysisTypeCard
                    id="comprehensive"
                    title="Comprehensive Analysis"
                    description="Full analysis of your listing including pros, cons, and recommendations"
                    selected={analysisType === "comprehensive"}
                    onClick={() => setAnalysisType("comprehensive")}
                  />
                  <AnalysisTypeCard
                    id="photos"
                    title="Photo Analysis"
                    description="Detailed feedback on your listing photos and how to improve them"
                    selected={analysisType === "photos"}
                    onClick={() => setAnalysisType("photos")}
                  />
                  <AnalysisTypeCard
                    id="seo"
                    title="SEO & Description"
                    description="Optimize your title and description for search visibility"
                    selected={analysisType === "seo"}
                    onClick={() => setAnalysisType("seo")}
                  />
                  <AnalysisTypeCard
                    id="reviews"
                    title="Review Analysis"
                    description="Analyze guest reviews to identify patterns and areas for improvement"
                    selected={analysisType === "reviews"}
                    onClick={() => setAnalysisType("reviews")}
                  />
                  <AnalysisTypeCard
                    id="pricing"
                    title="Pricing Strategy"
                    description="Get data-driven pricing recommendations based on your market"
                    selected={analysisType === "pricing"}
                    onClick={() => setAnalysisType("pricing")}
                  />
                  <AnalysisTypeCard
                    id="welcome-guide"
                    title="Welcome Guide"
                    description="Generate a custom welcome guide for your guests"
                    selected={analysisType === "welcome-guide"}
                    onClick={() => setAnalysisType("welcome-guide")}
                  />
                </div>
              </div>
              
              <div>
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-4 rounded-lg disabled:bg-blue-400 disabled:cursor-not-allowed transition-colors"
                >
                  {loading ? "Analyzing..." : "Analyze Listing"}
                </button>
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
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Link 
                    href="/welcome-guide" 
                    className="inline-block text-center bg-blue-50 hover:bg-blue-100 text-blue-700 font-medium py-3 px-4 rounded-lg transition-colors"
                  >
                    Create a Welcome Guide
                  </Link>
                  <Link 
                    href="/photo-analysis" 
                    className="inline-block text-center bg-blue-50 hover:bg-blue-100 text-blue-700 font-medium py-3 px-4 rounded-lg transition-colors"
                  >
                    Analyze Your Photos
                  </Link>
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