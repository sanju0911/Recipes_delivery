const express = require("express");
const { addOrder, dispatchOrder } = require("../controllers/Orders_controller");
const { authenticate } = require("../middleware/authMiddleware");
const router = express.Router();

router.post(
  "/add/:id",

  addOrder
);
router.put("/dispatch/:id", dispatchOrder);

module.exports = router;
