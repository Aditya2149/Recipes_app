const pool = require('../database');

const getAllRecipes = async () => {
  const result = await pool.query('SELECT * FROM reciepe');
  return result.rows;
};

const createRecipe = async (name, description, icon) => {
  const result = await pool.query(
    'INSERT INTO reciepe (name, description, icon, created_at, updated_at) VALUES ($1, $2, $3, NOW(), NOW()) RETURNING id',
    [name, description, icon]
  );
  return result.rows[0].id;
};

module.exports = {
  getAllRecipes,
  createRecipe,
};
