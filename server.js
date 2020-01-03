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

io.on('connection', socket => {
  let awaitingUserResponse = false;
  let originalEntities = {};

  console.log('User connected ' + socket.id);

  socket.on('disconnect', function() {
    console.log('User Disconnected');
  });

  socket.on('message', msg => {
    if (awaitingUserResponse) {
      client
        .message(msg.message)
        .then(data => {
          saveReply(originalEntities, data, res => {
            io.emit('reply', res.message);
            io.emit('sentiment', res.sentiment);
            awaitingUserResponse = false;
            originalEntities = {};
          });
        })
        .catch(console.error);
    } else {
      client
        .message(msg.message)
        .then(data => {
          handleMessage(data, res => {
            if (res.awaitingReply) {
              awaitingUserResponse = true;
              originalEntities = data;
            }

            io.emit('reply', res.message);
            io.emit('sentiment', res.sentiment);
            console.log('Awaiting reply - ' + res.awaitingReply);
          });
        })
        .catch(console.error);
    }
  });
});

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
