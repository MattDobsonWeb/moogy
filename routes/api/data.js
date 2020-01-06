const express = require('express');
const router = express.Router();

// import models
const OpinionPerson = require('../../models/OpinionPerson');
const OpinionInanimate = require('../../models/OpinionInanimate');

// @route   GET api/data/test
// @desc    Tests data route
// @access  Public
router.get('/test', (req, res) => res.json({ msg: 'Data Route Works' }));

// @route   GET api/data/opinions/people
// @desc    Get opinion data on people
// @access  Public
router.get('/opinions/people', (req, res) => {
  OpinionPerson.find()
    .sort('-updatedAt')
    .then(people => {
      return res.json(people);
    });
});

// @route   GET api/data/opinions/inanimate
// @desc    Get opinion data on inanimate topics
// @access  Public
router.get('/opinions/inanimate', (req, res) => {
  OpinionInanimate.find()
    .sort('-updatedAt')
    .then(inanimate => {
      return res.json(inanimate);
    });
});

module.exports = router;
