"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { 
  ArrowLeft, 
  Search, 
  TrendingUp, 
  Clock, 
  Eye, 
  BookOpen, 
  Calendar,
  Tag,
  ChevronRight,
  Filter,
  Share2,
  Bookmark,
  MessageCircle
} from "lucide-react";

// Blog Card Component
function BlogCard({ 
  title, 
  excerpt, 
  image, 
  category, 
  readTime, 
  date, 
  views,
  featured = false,
  author = { name: "", image: "", role: "" },
  href
}: { 
  title: string; 
  excerpt: string; 
  image: string; 
  category: string; 
  readTime: string; 
  date: string;
  views: string;
  featured?: boolean;
  author?: { name: string; image: string; role: string; };
  href: string;
}) {
  return (
    <Link 
      href={href} 
      className={`block group ${featured ? 'md:col-span-2 lg:col-span-2' : ''}`}
    >
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden transition-all hover:shadow-md h-full">
        <div className="relative h-56 md:h-64 overflow-hidden">
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
        <div className="p-6">
          <h3 className="text-xl font-semibold mb-3 group-hover:text-blue-600 transition-colors">
            {title}
          </h3>
          <p className="text-gray-600 mb-4 line-clamp-2">
            {excerpt}
          </p>
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              {author.image && (
                <div className="relative w-8 h-8 rounded-full overflow-hidden mr-3">
                  <Image
                    src={author.image}
                    alt={author.name}
                    fill
                    className="object-cover"
                  />
                </div>
              )}
              <div>
                <p className="text-sm font-medium">{author.name}</p>
                <p className="text-xs text-gray-500">{author.role}</p>
              </div>
            </div>
            <div className="flex items-center text-sm text-gray-500">
              <Clock className="h-4 w-4 mr-1" />
              <span className="mr-3">{readTime}</span>
              <Eye className="h-4 w-4 mr-1" />
              <span>{views}</span>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}

// Featured Article Component
function FeaturedArticle() {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
      <div className="grid grid-cols-1 md:grid-cols-2">
        <div className="relative h-64 md:h-auto">
          <Image
            src="/blog/featured-article.jpg"
            alt="Featured Article"
            fill
            className="object-cover"
          />
          <div className="absolute top-3 left-3">
            <span className="bg-blue-600 text-white text-xs font-medium px-2.5 py-1 rounded-full">
              Featured
            </span>
          </div>
        </div>
        <div className="p-8 md:p-12 flex flex-col justify-center">
          <div className="flex items-center mb-4">
            <Tag className="h-4 w-4 text-blue-600 mr-2" />
            <span className="text-blue-600 font-medium">Industry Insights</span>
          </div>
          <h2 className="text-2xl md:text-3xl font-bold mb-4">
            The Future of Short-Term Rentals: AI and Automation in 2024
          </h2>
          <p className="text-gray-600 mb-6">
            Discover how artificial intelligence and automation are transforming the Airbnb landscape and what hosts need to know to stay ahead of the curve.
          </p>
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center">
              <div className="relative w-10 h-10 rounded-full overflow-hidden mr-3">
                <Image
                  src="/team/expert.jpg"
                  alt="Author"
                  fill
                  className="object-cover"
                />
              </div>
              <div>
                <p className="font-medium">Dr. Sarah Chen</p>
                <p className="text-sm text-gray-500">AI Research Director</p>
              </div>
            </div>
            <div className="flex items-center text-sm text-gray-500">
              <Clock className="h-4 w-4 mr-1" />
              <span className="mr-3">15 min read</span>
              <Eye className="h-4 w-4 mr-1" />
              <span>24.5k views</span>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Link 
              href="/blog/future-of-short-term-rentals" 
              className="bg-blue-600 text-white hover:bg-blue-700 font-medium px-5 py-2.5 rounded-lg transition-colors inline-flex items-center"
            >
              Read Article <ChevronRight className="ml-1 h-4 w-4" />
            </Link>
            <button className="p-2.5 rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors">
              <Share2 className="h-5 w-5 text-gray-600" />
            </button>
            <button className="p-2.5 rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors">
              <Bookmark className="h-5 w-5 text-gray-600" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

// Trending Topic Card Component
function TrendingTopicCard({
  number,
  title,
  views,
  href
}: {
  number: number;
  title: string;
  views: string;
  href: string;
}) {
  return (
    <Link 
      href={href}
      className="flex items-center p-4 bg-white rounded-lg border border-gray-100 hover:shadow-sm transition-shadow"
    >
      <span className="text-2xl font-bold text-blue-600 mr-4">#{number}</span>
      <div className="flex-grow">
        <h3 className="font-medium mb-1">{title}</h3>
        <div className="flex items-center text-sm text-gray-500">
          <Eye className="h-4 w-4 mr-1" />
          <span>{views} views</span>
        </div>
      </div>
      <ChevronRight className="h-5 w-5 text-gray-400" />
    </Link>
  );
}

export default function BlogPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");
  
  const categories = [
    "All",
    "Industry Insights",
    "Host Tips",
    "Success Stories",
    "Technology",
    "Market Trends",
    "Guest Experience",
    "Property Management"
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
            <h1 className="text-3xl md:text-5xl font-bold mb-6">OptimizeBnb.AI Blog</h1>
            <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto">
              Expert insights, industry trends, and success stories from the world of Airbnb hosting
            </p>
            
            {/* Search Bar */}
            <div className="max-w-2xl mx-auto relative">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search articles..."
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
          {/* Featured Article */}
          <div className="mb-12">
            <FeaturedArticle />
          </div>
          
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
                <button
                  key={category}
                  onClick={() => setActiveCategory(category)}
                  className={`px-4 py-2 rounded-full border transition-colors ${
                    activeCategory === category
                      ? 'bg-blue-600 text-white border-blue-600'
                      : 'bg-white text-gray-700 border-gray-200 hover:bg-gray-50'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Main Articles Column */}
            <div className="lg:col-span-3">
              {/* Latest Articles */}
              <div className="mb-12">
                <h2 className="text-2xl font-bold mb-6">Latest Articles</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <BlogCard
                    title="10 Must-Have Smart Home Devices for Your Airbnb"
                    excerpt="Transform your rental into a tech-savvy haven with these essential smart home devices that guests love."
                    image="/blog/smart-home.jpg"
                    category="Technology"
                    readTime="8 min read"
                    date="Jan 15, 2024"
                    views="8.2k"
                    author={{
                      name: "Mike Roberts",
                      image: "/team/tech.jpg",
                      role: "Tech Editor"
                    }}
                    href="/blog/smart-home-devices"
                  />
                  
                  <BlogCard
                    title="How to Create an Instagram-Worthy Airbnb Space"
                    excerpt="Design tips and staging secrets that will make your property stand out on social media and attract more bookings."
                    image="/blog/instagram.jpg"
                    category="Host Tips"
                    readTime="12 min read"
                    date="Jan 12, 2024"
                    views="15.3k"
                    author={{
                      name: "Emma Chen",
                      image: "/team/design.jpg",
                      role: "Interior Designer"
                    }}
                    href="/blog/instagram-worthy-space"
                  />
                  
                  <BlogCard
                    title="Maximizing Revenue: Dynamic Pricing Strategies"
                    excerpt="Learn how to implement dynamic pricing to optimize your rates and increase your rental income."
                    image="/blog/pricing.jpg"
                    category="Market Trends"
                    readTime="10 min read"
                    date="Jan 10, 2024"
                    views="12.1k"
                    author={{
                      name: "David Kumar",
                      image: "/team/finance.jpg",
                      role: "Revenue Specialist"
                    }}
                    href="/blog/dynamic-pricing"
                  />
                  
                  <BlogCard
                    title="The Ultimate Guide to Airbnb SEO"
                    excerpt="Boost your listing's visibility with these proven search engine optimization techniques."
                    image="/blog/seo.jpg"
                    category="Host Tips"
                    readTime="15 min read"
                    date="Jan 8, 2024"
                    views="18.7k"
                    author={{
                      name: "Lisa Zhang",
                      image: "/team/marketing.jpg",
                      role: "SEO Expert"
                    }}
                    href="/blog/airbnb-seo-guide"
                  />
                </div>
              </div>
              
              {/* Success Stories */}
              <div>
                <h2 className="text-2xl font-bold mb-6">Success Stories</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <BlogCard
                    title="From One Property to Twenty: A Host's Journey"
                    excerpt="How Sarah built a thriving Airbnb business from scratch using data-driven decisions and automation."
                    image="/blog/success.jpg"
                    category="Success Stories"
                    readTime="18 min read"
                    date="Jan 5, 2024"
                    views="22.4k"
                    author={{
                      name: "Sarah Thompson",
                      image: "/team/host.jpg",
                      role: "Superhost"
                    }}
                    href="/blog/host-success-story"
                  />
                  
                  <BlogCard
                    title="Turning a Historic Building into a Five-Star Airbnb"
                    excerpt="The remarkable transformation of a 100-year-old property into a modern, luxurious vacation rental."
                    image="/blog/historic.jpg"
                    category="Success Stories"
                    readTime="14 min read"
                    date="Jan 3, 2024"
                    views="19.8k"
                    author={{
                      name: "James Wilson",
                      image: "/team/architect.jpg",
                      role: "Property Developer"
                    }}
                    href="/blog/historic-renovation"
                  />
                </div>
              </div>
            </div>
            
            {/* Sidebar */}
            <div className="lg:col-span-1">
              {/* Trending Topics */}
              <div className="bg-gray-50 rounded-xl p-6 mb-8">
                <h2 className="text-xl font-bold mb-4 flex items-center">
                  <TrendingUp className="h-5 w-5 text-blue-600 mr-2" />
                  Trending Topics
                </h2>
                <div className="space-y-3">
                  <TrendingTopicCard
                    number={1}
                    title="AI-Powered Hosting Tools"
                    views="45.2k"
                    href="/blog/ai-hosting-tools"
                  />
                  <TrendingTopicCard
                    number={2}
                    title="Sustainable Hosting Practices"
                    views="38.9k"
                    href="/blog/sustainable-hosting"
                  />
                  <TrendingTopicCard
                    number={3}
                    title="Guest Communication Templates"
                    views="32.7k"
                    href="/blog/communication-templates"
                  />
                  <TrendingTopicCard
                    number={4}
                    title="2024 Travel Trends"
                    views="29.4k"
                    href="/blog/travel-trends-2024"
                  />
                  <TrendingTopicCard
                    number={5}
                    title="Remote Check-in Solutions"
                    views="25.1k"
                    href="/blog/remote-check-in"
                  />
                </div>
              </div>
              
              {/* Newsletter Signup */}
              <div className="bg-blue-600 rounded-xl p-6 text-white">
                <h2 className="text-xl font-bold mb-2">Stay Updated</h2>
                <p className="text-blue-100 mb-4">
                  Get the latest hosting tips and industry insights delivered to your inbox.
                </p>
                <div className="space-y-3">
                  <input
                    type="email"
                    placeholder="Your email address"
                    className="w-full px-4 py-2 rounded-lg text-gray-900"
                  />
                  <button className="w-full bg-white text-blue-600 hover:bg-blue-50 font-medium py-2 rounded-lg transition-colors">
                    Subscribe
                  </button>
                </div>
                <p className="text-blue-200 text-sm mt-3">
                  No spam, unsubscribe anytime.
                </p>
              </div>
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