const express = require('express');
const courses = require('../controllers/course.controller');
const { checkAuth } = require('../middleware/auth.middleware');

const router = express.Router();

router.route('/')
    .get(courses.getAllCourses)
    .post(checkAuth, courses.createCourse);

router.route('/:id')
    .get(courses.getCourseById)
    .patch(checkAuth, courses.updateCourseById)
    .delete(checkAuth, courses.removeCourseById);

router.route('/:id/students')
    .get(checkAuth, courses.getStudentsByCourseId)
    .post(checkAuth, courses.updateEnrollmentByCourseId);

router.route('/:id/roster')
    .get(checkAuth, courses.getRosterByCourseId);

router.route('/:id/assignments')
    .get(courses.getAssignmentsByCourseId);

module.exports = router;
