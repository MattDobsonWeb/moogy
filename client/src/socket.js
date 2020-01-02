const io = require('socket.io-client');

export default function() {
  const socket = io.connect('http://localhost:5000');

  function message(msg) {
    socket.emit('message', { message: msg });
  }

  function registerHandler(onMessageReceived) {
    socket.on('message', onMessageReceived);
  }

  function registerReply(reply) {
    socket.on('reply', reply);
  }

  return {
    message,
    registerHandler,
    registerReply
  };
}
