const express = require('express');
const coursesController = require('../controllers/course.controller');

const router = express.Router();

router.route('/')
    .get(coursesController.getAllCourses)
    .post(coursesController.createCourse);

router.route('/:id')
    .get(coursesController.getCourseById)
    .patch(coursesController.updateCourseById)
    .delete(coursesController.removeCourseById);

router.route('/:id/students')
    .get(coursesController.getStudentsByCourseId)
    .post(coursesController.updateEnrollmentByCourseId);

router.route('/:id/roster')
    .get(coursesController.getRosterByCourseId);

router.route('/:id/assignments')
    .get(coursesController.getAssignmentsByCourseId);

module.exports = router;
