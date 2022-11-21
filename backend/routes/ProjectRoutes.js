const express = require('express');
const { db } = require('../models/ProjectModels');
const ObjectId = require('mongodb').ObjectId;
const router = express.Router();
const user = require('../models/ProjectModels');
const mongoose = require('mongoose');

router.route('/admin').post((req, res) => {
  const username = req.body.username;
  const password = req.body.password;
  const newUser = new user({
    username,
    password,
    players: [
      {
        UserName: '',
        Score: '',
        Streak: '',
      },
    ],
    q_and_a: [
      {
        question: '',
        answer: '',
        otherOptions: [],
        secondsToAnswer: '1',
      },
    ],
    status: 'InCreation',
    currentQuestion: '',
  });

  newUser.save();
});

// get read & update data
router.route('/save').post((req, res) => {
  user
    .findOne()
    .sort({ _id: -1 })
    .limit(1)
    .then(val => {
      user.updateOne(
        { _id: val._id },
        {
          $push: {
            q_and_a: {
              question: req.body.questionName,
              answer: req.body.correctAnswer,
              otherOptions: req.body.answers,
              secondsToAnswer: '1',
            },
          },
        },
        err => {
          if (err) {
            console.log(err);
          } else {
            console.log('Success');
          }
        },
      );
    });
});

module.exports = router;
