const signup = (values) => {
	fetch("http://localhost:3000/api/auth/signup", {
		method: "POST",
		headers: {
			Accept: "application/json",
			"Content-Type": "application/json",
		},
		body: JSON.stringify(values),
	})
		.then((res) => res.json())
		.catch((err) => console.log("Sign up error : ", err));
};

const login = (values) => {
	fetch("http://localhost:3000/api/auth/login", {
		method: "POST",
		headers: {
			Accept: "application/json",
			"Content-Type": "application/json",
		},
		body: JSON.stringify(values),
	})
		.then((response) => {
			if (response.token) {
				localStorage.setItem("user", JSON.stringify(response.token));
			}

			return response.token;
		})
		.catch((err) => console.log("Login error : ", err));
};

// Fetch request to get product items
const activeUser = (id, boolActive) =>
	fetch(`http://localhost:3000/api/${id}`, {
		method: "PUT",
		headers: {
			Accept: "application/json",
			"Content-Type": "application/json",
		},
		body: JSON.stringify(boolActive),
	})
		.then((res) => res.json())
		.catch((err) => console.log("Account activation error :", err));

// Fetch request to get product items
const deleteUser = (id) =>
	fetch(`http://localhost:3000/api/${id}`)
		.then((res) => res.json())
		.catch((err) => console.log("Delete account error :", err));

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
	activeUser,
	deleteUser,
};

export default authService;
