const { expect } = require('chai');
const { executeGeolocUtil, validateOutput } = require('./helper/functions');
const responses = require('./data/testValidationResponses.json');

describe('geoloc-util', () => {
  describe('Negative validation with invalid inputs:', () => {
    const invalidLocationValues = [
      null, undefined, NaN, -1,',,', '1,2,3', 1.1,
      '00000', 'abc123', '123', '123456', 'abcde'
    ].map(String); 
    
    invalidLocationValues.forEach((value) => {
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