'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';

export default function Footer() {
  const [year, setYear] = useState('');
  
  // Only set the year after component has mounted to prevent hydration mismatch
  useEffect(() => {
    setYear(new Date().getFullYear().toString());
  }, []);
  
  return (
    <footer className="bg-gray-50 border-t border-gray-200">
      <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-2">
            <h3 className="text-sm font-semibold text-gray-500 tracking-wider uppercase">
              OptimizeBnB.AI
            </h3>
            <p className="mt-2 text-base text-gray-500">
              AI-powered tools to help Airbnb hosts optimize their listings, create better guest experiences, and maximize their earnings.
            </p>
          </div>
          
          <div>
            <h3 className="text-sm font-semibold text-gray-500 tracking-wider uppercase">
              Tools
            </h3>
            <ul className="mt-4 space-y-4">
              <li>
                <Link href="/listing-analysis" className="text-base text-gray-500 hover:text-gray-900">
                  Listing Analysis
                </Link>
              </li>
              <li>
                <Link href="/photo-analysis" className="text-base text-gray-500 hover:text-gray-900">
                  Photo Analysis
                </Link>
              </li>
              <li>
                <Link href="/welcome-guide" className="text-base text-gray-500 hover:text-gray-900">
                  Welcome Guide Generator
                </Link>
              </li>
              <li>
                <Link href="/pricing-strategy" className="text-base text-gray-500 hover:text-gray-900">
                  Pricing Strategy
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-sm font-semibold text-gray-500 tracking-wider uppercase">
              Company
            </h3>
            <ul className="mt-4 space-y-4">
              <li>
                <Link href="/about" className="text-base text-gray-500 hover:text-gray-900">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/pricing" className="text-base text-gray-500 hover:text-gray-900">
                  Pricing
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="text-base text-gray-500 hover:text-gray-900">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms" className="text-base text-gray-500 hover:text-gray-900">
                  Terms of Service
                </Link>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="mt-8 border-t border-gray-200 pt-8 md:flex md:items-center md:justify-between">
          <div className="flex space-x-6 md:order-2">
            <a href="#" className="text-gray-400 hover:text-gray-500">
              <span className="sr-only">Twitter</span>
              <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
              </svg>
            </a>
          </div>
          <p className="mt-8 text-base text-gray-400 md:mt-0 md:order-1">
            &copy; {year || '2023'} OptimizeBnB.AI. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
} 