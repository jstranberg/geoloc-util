const { expect } = require('chai');
const { executeGeolocUtil, validateOutput } = require('./helper/functions');
const responses = require('./data/testValidationresponses.json');

describe('geoloc-util', () => {
  describe('Negative validation with invalid inputs:', () => {

    const notFoundValues = [
      null, undefined, NaN, 'null', 'NaN', 'undefined', ',,', '1,2,3', '[]', '{}', '-1', '1.1', 'SELECT * FROM locations'
    ];

    notFoundValues.forEach((value) => {
      it(`"${value}" returns not found error`, () => {
        const result = executeGeolocUtil(value);
        const validation = validateOutput(result, 
          parseInt(responses.errors.notFound.cod),
          responses.errors.notFound.message
        );
        expect(validation.success, validation.error).to.be.true;
      });
    });
    
    const invalidZipValues = ['0', '0.0', '1.0', '1'];
    invalidZipValues.forEach((value) => {
      it(`"${value}" returns invalid zip error`, () => {
        const result = executeGeolocUtil(value);
        const validation = validateOutput(result, 
          parseInt(responses.errors.invalidZip.cod), 
          responses.errors.invalidZip.message
        );
        expect(validation.success, validation.error).to.be.true;
      });
    });
  });

  describe('Positive validation with valid inputs:', () => {
    it('should return proper structure for zip code', () => {
      const result = executeGeolocUtil('10001');

      expect(result.exitCode).to.equal(200);
      expect(result.output).to.deep.equal(responses.success.zip);
      expect(typeof result.output === 'object' && result.output !== null).to.be.true;
    });

    it('should return proper structure for city,state', () => {
      const result = executeGeolocUtil('"Johnson City, TN"');

      expect(result.exitCode).to.equal(200);
      expect(result.output).to.deep.equal(responses.success.location);
      expect(Array.isArray(result.output)).to.be.true;
    });

    it('should return proper structure for multiple valid zip and city,state params', () => {
      const result = executeGeolocUtil('"Johnson City, TN" "10001"');

      expect(result.exitCode).to.equal(200);
      expect(result.output[0]).to.deep.equal(responses.success.location[0]);
      expect(result.output[1]).to.deep.equal(responses.success.zip);
    });
  });
});