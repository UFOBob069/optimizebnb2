'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function ResultsPage() {
  const router = useRouter();
  const [guide, setGuide] = useState(null);
  const [loading, setLoading] = useState(true);
  const [copied, setCopied] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    
    // Retrieve guide data from localStorage
    const storedGuide = localStorage.getItem('generatedGuide');
    
    if (storedGuide) {
      try {
        setGuide(JSON.parse(storedGuide));
      } catch (error) {
        console.error('Error parsing guide data:', error);
      }
    }
    
    setLoading(false);
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

  const handleCopySection = (sectionKey) => {
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

  if (!guide) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-12 text-center">
        <h1 className="text-3xl font-bold mb-6">No Guide Found</h1>
        <p className="text-lg mb-8">
          We couldn't find your generated guide. Please try creating a new one.
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
    host_bio: 'Host Bio'
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Your Optimized Airbnb Guide</h1>
        <Link
          href="/welcome-guide"
          className="px-4 py-2 text-blue-600 border border-blue-600 rounded-md hover:bg-blue-50"
        >
          Create New Guide
        </Link>
      </div>
      
      <div className="bg-white shadow-md rounded-lg p-6 mb-8">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">
            Guide for: {guide.propertyName || 'Your Property'}
          </h2>
          <button
            onClick={handleCopyAll}
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
          >
            {copied ? 'Copied!' : 'Copy All'}
          </button>
        </div>
        
        <div className="space-y-6">
          {Object.keys(guide.sections).map((sectionKey) => (
            <div key={sectionKey} className="border rounded-md p-4">
              <div className="flex justify-between items-center mb-2">
                <h3 className="font-medium text-lg">{sectionTitles[sectionKey] || sectionKey}</h3>
                <button
                  onClick={() => handleCopySection(sectionKey)}
                  className="text-blue-600 hover:text-blue-800"
                >
                  Copy
                </button>
              </div>
              <div className="prose max-w-none">
                {guide.sections[sectionKey].split('\n').map((paragraph, i) => (
                  <p key={i} className={paragraph.trim() === '' ? 'my-4' : 'my-2'}>
                    {paragraph}
                  </p>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
      
      <div className="bg-blue-50 border-l-4 border-blue-500 p-4">
        <h3 className="font-medium text-lg text-blue-800 mb-2">What's Next?</h3>
        <p className="mb-2">
          Your optimized guide has been generated based on your Airbnb listing. You can now:
        </p>
        <ul className="list-disc pl-5 space-y-1">
          <li>Copy individual sections or the entire guide</li>
          <li>Paste the content directly into your Airbnb listing</li>
          <li>Make any final adjustments to personalize the content</li>
          <li>Create a new guide for another property</li>
        </ul>
      </div>
    </div>
  );
} 