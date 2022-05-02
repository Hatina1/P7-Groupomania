import React from "react";
import "../../App.css";
import validation from "./validation";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const SignupForm = () => {
	const [values, setValues] = useState({
		firstname: "",
		lastname: "",
		email: "",
		password: "",
	});

	const [errors, setErrors] = useState({});

	const changeHandler = (e) => {
		setValues({
			...values,
			[e.target.name]: e.target.value,
		});
	};
	const navigate = useNavigate();

	const submitHandler = async (e) => {
		e.preventDefault();

		setErrors(validation(values));

		fetch("http://localhost:3000/api/auth/signup", {
			method: "POST",
			headers: {
				Accept: "application/json",
				"Content-Type": "application/json",
			},
			body: JSON.stringify(values),
		})
			.then((res) => console.log("Sign up successfully", res))
			.catch((err) => console.log("What's happening ?", err));

		navigate("/login");
		window.location.reload();
	};

	return (
		<div className="mask d-flex align-items-center h-100 gradient-custom-3">
			<div className="container h-100">
				<div className="row d-flex justify-content-center align-items-center h-100">
					<div className="col-12 col-md-9 col-lg-7 col-xl-4">
						<div className="card card-border">
							<div className="card-body p-5">
								<form className="signupForm" onSubmit={submitHandler}>
									<div>
										<h2 className="text-uppercase text-center mb-5">
											Create an account
										</h2>
									</div>

									<div className="form-outline mb-4">
										<label className="form-label"> Firstname </label>
										<input
											className="form-control form-control-lg"
											type="text"
											name="firstname"
											value={values.firstname}
											onChange={changeHandler}
											placeholder="Firstname"
											autoComplete="current-firstname"
										/>
										{errors.firstname && (
											<p className="error">{errors.firstname} </p>
										)}
									</div>
									<div className="form-outline mb-4">
										<label className="form-label"> Lastname </label>
										<input
											className="form-control form-control-lg"
											type="text"
											name="lastname"
											value={values.lastname}
											onChange={changeHandler}
											placeholder="Lastname"
											autoComplete="current-lastname"
										/>
										{errors.lastname && (
											<p className="error">{errors.lastname} </p>
										)}
									</div>
									<div className="form-outline mb-4">
										<label className="form-label"> Email </label>
										<input
											className="form-control form-control-lg"
											type="email"
											name="email"
											value={values.email}
											onChange={changeHandler}
											placeholder="Email"
											autoComplete="current-email"
										/>
										{errors.email && <p className="error">{errors.email} </p>}
									</div>
									<div className="form-outline mb-4">
										<label className="form-label"> Password </label>
										<input
											className="form-control form-control-lg"
											type="password"
											name="password"
											value={values.password}
											onChange={changeHandler}
											placeholder="Password"
											autoComplete="current-password"
										/>
										{errors.password && (
											<p className="error">{errors.password} </p>
										)}
									</div>
									<div className="d-flex justify-content-center">
										<button
											className="btn btn-primary btn-block btn-lg"
											type="submit"
										>
											Sign Up
										</button>
									</div>
									<Link
										to="/login"
										className="text-center text-muted mt-5 mb-0"
									>
										Already have an account?
									</Link>
								</form>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default SignupForm;
