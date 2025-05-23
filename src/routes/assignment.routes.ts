import express from "express";

import {
	createAssignment,
	getAssignment,
	changeAssignment,
	removeAssignment,
} from "../controllers/assignment.controller.js";

import {
	getAllSubmissionsForAssignment,
	getSubmission,
	createSubmission,
} from "../controllers/submission.controller.js";

import { authenticateToken } from "../middleware/auth.middleware.js";

const router = express.Router();

router.route("/").post(authenticateToken, createAssignment); // POST a new assignment

router
	.route("/:id")
	.get(getAssignment) // GET a specific assignment by id
	.patch(authenticateToken, changeAssignment) // PATCH a specific assignment by id
	.delete(authenticateToken, removeAssignment); // DELETE a specific assignment by id

router
	.route("/:assignmentID/submissions")
	.get(authenticateToken, getAllSubmissionsForAssignment) // GET all submissions of an assignment
	.post(authenticateToken, createSubmission); // POST a new submission for an assignment

export default router;
