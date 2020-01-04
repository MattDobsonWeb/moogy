const io = require('socket.io-client');

export default function() {
  const socket = io.connect('http://moogy.herokuapp.com');

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
