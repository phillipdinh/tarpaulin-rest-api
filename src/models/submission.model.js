const { DataTypes } = require("sequelize")

const sequelize = require("../lib/sequelize")


const Submission = sequelize.define("submission", {
    timestamp: { type: DataTypes.DATE, allowNull: false },
    grade: { type: DataTypes.FLOAT, allowNull: true },
    file: { type: DataTypes.STRING, allowNull: false }
})

const SubmissionClientFields = [
    "assignmentId",
    "studentId",
    "timestamp",
    "grade",
    "file"
]


exports.Submission = Submission
exports.SubmissionClientFields = SubmissionClientFields