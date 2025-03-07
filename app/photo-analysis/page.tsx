"use client";

import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";

interface PhotoFeedback {
  imageUrl: string;
  score: number;
  feedback: string;
  improvements: string[];
}

export default function PhotoAnalysisPage() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [preview, setPreview] = useState('');
  const [analysis, setAnalysis] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [activeTab, setActiveTab] = useState('upload'); // 'upload' or 'url'
  const [airbnbUrl, setAirbnbUrl] = useState('');
  const [email, setEmail] = useState('');
  const [mounted, setMounted] = useState(false);
  
  const fileInputRef = useRef(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result);
      };
      reader.readAsDataURL(file);
      setAnalysis(null);
      setError('');
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file && file.type.startsWith('image/')) {
      setSelectedFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result);
      };
      reader.readAsDataURL(file);
      setAnalysis(null);
      setError('');
    } else {
      setError('Please drop an image file.');
    }
  };

  const analyzePhoto = async () => {
    if (!selectedFile && activeTab === 'upload') {
      setError('Please select a photo to analyze.');
      return;
    }

    if (!airbnbUrl && activeTab === 'url') {
      setError('Please enter an Airbnb listing URL.');
      return;
    }

    if (!email) {
      setError('Please enter your email address.');
      return;
    }

    setLoading(true);
    setError('');

    try {
      let formData = new FormData();
      
      if (activeTab === 'upload') {
        formData.append('photo', selectedFile);
        formData.append('email', email);
        formData.append('method', 'upload');
      } else {
        formData.append('url', airbnbUrl);
        formData.append('email', email);
        formData.append('method', 'scrape');
      }

      const response = await fetch('/api/analyze-photo', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to analyze photo');
      }

      const data = await response.json();
      setAnalysis(data.analysis);
    } catch (err) {
      console.error('Error analyzing photo:', err);
      setError(err.message || 'Failed to analyze photo. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (!mounted) {
    return <div className="min-h-screen flex items-center justify-center">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
    </div>;
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-center mb-8">Airbnb Photo Analysis</h1>
      
      <div className="bg-white shadow-md rounded-lg p-6 mb-8">
        <h2 className="text-xl font-semibold mb-4">How It Works</h2>
        <p className="mb-4">
          Our AI-powered photo analyzer will evaluate your Airbnb listing photos and provide actionable feedback to improve their appeal and effectiveness.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="border-l-4 border-blue-500 pl-4">
            <h3 className="font-medium">Option 1: Upload a Photo</h3>
            <p className="text-sm text-gray-600">Upload a single photo for detailed analysis</p>
          </div>
          <div className="border-l-4 border-green-500 pl-4">
            <h3 className="font-medium">Option 2: Analyze Airbnb Listing</h3>
            <p className="text-sm text-gray-600">Enter your Airbnb URL to analyze all listing photos</p>
          </div>
        </div>
      </div>
      
      {error && (
        <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-6">
          <p className="text-red-700">{error}</p>
        </div>
      )}
      
      <div className="bg-white shadow-md rounded-lg p-6 mb-8">
        <div className="flex border-b mb-6">
          <button
            className={`px-4 py-2 font-medium ${
              activeTab === 'upload'
                ? 'text-blue-600 border-b-2 border-blue-600'
                : 'text-gray-500 hover:text-gray-700'
            }`}
            onClick={() => setActiveTab('upload')}
          >
            Upload Photo
          </button>
          <button
            className={`px-4 py-2 font-medium ${
              activeTab === 'url'
                ? 'text-blue-600 border-b-2 border-blue-600'
                : 'text-gray-500 hover:text-gray-700'
            }`}
            onClick={() => setActiveTab('url')}
          >
            Airbnb URL
          </button>
        </div>
        
        {activeTab === 'upload' ? (
          <div>
            <div
              className="border-2 border-dashed border-gray-300 rounded-lg p-8 mb-6 text-center cursor-pointer hover:bg-gray-50"
              onClick={() => fileInputRef.current.click()}
              onDragOver={handleDragOver}
              onDrop={handleDrop}
            >
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleFileChange}
                accept="image/*"
                className="hidden"
              />
              {preview ? (
                <div className="relative h-64 w-full">
                  <Image
                    src={preview}
                    alt="Preview"
                    fill
                    style={{ objectFit: 'contain' }}
                  />
                </div>
              ) : (
                <div>
                  <p className="text-gray-500 mb-2">Drag and drop your photo here, or click to select</p>
                  <p className="text-sm text-gray-400">Supports JPG, PNG, WEBP (max 10MB)</p>
                </div>
              )}
            </div>
          </div>
        ) : (
          <div className="mb-6">
            <label htmlFor="airbnbUrl" className="block text-gray-700 font-medium mb-2">
              Airbnb Listing URL*
            </label>
            <input
              type="url"
              id="airbnbUrl"
              value={airbnbUrl}
              onChange={(e) => setAirbnbUrl(e.target.value)}
              placeholder="https://www.airbnb.com/rooms/12345678"
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
            <p className="text-sm text-gray-500 mt-1">
              We&apos;ll analyze all photos from this listing
            </p>
          </div>
        )}
        
        <div className="mb-6">
          <label htmlFor="email" className="block text-gray-700 font-medium mb-2">
            Your Email Address*
          </label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="your@email.com"
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
          <p className="text-sm text-gray-500 mt-1">
            We&apos;ll send you the full analysis report
          </p>
        </div>
        
        <div className="flex justify-center">
          <button
            onClick={analyzePhoto}
            disabled={loading}
            className={`px-6 py-3 text-white font-medium rounded-md ${
              loading
                ? 'bg-blue-400 cursor-not-allowed'
                : 'bg-blue-600 hover:bg-blue-700'
            }`}
          >
            {loading ? (
              <div className="flex items-center">
                <div className="animate-spin mr-2 h-5 w-5 border-t-2 border-b-2 border-white rounded-full"></div>
                Analyzing...
              </div>
            ) : (
              'Analyze Photo'
            )}
          </button>
        </div>
      </div>
      
      {analysis && (
        <div className="bg-white shadow-md rounded-lg p-6">
          <h2 className="text-xl font-semibold mb-4">Photo Analysis Results</h2>
          
          <div className="mb-6">
            <h3 className="font-medium text-lg mb-2">Overall Score</h3>
            <div className="flex items-center">
              <div className="w-full bg-gray-200 rounded-full h-4 mr-2">
                <div
                  className={`h-4 rounded-full ${
                    analysis.overallScore >= 80
                      ? 'bg-green-500'
                      : analysis.overallScore >= 60
                      ? 'bg-yellow-500'
                      : 'bg-red-500'
                  }`}
                  style={{ width: `${analysis.overallScore}%` }}
                ></div>
              </div>
              <span className="font-bold">{analysis.overallScore}/100</span>
            </div>
          </div>
          
          <div className="mb-6">
            <h3 className="font-medium text-lg mb-2">Strengths</h3>
            <ul className="list-disc pl-5 space-y-1">
              {analysis.strengths.map((strength, index) => (
                <li key={index} className="text-green-700">{strength}</li>
              ))}
            </ul>
          </div>
          
          <div className="mb-6">
            <h3 className="font-medium text-lg mb-2">Areas for Improvement</h3>
            <ul className="list-disc pl-5 space-y-1">
              {analysis.improvements.map((improvement, index) => (
                <li key={index} className="text-red-700">{improvement}</li>
              ))}
            </ul>
          </div>
          
          <div className="mb-6">
            <h3 className="font-medium text-lg mb-2">Recommendations</h3>
            <ul className="list-disc pl-5 space-y-1">
              {analysis.recommendations.map((recommendation, index) => (
                <li key={index} className="text-blue-700">{recommendation}</li>
              ))}
            </ul>
          </div>
          
          <div>
            <h3 className="font-medium text-lg mb-2">Category Scores</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {analysis.categoryScores.map((category, index) => (
                <div key={index} className="border rounded-md p-3">
                  <div className="flex justify-between mb-1">
                    <span className="font-medium">{category.name}</span>
                    <span className="font-bold">{category.score}/10</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className={`h-2 rounded-full ${
                        category.score >= 8
                          ? 'bg-green-500'
                          : category.score >= 6
                          ? 'bg-yellow-500'
                          : 'bg-red-500'
                      }`}
                      style={{ width: `${category.score * 10}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
      
      <div className="mt-10 bg-blue-50 rounded-lg p-6">
        <h2 className="text-xl font-semibold mb-4">Why Photo Quality Matters</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <h3 className="font-medium text-lg mb-2">Higher Booking Rates</h3>
            <p>Listings with professional, high-quality photos receive up to 24% more bookings than those with amateur photos.</p>
          </div>
          <div>
            <h3 className="font-medium text-lg mb-2">Premium Pricing</h3>
            <p>Properties with excellent photography can command 5-15% higher nightly rates than similar properties with poor photos.</p>
          </div>
          <div>
            <h3 className="font-medium text-lg mb-2">Guest Expectations</h3>
            <p>Clear, accurate photos set proper expectations and lead to better reviews and fewer complaints.</p>
          </div>
          <div>
            <h3 className="font-medium text-lg mb-2">Search Ranking</h3>
            <p>Airbnb's algorithm favors listings with high-quality, diverse photos that showcase the property well.</p>
          </div>
        </div>
      </div>
    </div>
  );
} 