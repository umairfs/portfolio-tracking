// Import required modules
const express = require('express');
const dotenv = require("dotenv");
const apiRoutes = require("./src/api");
const bodyParser = require('body-parser');
const http = require('http');
const { requestMiddleware } = require("./src/api/v1/shared/middleware/request.middleware");
const cors = require("cors");
const compression = require("compression");

dotenv.config();

// define options for apis
var options = {
    origin: "*",
    methods: "GET,PUT,PATCH,POST,DELETE",
    preflightContinue: false,
    optionsSuccessStatus: 204,
};
  

// Create an instance of Express
const app = express();

const server = http.createServer(app);

app.use(cors(options));
app.use(compression());

app.use(bodyParser.urlencoded({ extended: false }));

// Parse JSON bodies
app.use(bodyParser.json());

// Parse URL-encoded bodies
app.use(bodyParser.urlencoded({ extended: true }));


// before requesting api
app.use(requestMiddleware);

// adding api route
app.use(apiRoutes);

// Test route
app.get('/', (req, res) => {
    res.send('Hello, world!');
});



// Start the server
const PORT = process.env.APP_PORT || 3002;
const HOST = process.env.APP_HOST;
server.listen(PORT, () => {
    console.log(`Server is running on port http://${HOST}:${PORT}`);
});
