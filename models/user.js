//const { DataTypes } = require("sequelize"); Import the built-in data types
const sequelize = require("sequelize");
//const Sequelize = require("sequelize");
const { DataTypes } = require("sequelize");
const db = require("./index");

module.exports = (sequelize, DataTypes) => {
	const User = sequelize.define(
		"User",
		{
			id: {
				type: DataTypes.INTEGER,
				autoIncrement: true,
				primaryKey: true,
			},
			email: {
				type: DataTypes.STRING,
				allowNull: false,
				unique: true,
			},
			password: {
				type: DataTypes.STRING,
				allowNull: false,
			},
			firstname: {
				type: DataTypes.STRING,
			},
			lastname: {
				type: DataTypes.STRING,
			},
			username: {
				type: DataTypes.VIRTUAL,
				get() {
					return `${this.firstName} ${this.lastName}`;
				},
			},
			isAdmin: {
				type: DataTypes.BOOLEAN,
				defaultValue: false,
			},
			isActive: {
				type: DataTypes.BOOLEAN,
				defaultValue: true,
			},
		},
		{
			timestamps: true,
			createdAt: true,
			updatedAt: false,
		}
	);
	return User;
};

// export the model to be used when a user is created
//module.exports = User;
