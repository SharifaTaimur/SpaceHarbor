const mongoose = require('mongoose');

const ProjectSchema = mongoose.Schema(
  {
    ID: String,
    Admin: {
      username: {
        type: String,
        required: [true, 'Please add a username'],
      },
      password: {
        type: String,
        required: [true, 'Please add a password'],
      },
    },
    Players: [
      {
        name: {
          type: String,
          required: [true, 'Please add a username'],
        },
        score: {
          type: Number,
        },
        streak: {
          type: Number,
        },
      },
    ],
    // Q_and_A: {
    //   //fix array
    //   Question: {
    //     type: String,
    //     required: [true, 'Please add a question'],
    //   },
    //   Answer: {
    //     type: String,
    //     required: [true, 'Please add an answer'],
    //   },
    //   OtherOptions: {
    //     type: String[3],
    //     required: [true, 'Please add an answer'],
    //   },
    //   SecondsToAnswer: {
    //     type: Number,
    //     required: [true, 'Please add an answer'],
    //   },
    // },
    // Status:{ InCreation | InLobby | InProgress | InLeaderBoards
    // },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('Schema', ProjectSchema);
