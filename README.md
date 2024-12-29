# Geolocation Utility

## Prerequisites

This utility requires a Mac or Linux machine with Homebrew installed.

If you don't have Homebrew installed, you can get it from [brew.sh](https://brew.sh/), or run this command in a terminal:
```bash
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
```

## Installation

In a terminal, run chmod and the setup script with your OpenWeather API key:

```bash
chmod +x setup.sh
```

```bash
sh setup.sh YOUR_OPENWEATHER_API_KEY
```

This will:
- Install Node.js 18 (if not already installed)
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