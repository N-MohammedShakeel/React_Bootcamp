import fs from "node:fs/promises";

/*
  fs/promises:
  -------------
  - Node.js built-in module
  - Provides promise-based file system operations
  - Used here instead of a real database
*/

import bodyParser from "body-parser";
import express from "express";

/*
  express:
  --------
  - Minimal Node.js web framework
  - Handles routing, middleware, and HTTP requests
*/

const app = express();

/*
  ------------------------------------------------------------
  GLOBAL MIDDLEWARE
  ------------------------------------------------------------
*/

/*
  bodyParser.json():
  ------------------
  - Parses incoming JSON request bodies
  - Makes parsed data available on req.body
  - Required for POST requests with JSON payloads
*/
app.use(bodyParser.json());

/*
  express.static('public'):
  ------------------------
  - Serves static files from the "public" folder
  - Example use cases:
      images
      CSS files
      frontend assets
*/
app.use(express.static("public"));

/*
  ------------------------------------------------------------
  CORS CONFIGURATION
  ------------------------------------------------------------

  Required because:
  - Frontend and backend run on different origins
  - Browsers block cross-origin requests by default
*/
app.use((req, res, next) => {
  /*
    Allow requests from any domain.
    In production, this should be restricted.
  */
  res.setHeader("Access-Control-Allow-Origin", "*");

  /*
    Allow specific HTTP methods.
    Only GET and POST are needed for this app.
  */
  res.setHeader("Access-Control-Allow-Methods", "GET, POST");

  /*
    Allow headers sent by the frontend.
    Content-Type is needed for JSON requests.
  */
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  /*
    Pass control to the next middleware or route
  */
  next();
});

/*
  ------------------------------------------------------------
  GET /meals
  ------------------------------------------------------------

  Purpose:
  --------
  - Fetch all available meals
  - Used by the frontend to display the menu
*/
app.get("/meals", async (req, res) => {
  /*
    Read meals from JSON file
    This simulates a database read operation
  */
  const meals = await fs.readFile("./data/available-meals.json", "utf8");

  /*
    Convert JSON string to JavaScript object
    and send it as JSON response
  */
  res.json(JSON.parse(meals));
});

/*
  ------------------------------------------------------------
  POST /orders
  ------------------------------------------------------------

  Purpose:
  --------
  - Receive an order from the frontend
  - Validate incoming data
  - Persist order to file
*/
app.post("/orders", async (req, res) => {
  /*
    Extract order data from request body
    Expected structure:
      {
        order: {
          items: [...],
          customer: { ... }
        }
      }
  */
  const orderData = req.body.order;

  /*
    BASIC VALIDATION:
    -----------------
    - Ensure order exists
    - Ensure items exist and are not empty
  */
  if (
    orderData === null ||
    orderData.items === null ||
    orderData.items.length === 0
  ) {
    return res.status(400).json({ message: "Missing data." });
  }

  /*
    CUSTOMER VALIDATION:
    --------------------
    Ensure all required customer fields are present and valid
  */
  if (
    orderData.customer.email === null ||
    !orderData.customer.email.includes("@") ||
    orderData.customer.name === null ||
    orderData.customer.name.trim() === "" ||
    orderData.customer.street === null ||
    orderData.customer.street.trim() === "" ||
    orderData.customer["postal-code"] === null ||
    orderData.customer["postal-code"].trim() === "" ||
    orderData.customer.city === null ||
    orderData.customer.city.trim() === ""
  ) {
    return res.status(400).json({
      message:
        "Missing data: Email, name, street, postal code or city is missing.",
    });
  }

  /*
    CREATE ORDER OBJECT:
    --------------------
    - Spread existing order data
    - Add a generated ID
  */
  const newOrder = {
    ...orderData,
    id: (Math.random() * 1000).toString(),
  };

  /*
    Persist order to file:
    ----------------------
    1. Read existing orders
    2. Parse JSON
    3. Push new order
    4. Write back to file
  */
  const orders = await fs.readFile("./data/orders.json", "utf8");
  const allOrders = JSON.parse(orders);
  allOrders.push(newOrder);

  await fs.writeFile("./data/orders.json", JSON.stringify(allOrders));

  /*
    Respond with success status
  */
  res.status(201).json({ message: "Order created!" });
});

/*
  ------------------------------------------------------------
  FALLBACK ROUTE
  ------------------------------------------------------------

  Handles:
  - OPTIONS requests (CORS preflight)
  - Unknown routes
*/
app.use((req, res) => {
  /*
    Preflight requests must return 200
  */
  if (req.method === "OPTIONS") {
    return res.sendStatus(200);
  }

  /*
    All other unknown routes
  */
  res.status(404).json({ message: "Not found" });
});

/*
  ------------------------------------------------------------
  START SERVER
  ------------------------------------------------------------

  Starts the backend on port 3000
*/
app.listen(3000);
