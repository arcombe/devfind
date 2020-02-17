const express = require("express");
const mongoose = require("mongoose");
const passport = require("passport");

// Load input validation
//const validateProfileInput = require("../../validation/register");

// Load models
const Profile = require("../../models/Profile");
const User = require("../../models/User");

const router = express.Router();

// @route   GET api/profile/test
// @desc    Test profile route
// @access  Public
router.get("/test", (req, res) => {
  res.json({ msg: "Profile Works" });
});

// @route   GET api/profile/profile
// @desc    Get current users profile
// @access  Private
router.get(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const errors = {};

    Profile.findOne({ userID: req.user.id }, (err, profile) => {
      if (err) {
        return res.status(404).json(err);
      }
      if (!profile) {
        errors.profile = "You haven't created a profile yet.";
        return res.status(400).json(errors);
      } else {
        res.json(profile);
      }
    });
  }
);

// @route   POST api/profile/profile/create
// @desc    Creates a profile for current user.
// @access  Private
router.post(
  "/create",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Profile.findOne({ userID: req.user.id })
      .then(profile => {
        if (!profile) {
          const profile = new Profile(res.body);
        } else {
          Object.keys(req.body).map(key => {
            profile.key = req.body[key];
          });
        }
      })
      .catch(err => {
        return res.status(400).json(err);
      });
  }
);

module.exports = router;
