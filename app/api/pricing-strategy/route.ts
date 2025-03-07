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

// Function to scrape Airbnb listing for pricing data
async function scrapeAirbnbListing(url: string, address: string) {
  console.log(`Starting to scrape Airbnb listing: ${url}`);
  
  // Extract listing ID from URL
  const listingIdMatch = url.match(/\/rooms\/(\d+)/);
  if (!listingIdMatch) {
    console.log('Invalid Airbnb URL. Could not extract listing ID.');
    throw new Error('Invalid Airbnb URL. Please provide a valid Airbnb listing URL.');
  }
  
  const listingId = listingIdMatch[1];
  console.log(`Extracted listing ID: ${listingId}`);
  
  let browser = null;
  
  try {
    // Find Chrome executable path
    const executablePath = await findChromePath();
    console.log(`Chrome executable path: ${executablePath || 'Not found, using default'}`);
    
    // Launch browser with or without executablePath
    const launchOptions: any = {
      headless: 'new' as 'new',
      args: ['--no-sandbox', '--disable-setuid-sandbox']
    };
    
    if (executablePath) {
      launchOptions.executablePath = executablePath;
    }
    
    browser = await puppeteer.launch(launchOptions);
    const page = await browser.newPage();
    
    // Set viewport and user agent
    await page.setViewport({ width: 1280, height: 800 });
    await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36');
    
    console.log(`Navigating to Airbnb listing: ${url}`);
    await page.goto(url, { waitUntil: 'networkidle2', timeout: 60000 });
    console.log('Page loaded successfully');
    
    // Take a screenshot of the listing (for future use)
    const screenshotPath = `${os.tmpdir()}/listing-${Date.now()}.png`;
    await page.screenshot({ path: screenshotPath, fullPage: false });
    console.log(`Screenshot saved to ${screenshotPath}`);
    
    // Extract property name
    let propertyName = await page.evaluate(() => {
      const titleElement = document.querySelector('h1');
      return titleElement ? titleElement.textContent?.trim() : 'Airbnb Property';
    });
    console.log(`Property name: ${propertyName}`);
    
    // Extract property type
    let propertyType = await page.evaluate(() => {
      const typeElement = document.querySelector('[data-section-id="OVERVIEW_DEFAULT"] div > h2');
      if (typeElement) {
        return typeElement.textContent?.trim().split(' in ')[0] || 'Apartment';
      }
      return 'Apartment';
    });
    console.log(`Property type: ${propertyType}`);
    
    // Enhanced price extraction with multiple selectors
    let price = await page.evaluate(() => {
      // Try multiple selectors for price
      const priceSelectors = [
        'span[data-testid="book-it-price"]',
        '[data-testid="price-element"]',
        '.f1xx50dm',  // Common Airbnb price class
        '.f1qvlr5j',  // Another common price class
        '.f1d8d1lm',  // Another price class
        '.f1h5rkrd',  // Another price class
        '.f1vl5odk',  // Another price class
        'span._tyxjp1'  // Legacy price class
      ];
      
      for (const selector of priceSelectors) {
        const elements = document.querySelectorAll(selector);
        for (const element of elements) {
          const text = element.textContent?.trim() || '';
          // Look for price patterns like $123, $1,234, etc.
          const priceMatch = text.match(/\$(\d{1,3}(,\d{3})*)/);
          if (priceMatch) {
            // Remove commas and convert to number
            return parseInt(priceMatch[1].replace(/,/g, ''));
          }
        }
      }
      
      // If no price found with selectors, try a broader approach
      const allElements = document.querySelectorAll('*');
      for (const element of allElements) {
        const text = element.textContent?.trim() || '';
        if (text.includes('$') && text.includes('night')) {
          const priceMatch = text.match(/\$(\d{1,3}(,\d{3})*)/);
          if (priceMatch) {
            return parseInt(priceMatch[1].replace(/,/g, ''));
          }
        }
      }
      
      // Default price if nothing found
      return 150;
    });
    console.log(`Extracted price: $${price}`);
    
    // Extract location
    let location = await page.evaluate(() => {
      const locationElement = document.querySelector('[data-section-id="LOCATION_DEFAULT"] div > h2');
      if (locationElement) {
        return locationElement.textContent?.trim().split('Located in ')[1] || '';
      }
      return '';
    });
    
    if (!location) {
      location = address || 'Unknown location';
    }
    console.log(`Location: ${location}`);
    
    // Close the browser
    await browser.close();
    
    // Return the property data
    return {
      propertyName,
      propertyType,
      location,
      price,
      listingId
    };
  } catch (error) {
    console.error('Error during scraping:', error);
    if (browser) {
      await browser.close();
    }
    throw error;
  }
}

