# Geolocation Utility

## Prerequisites

This utility requires a Mac or Linux machine. 

## Installation

In a terminal, run chmod and the setup script with your OpenWeather API key (no quotes):

```bash
chmod +x setup.sh
```

```bash
sh setup.sh YOUR_OPENWEATHER_API_KEY
```
This will:
- Install NVM (if not already installed)
- Install the latest stable version of Node.js 18 and npm (if not already installed)
- Install all required dependencies
- Configure your API key

## Usage

Get geolocation for a city:
```bash
geoloc-util -l "New York City,NY"
```

Get geolocation for a ZIP code:
```bash
geoloc-util -locations "10001"
```

## Development

To run the full test suite:
```bash
npm run test
```

To run the negative validation tests 
```bash
npm run test-negative
```

To run the happy-path tests 
```bash
npm run test-happy
```