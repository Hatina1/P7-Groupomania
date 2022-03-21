const dotenv = require("dotenv");
dotenv.config();

module.exports = {
	HOST: "localhost",
	USER: "root",
	PASSWORD: process.env.DB_PASSWORD,
	DB: "dbGroupomania",
	dialect: "mysql2",
	/*pool: {
		max: 5,
		min: 0,
		acquire: 30000,
		idle: 10000,
	},*/
};
