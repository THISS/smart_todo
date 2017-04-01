
exports.seed = function(knex, Promise) {
  return knex('keywords').del()
    .then(function () {
      return Promise.all([
        knex('keywords').insert({
          word: 'watch', 
          category_id: 1
        }),
        knex('keywords').insert({
          word: 'see', 
          category_id: 1
        }),
        knex('keywords').insert({
          word: 'view', 
          category_id: 1
        }),
        knex('keywords').insert({
          word: 'read',
          category_id: 2
        }),
        knex('keywords').insert({
          word: 'study',
          category_id: 2
        }),
        knex('keywords').insert({
          word: 'eat',
          category_id: 3
        }),
        knex('keywords').insert({
          word: 'dine',
          category_id: 3
        }),
        knex('keywords').insert({
          word:'devour',
          category_id: 3
        }),
        knex('keywords').insert({
          word: 'snack',
          category_id: 3
        }),
        knex('keywords').insert({
          word: 'buy',
          category_id: 4
        }),
        knex('keywords').insert({
          word: 'purchase',
          category_id: 4
        }),
        knex('keywords').insert({
          word: 'acquire',
          category_id: 4
        }),
        knex('keywords').insert({
          word: 'invest',
          category_id: 4
        }),
        knex('keywords').insert({
          word: 'deal',
          category_id: 4
        })
      ]);
    });
};
