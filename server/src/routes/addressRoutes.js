const express = require("express");

const router = express.Router();

const {
    createAddress,
    getAddresses
} = require(
    "../controllers/addressController"
);

const authMiddleware =
require("../middleware/authMiddleware");

router.post(
    "/",
    authMiddleware,
    createAddress
);

router.get(
    "/",
    authMiddleware,
    getAddresses
);

module.exports = router;