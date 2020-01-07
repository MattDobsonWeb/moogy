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

// @route   GET api/data/totals
// @desc    Get data totals
// @access  Public
router.get('/totals', (req, res) => {
  let dataCount = 0,
    entryCount = 0,
    positiveCount = 0,
    neutralCount = 0,
    negativeCount = 0;

  OpinionInanimate.find().then(inanimate => {
    inanimate.map(opinion => {
      dataCount++;
      opinion.replies.map(reply => {
        entryCount++;
        if (reply.sentiment === 'positive') {
          positiveCount++;
        } else if (reply.sentiment === 'negative') {
          negativeCount++;
        } else if (reply.sentiment === 'neutral') {
          neutralCount++;
        }
      });
    });

    OpinionPerson.find().then(people => {
      people.map(opinion => {
        dataCount++;
        opinion.replies.map(reply => {
          entryCount++;
          if (reply.sentiment === 'positive') {
            positiveCount++;
          } else if (reply.sentiment === 'negative') {
            negativeCount++;
          } else if (reply.sentiment === 'neutral') {
            neutralCount++;
          }
        });
      });

      Favourite.find().then(favourites => {
        favourites.map(favourite => {
          dataCount++;

          entryCount += favourite.replies.length;
        });

        let finalSentiment;

        if (positiveCount >= negativeCount && positiveCount >= neutralCount) {
          finalSentiment = 'positive';
        } else if (
          negativeCount > positiveCount &&
          negativeCount > neutralCount
        ) {
          finalSentiment = 'negative';
        } else if (
          neutralCount > positiveCount &&
          neutralCount > negativeCount
        ) {
          finalSentiment = 'neutral';
        }

        return res.json({
          dataCount: dataCount,
          entryCount: entryCount,
          sentiment: finalSentiment,
          positiveCount: positiveCount,
          neutralCount: neutralCount,
          negativeCount: negativeCount
        });
      });
    });
  });
});

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

// @route   GET api/data/training
// @desc    Get data that needs training
// @access  Public
router.get('/training', (req, res) => {
  let trainingPeople = [],
    trainingInanimate = [];

  OpinionPerson.find().then(people => {
    people.map(person => {
      person.replies.map(reply => {
        if (!reply.sentiment) {
          const data = { names: person.names, message: reply.message };

          trainingPeople.push(data);
        }
      });
    });

    OpinionInanimate.find().then(inanimate => {
      inanimate.map(obj => {
        obj.replies.map(reply => {
          if (!reply.sentiment) {
            const data = { values: obj.values, message: reply.message };

            trainingInanimate.push(data);
          }
        });
      });

      const finalData = {
        trainingPeople: trainingPeople,
        trainingInanimate: trainingInanimate
      };

      return res.json(finalData);
    });
  });
});

// OpinionPerson.findOne({ names: data.names }).then(newPerson => {
//   let obj = newPerson.replies.find((o, i) => {
//     if (o.message === data.message) {
//       newPerson.replies[i].sentiment = 'test';

//       return true;
//     }
//   });

//   console.log(newPerson);
// });

module.exports = router;
