import React from "react";
import { useState, useEffect } from "react";
import AuthService from "../Components/AuthService";
import { useNavigate, Link } from "react-router-dom";

function Admin() {
	const user = JSON.parse(localStorage.getItem("user"));
	const [users, setUsers] = useState([]);
	const [name, setName] = useState("");
	const [filteredUsers, setFilteredUsers] = useState(users);

	useEffect(() => {
		const getAllUsers = async () => {
			const allUsers = await AuthService.getAllUsers(user.token);
			allUsers.sort(function (a, b) {
				if (a.id > b.id) {
					return 1;
				}
				if (a.id < b.id) {
					return -1;
				}
				return 0;
			});
			setUsers(allUsers);
			setFilteredUsers(allUsers);
		};
		getAllUsers().catch(console.error);
	}, []);

	const filter = (e) => {
		const keyword = e.target.value;

		if (keyword !== "") {
			const results = users.filter((item) => {
				return item.lastname.toLowerCase().startsWith(keyword.toLowerCase());
				// Use the toLowerCase() method to make it case-insensitive
			});
			setFilteredUsers(results);
		} else {
			setFilteredUsers(users);
			// If the text field is empty, show all users
		}
		setName(keyword);
	};

	return (
		<div className="container d-flex flex-column align-items-center px-4">
			<h2 className="text-white my-2">Liste des utilisateurs : </h2>
			<input
				type="search"
				value={name}
				onChange={filter}
				className="input rounded my-2 py-2 col-4"
				placeholder="Recherche d'un nom"
			/>

			<table className="table table-sm my-4 text-white">
				<thead>
					<tr>
						<th scope="col">#</th>
						<th scope="col">Firstname</th>
						<th scope="col">Lastname</th>
						<th scope="col">Profile page</th>
					</tr>
				</thead>

				{filteredUsers && filteredUsers.length > 0 ? (
					filteredUsers.map((item) => (
						<tbody>
							<tr key={item.id}>
								<th scope="row">{item.id}</th>
								<td>{item.firstname}</td>
								<td>{item.lastname}</td>
								<td>
									<Link to={`/Profile/${item.id}`} className="nav-link">
										Voir
									</Link>
								</td>
							</tr>
						</tbody>
					))
				) : (
					<p>No results found!</p>
				)}
			</table>
		</div>
	);
}

export default Admin;
