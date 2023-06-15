const { Router } = require("express")
const { ValidationError } = require("sequelize")
const { Submission, SubmissionClientFields } = require("../models/submission.model")

const router = Router()

/* TODO /assignments/{id}/submissions Post
 * Create and store a new Assignment with specified data
 * and adds it to the application's database.
 * Only an authenticated User with 'student' role who is enrolled in
 * the Course corresponding to the Assignment's `courseId` can create a Submission.
 */
async function createSubmission (req, res, next) {
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

async function getSubmission (req, res, next) {
    const id = req.params.id
    try {
        const submission = await Submission.findByPk(id)
        if (submission) {
            res.status(200).send(submission)
        } else {
            next()
        }
    } catch (e) {
        next(e)
    }
}

async function updateSubmission (req, res, next) {
    const id = req.params.id


    try {
        const result = await Submission.update(req.body, {
            where: { id: id },
            fields: ['grade']
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

async function deleteSubmission (req, res, next) {
    const id = req.params.id
    const submission = await Submission.findByPk(id)

    try {
        const result = await submission.destroy({ where: { id: id } })
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
    //TODO Add authentication check

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



module.exports = {
    createSubmission,
    getSubmission,
    updateSubmission,
    deleteSubmission,
    getAllSubmissions
}
