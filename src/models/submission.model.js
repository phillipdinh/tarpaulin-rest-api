const { DataTypes } = require("sequelize")

const sequelize = require("../lib/sequelize")
const { User } = require("./user.model")

const Submission = sequelize.define("submission", {
    timestamp: { type: DataTypes.TIME, allowNull: false },
    grade: { type: DataTypes.FLOAT, allowNull: true },
    file: { type: DataTypes.STRING, allowNull: false }
})
Submission.belongsTo(User, {
    foreignKey: "studentId",
    as: "student"
})

module.exports = Submission

exports.SubmissionClientFields = [
    "assignmentId",
    "studentId",
    "timestamp",
    "grade",
    "file"
]
