const { DataTypes } = require("sequelize")

const sequelize = require("../lib/sequelize")


const Submission = sequelize.define("submission", {
    timestamp: { type: DataTypes.TIME, allowNull: false },
    grade: { type: DataTypes.FLOAT, allowNull: true },
    file: { type: DataTypes.STRING, allowNull: false }
})

module.exports = Submission

exports.SubmissionClientFields = [
    "assignmentId",
    "studentId",
    "timestamp",
    "grade",
    "file"
]
