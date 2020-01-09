// import models
const OpinionPerson = require('../models/OpinionPerson');
const OpinionInanimate = require('../models/OpinionInanimate');
const Favourite = require('../models/Favourite');

module.exports = function saveReply({ entities }, witData, data) {
  let intent;
  let sentiment;

  if (witData._text.includes('?')) {
    return data({
      success: false,
      message:
        "I didn't save your reply because it looks like you were trying to ask me a question.",
      sentiment: 'positive'
    });
  }

  if (witData.entities.sentiment) {
    sentiment = witData.entities.sentiment[0].value;
  }

  const getIntent = entities => {
    return entities.intent[0].value;
  };

  if (entities.intent) {
    intent = getIntent(entities);
  }

  if (intent === 'opinion') {
    if (entities.person) {
      let person = entities.person[0].value.toLowerCase();
      OpinionPerson.findOne({ names: person }).then(currentPerson => {
        if (currentPerson) {
          OpinionPerson.findOneAndUpdate(
            { names: person },
            {
              $push: {
                replies: { message: witData._text, sentiment: sentiment }
              }
            },
            { new: true }
          ).then(res => {
            data({
              success: true,
              message:
                "Thanks for your opinion, I've saved it to my database to help me learn",
              sentiment: sentiment
            });
          });
        } else {
          const newPerson = new OpinionPerson({
            names: [`${entities.person[0].value.toLowerCase()}`],
            replies: [{ message: witData._text, sentiment: sentiment }]
          });

          newPerson.save().then(res => {
            data({
              success: true,
              message:
                "Thanks for your opinion, I've saved it to my database to help me learn",
              sentiment: sentiment
            });
          });
        }
      });
    } else if (entities.activity) {
      let inanimate = entities.activity[0].value.toLowerCase();
      OpinionInanimate.findOne({ values: inanimate }).then(currentInanimate => {
        if (currentInanimate) {
          OpinionInanimate.findOneAndUpdate(
            { values: inanimate },
            {
              $push: {
                replies: { message: witData._text, sentiment: sentiment }
              }
            },
            { new: true }
          ).then(res => {
            data({
              success: true,
              message:
                "Thanks for your opinion, I've saved it to my database to help me learn",
              sentiment: sentiment
            });
          });
        } else {
          const newPerson = new OpinionInanimate({
            values: [`${entities.activity[0].value.toLowerCase()}`],
            replies: [{ message: witData._text, sentiment: sentiment }]
          });

          newPerson.save().then(res => {
            data({
              success: true,
              message:
                "Thanks for your opinion, I've saved it to my database to help me learn",
              sentiment: sentiment
            });
          });
        }
      });
    }
  } else if (intent === 'favourite') {
    let inanimate = entities.activity[0].value.toLowerCase();

    Favourite.findOne({ values: inanimate }).then(currentFavourite => {
      if (currentFavourite) {
        Favourite.findOneAndUpdate(
          { values: inanimate },
          {
            $push: {
              replies: { message: witData._text, sentiment: sentiment }
            }
          },
          { new: true }
        ).then(res => {
          return data({
            success: true,
            message: "Thanks for your opinion, I've saved it to my database.",
            sentiment: 'positive'
          });
        });
      } else {
        const newFavourite = new Favourite({
          values: [`${inanimate}`],
          replies: [{ message: witData._text, sentiment: sentiment }]
        });

        newFavourite.save().then(res => {
          return data({
            success: true,
            message: "Thanks for your opinion, I've saved it to my database.",
            sentiment: 'positive'
          });
        });
      }
    });
  }
};
