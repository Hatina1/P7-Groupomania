const validation = (values) => {
	let errors = {};
	let reg = /.+@.+\..+/g; // /\D+@\D+.{2,}/
	if (!values.firstname) {
		errors.firstname = "Firstname is required";
	}

	if (!values.lastname) {
		errors.lastname = "Lastname is required";
	}

	if (!values.email) {
		errors.email = "Email is required";
	} else if (!reg.test(values.email)) {
		errors.email = "Email is required";
	}

	if (!values.password) {
		errors.password = "Password is required";
	} else if (values.password.length < 6) {
		errors.password = "Password is required";
	}

	return errors;
};

export default validation;
