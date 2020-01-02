// import models
const OpinionPerson = require('../models/OpinionPerson');

module.exports = function saveReply({ entities }, ogMessage, data) {
  let intent;

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
            { $push: { replies: ogMessage } },
            { new: true }
          ).then(res => {
            data({
              success: true,
              message:
                "Thanks for your opinion, I've saved it to my database to help me learn"
            });
          });
        } else {
          const newPerson = new OpinionPerson({
            names: [`${entities.person[0].value.toLowerCase()}`],
            replies: [`${ogMessage}`]
          });

          newPerson.save().then(res => {
            data({
              success: true,
              message:
                "Thanks for your opinion, I've saved it to my database to help me learn"
            });
          });
        }
      });
    }
  }
};
