"use client";

import Image from "next/image";
import Link from "next/link";
import { FaFacebook, FaTwitter, FaLinkedin } from "react-icons/fa";

export default function HistoricAirbnbGuide() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <div className="relative h-[50vh] bg-blue-600">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-900/70 to-blue-600/70 z-10" />
        <Image
          src="/images/blog/historic-hero.jpg"
          alt="Historic Airbnb"
          fill
          className="object-cover"
          priority
        />
        <div className="relative z-20 max-w-5xl mx-auto px-4 h-full flex flex-col justify-center text-white">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Turning a Historic Building into a Five-Star Airbnb
          </h1>
          <p className="text-xl md:text-2xl">
            The remarkable transformation of a 100-year-old property into a modern, luxurious vacation rental.
          </p>
        </div>
      </div>

      {/* Author and Article Info */}
      <div className="max-w-4xl mx-auto px-4 py-8 flex flex-col md:flex-row justify-between items-center border-b border-gray-200">
        <div className="flex items-center mb-4 md:mb-0">
          <div className="w-12 h-12 rounded-full overflow-hidden mr-4">
            <Image
              src="/images/blog/james-parker.jpg"
              alt="James Parker"
              width={48}
              height={48}
              className="object-cover"
            />
          </div>
          <div>
            <p className="font-semibold">James Parker</p>
            <p className="text-gray-600 text-sm">Historic Property Specialist</p>
          </div>
        </div>
        <div className="flex items-center space-x-4">
          <div className="text-gray-600 text-sm flex items-center mr-6">
            <span className="mr-2">18 min read</span>
            <span>•</span>
            <span className="ml-2">21.3k views</span>
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
          <h2>The Appeal of Historic Properties in the Vacation Rental Market</h2>
          <p>
            In today&apos;s short-term rental landscape, travelers are increasingly seeking unique, authentic accommodations 
            that offer more than just a place to sleep. Historic properties, with their rich backstories, architectural 
            character, and irreplaceable charm, perfectly satisfy this growing desire for experiential travel.
          </p>
          <p>
            Converting historic buildings into vacation rentals isn&apos;t just a passion project—it&apos;s a savvy business decision. 
            Properties with historical significance tend to command premium rates, attract more bookings, and receive more 
            enthusiastic reviews than standard accommodations. In fact, listings that highlight unique historical features 
            can achieve rates up to 35% higher than comparable modern properties in the same area.
          </p>
          
          <div className="my-8 bg-blue-50 p-6 rounded-xl">
            <h3 className="text-xl font-semibold text-blue-800 mb-3">Key Benefits of Historic Airbnb Properties</h3>
            <ul className="list-disc pl-5 space-y-2">
              <li>Command 25-40% higher nightly rates than standard properties</li>
              <li>Experience 22% higher occupancy rates throughout the year</li>
              <li>Attract featured placement on Airbnb&apos;s &ldquo;unique stays&rdquo; collections</li>
              <li>Generate natural word-of-mouth marketing through social media sharing</li>
            </ul>
          </div>

          <h2>The Madison Street Firehouse: A Case Study</h2>
          <p>
            When Sarah and Michael Hamilton purchased a decommissioned 1920s firehouse in Charleston&apos;s historic district, 
            they saw beyond the crumbling brick and rusted fixtures. The 3,800-square-foot building had served the city 
            for over 70 years before being abandoned for nearly two decades. What many viewed as a teardown, the Hamiltons 
            recognized as an opportunity to preserve a piece of the city&apos;s heritage while creating an extraordinary 
            vacation rental.
          </p>
          
          <h3>1. The Vision and Initial Assessment</h3>
          <p>
            Before making their purchase, the Hamiltons conducted thorough research into the building&apos;s history, 
            structural integrity, and renovation potential. They assembled a team of specialists, including:
          </p>
          <ul>
            <li>A structural engineer with historic building experience</li>
            <li>An architect specializing in adaptive reuse</li>
            <li>A contractor with preservation credentials</li>
            <li>A local historian to authenticate period details</li>
          </ul>
          <p>
            This initial assessment revealed both challenges and opportunities. While the building needed substantial 
            work—including foundation repairs, new plumbing and electrical systems, and asbestos removal—its most 
            distinctive features remained intact: 14-foot ceilings with original tin tiles, hand-carved wooden beams, 
            the original fire pole, and massive arched doors that once accommodated fire engines.
          </p>
          
          <div className="my-8">
            <Image
              src="/images/blog/firehouse-before-after.jpg"
              alt="Before and after photos of the Madison Street Firehouse renovation"
              width={800}
              height={450}
              className="rounded-lg"
            />
            <p className="text-sm text-gray-500 mt-2 text-center">
              Before and after: The exterior transformation of the Madison Street Firehouse
            </p>
          </div>

          <h3>2. Navigating Regulatory Challenges</h3>
          <p>
            Historic renovations come with unique regulatory complexities. For the Hamiltons, this meant working 
            with multiple authorities:
          </p>
          <ul>
            <li>The local Historic Preservation Commission</li>
            <li>City planning and zoning departments</li>
            <li>Building code enforcement</li>
            <li>Short-term rental permitting officials</li>
          </ul>
          <p>
            <strong>Pro Tip:</strong> The Hamiltons found that approaching preservation officials as collaborators rather 
            than obstacles was crucial. By demonstrating their commitment to honoring the building&apos;s history, they were 
            able to secure more flexibility in certain modernization aspects.
          </p>
          
          <div className="my-6 p-5 bg-gray-100 rounded-lg">
            <h4 className="font-semibold mb-2">Key Preservation Requirements:</h4>
            <ul>
              <li>Maintain original exterior brick and window placements</li>
              <li>Preserve the distinctive engine bay doors (though they could be sealed)</li>
              <li>Retain and restore the interior fire pole and watch desk</li>
              <li>Maintain the original layout of the central common spaces</li>
            </ul>
            <p className="mt-3 text-sm text-gray-600">
              While these requirements added complexity to the renovation, they ultimately became the property&apos;s 
              most marketable and photographed features.
            </p>
          </div>
          
          <h3>3. Balancing Preservation with Modern Comfort</h3>
          <p>
            The most significant challenge in historic renovations is creating modern comfort without compromising 
            historical integrity. The Hamiltons addressed this by adopting a &ldquo;best of both worlds&rdquo; approach:
          </p>
          <ul>
            <li>Preserving and highlighting original architectural elements</li>
            <li>Incorporating modern amenities discreetly</li>
            <li>Using period-appropriate materials when adding new elements</li>
            <li>Creating designated &ldquo;modern zones&rdquo; for kitchens and bathrooms</li>
          </ul>
          
          <h3>4. Designing for the Experiential Traveler</h3>
          <p>
            Understanding that their target guests were seeking more than just accommodations, the Hamiltons designed 
            spaces that would tell a story and create memorable moments:
          </p>
          <ul>
            <li>Converting the engine bay into a dramatic great room with 20-foot ceilings</li>
            <li>Repurposing the original fire pole as a central design feature (with safety measures)</li>
            <li>Creating themed bedrooms that honored different eras of the firehouse&apos;s history</li>
            <li>Displaying historic photographs and firefighting memorabilia throughout</li>
            <li>Converting the watch tower into a rooftop lounge with city views</li>
          </ul>
          
          <div className="my-8">
            <Image
              src="/images/blog/firehouse-interior.jpg"
              alt="Interior of the renovated firehouse showing original features with modern comforts"
              width={800}
              height={450}
              className="rounded-lg"
            />
            <p className="text-sm text-gray-500 mt-2 text-center">
              The original engine bay transformed into a dramatic open-concept living space
            </p>
          </div>
          
          <h3>5. Managing the Budget Reality</h3>
          <p>
            Historic renovations are notoriously unpredictable when it comes to budgeting. The Hamiltons shared their 
            financial journey with remarkable transparency:
          </p>
          <ul>
            <li>Initial purchase price: $385,000</li>
            <li>Projected renovation budget: $420,000</li>
            <li>Actual renovation cost: $678,000</li>
            <li>Unforeseen expenses included foundation issues, hazardous material removal, and custom millwork to match period details</li>
          </ul>
          
          <blockquote className="border-l-4 border-blue-500 pl-4 italic my-6">
            &ldquo;We exceeded our renovation budget by 60%, which was terrifying at the time. But within eight 
            months of listing on Airbnb, our revenue was 250% higher than comparable properties in the area. 
            The premium guests are willing to pay for authenticity and uniqueness quickly justified the additional investment.&rdquo;
            <footer className="text-sm mt-2 not-italic">— Sarah Hamilton, Owner</footer>
          </blockquote>
          
          <h3>6. Marketing the History as a Competitive Advantage</h3>
          <p>
            The Hamiltons recognized that their property&apos;s history was its greatest marketing asset. Their listing 
            strategy emphasized:
          </p>
          <ul>
            <li>An evocative title: &ldquo;Historic 1920s Firehouse—Authentic Charm with Luxury Amenities&rdquo;</li>
            <li>Photography that highlighted original architectural details</li>
            <li>A detailed historical narrative in the listing description</li>
            <li>Emphasis on unique features unavailable elsewhere (&ldquo;Sleep in a piece of Charleston history&rdquo;)</li>
            <li>Creation of a dedicated Instagram account documenting the renovation process</li>
          </ul>
          
          <h3>7. Guest Experience as Storytelling</h3>
          <p>
            Beyond physical renovation, the Hamiltons crafted an immersive experience for guests that connected 
            them to the building&apos;s history:
          </p>
          <ul>
            <li>A custom-designed digital guidebook detailing the firehouse&apos;s history and renovation</li>
            <li>A welcome package including local fire department memorabilia</li>
            <li>Vintage photographs and news clippings displayed throughout</li>
            <li>Connections to former firefighters who occasionally offer guided tours by special arrangement</li>
            <li>A percentage of profits donated to the local firefighters&apos; fund</li>
          </ul>

          <div className="my-8 bg-blue-50 p-6 rounded-xl">
            <h3 className="text-xl font-semibold text-blue-800 mb-3">Results: By the Numbers</h3>
            <ul className="space-y-2">
              <li className="flex items-start">
                <span className="text-green-500 mr-2">✓</span>
                <span>Average nightly rate: $750 (vs. market average of $325 for comparable size)</span>
              </li>
              <li className="flex items-start">
                <span className="text-green-500 mr-2">✓</span>
                <span>Annual occupancy rate: 84% (vs. market average of 68%)</span>
              </li>
              <li className="flex items-start">
                <span className="text-green-500 mr-2">✓</span>
                <span>Average review score: 4.97/5 stars from 216 reviews</span>
              </li>
              <li className="flex items-start">
                <span className="text-green-500 mr-2">✓</span>
                <span>Featured in: Architectural Digest, Travel + Leisure, and Airbnb&apos;s own marketing</span>
              </li>
              <li className="flex items-start">
                <span className="text-green-500 mr-2">✓</span>
                <span>ROI break-even point reached in 2.3 years (vs. projected 4.5 years)</span>
              </li>
            </ul>
          </div>

          <h2>Lessons for Aspiring Historic Property Hosts</h2>
          
          <h3>Choose Properties with Inherent Character</h3>
          <p>
            Not all old buildings make compelling vacation rentals. Look for properties with:
          </p>
          <ul>
            <li>A distinctive history or previous use (mills, schools, churches, industrial buildings)</li>
            <li>Unique architectural elements that can&apos;t be replicated</li>
            <li>A connection to local heritage that will interest travelers</li>
            <li>Structural bones that can accommodate modern living without excessive compromise</li>
          </ul>
          
          <h3>Budget Realistically</h3>
          <p>
            The financial rule of thumb shared by experienced historic property renovators:
          </p>
          <ul>
            <li>Start with your most comprehensive budget estimate</li>
            <li>Add a 30% contingency for unexpected issues</li>
            <li>Be prepared to go 15-20% beyond even that figure</li>
            <li>Factor in longer carrying costs due to extended renovation timelines</li>
          </ul>
          
          <h3>Find the Right Specialists</h3>
          <p>
            General contractors, even excellent ones, aren&apos;t necessarily equipped for historic renovations. 
            Seek professionals with:
          </p>
          <ul>
            <li>Specific historic preservation experience</li>
            <li>Knowledge of period-appropriate materials and techniques</li>
            <li>Relationships with specialty subcontractors (plaster restoration, millwork replication)</li>
            <li>A portfolio of successful historic conversions</li>
            <li>Patience for the problem-solving inherent in historic renovations</li>
          </ul>

          <div className="my-8">
            <Image
              src="/images/blog/historic-design-elements.jpg"
              alt="Original architectural elements preserved in the renovation"
              width={800}
              height={450}
              className="rounded-lg"
            />
            <p className="text-sm text-gray-500 mt-2 text-center">
              Preserving original architectural elements like ceiling tiles and exposed brick creates 
              irreplaceable character
            </p>
          </div>

          <h3>Develop a Preservation Philosophy</h3>
          <p>
            Before making specific design decisions, establish your overall approach to balancing preservation and modernization:
          </p>
          <ul>
            <li><strong>Period-authentic:</strong> Rigorously historical with minimal modern interventions</li>
            <li><strong>Adaptive contrast:</strong> Clearly distinguishing between original elements and modern additions</li>
            <li><strong>Interpretive blend:</strong> Using historical inspiration for new elements that complement original features</li>
          </ul>
          <p>
            The Hamiltons chose the &ldquo;adaptive contrast&rdquo; approach, preserving original elements in their authentic state 
            while allowing clearly contemporary interventions for modern functions—a strategy that appealed to both preservation 
            purists and comfort-seeking guests.
          </p>

          <h3>Plan for Operational Realities</h3>
          <p>
            Historic properties often require more intensive management than standard rentals:
          </p>
          <ul>
            <li>Higher maintenance costs due to specialized materials and craftsmanship</li>
            <li>More detailed check-in procedures to explain unique features or quirks</li>
            <li>Additional guest education about respecting historic elements</li>
            <li>More frequent inspection of vulnerable historic features</li>
          </ul>

          <h2>Common Challenges and Solutions</h2>
          <p>
            Based on interviews with a dozen successful historic Airbnb hosts, here are the most common challenges 
            and practical solutions:
          </p>
          
          <h3>Challenge: Modern Climate Control in Historic Structures</h3>
          <p>
            Historic buildings were rarely designed with modern HVAC in mind, creating both technical and aesthetic challenges.
          </p>
          <p>
            <strong>Solution:</strong> The Hamiltons utilized a mini-split system with discreetly placed air handlers, 
            supplemented by restored original ceiling fans. For properties with sufficient wall thickness, they recommend 
            insulating from the inside using modern materials while preserving exterior appearances.
          </p>
          
          <h3>Challenge: Contemporary Bathroom Expectations</h3>
          <p>
            Modern travelers expect spa-like bathrooms, but historic buildings often have small, awkwardly arranged 
            bathroom spaces.
          </p>
          <p>
            <strong>Solution:</strong> Designate bathrooms as &ldquo;contemporary zones&rdquo; where more dramatic modernization is 
            acceptable. Use period-inspired fixtures with modern functionality. Consider converting closets or other 
            small rooms to add additional bathrooms rather than reconfiguring original floor plans.
          </p>
          
          <h3>Challenge: Meeting Modern Safety Codes</h3>
          <p>
            Historic buildings may have charming but non-compliant features like steep staircases, low railings, 
            or insufficient emergency exits.
          </p>
          <p>
            <strong>Solution:</strong> Work with code officials early in the process to find creative compliance solutions. 
            Often, alternative measures (such as enhanced fire suppression systems) can be approved in lieu of alterations 
            that would damage historic integrity.
          </p>

          <h2>Return on Investment: Long-Term Perspective</h2>
          <p>
            While historic renovations typically require larger initial investments, hosts consistently report stronger 
            long-term financial performance:
          </p>
          <ul>
            <li><strong>Premium pricing power:</strong> Historic properties maintain higher rates even during market downturns</li>
            <li><strong>Publicity value:</strong> Unique historic rentals often receive free media coverage and features on booking platforms</li>
            <li><strong>Diversification potential:</strong> Many historic properties can generate revenue beyond lodging through event rentals, photo shoots, and tours</li>
            <li><strong>Appreciation advantage:</strong> Well-preserved historic properties typically appreciate faster than standard real estate</li>
          </ul>

          <div className="my-8">
            <Image
              src="/images/blog/guest-feedback-historic.jpg"
              alt="Word cloud showing most common positive terms from guest reviews"
              width={800}
              height={450}
              className="rounded-lg"
            />
            <p className="text-sm text-gray-500 mt-2 text-center">
              Word cloud analysis of positive terms most frequently used in guest reviews of historic Airbnbs
            </p>
          </div>

          <h2>Conclusion: Preservation as Opportunity</h2>
          <p>
            Converting historic buildings into vacation rentals represents a rare win-win opportunity: preserving 
            architectural heritage while creating unique, profitable accommodations that modern travelers crave. 
            The Madison Street Firehouse exemplifies how thoughtful restoration can transform a neglected historic 
            structure into a thriving business asset.
          </p>
          <p>
            While the challenges are considerable—from regulatory hurdles to budget uncertainties—the market 
            consistently rewards those who successfully blend authentic preservation with modern comfort. As the 
            vacation rental market becomes increasingly saturated with cookie-cutter properties, historic buildings 
            offer hosts a powerful differentiation strategy that cannot be easily replicated.
          </p>
          <p>
            For those with the passion, patience, and resources to undertake such projects, historic properties 
            deliver not just financial returns, but the profound satisfaction of giving new life to buildings with 
            stories to tell. As Sarah Hamilton reflects, &ldquo;Every morning, I wake up thinking about how many fire 
            alarms rang in this building, how many firefighters slid down that pole, how many lives were saved from 
            this station. Now we&apos;re giving it a second life, and our guests get to be part of that continuing story.&rdquo;
          </p>
        </div>

        {/* Author Bio */}
        <div className="mt-16 pt-8 border-t border-gray-200">
          <div className="flex items-start">
            <div className="w-20 h-20 rounded-full overflow-hidden mr-6 flex-shrink-0">
              <Image
                src="/images/blog/james-parker.jpg"
                alt="James Parker"
                width={80}
                height={80}
                className="object-cover"
              />
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-2">About James Parker</h3>
              <p className="text-gray-700 mb-4">
                James Parker is a historic preservation specialist and real estate investor who has helped transform 
                over 30 historic properties into successful vacation rentals. With a background in architectural history 
                and hospitality management, James bridges the gap between preservation and profitability. He regularly 
                consults with property owners and investors on adaptive reuse projects.
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
                  src="/images/blog/financing-historic.jpg"
                  alt="Financing Historic Renovations"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-6">
                <h4 className="text-xl font-semibold mb-2">
                  <Link href="/blog/historic-renovation-financing" className="text-gray-900 hover:text-blue-600">
                    Financing Historic Renovations: Grants, Tax Credits, and Creative Options
                  </Link>
                </h4>
                <p className="text-gray-600 mb-4">
                  Discover financial resources specifically available for historic property renovations.
                </p>
                <div className="flex items-center text-sm text-gray-500">
                  <span>Rebecca Torres</span>
                  <span className="mx-2">•</span>
                  <span>14 min read</span>
                </div>
              </div>
            </div>
            <div className="border border-gray-200 rounded-xl overflow-hidden hover:shadow-md transition-shadow">
              <div className="h-48 relative">
                <Image
                  src="/images/blog/historic-marketing.jpg"
                  alt="Marketing Historic Properties"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-6">
                <h4 className="text-xl font-semibold mb-2">
                  <Link href="/blog/historic-property-marketing" className="text-gray-900 hover:text-blue-600">
                    Marketing the History: Storytelling Strategies for Period Properties
                  </Link>
                </h4>
                <p className="text-gray-600 mb-4">
                  How to leverage your property&apos;s unique history to create compelling marketing narratives.
                </p>
                <div className="flex items-center text-sm text-gray-500">
                  <span>Marcus Johnson</span>
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
            <h3 className="text-2xl font-bold mb-2">Get More Hosting Tips</h3>
            <p className="text-gray-600">
              Subscribe to our newsletter for the latest insights on historic property renovation and vacation rental strategies.
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