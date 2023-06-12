const { DataTypes } = require("sequelize")

const sequelize = require("../lib/sequelize")

const Course = sequelize.define("course", {
    subject: { type: DataTypes.STRING, allowNull: false },
    number: { type: DataTypes.STRING, allowNull: false },
    title: { type: DataTypes.STRING, allowNull: false },
    term: { type: DataTypes.STRING, allowNull: false },
    instructorId: { type: DataTypes.INTEGER, allowNull: false }
})
Course.belongsTo(User, {
    foreignKey: "instructorId",
    as: "instructor"
})

module.exports = Course
