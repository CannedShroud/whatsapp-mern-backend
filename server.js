// importing
import express from "express";
import mongoose from "mongoose";

// app config
const app = express();
const port = process.env.PORT || 9000;

// middlewares

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

// listener
app.listen(port, () => {
  console.log("====================================");
  console.log("Listening on Localhost =>", port);
  console.log("====================================");
});
