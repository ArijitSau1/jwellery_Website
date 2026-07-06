const express = require("express");

const {
  createReturn,
  getReturns,
  getReturnById,
  updateReturnStatus,
  updatePickupAddress
} = require("../controllers/returnController");

const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

router.post(
  "/",
  authMiddleware,
  createReturn
);

router.get(
  "/",
  authMiddleware,
  getReturns
);

router.get(
  "/:id",
  authMiddleware,
  getReturnById
);

router.patch(
  "/:id/status",
  authMiddleware,
  updateReturnStatus
);

router.patch(
  "/:id/address",
  authMiddleware,
  updatePickupAddress
);

module.exports = router;