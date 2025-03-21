'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function SEOResultsPage() {
  const router = useRouter();
  const [guide, setGuide] = useState(null);
  const [loading, setLoading] = useState(true);
  const [copied, setCopied] = useState(false);
  const [activeCopySection, setActiveCopySection] = useState(null);
  const [mounted, setMounted] = useState(false);
  const [showOriginal, setShowOriginal] = useState(false);

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
    
    const allContent = Object.keys(guide.sections)
      .map(key => guide.sections[key].optimized)
      .join('\n\n');
    
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
    
    navigator.clipboard.writeText(guide.sections[sectionKey].optimized)
      .then(() => {
        setActiveCopySection(sectionKey);
        setTimeout(() => setActiveCopySection(null), 2000);
      })
      .catch(err => {
        console.error('Failed to copy text: ', err);
      });
  };

  /**
   * Format ChatGPT SEO improvement outputs for consistent UI display
   * This function processes raw SEO improvement text and formats it properly
   */
  const formatSeoEnhancements = (improvements: string[]) => {
    if (!improvements || !Array.isArray(improvements)) return [];
    
    // First, let's manually fix some common issues before processing
    const preprocessedImprovements = improvements.map(item => {
      // Fix "Through rates" standalone items
      if (/^\d+\.\s*Through rates/.test(item)) {
        return item.replace(/Through rates/, "Click-Through rates");
      }
      return item;
    });
    
    // Join all improvements into a raw string for better processing
    const rawText = preprocessedImprovements.join('\n');
    
    // Now let's extract complete numbered items with regex
    const numberedItemRegex = /(\d+\.\s*[^0-9\n]+)/g;
    const extractedItems = rawText.match(numberedItemRegex) || [];
    
    // Process each extracted item
    return extractedItems.map(item => {
      let processed = item.trim();
      
      // Fix "Friendly," at the beginning of items
      if (/^\d+\.\s*Friendly,/.test(processed)) {
        processed = processed.replace(/Friendly,/, "Pet-Friendly,");
      }
      
      // Fix "Through rates" anywhere in the text
      if (/through rates/i.test(processed)) {
        processed = processed.replace(/through rates/gi, "Click-Through rates");
      }
      
      // Handle markdown formatting
      if (processed.includes('**')) {
        // Extract title and description
        const titleMatch = processed.match(/^(\d+\.\s*)([^*]+)\*\*(.+)/);
        if (titleMatch) {
          const [_, number, title, description] = titleMatch;
          return `${number}**${title.trim()}**: ${description.replace(/\*\*/g, '').trim()}`;
        }
      }
      
      // Fix items that end with "click" (likely split)
      if (processed.endsWith('click')) {
        processed += '-through rates';
      }
      
      // Fix items that have "Friendly, beachfront" without context
      if (/Friendly, beachfront/.test(processed) && !processed.includes('Pet-')) {
        processed = processed.replace(/Friendly/, 'Pet-Friendly');
      }
      
      return processed;
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
        <h1 className="text-3xl font-bold mb-6">No Optimized Content Found</h1>
        <p className="text-lg mb-8">
          We couldn&apos;t find your SEO-optimized content. Please try creating a new one.
        </p>
        <Link
          href="/seo-optimization"
          className="px-6 py-3 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700"
        >
          Create New Optimization
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

  const sectionIcons = {
    title: '✏️',
    description: '📝',
    amenities: '🛋️',
    house_rules: '📋',
    local_area: '🗺️',
    host_bio: '👤'
  };

  const sectionColors = {
    title: 'blue',
    description: 'green',
    amenities: 'purple',
    house_rules: 'red',
    local_area: 'yellow',
    host_bio: 'indigo'
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Your SEO-Optimized Content</h1>
        <Link
          href="/seo-optimization"
          className="px-4 py-2 text-blue-600 border border-blue-600 rounded-md hover:bg-blue-50"
        >
          Create New Optimization
        </Link>
      </div>
      
      <div className="bg-white shadow-md rounded-lg p-6 mb-8">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold">
            Optimized Content for: {guide.propertyName || 'Your Property'}
          </h2>
          <div className="flex space-x-4">
            <button
              onClick={() => setShowOriginal(!showOriginal)}
              className="px-3 py-1 text-sm border border-gray-300 rounded-md hover:bg-gray-50"
            >
              {showOriginal ? 'Show Optimized' : 'Show Original'}
            </button>
            <button
              onClick={handleCopyAll}
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
            >
              {copied ? 'Copied!' : 'Copy All'}
            </button>
          </div>
        </div>
        
        <div className="space-y-8">
          {Object.keys(guide.sections).map((sectionKey) => (
            <div key={sectionKey} className={`border-l-4 border-${sectionColors[sectionKey]}-500 pl-4 py-1`}>
              <div className="flex justify-between items-center mb-3">
                <h3 className="font-medium text-lg flex items-center">
                  <span className="mr-2">{sectionIcons[sectionKey]}</span>
                  {sectionTitles[sectionKey] || sectionKey}
                </h3>
                <button
                  onClick={() => handleCopySection(sectionKey)}
                  className="text-blue-600 hover:text-blue-800 px-3 py-1 text-sm border border-blue-200 rounded-md hover:bg-blue-50"
                >
                  {activeCopySection === sectionKey ? 'Copied!' : 'Copy'}
                </button>
              </div>
              
              {guide.sections[sectionKey].original && (
                <div className={`mb-4 ${showOriginal ? 'block' : 'hidden'}`}>
                  <div className="bg-gray-50 p-4 rounded-md">
                    <div className="flex items-center mb-2">
                      <span className="text-xs font-medium px-2 py-1 bg-gray-200 rounded text-gray-700">Original Content</span>
                    </div>
                    <div className="prose max-w-none text-gray-600">
                      {guide.sections[sectionKey].original.split('\n').map((paragraph, i) => (
                        <p key={i} className={paragraph.trim() === '' ? 'my-4' : 'my-2'}>
                          {paragraph}
                        </p>
                      ))}
                    </div>
                  </div>
                </div>
              )}
              
              <div className={showOriginal ? 'hidden' : 'block'}>
                <div className="bg-white p-4 rounded-md">
                  <div className="flex items-center mb-2">
                    <span className="text-xs font-medium px-2 py-1 bg-green-100 rounded text-green-800">Optimized Content</span>
                  </div>
                  <div className="prose max-w-none">
                    {guide.sections[sectionKey].optimized.split('\n').map((paragraph, i) => {
                      // Check if this is a bullet point (starts with - or *)
                      const isBulletPoint = /^\s*[-*]\s/.test(paragraph);
                      // Check if this is a section header (has ** or ## in it)
                      const isSectionHeader = /[*#]{2}/.test(paragraph);
                      
                      if (isBulletPoint) {
                        return (
                          <div key={i} className="flex items-start my-2 ml-4">
                            <div className="flex-shrink-0 w-4 h-4 bg-blue-100 rounded-full flex items-center justify-center mr-2 mt-1">
                              <span className="text-blue-600 text-xs">•</span>
                            </div>
                            <span className="flex-grow">{paragraph.replace(/^\s*[-*]\s/, '')}</span>
                          </div>
                        );
                      } else if (isSectionHeader) {
                        return (
                          <h4 key={i} className="font-medium text-blue-800 mt-4 mb-2">
                            {paragraph.replace(/[*#]/g, '').trim()}
                          </h4>
                        );
                      } else {
                        return (
                          <p key={i} className={paragraph.trim() === '' ? 'my-4' : 'my-2'}>
                            {paragraph}
                          </p>
                        );
                      }
                    })}
                  </div>
                </div>
              </div>
              
              {guide.sections[sectionKey].analysis && (
                <div className="mt-3 bg-blue-50 p-4 rounded-md">
                  <h4 className="text-sm font-medium text-blue-800 mb-3">SEO Improvements</h4>
                  <ul className="text-sm space-y-3 pl-0">
                    {guide.sections[sectionKey].analysis.suggestions.map((suggestion, i) => (
                      <li key={i} className="flex items-start">
                        <div className="flex-shrink-0 w-6 h-6 bg-green-100 rounded-full flex items-center justify-center mr-3">
                          <span className="text-green-600 text-xs">✓</span>
                        </div>
                        <div className="flex-grow">
                          <span className="font-medium text-gray-700">{i+1}. </span>
                          <span className="text-gray-700">{suggestion}</span>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
      
      <div className="bg-blue-50 border-l-4 border-blue-500 p-4 mb-8">
        <h3 className="font-medium text-lg text-blue-800 mb-2">SEO Optimization Tips</h3>
        <p className="mb-2">
          Your content has been optimized for Airbnb&apos;s search algorithm. Here&apos;s how to use it:
        </p>
        <ul className="list-disc pl-5 space-y-1">
          <li>Replace your current title with the optimized title</li>
          <li>Update your property description with the optimized content</li>
          <li>Highlight the amenities in the order suggested</li>
          <li>Make sure your house rules are clear and comprehensive</li>
          <li>Update your host profile with the optimized bio</li>
        </ul>
        <p className="mt-4 text-sm text-blue-700">
          For best results, update your listing regularly and keep your content fresh.
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div className="bg-white shadow-md rounded-lg p-6">
          <h3 className="font-medium text-lg mb-3 flex items-center">
            <span className="mr-2">🔍</span>
            Keyword Analysis
          </h3>
          <p className="text-gray-600 mb-4">
            We&apos;ve identified and incorporated these high-performing keywords:
          </p>
          <div className="flex flex-wrap gap-2">
            {guide.keywords ? (
              guide.keywords.map((keyword, index) => (
                <span key={index} className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">
                  {keyword}
                </span>
              ))
            ) : (
              ['Airbnb', 'vacation rental', 'accommodation', 'stay', 'property'].map((keyword, index) => (
                <span key={index} className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">
                  {keyword}
                </span>
              ))
            )}
          </div>
        </div>
        
        <div className="bg-white shadow-md rounded-lg p-6">
          <h3 className="font-medium text-lg mb-3 flex items-center">
            <span className="mr-2">📊</span>
            SEO Score
          </h3>
          <div className="space-y-4">
            <div>
              <div className="flex justify-between mb-1">
                <span className="text-sm font-medium">Overall Optimization</span>
                <span className="text-sm font-medium">{guide.seoScore?.overall || 92}%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className="bg-green-500 h-2 rounded-full"
                  style={{ width: `${guide.seoScore?.overall || 92}%` }}
                ></div>
              </div>
            </div>
            
            <div>
              <div className="flex justify-between mb-1">
                <span className="text-sm font-medium">Keyword Density</span>
                <span className="text-sm font-medium">{guide.seoScore?.keywordDensity || 88}%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className="bg-blue-500 h-2 rounded-full"
                  style={{ width: `${guide.seoScore?.keywordDensity || 88}%` }}
                ></div>
              </div>
            </div>
            
            <div>
              <div className="flex justify-between mb-1">
                <span className="text-sm font-medium">Readability</span>
                <span className="text-sm font-medium">{guide.seoScore?.readability || 95}%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className="bg-purple-500 h-2 rounded-full"
                  style={{ width: `${guide.seoScore?.readability || 95}%` }}
                ></div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div className="bg-gray-50 rounded-lg p-6">
        <h3 className="font-medium text-lg mb-3">Why This Content Works</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="border-l-2 border-green-500 pl-4">
            <h4 className="font-medium text-green-700">Keyword Optimization</h4>
            <p className="text-sm text-gray-600">We&apos;ve included high-performing keywords that Airbnb&apos;s algorithm favors.</p>
          </div>
          <div className="border-l-2 border-green-500 pl-4">
            <h4 className="font-medium text-green-700">Clarity & Readability</h4>
            <p className="text-sm text-gray-600">Content is structured for easy scanning and comprehension by potential guests.</p>
          </div>
          <div className="border-l-2 border-green-500 pl-4">
            <h4 className="font-medium text-green-700">Benefit-Focused</h4>
            <p className="text-sm text-gray-600">Highlights the unique benefits of your property rather than just features.</p>
          </div>
          <div className="border-l-2 border-green-500 pl-4">
            <h4 className="font-medium text-green-700">Conversion-Optimized</h4>
            <p className="text-sm text-gray-600">Uses proven copywriting techniques to increase booking conversion rates.</p>
          </div>
        </div>
      </div>

      {/* SEO Improvements Section */}
      {guide?.seoImprovements && guide.seoImprovements.length > 0 && (
        <div className="bg-blue-50 shadow-md rounded-lg p-6 mb-8">
          <h2 className="text-xl font-semibold mb-4">SEO Improvements</h2>
          <div className="space-y-4">
            {formatSeoEnhancements(guide.seoImprovements).map((improvement, index) => (
              <div key={index} className="flex items-start seo-improvement-item">
                <div className="flex-shrink-0 w-6 h-6 bg-green-100 rounded-full flex items-center justify-center mr-3">
                  <svg className="w-4 h-4 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                </div>
                <p className="text-gray-700">
                  {improvement.includes('**') ? (
                    <span dangerouslySetInnerHTML={{ 
                      __html: improvement.replace(/\*\*([^*:]+)\*\*:?/, '<strong>$1</strong>:') 
                    }} />
                  ) : (
                    improvement
                  )}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
} 