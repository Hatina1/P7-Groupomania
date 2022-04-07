//const { DataTypes } = require("sequelize"); Import the built-in data types
const sequelize = require("sequelize");
//const Sequelize = require("sequelize");
const { DataTypes } = require("sequelize");
const db = require("./index");

module.exports = (sequelize, DataTypes) => {
	const Post = sequelize.define(
		"Post",
		{
			id: {
				type: DataTypes.INTEGER,
				autoIncrement: true,
				primaryKey: true,
			},
			title: {
				type: DataTypes.STRING,
				allowNull: false,
			},
			content: {
				type: DataTypes.STRING,
				allowNull: false,
			},
		},
		{
			timestamps: true,
			createdAt: true,
			updatedAt: false,
		}
	);
	return Post;
};

// export the model to be used when a user is created
//module.exports = User;
