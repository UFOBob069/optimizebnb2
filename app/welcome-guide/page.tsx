"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from 'next/navigation';

interface GuideSection {
  title: string;
  content: string;
}

interface Guide {
  propertyName: string;
  location: string;
  sections: GuideSection[];
}

interface SectionOption {
  id: string;
  title: string;
  description: string;
  default: boolean;
}

export default function WelcomeGuidePage() {
  const router = useRouter();
  const [url, setUrl] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [guide, setGuide] = useState<Guide | null>(null);
  const [step, setStep] = useState<"form" | "processing" | "result">("form");
  const [selectedSections, setSelectedSections] = useState<string[]>([
    'title',
    'description',
    'amenities',
    'house_rules',
    'local_area',
    'host_bio'
  ]);
  const [mounted, setMounted] = useState(false);
  
  // Available sections that can be included in the guide
  const availableSections: SectionOption[] = [
    { id: "welcome", title: "Welcome Message", description: "A personalized welcome message for your guests", default: true },
    { id: "property", title: "Property Information", description: "Details about your property, amenities, and how to use them", default: true },
    { id: "checkin", title: "Check-in/Check-out", description: "Instructions for check-in and check-out procedures", default: true },
    { id: "wifi", title: "WiFi & Entertainment", description: "WiFi password and instructions for TV/entertainment systems", default: true },
    { id: "restaurants", title: "Local Restaurants", description: "Recommended restaurants and cafes in the area", default: true },
    { id: "attractions", title: "Nearby Attractions", description: "Popular attractions and activities in the area", default: true },
    { id: "transportation", title: "Transportation", description: "Information about public transit, parking, and getting around", default: false },
    { id: "house_rules", title: "House Rules", description: "Important rules and guidelines for staying at your property", default: false },
    { id: "emergency", title: "Emergency Information", description: "Local emergency contacts and medical facilities", default: true }
  ];
  
  // Toggle a section selection
  const toggleSection = (sectionId: string) => {
    if (selectedSections.includes(sectionId)) {
      setSelectedSections(selectedSections.filter(id => id !== sectionId));
    } else {
      setSelectedSections([...selectedSections, sectionId]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate inputs
    if (!url) {
      setError("Please enter your Airbnb listing URL");
      return;
    }
    
    if (!url.includes("airbnb.com")) {
      setError("Please enter a valid Airbnb listing URL");
      return;
    }
    
    if (!email) {
      setError("Please enter your email address");
      return;
    }
    
    if (!email.includes("@") || !email.includes(".")) {
      setError("Please enter a valid email address");
      return;
    }
    
    if (!address) {
      setError("Please enter the property address");
      return;
    }
    
    if (selectedSections.length === 0) {
      setError("Please select at least one section to include in your guide");
      return;
    }
    
    setError(null);
    setLoading(true);
    setStep("processing");
    
    try {
      // Call our API endpoint to generate the guide
      const response = await fetch('/api/generate-guide', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          url, 
          email, 
          address,
          sections: selectedSections 
        }),
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to generate guide');
      }
      
      const data = await response.json();
      setGuide(data.guide);
      setStep("result");
      
      // Store the guide data in localStorage for the results page
      if (mounted) {
        localStorage.setItem('generatedGuide', JSON.stringify(data.guide));
        router.push('/welcome-guide/results');
      }
      
    } catch (err) {
      console.error('Error generating guide:', err);
      setError(err instanceof Error ? err.message : "Failed to generate guide. Please try again later.");
      setStep("form");
    } finally {
      setLoading(false);
    }
  };

  const renderProcessingSteps = () => {
    return (
      <div className="bg-white rounded-lg shadow-lg p-8 max-w-3xl mx-auto">
        <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">Generating Your Custom Welcome Guide</h2>
        
        <div className="space-y-6">
          <ProcessingStep 
            number={1} 
            title="Analyzing your Airbnb listing" 
            description="We're extracting information about your property, amenities, and location."
            status={loading ? "active" : "complete"}
          />
          
          <ProcessingStep 
            number={2} 
            title="Gathering local information" 
            description="Finding the best restaurants, attractions, and essential services near your property."
            status={loading && step === "processing" ? "active" : loading ? "waiting" : "complete"}
          />
          
          <ProcessingStep 
            number={3} 
            title="Creating your custom guide" 
            description="Our AI is writing a personalized welcome guide tailored to your property."
            status={loading && guide ? "active" : loading ? "waiting" : guide ? "complete" : "waiting"}
          />
        </div>
        
        <div className="mt-8 text-center text-sm text-gray-500">
          <p>This may take a minute or two. Please don&apos;t close this window.</p>
        </div>
      </div>
    );
  };

  const renderGuide = () => {
    if (!guide) return null;
    
    return (
      <div className="bg-white rounded-lg shadow-lg overflow-hidden max-w-4xl mx-auto">
        <div className="bg-blue-600 p-6 text-white">
          <h2 className="text-2xl font-bold">{guide.propertyName}</h2>
          <p className="text-blue-100">{guide.location}</p>
        </div>
        
        <div className="p-6">
          <div className="mb-8 flex justify-between items-center">
            <p className="text-gray-600">A custom welcome guide for your guests</p>
            <button 
              onClick={() => window.print()}
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition-colors"
            >
              Print Guide
            </button>
          </div>
          
          <div className="space-y-8">
            {guide.sections.map((section, index) => (
              <div key={index} className="border-b border-gray-200 pb-6 last:border-b-0">
                <h3 className="text-xl font-semibold text-gray-800 mb-3">{section.title}</h3>
                <div className="text-gray-600 whitespace-pre-line">{section.content}</div>
              </div>
            ))}
          </div>
          
          <div className="mt-10 pt-6 border-t border-gray-200">
            <h3 className="text-lg font-semibold text-gray-800 mb-3">Want to enhance your guide?</h3>
            <p className="text-gray-600 mb-4">
              Upgrade to our Pro plan to access premium features:
            </p>
            <ul className="list-disc pl-5 text-gray-600 mb-6 space-y-2">
              <li>Custom branding with your logo and colors</li>
              <li>Digital guide your guests can access on their phones</li>
              <li>Ability to edit and update your guide anytime</li>
              <li>Additional sections like house rules, TV instructions, etc.</li>
            </ul>
            <Link
              href="/pricing"
              className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors"
            >
              Upgrade to Pro
            </Link>
          </div>
        </div>
      </div>
    );
  };

  // Only run client-side code after component has mounted
  useEffect(() => {
    setMounted(true);
  }, []);

  // Ensure consistent rendering between server and client
  if (!mounted) {
    return <div className="min-h-screen flex items-center justify-center">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
    </div>;
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Link href="/" className="inline-flex items-center text-blue-600 hover:text-blue-800 mb-8">
          <span className="mr-2">←</span> Back to Home
        </Link>
        
        <div className="text-center mb-12">
          <h1 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
            Welcome Guide Generator
          </h1>
          <p className="mt-4 text-xl text-gray-600 max-w-3xl mx-auto">
            Create a professional welcome guide for your Airbnb guests with local recommendations and property information.
          </p>
        </div>
        
        {step === "form" && (
          <div className="bg-white rounded-lg shadow-lg p-8 max-w-3xl mx-auto">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="url" className="block text-sm font-medium text-gray-700 mb-1">
                  Your Airbnb Listing URL
                </label>
                <input
                  type="url"
                  id="url"
                  name="url"
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                  placeholder="https://www.airbnb.com/rooms/your-listing-id"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                  required
                />
                <p className="mt-1 text-sm text-gray-500">
                  We&apos;ll extract information from your listing to personalize the guide.
                </p>
              </div>
              
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                  Your Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                  required
                />
                <p className="mt-1 text-sm text-gray-500">
                  We&apos;ll send the completed guide to this email address.
                </p>
              </div>
              
              <div>
                <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-1">
                  Property Address
                </label>
                <input
                  type="text"
                  id="address"
                  name="address"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  placeholder="123 Main St, City, State, Zip"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                  required
                />
                <p className="mt-1 text-sm text-gray-500">
                  This helps us provide accurate local recommendations near your property.
                </p>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  Sections to Include
                </label>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {availableSections.map((section) => (
                    <div 
                      key={section.id}
                      className={`relative rounded-lg border p-4 cursor-pointer transition-colors ${
                        selectedSections.includes(section.id) 
                          ? "bg-blue-50 border-blue-500" 
                          : "border-gray-200 hover:border-gray-300"
                      }`}
                      onClick={() => toggleSection(section.id)}
                    >
                      <div className="flex items-start">
                        <div className="flex items-center h-5">
                          <input
                            id={`section-${section.id}`}
                            type="checkbox"
                            checked={selectedSections.includes(section.id)}
                            onChange={() => toggleSection(section.id)}
                            className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                          />
                        </div>
                        <div className="ml-3 text-sm">
                          <label htmlFor={`section-${section.id}`} className="font-medium text-gray-900">
                            {section.title}
                          </label>
                          <p className="text-gray-500">{section.description}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              
              {error && (
                <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
                  {error}
                </div>
              )}
              
              <div className="pt-4">
                <button
                  type="submit"
                  disabled={loading}
                  className={`w-full py-3 px-6 rounded-lg font-medium text-white transition-colors ${
                    loading ? "bg-blue-400 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700"
                  }`}
                >
                  {loading ? "Generating..." : "Generate Welcome Guide"}
                </button>
              </div>
              
              <div className="text-center text-sm text-gray-500 pt-2">
                By submitting, you agree to our <Link href="/terms" className="text-blue-600 hover:underline">Terms of Service</Link> and <Link href="/privacy" className="text-blue-600 hover:underline">Privacy Policy</Link>.
              </div>
            </form>
          </div>
        )}
        
        {step === "processing" && renderProcessingSteps()}
        
        {step === "result" && renderGuide()}
        
        <div className="mt-16 bg-white rounded-lg shadow-sm border border-gray-200 p-8 max-w-3xl mx-auto">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Why Create a Welcome Guide?</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">Enhance Guest Experience</h3>
              <p className="text-gray-600">
                A professional welcome guide helps guests feel at home and provides them with all the information they need for a comfortable stay.
              </p>
            </div>
            
            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">Reduce Questions</h3>
              <p className="text-gray-600">
                Answer common questions before they&apos;re asked, reducing the number of messages and calls from guests during their stay.
              </p>
            </div>
            
            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">Highlight Local Attractions</h3>
              <p className="text-gray-600">
                Showcase the best restaurants, activities, and hidden gems in your area to help guests make the most of their trip.
              </p>
            </div>
            
            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">Better Reviews</h3>
              <p className="text-gray-600">
                Properties with comprehensive welcome guides tend to receive higher ratings and more positive reviews from satisfied guests.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

interface ProcessingStepProps {
  number: number;
  title: string;
  description: string;
  status: "waiting" | "active" | "complete";
}

function ProcessingStep({ number, title, description, status }: ProcessingStepProps) {
  return (
    <div className="flex items-start">
      <div className="flex-shrink-0 mr-4">
        <div className={`h-10 w-10 rounded-full flex items-center justify-center ${
          status === "waiting" 
            ? "bg-gray-200 text-gray-500" 
            : status === "active"
            ? "bg-blue-100 text-blue-600 animate-pulse"
            : "bg-green-100 text-green-600"
        }`}>
          {status === "complete" ? (
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          ) : (
            <span className="text-sm font-medium">{number}</span>
          )}
        </div>
      </div>
      <div>
        <h3 className={`text-lg font-medium ${
          status === "waiting" 
            ? "text-gray-500" 
            : status === "active"
            ? "text-blue-600"
            : "text-green-600"
        }`}>
          {title}
        </h3>
        <p className="mt-1 text-sm text-gray-600">{description}</p>
      </div>
    </div>
  );
} 