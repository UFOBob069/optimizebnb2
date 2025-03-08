"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { signIn, resetPassword } from '../../firebase/auth';
import { FirebaseError } from 'firebase/app';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../../firebase/config';

export default function LoginPage() {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);
  const [resetRequested, setResetRequested] = useState(false);
  const router = useRouter();

  // Check authentication state and redirect if already logged in
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        // User is signed in, redirect to dashboard
        router.push('/account/dashboard');
      }
    });

    // Cleanup subscription on unmount
    return () => unsubscribe();
  }, [router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setLoading(true);

    try {
      if (resetRequested) {
        // Handle password reset
        await resetPassword(email);
        setSuccess('Password reset email sent. Please check your inbox.');
        setResetRequested(false);
      } else if (isLogin) {
        // Handle login
        await signIn(email, password);
        // The redirect will happen automatically via the useEffect hook
      } else {
        // Redirect to signup page if user is trying to register
        router.push('/account/signup');
        return;
      }
    } catch (err) {
      console.error('Authentication error:', err);
      
      // Handle Firebase-specific errors
      if (err instanceof FirebaseError) {
        switch (err.code) {
          case 'auth/user-not-found':
          case 'auth/wrong-password':
            setError('Invalid email or password. Please try again.');
            break;
          case 'auth/invalid-email':
            setError('Invalid email address. Please check and try again.');
            break;
          case 'auth/too-many-requests':
            setError('Too many failed login attempts. Please try again later or reset your password.');
            break;
          default:
            setError(`Authentication failed: ${err.message}`);
        }
      } else {
        setError('Failed to authenticate. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleResetPassword = (e: React.MouseEvent) => {
    e.preventDefault();
    setResetRequested(true);
    if (email) {
      handleSubmit(e as unknown as React.FormEvent);
    } else {
      setError('Please enter your email address to reset your password.');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <Link href="/">
          <h2 className="text-center text-3xl font-extrabold text-gray-900">OptimizeBnB.AI</h2>
        </Link>
        <h2 className="mt-6 text-center text-3xl font-bold text-gray-900">
          {isLogin ? 'Sign in to your account' : 'Create a new account'}
        </h2>
        <p className="mt-2 text-center text-sm text-gray-600">
          {isLogin ? "Don't have an account? " : "Already have an account? "}
          <Link
            href={isLogin ? "/account/signup" : "/account/login"}
            className="font-medium text-blue-600 hover:text-blue-500 focus:outline-none"
          >
            {isLogin ? 'Sign up' : 'Sign in'}
          </Link>
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          {error && (
            <div className="mb-4 bg-red-50 border-l-4 border-red-400 p-4">
              <div className="flex">
                <div className="ml-3">
                  <p className="text-sm text-red-700">{error}</p>
                </div>
              </div>
            </div>
          )}
          
          {success && (
            <div className="mb-4 bg-green-50 border-l-4 border-green-400 p-4">
              <div className="flex">
                <div className="ml-3">
                  <p className="text-sm text-green-700">{success}</p>
                </div>
              </div>
            </div>
          )}
          
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Email address
              </label>
              <div className="mt-1">
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                />
              </div>
            </div>

            {!resetRequested && (
              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                  Password
                </label>
                <div className="mt-1">
                  <input
                    id="password"
                    name="password"
                    type="password"
                    autoComplete={isLogin ? "current-password" : "new-password"}
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  />
                </div>
              </div>
            )}

            {isLogin && !resetRequested && (
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <input
                    id="remember-me"
                    name="remember-me"
                    type="checkbox"
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  />
                  <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-900">
                    Remember me
                  </label>
                </div>

                <div className="text-sm">
                  <button 
                    onClick={handleResetPassword}
                    className="font-medium text-blue-600 hover:text-blue-500"
                  >
                    Forgot your password?
                  </button>
                </div>
              </div>
            )}

            <div>
              <button
                type="submit"
                disabled={loading}
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:bg-blue-300 disabled:cursor-not-allowed"
              >
                {loading ? (
                  <span className="flex items-center">
                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    {resetRequested ? 'Sending reset email...' : isLogin ? 'Signing in...' : 'Creating account...'}
                  </span>
                ) : (
                  <span>{resetRequested ? 'Reset Password' : isLogin ? 'Sign in' : 'Create account'}</span>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
} 