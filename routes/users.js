"use strict";

const express = require('express');
const router  = express.Router();

module.exports = (knex, helpers) => {

  router.get("/login", (req, res) => {
    req.session.user_id = helpers.randomId();
    res.json({loggedIn: true});
  });

  router.get("/logout", (req, res) => {
    req.session.user_id = undefined;
    res.json({loggedIn: false});
  });

  return router;
}
