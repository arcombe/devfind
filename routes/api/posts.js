const express = require("express");
const router = express.Router();

// @route   GET api/users/test
// @desc    Test posts route
// @access  Public
router.get("/test", (req, res) => {
  res.json({ msg: "Post works" });
});

module.exports = router;
