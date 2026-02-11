FROM node:18-alpine

WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy application code
COPY . .

# Expose port for Expo web
EXPOSE 8081 19000 19001

# Start Expo
CMD ["npm", "start"]
