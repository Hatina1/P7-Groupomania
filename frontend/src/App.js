import React from "react";
import "./App.css";
import { BrowserRouter as Router, Routes, Link, Route } from "react-router-dom";
//import useToken from "./Components/useToken";
//import Form from "./Components/Form";
//import Header from "./Components/Header";
//import Footer from "./Components/Footer";
import Home from "./pages/Home";
import Admin from "./pages/Admin";
import SignupForm from "./Components/SignupForm";
import LoginForm from "./Components/LoginForm";
import { useState, useEffect } from "react";
//import { createContext, useContext } from "react";
import AuthService from "./Components/AuthService";
import "./styles/bootstrap.min.css";
import "./styles/headers.css";
import icon from "./assets/icon.png";

function App() {
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
		<Router>
			<div>
				<nav className="navbar navbar-expand navbar-light bg-light">
					<div className="navbar-nav mr-auto">
						<li className="nav-item">
							<Link
								to={"/home"}
								className="d-flex align-items-center col-md-3 mb-2 mb-md-0 text-dark text-decoration-none"
							>
								<img src={icon} alt="Groupomania" className="gpnia-logo" />
							</Link>
						</li>
					</div>
					<div className="navbar-nav">
						<li className="nav-item">
							<Link to={"/"} className="nav-link">
								Home
							</Link>
						</li>

						{currentUser && (
							<li className="nav-item">
								<Link to={"/admin"} className="nav-link">
									Admin
								</Link>
							</li>
						)}
					</div>

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
									Login
								</Link>
							</li>

							<li className="nav-item">
								<Link to={"/signup"} className="nav-link">
									Sign up
								</Link>
							</li>
						</div>
					)}
				</nav>

				<div className="container mt-3">
					<Routes>
						<Route exact path="/home" element={<Home />} />
						<Route path="/admin" element={<Admin />} />
						<Route path="/login" element={<LoginForm />} />
						<Route path="/signup" element={<SignupForm />} />
					</Routes>
				</div>
			</div>
		</Router>
	);
}

export default App;
