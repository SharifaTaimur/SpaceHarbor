const express = require('express');
const { db } = require('../models/ProjectModels');
const ObjectId = require('mongodb').ObjectId;
const router = express.Router();
const user = require('../models/ProjectModels');
const mongoose = require('mongoose');

// added --start
// const {
//   CreateSession,
//   LoginSession,
// } = require('../controllers/ProjectController');

// router.post('/admin', CreateSession);
// router.post('/player', LoginSession);

// added --end

router.route('/add').post((req, res) => {
  const username = req.body.username;
  const password = req.body.password;
  const newUser = new user({
    username,
    password,
    players: [
      {
        userName: '',
        score: '',
        streak: '',
      },
    ],
    q_and_a: [
      {
        question: '',
        answer: '',
        otherOptions: [],
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
            status: req.body.status,
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

router.route('/getQuestions').get((req, res) => {
  user
    .findOne()
    .sort({ _id: -1 })
    .limit(1)
    .then(val => {
      res.json(val);
    })
    .catch(err => console.log(err));
});

// add players and update score
router.route('/players').post((req, res) => {
  user
    .findOne()
    .sort({ _id: -1 })
    .limit(1)
    .then(val => {
      user.updateOne(
        { _id: val._id },
        {
          $push: {
            players: {
              userName: req.body.username,
              score: '',
              streak: req.body.sessionId,
            },
          },
        },
        err => {
          if (err) {
            console.log(err);
          } else {
            console.log('Players');
          }
        },
      );
    });
});

// update game status
router.route('/updatestatus').post((req, res) => {
  user
    .findOne()
    .sort({ _id: -1 })
    .limit(1)
    .then(val => {
      user.updateOne(
        { _id: val._id },
        {
          $set: {
            status: req.body.status,
          },
        },
        err => {
          if (err) {
            console.log(err);
          } else {
            console.log('Success update');
          }
        },
      );
    });
});

// delete question
router.route('/deletequestion').post((req, res) => {
  // user
  //   .findOne()
  //   .sort({ _id: -1 })
  //   .limit(1)
  //   .then(val => {
  //     user.updateOne(
  //       { _id: val._id },
  //       {
  //         $set: {
  //           status: req.body.status,
  //         },
  //       },
  //       err => {
  //         if (err) {
  //           console.log(err);
  //         } else {
  //           console.log('Success update');
  //         }
  //       },
  //     );
  //   });
});

router.route('/playersScore').post((req, res) => {
  console.log('scores', req.body);
  user
    .findOne({
      players: { $elemMatch: { userName: req.body.currentPlayer } },
    })
    .sort({ _id: -1 })
    .limit(1)
    .then(val => {
      user.updateOne(
        // { _id: val._id },
        {
          $push: {
            score: req.body.total,
          },
        },
        err => {
          if (err) {
            console.log(err);
          } else {
            console.log('Success update');
          }
        },
      );
    });
});

module.exports = router;
