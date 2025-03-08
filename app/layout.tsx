import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';

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
        <div className="flex flex-col min-h-screen">
          {/* Navigation placeholder */}
          <header className="bg-white shadow">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex justify-between h-16 items-center">
                <a href="/" className="text-xl font-bold text-blue-600">
                  OptimizeBnB.AI
                </a>
                <nav className="hidden sm:flex sm:space-x-8">
                  <a href="/analyze" className="text-gray-500 hover:text-gray-700 px-3 py-2 text-sm font-medium">
                    Listing Analysis
                  </a>
                  <a href="/photo-analysis" className="text-gray-500 hover:text-gray-700 px-3 py-2 text-sm font-medium">
                    Photo Analysis
                  </a>
                  <a href="/welcome-guide" className="text-gray-500 hover:text-gray-700 px-3 py-2 text-sm font-medium">
                    Welcome Guide
                  </a>
                  <a href="/pricing-strategy" className="text-gray-500 hover:text-gray-700 px-3 py-2 text-sm font-medium">
                    Pricing Strategy
                  </a>
                </nav>
              </div>
            </div>
          </header>
          
          {/* Main content */}
          <main className="flex-grow">
            {children}
          </main>
          
          {/* Footer placeholder */}
          <footer className="bg-gray-50 border-t border-gray-200 py-8 px-4">
            <div className="max-w-7xl mx-auto">
              <p className="text-center text-gray-400">
                &copy; 2023 OptimizeBnB.AI. All rights reserved.
              </p>
            </div>
          </footer>
        </div>
      </body>
    </html>
  );
}
