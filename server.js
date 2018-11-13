const express = require("express");

const mongoose = require("mongoose");
const bodyParsar = require("body-parser");
const passport = require("passport");

const users = require("./routes/api/users");
const profile = require("./routes/api/profile");
const posts = require("./routes/api/posts");

const app = express();

// body parsar middleware
app.use(bodyParsar.urlencoded({ extended: false }));
app.use(bodyParsar.json());

//DB config
const db = require("./config/keys").mongoURI;

// connect to MongoDB

mongoose
  .connect(db)
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.log(err));

app.get("/", (req, res) => res.send("hello world"));

//passport middleware
app.use(passport.initialize());

//passport config
require("./config/passport")(passport);

// Use routes
app.use("/api/users", users);
app.use("/api/profile", profile);
app.use("/api/posts", posts);

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server running on port ${port}`));