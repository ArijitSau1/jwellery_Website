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
const { validateAddress } = require("../middleware/validationMiddleware");

router.post(
    "/",
    authMiddleware,
    validateAddress,
    createAddress
);

router.get(
    "/",
    authMiddleware,
    getAddresses
);

module.exports = router;