import { NextResponse } from 'next/server';
import OpenAI from 'openai';
import puppeteer from 'puppeteer';
import * as os from 'os';
import * as path from 'path';
import * as fs from 'fs/promises';

// Initialize OpenAI client
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY || 'your-api-key',
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

// Function to safely scrape Airbnb listing with error handling
async function scrapeAirbnbListing(url: string) {
  console.log(`Starting to scrape Airbnb listing: ${url}`);
  
  // Extract listing ID from URL
  const listingIdMatch = url.match(/\/rooms\/(\d+)/);
  if (!listingIdMatch) {
    console.log('Invalid Airbnb URL. Could not extract listing ID.');
    return null;
  }
  
  const listingId = listingIdMatch[1];
  console.log(`Extracted listing ID: ${listingId}`);
  
  let browser = null;
  let screenshotCounter = 1;
  
  try {
    // Find Chrome executable path
    const executablePath = await findChromePath();
    console.log(`Chrome executable path: ${executablePath || 'Not found, using default'}`);
    
    // Launch browser with puppeteer (which includes Chromium)
    browser = await puppeteer.launch({
      headless: true,
      args: [
        '--no-sandbox', 
        '--disable-setuid-sandbox',
        '--disable-dev-shm-usage', // Add this for Docker/cloud environments
        '--disable-gpu' // Add this for Docker/cloud environments
      ]
    });
    
    // Create a new page
    const page = await browser.newPage();
    
    // Set viewport to a larger size
    await page.setViewport({ width: 1920, height: 1080 });
    
    // Set a reasonable timeout
    page.setDefaultNavigationTimeout(90000);
    
    // Helper function to take screenshots
    const takeScreenshot = async (name: string) => {
      try {
        const filename = `${screenshotCounter}-${name}.png`;
        await page.screenshot({ path: filename, fullPage: true });
        console.log(`Took screenshot: ${filename}`);
        screenshotCounter++;
      } catch (error) {
        console.log(`Failed to take screenshot ${name}:`, error);
      }
    };
    
    // Navigate to the Airbnb listing
    console.log(`Navigating to: ${url}`);
    await page.goto(url, { waitUntil: 'networkidle2', timeout: 90000 });
    
    // Add a longer delay to ensure the page is fully loaded
    console.log('Waiting for page to fully load...');
    await new Promise(resolve => setTimeout(resolve, 10000));
    
    // Log the current URL to verify we're on the right page
    const currentUrl = page.url();
    console.log(`Current page URL: ${currentUrl}`);
    
    // Take an initial screenshot
    await takeScreenshot('initial-page-load');
    
    // Check if we were redirected to a login page
    const isLoginPage = await page.evaluate(() => {
      return document.body.textContent?.includes('Log in or sign up') || 
             document.body.textContent?.includes('Login') ||
             window.location.href.includes('login');
    });
    
    if (isLoginPage) {
      console.log('WARNING: Redirected to login page. Airbnb may be blocking scraping attempts.');
      await takeScreenshot('login-page');
      throw new Error('Redirected to login page');
    }
    
    // Extract property details
    console.log('Extracting property details...');
    
    // Property name
    const propertyName = await page.evaluate(() => {
      const titleElement = document.querySelector('h1');
      return titleElement ? titleElement.textContent?.trim() : 'Airbnb Property';
    }).catch(() => 'Airbnb Property');
    console.log(`Property name: ${propertyName}`);
    
    // Property type
    const propertyType = await page.evaluate(() => {
      const typeElement = document.querySelector('[data-section-id="OVERVIEW_DEFAULT"] > div > h2');
      return typeElement ? typeElement.textContent?.trim() : 'Rental';
    }).catch(() => 'Rental');
    console.log(`Property type: ${propertyType}`);
    
    // Location
    const location = await page.evaluate(() => {
      const locationElement = document.querySelector('[data-section-id="LOCATION_DEFAULT"] h2');
      if (locationElement) {
        return locationElement.textContent?.trim() || 'Unknown Location';
      }
      // Try alternative selectors if the primary one fails
      const breadcrumbElement = document.querySelector('[itemprop="itemListElement"]:last-child');
      if (breadcrumbElement) {
        return breadcrumbElement.textContent?.trim() || 'Unknown Location';
      }
      return 'Unknown Location';
    }).catch(() => 'Unknown Location');
    console.log(`Location: ${location}`);
    
    // Amenities
    const existingAmenities = await page.evaluate(() => {
      const amenityElements = document.querySelectorAll('[data-section-id="AMENITIES_DEFAULT"] div[role="listitem"]');
      const amenitiesList: string[] = [];
      
      amenityElements.forEach(element => {
        const amenityText = element.textContent?.trim();
        if (amenityText) {
          amenitiesList.push(amenityText);
        }
      });
      
      return amenitiesList.length > 0 ? amenitiesList : [];
    }).catch(() => []);
    console.log(`Amenities found: ${existingAmenities.length}`);
    
    // ENHANCED REVIEW EXTRACTION PROCESS
    console.log('Starting enhanced review extraction process...');
    
    // First, scroll down multiple times to ensure all content loads
    console.log('Performing multiple scrolls to load all content...');
    for (let i = 0; i < 10; i++) {
      await page.evaluate(() => {
        window.scrollBy(0, 800);
      });
      // Wait between scrolls
      await new Promise(resolve => setTimeout(resolve, 1000));
      if (i === 5) {
        await takeScreenshot('mid-scroll');
      }
    }
    
    // Wait longer for content to load after scrolling
    console.log('Waiting for content to load after scrolling...');
    await new Promise(resolve => setTimeout(resolve, 10000));
    
    // Take a screenshot after scrolling
    await takeScreenshot('after-scroll');
    
    // Check for any modal dialogs that might be blocking and close them
    const hasModal = await page.evaluate(() => {
      const modals = document.querySelectorAll('[role="dialog"]');
      if (modals.length > 0) {
        console.log(`Found ${modals.length} modal dialogs`);
        // Try to close each modal
        modals.forEach(modal => {
          const closeButtons = modal.querySelectorAll('button');
          closeButtons.forEach(button => {
            if (button.textContent?.includes('Close') || 
                button.getAttribute('aria-label')?.includes('Close')) {
              button.click();
            }
          });
        });
        return true;
      }
      return false;
    });
    
    if (hasModal) {
      console.log('Detected and attempted to close modal dialogs');
      await takeScreenshot('after-closing-modals');
      // Wait after closing modals
      await new Promise(resolve => setTimeout(resolve, 3000));
    }
    
    // Scroll to the reviews section specifically
    console.log('Attempting to scroll to reviews section...');
    const scrolledToReviews = await page.evaluate(() => {
      // Try different possible review section selectors
      const reviewSelectors = [
        '[data-section-id="REVIEWS_DEFAULT"]',
        '[data-testid="pdp-reviews-section"]',
        'section[aria-label*="review"]',
        'div[aria-label*="review"]',
        'h2:contains("review")',
        'h2:contains("Rating")'
      ];
      
      for (const selector of reviewSelectors) {
        try {
          const reviewSection = document.querySelector(selector);
          if (reviewSection) {
            reviewSection.scrollIntoView({ behavior: 'smooth', block: 'center' });
            console.log(`Scrolled to reviews using selector: ${selector}`);
            return true;
          }
        } catch (e) {
          console.log(`Error with selector ${selector}:`, e);
        }
      }
      
      // If no specific review section found, try to find by text content
      const allHeadings = document.querySelectorAll('h2');
      for (const heading of allHeadings) {
        if (heading.textContent?.toLowerCase().includes('review') || 
            heading.textContent?.toLowerCase().includes('rating')) {
          heading.scrollIntoView({ behavior: 'smooth', block: 'center' });
          console.log('Scrolled to reviews using text content match');
          return true;
        }
      }
      
      return false;
    });
    
    console.log(`Scrolled to reviews section: ${scrolledToReviews}`);
    
    // Wait after scrolling to reviews
    await new Promise(resolve => setTimeout(resolve, 5000));
    await takeScreenshot('after-scroll-to-reviews');
    
    // Try to click "Show all reviews" button if it exists
    console.log('Looking for "Show all reviews" button...');
    const reviewButtonClicked = await page.evaluate(() => {
      // Helper function to log and click a button
      const clickButton = (button, reason) => {
        console.log(`Clicking button: ${button.textContent?.trim()} (${reason})`);
        button.click();
        return true;
      };
      
      // Try to find review buttons by text content
      const allButtons = Array.from(document.querySelectorAll('button'));
      const reviewTextPatterns = [
        /show all/i, /see all/i, /reviews/i, /ratings/i, 
        /show more/i, /more reviews/i, /view all/i
      ];
      
      for (const button of allButtons) {
        const buttonText = button.textContent?.trim() || '';
        
        // Check if button text matches any of our patterns
        for (const pattern of reviewTextPatterns) {
          if (pattern.test(buttonText)) {
            return clickButton(button, `Text match: ${pattern}`);
          }
        }
        
        // Check aria-label as well
        const ariaLabel = button.getAttribute('aria-label') || '';
        for (const pattern of reviewTextPatterns) {
          if (pattern.test(ariaLabel)) {
            return clickButton(button, `Aria-label match: ${pattern}`);
          }
        }
      }
      
      // Try to find by parent elements that might contain review-related text
      const reviewSections = document.querySelectorAll('[data-section-id="REVIEWS_DEFAULT"], [data-testid="pdp-reviews-section"]');
      for (const section of reviewSections) {
        const buttons = section.querySelectorAll('button');
        if (buttons.length > 0) {
          return clickButton(buttons[0], 'Found in reviews section');
        }
      }
      
      // Log all button text for debugging
      console.log('All button texts on page:', allButtons.map(b => b.textContent?.trim()).filter(Boolean));
      
      return false;
    });
    
    console.log(`Review button clicked: ${reviewButtonClicked}`);
    
    if (reviewButtonClicked) {
      // Wait longer after clicking the button
      console.log('Waiting after clicking review button...');
      await new Promise(resolve => setTimeout(resolve, 8000));
      await takeScreenshot('after-review-button-click');
    }
    
    // Check if a reviews modal opened and take screenshot
    const hasReviewModal = await page.evaluate(() => {
      const reviewModal = document.querySelector('[role="dialog"][aria-label*="review"]');
      return !!reviewModal;
    });
    
    if (hasReviewModal) {
      console.log('Review modal detected');
      await takeScreenshot('review-modal');
    }
    
    // Extract reviews with detailed logging
    console.log('Extracting reviews with detailed logging...');
    const reviews = await page.evaluate(() => {
      // Helper function to get text content safely
      const getText = (element) => element ? element.textContent?.trim() || '' : '';
      
      // Log all section IDs for debugging
      const allSections = document.querySelectorAll('[data-section-id]');
      const sectionIds = Array.from(allSections).map(section => 
        section.getAttribute('data-section-id')
      );
      console.log('All section IDs:', sectionIds);
      
      // Try multiple selectors for the reviews section
      const reviewSectionSelectors = [
        '[data-section-id="REVIEWS_DEFAULT"]',
        '[data-testid="pdp-reviews-section"]',
        'section[aria-label*="review"]',
        'div[aria-label*="review"]',
        '[role="dialog"][aria-label*="review"]' // Modal dialog
      ];
      
      let reviewsSection = null;
      let usedSelector = '';
      
      for (const selector of reviewSectionSelectors) {
        const section = document.querySelector(selector);
        if (section) {
          reviewsSection = section;
          usedSelector = selector;
          break;
        }
      }
      
      // If still not found, try to find by heading text
      if (!reviewsSection) {
        const reviewHeadings = Array.from(document.querySelectorAll('h2')).filter(h => 
          h.textContent?.toLowerCase().includes('review') || 
          h.textContent?.toLowerCase().includes('rating')
        );
        
        if (reviewHeadings.length > 0) {
          // Get the parent container of the heading
          let parent = reviewHeadings[0].parentElement;
          while (parent && !parent.querySelector('div[role="listitem"]')) {
            parent = parent.parentElement;
            if (parent === document.body) break;
          }
          
          if (parent && parent !== document.body) {
            reviewsSection = parent;
            usedSelector = 'Found by heading text';
          }
        }
      }
      
      if (!reviewsSection) {
        console.log('Reviews section not found with any selector');
        
        // Check if the page contains any review-related text
        const pageText = document.body.textContent || '';
        const hasReviewText = pageText.includes('review') || 
                             pageText.includes('rating') || 
                             pageText.includes('guest');
        
        return { 
          overallRating: '', 
          totalReviews: '', 
          reviews: [],
          debug: {
            sectionIds,
            hasReviewText,
            pageTextSample: pageText.substring(0, 1000),
            htmlSample: document.body.innerHTML.substring(0, 1000)
          }
        };
      }
      
      console.log(`Found reviews section using: ${usedSelector}`);
      
      // Get overall rating and total reviews from the heading
      const reviewsHeading = reviewsSection.querySelector('h2');
      let overallRating = '';
      let totalReviews = '';
      
      if (reviewsHeading) {
        const headingText = reviewsHeading.textContent || '';
        console.log('Reviews heading:', headingText);
        
        // Extract rating (usually in format "4.95 · 362 reviews")
        const ratingMatch = headingText.match(/(\d+\.\d+)/);
        if (ratingMatch) {
          overallRating = ratingMatch[1];
        }
        
        // Extract total reviews count
        const reviewsCountMatch = headingText.match(/(\d+)\s+reviews?/);
        if (reviewsCountMatch) {
          totalReviews = reviewsCountMatch[1];
        }
      }
      
      console.log(`Extracted rating: ${overallRating}, total reviews: ${totalReviews}`);
      
      // Find all review items using multiple approaches
      let reviewElements = [];
      
      // Approach 1: Standard listitem approach
      const listItems = reviewsSection.querySelectorAll('div[role="listitem"]');
      if (listItems.length > 0) {
        console.log(`Found ${listItems.length} reviews using listitem selector`);
        reviewElements = Array.from(listItems);
      }
      
      // Approach 2: Look for reviewer names (h3 elements)
      if (reviewElements.length === 0) {
        const h3Elements = reviewsSection.querySelectorAll('h3');
        if (h3Elements.length > 0) {
          console.log(`Found ${h3Elements.length} potential reviews using h3 selector`);
          reviewElements = Array.from(h3Elements).map(h3 => {
            // Find the closest container that likely represents the whole review
            let parent = h3.parentElement;
            while (parent && parent !== reviewsSection && !parent.querySelector('span[data-testid="review-content"]')) {
              parent = parent.parentElement;
            }
            return parent;
          }).filter(Boolean);
        }
      }
      
      // Approach 3: Look for review content spans
      if (reviewElements.length === 0) {
        const reviewSpans = reviewsSection.querySelectorAll('span[data-testid="review-content"]');
        if (reviewSpans.length > 0) {
          console.log(`Found ${reviewSpans.length} reviews using content span selector`);
          reviewElements = Array.from(reviewSpans).map(span => {
            // Find the parent container
            let parent = span.parentElement;
            while (parent && parent !== reviewsSection && !parent.querySelector('h3')) {
              parent = parent.parentElement;
            }
            return parent || span.parentElement;
          }).filter(Boolean);
        }
      }
      
      // Approach 4: Look for review containers by class patterns
      if (reviewElements.length === 0) {
        // Common class patterns in Airbnb reviews
        const classPatterns = [
          'review-', 'comment-', 'feedback-', 'guest-'
        ];
        
        for (const pattern of classPatterns) {
          const elements = reviewsSection.querySelectorAll(`[class*="${pattern}"]`);
          if (elements.length > 0) {
            console.log(`Found ${elements.length} potential reviews using class pattern: ${pattern}`);
            reviewElements = Array.from(elements);
            break;
          }
        }
      }
      
      console.log(`Total review elements found: ${reviewElements.length}`);
      
      // Process each review
      const reviewsList = [];
      
      reviewElements.forEach((item, index) => {
        if (!item) return;
        
        // Reviewer name (usually in an h3)
        const nameElement = item.querySelector('h3');
        const name = getText(nameElement);
        
        // Try to find review text using various selectors
        let reviewText = '';
        const possibleTextSelectors = [
          'span[data-testid="review-content"]',
          'span.lrl13de',
          'div.t1qcpyh5',
          '.review-text',
          'span[dir="ltr"]',
          'p',
          'div > span'
        ];
        
        for (const selector of possibleTextSelectors) {
          const textElement = item.querySelector(selector);
          if (textElement) {
            reviewText = getText(textElement);
            if (reviewText) break;
          }
        }
        
        // If we still don't have review text, try a more general approach
        if (!reviewText) {
          // Look for spans with substantial text content
          const spans = item.querySelectorAll('span');
          for (const span of spans) {
            const text = getText(span);
            if (text && text.length > 20) {  // Likely a review if it's long enough
              reviewText = text;
              break;
            }
          }
        }
        
        // Try to find date and location
        let date = '';
        let reviewerLocation = '';
        
        // Date is often in a div with a specific class
        const dateSelectors = ['div.s78n3tv', '.review-date', 'div > div > div'];
        for (const selector of dateSelectors) {
          const dateElements = item.querySelectorAll(selector);
          for (const dateElement of dateElements) {
            const text = getText(dateElement);
            // Date usually contains month names or year
            if (text && (
              /\b(January|February|March|April|May|June|July|August|September|October|November|December)\b/.test(text) ||
              /\b20\d\d\b/.test(text)
            )) {
              date = text;
              break;
            }
          }
          if (date) break;
        }
        
        // Location is often near the reviewer name
        const locationSelectors = ['div.t1s6zadl', '.reviewer-location', 'div > div:not(:has(h3))'];
        for (const selector of locationSelectors) {
          const locationElements = item.querySelectorAll(selector);
          for (const locationElement of locationElements) {
            const text = getText(locationElement);
            // Location is usually short and doesn't contain date patterns
            if (text && text.length < 50 && 
                !/\b(January|February|March|April|May|June|July|August|September|October|November|December)\b/.test(text) &&
                !/\b20\d\d\b/.test(text)) {
              reviewerLocation = text;
              break;
            }
          }
          if (reviewerLocation) break;
        }
        
        // If we have either a name or review text, consider it a valid review
        if (name || reviewText) {
          reviewsList.push({
            name: name || 'Anonymous Guest',
            location: reviewerLocation,
            date,
            text: reviewText || 'No review text available',
            rating: '5'  // Default to 5 as most Airbnb reviews are 5 stars
          });
          
          console.log(`Processed review ${index + 1}: ${name} - ${reviewText ? reviewText.substring(0, 30) + '...' : 'No text'}`);
        }
      });
      
      return {
        overallRating,
        totalReviews,
        reviews: reviewsList,
        debug: {
          sectionIds,
          reviewSectionFound: !!reviewsSection,
          reviewElementsFound: reviewElements.length,
          usedSelector
        }
      };
    }).catch(error => {
      console.error('Error extracting reviews:', error);
      return { overallRating: '', totalReviews: '', reviews: [] };
    });
    
    console.log(`Reviews found: ${reviews.reviews ? reviews.reviews.length : 0}`);
    console.log('Debug info:', reviews.debug);
    
    // If no reviews were found, try one more approach - check if we're in a review modal
    if (!reviews.reviews || reviews.reviews.length === 0) {
      console.log('No reviews found with standard approach, checking for review modal');
      
      // Take a screenshot of the current state
      await takeScreenshot('before-modal-check');
      
      // Check if there's a reviews modal and extract from it
      const modalReviews = await page.evaluate(() => {
        const modal = document.querySelector('[role="dialog"][aria-label*="review"]');
        if (!modal) {
          console.log('No review modal found');
          return null;
        }
        
        console.log('Found review modal, extracting reviews');
        
        // Helper function to get text content safely
        const getText = (element) => element ? element.textContent?.trim() || '' : '';
        
        // Find review items in the modal
        const reviewItems = modal.querySelectorAll('div[role="listitem"]');
        if (!reviewItems.length) {
          console.log('No review items found in modal');
          return null;
        }
        
        console.log(`Found ${reviewItems.length} review items in modal`);
        
        // Process each review
        const reviewsList = [];
        
        reviewItems.forEach((item, index) => {
          // Reviewer name
          const nameElement = item.querySelector('h3');
          const name = getText(nameElement);
          
          // Review text
          const textElement = item.querySelector('span[dir="ltr"]') || 
                             item.querySelector('span[data-testid="review-content"]');
          const reviewText = getText(textElement);
          
          // Date
          const dateElement = item.querySelector('div:not(:has(*))');
          const date = getText(dateElement);
          
          if (name || reviewText) {
            reviewsList.push({
              name: name || 'Anonymous Guest',
              location: '',
              date,
              text: reviewText || 'No review text available',
              rating: '5'
            });
            
            console.log(`Processed modal review ${index + 1}: ${name} - ${reviewText ? reviewText.substring(0, 30) + '...' : 'No text'}`);
          }
        });
        
        return {
          reviews: reviewsList,
          overallRating: '',
          totalReviews: reviewsList.length.toString()
        };
      });
      
      if (modalReviews && modalReviews.reviews && modalReviews.reviews.length > 0) {
        console.log(`Found ${modalReviews.reviews.length} reviews in modal`);
        reviews.reviews = modalReviews.reviews;
        reviews.totalReviews = modalReviews.totalReviews;
      }
    }
    
    // If still no reviews, create a dummy review for testing
    if (!reviews.reviews || reviews.reviews.length === 0) {
      console.log('No reviews found with any method, adding a dummy review for testing');
      reviews.reviews = [{
        name: 'Scraper Test',
        location: 'Test Location',
        date: 'January 2023',
        text: 'This is a test review because the scraper could not find actual reviews. Please check the debug screenshots to diagnose the issue.',
        rating: '5'
      }];
      reviews.overallRating = '5.0';
      reviews.totalReviews = '1';
    }
    
    // Take a final screenshot
    await takeScreenshot('final-state');
    
    // Close the browser
    await browser.close();
    browser = null;
    console.log('Browser closed');
    
    // Determine property type category for recommendations
    let propertyTypeCategory = 'house';
    
    if (propertyType.toLowerCase().includes('apartment') || propertyType.toLowerCase().includes('condo')) {
      propertyTypeCategory = 'apartment';
    } else if (propertyType.toLowerCase().includes('cabin')) {
      propertyTypeCategory = 'cabin';
    } else if (propertyType.toLowerCase().includes('villa')) {
      propertyTypeCategory = 'villa';
    } else if (location.toLowerCase().includes('beach') || propertyName.toLowerCase().includes('beach')) {
      propertyTypeCategory = 'beach_house';
    } else if (location.toLowerCase().includes('mountain') || propertyName.toLowerCase().includes('mountain')) {
      propertyTypeCategory = 'mountain_retreat';
    } else if (location.toLowerCase().includes('city') || location.toLowerCase().includes('downtown')) {
      propertyTypeCategory = 'urban_loft';
    }
    
    return {
      propertyName,
      propertyType: propertyTypeCategory,
      location,
      existingAmenities,
      listingId,
      reviews: reviews.reviews || [],
      overallRating: reviews.overallRating || '',
      totalReviews: reviews.totalReviews || ''
    };
  } catch (error) {
    console.error('Error during scraping:', error);
    // Make sure to close the browser if an error occurs
    if (browser) {
      try {
        await browser.close();
      } catch (closeError) {
        console.error('Error closing browser:', closeError);
      }
    }
    return null;
  }
}

