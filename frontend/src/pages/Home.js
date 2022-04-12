import React from "react";
//import PostService from "../Components/PostService";
import { useState, useEffect } from "react";
//import authHeader from "../auth";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFaceLaugh } from "@fortawesome/free-solid-svg-icons";

const Home = () => {
	const [posts, setPosts] = useState([]);
	const user = JSON.parse(localStorage.getItem("user"));
	const [comment, setComment] = useState("");
	const [gifs, setGifs] = useState([]);
	const [selectedGif, setSelectedGif] = useState("");

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

	useEffect(() => {
		/* const trending = async () => {
			try {
				const result = await gf.trending();
				console.log(`trending`, result);
				setGifs(result);
			} catch (error) {
				console.error(`trending`, error);
			}
		}; */
		const fetchGifs = async () => {
			const result = await fetch(
				`https://api.giphy.com/v1/gifs/trending?api_key=${process.env.REACT_APP_GIF_PASSWORD}&limit=6&rating=g`
			)
				.then((res) => res.json())
				.catch((err) => console.log("What's happening ?", err));
			console.log(result);
			setGifs(result.data);
		};
		fetchGifs().catch(console.error);
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
				<div key={posts.id} className="card">
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
						<FontAwesomeIcon icon={faFaceLaugh} className="px-3 py-2" />
						<button className="btn btn-primary btn-sm btn-change">Send</button>
					</div>
					<div className="d-flex flex-wrap flex-row justify-content-between align-items-center">
						{gifs.map((gif, index) => (
							<div key={gif.id}>
								<a href="/" className="text-decoration-none lh-1">
									<img
										key={"gif-" + index}
										className="img-animated-gif flex-nowrap"
										src={gif.images.downsized.url}
										onClick={() => setSelectedGif(gif.images.downsized.url)}
									/>
								</a>
							</div>
						))}
					</div>
					<div> 3 comments : </div>
					<div> Comment 1</div>
					<div> Comment 2</div>
					<div> Comment 3</div>
				</div>
			))}
		</div>
	);
};

export default Home;
