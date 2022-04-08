import React from "react";
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./Components/Navbar";
import Footer from "./Components/Footer";
import Home from "./pages/Home";
import Admin from "./pages/Admin";
import SignupForm from "./Components/SignupForm";
import LoginForm from "./Components/LoginForm";
import "./styles/bootstrap.min.css";
import "./styles/headers.css";

function App() {
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
				<Footer />
			</div>
		</Router>
	);
}

export default App;
