/*
  =================================================
  NODE + EXPRESS BACKEND (HTTP SERVER)
  =================================================

  This file creates a BACKEND SERVER.

  What is a backend server?
  - A program that listens for HTTP requests
  - Sends data (JSON, files, etc.) back to clients
  - Runs separately from the React frontend

  In this project:
  - React = frontend (runs in browser)
  - Express = backend (runs on Node.js)
*/

/*
  fs/promises
  -----------
  - Node.js built-in module
  - Used to read/write files asynchronously
  - Here we use JSON files as a "fake database"
*/
import fs from "node:fs/promises";

/*
  body-parser
  -----------
  - Middleware that reads incoming request bodies
  - Converts JSON request data into JavaScript objects
  - Without this, req.body would be undefined
*/
import bodyParser from "body-parser";

/*
  express
  -------
  - Popular Node.js framework for building HTTP servers
  - Handles routing, middleware, requests, responses
*/
import express from "express";

/*
  Create an Express application
*/
const app = express();

/*
  Serve static files from "images" folder
  --------------------------------------
  - Makes images accessible via URLs
  - Example:
      http://localhost:3000/image.jpg
*/
app.use(express.static("images"));

/*
  Parse incoming JSON request bodies
  ----------------------------------
  Required for PUT/POST requests
*/
app.use(bodyParser.json());

/*
  =================================================
  CORS (Cross-Origin Resource Sharing)
  =================================================

  Problem:
  - Browser blocks requests between different origins
  - React runs on: http://localhost:5173 (or similar)
  - Backend runs on: http://localhost:3000

  Solution:
  - Tell browser: "this backend allows requests from anywhere"
*/
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  // Allow all domains

  res.setHeader("Access-Control-Allow-Methods", "GET, PUT");
  // Only allow these HTTP methods

  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  // Allow JSON headers

  next(); // continue to next middleware / route
});

/*
  =================================================
  HTTP ROUTES
  =================================================
*/

/*
  GET /places
  -----------
  - Client asks: "Give me all available places"
  - Reads places.json
  - Sends data as JSON response
*/
app.get("/places", async (req, res) => {
  const fileContent = await fs.readFile("./data/places.json");
  const placesData = JSON.parse(fileContent);

  res.status(200).json({ places: placesData });
});

/*
  GET /user-places
  ----------------
  - Client asks: "Which places did the user select?"
*/
app.get("/user-places", async (req, res) => {
  const fileContent = await fs.readFile("./data/user-places.json");
  const places = JSON.parse(fileContent);

  res.status(200).json({ places });
});

/*
  PUT /user-places
  ----------------
  - Client sends updated user places
  - PUT is used because we UPDATE existing data
  - Data comes from req.body (parsed by body-parser)
*/
app.put("/user-places", async (req, res) => {
  const places = req.body.places;

  await fs.writeFile("./data/user-places.json", JSON.stringify(places));

  res.status(200).json({ message: "User places updated!" });
});

/*
  Fallback route (404)
  -------------------
  - Runs if no route matched
*/
app.use((req, res, next) => {
  if (req.method === "OPTIONS") {
    return next();
  }
  res.status(404).json({ message: "404 - Not Found" });
});

/*
  Start the server
  ----------------
  - Server listens on port 3000
*/
app.listen(3000);
