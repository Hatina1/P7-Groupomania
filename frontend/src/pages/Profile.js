import React from "react";
import { useState, useEffect } from "react";
import moment from "moment";
import AuthService from "../Components/AuthService";
import { useNavigate, Link } from "react-router-dom";

const Home = () => {
	const profileRef = window.location.href;
	const url = new URL(profileRef);
	const userId = url.searchParams.get("id");
	const [user, setUser] = useState([]);
	const [currentUser, setCurrentUser] = useState(undefined);
	const navigate = useNavigate();
	const date = (sqlDate) => {
		var dateCreation = moment(sqlDate).format("DD/MM/YYYY");
		return dateCreation;
	};

	const [boolActive, setBoolActive] = useState({
		isActive: "",
	});
	const onClickHandler = async (e) => {
		if (e.target.id === "activate") {
			e.preventDefault();

			user.isActive === true
				? setBoolActive({
						isActive: false,
				  })
				: setBoolActive({
						isActive: true,
				  });

			AuthService.activeUser(user.id, boolActive);
			AuthService.logout();
			navigate("/login");
		} else if (e.target.id === "suppression") {
			e.preventDefault();
			AuthService.deleteUser(user.id);
			AuthService.logout();
			navigate("/signup");
		}

		//window.location.reload();
	};

	const logOut = () => {
		AuthService.logout();
	};

	/* {user.isAdmin && (
			<Link to={"/Admin"} className="nav-link">
				Go to the admin page
			</Link>
		)} */

	//chartAt
	useEffect(() => {
		const ongoingUser = AuthService.getCurrentUser();

		if (ongoingUser) {
			setCurrentUser(ongoingUser);
		}
	}, []);

	useEffect(() => {
		const getOneUser = async () => {
			const OneUser = await AuthService.getOneUser(currentUser.token, userId);
			setUser(OneUser);
		};
		getOneUser().catch(console.error);
	}, []);

	const initiales =
		user.firstname.charAt(0).toUpperCase() +
		user.lastname.charAt(0).toUpperCase();

	return (
		<div className="px-2">
			<br />
			<h1 className="my-3 text-white">Détails du compte</h1>

			<br />
			{!user.isActive && (
				<button
					id="activate"
					className="btn btn-sm btn btn-warning btn-change me-3 my-3"
					onClick={onClickHandler}
				>
					Réactiver le compte
				</button>
			)}

			<div className="row">
				<div className="col-sm-4">
					<div className="card d-flex align-items-center pt-4">
						<div className=" pt-2 text-center align-middle border border-3 border-secondary bg-light  rounded-circle picture-change ">
							<span className="text-center fw-bold">{initiales}</span>
						</div>
						<p className="pt-3 fw-bold">
							{user.firstname} {user.lastname}
						</p>
						<p className="border-bottom border-2 pt-1 pb-3">
							{user.isAdmin ? "Admin" : "Utilisateur"}

							<Link to={"/Admin"} className="nav-link">
								Go to the admin page
							</Link>
						</p>
						<a href="/" target="_blank" className="link-dark pt-3">
							Paramètres du compte
						</a>
						<a href="/" target="_blank" className="link-dark pt-3">
							Modifier le profil
						</a>
						<a
							href="/login"
							target="_blank"
							className="link-dark pt-3 pb-4"
							onClick={logOut}
						>
							Deconnexion
						</a>
					</div>
				</div>

				<div className="col-sm-8 text-white">
					<p className="py-2 d-inline border-bottom border-3">Votre profil</p>
					<article className="border-bottom border-secondary pt-4 py-2 d-flex justify-content-between">
						<p className="font-change">Prénom: </p>
						<p className="">{user.firstname}</p>
					</article>

					<article className="border-bottom border-secondary py-2 d-flex justify-content-between ">
						<p className="font-change">Nom: </p>
						<p className="">{user.lastname}</p>
					</article>

					<article className="border-bottom border-secondary py-2 d-flex justify-content-between">
						<p className="font-change">Addresse Email: </p>
						<p className="">test@test.com</p>
					</article>

					<article className="border-bottom border-secondary py-2 d-flex justify-content-between">
						<p className="font-change">Compte crée le: </p>
						<p className="">{date(user.createdAt)}</p>
					</article>

					{user.isActive ? (
						<button
							id="activate"
							className="btn btn-sm btn btn-danger btn-change me-3 my-3"
							onClick={onClickHandler}
						>
							Désactiver le compte
						</button>
					) : (
						<button
							id="activate"
							className="btn btn-sm btn btn-warning btn-change me-3 my-3"
							onClick={onClickHandler}
						>
							Réactiver le compte
						</button>
					)}

					<button
						id="suppression"
						className="btn btn-sm btn btn-danger btn-change me-3 my-3"
						onClick={onClickHandler}
					>
						Supprimer le compte
					</button>
				</div>
			</div>
			<br />
		</div>
	);
};

export default Home;
