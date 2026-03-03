const express = require("express");
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.json());

const VERIFY_TOKEN = "EAAaBkoo1qBgBQ1ZBpCZA472LZAdMtCUQTRnDlFep2PZCgGeL8GkPuRu4kzb7uf9J8pCvmZCEC2A2GmjzMN1VlbQgdqMa4dDO3EJzGwZAmOO7YSgoM4JZBfZBhobFlOp9g1kaIY8lxhWJliiIydh5lkJGjQeP9MIol4Dipfay0zUfz0TuwAZCC1ZCp9ZCzZCyRQ9oep4ZABbeMY12V2ZBZAyVledezPEdViiA1EcnWvl5l6rVItyZC6yu1CGZB7yhZB2RTrRvjRj96WYWnru4Dolu2sYZCsuF40k2Nif";

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

app.listen(3000, () => {
  console.log("Server running on port 3000");
});