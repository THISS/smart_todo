"use strict";

const express = require('express');
const router  = express.Router();

module.exports = (knex, helpers) => {

  router.get("/login", (req, res) => {
    if(!req.session.user_id){
      req.session.user_id = helpers.randomId();
    }
    res.status(302).json({loggedIn: true});
  });

  router.get("/logout", (req, res) => {
    req.session.user_id = undefined;
    res.status(302).json({loggedIn: false});
  });

  return router;
}
