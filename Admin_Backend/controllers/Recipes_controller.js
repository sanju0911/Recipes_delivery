const Recipes = require("../Models/Recipes");
const Admin = require("../Models/admin");


exports.addRecipe = async (req, res) => {
  try {
    const { name, description, price } = req.body;
    const adminId = req.user.id; 
    const recipe = new Recipes({ name, description, price, admin: adminId });
    await recipe.save();

    
    const admin = await Admin.findById(adminId);
    if (!admin) {
      return res.status(404).json({ message: "Admin not found" });
    }

    admin.recipes.push(recipe._id); 
    await admin.save();

    res.status(201).json({ message: "Recipe added successfully", recipe });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};


exports.editRecipe = async (req, res) => {
  try {
    const { id } = req.params; 
    const { name, description, price } = req.body;

  
    const updatedRecipe = await Recipes.findByIdAndUpdate(
      id,
      { name, description, price },
      { new: true } 
    );

    if (!updatedRecipe) {
      return res.status(404).json({ message: "Recipe not found" });
    }

    res
      .status(200)
      .json({ message: "Recipe updated successfully", updatedRecipe });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};


exports.deleteRecipe = async (req, res) => {
  try {
    const { id } = req.params;

    
    const deletedRecipe = await Recipes.findByIdAndDelete(id);
    if (!deletedRecipe) {
      return res.status(404).json({ message: "Recipe not found" });
    }

    
    const admin = await Admin.findById(deletedRecipe.admin); 
    if (admin) {
      admin.recipes.pull(deletedRecipe._id);
      await admin.save();
    }

    res.status(200).json({ message: "Recipe deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

exports.getRecipes = async (req, res) => {
  try {
    const recipes = await Recipes.find().populate("admin", "name email"); 

    if (!recipes || recipes.length === 0) {
      return res.status(404).json({ message: "No recipes found" });
    }

    res
      .status(200)
      .json({ message: "Recipes retrieved successfully", recipes });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};
