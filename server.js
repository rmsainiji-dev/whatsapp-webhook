const express = require("express");
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.json());

const VERIFY_TOKEN = "ismyverifytoken";



app.get("/webhook", (req, res) => {
    const mode = req.query["hub.mode"];
    const token = req.query["hub.verify_token"];
    const challenge = req.query["hub.challenge"];

    if (mode === "subscribe" && token === VERIFY_TOKEN) {
        console.log("LOG: Verification match found.");
        
        // 1. Force plain text header
        res.setHeader('Content-Type', 'text/plain');
        
        // 2. Send ONLY the challenge (no JSON, no extra spaces)
        return res.status(200).send(challenge); 
    }
    res.sendStatus(403);
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