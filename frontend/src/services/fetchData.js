const fetchData = () => {
	return fetch("http://localhost:3000/api/")
		.then((response) => response.json())
		.then((data) => console.log(data));
};
