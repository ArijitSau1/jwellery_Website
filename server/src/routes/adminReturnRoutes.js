const express =
require("express");

const router =
express.Router();

const authMiddleware =
require("../middleware/authMiddleware");

const{

schedulePickup,

pickupCompleted,

refundProcessing,

refundCompleted

}=require(
"../controllers/adminReturnController"
);

router.patch(

"/:id/schedule-pickup",

authMiddleware,

schedulePickup

);

router.patch(

"/:id/pickup-completed",

authMiddleware,

pickupCompleted

);

router.patch(

"/:id/refund-processing",

authMiddleware,

refundProcessing

);

router.patch(

"/:id/refund-completed",

authMiddleware,

refundCompleted

);

module.exports=router;