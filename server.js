// server.js
const app = require('./app');
const port = 8779;

// Start the server and store the server instance
const server = app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});

// If you need to access the address
const serverAddress = server.address();
console.log(`Server is listening on address: ${serverAddress.address}, port: ${serverAddress.port}`);
