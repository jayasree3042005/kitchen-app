const express = require("express");
const { MongoClient } = require("mongodb");

const app = express();
app.use(express.json());

const MONGO_URI = "mongodb://localhost:27017";
let db;

MongoClient.connect(MONGO_URI)
  .then(client => {
    db = client.db("kitchen");
    console.log("MongoDB connected");
  })
  .catch(err => console.error(err));

app.get("/health", (req, res) => {
  res.json({ status: "ok", db: db ? "connected" : "not connected" });
});

app.post("/orders", async (req, res) => {
  const order = {
    dish: req.body.dish,
    status: "pending",
    createdAt: new Date()
  };

  await db.collection("orders").insertOne(order);
  res.json(order);
});

app.get("/orders", async (req, res) => {
  const orders = await db.collection("orders").find().toArray();
  res.json(orders);
});

app.listen(3000, () => {
  console.log("API running on port 3000");
});