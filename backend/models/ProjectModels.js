const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
  username: {
    type: String,
  },
  password: {
    type: String,
  },
  players: [
    {
      userName: {
        type: String,
      },
      score: {
        type: String,
      },
      streak: {
        type: String,
      },
    },
  ],
  q_and_a: [
    {
      id: {
        type: String,
      },
      question: {
        type: String,
      },
      answer: {
        type: String,
      },
      otherOptions: {
        type: [],
      },
      secondsToAnswer: {
        type: String,
      },
    },
  ],
  status: {
    type: String,
  },
  currentQuestion: {
    type: String,
  },
});

const user = mongoose.model('User', userSchema);
module.exports = user;
