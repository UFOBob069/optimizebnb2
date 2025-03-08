"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useAuth } from '../context/AuthContext';
import { signOut } from '../firebase/auth';
import { useRouter } from 'next/navigation';

export default function Navigation() {
  const { user, loading } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const router = useRouter();

  const handleSignOut = async () => {
    try {
      await signOut();
      router.push('/');
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  return (
    <header className="bg-white shadow">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <Link href="/" className="text-xl font-bold text-blue-600">
            OptimizeBnB.AI
          </Link>
          
          {/* Mobile menu button */}
          <div className="sm:hidden">
            <button
              type="button"
              className="text-gray-500 hover:text-gray-700"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                {isMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
          
          {/* Desktop navigation */}
          <div className="hidden sm:flex sm:items-center">
            <nav className="sm:flex sm:space-x-8 mr-6">
              <Link href="/analyze" className="text-gray-500 hover:text-gray-700 px-3 py-2 text-sm font-medium">
                Listing Analysis
              </Link>
              <Link href="/photo-analysis" className="text-gray-500 hover:text-gray-700 px-3 py-2 text-sm font-medium">
                Photo Analysis
              </Link>
              <Link href="/amenity-recommendations" className="text-gray-500 hover:text-gray-700 px-3 py-2 text-sm font-medium">
                Amenity Recommendations
              </Link>
              <Link href="/pricing-strategy" className="text-gray-500 hover:text-gray-700 px-3 py-2 text-sm font-medium">
                Pricing Strategy
              </Link>
            </nav>
            
            {loading ? (
              <div className="h-8 w-24 bg-gray-200 rounded animate-pulse"></div>
            ) : user ? (
              <div className="relative ml-3">
                <div>
                  <button
                    type="button"
                    className="flex items-center text-sm rounded-full focus:outline-none"
                    onClick={() => setIsMenuOpen(!isMenuOpen)}
                  >
                    <span className="mr-2 text-gray-700">{user.firstName}</span>
                    <div className="h-8 w-8 rounded-full bg-blue-500 flex items-center justify-center text-white">
                      {user.firstName.charAt(0)}{user.lastName.charAt(0)}
                    </div>
                  </button>
                </div>
                
                {isMenuOpen && (
                  <div className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                    <Link
                      href="/account/dashboard"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      Dashboard
                    </Link>
                    <Link
                      href="/account/edit-profile"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      Edit Profile
                    </Link>
                    <button
                      onClick={() => {
                        setIsMenuOpen(false);
                        handleSignOut();
                      }}
                      className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      Sign Out
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <Link
                href="/account/login"
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
              >
                Sign In / Sign Up
              </Link>
            )}
          </div>
        </div>
      </div>
      
      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="sm:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1">
            <Link
              href="/analyze"
              className="block px-3 py-2 text-base font-medium text-gray-700 hover:bg-gray-100 hover:text-gray-900"
              onClick={() => setIsMenuOpen(false)}
            >
              Listing Analysis
            </Link>
            <Link
              href="/photo-analysis"
              className="block px-3 py-2 text-base font-medium text-gray-700 hover:bg-gray-100 hover:text-gray-900"
              onClick={() => setIsMenuOpen(false)}
            >
              Photo Analysis
            </Link>
            <Link
              href="/amenity-recommendations"
              className="block px-3 py-2 text-base font-medium text-gray-700 hover:bg-gray-100 hover:text-gray-900"
              onClick={() => setIsMenuOpen(false)}
            >
              Amenity Recommendations
            </Link>
            <Link
              href="/pricing-strategy"
              className="block px-3 py-2 text-base font-medium text-gray-700 hover:bg-gray-100 hover:text-gray-900"
              onClick={() => setIsMenuOpen(false)}
            >
              Pricing Strategy
            </Link>
            
            {user ? (
              <>
                <Link
                  href="/account/dashboard"
                  className="block px-3 py-2 text-base font-medium text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Dashboard
                </Link>
                <Link
                  href="/account/edit-profile"
                  className="block px-3 py-2 text-base font-medium text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Edit Profile
                </Link>
                <button
                  onClick={() => {
                    setIsMenuOpen(false);
                    handleSignOut();
                  }}
                  className="block w-full text-left px-3 py-2 text-base font-medium text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                >
                  Sign Out
                </button>
              </>
            ) : (
              <Link
                href="/account/login"
                className="block px-3 py-2 text-base font-medium text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                onClick={() => setIsMenuOpen(false)}
              >
                Sign In / Sign Up
              </Link>
            )}
          </div>
        </div>
      )}
    </header>
  );
} 