#!/bin/bash

# Check if API key is provided
if [ -z "$1" ]; then
    echo ""
    echo "######################################################"
    echo "Please provide your OpenWeather API key as an argument"
    echo "Usage: ./setup.sh YOUR_API_KEY"
    echo "######################################################"
    echo ""
    exit 1
fi

# Check if NVM is installed
if ! command -v nvm &> /dev/null; then
    echo "NVM is not installed. Installing NVM..."
    curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.40.1/install.sh | bash
    
    # Load NVM
    export NVM_DIR="$HOME/.nvm"
    [ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"
    [ -s "$NVM_DIR/bash_completion" ] && \. "$NVM_DIR/bash_completion"
fi

# Install Node.js 18 using NVM
echo "Installing Node.js 18 using NVM..."
nvm install 18
nvm use 18

# npm is included with Node.js installation through NVM

# Create .env file with API key
echo "OPENWEATHER_API_KEY=$1" > .env

# Install dependencies
npm install

echo "Setup complete! Your API key has been saved to .env"
echo "Run 'npm run test' to validate the setup and run the test suite"