/*
 * This file contains a simple script to populate the database with initial
 * data from the files in the data/ directory.
 */

const sequelize = require("./src/lib/sequelize")

const { User, UserClientFields } = require("./src/models/user.model")
const { Course, CourseClientFields } = require("./src/models/course.model")
const {
    Assignment,
    AssignmentClientFields
} = require("./src/models/assignment.model")
const {
    Submission,
    SubmissionClientFields
} = require("./src/models/submission.model")

const userData = require("./src/data/users.json")
const courseData = require("./src/data/courses.json")
const assignmentData = require("./src/data/assignments.json")
const submissionData = require("./src/data/submissions.json")

sequelize.sync({ force: true }).then(async function () {
    await User.bulkCreate(userData, { fields: UserClientFields })
    await Course.bulkCreate(courseData, { fields: CourseClientFields })
    await Assignment.bulkCreate(assignmentData, {
        fields: AssignmentClientFields
    })
    await Submission.bulkCreate(submissionData, {
        fields: SubmissionClientFields
    })
})
