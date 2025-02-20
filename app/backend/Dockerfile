# Use Node.js Image to Run the Backend
FROM node:18

# Set Working Directory
WORKDIR /app

# Copy Package Files and Install Dependencies
COPY package.json package-lock.json ./
RUN npm install

# Copy Backend Files
COPY . .

# Expose Port
EXPOSE 8081

# Start the Node.js Server
CMD ["node", "server.js"]
