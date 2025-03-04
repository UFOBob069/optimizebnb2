"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowLeft, Star, TrendingUp, TrendingDown, MessageCircle, ThumbsUp, ThumbsDown, AlertCircle } from "lucide-react";

interface SentimentAnalysis {
  positive: number;
  neutral: number;
  negative: number;
}

interface TopicAnalysis {
  topic: string;
  sentiment: "positive" | "negative" | "neutral";
  count: number;
  examples: string[];
}

interface ReviewAnalysis {
  overallSentiment: SentimentAnalysis;
  topicAnalysis: TopicAnalysis[];
  commonPraises: string[];
  commonComplaints: string[];
  trendAnalysis: {
    period: string;
    rating: number;
    change: number;
  }[];
  recommendations: string[];
  reviewCount: number;
  averageRating: number;
}

export default function ReviewAnalysisPage() {
  const [listingUrl, setListingUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [analysis, setAnalysis] = useState<ReviewAnalysis | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setAnalysis(null);

    try {
      // Simulate API call
      setTimeout(() => {
        // Mock data for demonstration
        const mockAnalysis: ReviewAnalysis = {
          overallSentiment: {
            positive: 72,
            neutral: 18,
            negative: 10
          },
          topicAnalysis: [
            {
              topic: "Cleanliness",
              sentiment: "positive",
              count: 28,
              examples: [
                "The apartment was spotless when we arrived.",
                "Everything was clean and well-maintained.",
                "The cleanest Airbnb we've ever stayed in!"
              ]
            },
            {
              topic: "Location",
              sentiment: "positive",
              count: 35,
              examples: [
                "Perfect location, close to everything!",
                "Great neighborhood with lots of restaurants nearby.",
                "Easy access to public transportation."
              ]
            },
            {
              topic: "Communication",
              sentiment: "positive",
              count: 22,
              examples: [
                "Host was very responsive and helpful.",
                "Great communication before and during our stay.",
                "Quick responses to all our questions."
              ]
            },
            {
              topic: "Amenities",
              sentiment: "neutral",
              count: 15,
              examples: [
                "Basic amenities were provided.",
                "The kitchen had most of what we needed.",
                "Wifi worked well most of the time."
              ]
            },
            {
              topic: "Noise",
              sentiment: "negative",
              count: 8,
              examples: [
                "Street noise was quite loud at night.",
                "Could hear neighbors through the walls.",
                "Construction noise started early in the morning."
              ]
            },
            {
              topic: "Bathroom",
              sentiment: "negative",
              count: 6,
              examples: [
                "Shower pressure was very weak.",
                "Bathroom was smaller than it appeared in photos.",
                "Limited hot water for showers."
              ]
            }
          ],
          commonPraises: [
            "Great location",
            "Clean and comfortable",
            "Responsive host",
            "Beautiful view",
            "Well-equipped kitchen"
          ],
          commonComplaints: [
            "Street noise",
            "Weak shower pressure",
            "Limited parking options",
            "Uncomfortable mattress",
            "Slow wifi"
          ],
          trendAnalysis: [
            { period: "Last 3 months", rating: 4.8, change: 0.2 },
            { period: "4-6 months ago", rating: 4.6, change: 0.1 },
            { period: "7-12 months ago", rating: 4.5, change: -0.1 },
            { period: "Over 12 months ago", rating: 4.6, change: 0 }
          ],
          recommendations: [
            "Address noise issues by providing earplugs or installing better soundproofing",
            "Upgrade the shower system to improve water pressure",
            "Add more information about parking options in your listing description",
            "Consider replacing the mattress in the main bedroom",
            "Upgrade your wifi router or internet plan for better connectivity"
          ],
          reviewCount: 87,
          averageRating: 4.7
        };
        
        setAnalysis(mockAnalysis);
        setLoading(false);
      }, 2000);
    } catch (err) {
      setError("Failed to analyze reviews. Please try again.");
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <Link href="/" className="inline-flex items-center text-blue-600 hover:text-blue-800 mb-8">
          <ArrowLeft size={16} className="mr-2" /> Back to Home
        </Link>
        
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          <div className="p-6 md:p-8 border-b border-gray-200">
            <h1 className="text-2xl md:text-3xl font-bold text-gray-900">Review Analysis</h1>
            <p className="mt-2 text-gray-600">
              Analyze guest reviews to identify patterns, sentiment, and areas for improvement.
            </p>
          </div>
          
          <div className="p-6 md:p-8">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-4">
                <label htmlFor="listingUrl" className="block text-sm font-medium text-gray-700">
                  Airbnb Listing URL
                </label>
                <input
                  id="listingUrl"
                  type="url"
                  value={listingUrl}
                  onChange={(e) => setListingUrl(e.target.value)}
                  placeholder="https://www.airbnb.com/rooms/12345678"
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  required
                />
                <p className="text-sm text-gray-500">
                  We'll analyze all reviews from your Airbnb listing.
                </p>
              </div>
              
              <div>
                <button
                  type="submit"
                  disabled={loading || !listingUrl}
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-4 rounded-lg disabled:bg-blue-400 disabled:cursor-not-allowed transition-colors"
                >
                  {loading ? "Analyzing Reviews..." : "Analyze Reviews"}
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
        
        {analysis && (
          <div className="mt-8 space-y-8">
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
              <div className="p-6 md:p-8 border-b border-gray-200">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                  <h2 className="text-2xl font-bold text-gray-900">Review Analysis Results</h2>
                  <div className="mt-4 md:mt-0 flex items-center">
                    <div className="flex items-center mr-4">
                      <Star className="h-5 w-5 text-yellow-400 mr-1" fill="currentColor" />
                      <span className="font-bold">{analysis.averageRating.toFixed(1)}</span>
                      <span className="text-gray-500 ml-1">/ 5</span>
                    </div>
                    <div className="text-gray-600">
                      Based on {analysis.reviewCount} reviews
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="p-6 md:p-8">
                {/* Sentiment Overview */}
                <div className="mb-10">
                  <h3 className="text-xl font-semibold mb-4">Sentiment Overview</h3>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <div className="flex flex-col md:flex-row gap-4">
                      <div className="flex-1 text-center p-4">
                        <div className="text-green-500 font-bold text-3xl mb-1">
                          {analysis.overallSentiment.positive}%
                        </div>
                        <div className="text-gray-600">Positive</div>
                      </div>
                      <div className="flex-1 text-center p-4">
                        <div className="text-gray-500 font-bold text-3xl mb-1">
                          {analysis.overallSentiment.neutral}%
                        </div>
                        <div className="text-gray-600">Neutral</div>
                      </div>
                      <div className="flex-1 text-center p-4">
                        <div className="text-red-500 font-bold text-3xl mb-1">
                          {analysis.overallSentiment.negative}%
                        </div>
                        <div className="text-gray-600">Negative</div>
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Rating Trends */}
                <div className="mb-10">
                  <h3 className="text-xl font-semibold mb-4">Rating Trends</h3>
                  <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                      <thead className="bg-gray-50">
                        <tr>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Time Period
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Average Rating
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Change
                          </th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200">
                        {analysis.trendAnalysis.map((trend, index) => (
                          <tr key={index}>
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                              {trend.period}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                              <div className="flex items-center">
                                <Star className="h-4 w-4 text-yellow-400 mr-1" fill="currentColor" />
                                {trend.rating.toFixed(1)}
                              </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                              <div className="flex items-center">
                                {trend.change > 0 ? (
                                  <>
                                    <TrendingUp className="h-4 w-4 text-green-500 mr-1" />
                                    <span className="text-green-500">+{trend.change.toFixed(1)}</span>
                                  </>
                                ) : trend.change < 0 ? (
                                  <>
                                    <TrendingDown className="h-4 w-4 text-red-500 mr-1" />
                                    <span className="text-red-500">{trend.change.toFixed(1)}</span>
                                  </>
                                ) : (
                                  <span>No change</span>
                                )}
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
                
                {/* Topic Analysis */}
                <div className="mb-10">
                  <h3 className="text-xl font-semibold mb-4">Topic Analysis</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {analysis.topicAnalysis.map((topic, index) => (
                      <div 
                        key={index} 
                        className={`p-4 rounded-lg border ${
                          topic.sentiment === 'positive' 
                            ? 'border-green-200 bg-green-50' 
                            : topic.sentiment === 'negative'
                              ? 'border-red-200 bg-red-50'
                              : 'border-gray-200 bg-gray-50'
                        }`}
                      >
                        <div className="flex items-center justify-between mb-3">
                          <h4 className="font-semibold">{topic.topic}</h4>
                          <div className="flex items-center">
                            {topic.sentiment === 'positive' ? (
                              <ThumbsUp className="h-4 w-4 text-green-500 mr-1" />
                            ) : topic.sentiment === 'negative' ? (
                              <ThumbsDown className="h-4 w-4 text-red-500 mr-1" />
                            ) : (
                              <MessageCircle className="h-4 w-4 text-gray-500 mr-1" />
                            )}
                            <span className="text-sm">
                              Mentioned in {topic.count} reviews
                            </span>
                          </div>
                        </div>
                        <div className="space-y-2">
                          {topic.examples.map((example, i) => (
                            <div key={i} className="text-sm italic">
                              "{example}"
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                
                {/* Common Feedback */}
                <div className="mb-10 grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="text-xl font-semibold mb-4 text-green-700 flex items-center">
                      <ThumbsUp className="mr-2" size={20} /> Common Praises
                    </h3>
                    <ul className="space-y-2">
                      {analysis.commonPraises.map((praise, index) => (
                        <li key={index} className="flex items-start">
                          <span className="text-green-500 mr-2">•</span>
                          <span>{praise}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  <div>
                    <h3 className="text-xl font-semibold mb-4 text-red-700 flex items-center">
                      <ThumbsDown className="mr-2" size={20} /> Common Complaints
                    </h3>
                    <ul className="space-y-2">
                      {analysis.commonComplaints.map((complaint, index) => (
                        <li key={index} className="flex items-start">
                          <span className="text-red-500 mr-2">•</span>
                          <span>{complaint}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
                
                {/* Recommendations */}
                <div>
                  <h3 className="text-xl font-semibold mb-4 text-blue-700 flex items-center">
                    <AlertCircle className="mr-2" size={20} /> Recommendations
                  </h3>
                  <div className="bg-blue-50 p-6 rounded-lg border border-blue-100">
                    <ul className="space-y-3">
                      {analysis.recommendations.map((recommendation, index) => (
                        <li key={index} className="flex items-start">
                          <span className="text-blue-500 mr-2">•</span>
                          <span>{recommendation}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden p-6 md:p-8">
              <h3 className="text-xl font-semibold mb-4">Next Steps</h3>
              <p className="mb-6">
                Based on your review analysis, here are some recommended actions to improve your listing:
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Link 
                  href="/photo-analysis" 
                  className="block p-4 bg-blue-50 hover:bg-blue-100 rounded-lg text-center transition-colors"
                >
                  <h4 className="font-semibold mb-2">Analyze Your Photos</h4>
                  <p className="text-sm text-gray-600">
                    Get feedback on your listing photos to improve visual appeal.
                  </p>
                </Link>
                
                <Link 
                  href="/seo-optimization" 
                  className="block p-4 bg-blue-50 hover:bg-blue-100 rounded-lg text-center transition-colors"
                >
                  <h4 className="font-semibold mb-2">Optimize Your Description</h4>
                  <p className="text-sm text-gray-600">
                    Update your listing description to address common feedback.
                  </p>
                </Link>
                
                <Link 
                  href="/welcome-guide" 
                  className="block p-4 bg-blue-50 hover:bg-blue-100 rounded-lg text-center transition-colors"
                >
                  <h4 className="font-semibold mb-2">Create a Welcome Guide</h4>
                  <p className="text-sm text-gray-600">
                    Improve guest experience with a detailed welcome guide.
                  </p>
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
} 