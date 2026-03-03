const express = require("express");
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.json());

const VERIFY_TOKEN = "EAAaBkoo1qBgBQwuQJY3hD8WVwLv7yW0qQx9DXDbvHsWW35ZAZCZCtVXtlQEZAl4wqS30cuGAXcih6C9M7Mf4lQZALyThPHbWu8AcNdYBkwkXSntV7C8G4LBPGJJnWo9ZBlXZAu6wXq95ya1WSMekXfrqWpeCnzW4oUSwQFSd4FZCl1BBmbujptJBqdH0d6QvFaDlvX1FDlgplZCeJW0oETqROIWgVlavF257ChWzZAxZCsx9HosMhy32iTcXkLFNdMcGjU4SXp8XbgTZBnNZBrZAWKMFXNd9jU";

/* 1️⃣ Webhook Verification (GET) */
app.get("/webhook", (req, res) => {
  const mode = req.query["hub.mode"];
  const token = req.query["hub.verify_token"];
  const challenge = req.query["hub.challenge"];

  if (mode === "subscribe" && token === VERIFY_TOKEN) {
    console.log("Webhook verified successfully!");
    res.status(200).send(challenge);
  } else {
    res.sendStatus(403);
  }
});

/* 2️⃣ Receive Messages (POST) */
app.post("/webhook", (req, res) => {
  console.log("Incoming Message:");
  console.log(JSON.stringify(req.body, null, 2));

  res.sendStatus(200);
});
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});