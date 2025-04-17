import express from "express";
import {
	authenticateToken,
	invalidRoleMessage,
} from "../middleware/auth.middleware.js";

import {
	getAllCourses,
	createCourse,
	getCourseByID,
	changeCourseByID,
	removeCourseByID,
	getStudentsByCourseID,
	changeEnrollmentByCourseID,
	getRosterByCourseID,
	getAssignmentsByCourseID,
} from "../controllers/course_controller.js";
const router = express.Router();

router.route("/").get(getAllCourses).post(authenticateToken, createCourse);

router
	.route("/:id")
	.get(getCourseByID)
	.patch(authenticateToken, changeCourseByID)
	.delete(authenticateToken, removeCourseByID);

router
	.route("/:id/students")
	.get(authenticateToken, getStudentsByCourseID)
	.post(authenticateToken, changeEnrollmentByCourseID);

router.route("/:id/roster").get(authenticateToken, getRosterByCourseID);

router.route("/:id/assignments").get(getAssignmentsByCourseID);

export default router;
