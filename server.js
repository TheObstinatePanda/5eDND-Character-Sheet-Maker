const express = require('express');
const app = express();

module.exports = app;
app.use(express.static('.'));

// Define PORT as the environment variable or 3001
const PORT = process.env.PORT || 3001;

// Middleware for handling CORS request from index.html
const cors = require('cors');
app.use(cors());

// Middleware for parsing request bodies
const bodyParser = require('body-parser');
app.use(bodyParser.json());

// Middleware for logging
const morgan = require('morgan');
app.use(morgan('dev'));

// Routes
const apiRouter = require('./server/api');
app .use('/api', apiRouter);

// Listen on PORT - call in if statement to ensure that the server is only started if it is run directly
if (require.main === module) {
  app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
  });
}