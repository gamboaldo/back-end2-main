exports.seed = function (knex) {
  return knex('users').insert([
    {
      user_id: 1,
      username: 'Bruce Wayne',
      password: 'password',
      phone: '123-456-7890',
    },
    {
      user_id: 2,
      username: 'Edith Smith',
      password: 'password',
      phone: '234-567-8901',
    },
    {
      user_id: 3,
      username: 'Lily Mays',
      password: 'password',
      phone: '345-678-9012',
    },
  ]);
};
