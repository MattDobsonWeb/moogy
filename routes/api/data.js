const express = require('express');
const router = express.Router();

// import models
const OpinionPerson = require('../../models/OpinionPerson');
const OpinionInanimate = require('../../models/OpinionInanimate');
const Favourite = require('../../models/Favourite');

// @route   GET api/data/test
// @desc    Tests data route
// @access  Public
router.get('/test', (req, res) => res.json({ msg: 'Data Route Works' }));

// @route   GET api/data/opinions/people
// @desc    Get opinion data on people
// @access  Public
router.get('/opinions/people', (req, res) => {
  OpinionPerson.countDocuments({}, (err, count) => {
    OpinionPerson.find()
      .sort('-updatedAt')
      .limit(req.query.count ? Number(req.query.count) : count)
      .then(people => {
        return res.json({ totalCount: count, data: people });
      });
  });
});

// @route   GET api/data/opinions/inanimate
// @desc    Get opinion data on inanimate topics
// @access  Public
router.get('/opinions/inanimate', (req, res) => {
  OpinionInanimate.countDocuments({}, (err, count) => {
    OpinionInanimate.find()
      .sort('-updatedAt')
      .limit(req.query.count ? Number(req.query.count) : count)
      .then(inanimate => {
        return res.json({ totalCount: count, data: inanimate });
      });
  });
});

// @route   GET api/data/opinions/favourites
// @desc    Get opinion data on favourites
// @access  Public
router.get('/opinions/favourites', (req, res) => {
  Favourite.countDocuments({}, (err, count) => {
    Favourite.find()
      .sort('-updatedAt')
      .limit(req.query.count ? Number(req.query.count) : count)
      .then(favourites => {
        return res.json({ totalCount: count, data: favourites });
      });
  });
});

module.exports = router;
