const express = require ("express");

const router = express.Router();

const {
    createAddress
} = require (
    "../controllers/addressController"
);


const authMiddleware = require ("../middleware/authMiddleware");


router.post(
    "/",
    authMiddleware,
    createAddress
);

module.exports = router;