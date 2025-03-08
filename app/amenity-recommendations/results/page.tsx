'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

// Define interfaces for the data structure
interface Amenity {
  name: string;
  description: string;
  benefits: string[];
  investmentLevel: string;
  roi: string;
}

interface Category {
  name: string;
  icon: string;
  description: string;
  amenities: Amenity[];
}

interface QuickWin {
  name: string;
  description: string;
  estimatedCost: string;
}

interface SeasonalConsideration {
  name: string;
  recommendations: string;
}

interface AmenityRecommendations {
  propertyName: string;
  propertyType: string;
  location: string;
  summary: string;
  categories: Category[];
  quickWins: QuickWin[];
  competitiveAnalysis?: string[];
  seasonalConsiderations?: SeasonalConsideration[];
}

export default function AmenityRecommendationsResultsPage() {
  const [recommendations, setRecommendations] = useState<AmenityRecommendations | null>(null);
  const [loading, setLoading] = useState(true);
  const [mounted, setMounted] = useState(false);
  const [activeCategory, setActiveCategory] = useState<string | null>(null);

  useEffect(() => {
    setMounted(true);
    
    // Retrieve recommendations data from localStorage
    const storedRecommendations = localStorage.getItem('amenityRecommendations');
    
    if (storedRecommendations) {
      try {
        const parsedRecommendations = JSON.parse(storedRecommendations);
        setRecommendations(parsedRecommendations);
        
        // Set the first category as active by default
        if (parsedRecommendations.categories && parsedRecommendations.categories.length > 0) {
          setActiveCategory(parsedRecommendations.categories[0].name);
        }
      } catch (error) {
        console.error('Error parsing recommendations data:', error);
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

  if (!recommendations) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-12 text-center">
        <h1 className="text-3xl font-bold mb-6">No Recommendations Found</h1>
        <p className="text-lg mb-8">
          We couldn&apos;t find your amenity recommendations. Please try creating a new one.
        </p>
        <Link
          href="/amenity-recommendations"
          className="px-6 py-3 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700"
        >
          Get New Recommendations
        </Link>
      </div>
    );
  }

  // Get the active category data
  const activeCategoryData = recommendations.categories.find(
    (category) => category.name === activeCategory
  );

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Your Amenity Recommendations</h1>
        <Link
          href="/amenity-recommendations"
          className="px-4 py-2 text-blue-600 border border-blue-600 rounded-md hover:bg-blue-50"
        >
          Get New Recommendations
        </Link>
      </div>
      
      <div className="bg-white shadow-md rounded-lg p-6 mb-8">
        <div className="mb-6">
          <h2 className="text-xl font-semibold">
            Recommendations for: {recommendations.propertyName || 'Your Property'}
          </h2>
          <p className="text-gray-600 mt-2">
            {recommendations.propertyType} in {recommendations.location}
          </p>
        </div>
        
        <div className="mb-6">
          <h3 className="font-medium text-lg mb-3">Summary</h3>
          <p className="text-gray-700">
            {recommendations.summary}
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="md:col-span-1">
            <div className="sticky top-4">
              <h3 className="font-medium text-lg mb-3">Categories</h3>
              <div className="space-y-2">
                {recommendations.categories.map((category) => (
                  <button
                    key={category.name}
                    onClick={() => setActiveCategory(category.name)}
                    className={`w-full text-left px-4 py-2 rounded-md transition-colors ${
                      activeCategory === category.name
                        ? 'bg-blue-100 text-blue-700'
                        : 'hover:bg-gray-100'
                    }`}
                  >
                    <div className="flex items-center">
                      <span className="mr-2">{category.icon}</span>
                      <span>{category.name}</span>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>
          
          <div className="md:col-span-3">
            {activeCategoryData && (
              <div>
                <div className="flex items-center mb-4">
                  <span className="text-2xl mr-2">{activeCategoryData.icon}</span>
                  <h3 className="text-xl font-semibold">{activeCategoryData.name}</h3>
                </div>
                
                <p className="text-gray-700 mb-6">{activeCategoryData.description}</p>
                
                <div className="space-y-6">
                  {activeCategoryData.amenities.map((amenity, index) => (
                    <div key={index} className="border rounded-lg overflow-hidden">
                      <div className="bg-gray-50 px-4 py-3 border-b">
                        <h4 className="font-medium">{amenity.name}</h4>
                      </div>
                      <div className="p-4">
                        <p className="text-gray-700 mb-3">{amenity.description}</p>
                        
                        <div className="mb-3">
                          <h5 className="text-sm font-medium text-gray-700 mb-2">Benefits:</h5>
                          <ul className="list-disc pl-5 space-y-1">
                            {amenity.benefits.map((benefit, i) => (
                              <li key={i} className="text-gray-600 text-sm">{benefit}</li>
                            ))}
                          </ul>
                        </div>
                        
                        <div className="flex flex-wrap gap-2">
                          <div className="bg-blue-50 text-blue-700 text-xs px-2 py-1 rounded-full">
                            Investment: {amenity.investmentLevel}
                          </div>
                          <div className="bg-green-50 text-green-700 text-xs px-2 py-1 rounded-full">
                            ROI: {amenity.roi}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      
      <div className="bg-white shadow-md rounded-lg p-6 mb-8">
        <h3 className="font-medium text-lg mb-4">Quick Wins</h3>
        <p className="text-gray-600 mb-4">
          These low-cost, high-impact amenities can quickly improve your guest experience:
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {recommendations.quickWins.map((quickWin, index) => (
            <div key={index} className="border rounded-lg p-4">
              <h4 className="font-medium mb-2">{quickWin.name}</h4>
              <p className="text-gray-600 text-sm mb-2">{quickWin.description}</p>
              <div className="text-green-600 text-sm font-medium">
                Estimated cost: {quickWin.estimatedCost}
              </div>
            </div>
          ))}
        </div>
      </div>
      
      <div className="bg-blue-50 border-l-4 border-blue-500 p-4 mb-8">
        <h3 className="font-medium text-lg text-blue-800 mb-2">Implementation Tips</h3>
        <ul className="list-disc pl-5 space-y-1">
          <li>Start with high-ROI amenities that require minimal investment</li>
          <li>Highlight your amenities prominently in your listing title and description</li>
          <li>Take high-quality photos of your premium amenities</li>
          <li>Update your amenities seasonally to match guest expectations</li>
          <li>Consider creating amenity bundles (e.g., &quot;Work from Home Setup&quot; or &quot;Outdoor Entertainment Package&quot;)</li>
        </ul>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div className="bg-white shadow-md rounded-lg p-6">
          <h3 className="font-medium text-lg mb-3 text-blue-700">
            <span className="mr-2">📊</span>
            Competitive Analysis
          </h3>
          <p className="text-gray-600 mb-4">
            Here&apos;s how these amenities compare to other properties in your area:
          </p>
          <div className="space-y-3">
            {recommendations.competitiveAnalysis ? (
              recommendations.competitiveAnalysis.map((item, index) => (
                <div key={index} className="flex items-start">
                  <span className="text-blue-500 mr-2">•</span>
                  <span className="text-gray-700">{item}</span>
                </div>
              ))
            ) : (
              <p className="text-gray-500 italic">No competitive analysis available</p>
            )}
          </div>
        </div>
        
        <div className="bg-white shadow-md rounded-lg p-6">
          <h3 className="font-medium text-lg mb-3 text-blue-700">
            <span className="mr-2">💡</span>
            ROI Maximization
          </h3>
          <p className="text-gray-600 mb-4">
            To get the most value from your amenity investments:
          </p>
          <ul className="space-y-2">
            <li className="flex items-start">
              <span className="text-green-500 mr-2">•</span>
              <span>Prioritize amenities with &quot;High&quot; ROI ratings first</span>
            </li>
            <li className="flex items-start">
              <span className="text-green-500 mr-2">•</span>
              <span>Bundle complementary amenities together (e.g., coffee station with premium beans)</span>
            </li>
            <li className="flex items-start">
              <span className="text-green-500 mr-2">•</span>
              <span>Feature amenities prominently in your listing photos</span>
            </li>
            <li className="flex items-start">
              <span className="text-green-500 mr-2">•</span>
              <span>Track guest feedback to identify which amenities are most appreciated</span>
            </li>
          </ul>
        </div>
      </div>
      
      <div className="bg-gray-50 rounded-lg p-6">
        <h3 className="font-medium text-lg mb-3">Seasonal Considerations</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {recommendations.seasonalConsiderations ? (
            recommendations.seasonalConsiderations.map((season, index) => (
              <div key={index} className="border-l-2 border-blue-500 pl-4">
                <h4 className="font-medium text-blue-700">{season.name}</h4>
                <p className="text-sm text-gray-600">{season.recommendations}</p>
              </div>
            ))
          ) : (
            <p className="text-gray-500 italic col-span-2">No seasonal considerations available</p>
          )}
        </div>
      </div>
    </div>
  );
} 