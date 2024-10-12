const pool = require('../database');

const addIngredients = async (reciepeId, ingredients) => {
  const queries = ingredients.map(({ name, icon }) =>
    pool.query(
      'INSERT INTO ingredients (reciepe_id, name, icon, created_at, updated_at) VALUES ($1, $2, $3, NOW(), NOW())',
      [reciepeId, name, icon]
    )
  );
  await Promise.all(queries);
};

module.exports = {
  addIngredients,
};
