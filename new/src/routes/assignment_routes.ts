import express from "express";

import {
	createAssignment,
	getAssignment,
	changeAssignment,
	removeAssignment,
} from "../controllers/assignment_controller.js";
// import {} from "../controllers/submission_controller.js";

import { authenticateToken } from "../middleware/auth.middleware.js";

const router = express.Router();

// POST a new assignment
router.route("/").post(authenticateToken, createAssignment);

router
	.route("/:id")
	.get(getAssignment) // GET a specific assignment by id
	.patch(authenticateToken, changeAssignment) // PATCH a specific assignment by id

	.delete(authenticateToken, removeAssignment); // DELETE a specific assignment by id

// // GET all submissions of an assignment
// router.get(
// 	"/:courseId/submissions",
// 	authenticateToken,
// 	submissions.getAllSubmissions
// );

// // POST a new submission for an assignment
// router.post(
// 	"/:courseId/submissions",
// 	authenticateToken,
// 	submissions.createSubmission
// );

// // GET a specific submission by id
// router.get(
// 	"/:courseId/submissions/:assignmentId",
// 	authenticateToken,
// 	submissions.getSubmission
// );

// // PATCH a specific submission by id
// router.patch(
// 	"/:courseId/submissions/:assignmentId",
// 	authenticateToken,
// 	submissions.updateSubmission
// );

// // DELETE a specific submission by id
// router.delete(
// 	"/:courseId/submissions/:assignmentId",
// 	authenticateToken,
// 	submissions.deleteSubmission
// );

export default router;
