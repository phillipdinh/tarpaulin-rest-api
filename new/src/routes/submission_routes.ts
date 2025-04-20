import express from "express";

import {
	getSubmission,
	changeSubmission,
} from "../controllers/submission_controller.js";

import { authenticateToken } from "../middleware/auth.middleware.js";

const router = express.Router();

router
	.route("/:id")
	.get(authenticateToken, getSubmission) // GET a specific submission by id
	.patch(authenticateToken, changeSubmission);

export default router;
