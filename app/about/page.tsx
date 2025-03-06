"use client";

import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, CheckCircle, Users, Award, TrendingUp, Heart, Shield } from "lucide-react";

export default function AboutPage() {
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
      <section className="relative bg-blue-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="md:w-2/3">
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">
              About OptimizeBnb.AI
            </h1>
            <p className="text-xl md:text-2xl mb-8">
              We're on a mission to help Airbnb hosts maximize their success through data-driven insights and AI-powered optimization.
            </p>
          </div>
        </div>
        <div className="absolute bottom-0 right-0 w-full md:w-1/2 h-64 md:h-full opacity-10 md:opacity-20">
          <Image 
            src="/hero-pattern.svg" 
            alt="Background pattern" 
            fill 
            className="object-cover"
            priority
          />
        </div>
      </section>

      {/* Our Story Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Our Story</h2>
              <div className="space-y-4 text-gray-600">
                <p>
                  OptimizeBnb.AI was founded in 2023 by a team of Airbnb Superhosts, data scientists, and AI engineers who recognized a critical gap in the short-term rental market: hosts lacked access to sophisticated tools that could help them optimize their listings and improve guest experiences.
                </p>
                <p>
                  After managing over 50 properties collectively and analyzing thousands of guest reviews, our founding team identified patterns that consistently led to higher bookings, better reviews, and increased revenue. We built OptimizeBnb.AI to share these insights with hosts worldwide.
                </p>
                <p>
                  What started as a simple tool to analyze listing descriptions has evolved into a comprehensive platform that helps hosts optimize every aspect of their Airbnb business—from photos and pricing to guest communication and amenities.
                </p>
              </div>
            </div>
            <div className="relative h-96 rounded-xl overflow-hidden shadow-xl">
              <Image
                src="/about-team.jpg"
                alt="Our team of experts"
                fill
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Our Mission Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Mission</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              To empower Airbnb hosts with AI-driven insights that enhance guest experiences, maximize earnings, and create sustainable hosting businesses.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100">
              <div className="text-blue-600 mb-4">
                <TrendingUp size={40} />
              </div>
              <h3 className="text-xl font-semibold mb-3">Data-Driven Success</h3>
              <p className="text-gray-600">
                We analyze millions of data points from successful Airbnb listings to provide actionable recommendations that drive real results.
              </p>
            </div>
            <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100">
              <div className="text-blue-600 mb-4">
                <Heart size={40} />
              </div>
              <h3 className="text-xl font-semibold mb-3">Guest-Centric Approach</h3>
              <p className="text-gray-600">
                We help hosts create exceptional guest experiences that lead to five-star reviews, repeat bookings, and word-of-mouth referrals.
              </p>
            </div>
            <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100">
              <div className="text-blue-600 mb-4">
                <Shield size={40} />
              </div>
              <h3 className="text-xl font-semibold mb-3">Host Advocacy</h3>
              <p className="text-gray-600">
                We're committed to helping hosts navigate platform changes, market fluctuations, and industry challenges to build sustainable businesses.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Our Approach Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">Our Approach</h2>
          
          <div className="space-y-12">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
              <div className="md:col-span-7 order-2 md:order-1">
                <h3 className="text-2xl font-semibold mb-4">AI-Powered Analysis</h3>
                <p className="text-gray-600 mb-4">
                  Our proprietary algorithms analyze every aspect of your Airbnb listing—from photos and descriptions to pricing and reviews—to identify opportunities for improvement.
                </p>
                <ul className="space-y-2">
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                    <span>Computer vision technology evaluates listing photos for quality and appeal</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                    <span>Natural language processing analyzes guest reviews to identify patterns</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                    <span>Market analysis tools compare your listing to top performers in your area</span>
                  </li>
                </ul>
              </div>
              <div className="md:col-span-5 order-1 md:order-2">
                <div className="relative h-64 md:h-80 rounded-xl overflow-hidden shadow-lg">
                  <Image
                    src="/ai-analysis.jpg"
                    alt="AI-Powered Analysis"
                    fill
                    className="object-cover"
                  />
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
              <div className="md:col-span-5">
                <div className="relative h-64 md:h-80 rounded-xl overflow-hidden shadow-lg">
                  <Image
                    src="/actionable-insights.jpg"
                    alt="Actionable Insights"
                    fill
                    className="object-cover"
                  />
                </div>
              </div>
              <div className="md:col-span-7">
                <h3 className="text-2xl font-semibold mb-4">Actionable Insights</h3>
                <p className="text-gray-600 mb-4">
                  We don't just provide data—we translate complex analyses into clear, actionable recommendations that you can implement immediately.
                </p>
                <ul className="space-y-2">
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                    <span>Prioritized recommendations based on potential impact</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                    <span>Step-by-step implementation guides for each suggestion</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                    <span>Before/after comparisons to visualize improvements</span>
                  </li>
                </ul>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
              <div className="md:col-span-7 order-2 md:order-1">
                <h3 className="text-2xl font-semibold mb-4">Continuous Improvement</h3>
                <p className="text-gray-600 mb-4">
                  Optimization isn't a one-time event—it's an ongoing process. Our platform helps you continuously refine your listing based on new data and changing market conditions.
                </p>
                <ul className="space-y-2">
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                    <span>Regular re-analysis of your listing to track improvements</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                    <span>Seasonal recommendations to maximize bookings year-round</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                    <span>Alerts when new optimization opportunities are identified</span>
                  </li>
                </ul>
              </div>
              <div className="md:col-span-5 order-1 md:order-2">
                <div className="relative h-64 md:h-80 rounded-xl overflow-hidden shadow-lg">
                  <Image
                    src="/continuous-improvement.jpg"
                    alt="Continuous Improvement"
                    fill
                    className="object-cover"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Meet Our Team Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Meet Our Team</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Our diverse team combines expertise in hospitality, data science, and AI to deliver exceptional results for hosts.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <TeamMember
              name="Sarah Johnson"
              role="Founder & CEO"
              bio="Former Airbnb Superhost with 7+ years of experience managing 15+ properties. Sarah has a background in data analytics and a passion for helping hosts succeed."
              image="/team-sarah.jpg"
            />
            <TeamMember
              name="David Chen"
              role="Chief Technology Officer"
              bio="AI engineer with 10+ years of experience building machine learning systems. David leads our engineering team and oversees the development of our AI algorithms."
              image="/team-david.jpg"
            />
            <TeamMember
              name="Maria Rodriguez"
              role="Head of Host Success"
              bio="Hospitality industry veteran with experience at major hotel chains. Maria ensures our recommendations align with industry best practices and guest expectations."
              image="/team-maria.jpg"
            />
            <TeamMember
              name="James Wilson"
              role="Data Science Lead"
              bio="PhD in Computer Science specializing in natural language processing. James develops the algorithms that analyze listing descriptions and guest reviews."
              image="/team-james.jpg"
            />
            <TeamMember
              name="Emily Patel"
              role="UX/UI Designer"
              bio="Award-winning designer focused on creating intuitive user experiences. Emily ensures our platform is accessible and easy to use for hosts of all technical abilities."
              image="/team-emily.jpg"
            />
            <TeamMember
              name="Michael Thompson"
              role="Marketing Director"
              bio="Digital marketing expert with a focus on the travel industry. Michael helps hosts understand how to effectively market their properties to potential guests."
              image="/team-michael.jpg"
            />
          </div>
        </div>
      </section>

      {/* Our Values Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Values</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              These core principles guide everything we do at OptimizeBnb.AI
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-blue-50 p-8 rounded-xl">
              <h3 className="text-xl font-semibold mb-3 text-blue-800">Data-Driven Excellence</h3>
              <p className="text-gray-700">
                We believe in making decisions based on data, not assumptions. Our recommendations are backed by rigorous analysis and proven to drive results.
              </p>
            </div>
            <div className="bg-blue-50 p-8 rounded-xl">
              <h3 className="text-xl font-semibold mb-3 text-blue-800">Host-First Mentality</h3>
              <p className="text-gray-700">
                We exist to serve hosts. Every feature we build and recommendation we make is designed to make hosting easier, more profitable, and more enjoyable.
              </p>
            </div>
            <div className="bg-blue-50 p-8 rounded-xl">
              <h3 className="text-xl font-semibold mb-3 text-blue-800">Continuous Innovation</h3>
              <p className="text-gray-700">
                The short-term rental market is constantly evolving, and so are we. We're committed to continuous improvement and staying ahead of industry trends.
              </p>
            </div>
            <div className="bg-blue-50 p-8 rounded-xl">
              <h3 className="text-xl font-semibold mb-3 text-blue-800">Ethical AI</h3>
              <p className="text-gray-700">
                We develop AI responsibly, with a focus on transparency, fairness, and privacy. We're committed to using technology ethically to benefit hosts and guests alike.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">What Our Users Say</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Don't just take our word for it—hear from hosts who have transformed their Airbnb businesses with OptimizeBnb.AI
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100">
              <div className="flex items-center mb-4">
                <div className="flex text-yellow-400">
                  {[...Array(5)].map((_, i) => (
                    <svg key={i} className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                      <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                    </svg>
                  ))}
                </div>
              </div>
              <p className="text-gray-700 mb-6">
                "After implementing the recommendations from OptimizeBnb.AI, my booking rate increased by 40% and my average nightly rate went up by $35. The ROI has been incredible."
              </p>
              <div>
                <p className="font-semibold">Robert M.</p>
                <p className="text-gray-500 text-sm">Superhost in Denver, CO</p>
              </div>
            </div>
            <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100">
              <div className="flex items-center mb-4">
                <div className="flex text-yellow-400">
                  {[...Array(5)].map((_, i) => (
                    <svg key={i} className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                      <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                    </svg>
                  ))}
                </div>
              </div>
              <p className="text-gray-700 mb-6">
                "The review analysis feature helped me identify issues I didn't even know existed. After addressing them, my average rating went from 4.7 to 4.9, and the positive reviews keep coming in."
              </p>
              <div>
                <p className="font-semibold">Jennifer T.</p>
                <p className="text-gray-500 text-sm">Host in Austin, TX</p>
              </div>
            </div>
            <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100">
              <div className="flex items-center mb-4">
                <div className="flex text-yellow-400">
                  {[...Array(5)].map((_, i) => (
                    <svg key={i} className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                      <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                    </svg>
                  ))}
                </div>
              </div>
              <p className="text-gray-700 mb-6">
                "As a new host, I was overwhelmed by all the aspects of managing my listing. OptimizeBnb.AI gave me clear, actionable steps that helped me get bookings right away. It's like having a mentor in my pocket."
              </p>
              <div>
                <p className="font-semibold">Carlos R.</p>
                <p className="text-gray-500 text-sm">New Host in Miami, FL</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-blue-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Ready to Optimize Your Airbnb Listing?
          </h2>
          <p className="text-xl mb-8 max-w-3xl mx-auto">
            Join thousands of hosts who are maximizing their earnings and delighting their guests with OptimizeBnb.AI.
          </p>
          <Link 
            href="/analyze" 
            className="bg-white text-blue-600 hover:bg-blue-50 font-semibold px-8 py-4 rounded-lg inline-block transition-colors"
          >
            Get Started for Free
          </Link>
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

// Team Member Component
function TeamMember({ 
  name, 
  role, 
  bio, 
  image 
}: { 
  name: string; 
  role: string; 
  bio: string; 
  image: string; 
}) {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
      <div className="relative h-64">
        <Image
          src={image}
          alt={name}
          fill
          className="object-cover"
        />
      </div>
      <div className="p-6">
        <h3 className="text-xl font-semibold mb-1">{name}</h3>
        <p className="text-blue-600 font-medium mb-3">{role}</p>
        <p className="text-gray-600">{bio}</p>
      </div>
    </div>
  );
} 