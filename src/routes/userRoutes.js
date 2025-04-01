const express = require("express");
const { getProfile, updateProfile, deleteAccount } = require("../controllers/userControler");

const router = express.Router();

router.get("/profile", getProfile);
router.put("/profile", updateProfile);
router.delete("/delete", deleteAccount);

module.exports = router;
