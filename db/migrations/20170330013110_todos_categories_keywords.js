
exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.createTable("todos", (table) => {
      table.increments("id");
      table.integer("rank");
      table.string("title", 127);
      table.boolean("completed");
      table.boolean("deleted");
      table.integer("category_id").references("id").inTable("categories");
      table.integer("user_id");
    }),
    knex.schema.createTable("categories", (table) => {
      table.increments("id");
      table.string("name", 127);
    }),
    knex.schema.createTable("keywords", (table) => {
      table.increments("id");
      table.string("word", 127);
      table.integer("category_id").references("id").inTable("categories");
    });
  ]);
};

exports.down = function(knex, Promise) {
  return Promise.all([
    knex.schema.dropTable("todos");
    knex.schema.dropTable("categories");
    knex.schema.dropTable("keywords");
  ]);
};
