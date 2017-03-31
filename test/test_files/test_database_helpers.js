"use strict";

require('dotenv').config();

const ENV         = "test";
const knexConfig  = require("../../knexfile");
const knex        = require("knex")(knexConfig[ENV]);
const dbHelpers = require("../../database/database_helpers")(knex);
const knexCleaner = require("knex-cleaner");

const todosFixture = require("../fixtures/seeds.js").seed.bind(null, knex, Promise);

// console.log(ENV);
// console.log(knexConfig);

// TEST the functions
// /todos
module.exports = (assert) => {
  describe("DB Helpers", () => {

    beforeEach((done) => {
      knexCleaner.clean(knex).then((results) => {
        done();
      }).catch(done);
      todosFixture();
    });

    it("should be select all the todos", (done) => {
      dbHelpers.selectAllTodo(1).then((todos) => {
        done();
      }).catch(done);
    });
  });

};
// View all of the todos a user has - we will limit 3 per category eventually
// dbHelpers.selectAllTodo(1)
// .then((results) => {
//   if(results[0]) {
//     // console.log(results[0]);
//     console.log("selectAllTodo Works!");
//   }
// }).catch((err) => {
//   if (err) console.log(err);
// });

// // View all todos in a category
// dbHelpers.selectCatTodo(1, 3)
// .then((results) => {
//   if(results) {
//     // console.log(results);
//     console.log("selectCatTodo Works!");
//   }
// }).catch((err) => {
//   if (err) console.log(err);
// });

// // Update Todo (updateColumn(s) Obj, todoId, callback)
// dbHelpers.updateTodo({title: "tests"}, 1)
// .then((results) => {
//   if(results) {
//     // console.log(results);
//     console.log("updateTodo Works!");
//   }
// }).catch((err) => {
//   if (err) console.log(err);
// });

// // Multi rank update (takes an array of objects with rank and id as properties made from client side, callback)
// const rankArr = [{rank: 2, id: 1}, {rank: 3, id: 2}, {rank: 1, id: 3},{rank: 4, id: 4}];
// dbHelpers.multiRankUpdate(rankArr)
// .then((results) => {
//   if(results) {
//     // console.log(results);
//     console.log("multiRankUpdate Works!");
//   }
// }).catch((err) => {
//   if (err) console.log(err);
// });

// // Create todo will take userID, categoryID, title
// dbHelpers.createTodo(1, 2, "I really want this test to work")
// .then((results) => {
//   if(results) {
//     // console.log(results);
//     console.log("createTodo Works!");
//   }
// }).catch((err) => {
//   if (err) console.log(err);
// });


