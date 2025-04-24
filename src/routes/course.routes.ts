import express from "express";
import { authenticateToken } from "../middleware/auth.middleware.js";

import {
	getAllCourses,
	createCourse,
	getCourse,
	changeCourse,
	removeCourse,
	getStudents,
	changeEnrollment,
	getRoster,
	getAssignments,
} from "../controllers/course.controller.js";
const router = express.Router();

router.route("/").get(getAllCourses).post(authenticateToken, createCourse);

router
	.route("/:id")
	.get(getCourse)
	.patch(authenticateToken, changeCourse)
	.delete(authenticateToken, removeCourse);

router
	.route("/:id/students")
	.get(authenticateToken, getStudents)
	.post(authenticateToken, changeEnrollment);

router.route("/:id/roster").get(authenticateToken, getRoster);

router.route("/:id/assignments").get(getAssignments);

export default router;
