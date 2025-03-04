'use client';

import { useState, useEffect } from 'react';

export default function GuideDisplayPage({ params }: { params: { id: string } }) {
  const [guide, setGuide] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Use useEffect for fetching data on the client side
  useEffect(() => {
    async function fetchGuide() {
      try {
        // Fetch the guide data
        const response = await fetch(`/api/guides/${params.id}`);
        if (!response.ok) {
          throw new Error('Failed to load guide');
        }
        const data = await response.json();
        setGuide(data.guide);
        setLoading(false);
      } catch (err) {
        setError('Failed to load the welcome guide. Please try again later.');
        setLoading(false);
      }
    }

    fetchGuide();
  }, [params.id]);

  // Show loading state
  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Loading your welcome guide...</h1>
          <div className="animate-pulse flex justify-center">
            <div className="h-8 w-8 bg-blue-600 rounded-full"></div>
          </div>
        </div>
      </div>
    );
  }

  // Show error state
  if (error || !guide) {
    return (
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
          <p>{error || 'Guide not found'}</p>
          <button 
            onClick={() => window.history.back()}
            className="mt-4 bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
          >
            Go Back
          </button>
        </div>
      </div>
    );
  }

  // Render the guide
  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <div className="bg-white shadow-lg rounded-lg overflow-hidden">
        <div className="bg-blue-600 text-white p-6">
          <h1 className="text-3xl font-bold">{guide.propertyName}</h1>
          <p className="text-xl">{guide.location}</p>
        </div>
        
        <div className="p-6">
          {guide.sections.map((section: any, index: number) => (
            <div key={index} className="mb-8">
              <h2 className="text-2xl font-semibold border-b border-gray-200 pb-2 mb-4">{section.title}</h2>
              <div className="whitespace-pre-line">{section.content}</div>
            </div>
          ))}
        </div>
        
        <div className="bg-gray-100 p-6">
          <p className="text-center text-gray-600">
            Created with OptimizeBnB.AI - Your Airbnb Optimization Tool
          </p>
        </div>
      </div>
    </div>
  );
} 