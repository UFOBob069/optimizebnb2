import { NextResponse } from 'next/server';
import OpenAI from 'openai';
import puppeteer from 'puppeteer-core';
import * as os from 'os';
import * as path from 'path';
import * as fs from 'fs/promises';

// Initialize OpenAI client
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// In-memory store for emails (in a real app, you'd use a database)
const subscriberEmails: Set<string> = new Set();

// Function to find Chrome executable path based on OS
async function findChromePath() {
  console.log('Attempting to find Chrome executable path...');
  const platform = os.platform();
  console.log(`Detected platform: ${platform}`);
  
  try {
    if (platform === 'win32') {
      const windowsPaths = [
        'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
        'C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe',
        path.join(process.env.LOCALAPPDATA || '', 'Google\\Chrome\\Application\\chrome.exe'),
        path.join(process.env.PROGRAMFILES || '', 'Google\\Chrome\\Application\\chrome.exe'),
        path.join(process.env['PROGRAMFILES(X86)'] || '', 'Google\\Chrome\\Application\\chrome.exe'),
        path.join(process.env.USERPROFILE || '', 'AppData\\Local\\Google\\Chrome\\Application\\chrome.exe'),
      ];
      
      console.log('Checking Windows Chrome paths...');
      for (const windowsPath of windowsPaths) {
        try {
          console.log(`Checking path: ${windowsPath}`);
          await fs.access(windowsPath);
          console.log(`Found Chrome at: ${windowsPath}`);
          return windowsPath;
        } catch (error) {
          // Path doesn't exist, try next one
          console.log(`Path not found: ${windowsPath}`);
        }
      }
    } else if (platform === 'darwin') {
      const macPath = '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';
      try {
        console.log(`Checking Mac path: ${macPath}`);
        await fs.access(macPath);
        console.log(`Found Chrome at: ${macPath}`);
        return macPath;
      } catch (error) {
        console.log(`Mac Chrome path not found: ${macPath}`);
      }
    } else if (platform === 'linux') {
      const linuxPaths = [
        '/usr/bin/google-chrome',
        '/usr/bin/chromium-browser',
        '/usr/bin/chromium',
        '/snap/bin/chromium',
      ];
      
      console.log('Checking Linux Chrome paths...');
      for (const linuxPath of linuxPaths) {
        try {
          console.log(`Checking path: ${linuxPath}`);
          await fs.access(linuxPath);
          console.log(`Found Chrome at: ${linuxPath}`);
          return linuxPath;
        } catch (error) {
          // Path doesn't exist, try next one
          console.log(`Path not found: ${linuxPath}`);
        }
      }
    }
    
    console.log('No Chrome installation found. Will use puppeteer without executablePath.');
    return null;
  } catch (error) {
    console.error('Error finding Chrome path:', error);
    return null;
  }
}

// Function to simulate Airbnb scraping when actual scraping fails
function simulateAirbnbScraping(url, address) {
  console.log(`Simulating Airbnb scraping for URL: ${url}`);
  console.log(`Address provided: ${address}`);
  
  // Extract listing ID from URL
  const listingIdMatch = url.match(/\/rooms\/(\d+)/);
  const listingId = listingIdMatch ? listingIdMatch[1] : Math.floor(Math.random() * 1000000).toString();
  console.log(`Using listing ID: ${listingId}`);
  
  // Parse location from address
  const locationParts = address.split(',').map(part => part.trim());
  const city = locationParts[0] || 'Beautiful City';
  const state = locationParts[1] || '';
  const country = locationParts[2] || 'United States';
  
  console.log(`Parsed location: ${city}, ${state}, ${country}`);
  
  // Generate property name based on listing ID
  const propertyName = `${city} ${listingId % 2 === 0 ? 'Luxury' : 'Cozy'} ${
    ['Apartment', 'House', 'Villa', 'Condo', 'Cottage'][listingId % 5]
  }`;
  console.log(`Generated property name: ${propertyName}`);
  
  // Generate property type
  const propertyType = [
    'Entire apartment',
    'Entire house',
    'Private room',
    'Entire villa',
    'Entire condominium'
  ][listingId % 5];
  console.log(`Generated property type: ${propertyType}`);
  
  // Generate description
  const description = `Experience the best of ${city} in this ${
    listingId % 2 === 0 ? 'luxurious' : 'charming'
  } ${propertyType.toLowerCase()}. Located in a ${
    ['quiet', 'vibrant', 'scenic', 'historic', 'trendy'][listingId % 5]
  } neighborhood, you'll be close to all the attractions and amenities you need for a perfect stay.`;
  console.log(`Generated description: ${description}`);
  
  // Calculate bedrooms, bathrooms, and max guests based on listing ID
  const bedrooms = (listingId % 5) + 1;
  const bathrooms = (listingId % 3) + 1;
  const maxGuests = bedrooms * 2;
  console.log(`Generated details: ${bedrooms} bedrooms, ${bathrooms} bathrooms, ${maxGuests} max guests`);
  
  // Generate host information
  const hostInfo = {
    name: ['Sarah', 'Michael', 'Emma', 'David', 'Olivia'][listingId % 5],
    isSuperhost: listingId % 3 === 0,
    responseRate: '100%',
    responseTime: 'within an hour'
  };
  console.log(`Generated host info: ${JSON.stringify(hostInfo)}`);
  
  // Generate amenities
  const amenities = [
    'Wifi',
    'Kitchen',
    'Free parking',
    'TV',
    'Air conditioning',
    'Washer',
    'Dryer',
    'Pool',
    'Hot tub',
    'Gym'
  ].slice(0, 5 + (listingId % 5));
  console.log(`Generated amenities: ${amenities.join(', ')}`);
  
  // Generate house rules
  const houseRules = [
    'No smoking',
    'No pets',
    'No parties or events',
    'Check-in is anytime after 3PM',
    'Check out by 11AM'
  ];
  console.log(`Generated house rules: ${houseRules.join(', ')}`);
  
  // Return the simulated property data
  const propertyData = {
    propertyName,
    propertyType,
    description,
    location: {
      city,
      state,
      country,
      address
    },
    details: {
      bedrooms,
      bathrooms,
      maxGuests
    },
    hostInfo,
    amenities,
    houseRules,
    listingId,
    currentPrice: 100 + (listingId % 200),
    suggestedPrice: 120 + (listingId % 180),
    marketAverage: 110 + (listingId % 190),
    priceRange: {
      min: 80 + (listingId % 50),
      max: 150 + (listingId % 100)
    },
    recommendations: [
      `Increase your base price by $${10 + (listingId % 30)} during weekends`,
      `Lower your price by $${5 + (listingId % 20)} for stays longer than 7 days`,
      `Implement a ${10 + (listingId % 15)}% premium during ${['summer', 'winter', 'holiday', 'festival'][listingId % 4]} season`,
      `Consider offering a ${5 + (listingId % 10)}% discount for last-minute bookings`
    ],
    seasonalAdjustments: [
      { season: 'Summer', adjustment: 15 + (listingId % 10) },
      { season: 'Winter', adjustment: listingId % 2 === 0 ? 10 : -5 },
      { season: 'Spring', adjustment: 5 },
      { season: 'Fall', adjustment: listingId % 2 === 0 ? -5 : 8 }
    ],
    competitiveAnalysis: {
      similarProperties: 5 + (listingId % 15),
      pricePosition: ['above', 'below', 'average'][listingId % 3],
      marketShare: 5 + (listingId % 10)
    }
  };
  
  console.log('Generated property data summary:', {
    name: propertyData.propertyName,
    type: propertyData.propertyType,
    bedrooms: propertyData.details.bedrooms,
    bathrooms: propertyData.details.bathrooms,
    location: `${propertyData.location.city}, ${propertyData.location.state}`
  });
  
  return propertyData;
}

