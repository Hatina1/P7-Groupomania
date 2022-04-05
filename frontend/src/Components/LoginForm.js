import React from "react";
import "../App.css";
import validation from "./validation";
import AuthService from "./AuthService";
//  import useForm from "./useForm"; // custom hook (methods and initial values)
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
//import { useAuth } from "../auth";

const LoginForm = ({ submitForm }) => {
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
			await AuthService.login(values).then(
				() => {
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
		<div className="container">
			<div className="wrapper">
				<form className="loginForm">
					<div>
						<h2 className="title"> Please Log in </h2>
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
							Login
						</button>
					</div>
				</form>
				<Link to="/signup">Don't have an account?</Link>
			</div>
		</div>
	);
};

export default LoginForm;
