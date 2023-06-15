const { User, UserClientFields } = require('../models/user.model');
const { Course } = require('../models/course.model');
const { UserCourse } = require('../models/userCourse.model');
const { genToken, invalidRoleMessage } = require('../middleware/auth.middleware');

const bcrypt = require('bcryptjs')

async function createUser(req, res) {
    if (req.body.role == 'student' || (req.user && req.userRole == 'admin')) {
        try {
            const user = await User.create(req.body);
            res.status(201).json({ id: user.id });
        } catch (err) {
            res.status(400).json({ error: err.message });
        }
    } else {
        res.status(403).json(invalidRoleMessage);
    }
}

async function authenticateUser(req, res) {
    try {
        const user = await User.findAll({ where: { email: req.body.email } });
        const authenticated = user.length > 0 && await bcrypt.compare(req.body.password, user[0].password);
        if (authenticated) {
            const token = genToken(user[0].id);
            res.status(200).json({
                token: token,
                id: user[0].id
            });
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
    if (req.user && req.params.id == req.user) {
        try {
            const user = await User.findByPk(req.user,
            {
                attributes: [
                    'id',
                    'name',
                    'email',
                    'role'
                ]
            });

            if (user) {
                if (user.role == 'student') {
                    const resBody = {
                        id: user.id,
                        name: user.name,
                        email: user.email,
                        role: user.role,
                        courses: []
                    }
                    res.status(200).json(resBody)
                    
                } else if (user.role == 'instructor') {
                    const courses = await Course.findAll({
                        where: { instructorId: user.id }
                    })
                    const resBody = {
                        id: user.id,
                        name: user.name,
                        email: user.email,
                        role: user.role,
                        courses: courses
                    }
                    res.status(200).json(resBody)
                } else {
                    res.status(200).json(user);
                }
                
            } else {
                res.status(404).json({ error: 'User not found' });
            }
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    } else {
        res.status(403).json(invalidRoleMessage);
    }
}

module.exports = { createUser, authenticateUser, getUserById };