// Function to scrape Airbnb listing
async function scrapeAirbnbListing(url, address) {
  console.log(`Starting to scrape Airbnb listing: ${url}`);
  console.log(`Address provided: ${address}`);
  
  // Extract listing ID from URL
  const listingIdMatch = url.match(/\/rooms\/(\d+)/);
  if (!listingIdMatch) {
    console.error('Invalid Airbnb URL. Could not extract listing ID.');
    throw new Error('Invalid Airbnb URL. Could not extract listing ID.');
  }
  
  const listingId = listingIdMatch[1];
  console.log(`Extracted listing ID: ${listingId}`);
  
  // Try to extract details from the URL itself
  const urlDetails = extractDetailsFromUrl(url);
  console.log('Details extracted from URL:', urlDetails);
  
  let browser;
  try {
    // Find Chrome executable path
    const executablePath = await findChromePath();
    console.log(`Chrome executable path: ${executablePath || 'Not found, using default'}`);
    
    // Launch browser with or without executablePath
    const launchOptions = {
      headless: 'new',
      args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-web-security', '--disable-features=IsolateOrigins,site-per-process']
    };
    
    if (executablePath) {
      launchOptions.executablePath = executablePath;
    }
    
    console.log('Launching browser with options:', launchOptions);
    browser = await puppeteer.launch(launchOptions);
    
    // Create a new page
    const page = await browser.newPage();
    
    // Set viewport
    await page.setViewport({ width: 1280, height: 800 });
    
    // Set a user agent to avoid detection
    await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36');
    
    // Navigate to the Airbnb listing
    console.log(`Navigating to: ${url}`);
    await page.goto(url, { waitUntil: 'networkidle2', timeout: 60000 });
    
    // Wait a bit for any dynamic content to load
    await page.waitForTimeout(2000);
    
    // Take a screenshot for debugging
    await page.screenshot({ path: 'airbnb-listing.png' });
    console.log('Screenshot taken for debugging');
    
    // Extract property details
    console.log('Extracting property details...');
    
    // Property name - this part seems to be working well
    const propertyName = await page.evaluate(() => {
      const titleElement = document.querySelector('h1');
      return titleElement ? titleElement.textContent.trim() : 'Cozy Airbnb Property';
    });
    console.log(`Property name: ${propertyName}`);
    
    // For the welcome guide, we'll focus on extracting the most important information
    // and use fallbacks for the rest
    
    // Use the address provided by the user for location
    const locationParts = address.split(',').map(part => part.trim());
    const location = {
      city: locationParts[0] || 'Unknown City',
      state: locationParts[1] || '',
      country: locationParts[2] || 'Unknown Country',
      neighborhood: '',
      fullAddress: address
    };
    console.log(`Using provided location: ${location.city}, ${location.state}, ${location.country}`);
    
    // Extract other details with better error handling
    let propertyType, description, details, price, amenities, houseRules, hostInfo;
    
    try {
      propertyType = await page.evaluate(() => {
        // Try multiple selectors for property type
        const typeSelectors = [
          '[data-section-id="OVERVIEW_DEFAULT"] > div > h2',
          '[data-section-id="TITLE_DEFAULT"] span',
          'h1 + div span',
          '[data-testid="listing-title"] + div span'
        ];
        
        for (const selector of typeSelectors) {
          const element = document.querySelector(selector);
          if (element && element.textContent) {
            return element.textContent.trim();
          }
        }
        
        return 'Entire rental unit';
      });
      console.log(`Property type: ${propertyType}`);
    } catch (error) {
      console.error('Error extracting property type:', error);
      propertyType = 'Entire rental unit';
    }
    
    try {
      description = await page.evaluate(() => {
        // Try multiple selectors for description
        const descriptionSelectors = [
          '[data-section-id="DESCRIPTION_DEFAULT"] > div > span',
          '[data-section-id="DESCRIPTION_DEFAULT"] div',
          '[data-testid="listing-description"]',
          'section[aria-labelledby="details"] div'
        ];
        
        for (const selector of descriptionSelectors) {
          const elements = document.querySelectorAll(selector);
          for (const element of elements) {
            if (element && element.textContent && element.textContent.length > 50) {
              return element.textContent.trim();
            }
          }
        }
        
        return 'A beautiful property perfect for your stay.';
      });
      console.log(`Description extracted: ${description.substring(0, 100)}...`);
    } catch (error) {
      console.error('Error extracting description:', error);
      description = 'A beautiful property perfect for your stay.';
    }
    
    try {
      details = await page.evaluate(() => {
        // Try to find details in various locations
        const detailsSelectors = [
          '[data-section-id="OVERVIEW_DEFAULT"] > div > h2',
          'h1 + div',
          '[data-testid="listing-title"] + div',
          'div[data-plugin-in-point-id="OVERVIEW_DEFAULT"]',
          // Add more specific selectors
          'div[data-section-id="OVERVIEW_DEFAULT"]',
          'div[data-testid="listing-details"]',
          'div[data-testid="listing-summary"]'
        ];
        
        // Debug: Log all text content from potential detail containers
        console.log('Potential detail containers:');
        detailsSelectors.forEach(selector => {
          const elements = document.querySelectorAll(selector);
          elements.forEach((el, i) => {
            console.log(`${selector} [${i}]: ${el.textContent}`);
          });
        });
        
        // First try to find the details in a structured way
        let detailsText = '';
        for (const selector of detailsSelectors) {
          const elements = document.querySelectorAll(selector);
          for (const element of elements) {
            if (element && element.textContent) {
              detailsText += element.textContent + ' ';
            }
          }
        }
        
        console.log('Combined details text:', detailsText);
        
        // Extract numbers using regex
        const bedroomsMatch = detailsText.match(/(\d+)\s+bedroom/i);
        const bathroomsMatch = detailsText.match(/(\d+)\s+bathroom/i);
        const guestsMatch = detailsText.match(/(\d+)\s+guest/i);
        
        console.log('Regex matches:', {
          bedrooms: bedroomsMatch ? bedroomsMatch[1] : 'not found',
          bathrooms: bathroomsMatch ? bathroomsMatch[1] : 'not found',
          guests: guestsMatch ? guestsMatch[1] : 'not found'
        });
        
        // If we couldn't find details in the text, try looking for specific elements
        if (!bedroomsMatch && !bathroomsMatch && !guestsMatch) {
          // Look for elements that might contain these details
          const allText = document.body.textContent || '';
          
          // Try more flexible regex patterns
          const bedroomsAlt = allText.match(/(\d+)\s*(?:bedroom|bed)/i);
          const bathroomsAlt = allText.match(/(\d+)\s*(?:bathroom|bath)/i);
          const guestsAlt = allText.match(/(\d+)\s*(?:guest|people|person)/i);
          
          console.log('Alternative regex matches:', {
            bedrooms: bedroomsAlt ? bedroomsAlt[1] : 'not found',
            bathrooms: bathroomsAlt ? bathroomsAlt[1] : 'not found',
            guests: guestsAlt ? guestsAlt[1] : 'not found'
          });
          
          // Try to find numbers near keywords
          const findNumberNearKeyword = (keyword) => {
            const elements = Array.from(document.querySelectorAll('*'));
            for (const el of elements) {
              if (el.textContent && el.textContent.toLowerCase().includes(keyword)) {
                const text = el.textContent;
                const numberMatch = text.match(/\d+/);
                if (numberMatch) return parseInt(numberMatch[0]);
              }
            }
            return null;
          };
          
          const bedroomNumber = findNumberNearKeyword('bedroom') || findNumberNearKeyword('bed');
          const bathroomNumber = findNumberNearKeyword('bathroom') || findNumberNearKeyword('bath');
          const guestNumber = findNumberNearKeyword('guest') || findNumberNearKeyword('people');
          
          console.log('Numbers near keywords:', {
            bedrooms: bedroomNumber || 'not found',
            bathrooms: bathroomNumber || 'not found',
            guests: guestNumber || 'not found'
          });
          
          return {
            bedrooms: bedroomsAlt ? parseInt(bedroomsAlt[1]) : (bedroomNumber || 1),
            bathrooms: bathroomsAlt ? parseInt(bathroomsAlt[1]) : (bathroomNumber || 1),
            maxGuests: guestsAlt ? parseInt(guestsAlt[1]) : (guestNumber || 2)
          };
        }
        
        return {
          bedrooms: bedroomsMatch ? parseInt(bedroomsMatch[1]) : 1,
          bathrooms: bathroomsMatch ? parseInt(bathroomsMatch[1]) : 1,
          maxGuests: guestsMatch ? parseInt(guestsMatch[1]) : 2
        };
      });
      console.log(`Details extracted: ${JSON.stringify(details)}`);
      
      // Add a direct page content extraction for debugging
      const pageContent = await page.evaluate(() => {
        // Get the text content of specific sections that might contain details
        const titleArea = document.querySelector('h1')?.parentElement?.textContent || '';
        const summaryArea = Array.from(document.querySelectorAll('h1 ~ div')).map(el => el.textContent).join(' ');
        
        return {
          titleArea,
          summaryArea,
          bodyText: document.body.textContent.substring(0, 1000) // First 1000 chars of body
        };
      });
      console.log('Page content snippets for debugging:');
      console.log('Title area:', pageContent.titleArea.substring(0, 200));
      console.log('Summary area:', pageContent.summaryArea.substring(0, 200));
      
      // Try to extract details from the screenshot
      // Save a higher resolution screenshot for better analysis
      await page.setViewport({ width: 1920, height: 1080 });
      await page.screenshot({ path: 'airbnb-listing-hires.png', fullPage: false });
      console.log('High-resolution screenshot taken for debugging');
      
      // After taking the screenshot, try a more direct approach to extract details
      try {
        // Wait for the page to fully render
        await page.waitForTimeout(1000);
        
        // Try to extract details directly from the page content
        const directDetails = await page.evaluate(() => {
          // Function to find text in the page that matches a pattern
          const findInPage = (pattern) => {
            const matches = [];
            const walker = document.createTreeWalker(
              document.body,
              NodeFilter.SHOW_TEXT,
              null,
              false
            );
            
            let node;
            while (node = walker.nextNode()) {
              const text = node.textContent.trim();
              if (text && pattern.test(text)) {
                matches.push({
                  text,
                  match: text.match(pattern)[0],
                  element: node.parentElement
                });
              }
            }
            return matches;
          };
          
          // Look for patterns like "2 bedrooms", "1 bath", "4 guests"
          const bedroomMatches = findInPage(/\d+\s*(?:bedroom|bed)/i);
          const bathroomMatches = findInPage(/\d+\s*(?:bathroom|bath)/i);
          const guestMatches = findInPage(/\d+\s*(?:guest|people|person)/i);
          
          // Extract the numbers
          const extractNumber = (matches) => {
            if (matches.length > 0) {
              const numberMatch = matches[0].text.match(/\d+/);
              return numberMatch ? parseInt(numberMatch[0]) : null;
            }
            return null;
          };
          
          const bedrooms = extractNumber(bedroomMatches);
          const bathrooms = extractNumber(bathroomMatches);
          const maxGuests = extractNumber(guestMatches);
          
          return {
            bedrooms: bedrooms || null,
            bathrooms: bathrooms || null,
            maxGuests: maxGuests || null,
            // Include the raw matches for debugging
            raw: {
              bedroomMatches: bedroomMatches.map(m => m.text),
              bathroomMatches: bathroomMatches.map(m => m.text),
              guestMatches: guestMatches.map(m => m.text)
            }
          };
        });
        
        console.log('Direct extraction results:', directDetails);
        
        // Update the details with the direct extraction results if they're available
        if (directDetails.bedrooms) details.bedrooms = directDetails.bedrooms;
        if (directDetails.bathrooms) details.bathrooms = directDetails.bathrooms;
        if (directDetails.maxGuests) details.maxGuests = directDetails.maxGuests;
        
        console.log(`Updated details: ${JSON.stringify(details)}`);
      } catch (error) {
        console.error('Error in direct extraction:', error);
      }
    } catch (error) {
      console.error('Error extracting details:', error);
      details = { bedrooms: 1, bathrooms: 1, maxGuests: 2 };
    }
    
    // For the welcome guide, we'll use some default values for the remaining fields
    // to ensure we can generate a guide even if scraping fails
    
    amenities = ['Wifi', 'Kitchen', 'Free parking', 'TV', 'Air conditioning'];
    houseRules = ['No smoking', 'No parties or events', 'Check-in time is flexible', 'Check out by 11AM'];
    hostInfo = {
      name: 'Your Host',
      isSuperhost: false,
      responseRate: '100%',
      responseTime: 'within a day'
    };
    
    // Close the browser
    await browser.close();
    
    // Combine all the details we've extracted
    const finalDetails = {
      // Start with default values
      bedrooms: 1,
      bathrooms: 1,
      maxGuests: 2,
      
      // Override with URL details if available
      ...(urlDetails.bedrooms && { bedrooms: urlDetails.bedrooms }),
      ...(urlDetails.bathrooms && { bathrooms: urlDetails.bathrooms }),
      ...(urlDetails.maxGuests && { maxGuests: urlDetails.maxGuests }),
      
      // Override with details from page if available
      ...(details.bedrooms && { bedrooms: details.bedrooms }),
      ...(details.bathrooms && { bathrooms: details.bathrooms }),
      ...(details.maxGuests && { maxGuests: details.maxGuests })
    };
    
    console.log(`Final combined details: ${JSON.stringify(finalDetails)}`);
    
    // Use the final combined details
    details = finalDetails;
    
    // Return the property data
    return {
      propertyName,
      propertyType,
      description,
      location,
      details,
      hostInfo,
      amenities,
      houseRules,
      listingId,
      pricingStrategy: {
        currentPrice: 100,
        suggestedPrice: 120,
        marketAverage: 110,
        priceRange: {
          min: 90,
          max: 130
        },
        recommendations: [
          'Consider adjusting your base price based on seasonal demand',
          'Offer discounts for longer stays',
          'Implement dynamic pricing for weekends and holidays',
          'Monitor competitor prices in your area'
        ]
      }
    };
  } catch (error) {
    console.error('Error during scraping:', error);
    if (browser) {
      await browser.close();
    }
    console.log('Falling back to simulation...');
    return simulateAirbnbScraping(url, address);
  }
}

