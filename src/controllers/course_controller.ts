import { Request, Response } from "express";
import { invalidRoleMessage } from "../middleware/auth.middleware.js";

import {
	findAllCourses,
	insertCourse,
	findCourseByID,
	updateCourseByID,
	deleteCourseByID,
	findStudentsByCourseID,
	deleteStudentFromCourse,
	insertStudentToCourse,
	findCourseRoster,
	findAssignmentsByCourseID,
} from "../models/course_models.js";

import { User } from "../models/user_models.js";
/* TODO: id or all
Course information fetching – this action, implemented by the GET /courses
and GET /courses/{id} endpoints, allows users to see information about all
Courses or about a specific Course.  Note that the information included by
both of these endpoints should not return information about a Course’s enrolled
students or its Assignments.  Instead, that information can be fetched by
the GET /courses/{id}/students and GET /courses/{id}/assignments endpoints, respectively.
 */

export async function getAllCourses(req: Request, res: Response) {
	// This should enable the correct pagination as specified
	// "A few of the Tarpaulin API endpoints must be paginated:
	// GET /courses"
	try {
		// Parse limit and page from query parameters, defaulting to 10 items per page and the first page
		const limit = parseInt(req.query.limit as string) || 10;
		const page = parseInt(req.query.page as string) || 1;
		const offset = (page - 1) * limit;
		const courses = await findAllCourses(limit, offset);

		if (courses.length == 0) {
			return res.status(404).json({ error: `No courses found.` });
		}

		return res.status(200).json(courses);
	} catch (err: any) {
		return res.status(500).json({ error: err.message });
	}
}

export async function createCourse(req: Request, res: Response) {
	if (req.user && req.user.role == "admin") {
		try {
			const course = await insertCourse(req.body);
			return res.status(201).json({ id: course[0] });
		} catch (err: any) {
			return res.status(400).json({ error: err.message });
		}
	} else {
		return res.status(403).json(invalidRoleMessage);
	}
}

export async function getCourse(req: Request, res: Response) {
	try {
		const id = Number(req.params.id);
		const course = await findCourseByID(id);

		if (!course) {
			return res.status(404).json({ error: "Course not found" });
		}
		return res.status(200).json(course);
	} catch (err: any) {
		return res.status(500).json({ error: err.message });
	}
}

export async function changeCourse(req: Request, res: Response) {
	if (
		req.user &&
		(req.user.role == "admin" || req.user.role == "instructor")
	) {
		try {
			const id = Number(req.params.id);
			const existingCourse = await findCourseByID(id);

			if (!existingCourse) {
				return res.status(404).json({
					error: `Course with ID ${id} not found.`,
				});
			}

			if (
				req.user.role === "instructor" &&
				existingCourse.instructorID !== req.user.id
			) {
				return res.status(403).json({
					message:
						"You do not have permission to update this course.",
				});
			}

			await updateCourseByID(id, req.body);

			return res.status(200).json({ course: id });
		} catch (err: any) {
			return res.status(400).json({ error: err.message });
		}
	} else {
		return res.status(403).json(invalidRoleMessage);
	}
}

export async function removeCourse(req: Request, res: Response) {
	if (req.user && req.user.role == "admin") {
		try {
			const id = Number(req.params.id);
			await deleteCourseByID(id);

			return res.status(204).end();
		} catch (err: any) {
			return res.status(500).json({ error: err.message });
		}
	} else {
		return res.status(403).json(invalidRoleMessage);
	}
}

export async function getStudents(req: Request, res: Response) {
	if (
		req.user &&
		(req.user.role == "admin" || req.user.role == "instructor")
	) {
		try {
			const courseID = Number(req.params.id);
			const existingCourse = await findCourseByID(courseID);

			if (!existingCourse) {
				return res.status(404).json({
					error: `Course with ID ${courseID} not found.`,
				});
			}

			if (
				req.user.role == "instructor" &&
				existingCourse.instructorID !== req.user.id
			) {
				return res.status(403).json(invalidRoleMessage);
			}

			const students = await findStudentsByCourseID(courseID);

			if (!students) {
				return res.status(404).json({ error: "No students found." });
			}

			return res.status(200).json(students);
		} catch (err: any) {
			return res.status(500).json({ error: err.message });
		}
	} else {
		return res.status(403).json(invalidRoleMessage);
	}
}

export async function changeEnrollment(req: Request, res: Response) {
	if (
		req.user &&
		(req.user.role == "admin" || req.user.role == "instructor")
	) {
		const { addList = [], removeList = [] } = req.body;

		if (!Array.isArray(addList) || !Array.isArray(removeList)) {
			return res.status(400).json({
				error: 'Invalid body. "addList" and "removeList" fields must be arrays.',
			});
		}

		try {
			const courseID = Number(req.params.id);
			const existingCourse = await findCourseByID(courseID);

			if (
				req.user.role == "instructor" &&
				existingCourse.instructorID != req.user.id
			) {
				return res.status(403).json(invalidRoleMessage);
			}

			if (!existingCourse) {
				return res
					.status(404)
					.json({ error: `Course with ID ${courseID} not found.` });
			}

			// Unenroll students
			for (const studentID of removeList) {
				await deleteStudentFromCourse(courseID, studentID);
			}

			// Enroll students
			for (const studentID of addList) {
				await insertStudentToCourse(courseID, studentID);
			}

			return res
				.status(200)
				.json({ success: "Enrollment updated successfully" });
		} catch (err: any) {
			return res.status(500).json({ error: err.message });
		}
	} else {
		return res.status(403).json(invalidRoleMessage);
	}
}

/*
Course roster download – this action, implemented by
the GET /courses/{id}/roster endpoint, allows certain authorized
 users to download a CSV-formatted roster for a specific course.
 The roster will contain a list of the students currently enrolled
  in the course, in CSV format, e.g.:

"abc123","Leia Organa","organal@oregonstate.edu"
"def456","Luke Skywalker","skywallu@oregonstate.edu"
...

Importantly, this file must be generated by the API, based on the list of enrolled students stored in the database.
 */
export async function getRoster(req: Request, res: Response) {
	if (
		req.user &&
		(req.user.role == "admin" || req.user.role == "instructor")
	) {
		try {
			const courseID = Number(req.params.id);
			const existingCourse = await findCourseByID(courseID);

			if (!existingCourse) {
				return res.status(404).json({ error: "Course not found" });
			}

			if (
				req.user.role == "instructor" &&
				existingCourse.instructorID != req.user.id
			) {
				return res.status(403).json(invalidRoleMessage);
			}

			const roster = await findCourseRoster(courseID);

			if (!roster) {
				return res.status(404).json({ error: "No roster found" });
			}

			// Convert the user data to CSV
			const csvData = roster
				.map(
					(user: User) =>
						`"${user.id}","${user.name}","${user.email}"`
				)
				.join("\n");

			return res.status(200).send(csvData);
		} catch (err: any) {
			return res.status(500).json({ error: err.message });
		}
	}
}

export async function getAssignments(req: Request, res: Response) {
	try {
		const courseID = Number(req.params.id);
		const assignments = await findAssignmentsByCourseID(courseID);

		return res.status(200).json(assignments);
	} catch (err: any) {
		return res.status(500).json({ error: err.message });
	}
}
