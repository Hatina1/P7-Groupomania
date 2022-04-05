const getAllPublicPosts = () => {
	fetch("http://localhost:3000/api/auth/")
		.then((res) => res.json())
		.catch((err) => console.log("What's happening ?", err));
};

const getAllAdminPosts = () => {
	fetch("http://localhost:3000/api/auth/admin")
		.then((res) => res.json())
		.catch((err) => console.log("What's happening ?", err));
};

const postService = {
	getAllPublicPosts,
	getAllAdminPosts,
};

export default postService;
