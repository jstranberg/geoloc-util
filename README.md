# Geolocation Utility

## Prerequisites

This utility requires a Mac or Linux machine. 

## Installation

There are two methods to install this utility:

1. Use Docker, or
2. Run the setup script

### Method 1: Docker Installation
In a terminal, navigate to the root directory of this repository and run the following commands:

1. Export your OpenWeather API key:
```bash
export OPENWEATHER_API_KEY=your_api_key
```

2. Create aliases for geoloc-util and geoloc-npm:
```bash
alias geoloc-util='docker-compose run --rm geoloc-util'
alias npm='docker-compose run --rm npm'
```

3. Start the service:
```bash
docker-compose up -d
```



### Method 2: Setup script

In a terminal, run chmod and the setup script with your OpenWeather API key (no quotes):

```bash
chmod +x setup.sh
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
geoloc-util --locations "10001"
```

Get geolocations for multiple locations and ZIP codes:
```bash
geoloc-util --locations "Madison, WI" "12345" "Chicago, IL" "10001"
```

## Development

To run the full test suite:
```bash
npm run test
```

To run specific test suites:
```bash
npm run test-negative  # Run negative validation tests
npm run test-happy     # Run positive validation tests
```