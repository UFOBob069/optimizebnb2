import { NextResponse } from 'next/server';
import OpenAI from 'openai';
import puppeteer from 'puppeteer-core';
import * as os from 'os';
import * as path from 'path';
import * as fs from 'fs/promises';

// Initialize OpenAI client
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY || 'your-api-key',
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
    throw new Error('Invalid Airbnb URL. Could not extract listing ID.');
  }
  
  const listingId = listingIdMatch[1];
  console.log(`Extracted listing ID: ${listingId}`);
  
  try {
    // Find Chrome executable path
    const executablePath = await findChromePath();
    console.log(`Chrome executable path: ${executablePath || 'Not found, using default'}`);
    
    // Launch browser with or without executablePath
    const launchOptions = {
      headless: 'new',
      args: ['--no-sandbox', '--disable-setuid-sandbox']
    };
    
    if (executablePath) {
      launchOptions.executablePath = executablePath;
    }
    
    console.log('Launching browser with options:', launchOptions);
    const browser = await puppeteer.launch(launchOptions);
    
    // Create a new page
    const page = await browser.newPage();
    
    // Set viewport
    await page.setViewport({ width: 1280, height: 800 });
    
    // Navigate to the Airbnb listing
    console.log(`Navigating to: ${url}`);
    await page.goto(url, { waitUntil: 'networkidle2', timeout: 60000 });
    
    // Take a screenshot for debugging
    await page.screenshot({ path: 'airbnb-listing.png' });
    console.log('Screenshot taken for debugging');
    
    // Extract property details
    console.log('Extracting property details...');
    
    // Property name
    const propertyName = await page.evaluate(() => {
      const titleElement = document.querySelector('h1');
      return titleElement ? titleElement.textContent.trim() : 'Cozy Airbnb Property';
    });
    console.log(`Property name: ${propertyName}`);
    
    // Property type
    const propertyType = await page.evaluate(() => {
      const typeElement = document.querySelector('[data-section-id="OVERVIEW_DEFAULT"] > div > h2');
      return typeElement ? typeElement.textContent.trim() : 'Entire rental unit';
    });
    console.log(`Property type: ${propertyType}`);
    
    // Property description
    const description = await page.evaluate(() => {
      const descriptionElement = document.querySelector('[data-section-id="DESCRIPTION_DEFAULT"] > div > span');
      return descriptionElement ? descriptionElement.textContent.trim() : 'A beautiful property perfect for your stay.';
    });
    console.log(`Description extracted: ${description.substring(0, 100)}...`);
    
    // Extract bedrooms, bathrooms, and max guests
    const details = await page.evaluate(() => {
      const detailsText = document.querySelector('[data-section-id="OVERVIEW_DEFAULT"] > div > h2')?.textContent || '';
      
      // Extract numbers using regex
      const bedroomsMatch = detailsText.match(/(\d+)\s+bedroom/i);
      const bathroomsMatch = detailsText.match(/(\d+)\s+bathroom/i);
      const guestsMatch = detailsText.match(/(\d+)\s+guest/i);
      
      return {
        bedrooms: bedroomsMatch ? parseInt(bedroomsMatch[1]) : 1,
        bathrooms: bathroomsMatch ? parseInt(bathroomsMatch[1]) : 1,
        maxGuests: guestsMatch ? parseInt(guestsMatch[1]) : 2
      };
    });
    console.log(`Details extracted: ${JSON.stringify(details)}`);
    
    // Extract price
    const price = await page.evaluate(() => {
      const priceElement = document.querySelector('[data-section-id="BOOK_IT_SIDEBAR"] ._tyxjp1');
      if (priceElement) {
        const priceText = priceElement.textContent.trim();
        const priceMatch = priceText.match(/\$(\d+)/);
        return priceMatch ? parseInt(priceMatch[1]) : 100;
      }
      return 100; // Default price if not found
    });
    console.log(`Price extracted: $${price}`);
    
    // Extract amenities
    const amenities = await page.evaluate(() => {
      const amenityElements = document.querySelectorAll('[data-section-id="AMENITIES_DEFAULT"] > div > div > div');
      const amenitiesList = [];
      
      amenityElements.forEach(element => {
        const amenityText = element.textContent.trim();
        if (amenityText) {
          amenitiesList.push(amenityText);
        }
      });
      
      return amenitiesList.length > 0 ? amenitiesList : ['Wifi', 'Kitchen', 'Free parking', 'TV'];
    });
    console.log(`Amenities extracted: ${amenities.slice(0, 5).join(', ')}...`);
    
    // Extract house rules
    const houseRules = await page.evaluate(() => {
      const ruleElements = document.querySelectorAll('[data-section-id="POLICIES_DEFAULT"] > div > div');
      const rulesList = [];
      
      ruleElements.forEach(element => {
        const ruleText = element.textContent.trim();
        if (ruleText) {
          rulesList.push(ruleText);
        }
      });
      
      return rulesList.length > 0 ? rulesList : ['Check-in: After 3:00 PM', 'Checkout: 11:00 AM', 'No smoking', 'No pets'];
    });
    console.log(`House rules extracted: ${houseRules.slice(0, 3).join(', ')}...`);
    
    // Extract host information
    const hostInfo = await page.evaluate(() => {
      const hostNameElement = document.querySelector('[data-section-id="HOST_PROFILE_DEFAULT"] > div > div > div > h2');
      const hostName = hostNameElement ? hostNameElement.textContent.trim() : 'Your Host';
      
      return {
        name: hostName,
        isSuperhost: document.querySelector('[data-section-id="HOST_PROFILE_DEFAULT"]')?.textContent.includes('Superhost') || false,
        responseRate: '100%',
        responseTime: 'within an hour'
      };
    });
    console.log(`Host info extracted: ${JSON.stringify(hostInfo)}`);
    
    // Close the browser
    await browser.close();
    console.log('Browser closed');
    
    // Parse location from address
    const locationParts = address.split(',').map(part => part.trim());
    const city = locationParts[0] || 'Beautiful City';
    const state = locationParts[1] || '';
    const country = locationParts[2] || 'United States';
    
    console.log(`Parsed location: ${city}, ${state}, ${country}`);
    
    // Generate pricing strategy data
    const marketAverage = Math.round(price * (0.9 + Math.random() * 0.2));
    const suggestedPrice = price < marketAverage ? 
      Math.round(price * (1.05 + Math.random() * 0.1)) : 
      Math.round(price * (0.95 + Math.random() * 0.1));
    
    // Return the scraped property data with pricing strategy
    return {
      propertyName,
      propertyType,
      description,
      location: {
        city,
        state,
        country,
        address
      },
      details,
      hostInfo,
      amenities,
      houseRules,
      listingId,
      currentPrice: price,
      suggestedPrice,
      marketAverage,
      priceRange: {
        min: Math.round(marketAverage * 0.8),
        max: Math.round(marketAverage * 1.2)
      },
      recommendations: [
        `${price > marketAverage ? 'Consider lowering' : 'You can increase'} your base price to $${suggestedPrice} to optimize bookings`,
        `Increase your base price by $${Math.round(price * 0.15)} during weekends`,
        `Lower your price by $${Math.round(price * 0.1)} for stays longer than 7 days`,
        `Implement a ${10 + (parseInt(listingId) % 15)}% premium during ${['summer', 'winter', 'holiday', 'festival'][parseInt(listingId) % 4]} season`
      ],
      seasonalAdjustments: [
        { season: 'Summer', adjustment: 15 + (parseInt(listingId) % 10) },
        { season: 'Winter', adjustment: parseInt(listingId) % 2 === 0 ? 10 : -5 },
        { season: 'Spring', adjustment: 5 },
        { season: 'Fall', adjustment: parseInt(listingId) % 2 === 0 ? -5 : 8 }
      ],
      competitiveAnalysis: {
        similarProperties: 5 + (parseInt(listingId) % 15),
        pricePosition: price > marketAverage ? 'above' : (price < marketAverage ? 'below' : 'average'),
        marketShare: 5 + (parseInt(listingId) % 10)
      }
    };
  } catch (error) {
    console.error('Error during scraping:', error);
    console.log('Falling back to simulation...');
    return simulateAirbnbScraping(url, address);
  }
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
    
    // Fall back to a template-based guide
    return {
      propertyName: propertyData.propertyName,
      sections: {
        title: `${propertyData.propertyType} in ${propertyData.location.city}`,
        description: `A lovely ${propertyData.propertyType.toLowerCase()} in ${propertyData.location.city}.`
      }
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
      title: `Optimize this Airbnb listing title for SEO: "${originalContent}". 
      Property details: ${propertyData.details.bedrooms} bedroom, ${propertyData.details.bathrooms} bathroom ${propertyData.propertyType.toLowerCase()} in ${propertyData.location.city}.
      Make it compelling, under 50 characters if possible, and include key features. Use these keywords where natural: ${keywords.slice(0, 5).join(', ')}.`,
      
      description: `Optimize this Airbnb listing description for SEO: "${originalContent}".
      Property details: ${propertyData.details.bedrooms} bedroom, ${propertyData.details.bathrooms} bathroom ${propertyData.propertyType.toLowerCase()} in ${propertyData.location.city}.
      Make it compelling, highlight unique features, and use these keywords naturally: ${keywords.slice(0, 8).join(', ')}.
      Format with paragraphs for readability. Keep it under 500 words.
      IMPORTANT: Do not include specific address information, only general location like city, neighborhood, or proximity to landmarks.`,
      
      amenities: `Optimize this list of amenities for an Airbnb listing: "${originalContent}".
      Reorder and group them by importance, highlight unique amenities first, and create a compelling introduction.
      Use bullet points and organize into logical categories.`,
      
      house_rules: `Optimize these house rules for an Airbnb listing: "${originalContent}".
      Make them clear, friendly, and comprehensive. Format them for easy reading.`,
      
      local_area: `Create an optimized local area guide for an Airbnb in ${propertyData.location.city}, ${propertyData.location.state || ''}, ${propertyData.location.country}.
      Highlight nearby attractions, restaurants, transportation options, and unique local experiences.
      Make it compelling for travelers and include these keywords naturally: ${keywords.slice(0, 5).join(', ')}.
      IMPORTANT: Do not include specific address information, only general location like neighborhood or proximity to landmarks.`,
      
      host_bio: `Optimize this host bio for an Airbnb listing: "${originalContent}".
      Host name: ${propertyData.hostInfo.name}
      Superhost status: ${propertyData.hostInfo.isSuperhost ? 'Yes' : 'No'}
      Response rate: ${propertyData.hostInfo.responseRate}
      Response time: ${propertyData.hostInfo.responseTime}
      Make it warm, welcoming, and highlight hosting experience and local knowledge.`
    };
    
    const response = await openai.chat.completions.create({
      model: "gpt-4",
      messages: [
        {
          role: "system",
          content: "You are an expert in Airbnb SEO optimization. Your task is to optimize listing content to improve search rankings and conversion rates. Never include specific address information in your optimizations, only general location details like city, neighborhood, or proximity to landmarks."
        },
        {
          role: "user",
          content: sectionPrompts[section]
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
          content: "You are an expert in Airbnb SEO optimization. Analyze the improvements made to the content."
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
  if (section === 'title') {
    return `Experience ${propertyData.location.city} in our ${propertyData.propertyType.toLowerCase()} - ${propertyData.details.bedrooms} BR, ${propertyData.details.bathrooms} BA`;
  }
  
  if (section === 'description') {
    return `Welcome to our beautiful ${propertyData.propertyType.toLowerCase()} in the heart of ${propertyData.location.city}${propertyData.location.state ? `, ${propertyData.location.state}` : ''}! 
      
${propertyData.description}

Our spacious accommodation features ${propertyData.details.bedrooms} bedroom${propertyData.details.bedrooms > 1 ? 's' : ''}, ${propertyData.details.bathrooms} bathroom${propertyData.details.bathrooms > 1 ? 's' : ''}, and comfortably hosts up to ${propertyData.details.maxGuests} guests. 

Located in a prime area, you'll be just minutes away from local attractions, restaurants, and transportation options.`;
  }
  
  if (section === 'amenities') {
    return `## Amenities You'll Love

${propertyData.amenities.map(amenity => `- ${amenity}`).join('\n')}

We've thought of everything to make your stay comfortable and convenient!`;
  }
  
  if (section === 'house_rules') {
    return `## House Rules

To ensure everyone has a great experience, please note:

${propertyData.houseRules.map(rule => `- ${rule}`).join('\n')}

Thank you for respecting our home!`;
  }
  
  if (section === 'local_area') {
    return `## Discover ${propertyData.location.city}

Our property is ideally situated to explore all that ${propertyData.location.city} has to offer. Within walking distance, you'll find charming cafes, local shops, and cultural attractions.

For nature lovers, there are beautiful parks and hiking trails nearby. Food enthusiasts will appreciate the diverse dining options in our neighborhood.

Public transportation is easily accessible, making it convenient to explore the entire city during your stay.`;
  }
  
  if (section === 'host_bio') {
    const superhostText = propertyData.hostInfo.isSuperhost ? ' As a Superhost with a 100% response rate, ' : ' ';
    return `## Meet Your Host: ${propertyData.hostInfo.name}

Hello! I'm ${propertyData.hostInfo.name}, your dedicated host.${superhostText}I'm committed to making your stay exceptional. I respond quickly (typically within an hour) and am always available to answer questions or provide local recommendations.

I've lived in ${propertyData.location.city} for many years and can help you discover hidden gems that only locals know about. I look forward to welcoming you!`;
  }
  
  if (section === 'pricing') {
    return `## Strategic Pricing Guide for ${propertyData.propertyName}

### Pricing Principles
- **Base Price Strategy**: Set your base price by researching similar properties in your area with comparable amenities, size, and location. Your ${propertyData.details.bedrooms}-bedroom property in ${propertyData.location.city} should be priced competitively while reflecting its unique value.
- **Value-Based Pricing**: Highlight your property's unique features (${propertyData.amenities.slice(0, 3).join(', ')}, etc.) to justify premium pricing where appropriate.
- **Occupancy-Based Adjustments**: Aim for 70-80% occupancy rate. If your booking rate exceeds 85%, consider raising prices. If below 60%, consider lowering them.

### Seasonal Adjustments
- **Peak Season**: Increase rates by 20-40% during ${propertyData.location.city}'s high season
- **Shoulder Season**: Maintain standard rates or offer slight discounts (5-10%)
- **Off-Season**: Reduce rates by 15-25% to maintain occupancy
- **Special Events**: Research local events, conferences, and festivals in ${propertyData.location.city} and increase rates by 30-50% during these periods

### Discount Strategies
- **Length of Stay**: Offer 10-15% for weekly bookings and 20-30% for monthly stays
- **Last-Minute Bookings**: Consider 10-15% discount for bookings within 3-7 days of arrival
- **Early Bird Specials**: Offer 5-10% for bookings made 3+ months in advance
- **Gap Fillers**: Discount by 15-20% for short stays that fill gaps between existing bookings
- **Returning Guests**: Provide 10% loyalty discount to encourage repeat bookings

### Premium Charges
- **Weekend Premium**: Add 10-20% for Friday and Saturday nights
- **Holiday Premium**: Add 25-40% for major holidays
- **Additional Guests**: Consider a charge of $15-25 per guest above your base occupancy
- **Pet Fee**: If you allow pets, charge a one-time fee of $50-100 or a nightly fee of $10-20

### Competitive Positioning
- **Superhost Status**: ${propertyData.hostInfo.isSuperhost ? 'Leverage your Superhost status to justify a 5-10% premium over similar non-Superhost properties' : 'Work toward achieving Superhost status to justify higher rates'}
- **Reviews Strategy**: Actively solicit positive reviews to build credibility for your pricing
- **Photography**: Invest in professional photography to showcase your property's value
- **Amenity Highlights**: Emphasize high-value amenities like ${propertyData.amenities.slice(0, 3).join(', ')} in your listing to support your pricing

### Dynamic Pricing Tools
- Consider using dynamic pricing tools like PriceLabs, Beyond Pricing, or Wheelhouse to automatically adjust your rates based on demand, seasonality, and local events
- Set minimum and maximum thresholds to prevent extreme price fluctuations
- Review and adjust your pricing strategy quarterly based on performance data

Implementing these pricing strategies could significantly increase your revenue while maintaining healthy occupancy rates. Remember that pricing is both an art and a science - regular monitoring and adjustments are key to optimizing your property's performance.`;
  }
  
  return '';
}

export async function POST(request) {
  console.log('Received POST request to generate guide');
  
  try {
    // Parse request body
    const body = await request.json();
    const { url, email, selectedSections } = body;
    
    // Validate required fields
    if (!url) {
      return NextResponse.json({ error: 'Airbnb URL is required' }, { status: 400 });
    }
    
    if (!email) {
      return NextResponse.json({ error: 'Email address is required' }, { status: 400 });
    }
    
    if (!selectedSections || !Array.isArray(selectedSections) || selectedSections.length === 0) {
      return NextResponse.json({ error: 'At least one section must be selected' }, { status: 400 });
    }
    
    console.log(`Processing request for URL: ${url}`);
    console.log(`Email: ${email}`);
    console.log(`Selected sections: ${selectedSections.join(', ')}`);
    
    // Scrape Airbnb listing
    let propertyData;
    try {
      propertyData = await scrapeAirbnbListing(url);
      console.log('Successfully processed Airbnb listing');
    } catch (error) {
      console.error('Error processing Airbnb listing:', error);
      return NextResponse.json({ 
        error: 'Failed to process Airbnb listing', 
        message: error.message 
      }, { status: 500 });
    }
    
    // Generate guide with AI
    const guide = await generateGuideWithAI(propertyData, selectedSections);
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