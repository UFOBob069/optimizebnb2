"use client";

import Link from "next/link";
import { ArrowLeft, FileText, AlertTriangle, CheckCircle, Clock, Scale, Globe, Shield } from "lucide-react";

export default function TermsOfServicePage() {
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
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="flex items-center justify-center mb-6">
            <FileText size={48} className="mr-4" />
            <h1 className="text-3xl md:text-4xl font-bold">Terms of Service</h1>
          </div>
          <p className="text-center text-xl max-w-3xl mx-auto">
            Please read these terms carefully before using OptimizeBnb.AI's services.
          </p>
          <p className="text-center mt-4 text-blue-200">
            Last Updated: {new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
          </p>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
            <div className="p-6 md:p-8">
              {/* Table of Contents */}
              <div className="mb-10 p-6 bg-gray-50 rounded-lg">
                <h2 className="text-xl font-semibold mb-4">Table of Contents</h2>
                <ol className="list-decimal pl-5 space-y-2">
                  <li><a href="#agreement" className="text-blue-600 hover:text-blue-800">Agreement to Terms</a></li>
                  <li><a href="#services" className="text-blue-600 hover:text-blue-800">Our Services</a></li>
                  <li><a href="#accounts" className="text-blue-600 hover:text-blue-800">User Accounts</a></li>
                  <li><a href="#payment" className="text-blue-600 hover:text-blue-800">Payment Terms</a></li>
                  <li><a href="#content" className="text-blue-600 hover:text-blue-800">User Content</a></li>
                  <li><a href="#prohibited" className="text-blue-600 hover:text-blue-800">Prohibited Uses</a></li>
                  <li><a href="#intellectual" className="text-blue-600 hover:text-blue-800">Intellectual Property Rights</a></li>
                  <li><a href="#termination" className="text-blue-600 hover:text-blue-800">Termination</a></li>
                  <li><a href="#disclaimer" className="text-blue-600 hover:text-blue-800">Disclaimer of Warranties</a></li>
                  <li><a href="#limitation" className="text-blue-600 hover:text-blue-800">Limitation of Liability</a></li>
                  <li><a href="#indemnification" className="text-blue-600 hover:text-blue-800">Indemnification</a></li>
                  <li><a href="#governing" className="text-blue-600 hover:text-blue-800">Governing Law</a></li>
                  <li><a href="#changes" className="text-blue-600 hover:text-blue-800">Changes to Terms</a></li>
                  <li><a href="#contact" className="text-blue-600 hover:text-blue-800">Contact Us</a></li>
                </ol>
              </div>

              {/* Introduction */}
              <div className="mb-10">
                <p className="mb-4">
                  Welcome to OptimizeBnb.AI. These Terms of Service ("Terms") govern your access to and use of the OptimizeBnb.AI website and services (collectively, the "Services"). By accessing or using our Services, you agree to be bound by these Terms and our Privacy Policy.
                </p>
                <p className="mb-4">
                  Please read these Terms carefully before using our Services. If you do not agree to these Terms, you may not access or use the Services.
                </p>
              </div>

              {/* Agreement to Terms */}
              <div className="mb-10" id="agreement">
                <div className="flex items-center mb-4">
                  <CheckCircle className="text-blue-600 mr-3" size={24} />
                  <h2 className="text-2xl font-semibold">1. Agreement to Terms</h2>
                </div>
                
                <p className="mb-4">
                  By accessing or using our Services, you agree to be bound by these Terms. If you are using the Services on behalf of an organization or entity ("Organization"), then you are agreeing to these Terms on behalf of that Organization, and you represent and warrant that you have the authority to bind the Organization to these Terms. In such a case, "you" and "your" will refer to both you and the Organization.
                </p>
              </div>

              {/* Our Services */}
              <div className="mb-10" id="services">
                <div className="flex items-center mb-4">
                  <Globe className="text-blue-600 mr-3" size={24} />
                  <h2 className="text-2xl font-semibold">2. Our Services</h2>
                </div>
                
                <p className="mb-4">
                  OptimizeBnb.AI provides AI-powered tools and services designed to help Airbnb hosts optimize their listings, improve guest experiences, and increase bookings. Our Services may include, but are not limited to:
                </p>
                <ul className="list-disc pl-6 mb-4 space-y-1">
                  <li>Listing analysis and optimization recommendations</li>
                  <li>Photo analysis and improvement suggestions</li>
                  <li>Review analysis and sentiment tracking</li>
                  <li>Pricing optimization tools</li>
                  <li>Welcome guide generation</li>
                  <li>SEO optimization for listings</li>
                </ul>
                
                <p className="mb-4">
                  We reserve the right to modify, suspend, or discontinue any part of our Services at any time without notice or liability.
                </p>
              </div>

              {/* User Accounts */}
              <div className="mb-10" id="accounts">
                <div className="flex items-center mb-4">
                  <Shield className="text-blue-600 mr-3" size={24} />
                  <h2 className="text-2xl font-semibold">3. User Accounts</h2>
                </div>
                
                <p className="mb-4">
                  To access certain features of our Services, you may be required to create an account. You agree to provide accurate, current, and complete information during the registration process and to update such information to keep it accurate, current, and complete.
                </p>
                
                <p className="mb-4">
                  You are responsible for:
                </p>
                <ul className="list-disc pl-6 mb-4 space-y-1">
                  <li>Maintaining the confidentiality of your account credentials</li>
                  <li>All activities that occur under your account</li>
                  <li>Notifying us immediately of any unauthorized use of your account</li>
                </ul>
                
                <p className="mb-4">
                  We reserve the right to disable any user account at any time if, in our opinion, you have failed to comply with these Terms or if we believe your account is being used fraudulently.
                </p>
              </div>

              {/* Payment Terms */}
              <div className="mb-10" id="payment">
                <div className="flex items-center mb-4">
                  <Clock className="text-blue-600 mr-3" size={24} />
                  <h2 className="text-2xl font-semibold">4. Payment Terms</h2>
                </div>
                
                <p className="mb-4">
                  Some of our Services may require payment. By using our paid Services, you agree to pay all fees in accordance with the pricing and payment terms presented to you.
                </p>
                
                <h3 className="text-lg font-medium mb-2 mt-6">4.1 Subscription Services</h3>
                <p className="mb-4">
                  For subscription-based Services, you will be billed in advance on a recurring basis according to the billing cycle you select when purchasing the subscription. Unless otherwise stated, subscriptions automatically renew until cancelled.
                </p>
                
                <h3 className="text-lg font-medium mb-2 mt-6">4.2 Cancellation and Refunds</h3>
                <p className="mb-4">
                  You may cancel your subscription at any time through your account settings or by contacting us. If you cancel, you may continue to use the subscription until the end of your current billing period, but you will not receive a refund for any fees already paid.
                </p>
                
                <h3 className="text-lg font-medium mb-2 mt-6">4.3 Price Changes</h3>
                <p className="mb-4">
                  We reserve the right to change our prices at any time. If we change pricing for a subscription service, we will provide notice of the change on our website or by email at least 30 days before the change takes effect.
                </p>
              </div>

              {/* User Content */}
              <div className="mb-10" id="content">
                <div className="flex items-center mb-4">
                  <FileText className="text-blue-600 mr-3" size={24} />
                  <h2 className="text-2xl font-semibold">5. User Content</h2>
                </div>
                
                <p className="mb-4">
                  Our Services may allow you to submit, upload, or share content, such as Airbnb listing URLs, photos, descriptions, and other materials ("User Content").
                </p>
                
                <h3 className="text-lg font-medium mb-2 mt-6">5.1 Your Rights in User Content</h3>
                <p className="mb-4">
                  You retain all rights in, and are solely responsible for, the User Content you submit to our Services. By submitting User Content, you grant us a worldwide, non-exclusive, royalty-free license to use, reproduce, modify, adapt, publish, translate, and distribute your User Content in connection with providing and improving our Services.
                </p>
                
                <h3 className="text-lg font-medium mb-2 mt-6">5.2 Representations and Warranties</h3>
                <p className="mb-4">
                  You represent and warrant that:
                </p>
                <ul className="list-disc pl-6 mb-4 space-y-1">
                  <li>You own or have the necessary rights to the User Content you submit</li>
                  <li>The User Content does not infringe on the intellectual property rights or other rights of any third party</li>
                  <li>The User Content complies with these Terms and all applicable laws and regulations</li>
                </ul>
              </div>

              {/* Prohibited Uses */}
              <div className="mb-10" id="prohibited">
                <div className="flex items-center mb-4">
                  <AlertTriangle className="text-blue-600 mr-3" size={24} />
                  <h2 className="text-2xl font-semibold">6. Prohibited Uses</h2>
                </div>
                
                <p className="mb-4">
                  You agree not to use our Services:
                </p>
                <ul className="list-disc pl-6 mb-6 space-y-1">
                  <li>In any way that violates any applicable law or regulation</li>
                  <li>To transmit any material that is defamatory, offensive, or otherwise objectionable</li>
                  <li>To impersonate any person or entity or misrepresent your affiliation with a person or entity</li>
                  <li>To engage in any conduct that restricts or inhibits anyone's use or enjoyment of the Services</li>
                  <li>To attempt to gain unauthorized access to our servers, systems, or networks</li>
                  <li>To interfere with or disrupt the integrity or performance of the Services</li>
                  <li>To collect or track the personal information of others</li>
                  <li>To engage in any automated use of the system, such as using scripts to send comments or messages</li>
                  <li>To use the Services in a manner inconsistent with their intended purpose</li>
                </ul>
              </div>

              {/* Intellectual Property Rights */}
              <div className="mb-10" id="intellectual">
                <div className="flex items-center mb-4">
                  <Scale className="text-blue-600 mr-3" size={24} />
                  <h2 className="text-2xl font-semibold">7. Intellectual Property Rights</h2>
                </div>
                
                <p className="mb-4">
                  The Services and their original content (excluding User Content), features, and functionality are and will remain the exclusive property of OptimizeBnb.AI and its licensors. The Services are protected by copyright, trademark, and other laws of both the United States and foreign countries.
                </p>
                
                <p className="mb-4">
                  Our trademarks and trade dress may not be used in connection with any product or service without the prior written consent of OptimizeBnb.AI.
                </p>
              </div>

              {/* Termination */}
              <div className="mb-10" id="termination">
                <h2 className="text-2xl font-semibold mb-4">8. Termination</h2>
                
                <p className="mb-4">
                  We may terminate or suspend your account and access to the Services immediately, without prior notice or liability, for any reason, including, without limitation, if you breach these Terms.
                </p>
                
                <p className="mb-4">
                  Upon termination, your right to use the Services will immediately cease. If you wish to terminate your account, you may simply discontinue using the Services or contact us to request account deletion.
                </p>
              </div>

              {/* Disclaimer of Warranties */}
              <div className="mb-10" id="disclaimer">
                <h2 className="text-2xl font-semibold mb-4">9. Disclaimer of Warranties</h2>
                
                <p className="mb-4">
                  THE SERVICES ARE PROVIDED ON AN "AS IS" AND "AS AVAILABLE" BASIS, WITHOUT WARRANTIES OF ANY KIND, EITHER EXPRESS OR IMPLIED. TO THE FULLEST EXTENT PERMITTED BY LAW, OPTIMIZEBNB.AI DISCLAIMS ALL WARRANTIES, EXPRESS OR IMPLIED, INCLUDING, BUT NOT LIMITED TO, IMPLIED WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, AND NON-INFRINGEMENT.
                </p>
                
                <p className="mb-4">
                  OPTIMIZEBNB.AI DOES NOT WARRANT THAT THE SERVICES WILL BE UNINTERRUPTED, ERROR-FREE, OR SECURE; THAT DEFECTS WILL BE CORRECTED; OR THAT THE SERVICES OR THE SERVER THAT MAKES THEM AVAILABLE ARE FREE OF VIRUSES OR OTHER HARMFUL COMPONENTS.
                </p>
                
                <p className="mb-4">
                  OPTIMIZEBNB.AI MAKES NO GUARANTEES REGARDING THE EFFECTIVENESS OF THE RECOMMENDATIONS PROVIDED THROUGH OUR SERVICES OR THE IMPACT THEY MAY HAVE ON YOUR AIRBNB LISTING PERFORMANCE.
                </p>
              </div>

              {/* Limitation of Liability */}
              <div className="mb-10" id="limitation">
                <h2 className="text-2xl font-semibold mb-4">10. Limitation of Liability</h2>
                
                <p className="mb-4">
                  TO THE MAXIMUM EXTENT PERMITTED BY LAW, IN NO EVENT SHALL OPTIMIZEBNB.AI, ITS DIRECTORS, EMPLOYEES, PARTNERS, AGENTS, SUPPLIERS, OR AFFILIATES BE LIABLE FOR ANY INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR PUNITIVE DAMAGES, INCLUDING WITHOUT LIMITATION, LOSS OF PROFITS, DATA, USE, GOODWILL, OR OTHER INTANGIBLE LOSSES, RESULTING FROM:
                </p>
                <ul className="list-disc pl-6 mb-4 space-y-1">
                  <li>YOUR ACCESS TO OR USE OF OR INABILITY TO ACCESS OR USE THE SERVICES</li>
                  <li>ANY CONDUCT OR CONTENT OF ANY THIRD PARTY ON THE SERVICES</li>
                  <li>ANY CONTENT OBTAINED FROM THE SERVICES</li>
                  <li>UNAUTHORIZED ACCESS, USE, OR ALTERATION OF YOUR TRANSMISSIONS OR CONTENT</li>
                </ul>
                
                <p className="mb-4">
                  IN NO EVENT SHALL OUR TOTAL LIABILITY TO YOU FOR ALL CLAIMS EXCEED THE AMOUNT PAID BY YOU, IF ANY, FOR ACCESSING OUR SERVICES DURING THE TWELVE (12) MONTHS PRIOR TO THE CLAIM.
                </p>
              </div>

              {/* Indemnification */}
              <div className="mb-10" id="indemnification">
                <h2 className="text-2xl font-semibold mb-4">11. Indemnification</h2>
                
                <p className="mb-4">
                  You agree to defend, indemnify, and hold harmless OptimizeBnb.AI, its officers, directors, employees, and agents, from and against any and all claims, damages, obligations, losses, liabilities, costs or debt, and expenses (including but not limited to attorney's fees) arising from:
                </p>
                <ul className="list-disc pl-6 mb-4 space-y-1">
                  <li>Your use of and access to the Services</li>
                  <li>Your violation of any term of these Terms</li>
                  <li>Your violation of any third-party right, including without limitation any copyright, property, or privacy right</li>
                  <li>Any claim that your User Content caused damage to a third party</li>
                </ul>
                
                <p className="mb-4">
                  This defense and indemnification obligation will survive these Terms and your use of the Services.
                </p>
              </div>

              {/* Governing Law */}
              <div className="mb-10" id="governing">
                <h2 className="text-2xl font-semibold mb-4">12. Governing Law</h2>
                
                <p className="mb-4">
                  These Terms shall be governed and construed in accordance with the laws of the State of California, United States, without regard to its conflict of law provisions.
                </p>
                
                <p className="mb-4">
                  Our failure to enforce any right or provision of these Terms will not be considered a waiver of those rights. If any provision of these Terms is held to be invalid or unenforceable by a court, the remaining provisions of these Terms will remain in effect.
                </p>
              </div>

              {/* Changes to Terms */}
              <div className="mb-10" id="changes">
                <h2 className="text-2xl font-semibold mb-4">13. Changes to Terms</h2>
                
                <p className="mb-4">
                  We reserve the right, at our sole discretion, to modify or replace these Terms at any time. If a revision is material, we will provide at least 30 days' notice prior to any new terms taking effect. What constitutes a material change will be determined at our sole discretion.
                </p>
                
                <p className="mb-4">
                  By continuing to access or use our Services after any revisions become effective, you agree to be bound by the revised terms. If you do not agree to the new terms, you are no longer authorized to use the Services.
                </p>
              </div>

              {/* Contact Us */}
              <div id="contact">
                <h2 className="text-2xl font-semibold mb-4">14. Contact Us</h2>
                
                <p className="mb-4">
                  If you have any questions about these Terms, please contact us at:
                </p>
                <div className="bg-gray-50 p-6 rounded-lg">
                  <p className="font-medium">OptimizeBnb.AI</p>
                  <p>Email: legal@optimizebnb.ai</p>
                  <p>Address: 123 Hosting Street, Suite 456, San Francisco, CA 94107</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12 mt-12">
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