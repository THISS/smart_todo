"use strict";

module.exports = (db) => {

  //function to view all Todo lists by user_id
  // TODO: Limit 3 per category for main page use a union
  function selectAllTodo(user_id) {
    return db.select("*").from("todos").where({user_id: user_id});
  };

//function to view all categories
  function selectCatTodo(user_id, category_id) {
    return db("todos").select("*")
    .where({
      user_id: user_id,
      category_id: category_id
    });
  };

//function to update todo columns
  function updateTodo(updateColumn, todoID) {
    return db("todos").where("id", "=", todoID)
    .update(updateColumn);
  };

//functin to update rankings of todo list
  function multiRankUpdate(todoArr) {
    return Promise.all(todoArr.map((todo) => {
      return updateTodo({"rank": todo.rank}, todo.id);
    }));
  };

//function to create a todo
// return a promise inside of a promise instead of .then inside a .then
  function createTodo(user_id, category_id, title, cb) {
    return db("todos").max("rank").where({
        user_id: user_id,
        category_id: category_id
    })
    .then((results)=> {
      const rankToUse = results[0].max ? results[0].max + 1 : 1;
      return db("todos").insert({
        rank: rankToUse,
        title: title,
        completed: false,
        deleted: false,
        category_id: category_id,
        user_id: user_id
      });
    })
    .catch((err) => {
      return Promise.reject(err);
    });
  };
  // Return our module exports object with the functions mapped to their names
  return {
    selectAllTodo: selectAllTodo,
    selectCatTodo: selectCatTodo,
    updateTodo: updateTodo,
    multiRankUpdate: multiRankUpdate,
    createTodo: createTodo
  };

};
