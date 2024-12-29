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

    
    // Split by newline and parse each JSON response
    const responses = rawOutput.split('\n').map(line => JSON.parse(line));
    
    // If any response has a non-200 status, return that error
    const errorResponse = responses.find(r => r.status !== 200);
    if (errorResponse) {
      return { output: errorResponse.data, exitCode: errorResponse.status };
    }
    
    // For single responses, don't wrap in array
    if (responses.length === 1) {
      return { output: responses[0].data, exitCode: 200 };
    }
    
    // For multiple responses, combine them
    const output = responses.map(r => r.data).flat();
    return { output, exitCode: 200 };
  } catch (error) {
    const errorOutput = error.stderr?.toString() || error.stdout?.toString() || '';
    console.log('Error output:', errorOutput);
    try {
      const { data, status } = JSON.parse(errorOutput);
      return { output: data, exitCode: status };
    } catch {
      return { 
        output: { message: errorOutput },
        exitCode: 400 
      };
    }
  }
}

function validateOutput(result, expectedStatus, expectedMessage) {
  const actualMessage = result.output.message || result.output.cod;
  const statusMatches = result.exitCode === expectedStatus;
  const messageMatches = !expectedMessage || actualMessage === expectedMessage;
  
  return {
    success: statusMatches && messageMatches,
    error: `Expected status ${expectedStatus}, but got ${result.exitCode}. Output: ${JSON.stringify(result.output)}`
  };
}

module.exports = {
  executeGeolocUtil,
  validateOutput
};