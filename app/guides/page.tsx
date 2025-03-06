"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { 
  ArrowLeft, 
  Search, 
  Star, 
  Clock, 
  Eye, 
  BookOpen, 
  Camera, 
  Home, 
  DollarSign, 
  MessageSquare, 
  Calendar, 
  Briefcase,
  TrendingUp,
  Users,
  Award,
  ChevronRight,
  Filter
} from "lucide-react";

// Guide Card Component
function GuideCard({ 
  title, 
  description, 
  image, 
  category, 
  readTime, 
  date, 
  featured = false,
  href
}: { 
  title: string; 
  description: string; 
  image: string; 
  category: string; 
  readTime: string; 
  date: string; 
  featured?: boolean;
  href: string;
}) {
  return (
    <Link 
      href={href} 
      className={`block group overflow-hidden ${featured ? 'md:col-span-2 lg:col-span-2' : ''}`}
    >
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden transition-all hover:shadow-md h-full flex flex-col">
        <div className="relative h-48 overflow-hidden">
          <Image
            src={image}
            alt={title}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-105"
          />
          <div className="absolute top-3 left-3">
            <span className="bg-blue-600 text-white text-xs font-medium px-2.5 py-1 rounded-full">
              {category}
            </span>
          </div>
        </div>
        <div className="p-5 flex flex-col flex-grow">
          <h3 className="text-xl font-semibold mb-2 group-hover:text-blue-600 transition-colors">
            {title}
          </h3>
          <p className="text-gray-600 mb-4 flex-grow">
            {description}
          </p>
          <div className="flex items-center text-sm text-gray-500 mt-auto">
            <Clock className="h-4 w-4 mr-1" />
            <span className="mr-4">{readTime}</span>
            <span>{date}</span>
          </div>
        </div>
      </div>
    </Link>
  );
}

// Category Button Component
function CategoryButton({ 
  icon, 
  label, 
  active, 
  onClick 
}: { 
  icon: React.ReactNode; 
  label: string; 
  active: boolean; 
  onClick: () => void; 
}) {
  return (
    <button
      onClick={onClick}
      className={`flex items-center px-4 py-2 rounded-full border transition-colors ${
        active 
          ? 'bg-blue-600 text-white border-blue-600' 
          : 'bg-white text-gray-700 border-gray-200 hover:bg-gray-50'
      }`}
    >
      <span className="mr-2">{icon}</span>
      <span>{label}</span>
    </button>
  );
}

