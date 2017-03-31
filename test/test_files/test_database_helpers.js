"use strict";

require('dotenv').config();

const ENV         = process.env.ENV || "development";
const knexConfig  = require("../../knexfile");
const knex        = require("knex")(knexConfig[ENV]);
const dbHelpers = require("../../database/database_helpers")(knex);

console.log(ENV);
console.log(knexConfig);

module.exports = (assert) => {
  describe("knex", () => {
    it("should connect to the psql db", () => {
      const selectStatement = knex.select().from("todos").toString();
      assert.equal('select * from "todos"', selectStatement);
    });
  });


  describe("the Database Helpers", () => {
    describe("selectAllTodos", () => {
      it("should return json", () => {
        let ans;
        dbHelpers.selectAllTodo((err, val) => {
          if(err) throw err;
          ans = val;
        });
        assert.equal("json",typeof ans, `it isn't json: ${typeof ans}`);
      });
    });
  });
};
