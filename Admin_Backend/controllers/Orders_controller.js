const Orders = require("../Models/Orders");
const Recipes = require("../Models/Recipes");
const Admin = require("../Models/admin");
exports.addOrder = async (req, res) => {
  try {
    console.log("Add order endpoint hit");

    const { customerName, customerEmail } = req.body;
    const recipeId = req.params.id;
    console.log("Recipe ID:", recipeId);
    console.log("Request Body:", req.body);

    const recipe = await Recipes.findById(recipeId);
    if (!recipe) {
      return res.status(404).json({ message: "Recipe not found" });
    }

    const admin = await Admin.findById(recipe.admin);
    if (!admin) {
      return res.status(404).json({ message: "Admin not found" });
    }

    const order = new Orders({
      customerName,
      customerEmail,
      recipes: [{ recipe: recipe._id, quantity: 1 }],
      recipeName: recipe.name,
      totalPrice: recipe.price,
      admin: admin._id,
    });

    await order.save();

    res.status(201).json({
      message: "Order added successfully",
      order,
      recipe: {
        name: recipe.name,
        price: recipe.price,
      },
      admin: {
        name: admin.name,
        email: admin.email,
      },
      user: {
        name: customerName,
        email: customerEmail,
      },
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

exports.dispatchOrder = async (req, res) => {
  try {
    const { id } = req.params;

    const updatedOrder = await Orders.findByIdAndUpdate(
      id,
      { status: "active" },
      { new: true }
    );

    if (!updatedOrder) {
      return res.status(404).json({ message: "Order not found" });
    }

    res.status(200).json({ message: "Order dispatched", updatedOrder });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};