// Function to analyze screenshot for price using OpenAI Vision
async function analyzeScreenshotForPrice(screenshotPath: string): Promise<number> {
  try {
    // Check if OpenAI API key is available
    if (!process.env.OPENAI_API_KEY || process.env.OPENAI_API_KEY === 'your-api-key') {
      console.log('OpenAI API key not available, skipping vision analysis');
      return 0;
    }
    
    console.log('Vision model not available, using enhanced scraping techniques instead');
    return 0; // Return 0 to fall back to traditional scraping
    
    /* Commented out due to model availability issues
    console.log('Analyzing screenshot with OpenAI Vision to detect price');
    
    // Read the image file
    const imageBuffer = await fs.readFile(screenshotPath);
    const base64Image = imageBuffer.toString('base64');
    
    // Call OpenAI Vision API
    const response = await openai.chat.completions.create({
      model: "gpt-4-vision-preview",
      messages: [
        {
          role: "system",
          content: "You are an expert at analyzing Airbnb listings. Your task is to identify the nightly price from an Airbnb listing screenshot."
        },
        {
          role: "user",
          content: [
            {
              type: "text",
              text: "Look at this Airbnb listing screenshot and tell me the nightly price. Return ONLY the numeric value without any currency symbols or additional text. For example, if you see '$150 night', just return '150'."
            },
            {
              type: "image_url",
              image_url: {
                url: `data:image/png;base64,${base64Image}`,
              },
            },
          ],
        },
      ],
      max_tokens: 100,
    });
    
    // Extract the price from the response
    const content = response.choices[0].message.content;
    if (!content) {
      console.log('Empty response from OpenAI Vision');
      return 0;
    }
    
    // Parse the price from the response
    const priceMatch = content.match(/\d+/);
    if (priceMatch) {
      const price = parseInt(priceMatch[0]);
      console.log(`OpenAI Vision detected price: $${price}`);
      return price;
    }
    
    console.log('Could not parse price from OpenAI Vision response');
    */
    return 0;
  } catch (error) {
    console.error('Error analyzing screenshot with OpenAI Vision:', error);
    return 0;
  }
}

// Function to generate pricing strategy with OpenAI
async function generatePricingStrategy(propertyData: any) {
  console.log(`Generating pricing strategy for ${propertyData.propertyName}`);
  
  try {
    // Check if OpenAI API key is available
    if (!process.env.OPENAI_API_KEY || process.env.OPENAI_API_KEY === 'your-api-key') {
      console.log('OpenAI API key not available, using simulated pricing strategy');
      return simulatePricingStrategy(propertyData);
    }
    
    const prompt = `
      As an Airbnb pricing expert, create a comprehensive pricing strategy for the following property:
      
      Property Name: ${propertyData.propertyName}
      Property Type: ${propertyData.propertyType}
      Location: ${propertyData.location}
      Current Price: $${propertyData.price}
      
      Please provide a detailed pricing strategy that includes:
      
      1. A suggested base price with justification
      2. Seasonal pricing adjustments (percentage changes for different seasons)
      3. Day of week adjustments (weekday vs weekend pricing)
      4. Discount strategies for longer stays
      5. Premium charges for holidays and special events
      6. Competitive positioning strategies
      7. Recommended dynamic pricing tools
      
      Format the response as a JSON object with the following structure:
      {
        "currentPrice": number,
        "suggestedPrice": number,
        "marketAverage": number,
        "priceRange": {
          "min": number,
          "max": number
        },
        "pricingPrinciples": [string],
        "seasonalStrategy": [
          {
            "season": string,
            "months": string,
            "adjustment": number,
            "reasoning": string
          }
        ],
        "weekdayWeekendStrategy": {
          "weekdayAdjustment": number,
          "weekendAdjustment": number,
          "reasoning": string
        },
        "discountStrategies": [
          {
            "stayLength": string,
            "discountPercentage": number,
            "reasoning": string
          }
        ],
        "premiumCharges": [
          {
            "event": string,
            "premiumPercentage": number,
            "reasoning": string
          }
        ],
        "competitivePositioning": {
          "superhostAdvantage": string,
          "reviewStrategy": string,
          "photographyTip": string,
          "amenityHighlights": string
        },
        "dynamicPricingTools": [
          {
            "name": string,
            "description": string,
            "website": string
          }
        ]
      }
    `;
    
    // Call OpenAI API
    const response = await openai.chat.completions.create({
      model: "gpt-4-turbo",
      messages: [
        {
          role: "system",
          content: "You are an expert in Airbnb pricing strategies and market analysis. You provide detailed, actionable pricing recommendations to help hosts maximize their revenue."
        },
        {
          role: "user",
          content: prompt
        }
      ],
      temperature: 0.7,
      max_tokens: 2000,
      response_format: { type: "json_object" }
    });
    
    // Parse the response
    const content = response.choices[0].message.content;
    if (!content) {
      console.log('Empty response from OpenAI, using simulated pricing strategy');
      return simulatePricingStrategy(propertyData);
    }
    
    try {
      const pricingStrategy = JSON.parse(content);
      console.log('Successfully generated pricing strategy with OpenAI');
      return pricingStrategy;
    } catch (parseError) {
      console.error('Error parsing OpenAI response:', parseError);
      return simulatePricingStrategy(propertyData);
    }
  } catch (error) {
    console.error('Error calling OpenAI API:', error);
    return simulatePricingStrategy(propertyData);
  }
}

