const express = require('express');
users = require('../controllers/user.controller');

const { checkAuth } = require('../middleware/auth.middleware');

const router = express.Router();

// Endpoint to create a new user
router.post('/', checkAuth, users.createUser);

// Endpoint for user login
router.post('/login', checkAuth, users.authenticateUser);

// Endpoint to get a user by id
router.get('/:id', checkAuth, users.getUserById);

module.exports = router;
