// importing
import express from "express";
import mongoose from "mongoose";
import Messages from "./dbMessages.js";
import Pusher from "pusher";
import cors from "cors";

// app config
const app = express();
const port = process.env.PORT || 4000;

const pusher = new Pusher({
  appId: "1073277",
  key: "3bdd7e7034a952e266c9",
  secret: "7985afe2e3161f807ad0",
  cluster: "ap2",
  encrypted: true,
});

// middlewares
app.use(express.json());
app.use(cors());

// DB config
const connectionURL =
  "mongodb+srv://admin:ObX0bcbS965OtAC0@cluster0.main8.mongodb.net/whatsappDB?retryWrites=true&w=majority";
mongoose.connect(connectionURL, {
  useCreateIndex: true,
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;

db.once("open", () => {
  console.log("DB is connected");
  const msgCollection = db.collection("messagecontents");
  const changeStream = msgCollection.watch();

  changeStream.on("change", (change) => {
    console.log(change);

    if (change.operationType === "insert") {
      const messageDetails = change.fullDocument;
      pusher.trigger("messsages", "inserted", {
        name: messageDetails.name,
        message: messageDetails.message,
      });
    } else {
      console.log("error trigerring pusher");
    }
  });
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
