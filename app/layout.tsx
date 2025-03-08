import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { AuthProvider } from './context/AuthContext';
import Navigation from './components/Navigation';

// Use the Inter font with a subset to ensure consistent rendering
const inter = Inter({ 
  subsets: ['latin'],
  display: 'swap', // This helps with font loading
});

export const metadata: Metadata = {
  title: 'OptimizeBnB.AI - Airbnb Optimization Tools',
  description: 'AI-powered tools to optimize your Airbnb listings, analyze photos, create welcome guides, and more.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={inter.className}>
      <body suppressHydrationWarning={true}>
        <AuthProvider>
          <div className="flex flex-col min-h-screen">
            {/* Navigation with authentication awareness */}
            <Navigation />
            
            {/* Main content */}
            <main className="flex-grow">
              {children}
            </main>
            
            {/* Footer placeholder */}
            <footer className="bg-gray-50 border-t border-gray-200 py-8 px-4">
              <div className="max-w-7xl mx-auto">
                <p className="text-center text-gray-400">
                  &copy; {new Date().getFullYear()} OptimizeBnB.AI. All rights reserved.
                </p>
              </div>
            </footer>
          </div>
        </AuthProvider>
      </body>
    </html>
  );
}
