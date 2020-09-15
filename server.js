// importing
import express from "express";
import mongoose from "mongoose";
import dbMessages from "./dbMessages.js";
import Messages from "./dbMessages.js";

// app config
const app = express();
const port = process.env.PORT || 4000;

// middlewares
app.use(express.json());

// DB config
const connectionURL =
  "mongodb+srv://admin:ObX0bcbS965OtAC0@cluster0.main8.mongodb.net/whatsappDB?retryWrites=true&w=majority";
mongoose.connect(connectionURL, {
  useCreateIndex: true,
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// ????

// api routes
app.get("/", (req, res) => {
  res.status(200).send("Hello World");
});

app.get("/messages/sync", (req, res) => {
  Messages.find((err, data) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.status(200).send(data);
    }
  });
});

app.post("/messages/new", (req, res) => {
  const dbMessage = req.body;

  Messages.create(dbMessage, (err, data) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.status(201).send(data);
    }
  });
});

// listener
app.listen(port, () => {
  console.log("====================================");
  console.log("Listening on Localhost =>", port);
  console.log("====================================");
});
