import React from "react";
import "../../App.css";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import AuthService from "../Services/AuthService";
import "../../styles/bootstrap.min.css";
import "../../styles/headers.css";
import icon from "../../assets/icon-left.png";

function Navbar() {
	const [currentUser, setCurrentUser] = useState(undefined);

	useEffect(() => {
		const user = AuthService.getCurrentUser();

		if (user) {
			setCurrentUser(user);
		}
	}, []);

	const logOut = () => {
		AuthService.logout();
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
										Logout
									</a>
								</li>
								<li className="nav-item">
									<Link to={`/Profile/${currentUser.id}`} className="nav-link">
										Profile
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
									<button className="btn btn-light text-secondary border btn-block btn-lg">
										Login
									</button>
								</Link>
							</li>

							<li className="nav-item">
								<Link to={"/signup"} className="nav-link">
									<button className="btn btn-primary btn-block btn-lg">
										Sign up
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
