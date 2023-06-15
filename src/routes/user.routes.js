const express = require('express');
users = require('../controllers/user.controller');
// TODO: import authentication middleware

const router = express.Router();

// Endpoint to create a new user
router.post('/', users.createUser);

// Endpoint for user login
router.post('/login', users.authenticateUser);

// Endpoint to get a user by id
router.get('/:id', getUserById);

module.exports = router;
