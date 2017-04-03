"use strict";

const express = require('express');
const router  = express.Router();

module.exports = (dbHelpers, helperFuncs) =>{
  const dbError = {error: "Uh oh... Something is a little weird back here."};

  router.get("/", (req, res) => {
    // Is user logged in
    if (!req.session.user_id) {
      req.flash("error", "You must login to play around with the todos");
      return res.json({error: req.flash("error")});
    }
    Promise.all([
      dbHelpers.selectAllTodo(req.session.user_id),
      dbHelpers.selectAllCategories()
    ]).then((resArr) => {
      const responseObj = {todos: resArr[0], categories: resArr[1]};
      res.json(responseObj);
      return;
    }).catch((err) => {
      res.status(500).json(dbError)
    });
  });

  router.get("/category/:catid", (req, res) => {
    // Is user logged in
    if (!req.session.user_id) {
      req.flash("error", "You must login to play around with the todos");
      return res.json({error: req.flash("error")});
    }
    dbHelpers.selectCatTodo(req.session.user_id, Number(req.params.catid))
    .then((results) => {
      res.json(results);
      return;
    }).catch((err) => {
      console.log(err);
      res.status(500).json(dbError)
    });
  });

  router.get("/:todoid", (req, res) => {
    // Is user logged in
    if (!req.session.user_id) {
      req.flash("error", "You must login to play around with the todos");
      return res.json({error: req.flash("error")});
    }
    dbHelpers.selectATodo(Number(req.params.todoid))
    .then((results) => {
      console.log(results[0]);
      res.json(results[0]);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(dbError);
    });
  });

  // our post / put route
  router.post("/", (req, res) => {
    // Is user logged in
    if (!req.session.user_id) {
      req.flash("error", "You must login to play around with the todos");
      return res.json({error: req.flash("error")});
    }
    const titleVar = req.body.title;
    let conflict = false;
    // cat id 5 is other
    let catID = 5;

    // reduce our array of words to get rid of 2 letter words before passing it to the db
    const listFiltered = titleVar.length > 2 ? titleVar.toLowerCase().split(" ").filter(word => {return word.length > 2}) : false;
    if(listFiltered === false) {
      return res.status(409).json({error: "Your first todo is to learn how to make a TODO"});
    }
    // first phase is to see what category we are
    // select "category_id" where word in titleVar.split(" ");
    console.log(listFiltered);
    dbHelpers.autoCategorise(listFiltered)
    .then((rowsOfCategoryIds) => {
      console.log(rowsOfCategoryIds);
      if(rowsOfCategoryIds.length < 1) {
        conflict = true;
      }else if (helperFuncs.firstTwoMatch(rowsOfCategoryIds)){
        conflict = true;
      }else {
        catID = rowsOfCategoryIds[0].category_id;
      }
      // continue with the creating the todo
      return dbHelpers.createTodo(req.session.user_id, catID, titleVar);
    })
    .then((results) => {
      // results is getting all of the fields one would get from a single todo plus a conflict property
      // indicating that we should get the user to update the category
      results[0].conflict = conflict;
      return res.json(results[0]);
    }).catch((err) => {
      console.log(err);
      res.status(500).json(dbError)
    });
  });

  router.put("/rankupdate", (req,res) => {
    // Is user logged in
    if (!req.session.user_id) {
      req.flash("error", "You must login to play around with the todos");
      return res.json({error: req.flash("error")});
    }
    // const newRanks = [{id:1, rank:2}, {id:2, rank:1}];
    const newRanks = req.body.new_ranks;
    dbHelpers.multiRankUpdate(newRanks)
    .then((results) => {
      res.json(results);
      return;
    }).catch((err) => {
      console.log(err);
      res.status(500).json(dbError)
    });
  });

  router.put("/:todoid/category", (req, res) => {
    // Is user logged in
    if (!req.session.user_id) {
      req.flash("error", "You must login to play around with the todos");
      return res.json({error: req.flash("error")});
    }
    const catId = req.body.category_id;
    const userId = req.params.todoid;

    db("todos").max("rank").where({
        user_id: userId,
        category_id: catId
    })
    .then((rows) => {
      const newRank = rows[0].max ? rows[0].max + 1 : 1;
      return dbHelpers.updateTodo({category_id: catId, rank: newRank}, userId)
    })
    .then((results) => {
      res.json(results[0]);
      return;
    }).catch((err) => {
      console.log(err);
      res.status(500).json(dbError)
    });
  });

  router.put("/:todoid/title", (req,res) => {
    // Is user logged in
    if (!req.session.user_id) {
      req.flash("error", "You must login to play around with the todos");
      return res.json({error: req.flash("error")});
    }

    const titleVar = req.body.title;
    dbHelpers.updateTodo({title: titleVar}, req.params.todoid)
    .then((results) => {
      res.json(results[0]);
      return;
    }).catch((err) => {
      console.log(err);
      res.status(500).json(dbError)
    });
  });

  router.put("/:todoid/completed", (req, res) => {
    // Is user logged in
    if (!req.session.user_id) {
      req.flash("error", "You must login to play around with the todos");
      return res.json({error: req.flash("error")});
    }
    const completed = req.body.completed;
    dbHelpers.updateTodo({completed: completed}, req.params.todoid)
    .then((results) => {
      res.json(results[0]);
      return;
    }).catch((err) => {
      console.log(err);
      res.status(500).json(dbError)
    });
  });

  router.delete("/:todoid", (req, res) => {
    // Is user logged in
    if (!req.session.user_id) {
      req.flash("error", "You must login to play around with the todos");
      return res.json({error: req.flash("error")});
    }

    dbHelpers.updateTodo({deleted: true}, req.params.todoid)
    .then((results) => {
      res.json({success: "deleted successfully"});
      return;
    }).catch((err) => {
      console.log(err);
      res.status(500).json(dbError)
    });
  });

  return router;
};
