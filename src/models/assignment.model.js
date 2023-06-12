const { DataTypes } = require("sequelize")

const sequelize = require("../lib/sequelize")

const Assignment = sequelize.define("assignment", {
    courseId: { type: DataTypes.INTEGER, allowNull: false },
    title: { type: DataTypes.STRING, allowNull: false },
    points: { type: DataTypes.INTEGER, allowNull: false },
    duedate: { type: DataTypes.DATE, allowNull: false }
})
//TODO add one-many relationship in course model
Assignment.hasMany(Submission, {
    foreignKey: "assignmentId",
    as: "submissions"
})

module.exports = Assignment
