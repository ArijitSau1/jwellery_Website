const express =
require("express");

const router =
express.Router();

const authMiddleware =
require("../middleware/authMiddleware");

const adminMiddleware =
require("../middleware/adminMiddleware");

const {

  schedulePickup,

  pickupCompleted,

  refundProcessing,

  refundCompleted

} = require(
  "../controllers/adminReturnController"
);

router.patch(

  "/:id/schedule-pickup",

  authMiddleware,

  adminMiddleware,

  schedulePickup

);

router.patch(

  "/:id/pickup-completed",

  authMiddleware,

  adminMiddleware,

  pickupCompleted

);

router.patch(

  "/:id/refund-processing",

  authMiddleware,

  adminMiddleware,

  refundProcessing

);

router.patch(

  "/:id/refund-completed",

  authMiddleware,

  adminMiddleware,

  refundCompleted

);

module.exports = router;