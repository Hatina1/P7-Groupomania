import React from "react";
import "../App.css";
import validation from "./validation";
import AuthService from "./AuthService";
//  import useForm from "./useForm"; custom hook (methods and initial values)
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const SignupForm = ({ submitForm }) => {
	//const { changeHandler, submitHandler, values, errors } = useForm(submitForm);

	const [values, setValues] = useState({
		firstname: "",
		lastname: "",
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
		try {
			await AuthService.signup(values).then(
				(response) => {
					// check for token and user already exists with 200
					console.log("Sign up successfully", response);
					navigate("/");
					window.location.reload();
				},
				(error) => {
					console.log(error);
				}
			);
		} catch (err) {
			console.log(err);
		}
	};

	/* useEffect(() => {
		if (Object.keys(errors).length === 0 && dataIsChecked) {
			submitForm(true);
		}
	}, [errors]); */

	/* const navigate = useNavigate();
	if (isLoggedIn) {
		return navigate("/");
	} */

	return (
		<div className="container">
			<div className="wrapper">
				<form className="signupForm">
					<div>
						<h2 className="title"> Create an account </h2>
					</div>

					<div className="firstname">
						<label className="label"> Firstname </label>
						<input
							className="input"
							type="text"
							name="firstname"
							value={values.firstname}
							onChange={changeHandler}
							placeholder="Firstname"
						/>
						{errors.firstname && <p className="error">{errors.firstname} </p>}
					</div>
					<div className="lastname">
						<label className="label"> Lastname </label>
						<input
							className="input"
							type="text"
							name="lastname"
							value={values.lastname}
							onChange={changeHandler}
							placeholder="Lastname"
						/>
						{errors.lastname && <p className="error">{errors.lastname} </p>}
					</div>
					<div className="email">
						<label className="label"> Email </label>
						<input
							className="input"
							type="email"
							name="email"
							value={values.email}
							onChange={changeHandler}
							placeholder="Email"
						/>
						{errors.email && <p className="error">{errors.email} </p>}
					</div>
					<div className="password">
						<label className="label"> Password </label>
						<input
							className="input"
							type="password"
							name="password"
							value={values.password}
							onChange={changeHandler}
							placeholder="Password"
						/>
						{errors.password && <p className="error">{errors.password} </p>}
					</div>
					<div>
						<button className="submit" onClick={submitHandler}>
							Sign Up
						</button>
					</div>
				</form>
				<Link to="/login">Already have an account?</Link>
			</div>
		</div>
	);
};

export default SignupForm;