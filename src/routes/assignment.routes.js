const express = require('express');
const router = express.Router();
const assignments = require('./assignment.controller');

// POST a new assignment
router.post('/assignments', assignments.createAssignment);

// GET a specific assignment by id
router.get('/assignments/:id', assignments.getAssignmentById);

// PATCH a specific assignment by id
router.patch('/assignments/:id', assignments.updateAssignmentById);

// DELETE a specific assignment by id
router.delete('/assignments/:id', assignments.removeAssignmentsById);

// GET all submissions of an assignment
router.get('/assignments/:id/submissions', assignments.getSubmissionsByAssignmentId);

// POST a new submission for an assignment
router.post('/assignments/:id/submissions', assignments.createSubmission);

module.exports = router;
