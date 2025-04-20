import express from "express";

import {
	createAssignment,
	getAssignment,
	changeAssignment,
	removeAssignment,
} from "../controllers/assignment_controller.js";

import {
	getAllSubmissionsForAssignment,
	getSubmission,
	createSubmission,
} from "../controllers/submission_controller.js";

import { authenticateToken } from "../middleware/auth.middleware.js";

const router = express.Router();

// POST a new assignment
router.route("/").post(authenticateToken, createAssignment);

router
	.route("/:id")
	.get(getAssignment) // GET a specific assignment by id
	.patch(authenticateToken, changeAssignment) // PATCH a specific assignment by id
	.delete(authenticateToken, removeAssignment); // DELETE a specific assignment by id

// GET all submissions of an assignment
router
	.route("/:assignmentID/submissions")
	.get(authenticateToken, getAllSubmissionsForAssignment)
	.post(authenticateToken, createSubmission); // POST a new submission for an assignment

export default router;
