const sequelize = require("../models/index");
const { DataTypes } = require("sequelize");
const Post = require("../models/post")(sequelize, DataTypes);
const User = require("../models/user")(sequelize, DataTypes);
const Comment = require("../models/comment")(sequelize, DataTypes);
const { QueryTypes } = require("sequelize");
const fs = require("fs");

exports.createPost = (req, res, next) => {
	const postObj = req.file // if image is changed we have to parse the body and update imageUrl
		? {
				...JSON.parse(req.body.newpost),
				imageUrl: `${req.protocol}://${req.get("host")}/images/${
					req.file.filename
				}`,
		  }
		: // if image is not changed we get directly the body of the request
		  {
				...JSON.parse(req.body.newpost),
		  };
	Post.create({ ...postObj })
		.then(() => res.status(201).json({ message: "Post created !" }))
		.catch((error) => res.status(400).json({ error }));
};

exports.createComment = (req, res, next) => {
	const commentObj = req.file // if image is changed we have to parse the body and update imageUrl
		? {
				...JSON.parse(req.body.newcomment),
				imageUrl: `${req.protocol}://${req.get("host")}/images/${
					req.file.filename
				}`,
		  }
		: // if image is not changed we get directly the body of the request
		  { ...JSON.parse(req.body.newcomment) };
	//console.log(req);
	Comment.create({ ...commentObj })
		.then(() => res.status(201).json({ message: "Comment created !" }))
		.catch((error) => res.status(400).json({ error }));
};

exports.likePost = (req, res, next) => {
	Post.findOne({ id: req.params.postId })
		.then((post) => {
			const usersListArr = post.usersLiked === "" ? [] : post.usersLiked;

			if (!post.usersLiked.includes(req.body.userId)) {
				// user likes the sauce and his userId doesn't appear in the arrray usersLiked
				usersListArr.push(req.body.userId);
				Post.update(
					{
						likes: post.likes + 1,
						usersLiked: usersListArr,
					},
					{ where: { id: req.params.postId } }
				)
					.then(() => {
						res.status(200).json({ message: "Post liked !" });
					})
					.catch((error) => {
						console.log("FAILED BECAUSE 1st cond:", error.message);
						res.status(400).json({ error });
					});
			} else if (post.usersLiked.includes(req.body.userId)) {
				// if the userId is in the usersDisliked array
				usersListArr.filter((user) => user !== req.body.userId);
				Post.update(
					{
						likes: post.likes - 1,
						usersLiked: usersListArr,
					},
					{ where: { id: req.params.postId } }
				)
					.then(() => {
						res.status(200).json({ message: "Like removed !" });
					})
					.catch((error) => {
						console.log("FAILED BECAUSE 2nd cond:", error.message);
						res.status(400).json({ error });
					});
			}
		})
		.catch((error) => {
			console.log("FAILED BECAUSE overall:", error.message);
			res.status(400).json({ error });
		});
};

exports.getOnePost = (req, res, next) => {
	Post.findbyPk(req.params.id)
		.then((post) => {
			res.status(200).json(post);
		})
		.catch((error) => res.status(404).json({ error }));
};

exports.modifyPost = (req, res, next) => {
	//check if the id from the token is the post creator or admin one
	User.findOne({ where: { id: req.auth.id } })
		.then((user) => {
			const adminBool = user.isAdmin;

			Post.findOne({ where: { id: req.params.postId } })
				.then((post) => {
					if (!adminBool || post.userId !== req.auth.id) {
						return res.status(401).json({
							message: "Désolé, vous n'etes pas autorisé à modifier le post.",
						});
					} else {
						const postObj = req.file // if image is changed we have to parse the body and update imageUrl
							? {
									...JSON.parse(req.body.updatepost),
									imageUrl: `${req.protocol}://${req.get("host")}/images/${
										req.file.filename
									}`,
							  }
							: // if image is not changed we get directly the body of the request
							  { ...JSON.parse(req.body.updatepost) };
						Post.update({ ...postObj }, { where: { id: req.params.postId } })
							.then(() => {
								res.status(200).json({ message: "Post modified !" });
							})
							.catch((error) => res.status(403).json({ error }));
					}
				})
				.catch((error) => res.status(500).json({ error }));
		})
		.catch((error) => res.status(500).json({ error }));
};

