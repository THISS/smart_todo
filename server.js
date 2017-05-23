"use strict";

require('dotenv').config();

const PORT        = process.env.PORT || 8080;
const ENV         = process.env.ENV || "development";
const express     = require("express");
const bodyParser  = require("body-parser");
const cookieSession = require("cookie-session");
const flash = require("connect-flash");
const app         = express();
const helperFunctions = require("./utils/helpers.js");

const knexConfig  = require("./knexfile");
const knex        = require("knex")(knexConfig[ENV]);

// Separated Routes for each Resource
const usersRoutes = require("./routes/users");
const todosRoutes = require("./routes/todos");
const databaseHelpers = require("./database/database_helpers")(knex);


app.set("view engine", "ejs");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieSession({
  name: "session",
  keys: process.env.SECRET || ["development", "fun"]
}));
app.use(flash());
app.use((req, res, next) => {
  res.locals.loggedIn = !!req.session.user_id;
  next();
});

if(ENV === "development") {
  const sass        = require("node-sass-middleware");
  const morgan      = require('morgan');
  const knexLogger  = require('knex-logger');
  // Load the logger first so all (static) HTTP requests are logged to STDOUT
  // 'dev' = Concise output colored by response status for development use.
  //         The :status token will be colored red for server error codes, yellow for client error codes, cyan for redirection codes, and uncolored for all other codes.
  app.use(morgan('dev'));

  // Log knex SQL queries to STDOUT as well
  app.use(knexLogger(knex));
  app.use(sass({
    src: __dirname,
    dest: __dirname + "/public/",
    debug: true,
    outputStyle: 'expanded'
  }));
}
app.use(express.static("public"));
// Mount all resource routes
app.use("/users", usersRoutes(knex, helperFunctions));
app.use("/todos", todosRoutes(databaseHelpers, helperFunctions));

// Home page
app.get("/", (req, res) => {
  res.render("index", {error: req.flash("error")});
});

app.listen(PORT, () => {
  console.log("smartTODO app listening on port " + PORT);
});
