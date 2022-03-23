const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const db = require("../models/index");
const sequelize = require("../models/index");
const { DataTypes } = require("sequelize");
const Sequelize = require("sequelize");
const User = require("../models/user")(sequelize, DataTypes);

exports.signup = async (req, res, next) => {
	await User.build({
		email: req.body.email,
		password: req.body.password,
		firstname: req.body.firstname,
		lastname: req.body.lastname,
	})
		.save()
		.then(() => res.status(201).json({ message: "Utilisateur créé !" }))
		.catch((error) => {
			console.log("FAILED BECAUSE:", error.message);
			res.status(500).json({ error });
		});
};

exports.login = (req, res, next) => {
	User.findOne({ email: req.body.email })
		.then((user) => {
			if (!user) {
				return res.status(401).json({ error: "Utilisateur non trouvé !" });
			} else if (user && user.isActive === false) {
				return res
					.status(401)
					.json({ error: "Utilisateur désactivé (à réactiver ?)" });
			}
			bcrypt
				.compare(req.body.password, user.password)
				.then((valid) => {
					//  check if password entered is valid and corresponds to the one registered
					if (!valid) {
						return res.status(401).json({ error: "Mot de passe incorrect !" });
					}
					//  if check is valid, results set an userId and a token is given for a limited period
					res.status(200).json({
						userId: user._id, //id----------------------------------
						token: jwt.sign({ userId: user._id }, process.env.APP_SECRET, {
							expiresIn: "24h",
						}),
					});
				})
				.catch((error) => res.status(500).json({ error }));
		})
		.catch((error) => res.status(500).json({ error }));
};

exports.deleteUser = (req, res, next) => {
	User.destroy({ where: { id: req.params.id } }) //_id
		.then(() => {
			res.status(200).json({ message: "Deleted!" });
		})
		.catch((error) => res.status(400).json({ error }));
};

exports.activeUser = (req, res, next) => {
	User.update({ isActive: false }, { where: { id: req.params.id } }) //_id
		.then(() => {
			res.status(200).json({ message: "Utilisateur désactivé" });
		})
		.catch((error) => res.status(400).json({ error }));
};
