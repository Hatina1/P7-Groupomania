const updateUser = (token, id, updatedProfile) =>
	fetch(`http://localhost:3000/api/users/${id}`, {
		method: "PUT",
		headers: {
			Accept: "application/json",
			"Content-Type": "application/json",
			Authorization: "Bearer " + token,
		},
		body: JSON.stringify(updatedProfile),
	})
		.then((res) => res.json())
		.then((response) => {
			alert(response.message);
		})
		.catch((err) => console.log("Update account error :", err));

const activeUser = (token, id, boolActive) =>
	fetch(`http://localhost:3000/api/users/${id}/activate`, {
		method: "PUT",
		headers: {
			Accept: "application/json",
			"Content-Type": "application/json",
			Authorization: "Bearer " + token,
		},
		body: JSON.stringify(boolActive),
	})
		.then((res) => res.json())
		.then((response) => {
			alert(response.message);
		})
		.catch((err) => console.log("Account activation error :", err));

const deleteUser = (token, id, deletion) =>
	fetch(`http://localhost:3000/api/users/${id}/delete`, {
		method: "PUT",
		headers: {
			Accept: "application/json",
			"Content-Type": "application/json",
			Authorization: "Bearer " + token,
		},
		body: JSON.stringify(deletion),
	})
		.then((res) => res.json())
		.then((response) => {
			alert(response.message);
		})
		.catch((err) => console.log("Delete account error :", err));

const getOneUser = (token, id) =>
	fetch(`http://localhost:3000/api/users/${id}`, {
		method: "GET",
		headers: {
			"Content-Type": "application/json",
			Authorization: "Bearer " + token,
		},
	})
		.then((res) => res.json())
		.catch((err) => console.log("Get one user account error :", err));

const getAllUsers = (token) =>
	fetch("http://localhost:3000/api/users/", {
		method: "GET",
		headers: {
			Accept: "application/json",
			"Content-Type": "application/json",
			Authorization: "Bearer " + token,
		},
	})
		.then((res) => res.json())
		.catch((err) => console.log("Get users account error :", err));

const logout = () => {
	localStorage.removeItem("user");
};
const userService = {
	getAllUsers,
	getOneUser,
	updateUser,
	activeUser,
	deleteUser,
	logout,
};

export default userService;
