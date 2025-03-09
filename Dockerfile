# Use Node.js 20 with Debian Bullseye as the base image
FROM node:20-bullseye

# Install Google Chrome
RUN apt-get update \
    && apt-get install -y wget gnupg \
    && wget -q -O /usr/share/keyrings/google-chrome-keyring.gpg https://dl-ssl.google.com/linux/linux_signing_key.pub \
    && echo "deb [signed-by=/usr/share/keyrings/google-chrome-keyring.gpg] http://dl.google.com/linux/chrome/deb/ stable main" | tee /etc/apt/sources.list.d/google-chrome.list \
    && apt-get update \
    && apt-get install -y google-chrome-stable \
    --no-install-recommends \
    && chmod -R 777 /usr/bin/google-chrome \
    && rm -rf /var/lib/apt/lists/*

# Set working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package.json package-lock.json ./

# Install dependencies
RUN npm install --omit=dev

# Copy the rest of the application
COPY . .

# Build the Next.js application
RUN npm run build

# Set Puppeteer environment variables
ENV PUPPETEER_SKIP_CHROMIUM_DOWNLOAD=true \
    PUPPETEER_EXECUTABLE_PATH=/usr/bin/google-chrome

# Expose port
EXPOSE 3000

# Start the application
CMD ["npm", "start"]
