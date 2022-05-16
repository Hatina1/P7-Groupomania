import React from "react";
import { useState, useEffect } from "react";
import userService from "../components/Services/UserService";
import { Link } from "react-router-dom";
import { useQuery } from "react-query";

function Admin() {
	const user = JSON.parse(localStorage.getItem("user"));
	//get name searched
	const [name, setName] = useState("");
	//get users list
	const { isLoading, data } = useQuery("users", () =>
		userService.getAllUsers(user.token)
	);
	const users = data;
	//set filtered users to all users at first
	const [filteredUsers, setFilteredUsers] = useState([]);
	useEffect(() => {
		setFilteredUsers(users);
	}, [users]);

	//filter by name
	const filter = (e) => {
		const keyword = e.target.value;

		if (keyword !== "") {
			const results = users.filter((item) => {
				return item.lastname.toLowerCase().startsWith(keyword.toLowerCase());
			});
			setFilteredUsers(results);
		} else {
			setFilteredUsers(users);
			// If the text field is empty, show all users
		}
		setName(keyword);
	};

	return (
		<div className="container d-flex flex-column align-items-center px-4  div-wrapper">
			<h2 className="text-white my-2">Liste des utilisateurs : </h2>
			{isLoading && <p className="my-3 text-white">Loading...</p>}
			<input
				type="search"
				value={name}
				onChange={filter}
				className="input rounded my-2 py-2 col-4 input-responsive"
				placeholder="Recherche par nom"
			/>

			<table className="table table-sm table-change my-4   text-white">
				<thead>
					<tr>
						<th scope="col">#</th>
						<th scope="col">Firstname</th>
						<th scope="col">Lastname</th>
						<th scope="col">Profile page</th>
					</tr>
				</thead>

				{filteredUsers &&
					filteredUsers.length > 0 &&
					filteredUsers.map((item) => (
						<tbody key={item.id}>
							<tr>
								<th className="align-middle" scope="row">
									{item.id}
								</th>
								<td className="align-middle">{item.firstname}</td>
								<td className="align-middle">{item.lastname}</td>
								<td>
									<Link
										to={`/Profile/${item.id}`}
										className="fw-bold text-white nav-link"
									>
										Voir
									</Link>
								</td>
							</tr>
						</tbody>
					))}
			</table>

			{filteredUsers && filteredUsers.length === 0 && (
				<p className="text-white">Aucun résultat</p>
			)}
		</div>
	);
}

export default Admin;
