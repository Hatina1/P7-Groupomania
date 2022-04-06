import React from "react";
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
//import useToken from "./Components/useToken";
//import Form from "./Components/Form";
//import Header from "./Components/Header";
//import Footer from "./Components/Footer";
import Navbar from "./Components/Navbar";
import Home from "./pages/Home";
import Admin from "./pages/Admin";
import SignupForm from "./Components/SignupForm";
import LoginForm from "./Components/LoginForm";
//import { useState, useEffect } from "react";
//import { createContext, useContext } from "react";
//import AuthService from "./Components/AuthService";
import "./styles/bootstrap.min.css";
import "./styles/headers.css";
//import icon from "./assets/icon.png";

function App() {
	/* const [currentUser, setCurrentUser] = useState(undefined);

	useEffect(() => {
		const user = AuthService.getCurrentUser();

		if (user) {
			setCurrentUser(user);
		}
	}, []);

	const logOut = () => {
		AuthService.logout();
	}; */
	//mr-auto div 1 et ms-auto div 2 et 3
	return (
		<Router>
			<div>
				<Navbar />
				<div className="container mt-3">
					<Routes>
						<Route exact path="/" element={<Home />} />
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
