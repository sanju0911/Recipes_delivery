const express = require("express");
const {
  addRecipe,
  editRecipe,
  deleteRecipe,
  getRecipes,
} = require("../controllers/Recipes_controller");
const { authenticate } = require("../middleware/authMiddleware");
const router = express.Router();

// Recipe Routes (Protected)
router.post("/add", authenticate, addRecipe);
router.put("/edit/:id", authenticate, editRecipe);
router.delete("/delete/:id", authenticate, deleteRecipe);
router.get("/get-recipes", authenticate, getRecipes);

module.exports = router;
