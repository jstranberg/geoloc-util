const { expect } = require('chai');
const { executeGeolocUtil, validateOutput } = require('./helper/functions');
const responses = require('./data/testValidationResponses.json');

describe('geoloc-util', () => {
  describe('Negative validation with invalid inputs:', () => {
    const falseyValues = [ null, undefined, NaN, -0, 0n, ``, !NaN ];
    
    falseyValues.forEach((value) => {
      it(`"${value}" returns not found error`, () => {
        let notFound = responses.errors.notFound;
        
        const result = executeGeolocUtil(value);
        const validation = validateOutput(result, 
          parseInt(notFound.cod),
          notFound.message
        );
        expect(validation.success, validation.error).to.be.true;
      });
    });
    
    const invalidZipValues = ['0', '0.0', '1.0', '1', 'null', 'NaN', 'undefined', ',,', '1,2,3', '[]', '{}', '-1', '1.1', 'SELECT * FROM locations'];
    invalidZipValues.forEach((value) => {
      it(`"${value}" returns invalid zip error`, () => {
        let invalidZip = responses.errors.invalidZip;

        const result = executeGeolocUtil(value);
        const validation = validateOutput(result, 
          parseInt(invalidZip.cod),
          invalidZip.message
        );
        expect(validation.success, validation.error).to.be.true;
      });
    });
  });

  describe('Positive validation with valid inputs:', () => {
    it('should return proper structure for zip code', () => {
      const result = executeGeolocUtil('10001');

      expect(result.status).to.equal(200);
      expect(result.data).to.deep.equal(responses.success.zip.data);
      expect(typeof result.data === 'object' && result.data !== null).to.be.true;
    });

    it('should return proper structure for city, state', () => {
      const result = executeGeolocUtil('"Johnson City, TN"');

      expect(result.status).to.equal(200);
      expect(result.data[0]).to.deep.equal(responses.success.location.data[0]);
      expect(Array.isArray(result.data)).to.be.true;
    });

    it('should return proper structure for multiple valid zip and city,state params', () => {
      const result = executeGeolocUtil('"Johnson City, TN" "10001"');

      expect(result.status).to.equal(200);
      expect(result.data[0]).to.deep.equal(responses.success.location.data[0]);
      expect(result.data[1]).to.deep.equal(responses.success.zip.data);
      expect(Array.isArray(result.data)).to.be.true;
    });
  });
});