# Use the official Node.js image with a lightweight alpine base
FROM node:18-alpine

# Set the working directory inside the container
WORKDIR /usr/src/app

# Copy the package.json and package-lock.json (if available) for caching dependencies
COPY package*.json ./

# Install dependencies (including TypeScript if needed)
RUN npm install

# Install TypeScript globally if you don't have it listed as a dev dependency
RUN npm install -g typescript

# Copy the rest of the application code into the container
COPY . .

# Build TypeScript files to the 'dist' folder
RUN npx tsc

# Expose the port that your application will run on (e.g., 3000)
EXPOSE 3000

# Command to run the compiled JavaScript from the dist folder
CMD ["node", "dist/server.js"]
