import fs from "node:fs/promises";
import express from "express";

/*
  ------------------------------------------------------------
  WHAT IS EXPRESS?
  ------------------------------------------------------------

  Express is a minimal Node.js web framework.

  It provides:
  - Routing (GET, POST, PUT, DELETE, etc.)
  - Middleware system (app.use)
  - Request / response abstraction (req, res)
  - HTTP server on top of Node.js

  Express DOES NOT:
  - handle databases
  - handle authentication
  - enforce architecture

  It only helps us build APIs cleanly.
*/

/*
  ------------------------------------------------------------
  DATA ACCESS LAYER (FILE-BASED "DB")
  ------------------------------------------------------------

  We are using a JSON file (db.json) as a simple database.
  This keeps the project focused on form actions, not databases.
*/

// Load all opinions from db.json
async function loadOpinions() {
  try {
    const dbFileData = await fs.readFile("./db.json");
    const parsedData = JSON.parse(dbFileData);

    // Opinions are stored under "opinions" key
    return parsedData.opinions;
  } catch (error) {
    // If file does not exist or is invalid, return empty list
    return [];
  }
}

// Save a new opinion
async function saveOpinion(opinion) {
  const opinions = await loadOpinions();

  /*
    Add:
    - unique id (timestamp-based)
    - initial vote count
  */
  const newOpinion = { id: new Date().getTime(), votes: 0, ...opinion };

  /*
    Array.prototype.unshift():
    - JavaScript built-in method
    - Adds element to the beginning of the array
    - Used here so newest opinions appear first
  */
  opinions.unshift(newOpinion);

  /*
    JSON.stringify(value, replacer, space)
    -------------------------------------
    - replacer: filter properties (null = no filter)
    - space: indentation for readability (2 spaces)
  */
  const dataToSave = { opinions };
  await fs.writeFile("./db.json", JSON.stringify(dataToSave, null, 2));

  return newOpinion;
}

// Increase vote count
async function upvoteOpinion(id) {
  const opinions = await loadOpinions();
  const opinion = opinions.find((o) => o.id === id);

  if (!opinion) {
    return null;
  }

  opinion.votes++;
  await fs.writeFile("./db.json", JSON.stringify({ opinions }, null, 2));

  return opinion;
}

// Decrease vote count
async function downvoteOpinion(id) {
  const opinions = await loadOpinions();
  const opinion = opinions.find((o) => o.id === id);

  if (!opinion) {
    return null;
  }

  opinion.votes--;
  await fs.writeFile("./db.json", JSON.stringify({ opinions }, null, 2));

  return opinion;
}

/*
  ------------------------------------------------------------
  EXPRESS APPLICATION INSTANCE
  ------------------------------------------------------------

  express() creates an APPLICATION OBJECT.

  The `app` object:
  - receives HTTP requests
  - registers middleware
  - defines routes
  - starts the server

  Everything in Express is built on this object.
*/
const app = express();

/*
  ------------------------------------------------------------
  CORS (Cross-Origin Resource Sharing)
  ------------------------------------------------------------

  WHAT IS CORS?
  -------------
  A browser security feature that blocks requests
  from one origin to another by default.

  Example:
    Frontend: http://localhost:5173 (Vite)
    Backend : http://localhost:3000

  These are DIFFERENT ORIGINS.

  Without CORS headers:
    - Browser blocks the request
    - Backend never receives it
*/

/*
  CORS MIDDLEWARE
  ---------------
  This middleware runs for EVERY request.

  res.setHeader allows the browser to:
    - allow cross-origin requests
    - allow specific HTTP methods
    - allow specific headers
*/
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  // next() passes control to the next middleware / route
  next();
});

/*
  ------------------------------------------------------------
  BODY PARSING MIDDLEWARE
  ------------------------------------------------------------

  express.json():
  - Parses incoming JSON request bodies
  - Makes data available as req.body

  Required for POST / PUT requests with JSON payloads
*/
app.use(express.json());

/*
  ------------------------------------------------------------
  ROUTES
  ------------------------------------------------------------

  HTTP METHOD MEANINGS USED HERE:

  GET:
    - Read data
    - No side effects

  POST:
    - Create data
    - Trigger server-side changes
*/

// GET all opinions
app.get("/opinions", async (req, res) => {
  try {
    const opinions = await loadOpinions();
    res.json(opinions); // Automatically sets Content-Type to application/json
  } catch (error) {
    res.status(500).json({ error: "Error loading opinions." });
  }
});

// POST a new opinion
app.post("/opinions", async (req, res) => {
  /*
    req.body is available because of express.json()
  */
  const { userName, title, body } = req.body;

  /*
    Artificial delay:
    - Simulates real backend latency
    - Useful for testing loading / pending states
  */
  await new Promise((resolve) => setTimeout(resolve, 1000));

  if (!userName || !title || !body) {
    return res.status(400).json({
      error: "User name, title and opinion body are required.",
    });
  }

  try {
    const newOpinion = await saveOpinion({
      userName,
      title,
      body,
    });

    // 201 = Resource successfully created
    res.status(201).json(newOpinion);
  } catch (error) {
    res.status(500).json({ error: "Error saving opinion." });
  }
});

// POST upvote
app.post("/opinions/:id/upvote", async (req, res) => {
  const { id } = req.params;

  await new Promise((resolve) => setTimeout(resolve, 1000));

  try {
    const opinion = await upvoteOpinion(Number(id));
    if (!opinion) {
      return res.status(404).json({ error: "Opinion not found." });
    }

    res.json(opinion);
  } catch (error) {
    res.status(500).json({ error: "Error upvoting opinion." });
  }
});

// POST downvote
app.post("/opinions/:id/downvote", async (req, res) => {
  const { id } = req.params;

  await new Promise((resolve) => setTimeout(resolve, 1000));

  try {
    const opinion = await downvoteOpinion(Number(id));
    if (!opinion) {
      return res.status(404).json({ error: "Opinion not found." });
    }

    res.json(opinion);
  } catch (error) {
    res.status(500).json({ error: "Error downvoting opinion." });
  }
});

/*
  ------------------------------------------------------------
  STARTING THE SERVER
  ------------------------------------------------------------

  app.listen:
  - Binds the application to a port
  - Starts accepting HTTP requests
*/
app.listen(3000, () => {
  console.log("Server running on http://localhost:3000");
});
