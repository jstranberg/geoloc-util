FROM node:18-slim

WORKDIR /app

# Copy package files and install dependencies
COPY package*.json ./
RUN npm install -g

# Copy app source
COPY . .

ENTRYPOINT ["node", "/app/app/geoloc-util.js"]
