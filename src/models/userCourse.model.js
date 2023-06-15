const { DataTypes } = require("sequelize")
const sequelize = require("../lib/sequelize")
const { User } = require("./user.model")
const { Course } = require("./course.model")

const UserCourse = sequelize.define('UserCourse', {
    studentId: {
        type: DataTypes.INTEGER,
        references: {
            model: User,
            key: 'id',
        },
    },
    courseId: {
        type: DataTypes.INTEGER,
        references: {
            model: Course,
            key: 'id',
        },
    },
});


exports.UserCourse = UserCourse