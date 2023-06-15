const { ValidationError } = require("sequelize")
const {
    Assignment,
    AssignmentClientFields
} = require("../models/assignment.model")

const {
    Submission,
    SubmissionClientFields
} = require("../models/submission.model")

const Course = require('../models/course.model')

const { invalidRoleMessage } = require('../middleware/auth.middleware')

/* TODO  /assignments Post
 * Create and store a new Assignment with specified data and adds it to the application's database.
 * Only an authenticated User with 'admin' role or an authenticated 'instructor' User
 * whose ID matches the `instructorId` of the Course corresponding to the Assignment's `courseId`
 * can create an Assignment.
 */
async function createAssignment(req, res, next) {
    
    if (req.user && (req.userRole == 'admin' || req.userRole == 'instructor')) {
        try {
            const course = await Course.findByPk(req.body.courseId)

            if (course) {
                if (req.userRole == 'instructor' && course.instructorId != req.user) {
                    return res.status(403).json(invalidRoleMessage)
                }

                const assignment = await Assignment.create(
                    req.body,
                    AssignmentClientFields
                )
                res.status(201).send({ id: assignment.id })
            } else {
                next()
            }  
        } catch (e) {
            if (e instanceof ValidationError) {
                res.status(400).send({ error: e.message })
            } else {
                next(e)
            }
        }
    } else {
        res.status(403).json(invalidRoleMessage)
    }
}

/* TODO /assignments/{id} Get
 * Returns summary data about the Assignment, excluding the list of Submissions.
 */
async function getAssignment(req, res, next) {
    const id = req.params.id
    try {
        // TODO: Is there anything that needs to change to ensure we don't return the submission
        //  list?
        const assignment = await Assignment.findByPk(id)
        if (assignment) {
            res.status(200).send(assignment)
        } else {
            next()
        }
    } catch (e) {
        next(e)
    }
}

/* TODO /assignments/{id} Patch
 * Performs a partial update on the data for the Assignment.
 * Note that submissions cannot be modified via this endpoint.
 * Only an authenticated User with 'admin' role or an authenticated 'instructor' User whose
 * ID matches the `instructorId` of the Course corresponding to the Assignment's `courseId`
 * can update an Assignment.
 */
async function updateAssignment(req, res, next) {
    const id = req.params.id
    
    if (req.user && (req.userRole == 'admin' || req.userRole == 'instructor')) {
        try {
            const assignment = await Assignment.findByPk(id)

            if (assignment) {
                const course = await Course.findByPk(assignment.courseId)
                if (course) {
                    if (req.userRole == 'instructor' && course.instructorId != req.user) {
                        return res.status(403).json(invalidRoleMessage)
                    }

                    const result = await Assignment.update(req.body, {
                        where: { id: id },
                        fields: AssignmentClientFields
                    })
                    if (result[0] > 0) {
                        res.status(204).send()
                    } else {
                        next()
                    }
                } else {
                    next()
                }
            } else {
                next()
            }
        } catch (e) {
            next(e)
        }
    } else {
        return res.status(403).json(invalidRoleMessage)
    }
}

/* TODO /assignments/{id} Delete
 * Completely removes the data for the specified Assignment, including all submissions.
 * Only an authenticated User with 'admin' role or an authenticated 'instructor' User
 * whose ID matches the `instructorId` of the Course corresponding to the
 * Assignment's `courseId` can delete an Assignment.
 */
async function deleteAssignment(req, res, next) {
    const id = req.params.id
    
    if (req.user && (req.userRole == 'admin' || req.userRole == 'instructor')) {
        try {
            const assignment = await Assignment.findByPk(id)
            if (assignment) {
                const course = await Course.findByPk(assignment.courseId)

                if (course) {
                    if (req.userRole == 'instructor' && course.instructorId != req.user) {
                        return res.status(403).json(invalidRoleMessage)
                    }

                    const result = await assignment.destroy({ where: { id: id } })
                    if (result > 0) {
                        res.status(204).send()
                    } else {
                        next()
                    }
                } else {
                    next()
                }
            } else {
                next()
            }
        } catch (e) {
            next(e)
        }
    } else {
        return res.status(403).json(invalidRoleMessage)
    }
}



module.exports = { createAssignment, deleteAssignment, getAssignment, updateAssignment }