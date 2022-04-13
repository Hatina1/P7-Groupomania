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
				allowNull: false,
			},
			likes: {
				type: DataTypes.INTEGER,
				defaultValue: 0,
			},
			dislikes: {
				type: DataTypes.INTEGER,
				defaultValue: 0,
			},
			usersLiked: {
				type: DataTypes.STRING,
				defaultValue: "",
				get() {
					return this.getDataValue("usersLiked").split(",");
				},
				set(val) {
					this.setDataValue("usersLiked", val.join(","));
				},
			},
			usersDisliked: {
				type: DataTypes.STRING,
				defaultValue: "",
				get() {
					return this.getDataValue("usersDisliked").split(",");
				},
				set(val) {
					this.setDataValue("usersDisliked", val.join(","));
				},
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
