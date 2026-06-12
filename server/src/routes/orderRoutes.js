const express =
require("express");

const router =
express.Router();

const {
  getOrders
} = require(
  "../controllers/orderController"
);

const authMiddleware =
require("../middleware/authMiddleware");

router.get(
  "/",
  authMiddleware,
  getOrders
);

module.exports = router;