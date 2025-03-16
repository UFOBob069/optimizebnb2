"use client";

import Image from "next/image";
import Link from "next/link";
import { FaFacebook, FaTwitter, FaLinkedin } from "react-icons/fa";

export default function GuestCommunicationTemplates() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <div className="relative h-[50vh] bg-indigo-600">
        <div className="absolute inset-0 bg-gradient-to-r from-indigo-900/70 to-indigo-600/70 z-10" />
        <Image
          src="/images/blog/guest-communication-hero.jpg"
          alt="Guest Communication"
          fill
          className="object-cover"
          priority
        />
        <div className="relative z-20 max-w-5xl mx-auto px-4 h-full flex flex-col justify-center text-white">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Guest Communication Templates
          </h1>
          <p className="text-xl md:text-2xl">
            The essential message templates every host needs for seamless guest communication and better reviews.
          </p>
        </div>
      </div>

      {/* Author and Article Info */}
      <div className="max-w-4xl mx-auto px-4 py-8 flex flex-col md:flex-row justify-between items-center border-b border-gray-200">
        <div className="flex items-center mb-4 md:mb-0">
          <div className="w-12 h-12 rounded-full overflow-hidden mr-4">
            <Image
              src="/images/blog/alex-smith.jpg"
              alt="Alex Smith"
              width={48}
              height={48}
              className="object-cover"
            />
          </div>
          <div>
            <p className="font-semibold">Alex Smith</p>
            <p className="text-gray-600 text-sm">Hospitality Expert & Host Trainer</p>
          </div>
        </div>
        <div className="flex items-center space-x-4">
          <div className="text-gray-600 text-sm flex items-center mr-6">
            <span className="mr-2">10 min read</span>
            <span>•</span>
            <span className="ml-2">15.7k views</span>
          </div>
          <div className="flex space-x-2">
            <button className="p-2 bg-indigo-100 text-indigo-600 rounded-full hover:bg-indigo-200 transition-colors">
              <FaFacebook />
            </button>
            <button className="p-2 bg-indigo-100 text-indigo-600 rounded-full hover:bg-indigo-200 transition-colors">
              <FaTwitter />
            </button>
            <button className="p-2 bg-indigo-100 text-indigo-600 rounded-full hover:bg-indigo-200 transition-colors">
              <FaLinkedin />
            </button>
          </div>
        </div>
      </div>

      {/* Article Content */}
      <article className="max-w-4xl mx-auto px-4 py-12">
        <div className="prose prose-lg max-w-none">
          <h2>Why Effective Guest Communication Matters</h2>
          <p>
            Clear and professional communication is key to creating a great guest experience. It helps set expectations,
            reduce misunderstandings, and ensure guests feel welcome. A well-crafted message can mean the difference
            between a five-star review and a guest who never returns.
          </p>
          
          <h2>Essential Guest Communication Templates</h2>
          <p>
            Below are must-have guest communication templates that hosts can use for a smoother booking process and
            an exceptional stay experience.
          </p>

          <h3>1. Booking Confirmation Message</h3>
          <p><strong>Subject:</strong> Your Booking is Confirmed – Welcome to [Property Name]!</p>
          <p>
            Hi [Guest Name],
            <br /><br />
            Thank you for booking your stay at [Property Name]! We’re excited to host you from [Check-in Date] to [Check-out Date].
            <br /><br />
            Here are a few key details about your stay:
            <ul>
              <li>Check-in: [Time] – [Check-in Instructions]</li>
              <li>Wi-Fi: [Network Name] / [Password]</li>
              <li>Contact: [Your Name] – [Phone Number]</li>
            </ul>
            <br />
            If you have any questions, feel free to reach out. Looking forward to your visit!
            <br /><br />
            Best,
            <br />
            [Your Name]
          </p>

          <h3>2. Pre-Arrival Message</h3>
          <p><strong>Subject:</strong> Get Ready for Your Stay at [Property Name]!</p>
          <p>
            Hi [Guest Name],
            <br /><br />
            Your stay at [Property Name] is just around the corner! Here’s everything you need to know before you arrive:
            <ul>
              <li>Address: [Property Address]</li>
              <li>Check-in Instructions: [Details]</li>
              <li>Parking: [Details]</li>
              <li>Local Recommendations: [Link or List]</li>
            </ul>
            <br />
            Safe travels, and we look forward to welcoming you!
            <br /><br />
            Best,
            <br />
            [Your Name]
          </p>

          <h3>3. Check-Out Reminder</h3>
          <p><strong>Subject:</strong> Thank You for Staying with Us – Check-Out Details</p>
          <p>
            Hi [Guest Name],
            <br /><br />
            We hope you’ve had a wonderful stay at [Property Name]. As a reminder, check-out is at [Time].
            <br /><br />
            Before you leave, please:
            <ul>
              <li>Ensure all windows and doors are locked</li>
              <li>Leave used towels in the bathroom</li>
              <li>Turn off all lights and appliances</li>
              <li>Place trash in the designated bins</li>
            </ul>
            <br />
            Thank you for staying with us, and we hope to host you again soon!
            <br /><br />
            Best,
            <br />
            [Your Name]
          </p>
        </div>
      </article>
    </div>
  );
}
