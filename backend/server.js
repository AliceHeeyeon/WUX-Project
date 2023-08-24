//require dotenv
require("dotenv").config();
const express = require("express");
const app = express();
const mongoose = require("mongoose");
//set port 4000
const port = 4000;
//allow cross origin request
const cors = require("cors");

//import routes
const projectRoutes = require("./routes/project");
const userRoutes = require("./routes/user");

//use CORS
app.use(cors());

//Parse JSON data to convert into a Javascript object
app.use(express.json());

//logged out the path and method of each request
app.use((req, res, next) => {
  console.log(req.path, req.method);
  next();
});

//Attach Routes to our app
app.use("/api/projects/", projectRoutes);
app.use("/api/user/", userRoutes);
app.use('public/uploads', express.static('public/uploads'))

//bring mongo username and password from env file
const mongoUsername = process.env.MONGODB_USERNAME;
const mongoPassword = process.env.MONGODB_PASSWORD;
const mongoDatabase = process.env.MONGO_DATABASE;

//mongo url
const mongoURL = `mongodb+srv://${mongoUsername}:${mongoPassword}@cluster0.dkesc7g.mongodb.net/${mongoDatabase}?retryWrites=true&w=majority`;

app.get("/", (req, res) => {
  res.send("Hello, this is your Express server for Team project");
});

app.listen(port, () => {
  console.log(`Express server is running on http://localhost:${port}`);
});

mongoose
  .connect(mongoURL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  //when success for request
  .then(() => {
    console.log("Connect to MongoDB Atlas");
  })
  //when error occured
  .catch((err) => {
    console.error("Error connecting to MongoDB Atlas:", err);
  });
