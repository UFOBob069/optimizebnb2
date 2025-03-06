"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { 
  ArrowLeft, 
  MessageCircle, 
  Mail, 
  Phone, 
  FileText, 
  Clock, 
  Search,
  ChevronDown,
  ChevronUp,
  Send,
  CheckCircle,
  AlertCircle,
  HelpCircle,
  BookOpen,
  Video,
  Users
} from "lucide-react";

// FAQ Item component
function FAQItem({ question, answer }: { question: string; answer: string | React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  
  return (
    <div className="border-b border-gray-200 py-4">
      <button 
        className="flex justify-between items-center w-full text-left font-medium text-gray-900 focus:outline-none"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span>{question}</span>
        {isOpen ? <ChevronUp className="h-5 w-5 text-blue-600" /> : <ChevronDown className="h-5 w-5 text-blue-600" />}
      </button>
      {isOpen && (
        <div className="mt-3 text-gray-600">
          {answer}
        </div>
      )}
    </div>
  );
}

// Support Category component
function SupportCategory({ 
  icon, 
  title, 
  description, 
  href 
}: { 
  icon: React.ReactNode; 
  title: string; 
  description: string; 
  href: string; 
}) {
  return (
    <Link 
      href={href} 
      className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition-shadow flex flex-col h-full"
    >
      <div className="text-blue-600 mb-4">
        {icon}
      </div>
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="text-gray-600 mb-4">{description}</p>
      <div className="mt-auto">
        <span className="text-blue-600 font-medium inline-flex items-center">
          Learn more <span className="ml-1">→</span>
        </span>
      </div>
    </Link>
  );
}

export default function SupportPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Basic validation
    if (!name || !email || !message) {
      setError("Please fill out all required fields.");
      return;
    }
    
    // In a real app, you would send this data to your backend
    console.log({ name, email, subject, message });
    
    // Show success message
    setSubmitted(true);
    setError(null);
    
    // Reset form
    setName("");
    setEmail("");
    setSubject("");
    setMessage("");
    
    // Reset success message after 5 seconds
    setTimeout(() => {
      setSubmitted(false);
    }, 5000);
  };

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
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
          <div className="text-center">
            <h1 className="text-3xl md:text-5xl font-bold mb-6">How Can We Help You?</h1>
            <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto">
              Get the support you need to make the most of OptimizeBnb.AI
            </p>
            
            {/* Search Bar */}
            <div className="max-w-2xl mx-auto relative">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search for help articles, topics, or questions..."
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

      {/* Support Categories */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-12">Support Resources</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <SupportCategory
              icon={<BookOpen size={32} />}
              title="Knowledge Base"
              description="Browse our comprehensive guides and tutorials to get the most out of OptimizeBnb.AI."
              href="/support/knowledge-base"
            />
            
            <SupportCategory
              icon={<Video size={32} />}
              title="Video Tutorials"
              description="Watch step-by-step video guides on how to use all features of our platform."
              href="/support/video-tutorials"
            />
            
            <SupportCategory
              icon={<FileText size={32} />}
              title="Documentation"
              description="Detailed technical documentation for advanced users and developers."
              href="/support/documentation"
            />
            
            <SupportCategory
              icon={<Users size={32} />}
              title="Community Forum"
              description="Connect with other hosts, share tips, and get advice from the OptimizeBnb.AI community."
              href="/support/community"
            />
            
            <SupportCategory
              icon={<MessageCircle size={32} />}
              title="Live Chat Support"
              description="Chat with our support team in real-time during business hours for immediate assistance."
              href="/support/live-chat"
            />
            
            <SupportCategory
              icon={<HelpCircle size={32} />}
              title="Troubleshooting"
              description="Common issues and their solutions to quickly resolve problems you might encounter."
              href="/support/troubleshooting"
            />
          </div>
        </div>
      </section>

      {/* Frequently Asked Questions */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-4">Frequently Asked Questions</h2>
          <p className="text-center text-gray-600 mb-12">
            Find quick answers to common questions about our services
          </p>
          
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
            <div className="p-6 md:p-8">
              <FAQItem 
                question="How does OptimizeBnb.AI analyze my Airbnb listing?"
                answer={
                  <p>
                    Our AI-powered platform analyzes your Airbnb listing by examining multiple factors including your photos, description, pricing, amenities, and guest reviews. We use computer vision technology to evaluate your photos, natural language processing to analyze your description and reviews, and data analytics to assess your pricing strategy relative to similar listings in your area.
                  </p>
                }
              />
              
              <FAQItem 
                question="How long does it take to get results after submitting my listing?"
                answer={
                  <p>
                    Most analyses are completed within 5-10 minutes. For more comprehensive analyses, especially those involving many reviews or photos, it may take up to 30 minutes. You'll receive an email notification when your analysis is ready to view.
                  </p>
                }
              />
              
              <FAQItem 
                question="Is my Airbnb listing data secure?"
                answer={
                  <div>
                    <p className="mb-2">
                      Yes, we take data security very seriously. All data is encrypted both in transit and at rest. We only access the public information from your Airbnb listing that any guest would see.
                    </p>
                    <p>
                      We do not store your Airbnb login credentials, and we never access your Airbnb account directly. For more information, please see our <Link href="/privacy" className="text-blue-600 hover:text-blue-800">Privacy Policy</Link>.
                    </p>
                  </div>
                }
              />
              
              <FAQItem 
                question="Can I use OptimizeBnb.AI for multiple listings?"
                answer={
                  <p>
                    Yes! You can analyze as many listings as you want. Our Premium and Business plans offer bulk analysis features that make it easy to optimize multiple properties at once. Each listing will receive its own detailed analysis and recommendations.
                  </p>
                }
              />
              
              <FAQItem 
                question="How often should I re-analyze my listing?"
                answer={
                  <p>
                    We recommend re-analyzing your listing every 3-4 months, or whenever you make significant changes to your property or listing. Additionally, it's a good idea to run a new analysis at the beginning of each season to optimize for seasonal trends and demand.
                  </p>
                }
              />
              
              <FAQItem 
                question="Do you offer refunds if I'm not satisfied?"
                answer={
                  <p>
                    Yes, we offer a 14-day money-back guarantee for all new subscriptions. If you're not completely satisfied with our service, contact our support team within 14 days of your purchase for a full refund, no questions asked.
                  </p>
                }
              />
              
              <FAQItem 
                question="Can OptimizeBnb.AI help with new listings that don't have reviews yet?"
                answer={
                  <p>
                    Absolutely! While reviews provide valuable data, our platform can still analyze and optimize your photos, description, pricing, and amenities even if you don't have any reviews yet. In fact, optimizing these elements before you get your first bookings can help you start strong and earn great reviews from the beginning.
                  </p>
                }
              />
              
              <FAQItem 
                question="How do I implement the recommendations?"
                answer={
                  <div>
                    <p className="mb-2">
                      All recommendations come with step-by-step instructions on how to implement them on your Airbnb listing. For many recommendations, we provide specific text suggestions that you can copy and paste directly into your listing.
                    </p>
                    <p>
                      Our Premium and Business plans also include implementation assistance where our team can help you implement the changes if needed.
                    </p>
                  </div>
                }
              />
            </div>
          </div>
          
          <div className="text-center mt-8">
            <Link 
              href="/faq" 
              className="text-blue-600 hover:text-blue-800 font-medium inline-flex items-center"
            >
              View all FAQs <span className="ml-1">→</span>
            </Link>
          </div>
        </div>
      </section>

      {/* Contact Options */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-4">Get in Touch</h2>
          <p className="text-center text-gray-600 mb-12">
            Can't find what you're looking for? We're here to help.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 text-center">
              <div className="inline-flex items-center justify-center w-12 h-12 bg-blue-100 rounded-full text-blue-600 mb-4">
                <Mail size={24} />
              </div>
              <h3 className="text-xl font-semibold mb-2">Email Support</h3>
              <p className="text-gray-600 mb-4">
                Get a response within 24 hours
              </p>
              <a 
                href="mailto:support@optimizebnb.ai" 
                className="text-blue-600 hover:text-blue-800 font-medium"
              >
                support@optimizebnb.ai
              </a>
            </div>
            
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 text-center">
              <div className="inline-flex items-center justify-center w-12 h-12 bg-blue-100 rounded-full text-blue-600 mb-4">
                <MessageCircle size={24} />
              </div>
              <h3 className="text-xl font-semibold mb-2">Live Chat</h3>
              <p className="text-gray-600 mb-4">
                Available Monday-Friday<br />9am-5pm EST
              </p>
              <button 
                className="text-blue-600 hover:text-blue-800 font-medium"
                onClick={() => alert("Live chat would open here")}
              >
                Start a Chat
              </button>
            </div>
            
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 text-center">
              <div className="inline-flex items-center justify-center w-12 h-12 bg-blue-100 rounded-full text-blue-600 mb-4">
                <Phone size={24} />
              </div>
              <h3 className="text-xl font-semibold mb-2">Phone Support</h3>
              <p className="text-gray-600 mb-4">
                Premium & Business plans only
              </p>
              <a 
                href="tel:+18005551234" 
                className="text-blue-600 hover:text-blue-800 font-medium"
              >
                +1 (800) 555-1234
              </a>
            </div>
          </div>
          
          {/* Contact Form */}
          <div className="max-w-3xl mx-auto">
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
              <div className="p-6 md:p-8">
                <h3 className="text-2xl font-semibold mb-6">Send Us a Message</h3>
                
                {submitted && (
                  <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg text-green-700 flex items-start">
                    <CheckCircle className="h-5 w-5 mr-2 mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="font-medium">Message sent successfully!</p>
                      <p>We'll get back to you as soon as possible.</p>
                    </div>
                  </div>
                )}
                
                {error && (
                  <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg text-red-700 flex items-start">
                    <AlertCircle className="h-5 w-5 mr-2 mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="font-medium">Error</p>
                      <p>{error}</p>
                    </div>
                  </div>
                )}
                
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                        Name <span className="text-red-500">*</span>
                      </label>
                      <input
                        id="name"
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        required
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                        Email <span className="text-red-500">*</span>
                      </label>
                      <input
                        id="email"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        required
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-1">
                      Subject
                    </label>
                    <input
                      id="subject"
                      type="text"
                      value={subject}
                      onChange={(e) => setSubject(e.target.value)}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                      Message <span className="text-red-500">*</span>
                    </label>
                    <textarea
                      id="message"
                      rows={5}
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      required
                    ></textarea>
                  </div>
                  
                  <div>
                    <button
                      type="submit"
                      className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg inline-flex items-center transition-colors"
                    >
                      <Send className="h-5 w-5 mr-2" />
                      Send Message
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Support Hours */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
            <div className="p-6 md:p-8">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                <div className="mb-6 md:mb-0">
                  <h2 className="text-2xl font-semibold mb-2">Support Hours</h2>
                  <p className="text-gray-600">
                    Our team is available to help during the following hours:
                  </p>
                </div>
                
                <div className="flex items-center text-blue-600">
                  <Clock size={24} className="mr-2" />
                  <div>
                    <p className="font-medium">Monday - Friday</p>
                    <p>9:00 AM - 8:00 PM EST</p>
                  </div>
                </div>
              </div>
              
              <hr className="my-6" />
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <h3 className="font-semibold mb-2">Email Support</h3>
                  <p className="text-gray-600">
                    24/7 - Response within 24 hours
                  </p>
                </div>
                
                <div>
                  <h3 className="font-semibold mb-2">Live Chat</h3>
                  <p className="text-gray-600">
                    Monday - Friday, 9:00 AM - 5:00 PM EST
                  </p>
                </div>
                
                <div>
                  <h3 className="font-semibold mb-2">Phone Support</h3>
                  <p className="text-gray-600">
                    Monday - Friday, 10:00 AM - 4:00 PM EST<br />
                    (Premium & Business plans only)
                  </p>
                </div>
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