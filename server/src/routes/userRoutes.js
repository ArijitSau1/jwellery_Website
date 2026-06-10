const express = require("express");

const router = express.Router();

const {
    getUsers,
    getProfile,
    updateProfile
} = require("../controllers/userController");

const authMiddleware =
    require("../middleware/authMiddleware");

router.get("/", getUsers);

router.get(
    "/profile",
    authMiddleware,
    getProfile
);


router.put(
  "/profile",
  authMiddleware,
  updateProfile
);

module.exports = router;