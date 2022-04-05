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

	return (
		<Router>
			<div>
				<nav className="navbar navbar-expand navbar-dark bg-dark">
					<div className="navbar-nav mr-auto">
						<li className="nav-item">
							<Link to={"/home"} className="nav-link">
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
						<div className="navbar-nav ms-auto">
							<li className="nav-item">
								<a href="/login" className="nav-link" onClick={logOut}>
									Logout
								</a>
							</li>
						</div>
					) : (
						<div className="navbar-nav ms-auto">
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
					</Routes>
				</div>
			</div>
		</Router>
	);
}
// <Route path="/login" element={LoginForm} />
// <Route path="/signup" element={SignupForm} />
export default App;
