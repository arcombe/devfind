const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const passport = require('passport');

// Import validator
const validatorPostInput = require('../../validation/post');
const validateCommentInput = require('../../validation/comment');

// Import model
const Post = require('../../models/Post');

// @route   GET api/posts/:post_id
// @desc    Get posts
// @access  Public
router.get('/', (req, res) => {
  Post.find()
    .sort({ date: -1 })
    .then(posts => res.json(posts))
    .catch(err => res.status(404).json(err));
});

// @route   GET api/posts/:post_id
// @desc    Get post by id
// @access  Public
router.get('/:post_id', (req, res) => {
  Post.findById(req.params.post_id)
    .then(post => res.json(post))
    .catch(err => res.status(404).json(err));
});

// @route   POST api/posts/
// @desc    Create a post.
// @access  Private
router.post(
  '/',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    const { errors, isValid } = validatorPostInput(req.body);

    if (!isValid) {
      return res.status(400).json(errors);
    }

    const postFields = {};

    postFields.user = req.user.id;
    postFields.name = req.user.name;
    postFields.avatar = req.user.avatar;
    postFields.text = req.body.text;

    const newPost = new Post(postFields);
    newPost
      .save()
      .then(post => res.json(post))
      .catch(err => res.status(400).json({ msg: err }));
  }
);

// @route   DELETE api/posts/:post_id
// @desc    Delete a post
// @access  Private
router.delete(
  '/:post_id',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    const errors = {};

    Post.findOne({ _id: req.params.post_id })
      .then(post => {
        console.log(post);
        console.log({ post: post.user, user: req.user.id });
        if (post.user == req.user.id) {
          console.log('okey');
          Post.findOneAndDelete({ _id: req.params.post_id })
            .then(post => {
              res.json(post);
            })
            .catch(err => res.status(400).json({ msg: err }));
        } else {
          errors.post =
            'You dont have the authority to delete someone elses post.';
          return res.status(400).json(errors);
        }
      })
      .catch(err => res.status(400).json({ msg: err }));
  }
);

// @route   POST api/posts/like/:post_id
// @desc    Like a post.
// @access  Public
router.post(
  '/like/:post_id',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    const errors = {};

    Post.findById(req.params.post_id)
      .then(post => {
        const liked = post.likes.reduce(
          (acc, next) => acc || next.user == req.user.id,
          false
        );
        if (liked) {
          errors.likes = 'Already liked.';
          return res.status(400).json(errors);
        } else {
          post.likes.push({ user: req.user.id });
          post.save().then(post => res.json(post));
        }
      })
      .catch(err => res.status(400).json({ msg: 'No post.' }));
  }
);

// @route   DELETE api/posts/like/:post_id
// @desc    Delete your like.
// @access  Public
router.delete(
  '/like/:post_id',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    const errors = {};

    Post.findById(req.params.post_id)
      .then(post => {
        post.likes = post.likes.filter(like => like.user != req.user.id);
        post.save().then(post => res.json(post));
      })
      .catch(err => res.status(400).json({ msg: 'No post.' }));
  }
);

// @route   POST api/posts/comment/:post_id
// @desc    Like a post.
// @access  Public
router.post(
  '/comment/:post_id',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    const { errors, isValid } = validateCommentInput(req.body);

    if (!isValid) {
      return require.status(400).json(errors);
    }

    const commentFields = {};

    commentFields.user = req.user.id;
    commentFields.text = req.body.text;
    commentFields.name = req.user.name;
    commentFields.avatar = req.user.avatar;

    Post.findById(req.params.post_id)
      .then(post => {
        post.comment.push(commentFields);
        post.save().then(post => res.json(post));
      })
      .catch(err => res.status(404).json(err));
  }
);

// @route   DELETE api/posts/comment/:post_id/:comment_id
// @desc    Delete a post.
// @access  Public
router.delete(
  '/comment/:post_id/:comment_id',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    Post.findById(req.params.post_id)
      .then(post => {
        post.comment = post.comment.filter(
          comment => comment._id != req.params.comment_id
        );
        post.save().then(post => res.json(post));
      })
      .catch(err => res.status(404).json(err));
  }
);

module.exports = router;
