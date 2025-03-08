"use client";

import { useState } from 'react';
import Link from 'next/link';
import { useAuth } from '../../context/AuthContext';
import ProtectedRoute from '../../components/ProtectedRoute';

// Define a type for Timestamp-like objects
interface TimestampLike {
  toDate: () => Date;
}

export default function DashboardPage() {
  const { user } = useAuth();
  const [error] = useState<string | null>(null);

  const formatDate = (timestamp: TimestampLike | Date | string | undefined | null) => {
    if (!timestamp) return 'N/A';
    
    try {
      // If it's a Firestore Timestamp
      if (typeof timestamp === 'object' && 'toDate' in timestamp) {
        return new Intl.DateTimeFormat('en-US', {
          year: 'numeric',
          month: 'long',
          day: 'numeric'
        }).format(timestamp.toDate());
      }
      
      // If it's a Date object or string
      const date = timestamp instanceof Date ? timestamp : new Date(timestamp as string);
      return new Intl.DateTimeFormat('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      }).format(date);
    } catch (err) {
      console.error('Error formatting date:', err);
      return 'Invalid date';
    }
  };

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-gray-50">
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="md:flex md:items-center md:justify-between mb-8">
            <div className="flex-1 min-w-0">
              <h1 className="text-2xl font-bold leading-7 text-gray-900 sm:text-3xl sm:truncate">
                Dashboard
              </h1>
            </div>
          </div>

          {error && (
            <div className="mb-6 bg-red-50 border-l-4 border-red-400 p-4">
              <div className="flex">
                <div className="ml-3">
                  <p className="text-sm text-red-700">{error}</p>
                </div>
              </div>
            </div>
          )}

          <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
            {/* User Profile Card */}
            <div className="bg-white shadow rounded-lg p-6 lg:col-span-1">
              <h2 className="text-lg font-medium text-gray-900 mb-4">Your Profile</h2>
              <div className="space-y-4">
                <div>
                  <h3 className="text-sm font-medium text-gray-500">Name</h3>
                  <p className="mt-1 text-sm text-gray-900">{user?.firstName} {user?.lastName}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-500">Email</h3>
                  <p className="mt-1 text-sm text-gray-900">{user?.email}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-500">Phone</h3>
                  <p className="mt-1 text-sm text-gray-900">{user?.phone}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-500">Airbnb Listing</h3>
                  <p className="mt-1 text-sm text-gray-900 truncate">
                    <a href={user?.airbnbListingUrl} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-500">
                      View Listing
                    </a>
                  </p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-500">Property Address</h3>
                  <p className="mt-1 text-sm text-gray-900">{user?.address}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-500">Zip Code</h3>
                  <p className="mt-1 text-sm text-gray-900">{user?.zipCode}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-500">Member Since</h3>
                  <p className="mt-1 text-sm text-gray-900">{formatDate(user?.createdAt)}</p>
                </div>
                <div className="pt-4">
                  <Link 
                    href="/account/edit-profile" 
                    className="text-blue-600 hover:text-blue-500 text-sm font-medium"
                  >
                    Edit Profile
                  </Link>
                </div>
              </div>
            </div>

            {/* Tools and Analytics */}
            <div className="bg-white shadow rounded-lg p-6 lg:col-span-2">
              <h2 className="text-lg font-medium text-gray-900 mb-4">Optimization Tools</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-blue-50 rounded-lg p-4 hover:bg-blue-100 transition-colors">
                  <h3 className="font-medium text-blue-800 mb-2">Listing Analysis</h3>
                  <p className="text-sm text-blue-700 mb-4">Get a comprehensive analysis of your Airbnb listing with actionable recommendations.</p>
                  <Link 
                    href="/analyze" 
                    className="text-blue-600 hover:text-blue-800 text-sm font-medium"
                  >
                    Analyze Listing →
                  </Link>
                </div>
                <div className="bg-green-50 rounded-lg p-4 hover:bg-green-100 transition-colors">
                  <h3 className="font-medium text-green-800 mb-2">Photo Analysis</h3>
                  <p className="text-sm text-green-700 mb-4">Improve your listing photos to attract more guests and increase bookings.</p>
                  <Link 
                    href="/photo-analysis" 
                    className="text-green-600 hover:text-green-800 text-sm font-medium"
                  >
                    Analyze Photos →
                  </Link>
                </div>
                <div className="bg-purple-50 rounded-lg p-4 hover:bg-purple-100 transition-colors">
                  <h3 className="font-medium text-purple-800 mb-2">Pricing Strategy</h3>
                  <p className="text-sm text-purple-700 mb-4">Optimize your pricing to maximize revenue and occupancy rates.</p>
                  <Link 
                    href="/pricing-strategy" 
                    className="text-purple-600 hover:text-purple-800 text-sm font-medium"
                  >
                    Get Pricing Strategy →
                  </Link>
                </div>
                <div className="bg-yellow-50 rounded-lg p-4 hover:bg-yellow-100 transition-colors">
                  <h3 className="font-medium text-yellow-800 mb-2">Amenity Recommendations</h3>
                  <p className="text-sm text-yellow-700 mb-4">Discover which amenities will have the biggest impact on your bookings.</p>
                  <Link 
                    href="/amenity-recommendations" 
                    className="text-yellow-600 hover:text-yellow-800 text-sm font-medium"
                  >
                    Get Recommendations →
                  </Link>
                </div>
              </div>

              <div className="mt-8">
                <h2 className="text-lg font-medium text-gray-900 mb-4">Recent Activity</h2>
                <div className="border-t border-gray-200">
                  <ul className="divide-y divide-gray-200">
                    <li className="py-4">
                      <div className="flex space-x-3">
                        <div className="flex-1 space-y-1">
                          <div className="flex items-center justify-between">
                            <h3 className="text-sm font-medium">Account Created</h3>
                            <p className="text-sm text-gray-500">{formatDate(user?.createdAt)}</p>
                          </div>
                          <p className="text-sm text-gray-500">Welcome to OptimizeBnB.AI! We&apos;re excited to help you optimize your Airbnb listing.</p>
                        </div>
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
              
              {/* Admin Section */}
              <div className="mt-8 pt-6 border-t border-gray-200">
                <h2 className="text-lg font-medium text-gray-900 mb-4">Admin Tools</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="bg-gray-50 rounded-lg p-4 hover:bg-gray-100 transition-colors">
                    <h3 className="font-medium text-gray-800 mb-2">Listing Analysis Requests</h3>
                    <p className="text-sm text-gray-700 mb-4">View all free listing analysis requests submitted by users.</p>
                    <Link 
                      href="/admin/listing-requests" 
                      className="text-blue-600 hover:text-blue-800 text-sm font-medium"
                    >
                      View Requests →
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </ProtectedRoute>
  );
} 