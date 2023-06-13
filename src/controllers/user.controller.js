const { User } = require('../models/user.model');
const { createToken } = require('../lib/jwt');

async function createUser(req, res) {
    // TODO: Add authentication and authorization middleware to protect this route.
    try {
        const user = await User.create(req.body);
        res.status(201).json({ id: user.id });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
}

async function authenticateUser(req, res) {
    try {
        const user = await User.findOne({
            where: {
                email: req.body.email,
                password: req.body.password, // TODO: Hash this password before saving to
                // database???
            },
        });

        if (user) {
            const token = createToken(user);
            res.status(200).json({ token });
        } else {
            res.status(401).json({ error: 'Invalid credentials' });
        }
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}

/*
User data fetching – this action, implemented by the GET /users/{id} endpoint,
allows Users to see their own data.  Importantly, only a logged-in User can see
their own data.  The data returned by this endpoint should also include the list
of classes the User is enrolled in (for student Users) or teaching (for instructor Users).
 */
async function getUserById(req, res) {
    // TODO: Add authentication and authorization middleware to protect this route.
    try {
        const user = await User.findByPk(req.params.id);
        if (user) {
            res.status(200).json(user);
        } else {
            res.status(404).json({ error: 'User not found' });
        }
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}

module.exports = { createUser, authenticateUser, getUserById };
