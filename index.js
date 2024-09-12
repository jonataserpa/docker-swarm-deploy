const express = require('express');
const app = express();
const port = 8779;

app.get('/', (req, res) => {
  res.send('API Checked changes Now ');
});

app.listen(port, () => {
  console.log(`API listening at http://localhost:${port}`);
});
