const express = require("express");
const router = express.Router();

const db = require("../models/index");
const Sequelize = require("sequelize");
const User = require("../models/user");
const userCtrl = require("../controllers/user");

/* router.post("/signup", async (req, res) => {
	const newuser = {
		email: req.body.email,
		password: req.body.password,
		firstname: req.body.firstname,
		lastname: req.body.lastname,
	};
	//console.log(newuser);
	await User.create({newuser})
		.then(() => res.status(201).json({ message: "Utilisateur créé !" }))
		.catch((error) => {
			console.log("FAILED BECAUSE:", error.message);
			res.status(500).json({ error });
		});
}); */
router.post("/signup", userCtrl.signup);
//router.post("/login", userCtrl.login);
//router.post("/login", userCtrl.deleteUser);
//router.post("/login", userCtrl.activeUser);

module.exports = router;
