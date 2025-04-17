import { db } from "../db/db.js";

export interface Course {
	subject: string;
	number: number;
	title: string;
	term: string;
	instructorID?: number;
}
export function findAllCourses(limit: number, offset: number) {
	return db("courses").limit(limit).offset(offset);
}

export function insertCourse(course: Course) {
	return db("courses").insert(course);
}

export function findCourseByID(id: number) {
	return db("courses").where({ id }).first();
}

export function updateCourseByID(id: number, course: Course) {
	return db("courses").where({ id }).update(course);
}

export function deleteCourseByID(id: number) {
	return db("courses").where({ id }).del();
}

export function findStudentsByCourseID(courseID: number) {
	return db("user_courses").where({ courseID }).select("studentID");
}

export function deleteStudentFromCourse(courseID: number, studentID: number) {
	return db("user_courses").where({ courseID, studentID }).del();
}

export function insertStudentToCourse(courseID: number, studentID: number) {
	return db("user_courses").insert({ courseID, studentID });
}

export function findCourseRoster(courseID: number) {
	return db("user_courses")
		.join("users", "user_courses.studentID", "users.id") // Join user_courses with users
		.where({ "user_courses.courseID": courseID }) // Filter by courseID
		.select("users.id", "users.name", "users.email"); // Select all columns from the users table
}

export function findAssignmentsByCourseID(courseID: number) {
	return db("assignments").where({ courseID });
}
