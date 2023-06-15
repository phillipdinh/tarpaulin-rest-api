const express = require('express');
const courses = require('../controllers/course.controller');

const router = express.Router();

router.route('/')
    .get(courses.getAllCourses)
    .post(courses.createCourse);

router.route('/:id')
    .get(courses.getCourseById)
    .patch(courses.updateCourseById)
    .delete(courses.removeCourseById);

router.route('/:id/students')
    .get(courses.getStudentsByCourseId)
    .post(courses.updateEnrollmentByCourseId);

router.route('/:id/roster')
    .get(courses.getRosterByCourseId);

router.route('/:id/assignments')
    .get(courses.getAssignmentsByCourseId);

module.exports = router;
