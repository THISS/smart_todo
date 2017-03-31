"use strict";

const express = require('express');
const router  = express.Router();

module.exports = (dbHelpers) =>{

  router.get("/", (req, res) => {
    dbHelpers.selectAllTodo((err, results) => {
      if(err) res.statusCode(500).json(err);
      res.json(results);
    });
  });


  router.get("/category/:id", (req, res) => {
    dbHelpers.selectCatTodo(1, req.params.id, (err, val) => {
      if(err) res.statusCode(500).json(err);
        res.json(val);
      });
  });

  router.get("/categoryupdate", (req,res) => {
    const newRanks = [{id:7, rank:1}, {id:6, rank:2}];
    dbHelpers.multiRankUpdate(newRanks, (err, val) => {
      if(err) res.statusCode(500).json(err);
      res.json(val);
    });
  });

//used 1 as user_id hardcoded
  router.post("/", (req, res) => {
    dbHelpers.createTodo(1, 3, "I want to eat Pizza", (err, val) => {
      if(err) res.statusCode(500).json(err);
      res.json(val);
    });
  });

  router.put("/:id/category", (req, res) => {
    dbHelpers.updateTodo({category_id: 2}, req.params.id, (err, val) => {
      if(err) res.statusCode(500).json(err);
      res.json(val);
    });
  });

  router.put("/:id/title", (req,res) => {
    dbHelpers.updateTodo({title: "I want to read a lullaby"}, req.params.id, (err, val) => {
      if(err) res.statusCode(500).json(err);
      res.json(val);
    });
  });

  router.delete("/:id", (req, res) => {
    dbHelpers.updateTodo({deleted: true}, req.params.id, (err, val) => {
      if(err) res.statusCode(500).json(err);
      res.json(val);
    });
  });


  router.put("/:id/checked", (req, res) => {
    dbHelpers.updateTodo({completed: true}, req.params.id, (err, val) => {
      if(err) res.statusCode(500).json(err);
      res.json(val);
    });
  });

  return router;
};
