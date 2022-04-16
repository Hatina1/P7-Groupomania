import React from "react";
//import PostService from "../Components/PostService";
import { useState, useEffect } from "react";
//import authHeader from "../auth";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFaceLaugh } from "@fortawesome/free-solid-svg-icons";
import moment from "moment";

const Home = () => {
	const [posts, setPosts] = useState([]);
	const [comments, setComments] = useState([]);
	const user = JSON.parse(localStorage.getItem("user"));
	const [newComment, setNewComment] = useState("");
	const [commentSend, setCommentSend] = useState({
		commentId: "",
		sent: "",
	});
	const [gifs, setGifs] = useState([]);
	const [selectedGif, setSelectedGif] = useState("");
	const [selectedFile, setSelectedFile] = useState(null);
	const [showGifs, setShowGifs] = useState(false);
	const divStyle = {
		display: "none",
	};

	const handleClickDisplayGifs = () => {
		setShowGifs(!showGifs);
		console.log("ouvrir la div des gifs");
	};

	const handleSelectedFile = (event) => {
		setSelectedFile(event.target.files[0]);
	};

	const handleNewComment = (e) => {
		setNewComment(e.target.value);
		//e.target.value);
		//console.log(e);
		console.log(e.target.value);
	};

	const handleCommentSend = (e) => {
		setCommentSend({ commentId: numberOfComm++, sent: newComment });
		setNewComment("");
	};

	const submitComment = (e) => {
		e.preventDefault();
		//setCommentLine(comment);

		const formData = new FormData();
		//formData.append(...array);
		formData.append("content", newComment);
		formData.append("postId", posts.id);
		formData.append("userId", user.id);
		//formData.append("imageUrl", selectedFile, selectedFile.name);
		formData.append("imageUrl", selectedGif);

		fetch(`http://localhost:3000/api/posts/{postId}/comment`, {
			method: "POST",
			headers: {
				Accept: "application/json",
				"Content-Type": "application/json",
			},
			body: JSON.stringify(formData),
		})
			.then((res) => res.json())
			.catch((err) => console.log("comment was not sent to db", err));

		//setComment("");
	};
	//	https://media.giphy.com/media/NEvPzZ8bd1V4Y/giphy.gif

	//moment("20111031", "YYYYMMDD").fromNow();

	const sqlToJsDate = (sqlDate) => {
		var sqlDateFormat = new Date(sqlDate);
		var jYear = sqlDateFormat.getFullYear();
		var jMonth = sqlDateFormat.getMonth();
		var jDay = sqlDateFormat.getDate();
		var sentDelay = moment([jYear, jMonth, jDay + 1]).fromNow(true);
		return sentDelay;
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

	useEffect(() => {
		const retrieveComments = () =>
			fetch("http://localhost:3000/api/posts/comments", {
				method: "GET",
				headers: {
					"Content-Type": "application/json",
					Authorization: "Bearer " + user.token,
				},
			})
				.then((res) => res.json())
				.catch((err) => console.log("What's happening ?", err));

		const getAllComments = async () => {
			const allComments = await retrieveComments();
			setComments(allComments);
		};

		getAllComments().catch(console.error);
	}, []);

	const checkCommExists = (commList, postsList) => {
		let checkComm = [];
		let checkCommLen = 0;
		checkComm = commList.filter((comm) => comm.postId == postsList.id);
		checkCommLen = checkComm.length;
		return checkCommLen;
	};

	const numberOfComm = (commList) => {
		let numComm = 0;
		numComm = commList.length;
		return numComm;
	};

	useEffect(() => {
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

	//:onSubmit={submitComment} enctype="multipart/form-data"
	//<input type="hidden" id="postId" name="postId" value={post.id} />
	//onClick={() => setSelectedGif(gif.images.downsized.url)}

	return (
		<div className="px-2">
			<h1 className="my-3 text-white">
				Welcome{" "}
				<em className="font-weight-bold fst-normal text-capitalize">
					{user.firstname}{" "}
				</em>
				to Groupomania social app !
			</h1>
			<br />

			<h2 className="my-2 text-white">
				{" "}
				Envie d'écrire ou de partager une info, c'est par ici 👇{" "}
			</h2>
			<form className="d-flex">
				<textarea
					className="form-control form-control-change"
					type="text"
					name="text"
					onChange={(e) => setNewComment(e.target.value)}
					//value={newComment}
					placeholder="Comment allez-vous aujourd'hui ?"
				/>

				<FontAwesomeIcon
					icon={faFaceLaugh}
					className="px-1 py-2 text-white"
					onClick={handleClickDisplayGifs}
				/>

				<button
					className="btn btn-primary btn-sm btn-change"
					id={changeCommentButtonStyle()}
					disabled={enableCommentButton()}
				>
					Créer un post
				</button>
			</form>
			<br />
			<h2 className="my-2 text-white"> Les derniers posts : </h2>
			{posts.map((post, index) => (
				<div key={index} className="card my-4">
					<div className="card-body py-4">
						<div className="card-body-header">
							<p>
								<em>
									{post.firstname} {post.lastname}
								</em>{" "}
								a écrit, il y a {sqlToJsDate(post.createdAt)} :
							</p>
						</div>
						<h3 className="h3-change">{post.title}</h3>
						<p className="p-change">{post.content}</p>
					</div>
					{comments
						.filter((col) => col.postId == post.id)
						.map((comment) => (
							<div key={comment.id} className="">
								<p className="card-p-comment-num">
									<em>Voir les commentaires</em> (
									{checkCommExists(comments, post)} commentaires) :
								</p>

								<section className="card-body card-body-comment">
									<article className="card-article-comment">
										<p className="card-body-header">
											par{" "}
											<em>
												{comment.firstname} {comment.lastname}
											</em>
											, il y a {sqlToJsDate(comment.createdAt)}
										</p>
										<p className="p-change">
											{comment.imageUrl} {comment.content}
										</p>
									</article>
								</section>
							</div>
						))}
					<div className="card-footer" key={index}>
						<form className="d-flex" key={index}>
							<input
								className="form-control form-control-change"
								type="text"
								//name={`comment-${comments.length + 1}`}
								name={`comment-${index}`}
								id={`comment-${index}`}
								onChange={(e) => setNewComment(e.target.value)}
								value={newComment}
								placeholder="Ecrire un commentaire"
							/>

							<FontAwesomeIcon
								icon={faFaceLaugh}
								className="px-1 py-2"
								onClick={handleClickDisplayGifs}
							/>
							{/* <input
								type="file"
								name="file"
								onChange={handleSelectedFile}
								style={divStyle}
								multiple
								accept="image/*"
							/> */}

							<button
								className="btn btn-primary btn-sm btn-change"
								id={changeCommentButtonStyle()}
								disabled={enableCommentButton()}
							>
								Send
							</button>
						</form>
					</div>

					{showGifs && (
						<div className="d-flex flex-wrap flex-row justify-content-between align-items-center">
							{gifs.map((gif, index) => (
								<div key={gif.id}>
									<a
										target="_blank"
										href="/"
										className="text-decoration-none lh-1"
									>
										<img
											key={"gif-" + index}
											className="img-animated-gif flex-nowrap"
											src={gif.images.downsized.url}
										/>
									</a>
								</div>
							))}
						</div>
					)}
				</div>
			))}
		</div>
	);
};

export default Home;
