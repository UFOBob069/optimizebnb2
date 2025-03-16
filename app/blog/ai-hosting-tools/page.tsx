"use client";

import Image from "next/image";
import Link from "next/link";
import { FaFacebook, FaTwitter, FaLinkedin } from "react-icons/fa";

export default function AIHostingToolsGuide() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <div className="relative h-[50vh] bg-blue-600">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-900/70 to-blue-600/70 z-10" />
        <Image
          src="/images/blog/ai-hosting-hero.jpg"
          alt="AI Hosting Tools"
          fill
          className="object-cover"
          priority
        />
        <div className="relative z-20 max-w-5xl mx-auto px-4 h-full flex flex-col justify-center text-white">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            AI-Powered Hosting Tools
          </h1>
          <p className="text-xl md:text-2xl">
            How smart hosts are leveraging artificial intelligence to automate, optimize, and elevate their vacation rental business.
          </p>
        </div>
      </div>

      {/* Author and Article Info */}
      <div className="max-w-4xl mx-auto px-4 py-8 flex flex-col md:flex-row justify-between items-center border-b border-gray-200">
        <div className="flex items-center mb-4 md:mb-0">
          <div className="w-12 h-12 rounded-full overflow-hidden mr-4">
            <Image
              src="/images/blog/elena-rodriguez.jpg"
              alt="Elena Rodriguez"
              width={48}
              height={48}
              className="object-cover"
            />
          </div>
          <div>
            <p className="font-semibold">Elena Rodriguez</p>
            <p className="text-gray-600 text-sm">Technology & Hospitality Specialist</p>
          </div>
        </div>
        <div className="flex items-center space-x-4">
          <div className="text-gray-600 text-sm flex items-center mr-6">
            <span className="mr-2">17 min read</span>
            <span>•</span>
            <span className="ml-2">24.5k views</span>
          </div>
          <div className="flex space-x-2">
            <button className="p-2 bg-blue-100 text-blue-600 rounded-full hover:bg-blue-200 transition-colors">
              <FaFacebook />
            </button>
            <button className="p-2 bg-blue-100 text-blue-600 rounded-full hover:bg-blue-200 transition-colors">
              <FaTwitter />
            </button>
            <button className="p-2 bg-blue-100 text-blue-600 rounded-full hover:bg-blue-200 transition-colors">
              <FaLinkedin />
            </button>
          </div>
        </div>
      </div>

      {/* Article Content */}
      <article className="max-w-4xl mx-auto px-4 py-12">
        <div className="prose prose-lg max-w-none">
          <h2>The AI Revolution in Vacation Rental Management</h2>
          <p>
            As the short-term rental industry grows increasingly competitive, savvy hosts are turning to artificial 
            intelligence to gain an edge. No longer just a buzzword, AI has become an essential toolkit for hosts looking 
            to streamline operations, enhance guest experiences, and maximize profitability—all while reducing their 
            personal workload.
          </p>
          <p>
            Today&apos;s AI-powered hosting tools go far beyond simple automation. They analyze vast amounts of data to 
            predict market trends, personalize guest communications, optimize pricing strategies, and even detect potential 
            issues before they become problems. For hosts managing multiple properties or working with limited time, these 
            tools have become nothing short of transformational.
          </p>
          
          <div className="my-8 bg-blue-50 p-6 rounded-xl">
            <h3 className="text-xl font-semibold text-blue-800 mb-3">Impact of AI Tools on Hosting Performance</h3>
            <ul className="list-disc pl-5 space-y-2">
              <li>Hosts using AI-powered pricing tools report 15-35% revenue increases</li>
              <li>Automated messaging systems improve response times by 92% and guest satisfaction by 28%</li>
              <li>AI-enhanced photo selection improves listing click-through rates by up to 24%</li>
              <li>Smart home systems reduce energy costs by an average of 18%</li>
            </ul>
          </div>

          <h2>Essential AI Tools for Modern Hosts</h2>
          <p>
            Not all AI tools are created equal, and the landscape is evolving rapidly. Let&apos;s explore the most impactful 
            categories of AI-powered solutions that are helping hosts work smarter, not harder.
          </p>
          
          <h3>1. Dynamic Pricing Optimization</h3>
          <p>
            Perhaps the most widely adopted AI application in the vacation rental space, dynamic pricing tools analyze 
            multiple factors to recommend optimal nightly rates:
          </p>
          <ul>
            <li>Local events, holidays, and seasonality</li>
            <li>Real-time competitor pricing</li>
            <li>Historical booking patterns</li>
            <li>Lead time to booking</li>
            <li>Day-of-week patterns</li>
            <li>Neighborhood-specific demand patterns</li>
          </ul>
          <p>
            <strong>How It Works:</strong> These systems ingest millions of data points daily, using machine learning algorithms 
            to identify patterns that human hosts might miss. By automatically adjusting prices—sometimes multiple times per day—they 
            ensure you&apos;re never leaving money on the table or pricing yourself out of bookings.
          </p>
          
          <div className="my-8">
            <Image
              src="/images/blog/dynamic-pricing-dashboard.jpg"
              alt="AI dynamic pricing dashboard showing price recommendations"
              width={800}
              height={450}
              className="rounded-lg"
            />
            <p className="text-sm text-gray-500 mt-2 text-center">
              A typical AI dynamic pricing dashboard showing real-time recommendations and market analysis
            </p>
          </div>

          <div className="my-6 p-5 bg-gray-100 rounded-lg">
            <h4 className="font-semibold mb-2">Case Study: Revenue Transformation</h4>
            <p>
              Jason Westlake manages 8 properties in Colorado and was initially skeptical about algorithmic pricing. 
              After implementing a leading AI pricing tool, his properties saw a 27% increase in annual revenue—with the 
              most significant gains coming during shoulder seasons when his manual pricing had been most conservative.
            </p>
            <p className="mt-3 text-sm text-gray-600">
              &ldquo;What surprised me most was how the AI would sometimes recommend seemingly counterintuitive prices—like raising 
              rates when occupancy was low in the area or dropping prices on what I thought would be peak days. But the 
              results speak for themselves. The system was seeing patterns in the data that I couldn&apos;t.&rdquo;
            </p>
          </div>
          
          <h3>2. Intelligent Guest Communications</h3>
          <p>
            AI-powered messaging systems have evolved far beyond simple auto-responders. Today&apos;s tools can:
          </p>
          <ul>
            <li>Analyze message content to detect questions, concerns, or special requests</li>
            <li>Personalize responses based on the guest&apos;s profile and booking details</li>
            <li>Automatically provide relevant information based on booking stage</li>
            <li>Translate messages into the guest&apos;s native language</li>
            <li>Detect urgent issues requiring immediate host attention</li>
            <li>Predict potential problems based on message sentiment</li>
          </ul>
          <p>
            <strong>Pro Tip:</strong> The best AI communication tools integrate with property management systems to provide 
            context-aware information like access codes, check-in instructions, and local recommendations at precisely the 
            right moments in the guest journey.
          </p>
          
          <h3>3. Smart Home Automation and Monitoring</h3>
          <p>
            AI-enhanced property technology (PropTech) is creating safer, more efficient, and more memorable guest 
            experiences through:
          </p>
          <ul>
            <li>Occupancy-based climate control that optimizes comfort while reducing energy costs</li>
            <li>Noise monitoring systems that detect potential issues while protecting guest privacy</li>
            <li>Predictive maintenance alerts for HVAC, plumbing, and appliances</li>
            <li>Voice-controlled home systems personalized to each reservation</li>
            <li>Automated security and access monitoring</li>
          </ul>
          
          <blockquote className="border-l-4 border-blue-500 pl-4 italic my-6">
            &ldquo;Our AI-powered noise monitoring system paid for itself in the first month. It alerted us to a gathering 
            that exceeded our guest count limits, but it did so early in the evening before things got out of hand. 
            We were able to message the guests, and they quickly complied. No complaints from neighbors, no property 
            damage, and the guests still left a 5-star review.&rdquo;
            <footer className="text-sm mt-2 not-italic">— Maria Chen, Host in Austin, TX</footer>
          </blockquote>
          
          <div className="my-8">
            <Image
              src="/images/blog/smart-property-dashboard.jpg"
              alt="Smart property monitoring dashboard showing various metrics"
              width={800}
              height={450}
              className="rounded-lg"
            />
            <p className="text-sm text-gray-500 mt-2 text-center">
              A comprehensive smart property monitoring system with AI-powered alerts and analytics
            </p>
          </div>
          
          <h3>4. Listing Optimization and SEO</h3>
          <p>
            AI-driven listing optimization tools analyze successful properties to help hosts craft more compelling 
            and visible listings:
          </p>
          <ul>
            <li>Title and description generators that incorporate high-converting keywords</li>
            <li>Photo selection and sequencing based on guest engagement data</li>
            <li>Competitive analysis that identifies gaps in your listing&apos;s features or descriptions</li>
            <li>Sentiment analysis of competitor reviews to identify opportunities</li>
            <li>A/B testing recommendations for different listing elements</li>
          </ul>
          <p>
            These tools typically examine thousands of successful listings to identify patterns that correlate with 
            higher search placement, click-through rates, and conversion to bookings.
          </p>
          
          <h3>5. Predictive Analytics for Market Insights</h3>
          <p>
            For hosts considering expansion or investment in new properties, AI-powered market analysis tools provide 
            invaluable data on:
          </p>
          <ul>
            <li>Revenue potential by neighborhood, property size, and amenities</li>
            <li>Seasonal trends and emerging market opportunities</li>
            <li>Regulatory risk assessment</li>
            <li>Occupancy forecasts based on market trends</li>
            <li>Investment return calculators with AI-enhanced accuracy</li>
          </ul>
          <p>
            These tools can process years of booking data, pricing fluctuations, and market events to help hosts make 
            more informed investment decisions.
          </p>
          
          <div className="my-8 bg-blue-50 p-6 rounded-xl">
            <h3 className="text-xl font-semibold text-blue-800 mb-3">AI Hosting Tools Comparison</h3>
            <div className="overflow-x-auto">
              <table className="min-w-full">
                <thead>
                  <tr className="border-b">
                    <th className="py-2 text-left">Tool Category</th>
                    <th className="py-2 text-left">Time Saved (hrs/month)</th>
                    <th className="py-2 text-left">Avg. Revenue Impact</th>
                    <th className="py-2 text-left">Implementation Complexity</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b">
                    <td className="py-2">Dynamic Pricing</td>
                    <td className="py-2">15-20</td>
                    <td className="py-2">+15-35%</td>
                    <td className="py-2">Low</td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-2">Guest Communications</td>
                    <td className="py-2">20-30</td>
                    <td className="py-2">+5-15%</td>
                    <td className="py-2">Low</td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-2">Smart Home Systems</td>
                    <td className="py-2">5-10</td>
                    <td className="py-2">+3-10%</td>
                    <td className="py-2">Medium</td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-2">Listing Optimization</td>
                    <td className="py-2">3-5</td>
                    <td className="py-2">+10-20%</td>
                    <td className="py-2">Low</td>
                  </tr>
                  <tr>
                    <td className="py-2">Predictive Analytics</td>
                    <td className="py-2">Varies</td>
                    <td className="py-2">Investment-dependent</td>
                    <td className="py-2">Medium</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <h2>Getting Started with AI Hosting Tools</h2>
          
          <h3>Understanding Your Needs and Goals</h3>
          <p>
            Before investing in AI tools, clarify what aspects of your hosting business need the most improvement:
          </p>
          <ul>
            <li>Are you spending too much time on guest communications?</li>
            <li>Is your pricing strategy leaving money on the table?</li>
            <li>Do you struggle to understand how your property compares to competitors?</li>
            <li>Are you concerned about property monitoring and guest security?</li>
            <li>Do you need help making your listing more visible in search results?</li>
          </ul>
          <p>
            Identifying your specific challenges will help you prioritize which AI tools to implement first.
          </p>
          
          <h3>Implementation Tips for Success</h3>
          <p>
            To maximize the impact of AI hosting tools:
          </p>
          <ul>
            <li>Start with one tool category and master it before adding others</li>
            <li>Ensure proper integration with your existing property management system</li>
            <li>Set clear performance metrics to evaluate effectiveness</li>
            <li>Plan time for initial configuration and learning period</li>
            <li>Gradually increase automation as you build confidence in the system</li>
          </ul>
          
          <h3>Cost-Benefit Considerations</h3>
          <p>
            Most AI hosting tools operate on subscription models with costs varying based on:
          </p>
          <ul>
            <li>Number of properties managed</li>
            <li>Advanced features required</li>
            <li>Integration capabilities</li>
            <li>Level of customization needed</li>
          </ul>
          <p>
            When evaluating costs, consider both the direct revenue impact and the value of your time saved. Many hosts 
            find that even expensive tools quickly pay for themselves through increased bookings, higher nightly rates, 
            or reduced operational workload.
          </p>

          <div className="my-8">
            <Image
              src="/images/blog/ai-host-workflow.jpg"
              alt="Workflow diagram showing how AI tools integrate with hosting operations"
              width={800}
              height={450}
              className="rounded-lg"
            />
            <p className="text-sm text-gray-500 mt-2 text-center">
              How AI tools integrate into an efficient hosting workflow to streamline operations
            </p>
          </div>

          <h2>Real-World Success Stories</h2>
          
          <h3>The Solo Host Scaling Up</h3>
          <p>
            Sarah Jennings started with a single apartment in Nashville but wanted to expand without hiring staff. 
            By implementing a suite of AI tools, she was able to:
          </p>
          <ul>
            <li>Grow from 1 to 7 properties in 18 months</li>
            <li>Maintain a consistent 4.95+ star rating across all properties</li>
            <li>Reduce her active management time to under 10 hours per week</li>
            <li>Achieve 94% occupancy in a competitive market</li>
          </ul>
          <p>
            &ldquo;I couldn&apos;t have scaled without these tools,&rdquo; Sarah explains. &ldquo;The guest messaging system alone saves me 
            hours each day, and it actually provides a more consistent, professional experience than I could deliver 
            manually, especially with international guests.&rdquo;
          </p>
          
          <h3>The Luxury Property Network</h3>
          <p>
            Coastal Luxury Rentals manages 35 high-end properties across multiple markets. They implemented an AI-powered 
            operations platform and saw:
          </p>
          <ul>
            <li>32% reduction in staff hours spent on routine tasks</li>
            <li>18% increase in average booking value</li>
            <li>43% faster response time to maintenance issues</li>
            <li>Significant improvement in detecting and preventing potential party bookings</li>
          </ul>
          <p>
            Their director of operations notes, &ldquo;For luxury properties, the stakes are higher. One bad guest experience 
            or maintenance issue can cost thousands. Our AI systems have dramatically improved our ability to deliver 
            consistent, premium experiences across all properties.&rdquo;
          </p>

          <h2>Future Trends in AI Hosting Technology</h2>
          <p>
            The AI revolution in vacation rental management is just beginning. Industry experts anticipate several 
            emerging trends:
          </p>
          
          <h3>1. Predictive Guest Experience Personalization</h3>
          <p>
            Next-generation AI will analyze guest preferences and behaviors to anticipate needs:
          </p>
          <ul>
            <li>Automatic temperature settings based on guest preferences from previous stays</li>
            <li>Personalized local recommendations based on guest profiles and past activities</li>
            <li>Custom welcome packages that reflect guest interests identified through booking patterns</li>
            <li>Pre-arrival shopping services guided by AI prediction of guest needs</li>
          </ul>
          
          <h3>2. Enhanced Visual Technologies</h3>
          <p>
            Visual AI is evolving quickly with applications for vacation rentals:
          </p>
          <ul>
            <li>Automated property damage detection during check-out</li>
            <li>Virtual staging that adapts to different target guest segments</li>
            <li>Real-time occupancy monitoring that respects privacy while ensuring compliance</li>
            <li>Automated cleaning verification and quality control</li>
          </ul>
          
          <h3>3. Integrated Ecosystem Management</h3>
          <p>
            Future platforms will provide comprehensive oversight of all hosting operations:
          </p>
          <ul>
            <li>Unified dashboards that combine data from all AI tools</li>
            <li>Predictive maintenance scheduling based on usage patterns</li>
            <li>Energy optimization that significantly reduces property operating costs</li>
            <li>Automatic coordination between cleaning, maintenance, and guest arrivals</li>
          </ul>

          <div className="my-8 bg-blue-50 p-6 rounded-xl">
            <h3 className="text-xl font-semibold text-blue-800 mb-3">Getting Started Checklist</h3>
            <ul className="space-y-2">
              <li className="flex items-start">
                <span className="text-green-500 mr-2">✓</span>
                <span>Assess your biggest pain points and opportunities</span>
              </li>
              <li className="flex items-start">
                <span className="text-green-500 mr-2">✓</span>
                <span>Research tools that address your primary needs</span>
              </li>
              <li className="flex items-start">
                <span className="text-green-500 mr-2">✓</span>
                <span>Request demos from 2-3 providers in each category</span>
              </li>
              <li className="flex items-start">
                <span className="text-green-500 mr-2">✓</span>
                <span>Check integration capabilities with your existing systems</span>
              </li>
              <li className="flex items-start">
                <span className="text-green-500 mr-2">✓</span>
                <span>Calculate potential ROI based on time savings and revenue impact</span>
              </li>
              <li className="flex items-start">
                <span className="text-green-500 mr-2">✓</span>
                <span>Start small with one high-impact tool and measure results</span>
              </li>
              <li className="flex items-start">
                <span className="text-green-500 mr-2">✓</span>
                <span>Gradually expand your AI toolkit as you grow comfortable</span>
              </li>
              <li className="flex items-start">
                <span className="text-green-500 mr-2">✓</span>
                <span>Join host communities to learn from others&apos; experiences</span>
              </li>
              <li className="flex items-start">
                <span className="text-green-500 mr-2">✓</span>
                <span>Regularly review and optimize your AI configurations</span>
              </li>
              <li className="flex items-start">
                <span className="text-green-500 mr-2">✓</span>
                <span>Stay informed about new AI developments in the industry</span>
              </li>
            </ul>
          </div>

          <h2>Finding Balance: The Human Touch in an AI World</h2>
          <p>
            While AI tools offer tremendous advantages, the most successful hosts understand when and how to maintain 
            the personal connection with guests:
          </p>
          <ul>
            <li>Use AI to handle routine communications, but personalize pivotal moments in the guest journey</li>
            <li>Let automation handle monitoring and alerts, but add personal follow-up for any issues detected</li>
            <li>Leverage AI insights for business decisions, but apply your local knowledge and intuition</li>
            <li>Automate repetitive tasks, but invest the time saved into creating memorable guest experiences</li>
          </ul>
          <p>
            As one successful host puts it: &ldquo;AI handles the operations, which frees me to focus on hospitality. 
            The tools run my business, but my personal touch defines my brand.&rdquo;
          </p>

          <h2>Conclusion: The Competitive Advantage of Early Adoption</h2>
          <p>
            The adoption of AI hosting tools is still in its early stages, creating a significant opportunity for hosts 
            who embrace these technologies now. As these systems become more mainstream, they will transition from being 
            a competitive advantage to a competitive necessity.
          </p>
          <p>
            The most successful hosts will be those who learn to effectively combine AI efficiency with authentic 
            hospitality—letting technology handle the operational complexity while they focus on creating the memorable 
            experiences that no algorithm can replicate.
          </p>
          <p>
            Whether you manage a single property or an extensive portfolio, AI tools offer a path to more efficient 
            operations, better guest experiences, and ultimately, a more profitable and sustainable hosting business. 
            The question is no longer whether to adopt these technologies, but which ones to implement first.
          </p>
        </div>

        {/* Author Bio */}
        <div className="mt-16 pt-8 border-t border-gray-200">
          <div className="flex items-start">
            <div className="w-20 h-20 rounded-full overflow-hidden mr-6 flex-shrink-0">
              <Image
                src="/images/blog/elena-rodriguez.jpg"
                alt="Elena Rodriguez"
                width={80}
                height={80}
                className="object-cover"
              />
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-2">About Elena Rodriguez</h3>
              <p className="text-gray-700 mb-4">
                Elena Rodriguez is a technology consultant specializing in hospitality innovation. With a background 
                in both computer science and hotel management, she helps vacation rental owners and property managers 
                implement technology solutions that enhance operations and guest experiences. Elena hosts the popular 
                podcast &ldquo;Future of Hosting&rdquo; and speaks regularly at industry conferences worldwide.
              </p>
              <div className="flex space-x-4">
                <a href="#" className="text-blue-600 hover:text-blue-800">Twitter</a>
                <a href="#" className="text-blue-600 hover:text-blue-800">LinkedIn</a>
                <a href="#" className="text-blue-600 hover:text-blue-800">Website</a>
              </div>
            </div>
          </div>
        </div>

        {/* Related Articles */}
        <div className="mt-16">
          <h3 className="text-2xl font-bold mb-6">Related Articles</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="border border-gray-200 rounded-xl overflow-hidden hover:shadow-md transition-shadow">
              <div className="h-48 relative">
                <Image
                  src="/images/blog/smart-home-devices.jpg"
                  alt="Smart Home Devices for Hosts"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-6">
                <h4 className="text-xl font-semibold mb-2">
                  <Link href="/blog/smart-home-devices" className="text-gray-900 hover:text-blue-600">
                    The Ultimate Guide to Smart Home Devices for Vacation Rentals
                  </Link>
                </h4>
                <p className="text-gray-600 mb-4">
                  From smart locks to noise monitors—the essential tech for a safe, efficient property.
                </p>
                <div className="flex items-center text-sm text-gray-500">
                  <span>Michael Chen</span>
                  <span className="mx-2">•</span>
                  <span>13 min read</span>
                </div>
              </div>
            </div>
            <div className="border border-gray-200 rounded-xl overflow-hidden hover:shadow-md transition-shadow">
              <div className="h-48 relative">
                <Image
                  src="/images/blog/automated-guest-experience.jpg"
                  alt="Automated Guest Experience"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-6">
                <h4 className="text-xl font-semibold mb-2">
                  <Link href="/blog/automated-guest-experience" className="text-gray-900 hover:text-blue-600">
                    Creating an Automated Guest Experience Without Losing the Personal Touch
                  </Link>
                </h4>
                <p className="text-gray-600 mb-4">
                  How to balance efficiency with hospitality in your guest communications.
                </p>
                <div className="flex items-center text-sm text-gray-500">
                  <span>Sophia Williams</span>
                  <span className="mx-2">•</span>
                  <span>11 min read</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Newsletter Signup */}
        <div className="mt-16 bg-blue-50 rounded-xl p-8">
          <div className="text-center mb-6">
            <h3 className="text-2xl font-bold mb-2">Stay Ahead of the Curve</h3>
            <p className="text-gray-600">
              Subscribe to our newsletter for the latest insights on AI hosting tools and technology trends.
            </p>
          </div>
          <form className="max-w-md mx-auto">
            <div className="flex">
              <input
                type="email"
                placeholder="Your email address"
                className="flex-grow px-4 py-3 rounded-l-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button
                type="submit"
                className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-r-lg transition-colors"
              >
                Subscribe
              </button>
            </div>
            <p className="text-xs text-gray-500 mt-2 text-center">
              We respect your privacy. Unsubscribe at any time.
            </p>
          </form>
        </div>
      </article>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12 mt-16">
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
  );
}