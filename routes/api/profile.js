const express = require("express");
const mongoose = require("mongoose");
const passport = require("passport");

// Load input validation
const validateProfileInput = require("../../validation/profile");

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

// @route   GET api/profile/
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

// @route   POST api/profile/
// @desc    Creates a profile for current user.
// @access  Private
router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const { errors, isValid } = validateProfileInput(req.body);

    if (!isValid) {
      return res.status(400).json(errors);
    }

    const profileFields = {};
    profileFields.userID = req.user.id;
    profileFields.social = {};

    Object.keys(req.body).map(key => {
      if (key === "skills") {
        profileFields[key] = req.body[key].split(",");
      } else if (
        ["youtube", "twitter", "linkedin", "instagram", "facebook"].includes(
          key
        )
      ) {
        profileFields.social[key] = req.body[key];
      } else {
        profileFields[key] = req.body[key];
      }
    });
    Profile.findOne({ userID: req.user.id })
      .then(profile => {
        if (!profile) {
          const newProfile = new Profile(profileFields);

          newProfile
            .save()
            .then(profile => res.json(profile))
            .catch(err => res.status(400).json(err));
        } else {
          Profile.findOne({ handle: profileFields.handle })
            .then(profile => {
              errors.handle =
                "Profile handle already exist, please pick something else.";
            })
            .catch(err => res.status(400).json(err));
          Profile.findOneAndUpdate(
            { userID: req.user.id },
            { $set: profileFields },
            { new: true }
          )
            .then(profile => {
              res.json(profile);
            })
            .catch(err => res.status(400).json(err));
        }
      })
      .catch(err => {
        return res.status(400).json(err);
      });
  }
);

module.exports = router;
