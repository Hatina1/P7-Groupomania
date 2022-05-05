const fetchAllPosts = (token) =>
	fetch("http://localhost:3000/api/posts/", {
		method: "GET",
		headers: {
			"Content-Type": "application/json",
			Authorization: "Bearer " + token,
		},
	})
		.then((res) => res.json())
		.catch((err) => console.log("Get posts error:", err));

const fetchDeletePost = (token, postId) =>
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

const fetchDeleteComment = (token, postId, commId) =>
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

const fetchModifyPost = (token, postId, updatepost) =>
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

const fetchCreatePost = (token, post) =>
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

const fetchLikePost = (token, postId, likeSent) =>
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
		.then((response) => {
			alert(response.message);
		})
		.catch((err) => console.log("Like was not sent", err));

const fetchAllComments = (token) =>
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

const fetchCreateComment = (token, postId, comment) => {
	//console.log("comment", comment.get("newcomment"));
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

const fetchGifs = (key) =>
	fetch(
		`https://api.giphy.com/v1/gifs/trending?api_key=${key}&limit=6&rating=g`
	)
		.then((res) => res.json())
		.catch((err) => console.log("Gifs error :", err));

const postService = {
	fetchAllPosts,
	fetchCreatePost,
	fetchLikePost,
	fetchDeletePost,
	fetchModifyPost,
	fetchAllComments,
	fetchCreateComment,
	fetchDeleteComment,
	fetchGifs,
};

export default postService;
