import { useState, useEffect } from "react";
import validation from "./validation";

const useForm = (submitForm) => {
	const [values, setValues] = useState({
		firstname: "",
		lastname: "",
		email: "",
		password: "",
	});

	const [errors, setErrors] = useState({});

	const [dataIsCorrect, setDataIsCorrect] = useState(false);

	const changeHandler = (e) => {
		setValues({
			...values,
			[e.target.name]: e.target.value,
		});
	};

	const submitHandler = (e) => {
		e.preventDefault();
		setErrors(validation(values));
		setDataIsCorrect(true);
	};

	useEffect(() => {
		if (Object.keys(errors).length === 0 && dataIsCorrect) {
			submitForm(true);
		}
	}, [errors]);

	return { changeHandler, submitHandler, values, errors };
};

export default useForm;
