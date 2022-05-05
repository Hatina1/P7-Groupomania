const sequelize = require("sequelize");
const Sequelize = require("sequelize");
const { DataTypes } = require("sequelize"); // Import the built-in data types
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
				unique: {
					args: true,
					msg: "Adresse email déja utilisée",
				},
			},
			password: {
				type: DataTypes.STRING,
				allowNull: false,
			},
			firstname: {
				type: DataTypes.STRING,
				allowNull: false,
			},
			lastname: {
				type: DataTypes.STRING,
				allowNull: false,
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
			isDeleted: {
				type: DataTypes.BOOLEAN,
				defaultValue: false,
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
