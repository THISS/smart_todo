
exports.seed = function(knex, Promise) {
  return knex('keywords').del()
    .then(function () {
      return Promise.all([
        knex('keywords').insert({
         word: 'watch',
         category_id: 1
        }),
        knex('keywords').insert({
         word: 'read',
         category_id: 2
        }),
        knex('keywords').insert({
         word: 'eat',
         category_id: 3
        }),
        knex('keywords').insert({
         word: 'buy',
         category_id: 4
        })
      ]);
    });
};
