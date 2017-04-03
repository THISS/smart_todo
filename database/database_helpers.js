"use strict";

module.exports = (db) => {

  //function to view all Todo lists by user_id
  // TODO: Limit 3 per category for main page use a union
  function selectAllTodo(user_id) {
    return db("todos").select("id", "rank", "title", "completed", "category_id")
    .where({user_id: user_id, deleted: false})
    .orderBy("completed")
    .orderBy("rank");
  };

//function to view all categories
  function selectCatTodo(user_id, category_id) {
    return db("todos").select("id", "rank", "title", "completed", "category_id")
    .where({
      user_id: user_id,
      deleted: false,
      category_id: category_id
    })
    .orderBy("rank");
  };

  // function to select a todo
  function selectATodo(todo_id) {
    return db("todos").select("id", "rank", "title", "completed", "category_id")
    .where({
      deleted: false,
      id: todo_id
    });
  }

//function to update todo columns
  function updateTodo(updateColumn, todoID) {
    return db("todos").where({id: todoID, deleted: false})
    .update(updateColumn)
    .returning(["id", "rank", "title", "completed", "category_id"]);
  };

//functin to update rankings of todo list
  function multiRankUpdate(todoArr) {
    return Promise.all(todoArr.map((todo) => {
      return updateTodo({"rank": todo.rank}, todo.id);
    }));
  };

//function to create a todo
// return a promise inside of a promise instead of .then inside a .then
  function createTodo(user_id, category_id, title) {
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
      }).returning(["id", "rank", "title", "completed", "category_id"]);
    })
    .catch((err) => {
      return Promise.reject(err);
    });
  };

  // Get a list of our supported categories
  function selectAllCategories() {
    return db("categories").select("*").orderBy("id");
  }

  function autoCategorise (list) {
    return db("keywords").select("category_id")
    .whereIn("word", list)
    .count("id as hits")
    .groupBy("category_id")
    .orderBy("hits", "desc");
  }
  
  function getMaxRank(userId, catId) {
    return db("todos").max("rank").where({
        user_id: userId,
        category_id: catId
    })
  }

  // Return our module exports object with the functions mapped to their names
  return {
    selectAllTodo: selectAllTodo,
    selectCatTodo: selectCatTodo,
    updateTodo: updateTodo,
    multiRankUpdate: multiRankUpdate,
    createTodo: createTodo,
    selectATodo: selectATodo,
    autoCategorise: autoCategorise,
    getMaxRank: getMaxRank,
    selectAllCategories: selectAllCategories
  };

};
