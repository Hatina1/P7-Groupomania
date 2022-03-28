// Modules importation
const express = require("express");
const dotenv = require("dotenv");
dotenv.config();
const Sequelize = require("sequelize");
const sequelize = require("sequelize");
const userRoutes = require("./routes/user");
const postRoutes = require("./routes/post");
const db = require("./models/index");

// Initialize express app
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
//const path = require("path");

// headers implementation
app.use((req, res, next) => {
	res.setHeader("Access-Control-Allow-Origin", "*");
	res.setHeader(
		"Access-Control-Allow-Headers",
		"Origin, X-Requested-With, Content, Accept, Content-Type, Authorization"
	);
	res.setHeader(
		"Access-Control-Allow-Methods",
		"GET, POST, PUT, DELETE, PATCH, OPTIONS"
	);
	next();
});

// routes importation
app.use("/api", userRoutes);
app.use("/api/posts", postRoutes);

// module exportation
module.exports = app;
