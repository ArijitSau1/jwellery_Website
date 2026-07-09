const express =
require("express");

const router =
express.Router();

const authMiddleware =
require("../middleware/authMiddleware");

const {
  createRefund,
  getRefund
} =
require("../controllers/refundController");

router.post(
  "/",
  authMiddleware,
  createRefund
);

router.get(
  "/returns/:returnId",
  authMiddleware,
  getRefund
);

module.exports = router;