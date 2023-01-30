const { Router } = require('express');
const {
  register,
  login,
  getHistory,
  findUsers,
} = require('../controllers/users.controllers');

const router = Router();

//Get routes

router.get('/', findUsers);
router.get('/:id/history', getHistory);

//Post routes

router.post('/signup', register);
router.post('/login', login);

module.exports = {
  usersRouter: router,
};