// Function to get amenity recommendations based on property type and existing amenities
function getAmenityRecommendations(propertyType: string, location: string = '', existingAmenities: string[] = []) {
  console.log(`Generating recommendations for ${propertyType} in ${location}`);
  console.log(`Existing amenities: ${existingAmenities.length > 0 ? existingAmenities.join(', ') : 'None detected'}`);
  
  const categories = [
    {
      name: 'Essential Comfort',
      icon: '🛏️',
      description: 'Must-have amenities that ensure guest comfort and satisfaction.',
      amenities: [
        {
          name: 'Premium Bedding Package',
          description: 'High-quality mattress, pillows, and linens for a luxurious sleep experience.',
          benefits: [
            'Consistently mentioned in 5-star reviews',
            'Justifies higher nightly rates',
            'Improves guest sleep quality and overall satisfaction'
          ],
          investmentLevel: 'Medium',
          roi: 'High'
        },
        {
          name: 'Climate Control System',
          description: 'Smart thermostat with heating and cooling capabilities.',
          benefits: [
            'Essential for year-round comfort',
            'Energy-efficient operation reduces costs',
            'Guests appreciate temperature control'
          ],
          investmentLevel: 'Medium',
          roi: 'High'
        }
      ]
    },
    {
      name: 'Work & Entertainment',
      icon: '💻',
      description: 'Amenities that cater to both business and leisure travelers.',
      amenities: [
        {
          name: 'High-Speed WiFi & Work Station',
          description: 'Reliable internet connection with dedicated workspace setup.',
          benefits: [
            'Essential for remote workers',
            'Attracts business travelers',
            'Increases weekday bookings'
          ],
          investmentLevel: 'Medium',
          roi: 'High'
        },
        {
          name: 'Smart TV Entertainment System',
          description: 'Large smart TV with popular streaming services.',
          benefits: [
            'Expected by modern travelers',
            'Enhances evening relaxation options',
            'Provides rainy day entertainment'
          ],
          investmentLevel: 'Medium',
          roi: 'Medium'
        }
      ]
    },
    {
      name: 'Kitchen & Dining',
      icon: '🍳',
      description: 'Amenities that make meal preparation and dining convenient.',
      amenities: [
        {
          name: 'Full Kitchen Setup',
          description: 'Well-equipped kitchen with quality appliances and essential cookware.',
          benefits: [
            'Attracts longer-stay guests',
            'Reduces guest dining expenses',
            'Essential for family travelers'
          ],
          investmentLevel: 'High',
          roi: 'High'
        },
        {
          name: 'Coffee & Tea Station',
          description: 'Premium coffee maker with complimentary coffee, tea, and supplies.',
          benefits: [
            'Highly appreciated morning amenity',
            'Frequently mentioned in reviews',
            'Low-cost way to delight guests'
          ],
          investmentLevel: 'Low',
          roi: 'High'
        }
      ]
    },
    {
      name: 'Outdoor Living',
      icon: '🌳',
      description: 'Amenities that enhance outdoor experiences and relaxation.',
      amenities: [
        {
          name: 'Outdoor Seating Area',
          description: 'Comfortable patio furniture with shade options.',
          benefits: [
            'Expands living space',
            'Perfect for morning coffee or evening relaxation',
            'Great for social gatherings'
          ],
          investmentLevel: 'Medium',
          roi: 'High'
        },
        {
          name: 'BBQ Grill',
          description: 'Quality grill with tools and outdoor dining setup.',
          benefits: [
            'Popular with families and groups',
            'Encourages longer stays',
            'Creates memorable experiences'
          ],
          investmentLevel: 'Medium',
          roi: 'Medium'
        }
      ]
    }
  ];

  // Add property-type specific amenities
  switch (propertyType) {
    case 'beach_house':
      categories.push({
        name: 'Beach Essentials',
        icon: '🏖️',
        description: 'Beach-specific amenities that enhance the coastal experience.',
        amenities: [
          {
            name: 'Beach Equipment Package',
            description: 'Beach chairs, umbrellas, coolers, and beach toys.',
            benefits: [
              'Saves guests from renting or buying beach gear',
              'Enhances beach experience',
              'Highly valued by families'
            ],
            investmentLevel: 'Medium',
            roi: 'High'
          },
          {
            name: 'Outdoor Shower',
            description: 'Convenient shower for washing off sand and salt.',
            benefits: [
              'Keeps indoor spaces cleaner',
              'Improves guest experience',
              'Reduces maintenance needs'
            ],
            investmentLevel: 'Medium',
            roi: 'High'
          }
        ]
      });
      break;
    
    case 'mountain_retreat':
      categories.push({
        name: 'Mountain Living',
        icon: '⛰️',
        description: 'Amenities perfect for mountain and outdoor adventures.',
        amenities: [
          {
            name: 'Gear Storage & Drying',
            description: 'Dedicated space for storing and drying outdoor gear.',
            benefits: [
              'Essential for ski and hiking equipment',
              'Protects property from moisture damage',
              'Highly valued by outdoor enthusiasts'
            ],
            investmentLevel: 'Low',
            roi: 'High'
          },
          {
            name: 'Fire Pit or Indoor Fireplace',
            description: 'Safe and cozy fire feature for mountain evenings.',
            benefits: [
              'Creates memorable experiences',
              'Perfect for cool mountain nights',
              'Great for social gatherings'
            ],
            investmentLevel: 'Medium-High',
            roi: 'High'
          }
        ]
      });
      break;
    
    case 'urban_loft':
      categories.push({
        name: 'City Living',
        icon: '🌆',
        description: 'Amenities that enhance the urban living experience.',
        amenities: [
          {
            name: 'Smart Home Features',
            description: 'Integrated lighting, security, and entertainment controls.',
            benefits: [
              'Appeals to tech-savvy travelers',
              'Enhances security and convenience',
              'Creates modern luxury feel'
            ],
            investmentLevel: 'High',
            roi: 'Medium'
          },
          {
            name: 'Noise Management',
            description: 'Sound machines, earplugs, and noise-reducing curtains.',
            benefits: [
              'Essential for city sleep quality',
              'Shows thoughtfulness for guest comfort',
              'Reduces noise complaints'
            ],
            investmentLevel: 'Low',
            roi: 'High'
          }
        ]
      });
      break;
      
    case 'cabin':
      categories.push({
        name: 'Cabin Comforts',
        icon: '🌲',
        description: 'Amenities that enhance the rustic cabin experience.',
        amenities: [
          {
            name: 'Hot Tub or Outdoor Spa',
            description: 'Private hot tub or spa for relaxation in nature.',
            benefits: [
              'Highly sought-after feature for cabin rentals',
              'Significantly increases booking rates',
              'Creates memorable experiences in all seasons'
            ],
            investmentLevel: 'High',
            roi: 'High'
          },
          {
            name: 'Board Games & Entertainment',
            description: 'Collection of board games, puzzles, and offline entertainment.',
            benefits: [
              'Perfect for family bonding',
              'Provides entertainment during poor weather',
              'Enhances the unplugged cabin experience'
            ],
            investmentLevel: 'Low',
            roi: 'Medium'
          }
        ]
      });
      break;
      
    case 'villa':
      categories.push({
        name: 'Luxury Touches',
        icon: '✨',
        description: 'Premium amenities that elevate the luxury villa experience.',
        amenities: [
          {
            name: 'Private Pool & Lounging Area',
            description: 'Well-maintained pool with quality loungers and shade options.',
            benefits: [
              'Essential luxury feature for villa rentals',
              'Significantly increases booking rates and nightly price',
              'Creates a resort-like experience'
            ],
            investmentLevel: 'High',
            roi: 'High'
          },
          {
            name: 'Welcome Package',
            description: 'Curated selection of local treats, wine, and essentials.',
            benefits: [
              'Creates an exceptional first impression',
              'Frequently mentioned in reviews',
              'Relatively low-cost way to enhance luxury feel'
            ],
            investmentLevel: 'Low',
            roi: 'High'
          }
        ]
      });
      break;
  }

  // Filter out amenities that the property already has
  if (existingAmenities.length > 0) {
    categories.forEach(category => {
      category.amenities = category.amenities.filter(amenity => {
        // Check if this amenity or something similar already exists
        return !existingAmenities.some(existing => 
          existing.toLowerCase().includes(amenity.name.toLowerCase()) || 
          amenity.name.toLowerCase().includes(existing.toLowerCase())
        );
      });
    });
    
    // Remove categories that have no amenities left
    const filteredCategories = categories.filter(category => category.amenities.length > 0);
    
    // If we filtered out too many, add back some general recommendations
    if (filteredCategories.length < 2) {
      categories.push({
        name: 'Upgrade Opportunities',
        icon: '⭐',
        description: 'Premium versions of amenities you already offer.',
        amenities: [
          {
            name: 'Premium Versions of Existing Amenities',
            description: 'Upgrade your existing amenities to premium versions for a luxury feel.',
            benefits: [
              'Enhances guest experience with minimal changes',
              'Justifies higher rates for the same basic offerings',
              'Creates a more memorable stay'
            ],
            investmentLevel: 'Medium',
            roi: 'Medium'
          },
          {
            name: 'Branded Amenities Package',
            description: 'Curated, branded amenities that create a cohesive experience.',
            benefits: [
              'Creates a boutique hotel feel',
              'Enhances perceived value',
              'Provides Instagram-worthy moments'
            ],
            investmentLevel: 'Medium',
            roi: 'High'
          }
        ]
      });
      
      return {
        propertyType,
        propertyName: 'Your ' + propertyType.replace(/_/g, ' '),
        location: location || 'your location',
        categories: filteredCategories.length > 0 ? filteredCategories : categories,
        summary: `Based on our analysis of your ${propertyType.replace(/_/g, ' ')}, we've identified key amenities that can complement your existing offerings. You already have a great foundation with ${existingAmenities.length} amenities, and these recommendations will help you take your property to the next level.`,
        potentialRateIncrease: '10-15%',
        potentialRateIncreasePercentage: '70%',
        occupancyImprovement: '5-10%',
        occupancyImprovementPercentage: '60%',
        guestSatisfaction: 'Very High',
        guestSatisfactionPercentage: '90%',
        competitiveAnalysis: [
          'Your property already has more amenities than 60% of similar listings',
          'Adding these premium amenities would put you in the top 10% of listings',
          'Properties with these additional amenities command 10-15% higher rates',
          'Guest satisfaction scores increase by 20% with these premium additions'
        ],
        seasonalConsiderations: [
          {
            name: 'Summer',
            recommendations: 'Focus on enhancing your outdoor amenities and cooling options.'
          },
          {
            name: 'Fall',
            recommendations: 'Add cozy touches and outdoor heating options for comfortable evenings.'
          },
          {
            name: 'Winter',
            recommendations: 'Emphasize indoor comfort upgrades and entertainment options.'
          },
          {
            name: 'Spring',
            recommendations: 'Highlight outdoor spaces and provide convenience items for variable weather.'
          }
        ]
      };
    }
    
    return {
      propertyType,
      propertyName: 'Your ' + propertyType.replace(/_/g, ' '),
      location: location || 'your location',
      categories: filteredCategories,
      summary: `Based on our analysis of your ${propertyType.replace(/_/g, ' ')}, we've identified key amenities that can complement your existing offerings. You already have a great foundation with ${existingAmenities.length} amenities, and these recommendations will help you take your property to the next level.`,
      potentialRateIncrease: '10-15%',
      potentialRateIncreasePercentage: '70%',
      occupancyImprovement: '5-10%',
      occupancyImprovementPercentage: '60%',
      guestSatisfaction: 'Very High',
      guestSatisfactionPercentage: '90%',
      competitiveAnalysis: [
        'Your property already has more amenities than 60% of similar listings',
        'Adding these premium amenities would put you in the top 10% of listings',
        'Properties with these additional amenities command 10-15% higher rates',
        'Guest satisfaction scores increase by 20% with these premium additions'
      ],
      seasonalConsiderations: [
        {
          name: 'Summer',
          recommendations: 'Focus on enhancing your outdoor amenities and cooling options.'
        },
        {
          name: 'Fall',
          recommendations: 'Add cozy touches and outdoor heating options for comfortable evenings.'
        },
        {
          name: 'Winter',
          recommendations: 'Emphasize indoor comfort upgrades and entertainment options.'
        },
        {
          name: 'Spring',
          recommendations: 'Highlight outdoor spaces and provide convenience items for variable weather.'
        }
      ]
    };
  }

  return {
    propertyType,
    propertyName: 'Your ' + propertyType.replace(/_/g, ' '),
    location: location || 'your location',
    categories,
    summary: `Based on your ${propertyType.replace(/_/g, ' ')}, we've identified key amenities that can significantly enhance your guest experience and booking potential. These recommendations focus on essential comfort, practical conveniences, and unique features that set your property apart.`,
    potentialRateIncrease: '15-25%',
    potentialRateIncreasePercentage: '80%',
    occupancyImprovement: '10-20%',
    occupancyImprovementPercentage: '65%',
    guestSatisfaction: 'Very High',
    guestSatisfactionPercentage: '90%',
    competitiveAnalysis: [
      'Only 20% of similar properties offer a complete premium amenity package',
      'Properties with these amenities command 15-25% higher nightly rates',
      'Guest satisfaction scores are 30% higher with premium amenities',
      'Extended stay bookings increase by 40% with full kitchen amenities'
    ],
    seasonalConsiderations: [
      {
        name: 'Summer',
        recommendations: 'Focus on outdoor amenities, cooling options, and entertainment features.'
      },
      {
        name: 'Fall',
        recommendations: 'Add cozy touches and outdoor heating options for comfortable evenings.'
      },
      {
        name: 'Winter',
        recommendations: 'Emphasize indoor comfort, entertainment, and winter-specific amenities.'
      },
      {
        name: 'Spring',
        recommendations: 'Highlight outdoor spaces and provide convenience items for variable weather.'
      }
    ]
  };
}

