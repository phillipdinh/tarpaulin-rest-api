const { DataTypes } = require("sequelize")

const sequelize = require("../lib/sequelize")

const Submission = sequelize.define("submission", {
    assignmentId: { type: DataTypes.INTEGER, allowNull: false },
    studentId: { type: DataTypes.INTEGER, allowNull: false },
    timestamp: { type: DataTypes.TIME, allowNull: false },
    grade: { type: DataTypes.FLOAT, allowNull: true },
    file: { type: DataTypes.STRING, allowNull: false }
})
Submission.belongsTo(User, {
    foreignKey: "studentId",
    as: "student"
})

module.exports = Submission
