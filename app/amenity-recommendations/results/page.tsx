'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function AmenityRecommendationsResultsPage() {
  const router = useRouter();
  const [recommendations, setRecommendations] = useState<any>(null);
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
    (category: any) => category.name === activeCategory
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
                {recommendations.categories.map((category: any) => (
                  <button
                    key={category.name}
                    onClick={() => setActiveCategory(category.name)}
                    className={`w-full text-left px-4 py-2 rounded-md ${
                      activeCategory === category.name
                        ? 'bg-blue-100 text-blue-700 font-medium'
                        : 'hover:bg-gray-100'
                    }`}
                  >
                    {category.icon} {category.name}
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
                  <h3 className="font-medium text-lg">{activeCategoryData.name}</h3>
                </div>
                
                <p className="text-gray-700 mb-6">{activeCategoryData.description}</p>
                
                <div className="space-y-6">
                  {activeCategoryData.amenities.map((amenity: any, index: number) => (
                    <div key={index} className="border rounded-lg overflow-hidden">
                      <div className="bg-gray-50 px-4 py-3 border-b">
                        <h4 className="font-medium">{amenity.name}</h4>
                      </div>
                      <div className="p-4">
                        <p className="text-gray-700 mb-3">{amenity.description}</p>
                        
                        <div className="mb-3">
                          <span className="text-sm font-medium text-gray-500">Why it works:</span>
                          <ul className="mt-1 space-y-1">
                            {amenity.benefits.map((benefit: string, i: number) => (
                              <li key={i} className="flex items-start">
                                <span className="text-green-500 mr-2">✓</span>
                                <span className="text-gray-700">{benefit}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                        
                        <div className="flex justify-between items-center">
                          <div>
                            <span className="text-sm font-medium text-gray-500">Investment Level:</span>
                            <span className="ml-2 px-2 py-1 text-xs font-medium rounded-full bg-blue-100 text-blue-800">
                              {amenity.investmentLevel}
                            </span>
                          </div>
                          <div>
                            <span className="text-sm font-medium text-gray-500">ROI:</span>
                            <span className="ml-2 px-2 py-1 text-xs font-medium rounded-full bg-green-100 text-green-800">
                              {amenity.roi}
                            </span>
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
      
      <div className="bg-blue-50 border-l-4 border-blue-500 p-4 mb-8">
        <h3 className="font-medium text-lg text-blue-800 mb-2">Implementation Tips</h3>
        <ul className="list-disc pl-5 space-y-1">
          <li>Start with high-ROI amenities that require minimal investment</li>
          <li>Highlight your amenities prominently in your listing title and description</li>
          <li>Take high-quality photos of your premium amenities</li>
          <li>Update your amenities seasonally to match guest expectations</li>
          <li>Consider creating amenity bundles (e.g., "Work from Home Setup" or "Outdoor Entertainment Package")</li>
        </ul>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div className="bg-white shadow-md rounded-lg p-6">
          <h3 className="font-medium text-lg mb-3 flex items-center">
            <span className="mr-2">📊</span>
            ROI Analysis
          </h3>
          <p className="text-gray-600 mb-4">
            Implementing these recommendations could impact your property&apos;s performance:
          </p>
          <div className="space-y-4">
            <div>
              <div className="flex justify-between mb-1">
                <span className="text-sm font-medium">Potential Rate Increase</span>
                <span className="text-sm font-medium">{recommendations.potentialRateIncrease || '10-15%'}</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className="bg-green-500 h-2 rounded-full"
                  style={{ width: recommendations.potentialRateIncreasePercentage || '80%' }}
                ></div>
              </div>
            </div>
            
            <div>
              <div className="flex justify-between mb-1">
                <span className="text-sm font-medium">Occupancy Improvement</span>
                <span className="text-sm font-medium">{recommendations.occupancyImprovement || '5-10%'}</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className="bg-blue-500 h-2 rounded-full"
                  style={{ width: recommendations.occupancyImprovementPercentage || '65%' }}
                ></div>
              </div>
            </div>
            
            <div>
              <div className="flex justify-between mb-1">
                <span className="text-sm font-medium">Guest Satisfaction</span>
                <span className="text-sm font-medium">{recommendations.guestSatisfaction || 'High'}</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className="bg-purple-500 h-2 rounded-full"
                  style={{ width: recommendations.guestSatisfactionPercentage || '90%' }}
                ></div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="bg-white shadow-md rounded-lg p-6">
          <h3 className="font-medium text-lg mb-3 flex items-center">
            <span className="mr-2">🔍</span>
            Competitive Analysis
          </h3>
          <p className="text-gray-600 mb-4">
            Here&apos;s how these amenities compare to other properties in your area:
          </p>
          <div className="space-y-3">
            {recommendations.competitiveAnalysis ? (
              recommendations.competitiveAnalysis.map((item: any, index: number) => (
                <div key={index} className="flex items-start">
                  <span className="text-blue-500 mr-2">•</span>
                  <span className="text-gray-700">{item}</span>
                </div>
              ))
            ) : (
              <>
                <div className="flex items-start">
                  <span className="text-blue-500 mr-2">•</span>
                  <span className="text-gray-700">Only 15% of properties in your area offer premium kitchen amenities</span>
                </div>
                <div className="flex items-start">
                  <span className="text-blue-500 mr-2">•</span>
                  <span className="text-gray-700">Properties with outdoor amenities receive 22% more bookings in summer months</span>
                </div>
                <div className="flex items-start">
                  <span className="text-blue-500 mr-2">•</span>
                  <span className="text-gray-700">Work-friendly amenities can increase weekday bookings by up to 30%</span>
                </div>
                <div className="flex items-start">
                  <span className="text-blue-500 mr-2">•</span>
                  <span className="text-gray-700">Luxury bathroom amenities are mentioned in 45% of 5-star reviews</span>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
      
      <div className="bg-gray-50 rounded-lg p-6">
        <h3 className="font-medium text-lg mb-3">Seasonal Considerations</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {recommendations.seasonalConsiderations ? (
            recommendations.seasonalConsiderations.map((season: any, index: number) => (
              <div key={index} className="border-l-2 border-blue-500 pl-4">
                <h4 className="font-medium text-blue-700">{season.name}</h4>
                <p className="text-sm text-gray-600">{season.recommendations}</p>
              </div>
            ))
          ) : (
            <>
              <div className="border-l-2 border-blue-500 pl-4">
                <h4 className="font-medium text-blue-700">Summer</h4>
                <p className="text-sm text-gray-600">Focus on outdoor amenities, cooling options, and water-related features to enhance guest comfort during hot months.</p>
              </div>
              <div className="border-l-2 border-blue-500 pl-4">
                <h4 className="font-medium text-blue-700">Fall</h4>
                <p className="text-sm text-gray-600">Add cozy elements like throw blankets, hot beverage stations, and outdoor heating options as temperatures begin to drop.</p>
              </div>
              <div className="border-l-2 border-blue-500 pl-4">
                <h4 className="font-medium text-blue-700">Winter</h4>
                <p className="text-sm text-gray-600">Prioritize heating amenities, winter gear storage, and entertainment options for indoor comfort during cold weather.</p>
              </div>
              <div className="border-l-2 border-blue-500 pl-4">
                <h4 className="font-medium text-blue-700">Spring</h4>
                <p className="text-sm text-gray-600">Highlight allergy-friendly features, rain gear, and transitional indoor/outdoor amenities as weather becomes variable.</p>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
} 