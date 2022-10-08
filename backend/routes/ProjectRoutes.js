const express = require('express');
const router = express.Router();
const {
  CreateSession,
  LoginSession,
} = require('../controllers/ProjectController');

// const { protect } = require('../middleware/authMiddleware');
// router.post('/', registerUser);

router.post('/admin', CreateSession);
router.post('/player', LoginSession);

module.exports = router;
