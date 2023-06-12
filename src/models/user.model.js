const { DataTypes } = require("sequelize")

const sequelize = require("../lib/sequelize")

const User = sequelize.define("user", {
	name: { type: DataTypes.STRING, allowNull: false },
    email: { type: DataTypes.STRING, allowNull: false, unique: true },
    password: { type: DataTypes.STRING, allowNull: false },
    role: {
		type: DataTypes.ENUM('admin', 'instructor', 'student'),
		allowNull: false,
		defaultValue: 'student',
	  }
})


module.exports = User
