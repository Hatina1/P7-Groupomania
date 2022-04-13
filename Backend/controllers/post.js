const sequelize = require("../models/index");
const { DataTypes } = require("sequelize");
const Post = require("../models/post")(sequelize, DataTypes);
const Comment = require("../models/comment")(sequelize, DataTypes);

exports.createPost = (req, res, next) => {
	Post.create({
		title: req.body.title,
		content: req.body.content,
		userId: req.body.userId,
	})
		.then(() => res.status(201).json({ message: "Post created !" }))
		.catch((error) => res.status(400).json({ error }));
};

exports.createComment = (req, res, next) => {
	/* const commentObj = req.file
		? // if image is changed we have to parse the body and update imageUrl
		  {
				content: req.body.content,
				userId: req.body.userId,
				postId: req.body.postId,
				imageUrl: `${req.protocol}://${req.get("host")}/images/${
					req.file.filename
				}`,
		  }
		: // if image is not changed we get directly the body of the request
		  {
				content: req.body.content,
				userId: req.body.userId,
				postId: req.body.postId,
				imageUrl: null,
		  };
	Comment.create({ ...commentObj }) */
	Comment.create({
		content: req.body.content,
		userId: req.body.userId,
		postId: req.body.postId,
		imageUrl: null,
	})
		.then(() => res.status(201).json({ message: "Comment created !" }))
		.catch((error) => res.status(400).json({ error }));
};

exports.likePost = (req, res, next) => {
	Post.findOne({ _id: req.params.id })
		.then((post) => {
			if (req.body.like === 1 && !post.usersLiked.includes(req.body.userId)) {
				// user likes the post and his userId doesn't appear in the arrray usersLiked
				Post.updateOne(
					{
						_id: req.params.id,
					},
					{
						$push: { usersLiked: req.body.userId },
						$inc: { likes: 1 },
					}
				)
					.then(() => {
						res.status(200).json({ message: "post liked !" });
					})
					.catch((error) => res.status(400).json({ error }));
			} else if (
				req.body.like === -1 &&
				!post.usersDisliked.includes(req.body.userId)
			) {
				// userId dislikes the post and his userId doesn't appear in the arrray usersDisliked
				Post.updateOne(
					{
						_id: req.params.id,
					},
					{
						$push: { usersDisliked: req.body.userId },
						$inc: { dislikes: 1 },
					}
				)
					.then(() => {
						res.status(200).json({ message: "Post disliked !" });
					})
					.catch((error) => res.status(400).json({ error }));
				// userId modified his like/dislike preference
			} else if (
				req.body.like === 0 &&
				post.usersLiked.includes(req.body.userId)
				// if the userId is in the usersLiked array
			) {
				Post.updateOne(
					{
						_id: req.params.id,
					},
					{
						$pull: { usersLiked: req.body.userId },
						$inc: { likes: -1 },
					}
				)
					.then(() => {
						res.status(200).json({ message: "Like removed !" });
					})
					.catch((error) => res.status(400).json({ error }));
			} else if (
				req.body.like === 0 &&
				Post.usersDisliked.includes(req.body.userId)
				// if the userId is in the usersDisliked array
			) {
				Post.updateOne(
					{
						_id: req.params.id,
					},
					{
						$pull: { usersDisliked: req.body.userId },
						$inc: { dislikes: -1 },
					}
				)
					.then(() => {
						res.status(200).json({ message: "Dislike removed!" });
					})
					.catch((error) => res.status(400).json({ error }));
			}
		})
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
