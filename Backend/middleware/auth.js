const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
	try {
		const token = req.headers.authorization.split(" ")[1];
		const decodedToken = jwt.verify(token, process.env.APP_SECRET);
		const id = decodedToken.id;
		req.auth = { id };
		if (req.body.userId && req.body.userId !== id) {
			throw "Invalid user ID";
			//console.log("Invalid user ID");
		} else {
			next();
		}
	} catch {
		res.status(401).json({
			error: new Error("Invalid request!"),
		});
	}
};
