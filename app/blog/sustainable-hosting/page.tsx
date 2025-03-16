"use client";

import Image from "next/image";
import Link from "next/link";
import { FaFacebook, FaTwitter, FaLinkedin } from "react-icons/fa";

export default function SustainableHousingGuide() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <div className="relative h-[50vh] bg-green-600">
        <div className="absolute inset-0 bg-gradient-to-r from-green-900/70 to-green-600/70 z-10" />
        <Image
          src="/images/blog/sustainable-housing-hero.jpg"
          alt="Sustainable Housing"
          fill
          className="object-cover"
          priority
        />
        <div className="relative z-20 max-w-5xl mx-auto px-4 h-full flex flex-col justify-center text-white">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            The Future of Sustainable Housing
          </h1>
          <p className="text-xl md:text-2xl">
            How eco-friendly homes are redefining modern living through innovation, efficiency, and sustainability.
          </p>
        </div>
      </div>

      {/* Author and Article Info */}
      <div className="max-w-4xl mx-auto px-4 py-8 flex flex-col md:flex-row justify-between items-center border-b border-gray-200">
        <div className="flex items-center mb-4 md:mb-0">
          <div className="w-12 h-12 rounded-full overflow-hidden mr-4">
            <Image
              src="/images/blog/jane-doe.jpg"
              alt="Jane Doe"
              width={48}
              height={48}
              className="object-cover"
            />
          </div>
          <div>
            <p className="font-semibold">Jane Doe</p>
            <p className="text-gray-600 text-sm">Sustainable Living Advocate</p>
          </div>
        </div>
        <div className="flex items-center space-x-4">
          <div className="text-gray-600 text-sm flex items-center mr-6">
            <span className="mr-2">12 min read</span>
            <span>•</span>
            <span className="ml-2">18.3k views</span>
          </div>
          <div className="flex space-x-2">
            <button className="p-2 bg-green-100 text-green-600 rounded-full hover:bg-green-200 transition-colors">
              <FaFacebook />
            </button>
            <button className="p-2 bg-green-100 text-green-600 rounded-full hover:bg-green-200 transition-colors">
              <FaTwitter />
            </button>
            <button className="p-2 bg-green-100 text-green-600 rounded-full hover:bg-green-200 transition-colors">
              <FaLinkedin />
            </button>
          </div>
        </div>
      </div>

      {/* Article Content */}
      <article className="max-w-4xl mx-auto px-4 py-12">
        <div className="prose prose-lg max-w-none">
          <h2>What Makes a Home Sustainable?</h2>
          <p>
            Sustainable housing isn’t just about reducing environmental impact—it’s about creating energy-efficient,
            cost-effective, and comfortable homes that last for generations. Modern sustainable homes integrate
            cutting-edge technology with eco-friendly materials to minimize their carbon footprint while maximizing
            livability.
          </p>
          
          <h2>Key Features of Sustainable Homes</h2>
          <p>
            Sustainable housing incorporates a variety of innovative solutions. Here are some of the key elements
            that define an eco-friendly home:
          </p>
          
          <h3>1. Energy Efficiency</h3>
          <p>
            Energy-efficient homes are designed to consume less power through superior insulation, high-performance
            windows, and smart home automation. Solar panels, geothermal heating, and energy-efficient appliances
            are increasingly common in modern sustainable designs.
          </p>

          <h3>2. Water Conservation</h3>
          <p>
            Low-flow plumbing fixtures, rainwater harvesting systems, and greywater recycling reduce water waste.
            These solutions help homeowners conserve water while lowering their utility bills.
          </p>

          <h3>3. Sustainable Building Materials</h3>
          <p>
            Eco-friendly homes use renewable and recycled materials such as bamboo flooring, reclaimed wood, and
            low-VOC paints. These materials reduce environmental impact and improve indoor air quality.
          </p>

          <h3>4. Smart Home Technology</h3>
          <p>
            Automated systems optimize energy use by adjusting lighting, heating, and cooling based on real-time
            occupancy and weather conditions. These systems enhance comfort while reducing energy waste.
          </p>

          <h3>5. Passive Design</h3>
          <p>
            Passive design strategies, such as strategic window placement and thermal mass materials, help regulate
            indoor temperatures naturally. This reduces reliance on heating and cooling systems, leading to lower
            energy consumption.
          </p>

          <h2>Benefits of Sustainable Housing</h2>
          <div className="my-8 bg-green-50 p-6 rounded-xl">
            <h3 className="text-xl font-semibold text-green-800 mb-3">Why Go Green?</h3>
            <ul className="list-disc pl-5 space-y-2">
              <li>Lower energy and water bills</li>
              <li>Reduced carbon footprint</li>
              <li>Healthier indoor living environment</li>
              <li>Increased home value and resale appeal</li>
              <li>Contribution to environmental conservation</li>
            </ul>
          </div>
        </div>
      </article>
    </div>
  );
}