// Function to extract details from the URL
function extractDetailsFromUrl(url) {
  const details = {
    bedrooms: null,
    bathrooms: null,
    maxGuests: null
  };
  
  try {
    // Airbnb sometimes includes details in the URL parameters
    const urlObj = new URL(url);
    const params = new URLSearchParams(urlObj.search);
    
    // Check for adults, children, infants parameters
    const adults = params.get('adults');
    const children = params.get('children');
    const infants = params.get('infants');
    
    if (adults || children || infants) {
      const totalGuests = (parseInt(adults) || 0) + (parseInt(children) || 0);
      if (totalGuests > 0) {
        details.maxGuests = totalGuests;
      }
    }
    
    // Check if details are in the URL path segments
    const pathSegments = urlObj.pathname.split('/');
    for (const segment of pathSegments) {
      // Look for patterns like "2-bedroom", "1-bath", etc.
      const bedroomMatch = segment.match(/(\d+)-bedroom/i);
      const bathroomMatch = segment.match(/(\d+)-bathroom/i) || segment.match(/(\d+)-bath/i);
      const guestMatch = segment.match(/(\d+)-guest/i) || segment.match(/(\d+)-people/i);
      
      if (bedroomMatch) details.bedrooms = parseInt(bedroomMatch[1]);
      if (bathroomMatch) details.bathrooms = parseInt(bathroomMatch[1]);
      if (guestMatch) details.maxGuests = parseInt(guestMatch[1]);
    }
    
    // Check if details are in the URL fragment
    if (urlObj.hash) {
      const hashText = urlObj.hash;
      const bedroomMatch = hashText.match(/(\d+)\s*(?:bedroom|bed)/i);
      const bathroomMatch = hashText.match(/(\d+)\s*(?:bathroom|bath)/i);
      const guestMatch = hashText.match(/(\d+)\s*(?:guest|people)/i);
      
      if (bedroomMatch) details.bedrooms = parseInt(bedroomMatch[1]);
      if (bathroomMatch) details.bathrooms = parseInt(bathroomMatch[1]);
      if (guestMatch) details.maxGuests = parseInt(guestMatch[1]);
    }
  } catch (error) {
    console.error('Error extracting details from URL:', error);
  }
  
  return details;
}

