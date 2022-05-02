import React from "react";
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./Components/Layout/Navbar";
import Footer from "./Components/Layout/Footer";
import Home from "./pages/Home";
import Profile from "./pages/Profile";
import Admin from "./pages/Admin";
import SignupForm from "./Components/Forms/SignupForm";
import LoginForm from "./Components/Forms/LoginForm";
import "./styles/bootstrap.min.css";
import "./styles/headers.css";
//import { ErrorBoundary } from "react-error-boundary";
import { QueryClient, QueryClientProvider } from "react-query";
const queryClient = new QueryClient();
function App() {
	return (
		<Router>
			<div className="bg-color bg-opacity-10">
				<Navbar />
				<div className="container mt-3">
					<QueryClientProvider client={queryClient}>
						<Routes>
							<Route exact path="/" element={<Home />} />
							<Route path="/login" element={<LoginForm />} />
							<Route path="/signup" element={<SignupForm />} />
							<Route path="/profile/:profileId" element={<Profile />} />
							<Route path="/admin" element={<Admin />} />
						</Routes>
					</QueryClientProvider>
				</div>
				<Footer />
			</div>
		</Router>
	);
}

export default App;
