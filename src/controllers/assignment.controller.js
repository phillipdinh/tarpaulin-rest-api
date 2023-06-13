const { Router } = require("express")
const { ValidationError } = require("sequelize")
const {
    Assignment,
    AssignmentClientFields
} = require("../models/assignment.model")

const {
    Submission,
    SubmissionClientFields
} = require("../models/submission.model")

const router = Router()

/* TODO  /assignments Post
 * Create and store a new Assignment with specified data and adds it to the application's database.
 * Only an authenticated User with 'admin' role or an authenticated 'instructor' User
 * whose ID matches the `instructorId` of the Course corresponding to the Assignment's `courseId`
 * can create an Assignment.
 */
// router.post("/", async function (req, res) {
//     //TODO Add authorization check
//     try {
//         const assignment = await Assignment.create(
//             req.body,
//             AssignmentClientFields
//         )
//         res.status(201).send({ id: assignment.id })
//     } catch (e) {
//         if (e instanceof ValidationError) {
//             res.status(400).send({ error: e.message })
//         } else {
//             next(e)
//         }
//     }
//     /*else {
//         res.status(403).send({
//             err: "Unauthorized to access the specified resource"
//         })
//     }
// 	*/
// })
async function createAssignment(req, res, next) {
    try {
        const assignment = await Assignment.create(
            req.body,
            AssignmentClientFields
        )
        res.status(201).send({ id: assignment.id })
    } catch (e) {
        if (e instanceof ValidationError) {
            res.status(400).send({ error: e.message })
        } else {
            next(e)
        }
    }
}

/* TODO /assignments/{id} Get
 * Returns summary data about the Assignment, excluding the list of Submissions.
 */
// router.get("/:id", async function (req, res, next) {
//     const id = req.params.id
//     try {
//         //TODO Excluse list of submissions
//         const assignment = await Assignment.findByPk(id)
//         if (assignment) {
//             res.status(200).send(assignment)
//         } else {
//             next()
//         }
//     } catch (e) {
//         next()
//     }
// })
async function getAssignment(req, res, next) {
    const id = req.params.id
    try {
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
// router.patch("/:id", async function (req, res, next) {
//     //TODO Add authorization check
//     const id = req.params.id
//     const assignment = await Assignment.findByPk(id)
//
//     try {
//         const result = await Assignment.update(req.body, {
//             where: { id: id },
//             fields: AssignmentClientFields
//         })
//         if (result[0] > 0) {
//             res.status(204).send()
//         } else {
//             next()
//         }
//     } catch (e) {
//         next(e)
//     }
//     /*else {
//         res.status(403).send({
//             err: "Unauthorized to access the specified resource"
//         })
//     }*/
// })
async function updateAssignment(req, res, next) {
    const id = req.params.id
    const assignment = await Assignment.findByPk(id)
    try {
        const result = await Assignment.update(req.body, {
            where: { id: id },
            fields: AssignmentClientFields
        })
        if (result[0] > 0) {
            res.status(204).send()
        } else {
            next()
        }
    } catch (e) {
        next(e)
    }
}

/* TODO /assignments/{id} Delete
 * Completely removes the data for the specified Assignment, including all submissions.
 * Only an authenticated User with 'admin' role or an authenticated 'instructor' User
 * whose ID matches the `instructorId` of the Course corresponding to the
 * Assignment's `courseId` can delete an Assignment.
 */
// router.delete("/:id", requireAuthentication, async function (req, res, next) {
//     //TODO Add authorization check
//     const id = req.params.id
//     const assignment = await Assignment.findByPk(id)
//
//     try {
//         const result = await assignment.destroy({ where: { id: id } })
//         if (result > 0) {
//             res.status(204).send()
//         } else {
//             next()
//         }
//     } catch (e) {
//         next(e)
//     }
//     /*else {
//         res.status(403).send({
//             err: "Unauthorized to access the specified resource"
//         })
//     } */
// })

async function deleteAssignment(req, res, next) {
    const id = req.params.id
    const assignment = await Assignment.findByPk(id)

    try {
        const result = await assignment.destroy({ where: { id: id } })
        if (result > 0) {
            res.status(204).send()
        } else {
            next()
        }
    } catch (e) {
        next(e)
    }
}

/* TODO /assignments/{id}/submissions Get
 * Returns the list of all Submissions for an Assignment. This list should be paginated.
 * Only an authenticated User with 'admin' role or an authenticated 'instructor' User
 * whose ID matches the `instructorId` of the Course corresponding to the Assignment's `courseId`
 * can fetch the Submissions for an Assignment.
 * */
async function getAllSubmissions(req, res, next) {
    //TODO Add authorization check

    let page = parseInt(req.query.page) || 1
    page = page < 1 ? 1 : page
    const numPerPage = 10
    const offset = (page - 1) * numPerPage
    const assignmentId = req.params.assignmentId

    try {
        const result = await Submission.findAndCountAll({
            where: {
                assignmentId: assignmentId
            },
            limit: numPerPage,
            offset: offset
        })

        /*
         * Generate HATEOAS links for surrounding pages.
         */
        const lastPage = Math.ceil(result.count / numPerPage)
        const links = {}
        //TODO check if :assignmentId works right here
        if (page < lastPage) {
            links.nextPage = `/:assignmentId/submissions?page=${page + 1}`
            links.lastPage = `/businesses?page=${lastPage}`
        }
        if (page > 1) {
            links.prevPage = `/:assignmentId/submissions?page=${page - 1}`
            links.firstPage = "/:assignmentId/submissions?page=1"
        }

        /*
         * Construct and send response.
         */
        res.status(200).json({
            submissions: result.rows,
            pageNumber: page,
            totalPages: lastPage,
            pageSize: numPerPage,
            totalCount: result.count,
            links: links
        })
    } catch (e) {
        next(e)
    }
}

/* TODO /assignments/{id}/submissions Post
 * Create and store a new Assignment with specified data
 * and adds it to the application's database.
 * Only an authenticated User with 'student' role who is enrolled in
 * the Course corresponding to the Assignment's `courseId` can create a Submission.
 */

async function createSubmission(req, res, next) {
    const assignmentId = req.params.assignmentId

    try {
        const submission = await Submission.create(
            req.body,
            SubmissionClientFields
        )
        res.status(201).send({ id: submission.id })
    } catch (e) {
        if (e instanceof ValidationError) {
            res.status(400).send({ error: e.message })
        } else {
            next(e)
        }
    }
}


module.exports = { getAllSubmissions, createSubmission, deleteAssignment, getAssignment, updateAssignment }