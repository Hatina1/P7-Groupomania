import React from "react";
import "../App.css";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
//import { createContext, useContext } from "react";
import AuthService from "./AuthService";
import "../styles/bootstrap.min.css";
import "../styles/headers.css";
import icon from "../assets/icon.png";

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
	//mr-auto div 1 et ms-auto div 2 et 3
	return (
		<div>
			<nav className="navbar navbar-expand navbar-light bg-light border-bottom border-warning">
				<div className="container-fluid">
					<div className="navbar-nav mr-auto">
						<li className="nav-item">
							<Link
								to={"/"}
								className="d-flex align-items-center col-md-3 mb-2 mb-md-0 text-dark text-decoration-none"
							>
								<img src={icon} alt="Groupomania" className="gpnia-logo" />
							</Link>
						</li>
					</div>
					{/* <div className="navbar-nav">
					{currentUser && (
						<li className="nav-item">
							<Link to={"/admin"} className="nav-link">
								Admin
							</Link>
						</li>
					)}
				</div> */}

					{currentUser ? (
						<div className="navbar-nav">
							<li className="nav-item">
								<a href="/login" className="nav-link" onClick={logOut}>
									Logout
								</a>
							</li>
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
