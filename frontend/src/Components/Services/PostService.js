const getAllPosts = (token) =>
	fetch("http://localhost:3000/api/posts/", {
		method: "GET",
		headers: {
			"Content-Type": "application/json",
			Authorization: "Bearer " + token,
		},
	})
		.then((res) => res.json())
		.catch((err) => console.log("Get posts error:", err));

const deletePost = (token, postId) =>
	fetch(`http://localhost:3000/api/posts/${postId}`, {
		method: "DELETE",
		headers: {
			Accept: "application/json",
			"Content-Type": "application/json",
			Authorization: "Bearer " + token,
		},
	})
		.then((res) => res.json())
		.catch((err) => console.log("Delete error:", err));

const modifyPost = (token, postId, updatepost) =>
	fetch(`http://localhost:3000/api/posts/${postId}`, {
		method: "PUT",
		headers: {
			//Accept: "application/json",
			//"Content-Type": "application/json",
			Authorization: "Bearer " + token,
		},
		body: updatepost,
	})
		.then((res) => res.json())
		.catch((err) => console.log("Post was not updated", err));

const createPost = (token, post) =>
	fetch(`http://localhost:3000/api/posts`, {
		method: "POST",
		headers: {
			//Accept: "application/json",
			//"Content-Type": "application/json",
			Authorization: "Bearer " + token,
		},
		body: post,
	})
		.then((res) => res.json())
		.catch((err) => console.log("Post creation error :", err));

const likePost = (token, postId, likeSent) =>
	fetch(`http://localhost:3000/api/posts/${postId}/likes`, {
		method: "PUT",
		headers: {
			Accept: "application/json",
			"Content-Type": "application/json",
			Authorization: "Bearer " + token,
		},
		body: JSON.stringify(likeSent),
	})
		.then((res) => res.json())
		/* 		.then((response) => {
			alert(response.message);
		}) */
		.catch((err) => console.log("Like was not sent", err));

const postService = {
	getAllPosts,
	createPost,
	likePost,
	deletePost,
	modifyPost,
};

export default postService;
