const express =
require("express");

const {

  createRefund,

  getRefund

} = require(
"../controllers/refundController"
);

const authMiddleware =
require("../middleware/authMiddleware");

const router =
express.Router();

router.post(

  "/",

  authMiddleware,

  createRefund

);

router.get(

  "/:returnId",

  authMiddleware,

  getRefund

);

module.exports =
router;