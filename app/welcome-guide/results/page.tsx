'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

interface GuideSection {
  [key: string]: string;
}

interface Guide {
  propertyName: string;
  location: string;
  sections: GuideSection;
}

export default function ResultsPage() {
  const router = useRouter();
  const [guide, setGuide] = useState<Guide | null>(null);
  const [loading, setLoading] = useState(true);
  const [copied, setCopied] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setMounted(true);
    
    try {
      // Only access localStorage on the client side
      if (typeof window !== 'undefined') {
        // Retrieve guide data from localStorage
        const storedGuide = localStorage.getItem('generatedGuide');
        
        // Skip processing if no data is found
        if (!storedGuide) {
          console.log('No guide data found in localStorage');
          setLoading(false);
          return;
        }
        
        // Check if we've accidentally received HTML instead of JSON
        if (storedGuide.trim().startsWith('<!DOCTYPE') || storedGuide.trim().startsWith('<html')) {
          console.error('Received HTML instead of JSON:', storedGuide.substring(0, 200));
          setError('The system returned an HTML page instead of JSON data. Please try generating a new guide.');
          setLoading(false);
          return;
        }
        
        try {
          const parsedGuide = JSON.parse(storedGuide);
          
          // Validate that the parsed data has the expected structure
          if (parsedGuide && typeof parsedGuide === 'object' && parsedGuide.sections) {
            setGuide(parsedGuide as Guide);
          } else {
            console.error('Invalid guide data structure:', parsedGuide);
            setError('The guide data is in an invalid format. Please try generating a new guide.');
          }
        } catch (parseError) {
          console.error('Error parsing guide data:', parseError);
          console.error('First 200 characters of stored guide:', storedGuide.substring(0, 200));
          setError('There was an error loading your guide. Please try generating a new guide.');
        }
      }
    } catch (error) {
      console.error('Unexpected error in useEffect:', error);
      setError('An unexpected error occurred. Please try generating a new guide.');
    } finally {
      setLoading(false);
    }
  }, []);

  const handleCopyAll = () => {
    if (!guide || !guide.sections) return;
    
    const allContent = Object.values(guide.sections).join('\n\n');
    
    navigator.clipboard.writeText(allContent)
      .then(() => {
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      })
      .catch(err => {
        console.error('Failed to copy text: ', err);
      });
  };

  const handleCopySection = (sectionKey: string) => {
    if (!guide || !guide.sections || !guide.sections[sectionKey]) return;
    
    navigator.clipboard.writeText(guide.sections[sectionKey])
      .then(() => {
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      })
      .catch(err => {
        console.error('Failed to copy text: ', err);
      });
  };

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

  if (error) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-12 text-center">
        <h1 className="text-3xl font-bold mb-6">Error Loading Guide</h1>
        <div className="bg-red-50 border border-red-200 rounded-lg p-6 mb-8">
          <p className="text-lg text-red-700 mb-4">{error}</p>
          <Link
            href="/welcome-guide"
            className="px-6 py-3 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700"
          >
            Create New Guide
          </Link>
        </div>
      </div>
    );
  }

  if (!guide) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-12 text-center">
        <h1 className="text-3xl font-bold mb-6">No Guide Found</h1>
        <p className="text-lg mb-8">
          We couldn&apos;t find your welcome guide. Please try creating a new one.
        </p>
        <Link
          href="/welcome-guide"
          className="px-6 py-3 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700"
        >
          Create New Guide
        </Link>
      </div>
    );
  }

  const sectionTitles = {
    title: 'Title & Headline',
    description: 'Property Description',
    amenities: 'Amenities Highlights',
    house_rules: 'House Rules',
    local_area: 'Local Area Guide',
    host_bio: 'Host Bio',
    welcome: 'Welcome Message',
    property: 'Property Information',
    checkin: 'Check-in/Check-out',
    wifi: 'WiFi & Entertainment',
    restaurants: 'Local Restaurants',
    attractions: 'Nearby Attractions',
    transportation: 'Transportation',
    emergency: 'Emergency Information'
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-blue-700">Your Welcome Guide</h1>
        <Link
          href="/welcome-guide"
          className="px-4 py-2 text-blue-600 border border-blue-600 rounded-md hover:bg-blue-50 transition-colors"
        >
          Create New Guide
        </Link>
      </div>
      
      <div className="bg-white shadow-lg rounded-lg overflow-hidden mb-8">
        <div className="bg-blue-600 text-white p-6">
          <h2 className="text-2xl font-bold">
            Guide for: {guide.propertyName || 'Your Property'}
          </h2>
          <p className="text-blue-100 mt-1">A custom welcome guide for your guests</p>
        </div>
        
        <div className="p-6">
          <div className="flex justify-end mb-4">
            <button
              onClick={handleCopyAll}
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors flex items-center gap-2"
            >
              {copied ? '✓ Copied!' : 'Copy All'}
            </button>
          </div>
          
          <div className="space-y-8">
            {Object.keys(guide.sections).map((sectionKey) => {
              // Get section icon
              const sectionIcon = getSectionIcon(sectionKey);
              
              return (
                <div key={sectionKey} className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow">
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="font-semibold text-xl text-blue-700 flex items-center gap-2">
                      <span className="text-blue-500">{sectionIcon}</span>
                      {sectionTitles[sectionKey] || formatSectionTitle(sectionKey)}
                    </h3>
                    <button
                      onClick={() => handleCopySection(sectionKey)}
                      className="text-blue-600 hover:text-blue-800 transition-colors"
                    >
                      {copied ? 'Copied!' : 'Copy'}
                    </button>
                  </div>
                  <div className="prose max-w-none">
                    {guide.sections[sectionKey].split('\n').map((paragraph, i) => {
                      // Check if paragraph is a heading (starts with #)
                      if (paragraph.startsWith('##')) {
                        return (
                          <h4 key={i} className="text-lg font-semibold text-gray-800 mt-4 mb-2">
                            {paragraph.replace(/^##\s+/, '')}
                          </h4>
                        );
                      }
                      // Check if paragraph is a subheading (starts with ###)
                      else if (paragraph.startsWith('###')) {
                        return (
                          <h5 key={i} className="text-md font-semibold text-gray-700 mt-3 mb-2">
                            {paragraph.replace(/^###\s+/, '')}
                          </h5>
                        );
                      }
                      // Check if paragraph is a bullet point
                      else if (paragraph.trim().startsWith('•') || paragraph.trim().startsWith('-')) {
                        return (
                          <div key={i} className="flex items-start gap-2 my-1">
                            <span className="text-blue-500 mt-0.5">•</span>
                            <span>{paragraph.replace(/^[•-]\s*/, '')}</span>
                          </div>
                        );
                      }
                      // Regular paragraph
                      else if (paragraph.trim() !== '') {
                        return <p key={i} className="my-2">{paragraph}</p>;
                      }
                      // Empty line
                      return <div key={i} className="h-2"></div>;
                    })}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
      
      <div className="bg-blue-50 border-l-4 border-blue-500 p-6 rounded-lg">
        <h3 className="font-medium text-lg text-blue-800 mb-2">What&apos;s Next?</h3>
        <p className="mb-2">
          Your welcome guide has been generated based on your Airbnb listing. You can now:
        </p>
        <ul className="list-disc pl-5 space-y-1 text-gray-700">
          <li>Copy individual sections or the entire guide</li>
          <li>Paste the content into your Airbnb listing or print it for your guests</li>
          <li>Create a new guide for another property</li>
        </ul>
      </div>
    </div>
  );
}

// Helper function to format section titles
function formatSectionTitle(key: string): string {
  return key.split('_')
    .map((word: string) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}

// Helper function to get section icons
function getSectionIcon(sectionKey: string): string {
  const icons: Record<string, string> = {
    welcome: '👋',
    property: '🏠',
    checkin: '🔑',
    wifi: '📶',
    restaurants: '🍽️',
    attractions: '🎭',
    transportation: '🚗',
    emergency: '🚨',
    house_rules: '📋',
    title: '✨',
    description: '📝',
    amenities: '🛋️',
    local_area: '🗺️',
    host_bio: '👤'
  };
  
  return icons[sectionKey] || '📄';
} 