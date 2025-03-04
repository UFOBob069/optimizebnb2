# OptimizeBnb.AI

OptimizeBnb.AI is a comprehensive platform designed to help Airbnb hosts optimize their listings, improve guest experiences, and increase bookings through AI-powered tools and analysis.

## Features

- **Listing Analysis**: Get comprehensive feedback on your Airbnb listing
- **Photo Analysis**: Receive professional feedback on your listing photos
- **SEO Optimization**: Optimize your title and description for better search visibility
- **Review Analysis**: Analyze guest reviews for sentiment and improvement opportunities
- **Welcome Guide Generator**: Create custom welcome guides for your guests
- **Pricing Strategy**: Get data-driven pricing recommendations

## Tech Stack

- **Framework**: Next.js 14
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **AI Integration**: OpenAI API
- **Web Scraping**: Playwright

## Getting Started

### Prerequisites

- Node.js 18+ and npm

### Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/optimizebnb-ai.git
cd optimizebnb-ai
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env.local` file in the root directory with your OpenAI API key:
```
OPENAI_API_KEY=your_api_key_here
```

4. Run the development server:
```bash
npm run dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser to see the application.

## Project Structure

- `app/` - Next.js App Router pages and components
- `app/api/` - API routes for backend functionality
- `public/` - Static assets
- `utils/` - Utility functions and helpers
- `types/` - TypeScript type definitions

## Main Pages

- `/` - Homepage with feature overview
- `/analyze` - Main listing analysis page
- `/welcome-guide` - Welcome guide generator
- `/photo-analysis` - Photo analysis and recommendations
- `/seo-optimization` - Title and description optimization
- `/review-analysis` - Guest review sentiment analysis

## API Endpoints

- `/api/analyze` - Analyzes an Airbnb listing URL
- `/api/photos` - Analyzes listing photos
- `/api/reviews` - Analyzes guest reviews
- `/api/seo` - Provides SEO recommendations
- `/api/welcome-guide` - Generates a custom welcome guide

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgements

- OpenAI for providing the AI capabilities
- Next.js team for the amazing framework
- Tailwind CSS for the styling utilities
