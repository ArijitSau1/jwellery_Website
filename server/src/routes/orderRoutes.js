const express =
require("express");

const router =
express.Router();

const {
  createOrder,
  getOrders,
  getOrderById,
  updateOrderStatus
} = require(
  "../controllers/orderController"
);

const {
  validateOrderStatus
} = require(
  "../middleware/validationMiddleware"
);


const authMiddleware =
require("../middleware/authMiddleware");

router.post(
  "/",
  authMiddleware,
  createOrder
);

router.get(
  "/",
  authMiddleware,
  getOrders
);

router.get(
  "/:id",
  authMiddleware,
  getOrderById
);

router.patch(
  "/:id/status",
  authMiddleware,
  validateOrderStatus,
  updateOrderStatus
);


module.exports = router;