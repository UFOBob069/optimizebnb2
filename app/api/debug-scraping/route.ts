import { NextResponse } from 'next/server';
import puppeteer from 'puppeteer-core';

// Debug endpoint for testing Airbnb scraping
export async function GET(request: Request) {
  // Get URL parameters
  const { searchParams } = new URL(request.url);
  const url = searchParams.get('url') || 'https://www.airbnb.com/rooms/12345678';
  const address = searchParams.get('address') || '123 Main St, New York, NY';
  
  try {
    // Run the actual scraping
    const result = await scrapeAirbnbListing(url, address);
    
    // Return the results
    return NextResponse.json({
      success: true,
      message: "Scraping completed successfully",
      data: result
    });
  } catch (error) {
    console.error('Scraping error:', error);
    
    // Fall back to simulation if scraping fails
    try {
      console.log('Falling back to simulation...');
      const simulatedData = await simulateAirbnbScraping(url, address);
      
      return NextResponse.json({
        success: true,
        message: "Scraping failed, using simulated data instead",
        data: simulatedData,
        warning: "This is simulated data, not actual scraped data"
      });
    } catch (fallbackError) {
      return NextResponse.json(
        { 
          success: false, 
          error: 'Failed to run scraping and simulation fallback',
          message: error instanceof Error ? error.message : 'Unknown error'
        },
        { status: 500 }
      );
    }
  }
}

// Actual scraping of an Airbnb listing
async function scrapeAirbnbListing(url: string, address: string) {
  console.log(`=== DEBUG ACTUAL SCRAPING START ===`);
  console.log(`URL: ${url}`);
  console.log(`Address: ${address}`);
  
  // Parse the address (for location context)
  const addressParts = address.split(',').map(part => part.trim());
  const city = addressParts.length > 1 ? addressParts[1] : 'Unknown City';
  const state = addressParts.length > 2 ? addressParts[2].split(' ')[0] : 'Unknown State';
  
  // Extract the listing ID from the URL
  const listingIdMatch = url.match(/\/rooms\/(\d+)/);
  const listingId = listingIdMatch ? listingIdMatch[1] : 'unknown';
  console.log(`Extracted listing ID: ${listingId}`);
  
  // Find Chrome executable path based on common locations
  let executablePath;
  if (process.platform === 'win32') {
    // Windows paths
    const possiblePaths = [
      'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
      'C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe',
      'C:\\Program Files\\Microsoft\\Edge\\Application\\msedge.exe',
      'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe'
    ];
    
    for (const path of possiblePaths) {
      try {
        const fs = require('fs');
        if (fs.existsSync(path)) {
          executablePath = path;
          console.log(`Found browser at: ${executablePath}`);
          break;
        }
      } catch (e) {
        // Ignore errors checking file existence
      }
    }
  } else if (process.platform === 'darwin') {
    // macOS paths
    executablePath = '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';
  } else {
    // Linux paths
    executablePath = '/usr/bin/google-chrome';
  }
  
  if (!executablePath) {
    console.log('Could not find Chrome/Edge executable, using fallback');
    executablePath = process.env.CHROME_BIN || undefined;
  }
  
  // Launch a headless browser
  console.log(`Launching browser with executable path: ${executablePath || 'default'}`);
  const browser = await puppeteer.launch({
    headless: 'new',
    executablePath,
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });
  
  try {
    const page = await browser.newPage();
    console.log('Browser page created');
    
    // Set a user agent to appear more like a regular browser
    await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36');
    
    // Navigate to the Airbnb listing
    console.log(`Navigating to URL: ${url}`);
    await page.goto(url, { waitUntil: 'networkidle2', timeout: 60000 });
    console.log('Page loaded successfully');
    
    // Take a screenshot for debugging (optional)
    await page.screenshot({ path: 'airbnb-debug.png' });
    console.log('Screenshot saved for debugging');
    
    // Extract property name (title)
    const propertyName = await page.evaluate(() => {
      const titleElement = document.querySelector('h1');
      return titleElement ? titleElement.textContent?.trim() : 'Airbnb Property';
    });
    console.log(`Extracted property name: ${propertyName}`);
    
    // Extract property type
    const propertyType = await page.evaluate(() => {
      // Look for property type in the listing
      const typeElement = document.querySelector('[data-section-id="OVERVIEW_DEFAULT"] > div > div > div > div > div > div > div > div > div > span');
      if (typeElement) {
        const text = typeElement.textContent?.trim() || '';
        // Extract property type from text like "Entire villa hosted by John"
        const match = text.match(/^([^]+?)\s+hosted/);
        return match ? match[1] : 'Home';
      }
      return 'Home';
    });
    console.log(`Extracted property type: ${propertyType}`);
    
    // Extract description
    const description = await page.evaluate(() => {
      // Try to find the description section using the data-section-id attribute
      const descriptionSection = document.querySelector('[data-section-id="DESCRIPTION_DEFAULT"]');
      if (descriptionSection) {
        // Get all text content from the description section
        const fullText = descriptionSection.textContent || '';
        // Clean up the text (remove excessive whitespace)
        return fullText.replace(/\s+/g, ' ').trim();
      }
      
      // Fallback: try other common selectors
      const alternateDescriptionElement = document.querySelector('div[style*="line-height: 1.5rem"]');
      if (alternateDescriptionElement) {
        return alternateDescriptionElement.textContent?.trim() || 'No description available';
      }
      
      return 'No description available';
    });
    console.log(`Extracted description: ${description?.substring(0, 100)}...`);
    
    // Extract details (bedrooms, bathrooms, etc.)
    const details = await page.evaluate(() => {
      // Try to find the details section
      const detailsText = document.querySelector('[data-section-id="OVERVIEW_DEFAULT"] > div > div > div > div > div > div > div > div > div:nth-child(1) > span')?.textContent || '';
      console.log('Details text:', detailsText);
      
      // Parse bedrooms and bathrooms from text like "2 bedrooms · 2 bathrooms"
      const bedroomsMatch = detailsText.match(/(\d+)\s+bedroom/);
      const bathroomsMatch = detailsText.match(/(\d+)\s+bathroom/);
      const guestsMatch = detailsText.match(/(\d+)\s+guest/);
      
      return {
        bedrooms: bedroomsMatch ? parseInt(bedroomsMatch[1]) : 1,
        bathrooms: bathroomsMatch ? parseInt(bathroomsMatch[1]) : 1,
        maxGuests: guestsMatch ? parseInt(guestsMatch[1]) : 2
      };
    });
    
    console.log(`Extracted details: ${details.bedrooms} bedrooms, ${details.bathrooms} bathrooms, ${details.maxGuests} max guests`);
    
    // Extract HTML for debugging
    const pageHtml = await page.content();
    console.log(`Page HTML length: ${pageHtml.length} characters`);
    
    // Close the browser
    await browser.close();
    console.log('Browser closed');
    
    // Return the scraped data
    return {
      listingId,
      propertyName,
      propertyType,
      description: description?.substring(0, 500) + (description && description.length > 500 ? '...' : ''),
      location: { city, state, address },
      details,
      scrapingMethod: "actual"
    };
  } catch (error) {
    console.error('Error during scraping:', error);
    // Close the browser in case of error
    await browser.close();
    // Re-throw the error to be handled by the caller
    throw error;
  }
}

