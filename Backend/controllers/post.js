const sequelize = require("../models/index");
const { DataTypes } = require("sequelize");
const Post = require("../models/post")(sequelize, DataTypes);
const Comment = require("../models/comment")(sequelize, DataTypes);

exports.createPost = (req, res, next) => {
	Post.create({
		title: req.body.title,
		content: req.body.content,
	})
		.then(() => res.status(201).json({ message: "Post created !" }))
		.catch((error) => res.status(400).json({ error }));
};

exports.createComment = (req, res, next) => {
	Comment.create({
		...req.body,
	})
		.then(() => res.status(201).json({ message: "Comment created !" }))
		.catch((error) => res.status(400).json({ error }));
};

exports.getOnePost = (req, res, next) => {
	Post.findbyPk(req.params.id, { include: ["comments"] })
		.then((post) => {
			res.status(200).json(post);
		})
		.catch((error) => res.status(404).json({ error }));
};

exports.modifyPost = (req, res, next) => {
	Post.update(req.body, { where: { id: req.params.id } })
		.then(() => {
			res.status(200).json({ message: "Post modified !" });
		})
		.catch((error) => res.status(403).json({ error }));
};

exports.deletePost = (req, res, next) => {
	Post.destroy({ where: { id: req.params.id } })
		.then(() => {
			res.status(200).json({ message: "Deleted!" });
		})
		.catch((error) => res.status(400).json({ error }));
};

exports.getAllPosts = (req, res, next) => {
	Post.findAll() //{ include: ["comments"] }
		.then((posts) => {
			res.status(200).json(posts);
		})
		.catch((error) => res.status(404).json({ error }));
};
