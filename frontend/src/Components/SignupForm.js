import React from "react";
import "../App.css";
import useForm from "./useForm"; // custom hook (methods and initial values)

const SignupForm = ({ submitForm }) => {
	const { changeHandler, submitHandler, values, errors } = useForm(submitForm);

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
						/>
						{errors.password && <p className="error">{errors.password} </p>}
					</div>
					<div>
						<button className="submit" onClick={submitHandler}>
							Sign Up
						</button>
					</div>
					<div>
						<a className="link">Already an account ? Click here !</a>
					</div>
				</form>
			</div>
		</div>
	);
};

export default SignupForm;
