"use strict";

const express = require('express');
const router  = express.Router();

module.exports = (dbHelpers, helperFuncs) =>{
  const dbError = {error: "Uh oh... Something is a little weird back here."};

  router.get("/", (req, res) => {
    // Is user logged in
    helperFuncs.isUserLoggedIn(req, res);
    Promise.all([
      dbHelpers.selectAllTodo(req.session.user_id),
      dbHelpers.selectAllCategories()
    ]).then((resArr) => {
      const responseObj = {todos: resArr[0], categories: resArr[1]};
      res.json(responseObj);
    }).catch((err) => {
      res.status(500).json(dbError)
    });
  });

  router.get("/category/:catid", (req, res) => {
    // Is user logged in
    helperFuncs.isUserLoggedIn(req, res);
    dbHelpers.selectCatTodo(req.session.user_id, req.params.catid)
    .then((results) => {
      res.json(results);
    }).catch((err) => {
      console.log(err);
      res.status(500).json(dbError)
    });
  });

//used 1 as user_id hardcoded
  router.post("/", (req, res) => {
    // Is user logged in
    helperFuncs.isUserLoggedIn(req, res);

    const catID = req.body.cat_id;
    const titleVar = req.body.title;

    dbHelpers.createTodo(req.session.user_id, catID, titleVar)
    .then((results) => {
      res.json(results);
    }).catch((err) => {
      console.log(err);
      res.status(500).json(dbError)
    });
  });

  router.put("/rankupdate", (req,res) => {
    // Is user logged in
    helperFuncs.isUserLoggedIn(req, res);
    // const newRanks = [{id:1, rank:2}, {id:2, rank:1}];
    const newRanks = req.body.new_ranks;
    dbHelpers.multiRankUpdate(newRanks)
    .then((results) => {
      res.json(results);
    }).catch((err) => {
      console.log(err);
      res.status(500).json(dbError)
    });
  });

  router.put("/:todoid/category", (req, res) => {
    // Is user logged in
    helperFuncs.isUserLoggedIn(req, res);
    const catID = req.body.cat_id;
    dbHelpers.updateTodo({category_id: catID}, req.params.todoid)
    .then((results) => {
      res.json(results);
    }).catch((err) => {
      console.log(err);
      res.status(500).json(dbError)
    });
  });

  router.put("/:todoid/title", (req,res) => {
    // Is user logged in
    helperFuncs.isUserLoggedIn(req, res);

    const titleVar = req.body.title;
    dbHelpers.updateTodo({title: titleVar}, req.params.todoid)
    .then((results) => {
      res.json(results);
    }).catch((err) => {
      console.log(err);
      res.status(500).json(dbError)
    });
  });

  router.put("/:todoid/checked", (req, res) => {
    // Is user logged in
    helperFuncs.isUserLoggedIn(req, res);
    dbHelpers.updateTodo({completed: true}, req.params.todoid)
    .then((results) => {
      res.json(results);
    }).catch((err) => {
      console.log(err);
      res.status(500).json(dbError)
    });
  });

  router.delete("/:todoid", (req, res) => {
    // Is user logged in
    helperFuncs.isUserLoggedIn(req, res);
    dbHelpers.updateTodo({deleted: true}, req.params.todoid)
    .then((results) => {
      res.json(results);
    }).catch((err) => {
      console.log(err);
      res.status(500).json(dbError)
    });
  });

  return router;
};
