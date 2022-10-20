// const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const asyncHandler = require('express-async-handler');
const Session = require('../models/projectModels');

//@desc      Create new session
//@route     POST /api/admin
//@access    Public

const CreateSession = asyncHandler(async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    res.status(400);
    throw new Error('Please add all fields');
  }

  //hash password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  //create session

  const session = await Session.create({
    Admin: {
      username,
      password: hashedPassword,
    },
  });

  if (session) {
    res.status(201).json({
      sessionId: session.id,
    });
  } else {
    res.status(400);
    throw new Error('Invalid user data');
  }
});

//@desc      login session
//@route     POST /api/player
//@access    Public

const LoginSession = asyncHandler(async (req, res) => {
  const { username, sessionId } = req.body;

  if (!username || !sessionId) {
    res.status(400);
    throw new Error('Please add all fields');
  }

  //craete a player

  const player = await Models.create({
    username,
    sessionId,
  });

  if (player) {
    res.status(201).json({
      _id: player.id,
      username: player.name,
      SessionId: player.email,
      // token: generateToken(player._id),
    });
  } else {
    res.status(400);
    throw new Error('Invalid user data');
  }
});

//@desc      Get user data
//@route     GET /api/users/me
//@access    Private

//Generate JWT

// const generateToken = (id) => {
//   return jwt.sign({ id }, process.env.JWT_SECRET, {
//     expiresIn: '30d',
//   });
// };

module.exports = {
  CreateSession,
  LoginSession,
};
