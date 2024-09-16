const express = require('express');
const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
const app = express();
const port = 8779;

// Swagger configuration
const swaggerOptions = {
  swaggerDefinition: {
    openapi: '3.0.0',
    info: {
      title: 'Temperature Calculator API',
      version: '1.0.0',
      description: 'A simple API to calculate temperatures',
    },
    servers: [
      {
        url: `http://localhost:${port}`,
        description: 'Local server',
      },
    ],
  },
  apis: ['./index.js'], // File where the API docs are defined
};

const swaggerDocs = swaggerJsdoc(swaggerOptions);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

// Parse JSON request body
app.use(express.json());

/**
 * @swagger
 * /calculate-temperature:
 *   get:
 *     summary: Calculate temperature in Fahrenheit or Celsius
 *     description: Convert temperature from Fahrenheit to Celsius or vice versa.
 *     tags: [Calculator]
 *     parameters:
 *       - in: query
 *         name: value
 *         required: true
 *         schema:
 *           type: number
 *         description: The temperature value to be converted.
 *       - in: query
 *         name: scale
 *         required: true
 *         schema:
 *           type: string
 *           enum: [F, C]
 *         description: The scale of the temperature value (F for Fahrenheit, C for Celsius).
 *     responses:
 *       200:
 *         description: Successfully calculated temperature.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 originalValue:
 *                   type: number
 *                   description: The original temperature value.
 *                 originalScale:
 *                   type: string
 *                   description: The original temperature scale.
 *                 convertedValue:
 *                   type: number
 *                   description: The converted temperature value.
 *                 convertedScale:
 *                   type: string
 *                   description: The converted temperature scale.
 *       400:
 *         description: Invalid input provided.
 */
app.get('/calculate-temperature', (req, res) => {
  const { value, scale } = req.query;

  if (!value || !scale || isNaN(value)) {
    return res.status(400).json({ error: 'Invalid input provided.' });
  }

  let convertedValue;
  let convertedScale;

  if (scale === 'F') {
    convertedValue = ((value - 32) * 5) / 9;
    convertedScale = 'C';
  } else if (scale === 'C') {
    convertedValue = (value * 9) / 5 + 32;
    convertedScale = 'F';
  } else {
    return res.status(400).json({ error: 'Invalid scale provided. Use "F" or "C".' });
  }

  return res.json({
    originalValue: parseFloat(value),
    originalScale: scale,
    convertedValue: convertedValue.toFixed(2),
    convertedScale,
  });
});

/**
 * @swagger
 * /test:
 *   get:
 *     summary: Checked
 *     description: Test checked.
 *     tags: [Check]
 *     responses:
 *       200:
 *         description: Successfully checked.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Checked...!
 */
app.get('/test', (req, res) => {
    res.send({ message: 'Health Checked...!' });
});

app.listen(port, () => {
  console.log(`API running on http://localhost:${port}`);
  console.log(`Swagger docs available at http://localhost:${port}/api-docs`);
});
