#Dockerfile Kasbon Manager

# Node v.22
FROM node:22.0

WORKDIR /app

# Copy the package.json and package-lock.json files to the working directory
COPY package*.json ./

# Copy the rest of the application code to the working directory
COPY . .

# Install dependencies
RUN npm install

# Build the Next.js application
RUN npm run build

# Expose port 3000 to the outside world
EXPOSE 3000

# Start the Next.js application
CMD ["npm", "start"]
