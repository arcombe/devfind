const express = require('express');
const mongoose = require('mongoose');
const passport = require('passport');

// Load input validation
const validateProfileInput = require('../../validation/profile');
const validateExperienceInput = require('../../validation/experience');
const validateEducationInput = require('../../validation/education');

// Load models
const Profile = require('../../models/Profile');
const User = require('../../models/User');

const router = express.Router();

// @route   GET api/profile/
// @desc    Get current users profile
// @access  Private
router.get(
  '/',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    const errors = {};

    Profile.findOne({ userID: req.user.id })
      .populate('userID', ['name', 'avatar'])
      .then(profile => {
        if (!profile) {
          errors.profile = "You haven't created a profile yet.";
          return res.status(400).json(errors);
        } else {
          res.json(profile);
        }
      })
      .catch(err => {
        return res.status(404).json({ profile: 'There are no profiles' });
      });
  }
);

// @route   GET api/profile/all
// @desc    Get all profiles
// @access  Public
router.get('/all', (req, res) => {
  Profile.find()
    .populate('userID', ['name', 'avatar'])
    .then(profiles => {
      if (!profiles) {
        errors.profile = 'There are no profiles';
        return req.status(404).json(errors);
      }
      res.json(profiles);
    })
    .catch(err => res.status(404).json({ profile: 'There are no profiles' }));
});

// @route   GET api/profile/handle/:handle
// @desc    Get profile by handle
// @access  Public
router.get('/handle/:handle', (req, res) => {
  const errors = {};

  Profile.findOne({ handle: req.params.handle })
    .populate('userID', ['name', 'avatar'])
    .then(profile => {
      if (profile) {
        res.json(profile);
      } else {
        errors.handle = 'No profile with that handle.';
        res.status(400).json(errors);
      }
    })
    .catch(err => res.status(404).json({ profile: 'There are no profiles' }));
});

// @route   POST api/profile/
// @desc    Creates a profile for current user.
// @access  Private
router.post(
  '/',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    const { errors, isValid } = validateProfileInput(req.body);

    if (!isValid) {
      return res.status(400).json(errors);
    }

    const profileFields = {};
    profileFields.userID = req.user.id;
    profileFields.social = {};

    Object.keys(req.body).map(key => {
      if (key === 'skills') {
        profileFields[key] = req.body[key].split(',');
      } else if (
        ['youtube', 'twitter', 'linkedin', 'instagram', 'facebook'].includes(
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
                'Profile handle already exist, please pick something else.';
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
                  'Profile handle already exist, please pick something else.';
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
                  .catch(err => {
                    errors.profile = 'Could not update profile.';
                    res.status(400).json(errors);
                  });
              }
            })
            .catch(err => {
              errors.profile = 'No profile found.';
              res.status(400).json(err);
            });
        }
      })
      .catch(err => {
        errors.profile = 'No profile found.';
        return res.status(400).json(errors);
      });
  }
);

// @route   POST api/profile/experience
// @desc    Add experience to profile
// @access  Private
router.post(
  '/experience',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    const { errors, isValid } = validateExperienceInput(req.body);

    if (!isValid) {
      return res.status(400).json(errors);
    }

    const expFields = {};

    Object.keys(req.body).map(key => {
      expFields[key] = req.body[key];
    });

    Profile.findOne({ userID: req.user.id }).then(profile => {
      if (!profile) {
        errors.profile = 'There is no profile created.';
        return res.status(400).json(errors);
      }

      profile.experience.unshift(expFields);
      profile.save().then(profile => res.json(profile));
    });
  }
);

// @route   POST api/profile/education
// @desc    Post education to profile
// @access  Private
router.post(
  '/education',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    const { errors, isValid } = validateEducationInput(req.body);

    if (!isValid) {
      return res.status(400).json(errors);
    }

    const eduFields = {};

    Object.keys(req.body).map(key => {
      eduFields[key] = req.body[key];
    });

    Profile.findOne({ userID: req.user.id }).then(profile => {
      if (!profile) {
        errors.profile = 'There is no profile created.';
        return res.status(400).json(errors);
      }

      profile.education.unshift(eduFields);
      profile.save().then(profile => res.json(profile));
    });
  }
);

// @route   DELETE api/profile/education/:ed_ID
// @desc    Delete education to profile
// @access  Private
router.delete(
  '/education/:ed_id',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    Profile.findOne({ userID: req.user.id }).then(profile => {
      if (!profile) {
        errors.profile = 'There is no profile created.';
        return res.status(400).json(errors);
      }

      profile.education = profile.education.filter(
        item => item._id != req.params.ed_id
      );

      profile.save().then(profile => res.json(profile));
    });
  }
);

// @route   DELETE api/profile/experience/:ex_id
// @desc    Delete education to profile
// @access  Private
router.delete(
  '/experience/:ex_id',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    Profile.findOne({ userID: req.user.id })
      .then(profile => {
        if (!profile) {
          errors.profile = 'There is no profile created.';
          return res.status(400).json(errors);
        }

        profile.experience = profile.experience.filter(
          item => item._id != req.params.ex_id
        );

        profile.save().then(profile => res.json(profile));
      })
      .catch(err => {
        errors.profile = 'There is no profile created.';
        return res.status(400).json(errors);
      });
  }
);

// @route   DELETE api/profile
// @desc    Delete user and profile.
// @access  Private
router.delete(
  '/',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    Profile.findOneAndDelete({ userID: req.user._id })
      .then(profile => {
        User.findOneAndDelete({ _id: req.user._id })
          .then(user => res.json({ success: 'true' }))
          .catch(err => res.status(400).json({ msg: err }));
      })
      .catch(err => res.status(400).json({ msg: err }));
  }
);

module.exports = router;