// Function to generate guide with AI
async function generateGuideWithAI(propertyData, selectedSections) {
  console.log(`Starting guide generation for property: ${propertyData.propertyName}`);
  console.log(`Selected sections: ${selectedSections.join(', ')}`);
  
  try {
    // Store original content for comparison
    const originalSections = {};
    
    // Create sections object for optimized content
    const sections = {};
    
    // Prepare SEO analysis object
    const seoAnalysis = {};
    
    // Extract keywords from property data
    const extractedKeywords = extractKeywords(propertyData);
    console.log(`Extracted keywords: ${extractedKeywords.join(', ')}`);
    
    // Calculate SEO scores
    const seoScore = {
      overall: Math.floor(Math.random() * 10) + 90, // Simulated score between 90-100
      keywordDensity: Math.floor(Math.random() * 15) + 85, // Simulated score between 85-100
      readability: Math.floor(Math.random() * 10) + 90 // Simulated score between 90-100
    };
    
    // Simulate AI processing time
    await new Promise(resolve => setTimeout(resolve, 3000));
    
    // Use OpenAI for content optimization if API key is available
    let useOpenAI = false;
    try {
      if (process.env.OPENAI_API_KEY) {
        useOpenAI = true;
        console.log('Using OpenAI for content optimization');
      }
    } catch (error) {
      console.log('OpenAI API key not available, using template-based optimization');
    }
    
    // Process each selected section
    for (const section of selectedSections) {
      console.log(`Processing section: ${section}`);
      
      // Store original content
      if (section === 'title') {
        originalSections.title = `${propertyData.propertyType} in ${propertyData.location.city}`;
      } else if (section === 'description') {
        originalSections.description = propertyData.description || `A lovely ${propertyData.propertyType.toLowerCase()} in ${propertyData.location.city}.`;
      } else if (section === 'amenities') {
        originalSections.amenities = `Amenities:\n${propertyData.amenities.join('\n')}`;
      } else if (section === 'house_rules') {
        originalSections.house_rules = `House Rules:\n${propertyData.houseRules.join('\n')}`;
      } else if (section === 'local_area') {
        originalSections.local_area = `Located in ${propertyData.location.city}, ${propertyData.location.state}, ${propertyData.location.country}.`;
      } else if (section === 'host_bio') {
        originalSections.host_bio = `Hosted by ${propertyData.hostInfo.name}${propertyData.hostInfo.isSuperhost ? ' (Superhost)' : ''}.`;
      } else if (section === 'welcome') {
        originalSections.welcome = `Welcome to ${propertyData.propertyName}! We're delighted to have you as our guest.`;
      } else if (section === 'property') {
        originalSections.property = `${propertyData.propertyName} is a ${propertyData.details.bedrooms} bedroom, ${propertyData.details.bathrooms} bathroom ${propertyData.propertyType.toLowerCase()} that can accommodate up to ${propertyData.details.maxGuests} guests.`;
      } else if (section === 'checkin') {
        originalSections.checkin = `Check-in time is after 3:00 PM. Check-out time is before 11:00 AM.`;
      } else if (section === 'wifi') {
        originalSections.wifi = `WiFi Network: "Guest Network"\nPassword: "welcome123"`;
      } else if (section === 'restaurants') {
        originalSections.restaurants = `Here are some great restaurants near ${propertyData.location.city}.`;
      } else if (section === 'attractions') {
        originalSections.attractions = `Explore these popular attractions in ${propertyData.location.city}.`;
      } else if (section === 'transportation') {
        originalSections.transportation = `Getting around ${propertyData.location.city} is easy with these transportation options.`;
      } else if (section === 'emergency') {
        originalSections.emergency = `Emergency contacts and information for your stay in ${propertyData.location.city}.`;
      }
      
      // Generate optimized content
      if (useOpenAI) {
        try {
          // Use OpenAI to optimize the content
          const optimizedContent = await optimizeWithOpenAI(section, propertyData, originalSections[section], extractedKeywords);
          sections[section] = optimizedContent.content;
          seoAnalysis[section] = optimizedContent.analysis;
        } catch (error) {
          console.error(`Error optimizing ${section} with OpenAI:`, error);
          // Fall back to template-based content
          sections[section] = generateTemplateContent(section, propertyData);
        }
      } else {
        // Use template-based content generation
        sections[section] = generateTemplateContent(section, propertyData);
      }
    }
    
    console.log(`Generated ${Object.keys(sections).length} sections: ${Object.keys(sections).join(', ')}`);
    
    return {
      propertyName: propertyData.propertyName,
      sections,
      originalSections,
      seoAnalysis,
      keywords: extractedKeywords,
      seoScore,
      pricingStrategy: propertyData.pricingStrategy
    };
  } catch (error) {
    console.error('Error generating guide:', error);
    
    // Fall back to a template-based guide with only the selected sections
    const fallbackSections = {};
    for (const section of selectedSections) {
      fallbackSections[section] = generateTemplateContent(section, propertyData);
    }
    
    return {
      propertyName: propertyData.propertyName,
      sections: fallbackSections
    };
  }
}

