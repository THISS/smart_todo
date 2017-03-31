"use strict";

module.exports = (db) => {

  const databaseHelpers = {};
    databaseHelpers.selectAllTodo = (cb) => {
      db
      .select("*")
      .from("todos")
      .then((results) => {
        cb(null, results);
      })
      .catch((err) => {
        cb(err);
      });
    };
    databaseHelpers.selectCatTodo = (user_id, category_id, cb) => {
      db("todos")
      .select("*")
      .where({
        user_id: user_id,
        category_id: category_id
      })
      .then((results) => {
        cb(null, results);
      })
      .catch((err) => {
        cb(err);
      });
    };

    databaseHelpers.updateTodo = (updateColumn, todoID, cb) => {
      db("todos").where("id", "=", todoID)
      .update(updateColumn)
      .then((results) => {
        cb(null, results);
      }).catch((err) => {
        cb(err);
      });
    };


    databaseHelpers.multiRankUpdate = (todoArr, cb) => {
      return Promise.all(todoArr.map((todo) => {
        return this.updateTodo({"rank": todo.rank}, todo.id, cb);
      }))
      .then((results) => {
        cb(null, results);
      })
      .catch((err) => {
        cb(err);
      });
    };

    databaseHelpers.createTodo = () => {
      db("todos").max("rank").where({
          user_id: 1,
          category_id: 3
        })
    .then((val)=> {
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
    };

  return databaseHelpers;

};
