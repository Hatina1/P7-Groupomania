import React from "react";
import "./App.css";
import {
	BrowserRouter as Router,
	Routes,
	Route,
	Navigate,
} from "react-router-dom";
import { useState, useEffect } from "react";
import Navbar from "./components/Layout/Navbar";
import Footer from "./components/Layout/Footer";
import Home from "./pages/Home";
import Profile from "./pages/Profile";
import Admin from "./pages/Admin";
import SignupForm from "./components/Forms/SignupForm";
import LoginForm from "./components/Forms/LoginForm";
import authService from "./components/Services/AuthService";
import "./styles/bootstrap.min.css";
import "./styles/headers.css";
//import { ErrorBoundary } from "react-error-boundary";
import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
const queryClient = new QueryClient();

export const ProtectedRoute = ({ children }) => {
	const user = JSON.parse(localStorage.getItem("user"));

	if (!user) {
		// user is not authenticated
		return <Navigate to="/signup" />;
	}
	return children;
};

function App() {
	return (
		<Router>
			<div className="bg-color bg-opacity-10">
				<Navbar />
				<div className="container mt-3">
					<QueryClientProvider client={queryClient}>
						<Routes>
							<Route
								path="/"
								element={
									<ProtectedRoute>
										<Home />
									</ProtectedRoute>
								}
							/>
							<Route path="/signup" element={<SignupForm />} />
							<Route path="/login" element={<LoginForm />} />
							<Route path="/profile/:profileId" element={<Profile />} />
							<Route path="/admin" element={<Admin />} />
						</Routes>
						<ReactQueryDevtools initialIsOpen={false} />
					</QueryClientProvider>
				</div>
				<Footer />
			</div>
		</Router>
	);
}

export default App;
