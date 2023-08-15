const app = require('./app');
require('dotenv').config()

const PORT = process.env.PORT ?? 9000;

const server = app.listen(PORT, () => {
  console.log(`Listing to server ${PORT}`);
});

module.exports = server;