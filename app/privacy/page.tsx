"use client";

import Link from "next/link";
import { ArrowLeft, Shield, Lock, Eye, Database, Bell, FileText, HelpCircle } from "lucide-react";

export default function PrivacyPolicyPage() {
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
            <Shield size={48} className="mr-4" />
            <h1 className="text-3xl md:text-4xl font-bold">Privacy Policy</h1>
          </div>
          <p className="text-center text-xl max-w-3xl mx-auto">
            At OptimizeBnb.AI, we take your privacy seriously. This policy explains how we collect, use, and protect your personal information.
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
                  <li><a href="#information-collection" className="text-blue-600 hover:text-blue-800">Information We Collect</a></li>
                  <li><a href="#information-use" className="text-blue-600 hover:text-blue-800">How We Use Your Information</a></li>
                  <li><a href="#information-sharing" className="text-blue-600 hover:text-blue-800">Information Sharing and Disclosure</a></li>
                  <li><a href="#data-security" className="text-blue-600 hover:text-blue-800">Data Security</a></li>
                  <li><a href="#cookies" className="text-blue-600 hover:text-blue-800">Cookies and Similar Technologies</a></li>
                  <li><a href="#user-rights" className="text-blue-600 hover:text-blue-800">Your Rights and Choices</a></li>
                  <li><a href="#children" className="text-blue-600 hover:text-blue-800">Children's Privacy</a></li>
                  <li><a href="#international" className="text-blue-600 hover:text-blue-800">International Data Transfers</a></li>
                  <li><a href="#changes" className="text-blue-600 hover:text-blue-800">Changes to This Privacy Policy</a></li>
                  <li><a href="#contact" className="text-blue-600 hover:text-blue-800">Contact Us</a></li>
                </ol>
              </div>

              {/* Introduction */}
              <div className="mb-10">
                <p className="mb-4">
                  OptimizeBnb.AI ("we," "our," or "us") is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website or use our services.
                </p>
                <p className="mb-4">
                  Please read this Privacy Policy carefully. By accessing or using our services, you acknowledge that you have read, understood, and agree to be bound by all the terms of this Privacy Policy. If you do not agree with our policies and practices, please do not use our services.
                </p>
              </div>

              {/* Information We Collect */}
              <div className="mb-10" id="information-collection">
                <div className="flex items-center mb-4">
                  <Database className="text-blue-600 mr-3" size={24} />
                  <h2 className="text-2xl font-semibold">Information We Collect</h2>
                </div>
                
                <h3 className="text-lg font-medium mb-2 mt-6">Personal Information</h3>
                <p className="mb-4">
                  We may collect personal information that you voluntarily provide to us when you:
                </p>
                <ul className="list-disc pl-6 mb-4 space-y-1">
                  <li>Register for an account</li>
                  <li>Submit an Airbnb listing URL for analysis</li>
                  <li>Sign up for our newsletter</li>
                  <li>Contact our customer support</li>
                  <li>Participate in surveys or promotions</li>
                </ul>
                <p className="mb-4">
                  This information may include:
                </p>
                <ul className="list-disc pl-6 mb-4 space-y-1">
                  <li>Name</li>
                  <li>Email address</li>
                  <li>Phone number</li>
                  <li>Airbnb listing URLs and associated public data</li>
                  <li>Payment information (processed securely through our payment processors)</li>
                </ul>

                <h3 className="text-lg font-medium mb-2 mt-6">Information Automatically Collected</h3>
                <p className="mb-4">
                  When you access our website or services, we may automatically collect certain information, including:
                </p>
                <ul className="list-disc pl-6 mb-4 space-y-1">
                  <li>Device information (browser type, operating system, device type)</li>
                  <li>IP address</li>
                  <li>Usage data (pages visited, time spent on pages, links clicked)</li>
                  <li>Referral source</li>
                  <li>Location information</li>
                </ul>
              </div>

              {/* How We Use Your Information */}
              <div className="mb-10" id="information-use">
                <div className="flex items-center mb-4">
                  <Eye className="text-blue-600 mr-3" size={24} />
                  <h2 className="text-2xl font-semibold">How We Use Your Information</h2>
                </div>
                
                <p className="mb-4">
                  We use the information we collect for various purposes, including to:
                </p>
                <ul className="list-disc pl-6 mb-4 space-y-1">
                  <li>Provide, maintain, and improve our services</li>
                  <li>Process and analyze Airbnb listings</li>
                  <li>Generate recommendations and insights for your listings</li>
                  <li>Process payments and manage your account</li>
                  <li>Send you service-related notifications</li>
                  <li>Respond to your comments, questions, and requests</li>
                  <li>Send you marketing communications (with your consent)</li>
                  <li>Monitor and analyze usage patterns and trends</li>
                  <li>Detect, prevent, and address technical issues</li>
                  <li>Protect the security and integrity of our services</li>
                </ul>
              </div>

              {/* Information Sharing and Disclosure */}
              <div className="mb-10" id="information-sharing">
                <div className="flex items-center mb-4">
                  <FileText className="text-blue-600 mr-3" size={24} />
                  <h2 className="text-2xl font-semibold">Information Sharing and Disclosure</h2>
                </div>
                
                <p className="mb-4">
                  We may share your information in the following situations:
                </p>
                <ul className="list-disc pl-6 mb-6 space-y-1">
                  <li><strong>Service Providers:</strong> We may share your information with third-party vendors, service providers, and contractors who perform services on our behalf (e.g., cloud hosting, payment processing, analytics).</li>
                  <li><strong>Business Transfers:</strong> If we are involved in a merger, acquisition, or sale of all or a portion of our assets, your information may be transferred as part of that transaction.</li>
                  <li><strong>Legal Requirements:</strong> We may disclose your information if required to do so by law or in response to valid requests by public authorities.</li>
                  <li><strong>Protection of Rights:</strong> We may disclose your information to protect our rights, privacy, safety, or property, or that of our users or others.</li>
                </ul>
                
                <p className="mb-4">
                  We do not sell your personal information to third parties.
                </p>
              </div>

              {/* Data Security */}
              <div className="mb-10" id="data-security">
                <div className="flex items-center mb-4">
                  <Lock className="text-blue-600 mr-3" size={24} />
                  <h2 className="text-2xl font-semibold">Data Security</h2>
                </div>
                
                <p className="mb-4">
                  We implement appropriate technical and organizational measures to protect the security of your personal information. However, please be aware that no method of transmission over the internet or electronic storage is 100% secure, and we cannot guarantee absolute security.
                </p>
                <p className="mb-4">
                  Our security measures include:
                </p>
                <ul className="list-disc pl-6 mb-4 space-y-1">
                  <li>Encryption of sensitive data</li>
                  <li>Secure socket layer (SSL) technology</li>
                  <li>Regular security assessments</li>
                  <li>Access controls and authentication procedures</li>
                  <li>Regular monitoring for potential vulnerabilities</li>
                </ul>
              </div>

              {/* Cookies and Similar Technologies */}
              <div className="mb-10" id="cookies">
                <div className="flex items-center mb-4">
                  <Bell className="text-blue-600 mr-3" size={24} />
                  <h2 className="text-2xl font-semibold">Cookies and Similar Technologies</h2>
                </div>
                
                <p className="mb-4">
                  We use cookies and similar tracking technologies to track activity on our website and store certain information. Cookies are files with a small amount of data that may include an anonymous unique identifier.
                </p>
                <p className="mb-4">
                  We use the following types of cookies:
                </p>
                <ul className="list-disc pl-6 mb-4 space-y-1">
                  <li><strong>Essential Cookies:</strong> Necessary for the website to function properly.</li>
                  <li><strong>Analytical/Performance Cookies:</strong> Allow us to recognize and count the number of visitors and see how visitors move around our website.</li>
                  <li><strong>Functionality Cookies:</strong> Enable us to personalize content and remember your preferences.</li>
                  <li><strong>Targeting Cookies:</strong> Record your visit to our website, the pages you have visited, and the links you have followed.</li>
                </ul>
                <p className="mb-4">
                  You can instruct your browser to refuse all cookies or to indicate when a cookie is being sent. However, if you do not accept cookies, you may not be able to use some portions of our service.
                </p>
              </div>

              {/* Your Rights and Choices */}
              <div className="mb-10" id="user-rights">
                <div className="flex items-center mb-4">
                  <HelpCircle className="text-blue-600 mr-3" size={24} />
                  <h2 className="text-2xl font-semibold">Your Rights and Choices</h2>
                </div>
                
                <p className="mb-4">
                  Depending on your location, you may have certain rights regarding your personal information, including:
                </p>
                <ul className="list-disc pl-6 mb-6 space-y-1">
                  <li><strong>Access:</strong> You can request access to the personal information we hold about you.</li>
                  <li><strong>Correction:</strong> You can request that we correct inaccurate or incomplete information.</li>
                  <li><strong>Deletion:</strong> You can request that we delete your personal information in certain circumstances.</li>
                  <li><strong>Restriction:</strong> You can request that we restrict the processing of your information.</li>
                  <li><strong>Data Portability:</strong> You can request a copy of your data in a structured, commonly used, and machine-readable format.</li>
                  <li><strong>Objection:</strong> You can object to our processing of your personal information.</li>
                </ul>
                
                <p className="mb-4">
                  To exercise these rights, please contact us using the information provided in the "Contact Us" section below.
                </p>
                
                <h3 className="text-lg font-medium mb-2 mt-6">Email Communications</h3>
                <p className="mb-4">
                  You can opt out of receiving marketing emails from us by clicking the "unsubscribe" link in any email we send. Even if you opt out of marketing emails, we may still send you service-related emails.
                </p>
              </div>

              {/* Children's Privacy */}
              <div className="mb-10" id="children">
                <h2 className="text-2xl font-semibold mb-4">Children's Privacy</h2>
                <p className="mb-4">
                  Our services are not intended for individuals under the age of 18. We do not knowingly collect personal information from children under 18. If you are a parent or guardian and believe that your child has provided us with personal information, please contact us, and we will take steps to delete such information.
                </p>
              </div>

              {/* International Data Transfers */}
              <div className="mb-10" id="international">
                <h2 className="text-2xl font-semibold mb-4">International Data Transfers</h2>
                <p className="mb-4">
                  Your information may be transferred to and processed in countries other than the country in which you reside. These countries may have data protection laws that are different from the laws of your country.
                </p>
                <p className="mb-4">
                  When we transfer your information to other countries, we will take appropriate measures to protect your information and ensure that any transfers comply with applicable data protection laws.
                </p>
              </div>

              {/* Changes to This Privacy Policy */}
              <div className="mb-10" id="changes">
                <h2 className="text-2xl font-semibold mb-4">Changes to This Privacy Policy</h2>
                <p className="mb-4">
                  We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the "Last Updated" date at the top of this page.
                </p>
                <p className="mb-4">
                  You are advised to review this Privacy Policy periodically for any changes. Changes to this Privacy Policy are effective when they are posted on this page.
                </p>
              </div>

              {/* Contact Us */}
              <div id="contact">
                <h2 className="text-2xl font-semibold mb-4">Contact Us</h2>
                <p className="mb-4">
                  If you have any questions about this Privacy Policy or our data practices, please contact us at:
                </p>
                <div className="bg-gray-50 p-6 rounded-lg">
                  <p className="font-medium">OptimizeBnb.AI</p>
                  <p>Email: privacy@optimizebnb.ai</p>
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