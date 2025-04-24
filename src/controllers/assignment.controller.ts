import { Request, Response } from "express";
import { invalidRoleMessage } from "../middleware/auth.middleware.js";

import {
	insertAssignment,
	findAssignmentByID,
	updateAssignmentByID,
	deleteAssignmentByID,
} from "../models/assignment.models.js";

import { findCourseByID } from "../models/course.models.js";

import { deleteSubmissionsByAssignmentID } from "../models/submission.models.js";

/*
 * Create and store a new Assignment with specified data and adds it to the application's database.
 * Only an authenticated User with 'admin' role or an authenticated 'instructor' User
 * whose ID matches the `instructorId` of the Course corresponding to the Assignment's `courseId`
 * can create an Assignment.
 */
export async function createAssignment(req: Request, res: Response) {
	if (
		req.user &&
		(req.user.role == "admin" || req.user.role == "instructor")
	) {
		try {
			const course = await findCourseByID(req.body.courseID);

			if (
				req.user.role == "instructor" &&
				course.instructorID != req.user.id
			) {
				return res.status(403).json(invalidRoleMessage);
			}

			const assignment = await insertAssignment(req.body);

			return res.status(201).send({ id: assignment[0] });
		} catch (err: any) {
			return res.status(400).json({ error: err.message });
		}
	} else {
		return res.status(403).json(invalidRoleMessage);
	}
}

/*
 * Returns summary data about the Assignment, excluding the list of Submissions.
 */
export async function getAssignment(req: Request, res: Response) {
	try {
		const id = Number(req.params.id);
		const assignment = await findAssignmentByID(id);
		if (assignment) {
			return res.status(200).send(assignment);
		}
	} catch (err: any) {
		return res.status(500).json({ error: err.message });
	}
}

/*
 * Performs a partial update on the data for the Assignment.
 * Note that submissions cannot be modified via this endpoint.
 * Only an authenticated User with 'admin' role or an authenticated 'instructor' User whose
 * ID matches the `instructorId` of the Course corresponding to the Assignment's `courseId`
 * can update an Assignment.
 */
export async function changeAssignment(req: Request, res: Response) {
	if (
		req.user &&
		(req.user.role == "admin" || req.user.role == "instructor")
	) {
		try {
			const assignmentID = Number(req.params.id);
			const assignment = await findAssignmentByID(assignmentID);

			if (!assignment) {
				return res.status(404).json({
					error: `Assignment with ID ${assignmentID} not found.`,
				});
			}

			const course = await findCourseByID(assignment.courseID);

			if (!course) {
				return res.status(404).json({
					error: `Course with ID ${assignment.courseID} not found.`,
				});
			}

			if (
				req.user.role == "instructor" &&
				course.instructorID != req.user.id
			) {
				return res.status(403).json(invalidRoleMessage);
			}

			await updateAssignmentByID(assignmentID, req.body);

			return res.status(200).json({ assignment: assignmentID });
		} catch (err: any) {
			return res.status(500).json({ error: err.message });
		}
	} else {
		return res.status(403).json(invalidRoleMessage);
	}
}

/*
 * Completely removes the data for the specified Assignment, including all submissions.
 * Only an authenticated User with 'admin' role or an authenticated 'instructor' User
 * whose ID matches the `instructorId` of the Course corresponding to the
 * Assignment's `courseId` can delete an Assignment.
 */
export async function removeAssignment(req: Request, res: Response) {
	if (
		req.user &&
		(req.user.role == "admin" || req.user.role == "instructor")
	) {
		try {
			const assignmentID = Number(req.params.id);

			const assignment = await findAssignmentByID(assignmentID);

			if (!assignment) {
				return res.status(404).json({
					error: `Assignment with ID ${assignmentID} not found.`,
				});
			}

			const course = await findCourseByID(assignment.courseID);

			if (!course) {
				return res.status(404).json({
					error: `Course with ID ${assignment.courseID} not found.`,
				});
			}

			if (
				req.user.role == "instructor" &&
				course.instructorID != req.user.id
			) {
				return res.status(403).json(invalidRoleMessage);
			}

			await deleteSubmissionsByAssignmentID(assignmentID);
			await deleteAssignmentByID(assignmentID);
			return res.status(200).json({
				message: "Assignment and related submissions deleted.",
			});
		} catch (err: any) {
			return res.status(400).json({ error: err.message });
		}
	} else {
		return res.status(403).json(invalidRoleMessage);
	}
}
