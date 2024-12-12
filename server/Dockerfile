# Use the official Node.js 18 image as the base
FROM node:18

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application files to the working directory
COPY . .

# Compile TypeScript files
RUN npm run compile

# Ensure todos.json is included in the dist folder
RUN mkdir -p dist/infrastructure/data

# Expose the application port
EXPOSE 8850

# Command to start the application
CMD ["npm", "start"]
