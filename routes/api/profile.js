const express = require("express");
const mongoose = require("mongoose");

// Load Profile model
const Profile = require("../../models/Profile");

const router = express.Router();

// @route   GET api/profile/test
// @desc    Test profile route
// @access  Public
router.get("/test", (req, res) => {
  res.json({ msg: "Profile Works" });
});

// @route   Post api/profile/add
// @desc    Get current profile
// @access  Public
router.post("/add", (req, res) => {
  const newProfile = new Profile({ name: req.body.name });
  res.json(newProfile);
});

module.exports = router;
