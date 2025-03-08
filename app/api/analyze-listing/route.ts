import { NextResponse } from 'next/server';
import { db } from '../../firebase/config';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import OpenAI from 'openai';
import puppeteer from 'puppeteer';
import * as fs from 'fs';
import * as path from 'path';
import * as os from 'os';

// Initialize OpenAI
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(request: Request) {
  try {
    const { url, email } = await request.json();

    // Validate inputs
    if (!url) {
      return NextResponse.json({ error: 'Airbnb listing URL is required' }, { status: 400 });
    }

    if (!email) {
      return NextResponse.json({ error: 'Email address is required' }, { status: 400 });
    }

    // Store the listing URL and email in Firebase
    try {
      await addDoc(collection(db, 'listing_analysis_requests'), {
        url,
        email,
        timestamp: serverTimestamp(),
        status: 'submitted',
        ip: request.headers.get('x-forwarded-for') || 'unknown',
        userAgent: request.headers.get('user-agent') || 'unknown'
      });
      console.log('Stored listing analysis request in Firebase');
    } catch (error) {
      console.error('Error storing listing analysis request:', error);
      // Continue with analysis even if storage fails
    }

    let listingData;
    let analysis;

    try {
      // Scrape the Airbnb listing
      listingData = await scrapeAirbnbListing(url);
      
      // Use OpenAI to analyze the listing
      analysis = await analyzeWithOpenAI(listingData);
    } catch (error) {
      console.error('Error during scraping or analysis:', error);
      // Fall back to simulated analysis if scraping or OpenAI fails
      analysis = simulateAnalysis();
      listingData = { propertyName: extractListingName(url) };
    }

    // Return the analysis results
    return NextResponse.json({
      success: true,
      analysis: analysis,
      listingName: listingData.propertyName
    });
  } catch (error) {
    console.error('Error analyzing listing:', error);
    return NextResponse.json({ error: 'Failed to analyze listing' }, { status: 500 });
  }
}

// Function to find Chrome executable path
async function findChromePath() {
  // Check if path is provided in environment variables
  if (process.env.CHROME_EXECUTABLE_PATH) {
    return process.env.CHROME_EXECUTABLE_PATH;
  }
  
  // Default paths for different operating systems
  const platform = os.platform();
  let defaultPaths: string[] = [];
  
  if (platform === 'win32') {
    defaultPaths = [
      'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
      'C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe',
      process.env.LOCALAPPDATA + '\\Google\\Chrome\\Application\\chrome.exe'
    ];
  } else if (platform === 'darwin') {
    defaultPaths = [
      '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome'
    ];
  } else {
    defaultPaths = [
      '/usr/bin/google-chrome',
      '/usr/bin/google-chrome-stable'
    ];
  }
  
  // Check if any of the default paths exist
  for (const chromePath of defaultPaths) {
    try {
      if (fs.existsSync(chromePath)) {
        return chromePath;
      }
    } catch (error) {
      console.error(`Error checking Chrome path ${chromePath}:`, error);
    }
  }
  
  return null; // Let Puppeteer use its own bundled Chromium
}

