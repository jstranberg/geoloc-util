# Geolocation Utility

## Prerequisites

This utility requires a Mac or Linux machine.

## Installation

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

## Integration Tests

To run the full test suite:
```bash
npm run test
```

To run specific test suites:
```bash
npm run test-negative  # Run negative validation tests
npm run test-happy     # Run positive validation tests