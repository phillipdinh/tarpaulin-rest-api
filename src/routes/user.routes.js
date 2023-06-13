const express = require('express');
users = require('../controllers/user.controller');

const { requireAuth } = require('../middleware/auth.middleware');

const router = express.Router();

// Endpoint to create a new user
router.post('/', requireAuth, users.createUser);

// Endpoint for user login
router.post('/login', requireAuth, users.authenticateUser);

// Endpoint to get a user by id
router.get('/:id', requireAuth, users.getUserById);

module.exports = router;
