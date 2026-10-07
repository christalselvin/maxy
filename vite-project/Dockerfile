# Use the latest Node.js image
FROM node:23-alpine

# Set the working directory inside the container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code to the working directory
COPY . .

# Build the Vite project
RUN npm run build

# Install 'serve' globally (optional for serving production builds)
RUN npm install -g serve

# Expose the port Vite's dev server or production server will run on
EXPOSE 4173

# Run the Vite-built app in production
CMD ["serve", "-s", "dist", "-l", "4173"]
