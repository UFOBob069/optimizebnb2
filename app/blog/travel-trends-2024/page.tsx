"use client";

import Image from "next/image";
import Link from "next/link";
import { FaFacebook, FaTwitter, FaLinkedin } from "react-icons/fa";

export default function TravelTrends2025() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <div className="relative h-[50vh] bg-teal-600">
        <div className="absolute inset-0 bg-gradient-to-r from-teal-900/70 to-teal-600/70 z-10" />
        <Image
          src="/images/blog/travel-trends-2025-hero.jpg"
          alt="Travel Trends 2025"
          fill
          className="object-cover"
          priority
        />
        <div className="relative z-20 max-w-5xl mx-auto px-4 h-full flex flex-col justify-center text-white">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Travel Trends 2025
          </h1>
          <p className="text-xl md:text-2xl">
            The biggest shifts shaping how we explore the world in the coming year.
          </p>
        </div>
      </div>

      {/* Author and Article Info */}
      <div className="max-w-4xl mx-auto px-4 py-8 flex flex-col md:flex-row justify-between items-center border-b border-gray-200">
        <div className="flex items-center mb-4 md:mb-0">
          <div className="w-12 h-12 rounded-full overflow-hidden mr-4">
            <Image
              src="/images/blog/emily-johnson.jpg"
              alt="Emily Johnson"
              width={48}
              height={48}
              className="object-cover"
            />
          </div>
          <div>
            <p className="font-semibold">Emily Johnson</p>
            <p className="text-gray-600 text-sm">Travel Industry Analyst</p>
          </div>
        </div>
        <div className="flex items-center space-x-4">
          <div className="text-gray-600 text-sm flex items-center mr-6">
            <span className="mr-2">12 min read</span>
            <span>•</span>
            <span className="ml-2">20.1k views</span>
          </div>
          <div className="flex space-x-2">
            <button className="p-2 bg-teal-100 text-teal-600 rounded-full hover:bg-teal-200 transition-colors">
              <FaFacebook />
            </button>
            <button className="p-2 bg-teal-100 text-teal-600 rounded-full hover:bg-teal-200 transition-colors">
              <FaTwitter />
            </button>
            <button className="p-2 bg-teal-100 text-teal-600 rounded-full hover:bg-teal-200 transition-colors">
              <FaLinkedin />
            </button>
          </div>
        </div>
      </div>

      {/* Article Content */}
      <article className="max-w-4xl mx-auto px-4 py-12">
        <div className="prose prose-lg max-w-none">
          <h2>What’s Changing in Travel for 2025?</h2>
          <p>
            The way we travel is evolving rapidly, influenced by technology, sustainability, and shifting traveler
            preferences. 2025 will bring exciting new trends that redefine the travel experience for both leisure
            and business travelers.
          </p>
          
          <h2>Key Travel Trends for 2025</h2>
          <p>
            Here are the major trends that will shape travel in the upcoming year.
          </p>
          
          <h3>1. AI-Powered Travel Planning</h3>
          <p>
            Artificial intelligence is making travel planning smarter and more personalized. AI-driven itinerary
            builders, chatbot-assisted bookings, and predictive pricing models are streamlining the way travelers
            book and experience trips.
          </p>

          <h3>2. Sustainable & Eco-Conscious Travel</h3>
          <p>
            More travelers are prioritizing sustainability, seeking eco-friendly accommodations, carbon offset
            programs, and destinations that promote conservation efforts. Green certifications and renewable
            energy-powered hotels are on the rise.
          </p>

          <h3>3. Work-from-Anywhere Boom</h3>
          <p>
            The digital nomad lifestyle is thriving as remote work policies remain flexible. More destinations are
            offering long-stay visas, co-living spaces, and fast Wi-Fi to cater to location-independent professionals.
          </p>

          <h3>4. Experiential & Adventure Travel</h3>
          <p>
            Travelers are moving away from traditional sightseeing and opting for immersive experiences. Wildlife
            safaris, cultural exchanges, and hands-on activities like culinary tours and artisan workshops are in demand.
          </p>

          <h3>5. Hyper-Personalized Travel</h3>
          <p>
            From custom-curated itineraries to hotels using AI to adjust room settings to guests’ preferences,
            hyper-personalization is becoming the new standard in hospitality.
          </p>

          <h3>6. Space Tourism on the Horizon</h3>
          <p>
            With major advancements in commercial space travel, companies like SpaceX and Blue Origin are bringing
            suborbital trips closer to reality for high-net-worth travelers.
          </p>

          <h2>What These Trends Mean for Travelers</h2>
          <p>
            The future of travel in 2025 promises greater convenience, personalization, and sustainability.
            Whether you're a casual vacationer or a frequent flyer, staying ahead of these trends will ensure
            more enriching and seamless travel experiences.
          </p>
        </div>
      </article>
    </div>
  );
}
