// REF: https://blog.bitsrc.io/build-a-login-auth-app-with-mern-stack-part-1-c405048e3669

const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const passport = require("passport");
const users = require("./routes/api/users");
const app = express();

/**
 ********* Middleware **********
 **/

app.use(
  bodyParser.urlencoded({
    extended: false,
  })
);
app.use(bodyParser.json());

/**
 ********* DB Config **********
 **/

const db = require("./config/keys").mongoURI;
// Connect to MongoDB
mongoose
  .connect(db, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("MongoDB successfully connected"))
  .catch((err) => console.log(err));

/**
 ********* Passport middleware **********
 **/

app.use(passport.initialize());
// Execute passport config
require("./config/passport")(passport);

/**
 ********* Users route **********
 **/

// Routes
app.use("/api/users", users);

/**
 ********* Start Listening **********
 **/

const port = process.env.PORT || 5000; // process.env.port is Heroku's port if you choose to deploy the app there
app.listen(port, () => console.log(`Server up and running on port ${port}`));
