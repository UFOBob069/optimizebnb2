"use client";

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { collection, getDocs, query, orderBy } from 'firebase/firestore';
import { db } from '../../firebase/config';
import { useAuth } from '../../context/AuthContext';
import ProtectedRoute from '../../components/ProtectedRoute';

interface ListingRequest {
  id: string;
  url: string;
  email: string;
  timestamp: any;
  status: string;
  ip: string;
  userAgent: string;
}

export default function ListingRequestsPage() {
  const [requests, setRequests] = useState<ListingRequest[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { user } = useAuth();
  const router = useRouter();

  useEffect(() => {
    const fetchRequests = async () => {
      try {
        const q = query(
          collection(db, 'listing_analysis_requests'),
          orderBy('timestamp', 'desc')
        );
        
        const querySnapshot = await getDocs(q);
        const requestsData: ListingRequest[] = [];
        
        querySnapshot.forEach((doc) => {
          const data = doc.data();
          requestsData.push({
            id: doc.id,
            url: data.url || '',
            email: data.email || '',
            timestamp: data.timestamp,
            status: data.status || 'unknown',
            ip: data.ip || 'unknown',
            userAgent: data.userAgent || 'unknown'
          });
        });
        
        setRequests(requestsData);
      } catch (err) {
        console.error('Error fetching listing requests:', err);
        setError('Failed to load listing requests');
      } finally {
        setLoading(false);
      }
    };

    fetchRequests();
  }, []);

  const formatDate = (timestamp: any) => {
    if (!timestamp) return 'N/A';
    
    try {
      const date = timestamp.toDate ? timestamp.toDate() : new Date(timestamp);
      return new Intl.DateTimeFormat('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit'
      }).format(date);
    } catch (err) {
      console.error('Error formatting date:', err);
      return 'Invalid date';
    }
  };

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-gray-50 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900">Listing Analysis Requests</h1>
            <p className="mt-2 text-gray-600">View all free listing analysis requests</p>
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

          {loading ? (
            <div className="flex justify-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
            </div>
          ) : requests.length === 0 ? (
            <div className="bg-white shadow rounded-lg p-6">
              <p className="text-gray-500 text-center">No listing analysis requests found.</p>
            </div>
          ) : (
            <div className="bg-white shadow overflow-hidden rounded-lg">
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Date
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Email
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Listing URL
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Status
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        IP Address
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {requests.map((request) => (
                      <tr key={request.id}>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {formatDate(request.timestamp)}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {request.email}
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-900">
                          <a 
                            href={request.url} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="text-blue-600 hover:text-blue-800 truncate block max-w-xs"
                          >
                            {request.url}
                          </a>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                            request.status === 'submitted' ? 'bg-green-100 text-green-800' : 
                            request.status === 'error' ? 'bg-red-100 text-red-800' : 
                            'bg-gray-100 text-gray-800'
                          }`}>
                            {request.status}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {request.ip}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      </div>
    </ProtectedRoute>
  );
} 