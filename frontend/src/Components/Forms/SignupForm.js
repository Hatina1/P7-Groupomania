import React from "react";
import "../../App.css";
import validation from "./validation";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import icon from "../../assets/icon.png";

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
		if (Object.keys(validation(values)).length === 0) {
			fetch("http://localhost:3000/api/auth/signup", {
				method: "POST",
				headers: {
					Accept: "application/json",
					"Content-Type": "application/json",
				},
				body: JSON.stringify(values),
			})
				.then((res) => console.log("Sign up successfully", res))
				.then((response) => {
					alert(response.message);
					navigate("/login");
				})
				.catch((err) => console.log("Sign up error : ", err));
		} else {
			setErrors(validation(values));
		}

		//window.location.reload();
	};
	//<div className="col-12 col-md-9 col-lg-7 col-xl-4">
	return (
		<div className="mask d-flex align-items-center h-100 gradient-custom-3">
			<div className="container h-100">
				<div className="row d-flex justify-content-center align-items-center h-100">
					<div className="col-12 col-md-9 col-lg-7 col-xl-4">
						<div className="card card-border">
							<div className="card-body p-5">
								<form className="signupForm" onSubmit={submitHandler}>
									<div className="d-flex flex-column align-items-center">
										<img src={icon} alt="Groupomania" className="gpnia-logo" />
										<h2 className="text-center mb-3">Créer un compte</h2>
									</div>

									<div className="form-outline mb-3">
										<label className="form-label"> Prénom </label>
										<input
											className="form-control"
											type="text"
											name="firstname"
											value={values.firstname}
											onChange={changeHandler}
											placeholder="Prénom"
											autoComplete="current-firstname"
										/>
										{errors.firstname && (
											<p className="error text-danger text-center fw-light">
												{errors.firstname}{" "}
											</p>
										)}
									</div>
									<div className="form-outline mb-3">
										<label className="form-label"> Nom de famille </label>
										<input
											className="form-control"
											type="text"
											name="lastname"
											value={values.lastname}
											onChange={changeHandler}
											placeholder="Nom de famille"
											autoComplete="current-lastname"
										/>
										{errors.lastname && (
											<p className="error text-danger text-center fw-light">
												{errors.lastname}{" "}
											</p>
										)}
									</div>
									<div className="form-outline mb-3">
										<label className="form-label"> Email </label>
										<input
											className="form-control"
											type="email"
											name="email"
											value={values.email}
											onChange={changeHandler}
											placeholder="Email"
											autoComplete="current-email"
										/>
										{errors.email && (
											<p className="error text-danger text-center fw-light">
												{errors.email}{" "}
											</p>
										)}
									</div>
									<div className="form-outline mb-3">
										<label className="form-label"> Mot de passe </label>
										<input
											className="form-control"
											type="password"
											name="password"
											value={values.password}
											onChange={changeHandler}
											placeholder="Mot de passe"
											autoComplete="current-password"
										/>
										{errors.password && (
											<p className="error text-danger text-center fw-light">
												{errors.password}{" "}
											</p>
										)}
									</div>
									<div className="d-flex justify-content-center">
										<button className="btn btn-primary btn-block" type="submit">
											S'inscrire
										</button>
									</div>
									<Link
										to="/login"
										className="text-center text-muted mt-4 mb-0"
									>
										Déja un compte ?
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