// Featured Guide Component
function FeaturedGuide() {
  return (
    <div className="bg-gradient-to-r from-blue-600 to-blue-800 rounded-xl overflow-hidden shadow-lg mb-12">
      <div className="md:flex">
        <div className="md:w-1/2 p-8 md:p-12 flex flex-col justify-center">
          <span className="inline-block bg-blue-500 bg-opacity-30 text-white text-sm font-medium px-3 py-1 rounded-full mb-4">
            Featured Guide
          </span>
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
            The Ultimate Airbnb Host Playbook: From Beginner to Superhost
          </h2>
          <p className="text-blue-100 mb-6">
            A comprehensive guide covering everything you need to know to become a successful Airbnb host and achieve Superhost status.
          </p>
          <div className="flex items-center text-blue-100 mb-6">
            <Clock className="h-4 w-4 mr-1" />
            <span className="mr-4">25 min read</span>
            <Eye className="h-4 w-4 mr-1" />
            <span>12.5k views</span>
          </div>
          <Link 
            href="/guides/ultimate-airbnb-host-playbook" 
            className="inline-flex items-center bg-white text-blue-600 hover:bg-blue-50 font-medium px-5 py-2.5 rounded-lg transition-colors"
          >
            Read Guide <ChevronRight className="ml-1 h-4 w-4" />
          </Link>
        </div>
        <div className="md:w-1/2 relative">
          <div className="h-64 md:h-full">
            <Image
              src="/guides/featured-guide.jpg"
              alt="The Ultimate Airbnb Host Playbook"
              fill
              className="object-cover"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default function GuidesPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");
  
  const categories = [
    { icon: <BookOpen className="h-4 w-4" />, label: "All" },
    { icon: <Home className="h-4 w-4" />, label: "Getting Started" },
    { icon: <Camera className="h-4 w-4" />, label: "Photography" },
    { icon: <MessageSquare className="h-4 w-4" />, label: "Guest Communication" },
    { icon: <DollarSign className="h-4 w-4" />, label: "Pricing" },
    { icon: <Star className="h-4 w-4" />, label: "Reviews" },
    { icon: <Calendar className="h-4 w-4" />, label: "Booking Management" },
    { icon: <Briefcase className="h-4 w-4" />, label: "Business Tips" },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      {/* Header */}
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <Link href="/" className="inline-flex items-center text-blue-600 hover:text-blue-800">
            <ArrowLeft size={16} className="mr-2" /> Back to Home
          </Link>
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-blue-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-20">
          <div className="text-center">
            <h1 className="text-3xl md:text-5xl font-bold mb-6">Host Guides & Resources</h1>
            <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto">
              Expert tips, strategies, and best practices to help you succeed as an Airbnb host
            </p>
            
            {/* Search Bar */}
            <div className="max-w-2xl mx-auto relative">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search for guides, tips, or topics..."
                  className="w-full py-4 px-6 pr-12 rounded-full border-2 border-blue-400 focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50 text-gray-900"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                <div className="absolute inset-y-0 right-0 flex items-center pr-4">
                  <Search className="h-5 w-5 text-gray-500" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Featured Guide */}
          <FeaturedGuide />
          
          {/* Categories */}
          <div className="mb-12">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold">Browse by Category</h2>
              <button className="flex items-center text-gray-600 hover:text-gray-900">
                <Filter className="h-4 w-4 mr-1" />
                <span>Filter</span>
              </button>
            </div>
            
            <div className="flex flex-wrap gap-3">
              {categories.map((category) => (
                <CategoryButton
                  key={category.label}
                  icon={category.icon}
                  label={category.label}
                  active={activeCategory === category.label}
                  onClick={() => setActiveCategory(category.label)}
                />
              ))}
            </div>
          </div>
          
          {/* Popular Guides */}
          <div className="mb-16">
            <h2 className="text-2xl font-bold mb-6">Popular Guides</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <GuideCard
                title="Mastering Airbnb Photography: Tips from Professional Photographers"
                description="Learn how to take stunning photos that showcase your property's best features and attract more bookings."
                image="/guides/photography.jpg"
                category="Photography"
                readTime="12 min read"
                date="May 15, 2023"
                href="/guides/mastering-airbnb-photography"
              />
              
              <GuideCard
                title="Pricing Strategies That Maximize Your Revenue"
                description="Discover data-driven pricing strategies to optimize your nightly rates based on seasonality, local events, and demand."
                image="/guides/pricing.jpg"
                category="Pricing"
                readTime="15 min read"
                date="June 3, 2023"
                href="/guides/pricing-strategies"
              />
              
              <GuideCard
                title="Creating a 5-Star Guest Experience"
                description="Learn the secrets to consistently earning 5-star reviews and becoming a highly-rated host on Airbnb."
                image="/guides/guest-experience.jpg"
                category="Guest Communication"
                readTime="18 min read"
                date="April 22, 2023"
                href="/guides/five-star-guest-experience"
              />
            </div>
          </div>
          
          {/* Getting Started Guides */}
          <div className="mb-16">
            <h2 className="text-2xl font-bold mb-6">Getting Started</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <GuideCard
                title="Setting Up Your Airbnb Listing for Success"
                description="A step-by-step guide to creating an optimized Airbnb listing that attracts guests and ranks well in search results."
                image="/guides/listing-setup.jpg"
                category="Getting Started"
                readTime="20 min read"
                date="March 10, 2023"
                href="/guides/setting-up-airbnb-listing"
                featured={true}
              />
              
              <GuideCard
                title="Essential Amenities Every Airbnb Should Have"
                description="Discover the must-have amenities that guests expect and the extras that will make your listing stand out."
                image="/guides/amenities.jpg"
                category="Getting Started"
                readTime="10 min read"
                date="February 18, 2023"
                href="/guides/essential-amenities"
              />
              
              <GuideCard
                title="Creating House Rules That Work"
                description="Learn how to establish clear house rules that protect your property while still making guests feel welcome."
                image="/guides/house-rules.jpg"
                category="Getting Started"
                readTime="8 min read"
                date="January 25, 2023"
                href="/guides/creating-house-rules"
              />
            </div>
          </div>
          
          {/* Advanced Hosting Strategies */}
          <div className="mb-16">
            <h2 className="text-2xl font-bold mb-6">Advanced Hosting Strategies</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <GuideCard
                title="Automating Your Airbnb Business"
                description="Discover tools and strategies to automate guest communication, check-ins, cleaning schedules, and more."
                image="/guides/automation.jpg"
                category="Business Tips"
                readTime="16 min read"
                date="July 12, 2023"
                href="/guides/automating-airbnb-business"
              />
              
              <GuideCard
                title="Seasonal Strategies: Maximizing Bookings Year-Round"
                description="Learn how to adapt your listing and pricing strategy to thrive during both peak seasons and off-peak periods."
                image="/guides/seasonal.jpg"
                category="Booking Management"
                readTime="14 min read"
                date="August 5, 2023"
                href="/guides/seasonal-strategies"
              />
              
              <GuideCard
                title="Tax Strategies for Airbnb Hosts"
                description="Understand the tax implications of your Airbnb business and learn strategies to maximize deductions and minimize liability."
                image="/guides/taxes.jpg"
                category="Business Tips"
                readTime="22 min read"
                date="September 18, 2023"
                href="/guides/tax-strategies"
              />
            </div>
          </div>
          
          {/* Host Success Stories */}
          <div className="mb-16">
            <h2 className="text-2xl font-bold mb-6">Host Success Stories</h2>
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
              <div className="grid grid-cols-1 md:grid-cols-2">
                <div className="p-8 md:p-12 flex flex-col justify-center">
                  <div className="flex items-center mb-4">
                    <div className="flex">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                      ))}
                    </div>
                    <span className="ml-2 text-gray-600">Superhost</span>
                  </div>
                  <h3 className="text-2xl font-bold mb-4">
                    "I increased my bookings by 40% using OptimizeBnb.AI's recommendations"
                  </h3>
                  <p className="text-gray-600 mb-6">
                    Sarah from Miami shares how she transformed her struggling Airbnb into a top-performing property using our platform's insights and optimization tools.
                  </p>
                  <div className="flex items-center">
                    <div className="relative w-12 h-12 rounded-full overflow-hidden mr-4">
                      <Image
                        src="/testimonials/sarah.jpg"
                        alt="Sarah"
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div>
                      <p className="font-medium">Sarah Thompson</p>
                      <p className="text-gray-600 text-sm">Miami, FL • 3 properties</p>
                    </div>
                  </div>
                </div>
                <div className="relative h-64 md:h-auto">
                  <Image
                    src="/testimonials/success-story.jpg"
                    alt="Success Story"
                    fill
                    className="object-cover"
                  />
                </div>
              </div>
            </div>
          </div>
          
          {/* Resources Section */}
          <div>
            <h2 className="text-2xl font-bold mb-6">Additional Resources</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition-shadow">
                <div className="text-blue-600 mb-4">
                  <TrendingUp size={32} />
                </div>
                <h3 className="text-xl font-semibold mb-2">Market Reports</h3>
                <p className="text-gray-600 mb-4">
                  Access our quarterly market reports with insights on booking trends, pricing data, and guest preferences.
                </p>
                <Link 
                  href="/resources/market-reports" 
                  className="text-blue-600 hover:text-blue-800 font-medium inline-flex items-center"
                >
                  View Reports <ChevronRight className="ml-1 h-4 w-4" />
                </Link>
              </div>
              
              <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition-shadow">
                <div className="text-blue-600 mb-4">
                  <Users size={32} />
                </div>
                <h3 className="text-xl font-semibold mb-2">Host Community</h3>
                <p className="text-gray-600 mb-4">
                  Join our community of hosts to share experiences, ask questions, and learn from each other.
                </p>
                <Link 
                  href="/community" 
                  className="text-blue-600 hover:text-blue-800 font-medium inline-flex items-center"
                >
                  Join Community <ChevronRight className="ml-1 h-4 w-4" />
                </Link>
              </div>
              
              <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition-shadow">
                <div className="text-blue-600 mb-4">
                  <Award size={32} />
                </div>
                <h3 className="text-xl font-semibold mb-2">Certification Program</h3>
                <p className="text-gray-600 mb-4">
                  Become a certified OptimizeBnb.AI host and showcase your expertise to potential guests.
                </p>
                <Link 
                  href="/certification" 
                  className="text-blue-600 hover:text-blue-800 font-medium inline-flex items-center"
                >
                  Learn More <ChevronRight className="ml-1 h-4 w-4" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gradient-to-r from-blue-600 to-blue-800 rounded-xl overflow-hidden shadow-lg">
            <div className="p-8 md:p-12 text-center">
              <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
                Get Hosting Tips Delivered to Your Inbox
              </h2>
              <p className="text-blue-100 mb-8 max-w-3xl mx-auto">
                Subscribe to our newsletter for the latest hosting tips, industry trends, and exclusive guides.
              </p>
              <div className="max-w-md mx-auto flex flex-col sm:flex-row gap-3">
                <input
                  type="email"
                  placeholder="Your email address"
                  className="flex-grow py-3 px-4 rounded-lg focus:ring-2 focus:ring-blue-300 focus:border-blue-300"
                />
                <button className="bg-white text-blue-600 hover:bg-blue-50 font-semibold py-3 px-6 rounded-lg transition-colors">
                  Subscribe
                </button>
              </div>
              <p className="text-blue-200 text-sm mt-4">
                We respect your privacy. Unsubscribe at any time.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-xl font-bold mb-4">OptimizeBnb.AI</h3>
              <p className="text-gray-400">
                AI-powered tools to help Airbnb hosts maximize their success.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Features</h4>
              <ul className="space-y-2">
                <li><Link href="/welcome-guide" className="text-gray-400 hover:text-white">Welcome Guide</Link></li>
                <li><Link href="/photo-analysis" className="text-gray-400 hover:text-white">Photo Analysis</Link></li>
                <li><Link href="/seo-optimization" className="text-gray-400 hover:text-white">SEO Optimization</Link></li>
                <li><Link href="/review-analysis" className="text-gray-400 hover:text-white">Review Analysis</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Resources</h4>
              <ul className="space-y-2">
                <li><Link href="/blog" className="text-gray-400 hover:text-white">Blog</Link></li>
                <li><Link href="/guides" className="text-gray-400 hover:text-white">Host Guides</Link></li>
                <li><Link href="/faq" className="text-gray-400 hover:text-white">FAQ</Link></li>
                <li><Link href="/support" className="text-gray-400 hover:text-white">Support</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Company</h4>
              <ul className="space-y-2">
                <li><Link href="/about" className="text-gray-400 hover:text-white">About Us</Link></li>
                <li><Link href="/contact" className="text-gray-400 hover:text-white">Contact</Link></li>
                <li><Link href="/privacy" className="text-gray-400 hover:text-white">Privacy Policy</Link></li>
                <li><Link href="/terms" className="text-gray-400 hover:text-white">Terms of Service</Link></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-400">
            <p>© {new Date().getFullYear()} OptimizeBnb.AI. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
} 