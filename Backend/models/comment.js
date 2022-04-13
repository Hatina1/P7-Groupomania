//const { DataTypes } = require("sequelize"); Import the built-in data types
const sequelize = require("sequelize");
const Sequelize = require("sequelize");
const { DataTypes } = require("sequelize");
const db = require("./index");

module.exports = (sequelize, DataTypes) => {
	const Comment = sequelize.define(
		"Comment",
		{
			id: {
				type: DataTypes.INTEGER,
				autoIncrement: true,
				primaryKey: true,
			},
			content: {
				type: DataTypes.TEXT,
				allowNull: false,
			},
			imageUrl: {
				type: DataTypes.STRING,
			},
			userId: {
				type: DataTypes.INTEGER,
				allowNull: false,
				foreignKey: true,
				references: {
					model: "Users",
					key: "id",
				},
			},
			postId: {
				type: DataTypes.INTEGER,
				allowNull: false,
				foreignKey: true,
				references: {
					model: "Posts",
					key: "id",
				},
			},
		},
		{
			timestamps: true,
			createdAt: true,
			updatedAt: false,
		}
	);

	return Comment;
};

// export the model to be used when a user is created
//module.exports = User;
