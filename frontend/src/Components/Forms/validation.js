const validation = (values) => {
	let errors = {};
	let regName = /^(?=.*\D{2,})(?=.*^([^0-9]*)$).*$/;
	let reg = /.+@.+\..+/g; // /\D+@\D+.{2,}/
	if (!values.firstname) {
		errors.firstname = "Prénom requis";
	} else if (!regName.test(values.firstname)) {
		errors.firstname = "Le prénom semble contenir des caractères inappropriés";
	}

	if (!values.lastname) {
		errors.lastname = "Nom de famille requis";
	} else if (!regName.test(values.lastname)) {
		errors.lastname = "Le nom semble contenir des caractères inappropriés";
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