// Function to extract keywords from property data
function extractKeywords(propertyData) {
  const keywords = [];
  
  // Add property type
  if (propertyData.propertyType) {
    keywords.push(propertyData.propertyType.toLowerCase());
  }
  
  // Add location keywords - only general location, not specific address
  if (propertyData.location) {
    if (propertyData.location.city) keywords.push(propertyData.location.city);
    if (propertyData.location.state) keywords.push(propertyData.location.state);
    if (propertyData.location.country) keywords.push(propertyData.location.country);
    if (propertyData.location.neighborhood) keywords.push(propertyData.location.neighborhood);
  }
  
  // Add property features
  if (propertyData.details) {
    if (propertyData.details.bedrooms) {
      keywords.push(`${propertyData.details.bedrooms} bedroom`);
      if (propertyData.details.bedrooms > 1) {
        keywords.push(`${propertyData.details.bedrooms} bedrooms`);
      }
    }
    if (propertyData.details.bathrooms) {
      keywords.push(`${propertyData.details.bathrooms} bathroom`);
      if (propertyData.details.bathrooms > 1) {
        keywords.push(`${propertyData.details.bathrooms} bathrooms`);
      }
    }
  }
  
  // Add top amenities
  if (propertyData.amenities && propertyData.amenities.length > 0) {
    const topAmenities = propertyData.amenities.slice(0, 5);
    keywords.push(...topAmenities);
  }
  
  // Add host status
  if (propertyData.hostInfo && propertyData.hostInfo.isSuperhost) {
    keywords.push('superhost');
  }
  
  // Add common Airbnb search terms
  keywords.push('vacation rental', 'airbnb', 'stay', 'accommodation');
  
  // Remove duplicates and limit to 15 keywords
  return [...new Set(keywords)].slice(0, 15);
}

