"use strict";

const express = require('express');
const router  = express.Router();

module.exports = (dbHelpers) =>{

  router.get("/", (req, res) => {
    const userid = 1;
    dbHelpers.selectAllTodo(userid)
    .then((results) => {
      res.json(results);
    }).catch((err) => {
      console.log(err);
      res.status(500).json({error: "Uh oh... Something is a little weird back here."})
    });
  });


  router.get("/category/:catid", (req, res) => {
    const userid = 1;
    dbHelpers.selectCatTodo(userid, req.params.catid)
    .then((results) => {
      res.json(results);
    }).catch((err) => {
      console.log(err);
      res.status(500).json({error: "Uh oh... Something is a little weird back here."})
    });
  });

  // TODO: change to a put
  router.get("/categoryupdate", (req,res) => {
    const newRanks = [{id:1, rank:2}, {id:2, rank:1}];
    dbHelpers.multiRankUpdate(newRanks)
    .then((results) => {
      res.json(results);
    }).catch((err) => {
      console.log(err);
      res.status(500).json({error: "Uh oh... Something is a little weird back here."})
    });
  });

//used 1 as user_id hardcoded
  router.post("/", (req, res) => {
    const userid  = 1;
    const catid = 3;
    const title = "I want to eat pizza";
    dbHelpers.createTodo(userid, catid, title)
    .then((results) => {
      res.json(results);
    }).catch((err) => {
      console.log(err);
      res.status(500).json({error: "Uh oh... Something is a little weird back here."})
    });
  });

  router.put("/:todoid/category", (req, res) => {
    dbHelpers.updateTodo({category_id: 2}, req.params.todoid)
    .then((results) => {
      res.json(results);
    }).catch((err) => {
      console.log(err);
      res.status(500).json({error: "Uh oh... Something is a little weird back here."})
    });
  });

  router.put("/:todoid/title", (req,res) => {
    dbHelpers.updateTodo({title: "I want to read a lullaby"}, req.params.todoid)
    .then((results) => {
      res.json(results);
    }).catch((err) => {
      console.log(err);
      res.status(500).json({error: "Uh oh... Something is a little weird back here."})
    });
  });

  router.delete("/:todoid", (req, res) => {
    dbHelpers.updateTodo({deleted: true}, req.params.todoid)
    .then((results) => {
      res.json(results);
    }).catch((err) => {
      console.log(err);
      res.status(500).json({error: "Uh oh... Something is a little weird back here."})
    });
  });

  router.put("/:todoid/checked", (req, res) => {
    dbHelpers.updateTodo({completed: true}, req.params.todoid)
    .then((results) => {
      res.json(results);
    }).catch((err) => {
      console.log(err);
      res.status(500).json({error: "Uh oh... Something is a little weird back here."})
    });
  });

  return router;
};
