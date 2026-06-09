const express = require("express");

const router = express.Router();

const {
    getUsers,
    getProfile
} = require("../controllers/userController");

const authMiddleware =
    require("../middleware/authMiddleware");

router.get("/", getUsers);

router.get(
    "/profile",
    authMiddleware,
    getProfile
);

module.exports = router;