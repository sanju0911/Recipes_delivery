const express = require("express");
const cors = require("cors");
const db = require("./config/db");
const adminRoutes = require("./Routes/AdminRoutes");
const recipeRoutes = require("./Routes/RecipeRoutes");
const orderRoutes = require("./Routes/OrdersRoutes");

const app = express();
app.use(cors());
app.use(express.json());

app.use("/admin", adminRoutes);
app.use("/recipes", recipeRoutes);
app.use("/orders", orderRoutes);

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
