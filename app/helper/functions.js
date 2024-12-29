const axios = require('axios');
const yargs = require('yargs/yargs')
const { hideBin } = require('yargs/helpers')

/**
 * Parses the command-line arguments using yargs
 * @returns {Object} The parsed command-line arguments
 */
const argv = yargs(hideBin(process.argv))
  .usage('Usage: $0 [options]')
  .option('l', {
    alias: 'locations',
    type: 'array',
    desc: 'The US location to search for (city name and state code divided by comma), or zip code',
    optional: false
  })
  .option('limit', {
    type: 'number',
    desc: 'The maximum number of locations to return in the response',
    optional: true,
    default: 1
  })
  .argv;

/**
 * Retrieves geographical coordinates for a given location in the US using OpenWeatherMap's Geocoding API
 * @param {string} location - The location name to search for (city name and state code divided by comma)
 * @param {number} limit - Maximum number of locations to return in the response
 * @param {string} appid - Your OpenWeatherMap API key
 * @returns {Promise<Object>} Object containing location data and API status code
 *                                  Each object includes {data: Array<Object>, status: number}
 *                                  Each location object includes {name, lat, lon, country, state}
 * @throws {Error} Throws an error if the API request fails
 * @example
 * // Get coordinates for New York City, NY
 * const coords = await getCoordinatesByLocation('New York City,NY', 1, 'your-api-key');
 */
async function getCoordinatesByLocation(location, limit, appid) {
  let config = {
    method: 'get',
    url: `http://api.openweathermap.org/geo/1.0/direct?q=${location},US&limit=${limit}&appid=${appid}`,
    headers: { }
  };

  try {
    const response = await axios.request(config);
    return { data: response.data, status: response.status };
  } catch (error) {
    return { data: error.response?.data, status: error.response?.status || 400 };
  }
}

/**
 * Retrieves geographical coordinates for a given zip code using OpenWeatherMap's Geocoding API
 * @param {string} zip - The zip code to search for
 * @param {number} limit - Maximum number of locations to return in the response
 * @param {string} appid - Your OpenWeatherMap API key
 * @returns {Promise<Object>} Object containing location data and API status code
 *                                  Each object includes {data: Array<Object>, status: number}
 *                                  Each location object includes {name, lat, lon, country, state}
 * @throws {Error} Throws an error if the API request fails
 * @example
 * // Get coordinates for New York City, NY
 * const coords = await getCoordinatesByZip('10001', 1, 'your-api-key');
 */
async function getCoordinatesByZip(zip, limit, appid) {
  let config = {
    method: 'get',
    url: `http://api.openweathermap.org/geo/1.0/zip?zip=${zip}&limit=${limit}&appid=${appid}`,
    headers: { }
  };

  try {
    const response = await axios.request(config);
    return { data: response.data, status: response.status };
  } catch (error) {
    return { data: error.response?.data, status: error.response?.status || 400 };
  }
}

module.exports = {
  getCoordinatesByLocation,
  getCoordinatesByZip,
  argv
};