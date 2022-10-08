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
    Player: {
      name: {
        type: String,
        required: [true, 'Please add a name'],
      },
      score: {
        type: Number,
        //   required: [true, 'Please add a password'],
      },
      streak: {
        type: Number,
        //   required: [true, 'Please add a password'],
      },
    },
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

  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('Schema', ProjectSchema);
