const dotenv = require("dotenv");
dotenv.config();
const dbConfig = require("../middleware/db_config.js");
const Sequelize = require("sequelize");

const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
	host: dbConfig.HOST,
	dialect: dbConfig.DIALECT,
	port: 3306,
	pool: {
		max: dbConfig.pool.max,
		min: dbConfig.pool.min,
		acquire: dbConfig.pool.acquire,
		idle: dbConfig.pool.idle,
	},
	logging: console.log,
});

sequelize
	.authenticate()
	.then(() => {
		console.log("Connection has been established successfully.");
	})
	.catch((err) => {
		console.error("Unable to connect to the database:", err);
	});

const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;
db.users = require("./user.js")(sequelize, Sequelize);
db.posts = require("./post.js")(sequelize, Sequelize);
db.comments = require("./comment.js")(sequelize, Sequelize);

// belongsTo() indicates that one Post only belongs to one User
db.posts.belongsTo(db.users, {
	foreignKey: "UserId",
	as: "user",
});
// belongsTo() indicates that one Comment only belongs to one User
db.comments.belongsTo(db.users, {
	foreignKey: "UserId",
	as: "user",
});
//hasMany() indicates that one User can have many Posts
db.users.hasMany(db.posts, {
	as: "posts",
	onDelete: "SET NULL",
	onUpdate: "CASCADE",
});

//hasMany() indicates that one User can have many Posts
db.users.hasMany(db.comments, {
	as: "posts",
	onDelete: "SET NULL",
	onUpdate: "CASCADE",
});

// belongsTo() indicates that one Comment only belongs to one Post
db.comments.belongsTo(db.posts, {
	foreignKey: "PostId",
	as: "post",
});

//hasMany() indicates that one Post can have many Comments
db.posts.hasMany(db.comments, {
	as: "comments",
	onDelete: "SET NULL",
	onUpdate: "CASCADE",
});

// This will run .sync()
db.sequelize.sync({ force: true }).then(() => {
	console.log(`Database & tables created!`);
});

db.users.sync({ alter: true }).then(() => {
	db.posts.sync({ alter: true }).then(() => {
		db.comments.sync({ alter: true });
	});
});

module.exports = db;
module.exports = sequelize;
