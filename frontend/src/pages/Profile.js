import React from "react";
import { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFaceLaugh } from "@fortawesome/free-solid-svg-icons";
import moment from "moment";

const Home = () => {
	const [posts, setPosts] = useState([]);
	const [comments, setComments] = useState([]);
	const user = JSON.parse(localStorage.getItem("user"));
	const [newComment, setNewComment] = useState({});

	const handleNewComment = (e) => {
		setNewComment({
			...newComment,
			[e.target.name]: e.target.value,
		});
		//e.target.value);
		//console.log(e);
	};

	// Button send enable
	const enableCommentButton = () => {
		return newComment ? false : true;
	};
	// Button send enable
	const changeCommentButtonStyle = () => {
		return newComment ? "comments-button-enabled" : "comments-button-disabled";
	};

	useEffect(() => {
		const retrievePosts = () =>
			fetch("http://localhost:3000/api/posts/", {
				method: "GET",
				headers: {
					"Content-Type": "application/json",
					Authorization: "Bearer " + user.token,
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

	return (
		<div className="px-2">
			<h1 className="my-3 text-white">Info du compte</h1>
			<br />
			<div class="row">
				<div class="col-sm-4 text-white">
					<button className="btn btn-sm ">Désactiver le compte</button>
					<button className="btn btn-sm ">Supprimer le compte</button>
					<button className="btn btn-sm ">Deconnexion</button>
				</div>
				<div class="col-sm-8 text-white">
					<p className="">Détails</p>
					<p className="">Nom:</p>
					<p className="">Prénom:</p>
					<p className="">Addresse Email:</p>
				</div>
			</div>
		</div>
	);
};

export default Home;
