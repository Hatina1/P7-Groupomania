const signup = (values) => {
	fetch("http://localhost:3000/api/auth/signup", {
		method: "POST",
		headers: {
			Accept: "application/json",
			"Content-Type": "application/json",
		},
		body: JSON.stringify(values),
	});
};

const login = (values) => {
	fetch("http://localhost:3000/api/auth/login", {
		method: "POST",
		headers: {
			Accept: "application/json",
			"Content-Type": "application/json",
		},
		body: JSON.stringify(values),
	}).then((response) => {
		if (response.token) {
			localStorage.setItem("user", JSON.stringify(response.token));
		}

		return response.token;
	});
};

const logout = () => {
	localStorage.removeItem("user");
};

const getCurrentUser = () => {
	return JSON.parse(localStorage.getItem("user"));
};

const authService = {
	signup,
	login,
	logout,
	getCurrentUser,
};

export default authService;
