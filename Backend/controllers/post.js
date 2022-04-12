const sequelize = require("../models/index");
const { DataTypes } = require("sequelize");
const Post = require("../models/post")(sequelize, DataTypes);
const Comment = require("../models/comment")(sequelize, DataTypes);

exports.createPost = (req, res, next) => {
	Post.create({
		title: req.body.title,
		content: req.body.content,
		userId: req.body.userId,
		likes: 0,
		dislikes: 0,
		usersLiked: [],
		usersDisliked: [],
	})
		.then(() => res.status(201).json({ message: "Post created !" }))
		.catch((error) => res.status(400).json({ error }));
};

exports.createComment = (req, res, next) => {
	const commentObj = JSON.parse(req.body.comment);
	Comment.create({
		...commentObj,
		imageUrl: `${req.protocol}://${req.get("host")}/images/${
			req.file.filename
		}`,
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
