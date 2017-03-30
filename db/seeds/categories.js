
exports.seed = function(knex, Promise) {
  return knex('categories').del()
    .then(function () {
      return Promise.all([
        knex('categories').insert({
         name: 'Watch'
        }),
        knex('categories').insert({
         name: 'Read'
        }),
        knex('categories').insert({
         name: 'Eat'
        }),
        knex('categories').insert({
         name: 'Buy'
        }),
        knex('categories').insert({
         name: 'Other'
        })
      ]);
    });
};
