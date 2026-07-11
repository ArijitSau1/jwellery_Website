const express =
require("express");

const router =
express.Router();

const authMiddleware =
require("../middleware/authMiddleware");

const {
  createReview,
  getMyReviews
} = require(
"../controllers/reviewController"
);

router.post(
  "/",
  authMiddleware,
  createReview
);


router.get(
  "/",
  authMiddleware,
  getMyReviews
);

module.exports = router;