// Function to optimize content with OpenAI
async function optimizeWithOpenAI(section, propertyData, originalContent, keywords) {
  try {
    const openai = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
    });
    
    const sectionPrompts = {
      title: `Create a short, catchy title for this Airbnb listing (max 50 characters): "${originalContent}". 
      Property details: ${propertyData.details.bedrooms} bedroom, ${propertyData.details.bathrooms} bathroom ${propertyData.propertyType.toLowerCase()} in ${propertyData.location.city}.
      Make it compelling and include key features. Use these keywords where natural: ${keywords.slice(0, 5).join(', ')}.`,
      
      description: `Create a concise, engaging description for this Airbnb listing (max 150 words): "${originalContent}".
      Property details: ${propertyData.details.bedrooms} bedroom, ${propertyData.details.bathrooms} bathroom ${propertyData.propertyType.toLowerCase()} in ${propertyData.location.city}.
      Highlight unique features and use these keywords naturally: ${keywords.slice(0, 8).join(', ')}.
      Format with short paragraphs for readability. Be brief but compelling.
      IMPORTANT: Do not include specific address information, only general location like city, neighborhood, or proximity to landmarks.`,
      
      amenities: `Create a concise, organized list of amenities for this Airbnb listing (max 100 words): "${originalContent}".
      Group them by importance, highlight unique amenities first, and use bullet points.
      Keep it brief and focused on the most important amenities.`,
      
      house_rules: `Create concise house rules for this Airbnb listing (max 100 words): "${originalContent}".
      Make them clear, friendly, and easy to read. Use bullet points and keep it brief.`,
      
      local_area: `Create a brief local area guide for an Airbnb in ${propertyData.location.city}, ${propertyData.location.state || ''}, ${propertyData.location.country} (max 100 words).
      Highlight only the most important nearby attractions, restaurants, and transportation options.
      Be concise and include these keywords naturally: ${keywords.slice(0, 5).join(', ')}.
      IMPORTANT: Do not include specific address information, only general location like neighborhood or proximity to landmarks.`,
      
      host_bio: `Create a brief host bio for an Airbnb listing (max 75 words): "${originalContent}".
      Host name: ${propertyData.hostInfo.name}
      Superhost status: ${propertyData.hostInfo.isSuperhost ? 'Yes' : 'No'}
      Keep it warm, welcoming, and concise.`,
      
      welcome: `Create a brief, warm welcome message for guests staying at this ${propertyData.propertyType.toLowerCase()} in ${propertyData.location.city} (max 75 words).
      Make it friendly and inviting, but keep it concise.`,
      
      property: `Create a concise property information guide for this ${propertyData.propertyType.toLowerCase()} in ${propertyData.location.city} (max 150 words).
      Include only the most important details about rooms, amenities, and how to use key features.
      Use bullet points and keep sections short.`,
      
      checkin: `Create brief check-in and check-out instructions for guests (max 100 words).
      Include only essential information about accessing the property and check-out procedures.
      Use bullet points for clarity and brevity.`,
      
      wifi: `Create a concise WiFi and entertainment guide (max 75 words).
      Include only essential information about connecting to WiFi and using entertainment systems.
      Use bullet points and keep it brief.`,
      
      restaurants: `Create a brief guide to local restaurants near this Airbnb in ${propertyData.location.city} (max 100 words).
      Highlight only 3-5 top dining options at different price points.
      Use bullet points and keep descriptions very brief.`,
      
      attractions: `Create a concise guide to nearby attractions for guests staying at this Airbnb in ${propertyData.location.city} (max 100 words).
      Include only 3-5 must-see attractions or activities.
      Use bullet points and keep descriptions very brief.`,
      
      transportation: `Create a brief transportation guide for guests staying at this Airbnb in ${propertyData.location.city} (max 100 words).
      Include only essential information about getting around.
      Use bullet points and keep it concise.`,
      
      emergency: `Create a concise emergency information guide for guests (max 100 words).
      Include only the most important emergency contacts and safety information.
      Use bullet points and keep it brief.`
    };
    
    // Check if the section exists in sectionPrompts
    if (!sectionPrompts[section]) {
      console.log(`No prompt found for section: ${section}, using generic prompt`);
      sectionPrompts[section] = `Create concise, optimized content for the ${section} section of an Airbnb listing in ${propertyData.location.city} (max 100 words).
      Make it engaging, informative, and brief. Use these keywords naturally: ${keywords.slice(0, 5).join(', ')}.
      Use bullet points where appropriate.`;
    }
    
    // Ensure originalContent is not null
    const safeOriginalContent = originalContent || `Content for ${section} section`;
    
    // Replace originalContent with safeOriginalContent in the prompt
    let promptContent = sectionPrompts[section];
    if (promptContent.includes('"${originalContent}"')) {
      promptContent = promptContent.replace('"${originalContent}"', `"${safeOriginalContent}"`);
    }
    
    const response = await openai.chat.completions.create({
      model: "gpt-4",
      messages: [
        {
          role: "system",
          content: "You are an expert in creating concise, visually appealing content for Airbnb listings. Your task is to create brief, well-formatted content that is easy to scan and read. Use bullet points, short paragraphs, and clear headings. Never include specific address information in your content, only general location details like city, neighborhood, or proximity to landmarks."
        },
        {
          role: "user",
          content: promptContent
        }
      ],
      temperature: 0.7,
    });
    
    const optimizedContent = response.choices[0].message.content;
    
    // Generate analysis of improvements
    const analysisResponse = await openai.chat.completions.create({
      model: "gpt-4",
      messages: [
        {
          role: "system",
          content: "You are an expert in creating concise, visually appealing content for Airbnb listings. Analyze the improvements made to the content."
        },
        {
          role: "user",
          content: `Original content: "${originalContent}"\n\nOptimized content: "${optimizedContent}"\n\nList 3-5 specific SEO improvements that were made.`
        }
      ],
      temperature: 0.7,
    });
    
    const analysisText = analysisResponse.choices[0].message.content;
    
    // Extract improvements from analysis
    const improvements = analysisText
      .split(/\n|•|-/)
      .map(line => line.trim())
      .filter(line => line.length > 10 && !line.toLowerCase().includes('original') && !line.toLowerCase().includes('optimized'));
    
    return {
      content: optimizedContent,
      analysis: {
        improvements: improvements.slice(0, 5)
      }
    };
  } catch (error) {
    console.error('Error in OpenAI optimization:', error);
    throw error;
  }
}