exports.deletePost = (req, res, next) => {
	Post.findOne({ where: { id: req.params.postId } })
		.then((post) => {
			if (post.imageUrl) {
				// image name is first recuperated
				const filename = post.imageUrl.split("/images/")[1];
				// image is deleted (unlinked) from the directory images
				fs.unlink(`images/${filename}`, () => {
					Post.destroy({ where: { id: req.params.postId } })
						.then(() => {
							res.status(200).json({ message: "Deleted!" });
						})
						.catch((error) => res.status(400).json({ error }));
				});
			} else {
				Post.destroy({ where: { id: req.params.postId } })
					.then(() => {
						res.status(200).json({ message: "Deleted!" });
					})
					.catch((error) => res.status(400).json({ error }));
			}
		})
		.catch((error) => res.status(500).json({ error }));
};

exports.deleteComment = (req, res, next) => {
	Comment.findOne({ where: { id: req.params.id } })
		.then((comment) => {
			if (comment.imageUrl) {
				// image name is first recuperated
				const filename = comment.imageUrl.split("/images/")[1];
				// image is deleted (unlinked) from the directory images
				fs.unlink(`images/${filename}`, () => {
					Comment.destroy({ where: { id: req.params.id } })
						.then(() => {
							res.status(200).json({ message: "Deleted!" });
						})
						.catch((error) => res.status(400).json({ error }));
				});
			} else {
				Comment.destroy({ where: { id: req.params.id } })
					.then(() => {
						res.status(200).json({ message: "Deleted!" });
					})
					.catch((error) => res.status(400).json({ error }));
			}
		})
		.catch((error) => res.status(500).json({ error }));
};

exports.getAllPosts = (req, res, next) => {
	sequelize
		.query(
			"SELECT  `Post`.`id`,  `Post`.`title`,`Post`.`content`,`Post`.`createdAt`,`Post`.`userId`,`Post`.`likes`,`Post`.`usersLiked`,`User`.`firstname`,`User`.`lastname` FROM `Posts` AS `Post` LEFT OUTER JOIN `Users` AS `User`  ON `Post`.`userId` = `User`.`id` ORDER BY `createdAt` DESC",
			{
				//replacements: [`createdAt`, `DESC`],
				type: QueryTypes.SELECT,
			}
		)
		.then((posts) => {
			res.status(200).json(posts);
		})
		.catch((error) => res.status(404).json({ error }));
};

exports.getAllComments = (req, res, next) => {
	sequelize
		.query(
			"SELECT  `Comment`.`id`, `Comment`.`content`, `Comment`.`imageUrl`, `Comment`.`gifUrl`,`Comment`.`createdAt`,`Comment`.`postId`,`Comment`.`userId`,`User`.`firstname`,`User`.`lastname` FROM `Comments` AS `Comment` LEFT OUTER JOIN `Users` AS `User`  ON `Comment`.`userId` = `User`.`id` ORDER BY ? ?",
			{
				replacements: [`createdAt`, "DESC "],
				type: QueryTypes.SELECT,
			}
		)
		.then((comments) => {
			res.status(200).json(comments);
		})
		.catch((error) => res.status(404).json({ error }));
};

/* 
include: [{ model: Comment, as: "comments", foreignKey: "postId" }],
Post.findAll() //{ include: ["comments"] } //{ include: [Comment] }

exports.getAllCommentsbyPost = (req, res, next) => {
	Comment.findAll()
		.then((comments) => {
			res.status(200).json(comments);
		})
		.catch((error) => res.status(404).json({ error }));
}; 
Post.findAll({
	include: { model: Comment, required: true },
	order: [["createdAt", "DESC"]],
})  
where:{
			postId:req.params.postId
		}
sequelize
		.query(
			"SELECT  `Comment`.`id`, `Comment`.`content`, `Comment`.`imageUrl`,`Comment`.`createdAt`,`Comment`.`postId`,`Post`.`userId` AS `Posts.userId` FROM `Comments` AS `Comment` LEFT OUTER JOIN `Posts` AS `Post`  ON `Comment`.`postId` = `Post`.`id` WHERE `Post`.`id` = req.params.postId ORDER BY  COL_ORDER TYPE_ORDER",
			{
				replacements: {
					COL_ORDER: `createdAt`,
					TYPE_ORDER: "DESC ",
				},
				replacements: [`createdAt`, "DESC "],
				type: QueryTypes.SELECT,
			}
		)
*/
