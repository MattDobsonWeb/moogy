const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const http = require('http').createServer(app);
const io = require('socket.io')(http);
const { Wit } = require('node-wit');
const handleMessage = require('./helpers/handleMessage');
const saveReply = require('./helpers/saveReply');
const mongoose = require('mongoose');
const path = require('path');

const client = new Wit({ accessToken: process.env.WIT_KEY });

// import api routes
const data = require('./routes/api/data');

// db config
const db = process.env.MONGO_URI;

// connect to mongodb
mongoose
  .connect(db, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false
  })
  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.log(err));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

function requireHTTPS(req, res, next) {
  // The 'x-forwarded-proto' check is for Heroku
  if (
    !req.secure &&
    req.get('x-forwarded-proto') !== 'https' &&
    process.env.NODE_ENV == 'production'
  ) {
    return res.redirect('https://' + req.get('host') + req.url);
  }
  next();
}

app.use(requireHTTPS);

io.on('connection', socket => {
  let awaitingUserResponse = false;
  let originalEntities = {};

  console.log('User connected ' + socket.id);

  socket.on('disconnect', function() {
    console.log('User Disconnected');
  });

  socket.on('message', msg => {
    if (awaitingUserResponse) {
      if (msg.message === '') {
        socket.emit(
          'reply',
          "I've skipped adding your response, ask me something else!"
        );
        socket.emit('sentiment', 'positive');
        return (awaitingUserResponse = false);
      }

      client
        .message(msg.message)
        .then(data => {
          saveReply(originalEntities, data, res => {
            socket.emit('reply', res.message);
            socket.emit('sentiment', res.sentiment);
            awaitingUserResponse = false;
            originalEntities = {};
          });
        })
        .catch(err => {
          socket.emit(
            'reply',
            'Woops, it looks like something went wrong with your message, try sending something else :)'
          );
        });
    } else {
      client
        .message(msg.message)
        .then(data => {
          handleMessage(data, res => {
            if (res.awaitingReply) {
              awaitingUserResponse = true;
              originalEntities = data;
            }

            socket.emit('reply', res.message);
            socket.emit('sentiment', res.sentiment);
            console.log('Awaiting reply - ' + res.awaitingReply);
          });
        })
        .catch(err => {
          socket.emit(
            'reply',
            'Woops, it looks like something went wrong with your message, try sending something else :)'
          );
        });
    }
  });
});

// use api routes
app.use('/api/data', data);

// serve static assets if in production
if (process.env.NODE_ENV === 'production') {
  // Set static folder
  app.use(express.static('client/build'));

  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}

const port = process.env.PORT || 5000;

http.listen(port, () => console.log(`Server running on port ${port}`));
