const Recipe = require('../models/recipe');
const Ingredient = require('../models/ingredient');
const Step = require('../models/step');
const pool = require('../database');

const getRecipes = async (req, res) => {
  const recipes = await Recipe.getAllRecipes();
  res.render('index', { recipes });
};

const createRecipe = async (req, res) => {
  const { name, description, icon, ingredients, steps } = req.body;

  const reciepeId = await Recipe.createRecipe(name, description, icon);

  if (ingredients && ingredients.length > 0) {
    await Ingredient.addIngredients(reciepeId, ingredients);
  }
  
  if (steps && steps.length > 0) {
    await Step.addSteps(reciepeId, steps);
  }

  res.status(201).send({ message: 'Recipe created successfully', id: reciepeId });
};


const getRecipeById = async (req, res) => {
  try {
    const { id } = req.params;
    const recipeResult = await pool.query('SELECT * FROM reciepe WHERE id = $1', [id]);
    const ingredientsResult = await pool.query('SELECT * FROM ingredients WHERE reciepe_id = $1', [id]);
    const stepsResult = await pool.query('SELECT * FROM steps WHERE reciepe_id = $1', [id]);

    const recipe = recipeResult.rows[0];
    const ingredients = ingredientsResult.rows;
    const steps = stepsResult.rows;

    res.render('edit', { recipe, ingredients, steps });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update a recipe
const updateRecipe = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, description, icon, ingredients, steps } = req.body;

    await pool.query(
      'UPDATE reciepe SET name = $1, description = $2, icon = $3, updated_at = NOW() WHERE id = $4',
      [name, description, icon, id]
    );

    await pool.query('DELETE FROM ingredients WHERE reciepe_id = $1', [id]);
    await pool.query('DELETE FROM steps WHERE reciepe_id = $1', [id]);

    for (const ingredient of ingredients) {
      await pool.query(
        'INSERT INTO ingredients (reciepe_id, name, icon, created_at, updated_at) VALUES ($1, $2, $3, NOW(), NOW())',
        [id, ingredient.name, ingredient.icon]
      );
    }

    for (const step of steps) {
      await pool.query(
        'INSERT INTO steps (reciepe_id, title, description, created_at, updated_at) VALUES ($1, $2, $3, NOW(), NOW())',
        [id, step.title, step.description]
      );
    }
    res.json({message:'Updated successfully'});
    res.redirect('/recipes');
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Delete a recipe
const deleteRecipe = async (req, res) => {
  try {
    const { id } = req.params;
    await pool.query('DELETE FROM ingredients WHERE reciepe_id = $1', [id]);
    await pool.query('DELETE FROM steps WHERE reciepe_id = $1', [id]);
    await pool.query('DELETE FROM reciepe WHERE id = $1', [id]);

    res.json({ message: 'Recipe deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


module.exports = {
  getRecipes,
  createRecipe, getRecipeById, deleteRecipe, updateRecipe
};
