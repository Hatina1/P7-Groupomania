import React from "react";
import "../App.css";
import validation from "./validation";
import AuthService from "./AuthService";
//  import useForm from "./useForm"; // custom hook (methods and initial values)
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
//import { useAuth } from "../auth";
import icon from "../assets/icon.png";

const LoginForm = ({ submitForm }) => {
	//const { changeHandler, submitHandler, values, errors } = useForm(submitForm);

	const [values, setValues] = useState({
		email: "",
		password: "",
	});

	const [errors, setErrors] = useState({});

	//const [dataIsChecked, setdataIsChecked] = useState(false);

	//const [isLoggedIn, setIsLoggedIn] = useState(false);
	//const { setAuthTokens } = useAuth();

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
		//setdataIsChecked(true);

		fetch("http://localhost:3000/api/auth/login", {
			method: "POST",
			headers: {
				Accept: "application/json",
				"Content-Type": "application/json",
			},
			body: JSON.stringify(values),
		})
			.then((res) => res.json())
			.then((response) => {
				console.log(response);
				//console.log(response.token);
				if (response) {
					localStorage.setItem("user", JSON.stringify(response));
				}
			})
			//.then((res) => console.log("Log in successfully", res.token))
			.catch((err) => console.log("What's happening ?", err));
		navigate("/");
	};

	/* 	useEffect(() => {
		if (Object.keys(errors).length === 0 && dataIsChecked) {
			submitForm(true);
		}
	}, [errors]); */

	/* const navigate = useNavigate();
	if (isLoggedIn) {
		return navigate("/");
	} */

	return (
		<div className="mask d-flex align-items-center h-100 gradient-custom-3">
			<div className="container h-100">
				<div className="row d-flex justify-content-center align-items-center h-100">
					<div className="col-12 col-md-9 col-lg-7 col-xl-4">
						<div className="card card-border">
							<div className="card-body p-5">
								<form className="loginForm" onSubmit={submitHandler}>
									<div>
										<img src={icon} alt="Groupomania" className="gpnia-logo" />
										<h2 className="text-uppercase text-center mb-5">
											Please Log in
										</h2>
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
									<div>
										<button
											className="btn btn-primary btn-block btn-lg"
											type="submit"
										>
											Login
										</button>
									</div>

									<Link
										to="/signup"
										className="text-center text-muted mt-5 mb-0"
									>
										Don't have an account?
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

export default LoginForm;
