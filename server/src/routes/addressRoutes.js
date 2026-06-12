const express = require("express");

const router = express.Router();

const {
    createAddress,
    getAddresses,
    updateAddress,
    deleteAddress
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

router.put(
  "/:id",
  authMiddleware,
  validateAddress,
  updateAddress
);

router.delete(
  "/:id",
  authMiddleware,
  deleteAddress
);

module.exports = router;