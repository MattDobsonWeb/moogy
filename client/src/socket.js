const io = require('socket.io-client');

export default function() {
  let socket;
  if (!process.env.NODE_ENV || process.env.NODE_ENV === 'development') {
    // dev code
    socket = io.connect('http://localhost:5000');
  } else {
    // production code
    socket = io.connect('https://moogy.herokuapp.com');
  }

  function message(msg) {
    socket.emit('message', { message: msg });
  }

  function registerHandler(onMessageReceived) {
    socket.on('message', onMessageReceived);
  }

  function registerReply(reply) {
    socket.on('reply', reply);
  }

  function registerSentiment(sentiment) {
    socket.on('sentiment', sentiment);
  }

  return {
    message,
    registerHandler,
    registerReply,
    registerSentiment
  };
}
