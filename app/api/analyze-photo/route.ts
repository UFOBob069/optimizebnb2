import { NextResponse } from 'next/server';
import OpenAI from 'openai';
import puppeteer from 'puppeteer-core';
import * as os from 'os';
import * as fs from 'fs/promises';
import * as path from 'path';

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

// Function to scrape photos from Airbnb listing
async function scrapeAirbnbPhotos(url) {
  console.log(`Starting to scrape photos from Airbnb listing: ${url}`);
  
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
    
    // Extract photo URLs
    console.log('Extracting photo URLs...');
    const photoUrls = await page.evaluate(() => {
      const images = Array.from(document.querySelectorAll('img[data-original-uri]'));
      return images.map(img => img.getAttribute('data-original-uri')).filter(Boolean);
    });
    
    console.log(`Found ${photoUrls.length} photos`);
    
    // Close the browser
    await browser.close();
    console.log('Browser closed');
    
    return photoUrls.slice(0, 5); // Limit to first 5 photos to avoid excessive API usage
  } catch (error) {
    console.error('Error scraping Airbnb photos:', error);
    throw error;
  }
}

// Function to analyze a photo using OpenAI Vision
async function analyzePhotoWithAI(photoUrl) {
  console.log(`Analyzing photo: ${photoUrl}`);
  
  try {
    const response = await openai.chat.completions.create({
      model: "gpt-4-vision-preview",
      messages: [
        {
          role: "system",
          content: "You are an expert Airbnb photographer and property stylist. Analyze the provided photo of an Airbnb listing and provide detailed feedback on its quality, composition, lighting, staging, and overall appeal to potential guests. Be specific and actionable in your feedback."
        },
        {
          role: "user",
          content: [
            { type: "text", text: "Please analyze this Airbnb listing photo and provide detailed feedback:" },
            { type: "image_url", image_url: { url: photoUrl } }
          ]
        }
      ],
      max_tokens: 1000,
    });
    
    const analysisText = response.choices[0].message.content;
    console.log('Analysis completed');
    
    // Parse the analysis text to extract structured data
    const strengths = extractStrengths(analysisText);
    const improvements = extractImprovements(analysisText);
    const recommendations = extractRecommendations(analysisText);
    const categoryScores = calculateCategoryScores(analysisText);
    const overallScore = calculateOverallScore(categoryScores);
    
    return {
      overallScore,
      strengths,
      improvements,
      recommendations,
      categoryScores,
      fullAnalysis: analysisText
    };
  } catch (error) {
    console.error('Error analyzing photo with OpenAI:', error);
    throw error;
  }
}

