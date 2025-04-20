import { db } from "../db/db.js";

export interface Submission {
	assignmentID: number;
	studentID: number;
	timestamp: Date;
	grade: number;
}

export function findSubmissionsForAssignment(
	assignmentID: number,
	limit: number,
	offset: number
) {
	return db("submissions")
		.where({ assignmentID })
		.limit(limit)
		.offset(offset);
}

export function countSubmissionsForAssignment(
	assignmentID: number
): Promise<{ count: number }[]> {
	return db("submissions").where({ assignmentID }).count("* as count");
}

export function findSubmissionByID(id: number) {
	return db("submissions").where({ id }).first();
}

export function insertSubmission(submission: Submission) {
	return db("submissions").insert(submission);
}

export function findStudentInCourseByAssignmentID(
	assignmentID: number,
	userID: number
) {
	return db("user_courses")
		.where("studentID", userID)
		.andWhere(
			"courseID",
			db("assignments")
				.select("courseID")
				.where("id", assignmentID)
				.first()
		)
		.first(); // returns undefined if not found
}

export function updateSubmission(id: number, submission: Submission) {
	return db("submissions").where({ id }).update(submission);
}
