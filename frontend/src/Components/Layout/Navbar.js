import React from "react";
import "../../App.css";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import authService from "../Services/AuthService";
import "../../styles/bootstrap.min.css";
import "../../styles/headers.css";
import icon from "../../assets/icon-left.png";

function Navbar() {
	const [currentUser, setCurrentUser] = useState(undefined);
	useEffect(() => {
		const user = authService.getCurrentUser();
		if (user) {
			setCurrentUser(user);
		}
	}, []);
	/*	useEffect(() => {
		function checkConnection() {
			//const user = authService.getCurrentUser();
			const user = JSON.parse(localStorage.getItem("user"));
			if (user) {
				setCurrentUser(user);
			}
		}
		window.addEventListener("storage", checkConnection);

		return () => {
			window.removeEventListener("storage", checkConnection);
		};
	}, []);


*/

	const logOut = () => {
		authService.logout();
	};

	return (
		<div>
			<nav className="navbar navbar-expand navbar-light bg-white border-bottom border-dark">
				<div className="container-fluid div-responsive">
					<div className="navbar-nav mr-auto">
						<li className="nav-item">
							<Link
								to={"/"}
								className="d-flex align-items-center col-md-3 mb-2 mb-md-0 text-dark text-decoration-none"
							>
								<img src={icon} alt="Groupomania" className="grlogo" />
							</Link>
						</li>
					</div>

					{currentUser ? (
						<div className="navbar-nav">
							<ul className="list-inline d-flex ul-margin-change">
								<li className="nav-item">
									<a href="/login" className="nav-link" onClick={logOut}>
										Deconnexion
									</a>
								</li>
								<li className="nav-item">
									<Link to={`/Profile/${currentUser.id}`} className="nav-link">
										Profil
									</Link>
								</li>
								{currentUser.isAdmin && (
									<li className="nav-item">
										<Link to={"/Admin"} className="nav-link">
											Admin
										</Link>
									</li>
								)}
							</ul>
						</div>
					) : (
						<div className="navbar-nav">
							<li className="nav-item">
								<Link to={"/login"} className="nav-link">
									<button className="btn btn-light text-secondary border btn-block">
										Se connecter
									</button>
								</Link>
							</li>

							<li className="nav-item">
								<Link to={"/signup"} className="nav-link">
									<button className="btn btn-primary btn-block">
										Inscription
									</button>
								</Link>
							</li>
						</div>
					)}
				</div>
			</nav>
		</div>
	);
}

export default Navbar;