// Function to scrape Airbnb listing content
async function scrapeAirbnbListing(url: string) {
  console.log(`Starting to scrape Airbnb listing: ${url}`);
  
  // Extract listing ID from URL
  const listingIdMatch = url.match(/\/rooms\/(\d+)/);
  if (!listingIdMatch) {
    console.error('Invalid Airbnb URL. Could not extract listing ID.');
    throw new Error('Invalid Airbnb URL. Could not extract listing ID.');
  }
  
  const listingId = listingIdMatch[1];
  console.log(`Extracted listing ID: ${listingId}`);
  
  let browser;
  try {
    // Find Chrome executable path
    const executablePath = await findChromePath();
    console.log(`Chrome executable path: ${executablePath || 'Not found, using default'}`);
    
    // Launch browser with or without executablePath
    const launchOptions: any = {
      headless: "new",
      args: ['--no-sandbox', '--disable-setuid-sandbox', '--window-size=1920,1080']
    };
    
    if (executablePath) {
      launchOptions.executablePath = executablePath;
    }
    
    console.log('Launching browser with options:', launchOptions);
    browser = await puppeteer.launch(launchOptions);
    
    // Create a new page
    const page = await browser.newPage();
    
    // Set viewport size
    await page.setViewport({ width: 1920, height: 1080 });
    
    // Navigate to the Airbnb listing
    console.log(`Navigating to: ${url}`);
    await page.goto(url, { waitUntil: 'networkidle2', timeout: 60000 });
    
    console.log('Page loaded, extracting content...');
    
    // Take a screenshot of the full page
    const screenshotBuffer = await page.screenshot({ 
      fullPage: true,
      type: 'jpeg',
      quality: 70
    });
    const screenshotBase64 = screenshotBuffer.toString('base64');
    console.log('Screenshot taken');
    
    // Extract property name
    const propertyName = await page.evaluate(() => {
      // Try different selectors for the property name
      const titleElement = document.querySelector('h1') || 
                          document.querySelector('[data-section-id="TITLE_DEFAULT"] h1') ||
                          document.querySelector('[data-section-id="TITLE_DEFAULT"] div');
      
      return titleElement ? titleElement.textContent?.trim() : 'Airbnb Property';
    });
    console.log(`Property name: ${propertyName}`);
    
    // Extract property type and location
    const propertyTypeAndLocation = await page.evaluate(() => {
      // Try different selectors for property type and location
      const typeLocationElement = document.querySelector('h2') || 
                                 document.querySelector('[data-section-id="OVERVIEW_DEFAULT"] h2') ||
                                 document.querySelector('.hpipapi');
      
      return typeLocationElement ? typeLocationElement.textContent?.trim() : '';
    });
    console.log(`Property type and location: ${propertyTypeAndLocation}`);
    
    // Extract property description
    const description = await page.evaluate(() => {
      // Try different selectors for the description
      const descriptionElement = document.querySelector('[data-section-id="DESCRIPTION_DEFAULT"] span') || 
                                document.querySelector('[data-section-id="DESCRIPTION_DEFAULT"]') ||
                                document.querySelector('div[data-testid="listing-description"]');
      
      if (descriptionElement) {
        return descriptionElement.textContent?.trim() || '';
      }
      
      // Fallback: look for any large text block that might be a description
      const possibleDescriptions = Array.from(document.querySelectorAll('div > span > span')).filter(el => 
        el.textContent && el.textContent.length > 100
      );
      
      return possibleDescriptions.length > 0 ? possibleDescriptions[0].textContent?.trim() : '';
    });
    console.log(`Description extracted: ${description ? description.substring(0, 50) + '...' : 'Not found'}`);
    
    // Extract amenities
    const amenities = await page.evaluate(() => {
      // Try different selectors for amenities
      const amenitiesElements = Array.from(
        document.querySelectorAll('[data-section-id="AMENITIES_DEFAULT"] div[role="list"] div') ||
        document.querySelectorAll('[data-section-id="AMENITIES_DEFAULT"] li') ||
        document.querySelectorAll('div[data-testid="amenity"]')
      );
      
      if (amenitiesElements.length === 0) {
        // Try to find the "Show all amenities" button and extract text
        const amenitiesSection = document.querySelector('[data-section-id="AMENITIES_DEFAULT"]');
        
        if (amenitiesSection) {
          return [amenitiesSection.textContent?.trim() || 'Amenities section found but details not extracted'];
        }
        
        // Try to find any section with "amenities" in the heading
        const headings = Array.from(document.querySelectorAll('h2, h3'));
        for (const heading of headings) {
          if (heading.textContent?.toLowerCase().includes('amenities')) {
            const section = heading.closest('section') || heading.parentElement;
            if (section) {
              return [section.textContent?.trim() || 'Amenities section found but details not extracted'];
            }
          }
        }
      }
      
      return amenitiesElements.map(el => el.textContent?.trim()).filter(Boolean);
    });
    console.log(`Amenities extracted: ${amenities.length}`);
    
    // Extract location
    const location = await page.evaluate(() => {
      // Try different selectors for location
      const locationElement = document.querySelector('[data-section-id="LOCATION_DEFAULT"] button') ||
                             document.querySelector('[data-section-id="LOCATION_DEFAULT"] h2');
      
      if (locationElement) {
        const text = locationElement.textContent?.trim() || '';
        return text.replace('Where you\'ll be', '').replace('Learn more', '').trim();
      }
      
      // Try to extract from the property type and location if available
      const typeLocationElement = document.querySelector('h2');
      
      if (typeLocationElement) {
        const text = typeLocationElement.textContent?.trim() || '';
        const locationMatch = text.match(/in\s+(.+)$/);
        return locationMatch ? locationMatch[1].trim() : '';
      }
      
      // Try to find any element that mentions location
      const elements = Array.from(document.querySelectorAll('h2, div, span'));
      for (const el of elements) {
        const text = el.textContent || '';
        if (text.includes('in ') && text.includes(',')) {
          const locationMatch = text.match(/in\s+(.+)$/);
          return locationMatch ? locationMatch[1].trim() : text;
        }
      }
      
      return 'Location information not found';
    });
    console.log(`Location extracted: ${location}`);
    
    // Extract host information
    const host = await page.evaluate(() => {
      // Try different selectors for host
      const hostElement = document.querySelector('[data-section-id="HOST_PROFILE_DEFAULT"] h2') ||
                         document.querySelector('div[data-testid="host-profile"] h2');
      
      if (hostElement) {
        return hostElement.textContent?.trim().replace('Hosted by', '').trim();
      }
      
      // Try to find any element that mentions "Hosted by"
      const elements = Array.from(document.querySelectorAll('h2, div, span'));
      for (const el of elements) {
        const text = el.textContent || '';
        if (text.includes('Hosted by')) {
          return text.replace('Hosted by', '').trim();
        }
      }
      
      return 'Host information not found';
    });
    console.log(`Host extracted: ${host}`);
    
    // Extract price
    const price = await page.evaluate(() => {
      // Try different selectors for price
      const priceElement = document.querySelector('span[data-testid="price-element"]') ||
                          document.querySelector('span._tyxjp1');
      
      if (priceElement) {
        return priceElement.textContent?.trim();
      }
      
      // Try to find any element that contains a currency symbol
      const elements = Array.from(document.querySelectorAll('span, div'));
      for (const el of elements) {
        const text = el.textContent || '';
        if (text.match(/[$€£¥]/) && text.includes('night')) {
          return text.trim();
        }
      }
      
      return 'Price information not found';
    });
    console.log(`Price extracted: ${price}`);
    
    // Extract reviews
    const reviews = await page.evaluate(() => {
      // Try different selectors for reviews
      const reviewElements = Array.from(
        document.querySelectorAll('[data-section-id="reviews"] div[role="listitem"]') ||
        document.querySelectorAll('div[data-testid="review"]')
      );
      
      if (reviewElements.length === 0) {
        // Try to find the reviews section and extract text
        const reviewsSection = document.querySelector('[data-section-id="reviews"]');
        
        if (reviewsSection) {
          return [reviewsSection.textContent?.trim() || 'Reviews section found but details not extracted'];
        }
        
        // Try to find any section with "review" in the heading
        const headings = Array.from(document.querySelectorAll('h2, h3'));
        for (const heading of headings) {
          if (heading.textContent?.toLowerCase().includes('review')) {
            const section = heading.closest('section') || heading.parentElement;
            if (section) {
              return [section.textContent?.trim() || 'Reviews section found but details not extracted'];
            }
          }
        }
      }
      
      return reviewElements.slice(0, 5).map(el => el.textContent?.trim()).filter(Boolean);
    });
    console.log(`Reviews extracted: ${reviews.length}`);
    
    // Extract additional information from the page
    const additionalInfo = await page.evaluate(() => {
      // Get all section headings and their content
      const sections = [];
      const headings = Array.from(document.querySelectorAll('section h2, h2'));
      
      for (const heading of headings) {
        const headingText = heading.textContent?.trim() || '';
        if (!headingText) continue;
        
        let contentText = '';
        const section = heading.closest('section');
        if (section) {
          contentText = section.textContent?.trim() || '';
          // Remove the heading text from the content to avoid duplication
          contentText = contentText.replace(headingText, '').trim();
        } else {
          // If no section, try to get content from siblings
          let nextElement = heading.nextElementSibling;
          while (nextElement && nextElement.tagName !== 'H2') {
            contentText += ' ' + (nextElement.textContent?.trim() || '');
            nextElement = nextElement.nextElementSibling;
          }
          contentText = contentText.trim();
        }
        
        sections.push({
          heading: headingText,
          content: contentText.substring(0, 200) + (contentText.length > 200 ? '...' : '')
        });
      }
      
      // Get all visible text on the page
      const allText = document.body.innerText;
      
      return {
        sections,
        allText: allText.substring(0, 5000) // Limit to first 5000 characters
      };
    });
    console.log(`Additional info extracted: ${additionalInfo.sections.length} sections`);
    
    // Close the browser
    await browser.close();
    
    // Return the scraped data
    return {
      propertyName,
      propertyTypeAndLocation,
      description,
      amenities,
      location,
      host,
      price,
      reviews,
      additionalInfo,
      url,
      screenshot: screenshotBase64
    };
  } catch (error) {
    console.error('Error scraping Airbnb listing:', error);
    
    // Make sure to close the browser if it was opened
    if (browser) {
      await browser.close();
    }
    
    throw error;
  }
}

