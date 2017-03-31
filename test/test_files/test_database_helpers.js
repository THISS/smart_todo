"use strict";

require('dotenv').config();

const ENV         = process.env.ENV || "development";
const knexConfig  = require("../../knexfile");
const knex        = require("knex")(knexConfig[ENV]);
const dbHelpers = require("../../database/database_helpers")(knex);

// console.log(ENV);
// console.log(knexConfig);

// TEST the functions
// /todos

dbHelpers.selectAllTodo((err, success) => {
  if (err) console.log(err);
  console.log(`The select all todos works`);
});

// View all todos in a category
dbHelpers.selectCatTodo(1, 3, (err, success) => {
  if (err) console.log(err);
  console.log(`The select category todos works`);
});

// Update Todo (updateColumn(s) Obj, todoId, callback)
dbHelpers.updateTodo({title: "tests"}, 1, (err, success) => {
  if (err) console.log(err);
  console.log(`The update todo works`);
});

// Multi rank update (takes an array of objects with rank and id as properties made from client side, callback)
const rankArr = [{rank: 2, id: 1}, {rank: 3, id: 2}, {rank: 1, id: 3},{rank: 4, id: 4}];
dbHelpers.multiRankUpdate(rankArr, (err, success) => {
  if (err) console.log(err);
  console.log(`The multi rank update works`);
});

dbHelpers.createTodo(1, 2, "I really want this test to work", (err, success) => {
  if (err) console.log(err);
  console.log(`The create todo works`);
});


knex.destroy();

// module.exports = (assert) => {
//   describe("knex", () => {
//     it("should be able to make a simple sql statement", () => {
//       const selectStatement = knex.select().from("todos").toString();
//       assert.equal('select * from "todos"', selectStatement);
//     });

//     it("should have a connection to the postgres db", () => {
//       knex.raw('select 1+1 as result').then((err, done) => {
//         // there is a valid connection in the pool
//         if(err) {
//             assert.ifError(err);
//         }else {
//           assert.notEqual(typeof result , typeof undefined);
//         }
//       });
//     });
//   });

//   describe("the Database Helpers", () => {

//     describe("selectAllTodos", () => {
//       it("should return json", () => {
//         dbHelpers.selectAllTodo((err, val) => {
//           if(err) {
//             assert.ifError(err);
//           }else {
//             assert.equal("json",typeof val, `it isn't json: ${typeof val}`);
//           }
//         });
//       });

//       it("should have valid keys", () => {
//         assert.equal(true, true);
//       });
//     });
//   });
// };