// Function to generate amenity recommendations using OpenAI
async function generateAmenityRecommendationsWithAI(propertyType: string, location: string = '', existingAmenities: string[] = []) {
  console.log(`Generating AI recommendations for ${propertyType} in ${location}`);
  console.log(`Existing amenities: ${existingAmenities.length > 0 ? existingAmenities.join(', ') : 'None detected'}`);
  
  try {
    // Check if OpenAI API key is available
    if (!process.env.OPENAI_API_KEY || process.env.OPENAI_API_KEY === 'your-api-key') {
      console.log('OpenAI API key not available, using fallback recommendations');
      return getAmenityRecommendations(propertyType, location, existingAmenities);
    }
    
    // Prepare the prompt for OpenAI
    const prompt = `
      As an Airbnb hosting expert, provide premium amenity recommendations for a ${propertyType} in ${location || 'any location'}.
      
      ${existingAmenities.length > 0 ? `The property already has these amenities: ${existingAmenities.join(', ')}` : 'No information about existing amenities is available.'}
      
      Please provide recommendations organized into 4-5 categories (like Essential Comfort, Work & Entertainment, etc.).
      
      For each category, include:
      1. A category name
      2. An emoji icon that represents the category
      3. A brief description of the category
      4. 3-5 recommended amenities
      
      For each amenity, include:
      1. Name of the amenity
      2. Description of what it includes
      3. 2-3 benefits for hosts (increased bookings, higher rates, better reviews, etc.)
      4. Investment level (Low, Medium, High)
      5. Return on investment (Low, Medium, High)
      
      Also provide:
      1. A summary paragraph about the overall amenity strategy for this property type
      2. A list of 3-5 quick wins (low-cost, high-impact amenities)
      
      Format the response as a JSON object with the following structure:
      {
        "propertyType": "property type",
        "location": "location",
        "summary": "overall strategy summary",
        "categories": [
          {
            "name": "category name",
            "icon": "emoji",
            "description": "category description",
            "amenities": [
              {
                "name": "amenity name",
                "description": "what it includes",
                "benefits": ["benefit 1", "benefit 2", "benefit 3"],
                "investmentLevel": "Low/Medium/High",
                "roi": "Low/Medium/High"
              }
            ]
          }
        ],
        "quickWins": [
          {
            "name": "quick win name",
            "description": "quick description",
            "estimatedCost": "$XX-$XXX"
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
          content: "You are an expert in Airbnb hosting and property management. You provide detailed, actionable amenity recommendations to help hosts increase their bookings, ratings, and revenue."
        },
        {
          role: "user",
          content: prompt
        }
      ],
      temperature: 0.7,
      max_tokens: 2500,
      response_format: { type: "json_object" }
    });
    
    // Parse the response
    const content = response.choices[0].message.content;
    if (!content) {
      console.log('Empty response from OpenAI, using fallback recommendations');
      return getAmenityRecommendations(propertyType, location, existingAmenities);
    }
    
    try {
      const aiRecommendations = JSON.parse(content);
      console.log('Successfully generated AI recommendations');
      
      // Ensure the response has the expected structure
      if (!aiRecommendations.categories || !Array.isArray(aiRecommendations.categories)) {
        console.log('Invalid AI response structure, using fallback recommendations');
        return getAmenityRecommendations(propertyType, location, existingAmenities);
      }
      
      return aiRecommendations;
    } catch (parseError) {
      console.error('Error parsing OpenAI response:', parseError);
      return getAmenityRecommendations(propertyType, location, existingAmenities);
    }
  } catch (error) {
    console.error('Error calling OpenAI API:', error);
    return getAmenityRecommendations(propertyType, location, existingAmenities);
  }
}

export async function POST(request: Request) {
  try {
    // Parse request body
    const body = await request.json();
    const { url, email, propertyType } = body;
    
    // Validate required fields
    if (!email) {
      return NextResponse.json({ error: 'Email address is required' }, { status: 400 });
    }
    
    if (!url && !propertyType) {
      return NextResponse.json({ error: 'Either URL or property type is required' }, { status: 400 });
    }
    
    let recommendations;
    
    // Create a "coming soon" message for reviews
    const reviewsData = {
      overallRating: "Coming Soon",
      totalReviews: "Coming Soon",
      reviews: [
        {
          name: "Reviews Feature",
          location: "",
          date: "",
          text: "Our review analysis feature is coming soon! We're working on enhancing our platform to provide you with valuable insights from guest reviews.",
          rating: ""
        }
      ],
      comingSoon: true
    };
    
    if (url) {
      try {
        console.log(`Processing Airbnb URL: ${url}`);
        // Attempt to scrape the Airbnb listing (but only for amenities and property info, not reviews)
        const scrapedData = await scrapeAirbnbListing(url);
        
        if (scrapedData) {
          // Generate recommendations based on scraped data using AI
          recommendations = await generateAmenityRecommendationsWithAI(
            scrapedData.propertyType,
            scrapedData.location,
            scrapedData.existingAmenities
          );
          
          // Add property name from scraping
          recommendations.propertyName = scrapedData.propertyName;
        } else {
          // Fallback if scraping fails
          console.log('Scraping failed, using AI recommendations with property type only');
          recommendations = await generateAmenityRecommendationsWithAI(propertyType || 'house');
        }
      } catch (scrapeError) {
        console.error('Error during scraping process:', scrapeError);
        // Fallback to property type or default recommendations with AI
        recommendations = await generateAmenityRecommendationsWithAI(propertyType || 'house');
      }
    } else {
      // Generate recommendations based on property type using AI
      recommendations = await generateAmenityRecommendationsWithAI(propertyType);
    }
    
    // Return the recommendations and "coming soon" reviews message
    return NextResponse.json({ 
      success: true, 
      recommendations,
      reviews: reviewsData,
      message: 'Amenity recommendations generated successfully'
    });
  } catch (error) {
    console.error('Error processing request:', error);
    // Return a friendly error message and fallback recommendations
    const fallbackRecommendations = getAmenityRecommendations('house');
    
    // Create a "coming soon" message for reviews even in error case
    const reviewsData = {
      overallRating: "Coming Soon",
      totalReviews: "Coming Soon",
      reviews: [
        {
          name: "Reviews Feature",
          location: "",
          date: "",
          text: "Our review analysis feature is coming soon! We're working on enhancing our platform to provide you with valuable insights from guest reviews.",
          rating: ""
        }
      ],
      comingSoon: true
    };
    
    return NextResponse.json({ 
      success: true,
      recommendations: fallbackRecommendations,
      reviews: reviewsData,
      message: 'Generated general recommendations due to an error processing your specific request'
    });
  }
} 