// Function to analyze listing with OpenAI
async function analyzeWithOpenAI(listingData: Record<string, any>) {
  try {
    if (!process.env.OPENAI_API_KEY) {
      console.log('OpenAI API key not available, returning simulated analysis');
      return simulateAnalysis();
    }
    
    console.log('Analyzing listing with OpenAI');
    
    // Prepare the messages array
    const messages = [
      { 
        role: "system", 
        content: "You are an expert Airbnb listing analyst with years of experience in hospitality and marketing. Your goal is to help hosts optimize their listings to attract more bookings and improve guest satisfaction." 
      },
      { 
        role: "user", 
        content: `
        Analyze this Airbnb listing and provide detailed feedback to help the host improve their listing and attract more bookings.
        
        LISTING DETAILS:
        Property Name: ${listingData.propertyName}
        Property Type and Location: ${listingData.propertyTypeAndLocation}
        Description: ${listingData.description}
        Amenities: ${listingData.amenities.join(', ')}
        Location: ${listingData.location}
        Host: ${listingData.host}
        Price: ${listingData.price}
        Reviews: ${listingData.reviews.join(' | ')}
        
        Additional Information:
        ${listingData.additionalInfo.sections.map((s: {heading: string, content: string}) => `${s.heading}: ${s.content}`).join('\n\n')}
        
        Please provide your analysis in the following format:
        
        Pros:
        - [List strengths of the listing]
        
        Cons:
        - [List weaknesses or areas for improvement]
        
        Recommendations:
        - [Provide specific, actionable recommendations to improve the listing]
        
        Overall Score: [Provide a score out of 100]
        `
      }
    ];
    
    // Add the screenshot if available
    if (listingData.screenshot) {
      messages.push({
        role: "user",
        content: [
          {
            type: "text",
            text: "Here is a screenshot of the Airbnb listing. Please use this to provide additional insights in your analysis."
          },
          {
            type: "image_url",
            image_url: {
              url: `data:image/jpeg;base64,${listingData.screenshot}`
            }
          }
        ]
      } as any);
    }
    
    const response = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: messages as any,
      temperature: 0.7,
      max_tokens: 1500
    });
    
    return response.choices[0].message.content;
  } catch (error) {
    console.error('Error analyzing with OpenAI:', error);
    return simulateAnalysis();
  }
}