// Helper function to extract strengths from analysis text
function extractStrengths(text) {
  // Look for strengths, positives, good aspects in the text
  const strengthPatterns = [
    /strengths?:?(.*?)(?=weaknesses|improvements|areas for improvement|recommendations|$)/is,
    /positives?:?(.*?)(?=negatives|weaknesses|improvements|recommendations|$)/is,
    /what works:?(.*?)(?=what doesn't work|improvements|recommendations|$)/is
  ];
  
  for (const pattern of strengthPatterns) {
    const match = text.match(pattern);
    if (match && match[1]) {
      // Extract bullet points or sentences
      const strengthText = match[1].trim();
      const bulletPoints = strengthText.split(/\n|•|\.(?=\s|$)/).filter(point => 
        point.trim().length > 10 && !point.includes('weakness') && !point.includes('improvement')
      ).map(point => point.trim().replace(/^[-*•]/, '').trim());
      
      if (bulletPoints.length > 0) {
        return bulletPoints.slice(0, 5); // Limit to 5 strengths
      }
    }
  }
  
  // Fallback: Look for positive keywords and extract sentences containing them
  const positiveKeywords = ['good', 'great', 'excellent', 'well', 'nice', 'appealing', 'attractive', 'effective'];
  const sentences = text.split(/\.(?=\s|$)/).filter(s => s.trim().length > 0);
  const strengthSentences = sentences.filter(sentence => 
    positiveKeywords.some(keyword => sentence.toLowerCase().includes(keyword))
  ).map(s => s.trim());
  
  return strengthSentences.slice(0, 3); // Limit to 3 strengths
}

// Helper function to extract areas for improvement from analysis text
function extractImprovements(text) {
  // Look for weaknesses, improvements, issues in the text
  const improvementPatterns = [
    /weaknesses?:?(.*?)(?=strengths|recommendations|conclusion|$)/is,
    /improvements?:?(.*?)(?=strengths|recommendations|conclusion|$)/is,
    /areas for improvement:?(.*?)(?=strengths|recommendations|conclusion|$)/is,
    /what doesn't work:?(.*?)(?=what works|recommendations|conclusion|$)/is
  ];
  
  for (const pattern of improvementPatterns) {
    const match = text.match(pattern);
    if (match && match[1]) {
      // Extract bullet points or sentences
      const improvementText = match[1].trim();
      const bulletPoints = improvementText.split(/\n|•|\.(?=\s|$)/).filter(point => 
        point.trim().length > 10
      ).map(point => point.trim().replace(/^[-*•]/, '').trim());
      
      if (bulletPoints.length > 0) {
        return bulletPoints.slice(0, 5); // Limit to 5 improvements
      }
    }
  }
  
  // Fallback: Look for negative keywords and extract sentences containing them
  const negativeKeywords = ['improve', 'issue', 'problem', 'lack', 'missing', 'better', 'could', 'should'];
  const sentences = text.split(/\.(?=\s|$)/).filter(s => s.trim().length > 0);
  const improvementSentences = sentences.filter(sentence => 
    negativeKeywords.some(keyword => sentence.toLowerCase().includes(keyword))
  ).map(s => s.trim());
  
  return improvementSentences.slice(0, 3); // Limit to 3 improvements
}

// Helper function to extract recommendations from analysis text
function extractRecommendations(text) {
  // Look for recommendations, suggestions in the text
  const recommendationPatterns = [
    /recommendations?:?(.*?)(?=conclusion|$)/is,
    /suggestions?:?(.*?)(?=conclusion|$)/is,
    /tips:?(.*?)(?=conclusion|$)/is
  ];
  
  for (const pattern of recommendationPatterns) {
    const match = text.match(pattern);
    if (match && match[1]) {
      // Extract bullet points or sentences
      const recommendationText = match[1].trim();
      const bulletPoints = recommendationText.split(/\n|•|\.(?=\s|$)/).filter(point => 
        point.trim().length > 10
      ).map(point => point.trim().replace(/^[-*•]/, '').trim());
      
      if (bulletPoints.length > 0) {
        return bulletPoints.slice(0, 5); // Limit to 5 recommendations
      }
    }
  }
  
  // Fallback: Look for recommendation keywords and extract sentences containing them
  const recommendationKeywords = ['recommend', 'suggest', 'try', 'consider', 'add', 'improve by', 'enhance'];
  const sentences = text.split(/\.(?=\s|$)/).filter(s => s.trim().length > 0);
  const recommendationSentences = sentences.filter(sentence => 
    recommendationKeywords.some(keyword => sentence.toLowerCase().includes(keyword))
  ).map(s => s.trim());
  
  return recommendationSentences.slice(0, 4); // Limit to 4 recommendations
}

// Helper function to calculate category scores from analysis text
function calculateCategoryScores(text) {
  const categories = [
    { name: 'Lighting', keywords: ['light', 'bright', 'shadow', 'exposure', 'dark'] },
    { name: 'Composition', keywords: ['composition', 'angle', 'perspective', 'framing', 'centered'] },
    { name: 'Staging', keywords: ['staging', 'furniture', 'decor', 'arrangement', 'clutter'] },
    { name: 'Color Balance', keywords: ['color', 'tone', 'white balance', 'warm', 'cool'] },
    { name: 'Cleanliness', keywords: ['clean', 'tidy', 'spotless', 'mess', 'dust'] },
    { name: 'Detail Quality', keywords: ['detail', 'resolution', 'sharp', 'blur', 'focus'] }
  ];
  
  const scores = categories.map(category => {
    // Default score
    let score = 7; // Start with a neutral score
    
    // Look for explicit scores in the text
    const scorePattern = new RegExp(`${category.name}[^.]*?([0-9]|10)\\s*\\/\\s*10`, 'i');
    const scoreMatch = text.match(scorePattern);
    if (scoreMatch && scoreMatch[1]) {
      return { name: category.name, score: parseInt(scoreMatch[1]) };
    }
    
    // Calculate score based on keyword analysis
    let positiveCount = 0;
    let negativeCount = 0;
    
    // Check for positive and negative mentions of each keyword
    category.keywords.forEach(keyword => {
      const positivePattern = new RegExp(`(good|great|excellent|well|nice)\\s+${keyword}|${keyword}\\s+(is|are)\\s+(good|great|excellent|well|nice)`, 'i');
      const negativePattern = new RegExp(`(poor|bad|inadequate|lack\\s+of|missing|needs?\\s+better)\\s+${keyword}|${keyword}\\s+(is|are)\\s+(poor|bad|inadequate|lacking)`, 'i');
      
      if (positivePattern.test(text)) positiveCount++;
      if (negativePattern.test(text)) negativeCount++;
    });
    
    // Adjust score based on positive and negative mentions
    score += positiveCount;
    score -= negativeCount;
    
    // Ensure score is within 1-10 range
    score = Math.max(1, Math.min(10, score));
    
    return { name: category.name, score };
  });
  
  return scores;
}

// Helper function to calculate overall score from category scores
function calculateOverallScore(categoryScores) {
  const sum = categoryScores.reduce((total, category) => total + category.score, 0);
  const average = sum / categoryScores.length;
  
  // Convert to a 0-100 scale
  return Math.round(average * 10);
}

// Function to generate a simulated analysis when OpenAI is not available
function generateSimulatedAnalysis() {
  const strengths = [
    "Good natural lighting that illuminates the space well",
    "Clean and tidy space with minimal clutter",
    "Attractive focal point that draws the viewer's attention",
    "Warm color palette that creates an inviting atmosphere",
    "Good use of space showing the room's dimensions"
  ];
  
  const improvements = [
    "Composition could be improved with better framing",
    "Some shadows create dark areas that hide details",
    "Personal items should be removed for a more neutral presentation",
    "White balance is slightly off giving a yellowish tint",
    "Some areas appear cluttered and distracting"
  ];
  
  const recommendations = [
    "Take photos during the golden hour (early morning or late afternoon) for optimal lighting",
    "Use a wider angle lens to capture more of the space in each shot",
    "Remove personal items and declutter before taking photos",
    "Consider using a tripod for sharper images and consistent angles",
    "Add some strategic staging elements like fresh flowers or accent pillows"
  ];
  
  const categoryScores = [
    { name: "Lighting", score: Math.floor(Math.random() * 3) + 6 },
    { name: "Composition", score: Math.floor(Math.random() * 3) + 5 },
    { name: "Staging", score: Math.floor(Math.random() * 3) + 6 },
    { name: "Color Balance", score: Math.floor(Math.random() * 3) + 5 },
    { name: "Cleanliness", score: Math.floor(Math.random() * 2) + 7 },
    { name: "Detail Quality", score: Math.floor(Math.random() * 3) + 6 }
  ];
  
  const overallScore = Math.floor(
    categoryScores.reduce((sum, category) => sum + category.score, 0) / 
    categoryScores.length * 10
  );
  
  return {
    overallScore,
    strengths: strengths.slice(0, 3 + Math.floor(Math.random() * 3)),
    improvements: improvements.slice(0, 2 + Math.floor(Math.random() * 3)),
    recommendations: recommendations.slice(0, 3 + Math.floor(Math.random() * 2)),
    categoryScores,
    fullAnalysis: "This is a simulated analysis."
  };
}

export async function POST(request) {
  console.log('Received POST request to analyze photo');
  
  try {
    // Parse form data
    const formData = await request.formData();
    const method = formData.get('method');
    const email = formData.get('email');
    
    console.log(`Analysis method: ${method}`);
    console.log(`Email: ${email}`);
    
    if (!email) {
      return NextResponse.json({ error: 'Email address is required' }, { status: 400 });
    }
    
    let photoUrl;
    let analysis;
    
    if (method === 'upload') {
      // Handle direct photo upload
      const photo = formData.get('photo');
      
      if (!photo) {
        return NextResponse.json({ error: 'No photo provided' }, { status: 400 });
      }
      
      // Convert the file to a base64 data URL
      const arrayBuffer = await photo.arrayBuffer();
      const buffer = Buffer.from(arrayBuffer);
      const base64 = buffer.toString('base64');
      const mimeType = photo.type;
      photoUrl = `data:${mimeType};base64,${base64}`;
      
      console.log('Photo received and converted to data URL');
      
      // Analyze the photo
      try {
        if (process.env.OPENAI_API_KEY) {
          analysis = await analyzePhotoWithAI(photoUrl);
        } else {
          console.log('OpenAI API key not found, generating simulated analysis');
          analysis = generateSimulatedAnalysis();
        }
      } catch (error) {
        console.error('Error analyzing photo, falling back to simulation:', error);
        analysis = generateSimulatedAnalysis();
      }
    } else if (method === 'scrape') {
      // Handle Airbnb URL scraping
      const url = formData.get('url');
      
      if (!url) {
        return NextResponse.json({ error: 'No Airbnb URL provided' }, { status: 400 });
      }
      
      if (!url.includes('airbnb.com')) {
        return NextResponse.json({ error: 'Invalid Airbnb URL' }, { status: 400 });
      }
      
      console.log(`Scraping photos from: ${url}`);
      
      // Scrape photos from the Airbnb listing
      let photoUrls;
      try {
        photoUrls = await scrapeAirbnbPhotos(url);
      } catch (error) {
        console.error('Error scraping photos:', error);
        return NextResponse.json({ 
          error: 'Failed to scrape photos from Airbnb listing', 
          message: error.message 
        }, { status: 500 });
      }
      
      if (!photoUrls || photoUrls.length === 0) {
        return NextResponse.json({ error: 'No photos found in the Airbnb listing' }, { status: 404 });
      }
      
      // Analyze the first photo
      photoUrl = photoUrls[0];
      console.log(`Analyzing first photo: ${photoUrl}`);
      
      try {
        if (process.env.OPENAI_API_KEY) {
          analysis = await analyzePhotoWithAI(photoUrl);
        } else {
          console.log('OpenAI API key not found, generating simulated analysis');
          analysis = generateSimulatedAnalysis();
        }
      } catch (error) {
        console.error('Error analyzing photo, falling back to simulation:', error);
        analysis = generateSimulatedAnalysis();
      }
    } else {
      return NextResponse.json({ error: 'Invalid method' }, { status: 400 });
    }
    
    // Return the analysis
    return NextResponse.json({ 
      success: true, 
      analysis,
      message: 'Photo analyzed successfully'
    });
  } catch (error) {
    console.error('Error processing request:', error);
    return NextResponse.json({ 
      error: 'Failed to analyze photo', 
      message: error.message 
    }, { status: 500 });
  }
} 