const { DataTypes } = require("sequelize")

const sequelize = require("../lib/sequelize")
const { Course } = require("./course.model")
const { Submission } = require("./submission.model")

const Assignment = sequelize.define("assignment", {
    title: { type: DataTypes.STRING, allowNull: false },
    points: { type: DataTypes.INTEGER, allowNull: false },
    due: { type: DataTypes.DATE, allowNull: false }
})
Assignment.belongsTo(Course, {
    foreignKey: "courseId"
})
Assignment.hasMany(Submission, {
    foreignKey: "assignmentId"
})

module.exports = Assignment

exports.AssignmentClientFields = ["courseId", "title", "points", "due"]
