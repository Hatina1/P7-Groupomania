import React, { useState } from "react";
import SignupForm from "./SignupForm";

const Form = () => {
	//const isUserExist = false; check if user exists
	//const isLoggedIn = false  check if user exists
	// const [loginPage, setLoginPage] = useState(isUserExist ? true : false);
	const [formIsSubmitted, setformIsSubmitted] = useState(false);
	const submitForm = () => {
		setformIsSubmitted(true);
	};

	/* 
	Equivalent à 
	
	function submitform (){
		return setformIsSubmitted(true);
	} */

	return (
		<div>
			{!formIsSubmitted ? (
				<SignupForm submitForm={submitForm} />
			) : (
				<div className="container">
					<div className="wrapper">
						<h2 className="title"> Account created ! </h2>
					</div>
				</div>
			)}
		</div>
	);
};
export default Form;
