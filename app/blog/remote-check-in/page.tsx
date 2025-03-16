"use client";

import Image from "next/image";
import Link from "next/link";
import { FaFacebook, FaTwitter, FaLinkedin } from "react-icons/fa";

export default function RemoteCheckInGuide() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <div className="relative h-[50vh] bg-orange-600">
        <div className="absolute inset-0 bg-gradient-to-r from-orange-900/70 to-orange-600/70 z-10" />
        <Image
          src="/images/blog/remote-check-in-hero.jpg"
          alt="Remote Check-In for Airbnbs"
          fill
          className="object-cover"
          priority
        />
        <div className="relative z-20 max-w-5xl mx-auto px-4 h-full flex flex-col justify-center text-white">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            The Ultimate Guide to Remote Check-In for Airbnbs
          </h1>
          <p className="text-xl md:text-2xl">
            How to streamline the check-in process for a seamless guest experience.
          </p>
        </div>
      </div>

      {/* Author and Article Info */}
      <div className="max-w-4xl mx-auto px-4 py-8 flex flex-col md:flex-row justify-between items-center border-b border-gray-200">
        <div className="flex items-center mb-4 md:mb-0">
          <div className="w-12 h-12 rounded-full overflow-hidden mr-4">
            <Image
              src="/images/blog/lisa-brown.jpg"
              alt="Lisa Brown"
              width={48}
              height={48}
              className="object-cover"
            />
          </div>
          <div>
            <p className="font-semibold">Lisa Brown</p>
            <p className="text-gray-600 text-sm">Short-Term Rental Expert</p>
          </div>
        </div>
        <div className="flex items-center space-x-4">
          <div className="text-gray-600 text-sm flex items-center mr-6">
            <span className="mr-2">10 min read</span>
            <span>•</span>
            <span className="ml-2">14.2k views</span>
          </div>
          <div className="flex space-x-2">
            <button className="p-2 bg-orange-100 text-orange-600 rounded-full hover:bg-orange-200 transition-colors">
              <FaFacebook />
            </button>
            <button className="p-2 bg-orange-100 text-orange-600 rounded-full hover:bg-orange-200 transition-colors">
              <FaTwitter />
            </button>
            <button className="p-2 bg-orange-100 text-orange-600 rounded-full hover:bg-orange-200 transition-colors">
              <FaLinkedin />
            </button>
          </div>
        </div>
      </div>

      {/* Article Content */}
      <article className="max-w-4xl mx-auto px-4 py-12">
        <div className="prose prose-lg max-w-none">
          <h2>Why Remote Check-In is a Game Changer</h2>
          <p>
            Remote check-in allows Airbnb hosts to offer a seamless, contactless experience for guests while saving
            time and improving operational efficiency. With the right setup, hosts can reduce check-in stress and
            enhance guest satisfaction.
          </p>
          
          <h2>How to Set Up Remote Check-In</h2>
          <p>
            Implementing remote check-in successfully requires the right combination of technology, security, and
            clear communication. Here’s what hosts need to do:
          </p>
          
          <h3>1. Install a Smart Lock or Keyless Entry System</h3>
          <p>
            The first step in enabling remote check-in is installing a reliable smart lock. This allows guests to access
            the property using a unique code or app, eliminating the need for physical keys.
          </p>
          <ul>
            <li>Recommended brands: August Smart Lock, Schlage Encode, Yale Assure</li>
            <li>Ensure the lock is Wi-Fi or Bluetooth enabled for remote management</li>
            <li>Generate a unique code for each guest to enhance security</li>
          </ul>

          <h3>2. Provide Detailed Check-In Instructions</h3>
          <p>
            Guests should receive clear, step-by-step instructions well before their arrival. Include the following details:
          </p>
          <ul>
            <li>How to access the property (smart lock code, app instructions, or lockbox location)</li>
            <li>Parking details, if applicable</li>
            <li>Wi-Fi credentials</li>
            <li>Emergency contact information</li>
            <li>Any unique property rules or notes</li>
          </ul>

          <h3>3. Use an Automated Messaging System</h3>
          <p>
            Automate guest communication by scheduling check-in messages through Airbnb or property management software.
            This ensures guests receive important information at the right time without manual effort.
          </p>
          
          <h3>4. Set Up a Backup Entry Method</h3>
          <p>
            Technology can sometimes fail, so always have a backup plan in place. Consider:
          </p>
          <ul>
            <li>A lockbox with a spare key in case the smart lock malfunctions</li>
            <li>A nearby contact or co-host available for emergencies</li>
            <li>A secondary method of entry, such as a keypad gate or garage code</li>
          </ul>

          <h3>5. Test the System Regularly</h3>
          <p>
            Before each guest arrives, verify that the check-in process works smoothly. Test the smart lock, ensure the
            correct code is generated, and confirm that all instructions are clear and up to date.
          </p>

          <h2>Benefits of Remote Check-In</h2>
          <div className="my-8 bg-orange-50 p-6 rounded-xl">
            <h3 className="text-xl font-semibold text-orange-800 mb-3">Why Hosts Love Remote Check-In</h3>
            <ul className="list-disc pl-5 space-y-2">
              <li>Reduces the need for in-person meetings</li>
              <li>Improves guest convenience and flexibility</li>
              <li>Enhances security by eliminating lost key risks</li>
              <li>Automates operations, saving hosts valuable time</li>
              <li>Increases positive guest reviews for a hassle-free experience</li>
            </ul>
          </div>
        </div>
      </article>
    </div>
  );
}
