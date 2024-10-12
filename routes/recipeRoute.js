const express = require('express');
const router = express.Router();
const recipeController = require('../controllers/recipeController'); // Import the controller

// Use functions from recipeController
router.get('/', recipeController.getRecipes);
router.post('/', recipeController.createRecipe);

// Reference the correct controller functions
router.get('/:id', recipeController.getRecipeById); // Fetch specific recipe by ID (used for editing)
router.put('/:id', recipeController.updateRecipe);  // Update a specific recipe
router.delete('/:id', recipeController.deleteRecipe); // Delete a specific recipe

module.exports = router;
