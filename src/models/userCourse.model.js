const { DataTypes } = require("sequelize")
const sequelize = require("../lib/sequelize")
const User = require("./user.model")
const Course = require("./course.model")

const UserCourse = sequelize.define('UserCourse', {
    instructorId: {
        type: DataTypes.INTEGER,
        references: {
            model: 'users',
            key: 'id',
        },
    },
    courseId: {
        type: DataTypes.INTEGER,
        references: {
            model: 'courses',
            key: 'id',
        },
    },
});


module.exports = UserCourse