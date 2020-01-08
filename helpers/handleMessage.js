const responses = require('./responses');

// import models
const OpinionPerson = require('../models/OpinionPerson');
const OpinionInanimate = require('../models/OpinionInanimate');
const Favourite = require('../models/Favourite');

module.exports = function handleMessage({ entities }, data) {
  console.log(entities);
  let intent, message;
  let awaitingReply = false;

  if (entities.sentiment) {
    sentiment = entities.sentiment[0].value;
  }

  if (entities.intent) {
    intent = getIntent(entities);
  }

  const greetings = firstEntityValue(entities, 'greetings');
  const getMood = firstEntityValue(entities, 'get_mood');
  const getInfo = firstEntityValue(entities, 'get_info');

  if (getMood) {
    let dataCount = 0;
    let positiveCount = 0;
    let negativeCount = 0;

    OpinionInanimate.find().then(inanimate => {
      inanimate.map(opinion => {
        opinion.replies.map(reply => {
          dataCount++;
          if (reply.sentiment === 'positive') {
            positiveCount++;
          } else if (reply.sentiment === 'negative') {
            negativeCount++;
          }
        });
      });

      OpinionPerson.find().then(people => {
        people.map(opinion => {
          opinion.replies.map(reply => {
            dataCount++;
            if (reply.sentiment === 'positive') {
              positiveCount++;
            } else if (reply.sentiment === 'negative') {
              negativeCount++;
            }
          });
        });

        Favourite.find().then(favourites => {
          favourites.map(favourite => {
            favourite.replies.map(reply => {
              dataCount++;

              if (reply.sentiment === 'positive') {
                positiveCount++;
              } else if (reply.sentiment === 'negative') {
                negativeCount--;
              }
            });
          });

          if (positiveCount >= negativeCount) {
            data({
              message: `I have ${dataCount} user opinions stored, with the majority of the opinions being positive. So I'm a happy robot!`,
              awaitingReply,
              sentiment: 'positive'
            });
          } else {
            data({
              message: `I have ${dataCount} user opinions stored, with the majority of the opinions being negative. So I'm a bit of a Negative Nelly!`,
              awaitingReply,
              sentiment: 'negative'
            });
          }
        });
      });
    });
  } else if (greetings) {
    data({
      message:
        responses.greetings[
          Math.floor(Math.random() * responses.greetings.length)
        ],
      awaitingReply,
      sentiment
    });
  } else if (getInfo) {
    data({
      message: responses.info,
      awaitingReply: false,
      sentiment: 'positive'
    });
  } else if (intent === 'opinion') {
    if (entities.person) {
      OpinionPerson.findOne({
        names: entities.person[0].value.toLowerCase()
      }).then(person => {
        if (!person) {
          data({
            message:
              "I don't currently have an opinion on " +
              entities.person[0].value +
              ', what do you think of them? Just hit ENTER to skip saving a reply.',
            awaitingReply: true,
            sentiment
          });
        }

        if (person) {
          const opinion = getOpinion(person);

          return data({
            message: checkPunctuation(opinion.message),
            awaitingReply: opinion.awaitingReply,
            sentiment: opinion.sentiment
          });
        }
      });
    } else if (entities.activity) {
      OpinionInanimate.findOne({
        values: entities.activity[0].value.toLowerCase()
      }).then(inanimate => {
        if (!inanimate) {
          data({
            message:
              "I don't currently have an opinion on " +
              entities.activity[0].value +
              ', what do you think? Just hit ENTER to skip saving a reply.',
            awaitingReply: true,
            sentiment
          });
        }

        if (inanimate) {
          const opinion = getOpinion(inanimate);

          return data({
            message: checkPunctuation(opinion.message),
            awaitingReply: opinion.awaitingReply,
            sentiment: opinion.sentiment
          });
        }
      });
    } else {
      message = defaultReply(sentiment);
      data({ message, awaitingReply, sentiment });
    }
  } else if (intent === 'favourite') {
    // if we can't understand the activity
    if (!entities.activity) {
      return data({
        message:
          "Sorry, I can see you're looking for a favourite, but I can't understand what on. I'm still learning",
        awaitingReply: false,
        sentiment: 'negative'
      });
    }

    // if an activity has been found
    Favourite.findOne({ values: entities.activity[0].value }).then(
      favourite => {
        if (!favourite) {
          return data({
            message:
              "I don't currently have an opinion on this, what's your opinion? Just hit ENTER to skip saving a reply.",
            awaitingReply: true,
            sentiment: 'neutral'
          });
        }

        const random = Math.floor(Math.random() * favourite.replies.length);
        const count = favourite.replies.length;

        return data({
          message: `${checkPunctuation(
            favourite.replies[random].message
          )} I have ${
            count > 1 ? `${count} opinions` : `${count} opinion`
          } on this topic. What do you think? Just hit ENTER to skip saving a reply.`,
          awaitingReply: true,
          sentiment: favourite.replies[random].sentiment
        });
      }
    );
  } else {
    message = defaultReply(sentiment);
    data({ message, awaitingReply, sentiment });
  }
};

const defaultReply = sentiment => {
  if (sentiment === 'positive') {
    return "I'm glad your so positive! If you're happy, I'm happy!";
  } else if (sentiment === 'negative') {
    return "You don't seem happy, that makes me sad :(";
  } else {
    return "You seem like you're getting on okay!";
  }
};

const firstEntityValue = (entities, entity) => {
  const val =
    entities &&
    entities[entity] &&
    Array.isArray(entities[entity]) &&
    entities[entity].length > 0 &&
    entities[entity][0].value;

  if (!val) {
    return null;
  }

  return val;
};

const getIntent = entities => {
  return entities.intent[0].value;
};

const getOpinion = object => {
  let dataCount = 0,
    positiveCount = 0,
    neutralCount = 0;
  negativeCount = 0;

  let positiveMessages = [],
    negativeMessages = [],
    neutralMessages = [];

  object.replies.map(opinion => {
    dataCount++;

    if (opinion.sentiment === 'positive') {
      positiveCount++;
      positiveMessages.push(opinion.message);
    } else if (opinion.sentiment === 'negative') {
      negativeCount++;
      negativeMessages.push(opinion.message);
    } else {
      neutralCount++;
      neutralMessages.push(opinion.message);
    }
  });

  let userMessage = '',
    sentiment = '';
  if (positiveCount > negativeCount && positiveCount > neutralCount) {
    userMessage =
      positiveMessages[Math.floor(Math.random() * positiveMessages.length)];
    sentiment = 'positive';
  } else if (negativeCount > positiveCount && negativeCount > positiveCount) {
    userMessage =
      negativeMessages[Math.floor(Math.random() * negativeMessages.length)];
    sentiment = 'negative';
  } else if (neutralCount > positiveCount && neutralCount > negativeCount) {
    userMessage =
      neutralMessages[Math.floor(Math.random() * neutralMessages.length)];
    sentiment = 'neutral';
  } else {
    userMessage =
      object.replies[Math.floor(Math.random() * object.replies.length)].message;
    sentiment = 'neutral';
  }

  return {
    message: `${checkPunctuation(userMessage)} I have ${dataCount} user ${
      dataCount > 1
        ? `opinions on this data point, overall opinion is ${sentiment}.`
        : `opinion on this data point, it's ${sentiment}.`
    } What do you think? Just hit ENTER to skip saving a reply.`,
    awaitingReply: true,
    sentiment: sentiment
  };
};

const checkPunctuation = message => {
  if (
    !message.endsWith('?') &&
    !message.endsWith('.') &&
    !message.endsWith('!')
  ) {
    return message + '.';
  } else {
    return message;
  }
};
