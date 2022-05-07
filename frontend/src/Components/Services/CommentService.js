const deleteComment = (token, postId, commId) =>
	fetch(`http://localhost:3000/api/posts/${postId}/comments/${commId}`, {
		method: "DELETE",
		headers: {
			Accept: "application/json",
			"Content-Type": "application/json",
			Authorization: "Bearer " + token,
		},
	})
		.then((res) => res.json())
		.catch((err) => console.log("Delete error:", err));

const getAllComments = (token) =>
	fetch("http://localhost:3000/api/posts/comments", {
		method: "GET",
		headers: {
			"Content-Type": "application/json",
			Authorization: "Bearer " + token,
		},
	})
		.then((res) => res.json())
		.catch((err) => console.log("What's happening ?", err));
//multipart/form-data
/* const fetchCreateComments = (token, postId, comment) =>
	fetch(`http://localhost:3000/api/posts/${postId}/comments`, {
		method: "POST",
		headers: {
			Accept: "application/json",
			"Content-Type": "application/json",
			Authorization: "Bearer " + token,
		},
		body: JSON.stringify(comment),
	})
		.then((res) => res.json())
		.catch((err) => console.log("Comment creation error :", err)); */

const createComment = (token, postId, comment) => {
	fetch(`http://localhost:3000/api/posts/${postId}/comments`, {
		method: "POST",
		headers: {
			//Accept: "application/json",
			//"Content-Type": "multipart/form-data",
			Authorization: "Bearer " + token,
		},
		body: comment,
	})
		.then((res) => res.json())
		.catch((err) => console.log("Comment creation error :", err));
};
const getGifs = (key) =>
	fetch(
		`https://api.giphy.com/v1/gifs/trending?api_key=${key}&limit=6&rating=g`
	)
		.then((res) => res.json())
		.catch((err) => console.log("Gifs error :", err));

const postService = {
	getAllComments,
	createComment,
	deleteComment,
	getGifs,
};

export default postService;
