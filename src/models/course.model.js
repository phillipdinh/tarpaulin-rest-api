const { DataTypes } = require("sequelize")

const sequelize = require("../lib/sequelize")

const Course = sequelize.define("course", {
    subject: { type: DataTypes.STRING, allowNull: false },
    number: { type: DataTypes.STRING, allowNull: false },
    title: { type: DataTypes.STRING, allowNull: false },
    term: { type: DataTypes.STRING, allowNull: false }
})

module.exports = Course

exports.CourseClientFields = [
    "subject",
    "number",
    "title",
    "term",
    "instructorId"
]
