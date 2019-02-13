const express = require("express");
const app = express();
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const images = require("./routes/image-router");
const upload = require("express-fileupload");
const fs = require("fs");

var customCors = function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "http://localhost:3000");
  res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE");
  res.header(
    "Access-Control-Allow-Headers",
    "Content-Type,Authorization,Cache-Control"
  );
  res.header("Access-Control-Allow-Credentials", true);
  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }
  next();
};

app.use(customCors);

app.use(bodyParser.urlencoded({ extended: false }));

const dir = __dirname + "/uploads";
app.use("/uploads", express.static(dir));
if (!fs.existsSync(dir)) {
  fs.mkdirSync(dir);
}
//db config
const db = require("./config/keys").mongoURI;

//Connect to mongoDB
mongoose
  .connect(db, { useNewUrlParser: true })
  .then(() => console.log("mongoDB connected"))
  .catch(err => console.log(err));

const port = process.env.PORT || 5000;
app.use(bodyParser.json());
app.use(upload());
app.listen(port, () => console.log(`Server running on port ${port}`));

app.use("/images", images);
