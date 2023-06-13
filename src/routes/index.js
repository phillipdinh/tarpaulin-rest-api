const express = require('express');
const userRoutes = require('./user.routes');
const assignmentRoutes = require('./assignment.routes');
const submissionRoutes = require('./submission.routes');
const courseRoutes = require('./course.routes');


const router = express.Router();

router.use('/users', userRoutes);
router.use('/assignments', assignmentRoutes);
router.use('/submissions', submissionRoutes);
router.use('/courses', courseRoutes);


module.exports = router;
