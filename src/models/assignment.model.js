const { DataTypes } = require("sequelize")

const sequelize = require("../lib/sequelize")

const Assignment = sequelize.define("assignment", {
    courseId: { type: DataTypes.INTEGER, allowNull: false },
    title: { type: DataTypes.STRING, allowNull: false },
    points: { type: DataTypes.INTEGER, allowNull: false },
    duedate: { type: DataTypes.DATE, allowNull: false }
})
Assignment.belongsTo(Course, {
	foreignKey: 'courseId',
	as: 'course',
  });
Assignment.hasMany(Submission, {
    foreignKey: "assignmentId",
    as: "submissions"
})

module.exports = Assignment
