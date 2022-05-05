const validation = (values) => {
	let errors = {};
	let reg = /.+@.+\..+/g; // /\D+@\D+.{2,}/
	if (!values.firstname) {
		errors.firstname = "Prénom requis";
	}

	if (!values.lastname) {
		errors.lastname = "Nom de famille requis";
	}

	if (!values.email) {
		errors.email = "L'adresse email est requis";
	} else if (!reg.test(values.email)) {
		errors.email = "Format requis aaaa@bbbb.ccc";
	}

	if (!values.password) {
		errors.password = "Mot de passe requis";
	} else if (values.password.length < 6) {
		errors.password = "Le mot de passe doit conteniir au moins 6 caractères ";
	}

	return errors;
};

export default validation;
