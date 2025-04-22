import { Knex } from "knex";

export async function seed(knex: Knex): Promise<void> {
	// Deletes ALL existing entries
	await knex("user_courses").del();

	// Step 1: Join submissions → assignments → courses
	const submissions = await knex("submissions")
		.join("assignments", "submissions.assignmentID", "=", "assignments.id")
		.select("submissions.studentID", "assignments.courseID as courseID");

	// Step 2: Create unique (studentID, courseID) pairs
	const seen = new Set();
	const userCourses = [];

	for (const row of submissions) {
		const key = `${row.studentID}-${row.courseID}`;
		if (!seen.has(key)) {
			seen.add(key);
			userCourses.push({
				studentID: row.studentID,
				courseID: row.courseID,
			});
		}
	}

	await knex("user_courses").insert(userCourses);
}
