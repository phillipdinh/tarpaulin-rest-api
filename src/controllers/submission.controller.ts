import { Request, Response } from "express";
import { invalidRoleMessage } from "../middleware/auth.middleware.js";

import { Assignment, findAssignmentByID } from "../models/assignment.models.js";
import { Course, findCourseByID } from "../models/course.models.js";

import {
	findSubmissionsForAssignment,
	countSubmissionsForAssignment,
	findSubmissionByID,
	insertSubmission,
	findStudentInCourseByAssignmentID,
	updateSubmission,
} from "../models/submission.models.js";

export async function getSubmission(req: Request, res: Response) {
	if (
		req.user &&
		(req.user.role == "admin" || req.user.role == "instructor")
	) {
		const id = Number(req.params.id);

		try {
			const submission = await findSubmissionByID(id);
			if (!submission) {
				return res.status(404).json({
					error: `Submission with ID ${id} not found.`,
				});
			}

			return res.status(200).send(submission);
		} catch (err: any) {
			return res.status(500).json({ error: err.message });
		}
	} else {
		return res.status(403).json(invalidRoleMessage);
	}
}

export async function changeSubmission(req: Request, res: Response) {
	if (req.user && req.user.role == "instructor") {
		const id = Number(req.params.id);

		try {
			const submission = await findSubmissionByID(id);
			if (!submission) {
				return res.status(404).json({
					error: `Submission with ID ${id} not found.`,
				});
			}

			const result = await updateSubmission(id, req.body);

			return res
				.status(200)
				.send({ success: "Submission updated successfully" });
		} catch (err: any) {
			return res.status(500).json({ error: err.message });
		}
	} else {
		res.status(403).json(invalidRoleMessage);
	}
}

/*
 * Returns the list of all Submissions for an Assignment. This list should be paginated.
 * Only an authenticated User with 'admin' role or an authenticated 'instructor' User
 * whose ID matches the `instructorId` of the Course corresponding to the Assignment's `courseId`
 * can fetch the Submissions for an Assignment.
 * */
export async function getAllSubmissionsForAssignment(
	req: Request,
	res: Response
) {
	if (
		req.user &&
		(req.user.role == "admin" || req.user.role == "instructor")
	) {
		const limit = parseInt(req.query.limit as string) || 10;
		const page = parseInt(req.query.page as string) || 1;
		const offset = (page - 1) * limit;
		const assignmentID = Number(req.params.assignmentID);

		try {
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

			const submissions = await findSubmissionsForAssignment(
				assignmentID,
				limit,
				offset
			);

			const result = await countSubmissionsForAssignment(assignmentID);
			const count: number = result[0].count;

			const lastPage = Math.ceil(count / limit);
			const links: Record<string, string> = {};

			if (page < lastPage) {
				links.nextPage = `/assignments/${assignmentID}/submissions?page=${
					page + 1
				}`;
				links.lastPage = `/assignments/${assignmentID}/submissions?page=${lastPage}`;
			}
			if (page > 1) {
				links.prevPage = `/assignments/${assignmentID}/submissions?page=${
					page - 1
				}`;
				links.firstPage = `/assignments/${assignmentID}/submissions?page=1`;
			}

			return res.status(200).json({
				submissions,
				pageNumber: page,
				totalPages: lastPage,
				pageSize: limit,
				totalCount: count,
				links: links,
			});
		} catch (err: any) {
			return res.status(500).json({ error: err.message });
		}
	} else {
		return res.status(403).json(invalidRoleMessage);
	}
}

/* /assignments/{id}/submissions Post
 * Create and store a new Assignment with specified data
 * and adds it to the application's database.
 * Only an authenticated User with 'student' role who is enrolled in
 * the Course corresponding to the Assignment's `courseId` can create a Submission.
 */
export async function createSubmission(req: Request, res: Response) {
	if (req.user && req.user.role == "student") {
		try {
			const assignmentID = Number(req.params.assignmentID);

			const student = await findStudentInCourseByAssignmentID(
				assignmentID,
				req.user.id
			);

			if (!student) {
				res.status(403).json({
					error: `Not enrolled in course for assignment with ${assignmentID}.`,
				});
			}

			const submission = await insertSubmission(req.body);
			return res.status(201).send({ submission: submission });
		} catch (err: any) {
			return res.status(500).json({ error: err.message });
		}
	} else {
		res.status(403).json(invalidRoleMessage);
	}
}
