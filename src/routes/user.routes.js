const express = require('express');
const {
    createUser,
    authenticateUser,
    getUserById,
} = require('../controllers/user.controller');
// TODO: import authentication middleware

const router = express.Router();

// Endpoint to create a new user
router.post('/', createUser);

// Endpoint for user login
router.post('/login', authenticateUser);

// Endpoint to get a user by id
router.get('/:id', getUserById);

module.exports = router;
