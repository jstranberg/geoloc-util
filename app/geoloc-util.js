#!/usr/bin/env node
const { getCoordinatesByZip, getCoordinatesByLocation, argv } = require('./helper/functions');
require('dotenv').config();

const OPENWEATHER_API_KEY = process.env.OPENWEATHER_API_KEY;

// Process a single location
async function processLocation(location) {
  try {
    const locationStr = String(location);

    // Check for valid location (city,state)
    if (locationStr.includes(',')) {
      const response = await getCoordinatesByLocation(locationStr, argv.limit, OPENWEATHER_API_KEY);
      console.log(JSON.stringify(response));
      return true;
    } 
    // Check for valid zip code 
    else {
      const response = await getCoordinatesByZip(locationStr, argv.limit, OPENWEATHER_API_KEY);
      console.log(JSON.stringify(response));
      return true;
    } 
  } catch (error) {
    console.log(JSON.stringify({ data: { message: error.message }, status: 500 }));
    return true;
  }
}

// Process all locations
async function processLocations(locations) {
  for (const location of locations) {
    await processLocation(location);
  }
}

processLocations(argv.locations);