import { NextResponse } from 'next/server';
import { chromium } from "playwright";
import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

interface ScrapedData {
  title: string;
  description: string;
  amenities: string[];
  price: string;
  images: string[];
  reviews: string[];
}

export async function POST(request: Request) {
  console.log('API endpoint hit');
  let browser;
  try {
    console.log('Parsing request body...');
    const { url } = await request.json();
    console.log('Request body parsed, URL:', url);

    if (!url || typeof url !== "string") {
      console.log('Invalid URL detected');
      return NextResponse.json({ error: "Valid URL is required" }, { status: 400 });
    }

    console.log('Launching browser...');
    browser = await chromium.launch({ headless: true });
    const context = await browser.newContext({
      userAgent:
        'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
    });
    const page = await context.newPage();

    console.log('Navigating to URL:', url);
    await page.goto(url, { waitUntil: "networkidle", timeout: 60000 });

    console.log('Waiting for critical elements...');
    await page.waitForSelector('div[data-testid="book-it-default"]', { timeout: 30000 }).catch(() => {
      console.log('Book-it default container not found');
    });
    await page.waitForSelector('div[data-section-id="REVIEWS_DEFAULT"]', { timeout: 30000 }).catch(() => {
      console.log('Reviews section not found');
    });

    // Scroll to load all content
    console.log('Scrolling to load lazy content...');
    await page.evaluate(async () => {
      for (let i = 0; i < 10; i++) { // Increased to 10 scrolls
        window.scrollTo(0, document.body.scrollHeight);
        await new Promise(resolve => setTimeout(resolve, 1500));
      }
    });

    console.log('Scraping data...');
    const scrapedData: ScrapedData = await page.evaluate(() => {
      // Title
      const title =
        document.querySelector('h1[class*="_1xxxxxx"]')?.textContent ||
        document.querySelector('[data-testid="listing-title"]')?.textContent ||
        'No title found';

      // Description
      const description =
        document.querySelector('div[data-section-id="DESCRIPTION_DEFAULT"] span')?.textContent ||
        Array.from(document.querySelectorAll('div[data-section-id="DESCRIPTION_DEFAULT"] span'))
          .map(el => el.textContent)
          .join(' ') ||
        'No description found';

      // Amenities
      const amenities = Array.from(
        document.querySelectorAll('div[data-section-id="AMENITIES_DEFAULT"] div[class*="_xxxxxx"]')
      )
        .map(el => el.textContent?.trim())
        .filter(Boolean) as string[];

      // Price
      const price =
        document.querySelector('div[data-testid="book-it-default"] span._1qgfaxb1')?.textContent || // "$456 per night"
        document.querySelector('div[data-testid="book-it-default"] span._hb913q')?.textContent || // "$456"
        document.querySelector('span[class*="_tyxjp1"]')?.textContent ||
        'Price not found';

      // Images
      const images = Array.from(
        document.querySelectorAll('img[src*="airbnb"], img[src*="akamai"]')
      )
        .map(img => img.src)
        .filter(Boolean)
        .slice(0, 5);

      // Reviews
      const reviews = Array.from(
        document.querySelectorAll(
          'div[data-section-id="REVIEWS_DEFAULT"] div[data-testid="review-card"] span[class*="_xxxxxx"]'
        )
      )
        .map(el => el.textContent)
        .filter((text): text is string => text !== null && text !== undefined && text.length > 20)
        .slice(0, 3);

      return {
        title,
        description,
        amenities,
        price,
        images,
        reviews: reviews.length ? reviews : ['No reviews found'],
      };
    });

    console.log('Scraped data:', scrapedData);

    // Log full HTML if price or reviews are missing
    if (scrapedData.price === 'Price not found' || scrapedData.reviews[0] === 'No reviews found') {
      const html = await page.content();
      console.log('Full HTML (price/reviews missing):', html);
    }

    // Build the prompt
    const prompt = `
Analyze this Airbnb listing:
Title: ${scrapedData.title}
Price: ${scrapedData.price}
Description: ${scrapedData.description}
Amenities: ${scrapedData.amenities.join(', ')}
Images: ${scrapedData.images.join(', ')}
Reviews: ${scrapedData.reviews.join(', ')}

Please provide a comprehensive analysis in the following format:

Listing Name: [Provide a concise name for this listing based on its title and features]

Overall Score: [Provide a score from 0-100 based on the overall quality of the listing]

Pros:
- [Strength #1]
- [Strength #2]
- [Strength #3]

Cons:
- [Concern #1]
- [Concern #2]
- [Concern #3]

Recommendations:
- [Recommendation #1]
- [Recommendation #2]
- [Recommendation #3]
    `;

    console.log('Calling OpenAI...');
    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [{ role: "user", content: prompt }],
      temperature: 0.7,
    });

    const analysis = completion.choices[0].message.content;
    console.log('OpenAI response:', analysis);

    return NextResponse.json({ rawResponse: analysis });

  } catch (error: unknown) {
    console.error('API error:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Failed to analyze listing" },
      { status: 500 }
    );
  } finally {
    if (browser) {
      console.log('Closing browser...');
      await browser.close();
    }
  }
}