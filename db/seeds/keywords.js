
exports.seed = function(knex, Promise) {
  return knex('keywords').del()
    .then(function () {
      return Promise.all([
        knex('keywords').insert({
          word: 'watch', 
          category_id: 1
        }),
        knex('keywords').insert({
          word: 'tv', 
          category_id: 1
        }),
        knex('keywords').insert({
          word: 'movies', 
          category_id: 1
        }),
        knex('keywords').insert({
          word: 'shows', 
          category_id: 1
        }),
        knex('keywords').insert({
          word: 'show', 
          category_id: 1
        }),
        knex('keywords').insert({
          word: 'movie', 
          category_id: 1
        }),
        knex('keywords').insert({
          word: 'netflix', 
          category_id: 1
        }),
        knex('keywords').insert({
          word: 'watching', 
          category_id: 1
        }),
        knex('keywords').insert({
          word: 'cinema', 
          category_id: 1
        }),
        knex('keywords').insert({
          word: 'theatre', 
          category_id: 1
        }),
        knex('keywords').insert({
          word: 'hbo', 
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
          word: 'book',
          category_id: 2
        }),
        knex('keywords').insert({
          word: 'books',
          category_id: 2
        }),
        knex('keywords').insert({
          word: 'bookstore',
          category_id: 2
        }),
        knex('keywords').insert({
          word: 'magazine',
          category_id: 2
        }),
        knex('keywords').insert({
          word: 'blog',
          category_id: 2
        }),
        knex('keywords').insert({
          word: 'newspaper',
          category_id: 2
        }),
        knex('keywords').insert({
          word: 'wiki',
          category_id: 2
        }),
        knex('keywords').insert({
          word: 'wikipedia',
          category_id: 2
        }),
        knex('keywords').insert({
          word: 'menu',
          category_id: 2
        }),
        knex('keywords').insert({
          word: 'article',
          category_id: 2
        }),
        knex('keywords').insert({
          word: 'mdn',
          category_id: 2
        }),
        knex('keywords').insert({
          word: 'novel',
          category_id: 2
        }),
        knex('keywords').insert({
          word: 'author',
          category_id: 2
        }),
        knex('keywords').insert({
          word: 'cookbook',
          category_id: 2
        }),
        knex('keywords').insert({
          word: 'chapter',
          category_id: 2
        }),
        knex('keywords').insert({
          word: 'paragraph',
          category_id: 2
        }),
        knex('keywords').insert({
          word: 'paper',
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
          word: 'chew',
          category_id: 3
        }),
        knex('keywords').insert({
          word: 'hungry',
          category_id: 3
        }),
        knex('keywords').insert({
          word: 'hangry',
          category_id: 3
        }),
        knex('keywords').insert({
          word: 'burger',
          category_id: 3
        }),
        knex('keywords').insert({
          word: 'hotdog',
          category_id: 3
        }),
        knex('keywords').insert({
          word: 'wrap',
          category_id: 3
        }),
        knex('keywords').insert({
          word: 'mcdonalds',
          category_id: 3
        }),
        knex('keywords').insert({
          word: 'pizza',
          category_id: 3
        }),
        knex('keywords').insert({
          word: 'sushi',
          category_id: 3
        }),
        knex('keywords').insert({
          word: 'ramen',
          category_id: 3
        }),
        knex('keywords').insert({
          word: 'toast',
          category_id: 3
        }),
        knex('keywords').insert({
          word: 'subway',
          category_id: 3
        }),
        knex('keywords').insert({
          word: 'steak',
          category_id: 3
        }),
        knex('keywords').insert({
          word: 'breakfast',
          category_id: 3
        }),
        knex('keywords').insert({
          word: 'brunch',
          category_id: 3
        }),
        knex('keywords').insert({
          word: 'lunch',
          category_id: 3
        }),
        knex('keywords').insert({
          word: 'dinner',
          category_id: 3
        }),
        knex('keywords').insert({
          word: 'donut',
          category_id: 3
        }),
        knex('keywords').insert({
          word: 'donuts',
          category_id: 3
        }),
        knex('keywords').insert({
          word: 'chocolate',
          category_id: 3
        }),
        knex('keywords').insert({
          word: 'candy',
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
          word: 'costco',
          category_id: 4
        }),
        knex('keywords').insert({
          word: 'walmart',
          category_id: 4
        }),
        knex('keywords').insert({
          word: 'amazon',
          category_id: 4
        }),
        knex('keywords').insert({
          word: 'superstore',
          category_id: 4
        }),
        knex('keywords').insert({
          word: 'things',
          category_id: 4
        }),
        knex('keywords').insert({
          word: 'items',
          category_id: 4
        }),
        knex('keywords').insert({
          word: 'groupon',
          category_id: 4
        }),
        knex('keywords').insert({
          word: 'mac',
          category_id: 4
        }),
        knex('keywords').insert({
          word: 'macbook',
          category_id: 4
        }),
        knex('keywords').insert({
          word: 'money',
          category_id: 4
        }),
        knex('keywords').insert({
          word: 'game',
          category_id: 4
        }),
        knex('keywords').insert({
          word: 'games',
          category_id: 4
        }),
        knex('keywords').insert({
          word: 'bluray',
          category_id: 4
        }),
        knex('keywords').insert({
          word: 'dvd',
          category_id: 4
        }),
        knex('keywords').insert({
          word: 'account',
          category_id: 4
        }),
        knex('keywords').insert({
          word: 'winners',
          category_id: 4
        }),
        knex('keywords').insert({
          word: 'clothes',
          category_id: 4
        }),
        knex('keywords').insert({
          word: 'socks',
          category_id: 4
        }),
        knex('keywords').insert({
          word: 'shoes',
          category_id: 4
        }),
        knex('keywords').insert({
          word: 'shirt',
          category_id: 4
        }),
        knex('keywords').insert({
          word: 'pants',
          category_id: 4
        }),
        knex('keywords').insert({
          word: 'shorts',
          category_id: 4
        }),
        knex('keywords').insert({
          word: 'board',
          category_id: 4
        }),
        knex('keywords').insert({
          word: 'membership',
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
