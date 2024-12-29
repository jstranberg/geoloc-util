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

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "Node.js is not installed. Installing Node.js 18..."
    if [[ "$OSTYPE" == "darwin"* ]]; then
        # macOS
        brew install node@18
        brew link node@18
    else
        # Linux (assuming Ubuntu/Debian)
        curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
        sudo apt-get install -y nodejs
    fi
else
    # Check Node.js version
    NODE_VERSION=$(node -v | cut -d'v' -f2 | cut -d'.' -f1)
    if [ "$NODE_VERSION" -lt 18 ]; then
        echo "Node.js version is below 18. Installing Node.js 18..."
        if [[ "$OSTYPE" == "darwin"* ]]; then
            brew install node@18
            brew link node@18
        else
            curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
            sudo apt-get install -y nodejs
        fi
    fi
fi

# Check if npm is installed
if ! command -v npm &> /dev/null; then
    echo "npm is not installed. Installing npm..."
    if [[ "$OSTYPE" == "darwin"* ]]; then
        brew install npm
    else
        sudo apt-get install -y npm
    fi
fi

# Create .env file with API key
echo "OPENWEATHER_API_KEY=$1" > .env

# Install dependencies
npm install

echo "Setup complete! Your API key has been saved to .env"