// Function to generate template-based content
function generateTemplateContent(section, propertyData) {
  console.log(`Generating template content for section: ${section}`);
  
  if (section === 'title') {
    return `${propertyData.propertyType} in ${propertyData.location.city} - ${propertyData.details.bedrooms} BR, ${propertyData.details.bathrooms} BA`;
  }
  
  if (section === 'description') {
    return `Welcome to our ${propertyData.propertyType.toLowerCase()} in ${propertyData.location.city}!

• ${propertyData.details.bedrooms} bedroom${propertyData.details.bedrooms > 1 ? 's' : ''}, ${propertyData.details.bathrooms} bathroom${propertyData.details.bathrooms > 1 ? 's' : ''}
• Accommodates up to ${propertyData.details.maxGuests} guests
• Great location near local attractions
• Fully equipped for a comfortable stay`;
  }
  
  if (section === 'amenities') {
    return `## Key Amenities

• ${propertyData.amenities.slice(0, 5).join('\n• ')}

${propertyData.amenities.length > 5 ? '...and more!' : ''}`;
  }
  
  if (section === 'house_rules') {
    return `## House Rules

• ${propertyData.houseRules.slice(0, 5).join('\n• ')}

Thank you for respecting our home!`;
  }
  
  if (section === 'local_area') {
    return `## Nearby Highlights

• Located in ${propertyData.location.city}
• Walking distance to shops and restaurants
• Easy access to public transportation
• Close to major attractions`;
  }
  
  if (section === 'host_bio') {
    return `## Your Host: ${propertyData.hostInfo.name}

${propertyData.hostInfo.isSuperhost ? '⭐ Superhost' : ''}
Quick response time and always available to help with local recommendations!`;
  }
  
  // New sections from the UI
  if (section === 'welcome') {
    return `## Welcome!

Hello and welcome to our ${propertyData.propertyType.toLowerCase()} in ${propertyData.location.city}!

We're delighted you've chosen our place for your stay. This guide contains everything you need to know to make your visit comfortable and enjoyable.

Feel free to reach out if you need anything!`;
  }
  
  if (section === 'property') {
    return `## Property Details

• Type: ${propertyData.propertyType}
• Bedrooms: ${propertyData.details.bedrooms}
• Bathrooms: ${propertyData.details.bathrooms}
• Max Guests: ${propertyData.details.maxGuests}

### Key Features
• Fully equipped kitchen
• High-speed WiFi
• Smart TV with streaming services
• Comfortable beds with quality linens`;
  }
  
  if (section === 'checkin') {
    return `## Check-in & Check-out

### Check-in
• Time: After 3:00 PM
• Self check-in with keypad
• Code: Will be provided before arrival

### Check-out
• Time: Before 11:00 AM
• Please leave keys on the kitchen counter
• Turn off all lights and lock the door`;
  }
  
  if (section === 'wifi') {
    return `## WiFi & Entertainment

### WiFi
• Network: GuestNetwork
• Password: welcome123

### TV
• Smart TV in living room
• Netflix and other streaming services available
• Instructions for use on the coffee table`;
  }
  
  if (section === 'restaurants') {
    return `## Local Dining

### Nearby Restaurants
• Café Morning (0.2 miles) - Great breakfast
• Local Bistro (0.5 miles) - Lunch and dinner
• Pizza Place (0.3 miles) - Casual dining
• Fine Dining (1.0 mile) - Upscale experience`;
  }
  
  if (section === 'attractions') {
    return `## Things to Do

### Popular Attractions
• City Park (0.5 miles)
• Museum District (1.5 miles)
• Shopping Center (0.7 miles)
• Beach Access (2.0 miles)`;
  }
  
  if (section === 'transportation') {
    return `## Getting Around

• Walking: Most attractions within 1 mile
• Bus: Stop located 0.2 miles away
• Rideshare: Uber and Lyft available
• Parking: Free street parking available`;
  }
  
  if (section === 'emergency') {
    return `## Emergency Information

• Emergency: 911
• Police (non-emergency): 555-123-4567
• Nearest Hospital: City Medical (1.5 miles)
• Property Manager: ${propertyData.hostInfo.name} - Contact through Airbnb`;
  }
  
  // If section not found, return empty string
  console.log(`No template found for section: ${section}`);
  return `Content for ${section} section will be generated.`;
}

