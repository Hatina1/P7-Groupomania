const sequelize = require("../models/index");
const { DataTypes } = require("sequelize");
const Post = require("../models/post")(sequelize, DataTypes);
const User = require("../models/user")(sequelize, DataTypes);
const Comment = require("../models/comment")(sequelize, DataTypes);
const { QueryTypes } = require("sequelize");

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
	const commentObj = req.file // if image is changed we have to parse the body and update imageUrl
		? {
				...JSON.parse(req.body.newcomment),
				imageUrl: `${req.protocol}://${req.get("host")}/images/${
					req.file.filename
				}`,
		  }
		: // if image is not changed we get directly the body of the request
		  { ...req.body };
	//console.log(req);
	Comment.create({ ...commentObj })
		.then(() => res.status(201).json({ message: "Comment created !" }))
		.catch((error) => res.status(400).json({ error }));
};

exports.likePost = (req, res, next) => {
	Post.update(
		{ likes: req.body.likes, usersLiked: req.body.usersLiked },
		{ where: { id: req.params.id } }
	)
		.then(() => {
			res.status(200).json({ message: "post like status changed !" });
		})
		.catch((error) => res.status(400).json({ error }));
};

exports.getOnePost = (req, res, next) => {
	Post.findbyPk(req.params.id)
		.then((post) => {
			res.status(200).json(post);
		})
		.catch((error) => res.status(404).json({ error }));
};

exports.modifyPost = (req, res, next) => {
	const commentObj = req.file // if image is changed we have to parse the body and update imageUrl
		? {
				...JSON.parse(req.body.newcomment),
				imageUrl: `${req.protocol}://${req.get("host")}/images/${
					req.file.filename
				}`,
		  }
		: // if image is not changed we get directly the body of the request
		  { ...req.body };
	Post.update({ ...commentObj }, { where: { id: req.params.id } })
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
			"SELECT  `Comment`.`id`, `Comment`.`content`, `Comment`.`imageUrl`,`Comment`.`createdAt`,`Comment`.`postId`,`Comment`.`userId`,`User`.`firstname`,`User`.`lastname` FROM `Comments` AS `Comment` LEFT OUTER JOIN `Users` AS `User`  ON `Comment`.`userId` = `User`.`id` ORDER BY ? ?",
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
