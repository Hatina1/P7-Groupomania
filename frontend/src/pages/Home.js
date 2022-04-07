import React from "react";
//import PostService from "../Components/PostService";
import { useState, useEffect } from "react";
//import authHeader from "../auth";

const Home = () => {
	const [posts, setPosts] = useState([]);
	const user = JSON.parse(localStorage.getItem("user"));

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
		<div>
			<h1> Welcome to Groupomania social app ! </h1>
			<h3>
				{posts.map((post) => (
					<div>post : {post.title}</div>
				))}
			</h3>
			{posts.map((post) => (
				<p>{post.content}</p>
			))}
		</div>
	);
};

export default Home;
