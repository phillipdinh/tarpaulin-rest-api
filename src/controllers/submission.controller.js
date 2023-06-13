const { Router } = require("express")
const { ValidationError } = require("sequelize")
const { Submission, SubmissionClientFields } = require("../models/submission.model")

const router = Router()

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

module.exports = {
    createSubmission,
    getSubmission,
    updateSubmission,
    deleteSubmission
}
