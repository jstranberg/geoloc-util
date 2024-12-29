const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');
require('dotenv').config();

/**
 * Executes the geolocation utility with the given input
 * @param {string} value - Input value to test
 * @returns {Object} Object containing output and exit code
 */
function executeGeolocUtil(value) {
  try {
    const command = `node app/geoloc-util.js -l ${value}`;
    const rawOutput = execSync(command, {
      encoding: 'utf-8',
      cwd: path.join(__dirname, '../..')
    }).trim();

    // Split output by newlines and parse each JSON response
    const responses = rawOutput.split('\n').map(line => JSON.parse(line));
    
    // If multiple responses, combine the data arrays
    if (responses.length > 1) {
      return {
        status: 200,
        data: responses.map(r => r.data).flat()
      };
    }
    
    // Single response
    return responses[0];
  } catch (error) {
    const errorOutput = error.stderr?.toString() || error.stdout?.toString() || '';
    try {
      return JSON.parse(errorOutput);
    } catch {
      return { 
        data: { message: errorOutput },
        status: 400 
      };
    }
  }
}

function validateOutput(result, expectedStatus, expectedMessage) {
  const statusMatches = result.status === expectedStatus;
  const messageMatches = !expectedMessage || result.data.message === expectedMessage;
  
  return {
    success: statusMatches && messageMatches,
    error: `Expected status ${expectedStatus}, but got ${result.status}. Output: ${JSON.stringify(result.data)}`
  };
}

module.exports = {
  executeGeolocUtil,
  validateOutput
};