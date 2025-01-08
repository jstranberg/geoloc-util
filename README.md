# Geolocation Utility

## Prerequisites

This utility requires Docker and Docker Compose.

## Installation

There are two methods to install this utility:

1. Docker (recommended), or
2. Run the setup script (local development only)

### Method 1: Docker Installation
In a terminal, navigate to the root directory of this repository and run the following commands:

1. Export your OpenWeather API key:
```bash
export OPENWEATHER_API_KEY=your_api_key
```

2. Start the service:
```bash
docker compose up -d
```

3. Create aliases for convenience (optional):
```bash
# For local development
alias geoloc-util='docker compose run --rm geoloc-util'
alias npm='docker compose run --rm npm'
```

If you don't want to use aliases, you can run commands directly with Docker Compose:
```bash
docker compose run --rm geoloc-util [command]
docker compose run --rm npm [command]
```

### Method 2: Setup script (Local Development)

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
# With alias
geoloc-util -l "New York City,NY"

# Without alias
docker compose run --rm geoloc-util -l "New York City,NY"
```

Get geolocation for a ZIP code:
```bash
# With alias
geoloc-util --locations "10001"

# Without alias
docker compose run --rm geoloc-util --locations "10001"
```

Get geolocations for multiple locations and ZIP codes:
```bash
# With alias
geoloc-util --locations "Madison, WI" "12345" "Chicago, IL" "10001"

# Without alias
docker compose run --rm geoloc-util --locations "Madison, WI" "12345" "Chicago, IL" "10001"
```

## Integration Tests

To run the full test suite:
```bash
# With alias
npm run test

# Without alias
docker compose run --rm npm run test
```

To run specific test suites:
```bash
# With alias
npm run test-negative  # Run negative validation tests
npm run test-happy     # Run positive validation tests

# Without alias
docker compose run --rm npm run test-negative
docker compose run --rm npm run test-happy