import Image from 'next/image'
import Link from 'next/link'
import { 
  ArrowLeft, 
  Clock, 
  Eye, 
  Calendar,
  Share2,
  Bookmark,
  Facebook,
  Twitter,
  Linkedin,
  Copy,
  ChevronRight
} from 'lucide-react'

export default function SmartHomeDevices() {
  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <Link href="/blog" className="inline-flex items-center text-blue-600 hover:text-blue-800 font-medium">
            <ArrowLeft size={16} className="mr-2" /> Back to Blog
          </Link>
        </div>
      </header>

      {/* Article Content */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Article Header */}
        <div className="mb-10">
          <div className="flex items-center mb-4">
            <span className="bg-blue-600 text-white text-xs font-medium px-2.5 py-1 rounded-full">
              Technology
            </span>
            <span className="mx-2 text-gray-400">•</span>
            <div className="flex items-center text-gray-500 text-sm">
              <Calendar className="h-4 w-4 mr-1" />
              <span>January 20, 2024</span>
            </div>
          </div>
          
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 text-gray-900 leading-tight">
            10 Must-Have Smart Home Devices for Your Airbnb
          </h1>
          
          <p className="text-xl text-gray-600 mb-8 leading-relaxed">
            Transform your rental into a tech-savvy haven with these essential smart home devices that guests love.
          </p>
          
          <div className="flex items-center justify-between pb-6 border-b border-gray-200">
            <div className="flex items-center">
              <div className="relative w-12 h-12 rounded-full overflow-hidden mr-4">
                <Image
                  src="/team/tech.jpg"
                  alt="Mike Roberts"
                  width={48}
                  height={48}
                  className="object-cover"
                />
              </div>
              <div>
                <p className="font-medium">Mike Roberts</p>
                <p className="text-sm text-gray-500">Tech Editor</p>
              </div>
            </div>
            <div className="flex items-center text-sm text-gray-500">
              <Clock className="h-4 w-4 mr-1" />
              <span className="mr-3">8 min read</span>
              <Eye className="h-4 w-4 mr-1" />
              <span>12.3k views</span>
            </div>
          </div>
        </div>
        
        {/* Featured Image */}
        <div className="relative h-[400px] mb-12 rounded-xl overflow-hidden shadow-lg">
          <Image
            src="/blog/smart-home.jpg"
            alt="Smart Home Devices for Airbnb"
            fill
            className="object-cover"
            priority
          />
        </div>
        
        {/* Article Body */}
        <div className="prose prose-lg max-w-none prose-headings:text-gray-900 prose-headings:font-bold prose-p:text-gray-700 prose-p:leading-relaxed prose-li:text-gray-700 prose-strong:text-gray-900 prose-strong:font-semibold">
          <h2 className="text-2xl md:text-3xl mb-6 mt-10">Introduction: The Smart Advantage</h2>
          <p className="mb-6">
            In today's competitive Airbnb market, having a tech-savvy rental can significantly enhance your guests' experience and set your property apart. Smart home devices not only provide convenience and comfort but can also improve security, energy efficiency, and your bottom line.
          </p>
          <p className="mb-8">
            We've curated a list of the 10 most impactful smart devices that can transform your Airbnb into a modern, efficient, and guest-friendly space. Each device has been selected based on reliability, ease of use, and positive guest feedback.
          </p>

          <h2 className="text-2xl md:text-3xl mb-6 mt-10">1. Smart Lock System</h2>
          <p className="mb-6">
            A smart lock is arguably the most essential smart device for any Airbnb property. It eliminates the need for physical key handoffs and provides secure, convenient access for your guests.
          </p>
          <div className="bg-blue-50 p-8 rounded-xl my-6 border-l-4 border-blue-600 shadow-sm">
            <h4 className="text-lg font-semibold text-blue-800 mb-3">Recommended Features:</h4>
            <ul className="list-disc pl-6 space-y-2">
              <li>Keypad entry with customizable codes</li>
              <li>Mobile app control and monitoring</li>
              <li>Auto-lock functionality</li>
              <li>Guest code scheduling</li>
              <li>Activity log tracking</li>
            </ul>
            <p className="mt-4 text-sm text-gray-600">
              Top Pick: The Yale Assure Lock 2 offers reliability, easy installation, and seamless integration with major smart home platforms.
            </p>
          </div>

          <h2 className="text-2xl md:text-3xl mb-6 mt-10">2. Smart Thermostat</h2>
          <p className="mb-6">
            A smart thermostat helps maintain optimal comfort while reducing energy costs. It allows guests to easily control the temperature and enables you to monitor and adjust settings remotely.
          </p>
          <ul className="list-disc pl-6 mb-8 space-y-2">
            <li>Remote temperature control and monitoring</li>
            <li>Energy usage reports and cost-saving features</li>
            <li>Automated scheduling</li>
            <li>Integration with voice assistants</li>
            <li>Occupancy-based temperature adjustment</li>
          </ul>

          <h2 className="text-2xl md:text-3xl mb-6 mt-10">3. Video Doorbell</h2>
          <p className="mb-6">
            A video doorbell enhances security and provides peace of mind for both hosts and guests. It allows you to monitor arrivals and departures while giving guests a way to screen visitors.
          </p>
          <div className="bg-blue-50 p-8 rounded-xl my-6 border-l-4 border-blue-600 shadow-sm">
            <h4 className="text-lg font-semibold text-blue-800 mb-3">Key Benefits:</h4>
            <ul className="list-disc pl-6 space-y-2">
              <li>HD video with night vision</li>
              <li>Two-way audio communication</li>
              <li>Motion detection alerts</li>
              <li>Cloud recording options</li>
              <li>Weather-resistant design</li>
            </ul>
          </div>

          <h2 className="text-2xl md:text-3xl mb-6 mt-10">4. Smart Lighting System</h2>
          <p className="mb-6">
            Smart lighting adds ambiance, convenience, and security to your rental. It can be programmed to welcome guests, save energy, and create the perfect atmosphere.
          </p>
          <ul className="list-disc pl-6 mb-8 space-y-2">
            <li>Automated schedules and scenes</li>
            <li>Remote control via smartphone</li>
            <li>Motion-activated options</li>
            <li>Dimming capabilities</li>
            <li>Energy usage monitoring</li>
          </ul>

          <h2 className="text-2xl md:text-3xl mb-6 mt-10">5. Smart Speaker with Voice Assistant</h2>
          <p className="mb-6">
            A smart speaker serves as a virtual concierge, helping guests control other smart devices, get local information, and enjoy entertainment hands-free.
          </p>
          <div className="bg-blue-50 p-8 rounded-xl my-6 border-l-4 border-blue-600 shadow-sm">
            <p className="italic mb-4 text-gray-700">
              "Smart speakers have become one of our most appreciated amenities. Guests love being able to ask for local recommendations, set alarms, and control other devices with voice commands."
            </p>
            <p className="mb-0 text-right font-medium text-gray-800">
              — Sarah Martinez, Superhost
            </p>
          </div>

          <h2 className="text-2xl md:text-3xl mb-6 mt-10">6. Smart TV and Streaming Setup</h2>
          <p className="mb-6">
            A smart TV with integrated streaming services provides entertainment options and a home-like experience for your guests.
          </p>
          <ul className="list-disc pl-6 mb-8 space-y-2">
            <li>Pre-installed streaming apps</li>
            <li>Guest account access</li>
            <li>Voice control compatibility</li>
            <li>Screen casting capabilities</li>
            <li>Local channel access</li>
          </ul>

          <h2 className="text-2xl md:text-3xl mb-6 mt-10">7. Smart Security Cameras</h2>
          <p className="mb-6">
            External security cameras provide safety and monitoring capabilities while respecting guest privacy. They help prevent unauthorized parties and monitor common areas.
          </p>
          <div className="bg-yellow-50 p-8 rounded-xl my-6 border-l-4 border-yellow-600 shadow-sm">
            <h4 className="text-lg font-semibold text-yellow-800 mb-3">Important Note:</h4>
            <p className="text-gray-700">
              Always disclose the presence and location of security cameras in your listing. Only install cameras in outdoor areas and never in private spaces.
            </p>
          </div>

          <h2 className="text-2xl md:text-3xl mb-6 mt-10">8. Smart Smoke and CO Detectors</h2>
          <p className="mb-6">
            Smart smoke and CO detectors provide crucial safety features with remote monitoring and instant alerts.
          </p>
          <ul className="list-disc pl-6 mb-8 space-y-2">
            <li>Mobile alerts for smoke or CO detection</li>
            <li>Battery level monitoring</li>
            <li>Regular self-testing</li>
            <li>Integration with other smart devices</li>
            <li>Emergency service connectivity</li>
          </ul>

          <h2 className="text-2xl md:text-3xl mb-6 mt-10">9. Smart Water Leak Detectors</h2>
          <p className="mb-6">
            Water leak detectors can prevent costly damage by alerting you to leaks early and even automatically shutting off water supply when necessary.
          </p>
          <ul className="list-disc pl-6 mb-8 space-y-2">
            <li>24/7 water monitoring</li>
            <li>Instant leak alerts</li>
            <li>Temperature monitoring for freeze prevention</li>
            <li>Historical water usage data</li>
            <li>Automatic water shutoff capability</li>
          </ul>

          <h2 className="text-2xl md:text-3xl mb-6 mt-10">10. Smart Plugs and Power Strips</h2>
          <p className="mb-6">
            Smart plugs provide convenient control over non-smart devices and help prevent energy waste from forgotten appliances.
          </p>
          <ul className="list-disc pl-6 mb-8 space-y-2">
            <li>Remote power control</li>
            <li>Energy monitoring</li>
            <li>Scheduling capabilities</li>
            <li>Voice control compatibility</li>
            <li>Surge protection</li>
          </ul>

          <h2 className="text-2xl md:text-3xl mb-6 mt-10">Implementation Tips</h2>
          <div className="bg-blue-50 p-8 rounded-xl my-6 border-l-4 border-blue-600 shadow-sm">
            <h4 className="text-lg font-semibold text-blue-800 mb-4">Best Practices for Smart Device Integration:</h4>
            <ol className="list-decimal pl-6 space-y-3">
              <li>Create a unified smart home system that works together seamlessly</li>
              <li>Provide clear instructions for all devices in your welcome guide</li>
              <li>Ensure reliable WiFi coverage throughout the property</li>
              <li>Set up a dedicated guest network for security</li>
              <li>Regularly update and maintain all smart devices</li>
            </ol>
          </div>

          <h2 className="text-2xl md:text-3xl mb-6 mt-10">Conclusion</h2>
          <p className="mb-6">
            Investing in smart home technology can significantly enhance your Airbnb's appeal, efficiency, and profitability. While the initial investment may seem substantial, the benefits in terms of guest satisfaction, operational efficiency, and property protection make it worthwhile.
          </p>
          <p className="mb-8">
            Start with the essential devices like smart locks and thermostats, then gradually expand your smart home ecosystem based on guest feedback and your property's specific needs. Remember to keep the user experience simple and intuitive, and always provide clear instructions for guests.
          </p>
        </div>
        
        {/* Article Footer */}
        <div className="mt-16 pt-8 border-t border-gray-200">
          {/* Tags */}
          <div className="mb-10">
            <h4 className="text-sm font-semibold text-gray-500 mb-4">RELATED TOPICS</h4>
            <div className="flex flex-wrap gap-2">
              <Link href="/blog/tag/technology" className="px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-full text-sm text-gray-700 transition-colors">
                Technology
              </Link>
              <Link href="/blog/tag/smart-home" className="px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-full text-sm text-gray-700 transition-colors">
                Smart Home
              </Link>
              <Link href="/blog/tag/airbnb" className="px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-full text-sm text-gray-700 transition-colors">
                Airbnb
              </Link>
              <Link href="/blog/tag/hosting" className="px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-full text-sm text-gray-700 transition-colors">
                Hosting
              </Link>
              <Link href="/blog/tag/security" className="px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-full text-sm text-gray-700 transition-colors">
                Security
              </Link>
            </div>
          </div>
          
          {/* Share */}
          <div className="mb-10">
            <h4 className="text-sm font-semibold text-gray-500 mb-4">SHARE THIS ARTICLE</h4>
            <div className="flex space-x-3">
              <button className="p-3 bg-gray-100 hover:bg-gray-200 rounded-full transition-colors">
                <Facebook className="h-5 w-5 text-gray-700" />
              </button>
              <button className="p-3 bg-gray-100 hover:bg-gray-200 rounded-full transition-colors">
                <Twitter className="h-5 w-5 text-gray-700" />
              </button>
              <button className="p-3 bg-gray-100 hover:bg-gray-200 rounded-full transition-colors">
                <Linkedin className="h-5 w-5 text-gray-700" />
              </button>
              <button className="p-3 bg-gray-100 hover:bg-gray-200 rounded-full transition-colors">
                <Copy className="h-5 w-5 text-gray-700" />
              </button>
            </div>
          </div>
          
          {/* Author Bio */}
          <div className="bg-gray-50 rounded-xl p-8 mb-12 shadow-sm">
            <div className="flex items-start">
              <div className="relative w-20 h-20 rounded-full overflow-hidden mr-6 flex-shrink-0">
                <Image
                  src="/team/tech.jpg"
                  alt="Mike Roberts"
                  width={80}
                  height={80}
                  className="object-cover"
                />
              </div>
              <div>
                <h4 className="font-bold text-lg mb-2">About the Author</h4>
                <p className="font-medium mb-2 text-gray-900">Mike Roberts</p>
                <p className="text-sm text-gray-600 mb-4">Tech Editor at OptimizeBnb.AI</p>
                <p className="text-gray-700 leading-relaxed">
                  Mike Roberts is a smart home technology expert with over a decade of experience in the IoT industry. He specializes in helping vacation rental owners leverage technology to improve guest experiences and operational efficiency.
                </p>
              </div>
            </div>
          </div>
          
          {/* Related Articles */}
          <div>
            <h3 className="text-2xl font-bold mb-8">You Might Also Like</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <Link href="/blog/future-of-short-term-rentals" className="group">
                <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden transition-all hover:shadow-md h-full">
                  <div className="relative h-52 overflow-hidden">
                    <Image
                      src="/blog/featured-article.jpg"
                      alt="Future of Short-Term Rentals"
                      fill
                      className="object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                  </div>
                  <div className="p-6">
                    <h4 className="font-medium text-lg mb-3 group-hover:text-blue-600 transition-colors">
                      The Future of Short-Term Rentals: AI and Automation in 2024
                    </h4>
                    <div className="flex items-center text-sm text-gray-500">
                      <Clock className="h-4 w-4 mr-1" />
                      <span>15 min read</span>
                    </div>
                  </div>
                </div>
              </Link>
              
              <Link href="/blog/guest-communication" className="group">
                <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden transition-all hover:shadow-md h-full">
                  <div className="relative h-52 overflow-hidden">
                    <Image
                      src="/blog/communication.jpg"
                      alt="Guest Communication"
                      fill
                      className="object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                  </div>
                  <div className="p-6">
                    <h4 className="font-medium text-lg mb-3 group-hover:text-blue-600 transition-colors">
                      Mastering Guest Communication: Tips and Templates
                    </h4>
                    <div className="flex items-center text-sm text-gray-500">
                      <Clock className="h-4 w-4 mr-1" />
                      <span>10 min read</span>
                    </div>
                  </div>
                </div>
              </Link>
              
              <Link href="/blog/airbnb-automation" className="group">
                <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden transition-all hover:shadow-md h-full">
                  <div className="relative h-52 overflow-hidden">
                    <Image
                      src="/blog/automation.jpg"
                      alt="Airbnb Automation"
                      fill
                      className="object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                  </div>
                  <div className="p-6">
                    <h4 className="font-medium text-lg mb-3 group-hover:text-blue-600 transition-colors">
                      Complete Guide to Airbnb Automation
                    </h4>
                    <div className="flex items-center text-sm text-gray-500">
                      <Clock className="h-4 w-4 mr-1" />
                      <span>12 min read</span>
                    </div>
                  </div>
                </div>
              </Link>
            </div>
          </div>
        </div>
      </main>

      {/* CTA Section */}
      <section className="bg-blue-600 text-white py-16 mt-16">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-6">Ready to Optimize Your Airbnb?</h2>
          <p className="text-xl text-blue-100 mb-8 max-w-3xl mx-auto">
            Discover how our AI-powered tools can help you automate your property management and enhance guest experiences.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link 
              href="/demo" 
              className="bg-white text-blue-600 hover:bg-blue-50 font-medium px-8 py-4 rounded-lg transition-colors inline-flex items-center justify-center text-lg shadow-lg"
            >
              Request a Demo
            </Link>
            <Link 
              href="/tools" 
              className="bg-blue-700 text-white hover:bg-blue-800 font-medium px-8 py-4 rounded-lg transition-colors inline-flex items-center justify-center text-lg shadow-lg"
            >
              Explore Our Tools <ChevronRight className="ml-2 h-5 w-5" />
            </Link>
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
                <li><Link href="/welcome-guide" className="text-gray-400 hover:text-white transition-colors">Welcome Guide</Link></li>
                <li><Link href="/photo-analysis" className="text-gray-400 hover:text-white transition-colors">Photo Analysis</Link></li>
                <li><Link href="/seo-optimization" className="text-gray-400 hover:text-white transition-colors">SEO Optimization</Link></li>
                <li><Link href="/review-analysis" className="text-gray-400 hover:text-white transition-colors">Review Analysis</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Resources</h4>
              <ul className="space-y-2">
                <li><Link href="/blog" className="text-gray-400 hover:text-white transition-colors">Blog</Link></li>
                <li><Link href="/guides" className="text-gray-400 hover:text-white transition-colors">Host Guides</Link></li>
                <li><Link href="/faq" className="text-gray-400 hover:text-white transition-colors">FAQ</Link></li>
                <li><Link href="/support" className="text-gray-400 hover:text-white transition-colors">Support</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Company</h4>
              <ul className="space-y-2">
                <li><Link href="/about" className="text-gray-400 hover:text-white transition-colors">About Us</Link></li>
                <li><Link href="/contact" className="text-gray-400 hover:text-white transition-colors">Contact</Link></li>
                <li><Link href="/privacy" className="text-gray-400 hover:text-white transition-colors">Privacy Policy</Link></li>
                <li><Link href="/terms" className="text-gray-400 hover:text-white transition-colors">Terms of Service</Link></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-400">
            <p>© {new Date().getFullYear()} OptimizeBnb.AI. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
} 