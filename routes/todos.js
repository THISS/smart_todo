"use strict";

const express = require('express');
const router  = express.Router();

module.exports = (db) =>{
  router.get("/", (req, res) => {
    db
      .select("*")
      .from("todos")
      .then((results) => {
        res.json(results);
    });
  });


  router.get("/category/:id", (req, res) => {
    db("todos")
      .select("*")
      .where({
        user_id: 1,
        category_id: req.params.id
      })
      .then((val) => {
        return res.json(val);
      })
      .catch((err) => {
        console.log("Error", err)
      });
  });

  router.get("/categoryupdate", (req,res) => {
    const newRanks = [{id:7, rank:1}, {id:6, rank:2}];


    newRanks.forEach(function(item){
      console.log(item); db("todos").where("id", "=", item.id)
      .update({
        rank: item.rank
      })
      .then((val) => {
        res.send();
      }).catch((err) => {
        console.log("Error", err)
      });
    });
  });

//used 1 as user_id hardcoded
  router.post("/", (req, res) => {
    console.log("got here");
    db("todos").max("rank").where({
          user_id: 1,
          category_id: 3
        })
    .then((val)=> {
      console.log(val);
      console.log(val[0].max);
      var valToUse = val[0].max? val[0].max + 1 : 1;
      db("todos").insert({
        rank: valToUse,
        title: 'I want to eat at Subway',
        completed: false,
        deleted: false,
        category_id: 3,
        user_id: 1
      })
      .then((val) => {
          return res.send();

        })
      .catch((err) => {
        console.log("Error", err)
      });
    }).catch((err) => {
        console.log("Error", err)
    });
  });

  router.put("/:id/category", (req, res) => {
    db("todos")
    .update({
      category_id: 2
    }).where({
       id: req.params.id
      })
    .then((val) => {
        res.send();
      })
    .catch((err) => {
        console.log("Error", err)
      });
  });

  router.put("/:id/title", (req,res) => {
    db("todos")
    .update({
      title: 'I want to eat at my house'
    }).where({
      id: req.params.id
      })
    .then((val) => {
      res.send();
      })
    .catch((err) => {
      console.log("Error", err)
      });
  });

  router.delete("/:id", (req, res) => {
    db("todos")
    .update({
      deleted: true
      })
    .where({
      id: req.params.id
    })
    .then((val) => {
      res.send();
      })
    .catch((err) => {
      console.log("Error", err)
      });
  });


  router.put("/:id/checked", (req, res) => {
    db("todos")
    .update({
      completed: true
    }).where({
      id: req.params.id
      })
    .then((val) => {
      res.send();
      })
    .catch((err) => {
      console.log("Error", err)
      });
  });

// const ranks = [{id: 1, rank: 4},{id: 2, rank: 3},{id: 3, rank: 2}];
//   router.put("/:id/category/rank", (req, res) => {
//     db("todos").where("id", "=", 1)
//     .update({
//       rank: req.params.(newid)
//     })
//     .then((val) => {
//       res.send();
//     }).catch((err) => {
//       console.log("Error", err)
//     });
//   });

  return router;
};
