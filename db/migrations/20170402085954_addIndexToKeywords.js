
exports.up = function(knex, Promise) {
  return knex.schema.alterTable("keywords", (table) => {
    table.index("word");
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.alterTable("keywords", (table) => {
    table.dropIndex("word");
  });
};
