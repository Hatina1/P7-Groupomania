import { useState, useEffect } from "react";
import validation from "./validation";
// import fetchData from "../services/fetchData";

const useForm = (submitForm) => {
	const [values, setValues] = useState({
		firstname: "",
		lastname: "",
		email: "",
		password: "",
	});

	const [errors, setErrors] = useState({});

	const [dataIsChecked, setdataIsChecked] = useState(false);

	const changeHandler = (e) => {
		setValues({
			...values,
			[e.target.name]: e.target.value,
		});
	};

	const submitHandler = (e) => {
		e.preventDefault();

		setErrors(validation(values));
		setdataIsChecked(true);
	};

	useEffect(() => {
		if (Object.keys(errors).length === 0 && dataIsChecked) {
			fetch("http://localhost:3000/api/auth/signup", {
				method: "POST",
				headers: {
					Accept: "application/json",
					"Content-Type": "application/json",
				},
				body: JSON.stringify(values),
			})
				.then((response) => response.json())
				.then((data) => console.log(data))
				.catch((err) => console.log("error :", err));

			submitForm(true);
		}
	}, [errors]);

	return { changeHandler, submitHandler, values, errors };
};

export default useForm;
