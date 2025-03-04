"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";

interface AnalysisResult {
  pros: string[];
  cons: string[];
  recommendations: string[];
  photosPros: string[];
  photosImprovements: string[];
  guestReviewsRatingsWhy: string[];
  guestReviewsRatingsTips: string[];
  headlineWhy: string[];
  headlineTips: string[];
  descriptionWhy: string[];
  descriptionTips: string[];
  amenitiesWhy: string[];
  amenitiesTips: string[];
  seoWhy: string[];
  seoTips: string[];
  listingScore: string | null;
}

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      {/* Hero Section */}
      <header className="relative bg-blue-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-32">
          <div className="md:w-2/3">
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">
              Optimize Your Airbnb Listing for Maximum Success
            </h1>
            <p className="text-xl md:text-2xl mb-8">
              AI-powered tools to boost your bookings, improve guest experience, and increase your revenue.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link 
                href="/analyze" 
                className="bg-white text-blue-600 hover:bg-blue-50 font-semibold px-6 py-3 rounded-lg text-center transition-colors"
              >
                Analyze My Listing
              </Link>
              <Link 
                href="#features" 
                className="bg-blue-700 hover:bg-blue-800 px-6 py-3 rounded-lg text-center transition-colors"
              >
                Explore Features
              </Link>
            </div>
          </div>
        </div>
        <div className="absolute bottom-0 right-0 w-full md:w-1/2 h-64 md:h-full opacity-10 md:opacity-20">
          <Image 
            src="/hero-pattern.svg" 
            alt="Background pattern" 
            fill 
            className="object-cover"
            priority
          />
        </div>
      </header>

      {/* Stats Section */}
      <section className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center p-6 rounded-lg border border-gray-100 shadow-sm">
              <p className="text-4xl font-bold text-blue-600 mb-2">32%</p>
              <p className="text-gray-600">Average booking increase after optimization</p>
            </div>
            <div className="text-center p-6 rounded-lg border border-gray-100 shadow-sm">
              <p className="text-4xl font-bold text-blue-600 mb-2">4.8★</p>
              <p className="text-gray-600">Average rating improvement</p>
            </div>
            <div className="text-center p-6 rounded-lg border border-gray-100 shadow-sm">
              <p className="text-4xl font-bold text-blue-600 mb-2">5,000+</p>
              <p className="text-gray-600">Listings optimized</p>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Powerful Tools for Airbnb Hosts
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Our AI-powered platform provides everything you need to optimize your listing and delight your guests.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Welcome Guide Feature */}
            <FeatureCard 
              title="Custom Welcome Guide" 
              description="Create a personalized welcome guide based on your location. Highlight local attractions, emergency services, and house rules."
              icon="📍"
              href="/welcome-guide"
              ctaText="Create Guide"
            />

            {/* Photo Analysis Feature */}
            <FeatureCard 
              title="Photo Analysis" 
              description="Get professional feedback on your listing photos. Learn how to improve image quality, staging, and appeal to potential guests."
              icon="📸"
              href="/photo-analysis"
              ctaText="Analyze Photos"
            />

            {/* SEO Optimization Feature */}
            <FeatureCard 
              title="SEO Optimization" 
              description="Optimize your title and description to rank higher in search results and attract more bookings."
              icon="🔍"
              href="/seo-optimization"
              ctaText="Optimize SEO"
            />

            {/* Review Analysis Feature */}
            <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
              <div className="flex items-center mb-4">
                <div className="text-4xl mr-4">⭐</div>
                <h2 className="text-2xl font-semibold">Review Analysis</h2>
              </div>
              <p className="text-gray-600 mb-4">
                <span className="bg-yellow-100 text-yellow-800 px-2 py-1 rounded text-sm font-medium">Coming Soon</span>
              </p>
              <p className="text-gray-600 mb-6">
                Our review analysis feature is coming soon! We're working on enhancing our platform to provide you with valuable insights from guest reviews.
              </p>
              <button
                className="text-blue-500 hover:text-blue-700 font-medium flex items-center opacity-50 cursor-not-allowed"
                disabled
              >
                Analyze Reviews <span className="ml-1">→</span>
              </button>
            </div>

            {/* Pricing Strategy Feature */}
            <FeatureCard 
              title="Pricing Strategy" 
              description="Get data-driven recommendations for optimal pricing based on seasonality, local events, and competition."
              icon="💰"
              href="/pricing-strategy"
              ctaText="Optimize Pricing"
            />

            {/* Amenity Recommendations Feature */}
            <FeatureCard 
              title="Amenity Recommendations" 
              description="Discover which amenities will have the biggest impact on your bookings and guest satisfaction."
              icon="🛋️"
              href="/amenity-recommendations"
              ctaText="Get Recommendations"
            />
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              How It Works
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Optimizing your Airbnb listing has never been easier
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center p-6">
              <div className="w-16 h-16 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">1</div>
              <h3 className="text-xl font-semibold mb-2">Enter Your Listing URL</h3>
              <p className="text-gray-600">Simply paste your Airbnb listing URL and let our AI do the rest</p>
            </div>
            <div className="text-center p-6">
              <div className="w-16 h-16 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">2</div>
              <h3 className="text-xl font-semibold mb-2">Get Detailed Analysis</h3>
              <p className="text-gray-600">Our AI analyzes every aspect of your listing and provides actionable insights</p>
            </div>
            <div className="text-center p-6">
              <div className="w-16 h-16 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">3</div>
              <h3 className="text-xl font-semibold mb-2">Implement Recommendations</h3>
              <p className="text-gray-600">Follow our personalized recommendations to improve your listing and boost bookings</p>
            </div>
          </div>

          <div className="text-center mt-12">
            <Link 
              href="/analyze" 
              className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-8 py-4 rounded-lg inline-block transition-colors"
            >
              Analyze My Listing Now
            </Link>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              What Hosts Are Saying
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Join thousands of successful hosts who have transformed their Airbnb business
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <TestimonialCard 
              quote="After implementing the photo recommendations, my booking rate increased by 40%. The AI suggestions were spot on!"
              author="Sarah T."
              location="Miami, FL"
            />
            <TestimonialCard 
              quote="The welcome guide generator saved me hours of work and my guests love the personalized recommendations."
              author="Michael R."
              location="Austin, TX"
            />
            <TestimonialCard 
              quote="The SEO optimization helped my listing rank on the first page for my area. My occupancy rate is now at 95%!"
              author="Jennifer L."
              location="Portland, OR"
            />
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-blue-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Ready to Optimize Your Airbnb Listing?
          </h2>
          <p className="text-xl mb-8 max-w-3xl mx-auto">
            Join thousands of hosts who are maximizing their earnings and delighting their guests.
          </p>
          <Link 
            href="/analyze" 
            className="bg-white text-blue-600 hover:bg-blue-50 font-semibold px-8 py-4 rounded-lg inline-block transition-colors"
          >
            Get Started for Free
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-xl font-bold mb-4">OptimizeBnb.AI</h3>
              <p className="text-gray-400">
                AI-powered tools to help Airbnb hosts maximize their success.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Features</h4>
              <ul className="space-y-2">
                <li><Link href="/welcome-guide" className="text-gray-400 hover:text-white">Welcome Guide</Link></li>
                <li><Link href="/photo-analysis" className="text-gray-400 hover:text-white">Photo Analysis</Link></li>
                <li><Link href="/seo-optimization" className="text-gray-400 hover:text-white">SEO Optimization</Link></li>
                <li><Link href="/review-analysis" className="text-gray-400 hover:text-white">Review Analysis</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Resources</h4>
              <ul className="space-y-2">
                <li><Link href="/blog" className="text-gray-400 hover:text-white">Blog</Link></li>
                <li><Link href="/guides" className="text-gray-400 hover:text-white">Host Guides</Link></li>
                <li><Link href="/faq" className="text-gray-400 hover:text-white">FAQ</Link></li>
                <li><Link href="/support" className="text-gray-400 hover:text-white">Support</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Company</h4>
              <ul className="space-y-2">
                <li><Link href="/about" className="text-gray-400 hover:text-white">About Us</Link></li>
                <li><Link href="/contact" className="text-gray-400 hover:text-white">Contact</Link></li>
                <li><Link href="/privacy" className="text-gray-400 hover:text-white">Privacy Policy</Link></li>
                <li><Link href="/terms" className="text-gray-400 hover:text-white">Terms of Service</Link></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-400">
            <p>© {new Date().getFullYear()} OptimizeBnb.AI. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

// Feature Card Component
function FeatureCard({ 
  title, 
  description, 
  icon, 
  href, 
  ctaText 
}: { 
  title: string; 
  description: string; 
  icon: string; 
  href: string; 
  ctaText: string; 
}) {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden transition-all hover:shadow-md">
      <div className="p-6">
        <div className="text-4xl mb-4">{icon}</div>
        <h3 className="text-xl font-semibold mb-2">{title}</h3>
        <p className="text-gray-600 mb-6">{description}</p>
        <Link 
          href={href} 
          className="text-blue-600 hover:text-blue-800 font-medium inline-flex items-center"
        >
          {ctaText} <span className="ml-1">→</span>
        </Link>
      </div>
    </div>
  );
}

// Testimonial Card Component
function TestimonialCard({ 
  quote, 
  author, 
  location 
}: { 
  quote: string; 
  author: string; 
  location: string; 
}) {
  return (
    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
      <div className="text-2xl text-gray-400 mb-4">"</div>
      <p className="text-gray-700 mb-4">{quote}</p>
      <div>
        <p className="font-semibold">{author}</p>
        <p className="text-gray-500 text-sm">{location}</p>
      </div>
    </div>
  );
}