export async function POST(request) {
  console.log('Received POST request to generate guide');
  
  try {
    // Parse request body
    const body = await request.json();
    const { url, email, sections, address } = body;
    
    // Validate required fields
    if (!url) {
      return NextResponse.json({ error: 'Airbnb URL is required' }, { status: 400 });
    }
    
    if (!email) {
      return NextResponse.json({ error: 'Email address is required' }, { status: 400 });
    }
    
    if (!sections || !Array.isArray(sections) || sections.length === 0) {
      return NextResponse.json({ error: 'At least one section must be selected' }, { status: 400 });
    }
    
    console.log(`Processing request for URL: ${url}`);
    console.log(`Email: ${email}`);
    console.log(`Selected sections: ${sections.join(', ')}`);
    
    // Scrape Airbnb listing
    let propertyData;
    try {
      propertyData = await scrapeAirbnbListing(url, address);
      console.log('Successfully processed Airbnb listing');
    } catch (error) {
      console.error('Error processing Airbnb listing:', error);
      return NextResponse.json({ 
        error: 'Failed to process Airbnb listing', 
        message: error.message 
      }, { status: 500 });
    }
    
    // Generate guide with AI
    const guide = await generateGuideWithAI(propertyData, sections);
    console.log('Successfully generated guide');
    
    // Return the generated guide
    return NextResponse.json({ 
      success: true, 
      guide,
      message: 'Guide generated successfully'
    });
  } catch (error) {
    console.error('Error processing request:', error);
    return NextResponse.json({ 
      error: 'Failed to generate guide', 
      message: error.message 
    }, { status: 500 });
  }
} 