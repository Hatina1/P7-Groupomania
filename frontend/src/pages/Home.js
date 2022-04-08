import React from "react";
//import PostService from "../Components/PostService";
import { useState, useEffect } from "react";
//import authHeader from "../auth";

const Home = () => {
	const [posts, setPosts] = useState([]);
	const user = JSON.parse(localStorage.getItem("user"));
	const [comment, setComment] = useState("");

	useEffect(() => {
		const retrievePosts = () =>
			fetch("http://localhost:3000/api/posts/", {
				method: "GET",
				headers: {
					"Content-Type": "application/json",
					Authorization: "Bearer " + user,
				},
			})
				.then((res) => res.json())
				.catch((err) => console.log("What's happening ?", err));

		const getAllPosts = async () => {
			const allPosts = await retrievePosts();
			setPosts(allPosts);
		};

		getAllPosts().catch(console.error);
	}, []);

	/* 	const retrievePosts = fetch("http://localhost:3000/api/posts/", {
		method: "GET",
		headers: {
			"Content-Type": "application/json",
			Authorization: "Bearer " + user,
		},
	})
		.then((res) => res.json())
		 .then(
				(response) => {
				  setPosts(response.data);
				},
				(error) => {
				  console.log(error);
				}
			  ) 
		.catch((err) => console.log("What's happening ?", err)); */

	return (
		<div className="px-5">
			<h1 className="my-5"> Welcome to Groupomania social app ! </h1>
			{posts.map((post) => (
				<div className="card">
					<div className="card-header">
						<div>Hata Coulibaly a écrit :</div>
						<div>il y a 10 min</div>
					</div>
					<div className="card-body">
						<h3>
							<div>{post.title}</div>
						</h3>
						<p>{post.content}</p>
					</div>
					<div className="card-footer">
						<input
							className="form-control form-control-change"
							type="text"
							name="comment"
							value={comment}
							onChange={(e) => setComment(e.target.value)}
							placeholder="Ecrire un commentaire"
						/>
						<button className="btn btn-primary btn-sm btn-change">Send</button>
					</div>
				</div>
			))}
		</div>
	);
};

export default Home;
