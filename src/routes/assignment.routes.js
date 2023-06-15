const express = require('express');
const assignments = require('../controllers/assignment.controller.js');
submissions = require('../controllers/submission.controller');
const { checkAuth } = require('../middleware/auth.middleware');

const router = express.Router();

// POST a new assignment
router.post('/assignments', checkAuth, assignments.createAssignment);

// GET a specific assignment by id
router.get('/assignments/:courseId', assignments.getAssignment);

// PATCH a specific assignment by id
router.patch('/assignments/:courseId', checkAuth, assignments.updateAssignment);

// DELETE a specific assignment by id
router.delete('/assignments/:courseId', checkAuth, assignments.deleteAssignment);

// GET all submissions of an assignment
router.get('/assignments/:courseId/submissions', checkAuth, submissions.getAllSubmissions);

// POST a new submission for an assignment
router.post('/assignments/:courseId/submissions', checkAuth, submissions.createSubmission);

// GET a specific submission by id
router.get('/assignments/:courseId/submissions/:assignmentId', checkAuth, submissions.getSubmission)

// PATCH a specific submission by id
router.patch('/assignments/:courseId/submissions/:assignmentId', checkAuth, submissions.updateSubmission)

// DELETE a specific submission by id
router.delete('/assignments/:courseId/submissions/:assignmentId', checkAuth, submissions.deleteSubmission)


module.exports = router;
