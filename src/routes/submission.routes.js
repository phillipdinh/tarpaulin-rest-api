const express = require('express')
const router = express.Router()
const {
    createSubmission,
    getSubmission,
    updateSubmission,
    deleteSubmission
} = require('../controllers/submission.controller')

router.post('/', createSubmission)
router.get('/:id', getSubmission)
router.patch('/:id', updateSubmission)
router.delete('/:id', deleteSubmission)

module.exports = router
