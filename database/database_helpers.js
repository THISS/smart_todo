"use strict";




module.exports = (db) => {
  //function to view all Todo lists
  function selectAllTodo(cb) {
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

//function to view all categories
  function selectCatTodo(user_id, category_id, cb) {
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

//function to update todo columns
  function updateTodo(updateColumn, todoID, cb) {
    db("todos").where("id", "=", todoID)
    .update(updateColumn)
    .then((results) => {
      cb(null, results);
    }).catch((err) => {
      cb(err);
    });
  };

//functin to update rankings of todo list
  function multiRankUpdate(todoArr, cb) {
    return Promise.all(todoArr.map((todo) => {
      return updateTodo({"rank": todo.rank}, todo.id, cb);
    }))
    .then((results) => {
      cb(null, results);
    })
    .catch((err) => {
      cb(err);
    });
  };

//function to create a todo
  function createTodo(user_id, category_id, title, cb) {
    db("todos").max("rank").where({
        user_id: user_id,
        category_id: category_id
      })
    .then((results)=> {
      const rankToUse = results[0].max ? results[0].max + 1 : 1;
      db("todos").insert({
        rank: rankToUse,
        title: title,
        completed: false,
        deleted: false,
        category_id: category_id,
        user_id: user_id
      })
      .then((results) => {
          cb(null, results);
        })
      .catch((err) => {
        console.log("Error", err)
        cb(err);
      });
    }).catch((err) => {
      console.log("Error", err)
      cb(err);
    });
  };


  return {
    selectAllTodo: selectAllTodo,
    selectCatTodo: selectCatTodo,
    updateTodo: updateTodo,
    multiRankUpdate: multiRankUpdate,
    createTodo: createTodo
  };

};