// Helper function to extract listing name from URL
function extractListingName(url: string): string {
  // This is a simplified example - in a real implementation, you would parse the URL
  // or scrape the listing page to get the actual name
  try {
    const urlObj = new URL(url);
    const pathParts = urlObj.pathname.split('/');
    const lastPart = pathParts[pathParts.length - 1];
    
    // Convert slug to title case
    if (lastPart && lastPart !== 'rooms') {
      return lastPart
        .split('-')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ');
    }
    
    return 'Airbnb Listing';
  } catch {
    return 'Airbnb Listing';
  }
}

// Simulate analysis for demo purposes or fallback
function simulateAnalysis(): string {
  return `
Pros:
- Great location with excellent proximity to local attractions
- High-quality photos that showcase the property well
- Comprehensive amenities list that meets guest expectations
- Clear and detailed house rules
- Responsive host with good communication

Cons:
- Title could be more descriptive and include key selling points
- Description lacks emotional appeal and unique property highlights
- Pricing may be higher than similar listings in the area
- Some reviews mention issues with cleanliness
- Missing information about parking options

Recommendations:
- Enhance the title with specific features like "Ocean View" or "Walking Distance to Downtown"
- Add more personal touches to the description to create emotional connection
- Consider adjusting pricing strategy based on seasonal demand
- Address cleanliness concerns in your listing and with your cleaning service
- Add clear information about parking availability and options
- Include more local recommendations to help guests plan their stay
- Highlight unique features that differentiate your property from others

Overall Score: 78
`;
} 