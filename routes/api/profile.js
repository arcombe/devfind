const express = require("express");
const mongoose = require("mongoose");
const passport = require("passport");

// Load input validation
const validateProfileInput = require("../../validation/profile");

// Load models
const Profile = require("../../models/Profile");

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

    Profile.findOne({ userID: req.user.id })
      .populate("userID", ["name", "avatar"])
      .then(profile => {
        if (!profile) {
          errors.profile = "You haven't created a profile yet.";
          return res.status(400).json(errors);
        } else {
          res.json(profile);
        }
      })
      .catch(err => {
        return res.status(404).json({ profile: "There are no profiles" });
      });
  }
);

// @route   GET api/profile/all
// @desc    Get all profiles
// @access  Public
router.get("/all", (req, res) => {
  Profile.find()
    .populate("userID", ["name", "avatar"])
    .then(profiles => {
      if (!profiles) {
        errors.profile = "There are no profiles";
        return req.status(404).json(errors);
      }
      res.json(profiles);
    })
    .catch(err => res.status(404).json({ profile: "There are no profiles" }));
});

// @route   GET api/profile/handle/:handle
// @desc    Get profile by handle
// @access  Public
router.get("/handle/:handle", (req, res) => {
  const errors = {};

  Profile.findOne({ handle: req.params.handle })
    .populate("userID", ["name", "avatar"])
    .then(profile => {
      if (profile) {
        res.json(profile);
      } else {
        errors.handle = "No profile with that handle.";
        res.status(400).json(errors);
      }
    })
    .catch(err => res.status(404).json({ profile: "There are no profiles" }));
});

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
          Profile.findOne({ handle: profileFields.handle }).then(profile => {
            if (profile) {
              errors.handle =
                "Profile handle already exist, please pick something else.";
              return res.status(400).json(errors);
            } else {
              const newProfile = new Profile(profileFields);

              newProfile
                .save()
                .then(profile => res.json(profile))
                .catch(err => res.status(400).json(err));
            }
          });
        } else {
          Profile.findOne({ handle: profileFields.handle })
            .then(profile => {
              if (profile && profile.handle != profileFields.handle) {
                errors.handle =
                  "Profile handle already exist, please pick something else.";
                return res.status(400).json(errors);
              } else {
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
            .catch(err => res.status(400).json(err));
        }
      })
      .catch(err => {
        return res.status(400).json(err);
      });
  }
);

module.exports = router;
