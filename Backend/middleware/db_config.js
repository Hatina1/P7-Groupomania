const dotenv = require("dotenv");
dotenv.config();

module.exports = {
	HOST: "localhost",
	USER: "root",
	PASSWORD: process.env.DB_PASSWORD,
	DB: "dbGroupomania",
	DIALECT: "mysql",
	/*pool: {
		max: 5,
		min: 0,
		acquire: 30000,
		idle: 10000,
	},*/
};
