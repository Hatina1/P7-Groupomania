//const { DataTypes } = require("sequelize"); Import the built-in data types
const sequelize = require("sequelize");
const Sequelize = require("sequelize");
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
			},
			imageUrl: {
				type: DataTypes.STRING,
			},
			likes: {
				type: DataTypes.INTEGER,
				defaultValue: 0,
			},
			usersLiked: {
				type: DataTypes.JSON,
				defaultValue: "",
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