// Simulate scraping (fallback)
async function simulateAirbnbScraping(url: string, address: string) {
  console.log(`=== DEBUG SIMULATION START (FALLBACK) ===`);
  console.log(`URL: ${url}`);
  console.log(`Address: ${address}`);
  
  // Parse the address (for location context)
  const addressParts = address.split(',').map(part => part.trim());
  const city = addressParts.length > 1 ? addressParts[1] : 'Unknown City';
  const state = addressParts.length > 2 ? addressParts[2].split(' ')[0] : 'Unknown State';
  
  // Extract the listing ID from the URL
  const listingIdMatch = url.match(/\/rooms\/(\d+)/);
  const listingId = listingIdMatch ? listingIdMatch[1] : 'unknown';
  console.log(`Extracted listing ID: ${listingId}`);
  
  // Generate details based on listing ID
  const bedrooms = 1 + (parseInt(listingId.slice(-10, -9)) % 4);
  const bathrooms = 1 + (parseInt(listingId.slice(-11, -10)) % 3);
  const maxGuests = bedrooms * 2 + (parseInt(listingId.slice(-12, -11)) % 3);
  
  console.log(`Generated property details: ${bedrooms} bedrooms, ${bathrooms} bathrooms, ${maxGuests} max guests`);
  
  return {
    listingId,
    propertyName: "Simulated Property",
    propertyType: "Simulated Home",
    location: { city, state, address },
    details: { bedrooms, bathrooms, maxGuests },
    scrapingMethod: "simulated"
  };
} 