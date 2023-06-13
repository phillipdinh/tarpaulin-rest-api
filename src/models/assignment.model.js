const { DataTypes } = require("sequelize")

const sequelize = require("../lib/sequelize")

const Assignment = sequelize.define("assignment", {
    title: { type: DataTypes.STRING, allowNull: false },
    points: { type: DataTypes.INTEGER, allowNull: false },
    due: { type: DataTypes.DATE, allowNull: false }
})

module.exports = Assignment

exports.AssignmentClientFields = ["courseId", "title", "points", "due"]
