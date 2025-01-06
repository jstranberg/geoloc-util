FROM node:18-slim

WORKDIR /app

# Copy package files first for better caching
COPY package*.json ./
RUN npm install

# Copy the rest of the application
COPY . .

# Install globally
RUN npm link

# Create a script to handle both geoloc-util and npm commands
RUN echo '#!/bin/sh\nif [ "$1" = "npm" ]; then\n  exec "$@"\nelse\n  exec geoloc-util "$@"\nfi' > /usr/local/bin/entrypoint.sh && \
    chmod +x /usr/local/bin/entrypoint.sh

ENTRYPOINT ["/usr/local/bin/entrypoint.sh"]
