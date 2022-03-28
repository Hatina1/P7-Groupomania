const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const sequelize = require("../models/index");
const { DataTypes } = require("sequelize");
const User = require("../models/user")(sequelize, DataTypes);

exports.signup = (req, res, next) => {
	bcrypt
		//  Password hashed in 10 iterations
		.hash(req.body.password, 10)
		.then((hash) => {
			User.build({
				email: req.body.email,
				password: hash,
				firstname: req.body.firstname,
				lastname: req.body.lastname,
			})
				.save()
				.then(() => res.status(201).json({ message: "Utilisateur créé !" }))
				.catch((error) => {
					console.log("FAILED BECAUSE:", error.message);
					res.status(500).json({ error });
				});
		})
		.catch((error) => res.status(500).json({ error }));
};

exports.login = (req, res, next) => {
	User.findOne({ where: { email: req.body.email } })
		.then((user) => {
			if (!user) {
				return res.status(401).json({ error: "Utilisateur non trouvé !" });
			} else if (user && user.isActive === false) {
				return res.status(401).json({ error: "Utilisateur à réactiver ?" });
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
						id: user.id,
						token: jwt.sign({ id: user.id }, process.env.APP_SECRET, {
							expiresIn: "24h",
						}),
					});
				})
				.catch((error) => res.status(500).json({ error }));
		})
		.catch((error) => res.status(500).json({ error }));
};

exports.deleteUser = (req, res, next) => {
	User.destroy({ where: { id: req.params.id } })
		.then(() => {
			res.status(200).json({ message: "Deleted!" });
		})
		.catch((error) => res.status(400).json({ error }));
};

exports.activeUser = (req, res, next) => {
	User.update({ isActive: req.body.isActive }, { where: { id: req.params.id } })
		.then(() => {
			if (!req.body.isActive) {
				return res.status(200).json({ message: "Utilisateur désactivé" });
			} else {
				return res.status(200).json({ message: "Utilisateur réactivé" });
			}
		})
		.catch((error) => res.status(400).json({ error }));
};
