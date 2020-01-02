const responses = require('./responses');

// import models
const OpinionPerson = require('../models/OpinionPerson');

module.exports = function handleMessage({ entities }, data) {
  let intent, message;

  let awaitingReply = false;

  if (entities.intent) {
    intent = getIntent(entities);
  }

  const greetings = firstEntityValue(entities, 'greetings');
  const opinion = firstEntityValue(entities, 'opinion');

  if (greetings) {
    data({
      message:
        responses.greetings[
          Math.floor(Math.random() * responses.greetings.length)
        ],
      awaitingReply
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
              ', what do you think of them?',
            awaitingReply: true
          });
        }

        if (person) {
          data({
            message:
              person.replies[
                Math.floor(Math.random() * person.replies.length)
              ] + ' What do you think of them?',
            awaitingReply: true
          });
        }
      });
    }

    console.log('An opinion');
  } else {
    data({
      message: "I don't have a reply",
      awaitingReply
    });
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
