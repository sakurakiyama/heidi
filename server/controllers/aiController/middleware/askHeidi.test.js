import httpMocks from 'node-mocks-http';
import askHeidi from './askHeidi.js';

describe('askHeidi', () => {
  let req, res;

  beforeEach(() => {
    req = httpMocks.createRequest();
    res = httpMocks.createResponse();
    res.locals = { review: {} };
  });

  const testAskHeidi = async (requestBody) => {
    req.body.message = requestBody;
    await askHeidi(req, res, (error) => {
      expect(error).toBeDefined();
      expect(error.message).toEqual({
        error: 'Unable to ask Heidi a question',
      });
    });
  };

  it('it returns an error when the request body is a number', async () => {
    await testAskHeidi(1);
  });

  it('it returns an error when the request body is null', async () => {
    await testAskHeidi(null);
  });

  it('it returns an error when the request body is an object', async () => {
    await testAskHeidi({ test: 'Not valid' });
  });

  it('it returns an error when the request body is an array', async () => {
    await testAskHeidi([]);
  });

  it('it returns a successful response when the request body is a string', async () => {
    req.body.message = 'Caymus Napa Valley Cabernet Sauvignon 2021';
    await askHeidi(req, res, (error) => {
      expect(res.locals.review).toBeDefined();
      expect(res.statusCode).toBe(200);
      expect(error).toBeUndefined();
    });
  });
});
