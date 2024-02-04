// userAuth.js

const express = require("express");
const { verifyUser } = require("../middleware/authMiddleware");

const router = express.Router();

router.get("/", verifyUser, async (req, res) => {
  try {
    return res.json({ valid: true, message: `Authorized` });
  } catch (error) {
    res.status(500).json({ error: "Error Generated" });
  }
});

module.exports = router;
