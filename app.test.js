const request = require('supertest');
const app = require('./app'); // Import your app

describe('GET /calculate-temperature', () => {
  it('should convert 100°F to Celsius', async () => {
    const response = await request(app).get('/calculate-temperature?value=100&scale=F');
    expect(response.statusCode).toBe(200);
    expect(response.body.convertedValue).toBe('37.78'); // F to C for 100°F
 });

  it('should return the converted temperature from Celsius to Fahrenheit', async () => {
    const response = await request(app)
      .get('/calculate-temperature')
      .query({ value: 37, scale: 'C' });

    expect(response.statusCode).toBe(200);
    expect(response.body).toEqual({
      originalValue: 37,
      originalScale: 'C',
      convertedValue: '98.60',
      convertedScale: 'F',
    });
  });

  it('should return 400 if invalid input is provided', async () => {
    const response = await request(app)
      .get('/calculate-temperature')
      .query({ value: 'abc', scale: 'C' });

    expect(response.statusCode).toBe(400);
    expect(response.body).toEqual({
      error: 'Invalid input provided.',
    });
  });
});
