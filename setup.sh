#!/bin/bash

# Check if running with sudo
if [ "$(id -u)" = 0 ]; then
    echo "Please do not run this script with sudo. Run it as a regular user:"
    echo "./setup.sh YOUR_API_KEY"
    exit 1
fi

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

# Detect OS and set profile file
if [[ "$OSTYPE" == "darwin"* ]]; then
    # Create .zshrc if it doesn't exist (macOS default shell)
    if [ ! -f "$HOME/.zshrc" ]; then
        touch "$HOME/.zshrc"
    fi
    PROFILE_FILE="$HOME/.zshrc"
else
    # For Linux, use .bashrc
    PROFILE_FILE="$HOME/.bashrc"
fi

# Install NVM
if [ ! -d "$HOME/.nvm" ]; then
    echo "Installing NVM..."
    curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.40.1/install.sh | bash
    
    # Add NVM to profile if not already there
    if ! grep -q "NVM_DIR" "$PROFILE_FILE"; then
        echo 'export NVM_DIR="$HOME/.nvm"' >> "$PROFILE_FILE"
        echo '[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"' >> "$PROFILE_FILE"
    fi
fi

# Load NVM
export NVM_DIR="$HOME/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"

# Verify NVM is loaded
if ! command -v nvm &> /dev/null; then
    echo "NVM installation failed. Please try these steps manually:"
    echo "1. Close and reopen your terminal"
    echo "2. Run: source $PROFILE_FILE"
    echo "3. Run this script again"
    exit 1
fi

# Install Node.js 18
echo "Installing Node.js 18..."
nvm install 18
nvm use 18
nvm alias default 18

# Verify Node.js and npm are available
if ! command -v node &> /dev/null; then
    echo "Node.js installation failed"
    exit 1
fi

# Install project dependencies
echo "Installing project dependencies..."
npm install

# Install global dependencies
echo "Installing global dependencies..."
npm install -g mocha
npm link

# Create .env file with API key
echo "OPENWEATHER_API_KEY=$1" > .env

echo ""
echo "Setup complete! Please follow these steps:"
echo ""
echo "1. Close and reopen your terminal OR run this command:"
echo "   source $PROFILE_FILE"
echo ""
echo "2. Try the geoloc-util command:"
echo "   geoloc-util -l \"New York City,NY\""
echo ""
echo "3. Run the tests:"
echo "   npm test"