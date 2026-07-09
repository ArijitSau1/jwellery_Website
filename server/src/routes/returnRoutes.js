const express = require("express");

const {
  createReturn,
  getReturns,
  getReturnById,
  updateReturnStatus,
  updatePickupAddress,
  confirmReturn,
  getReturnStatus,
  cancelReturn
} = require("../controllers/returnController");

const authMiddleware = require("../middleware/authMiddleware");

const adminMiddleware =
require("../middleware/adminMiddleware");

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
  adminMiddleware,
  updateReturnStatus
);

router.patch(
  "/:id/address",
  authMiddleware,
  updatePickupAddress
);


router.post(
"/:id/confirm",
authMiddleware,
confirmReturn

);


router.get(
"/:id/status",
authMiddleware,
getReturnStatus
);


router.patch(
  "/:id/cancel",
  authMiddleware,
  cancelReturn

);



module.exports = router;