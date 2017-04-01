exports.seed = function(knex, Promise) {
  return knex('todos').del()
    .then(function () {
      return Promise.all([
        knex('todos').insert({
          rank: 1,
          title: 'I want to eat at Meat & Bread',
          completed: false,
          deleted: false,
          category_id: 3,
          user_id: 1
        }),
        knex('todos').insert({
          rank: 2,
          title: 'I want to eat at Tacofino',
          completed: false,
          deleted: false,
          category_id: 3,
          user_id: 1
        }),
        knex('todos').insert({
          rank: 3,
          title: 'I want to eat at Nuba',
          completed: false,
          deleted: false,
          category_id: 3,
          user_id: 1
        }),
        knex('todos').insert({
          rank: 4,
          title: 'I want to eat at Caveman Cafe',
          completed: false,
          deleted: false,
          category_id: 3,
          user_id: 1
        }),
        knex('todos').insert({
          rank: 5,
          title: 'I want to eat at Lighthouse Lab Cafe',
          completed: false,
          deleted: false,
          category_id: 3,
          user_id: 1
        }),
        knex('todos').insert({
          rank: 1,
          title: 'I want to watch Logan',
          completed: false,
          deleted: false,
          category_id: 1,
          user_id: 1
        }),
        knex('todos').insert({
          rank: 2,
          title: 'I want to watch Inglorious Bastards',
          completed: false,
          deleted: false,
          category_id: 1,
          user_id: 1
        })
      ]);
    });
};