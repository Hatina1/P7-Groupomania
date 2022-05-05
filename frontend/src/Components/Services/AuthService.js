const signup = (values) => {
	fetch("http://localhost:3000/api/auth/signup", {
		method: "POST",
		headers: {
			Accept: "application/json",
			"Content-Type": "application/json",
		},
		body: JSON.stringify(values),
	})
		.then((res) => console.log("Sign up successfully", res))
		.then((response) => {
			alert(response.message);
			//navigate("/login");
		})
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
		.then((res) => res.json())
		.then((response) => {
			console.log(response);
			if (response.error) {
				alert(response.error);
			} else {
				localStorage.setItem("user", JSON.stringify(response));
				//navigate("/");
				//window.location.reload();
			}
		})
		.catch((err) => console.log("What's happening ?", err));
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