// Function to simulate pricing strategy when OpenAI is not available
function simulatePricingStrategy(propertyData: any) {
  console.log(`Simulating pricing strategy for ${propertyData.propertyName}`);
  
  const currentPrice = propertyData.price || 100;
  const suggestedPrice = Math.round(currentPrice * 1.1); // 10% higher
  const marketAverage = Math.round(currentPrice * 1.05); // 5% higher
  
  return {
    currentPrice,
    suggestedPrice,
    marketAverage,
    priceRange: {
      min: Math.round(currentPrice * 0.9),
      max: Math.round(currentPrice * 1.3)
    },
    pricingPrinciples: [
      "Set your base price by researching similar properties in your area",
      "Adjust prices seasonally based on local demand patterns",
      "Offer discounts for longer stays to increase occupancy",
      "Charge premiums for weekends and special events",
      "Regularly review and update your pricing strategy"
    ],
    seasonalStrategy: [
      {
        season: "High Season",
        months: "June-August",
        adjustment: 15,
        reasoning: "Summer months typically see higher demand for vacation rentals"
      },
      {
        season: "Shoulder Season",
        months: "April-May, September-October",
        adjustment: 5,
        reasoning: "Moderate demand with pleasant weather conditions"
      },
      {
        season: "Low Season",
        months: "November-March",
        adjustment: -10,
        reasoning: "Lower demand during colder months requires competitive pricing"
      }
    ],
    weekdayWeekendStrategy: {
      weekdayAdjustment: -5,
      weekendAdjustment: 10,
      reasoning: "Weekend demand is typically higher for leisure travelers"
    },
    discountStrategies: [
      {
        stayLength: "Weekly (7+ nights)",
        discountPercentage: 10,
        reasoning: "Encourages longer bookings and reduces turnover costs"
      },
      {
        stayLength: "Monthly (28+ nights)",
        discountPercentage: 25,
        reasoning: "Guarantees occupancy and eliminates vacancy risks"
      },
      {
        stayLength: "Last-minute (2-3 days before)",
        discountPercentage: 15,
        reasoning: "Fills potential vacancies when booking window is closing"
      }
    ],
    premiumCharges: [
      {
        event: "Holidays",
        premiumPercentage: 25,
        reasoning: "High demand periods with limited supply"
      },
      {
        event: "Local Events",
        premiumPercentage: 20,
        reasoning: "Conferences, festivals, and sporting events drive demand"
      },
      {
        event: "Peak Weekends",
        premiumPercentage: 15,
        reasoning: "Friday and Saturday nights during high season"
      }
    ],
    competitivePositioning: {
      superhostAdvantage: "Work toward Superhost status for premium pricing",
      reviewStrategy: "Actively solicit positive reviews to build credibility",
      photographyTip: "Invest in professional photography to showcase value",
      amenityHighlights: "Emphasize high-value amenities in your listing"
    },
    dynamicPricingTools: [
      {
        name: "PriceLabs",
        description: "Automated dynamic pricing with customizable rules",
        website: "https://www.pricelabs.co"
      },
      {
        name: "Beyond Pricing",
        description: "Data-driven pricing tool with market insights",
        website: "https://www.beyondpricing.com"
      },
      {
        name: "Wheelhouse",
        description: "Flexible pricing tool with market data and recommendations",
        website: "https://www.usewheelhouse.com"
      }
    ]
  };
}

export async function POST(request: Request) {
  console.log('Received POST request to generate pricing strategy');
  
  try {
    // Parse request body
    const body = await request.json();
    const { url, email, address } = body;
    
    // Validate required fields
    if (!url) {
      return NextResponse.json({ error: 'Airbnb URL is required' }, { status: 400 });
    }
    
    if (!email) {
      return NextResponse.json({ error: 'Email address is required' }, { status: 400 });
    }
    
    if (!address) {
      return NextResponse.json({ error: 'Property address is required' }, { status: 400 });
    }
    
    console.log(`Processing request for URL: ${url}`);
    console.log(`Email: ${email}`);
    console.log(`Address: ${address}`);
    
    // Scrape Airbnb listing
    let propertyData;
    try {
      propertyData = await scrapeAirbnbListing(url, address);
      console.log('Successfully processed Airbnb listing');
    } catch (error) {
      console.error('Error processing Airbnb listing:', error);
      return NextResponse.json({ 
        error: 'Failed to process Airbnb listing', 
        message: error instanceof Error ? error.message : 'Unknown error'
      }, { status: 500 });
    }
    
    // Generate pricing strategy with AI
    const pricingStrategy = await generatePricingStrategy(propertyData);
    console.log('Successfully generated pricing strategy');
    
    // Return the generated pricing strategy
    return NextResponse.json({ 
      success: true, 
      guide: {
        propertyName: propertyData.propertyName,
        pricingStrategy
      },
      message: 'Pricing strategy generated successfully'
    });
  } catch (error) {
    console.error('Error processing request:', error);
    return NextResponse.json({ 
      error: 'Failed to generate pricing strategy', 
      message: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 });
  }
} 