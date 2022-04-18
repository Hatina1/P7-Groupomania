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
	const [newComment, setNewComment] = useState({});
	const [commentSend, setCommentSend] = useState({
		commentId: "",
		sent: "",
	});
	const [gifs, setGifs] = useState([]);
	const [selectedGif, setSelectedGif] = useState("");
	const [selectedFile, setSelectedFile] = useState(null);
	const [showGifs, setShowGifs] = useState(true);
	const [keyId, setKeyId] = useState({ id: "" });
	const [commPostId, setCommPostId] = useState({ id: "" });
	const divStyle = {
		display: "none",
	};

	const handleClickDisplayGifs = (postId) => {
		if (keyId.id == postId) {
			setShowGifs(!showGifs);
		} else {
			setKeyId({ ...keyId, id: postId });
			setShowGifs(!showGifs);
		}

		console.log(showGifs);
		console.log("ouvrir la div des gifs");
	};

	//const handleNewComment = (e) => {
	//console.log(name);
	//setCommPostId({ ...commPostId, id: name });
	//console.log(commPostId.id == name);
	//if (commPostId.id == name) {}
	//	setNewComment(e.target.value);
	//setNewComment({ [e.target.name]: e.target.value });
	//};

	const handleChange = (event) => {
		const { name, value } = event.target;
		setNewComment((prevState) => {
			return {
				...prevState,
				[name]: value,
			};
		});
	};

	const handleCommentSend = (e) => {
		setCommentSend({ commentId: numberOfComm++, sent: newComment });
		setNewComment("");
	};

	const handleSelectedFile = (event) => {
		setSelectedFile(event.target.files[0]);
	};

	const submitNewComment = (e, index) => {
		e.preventDefault();
		//setCommentLine(comment);

		/* const formData = new FormData();
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
			.catch((err) => console.log("comment was not sent to db", err)); */

		//

		console.log(newComment);

		setNewComment({ [index]: "" });
		e.target.reset();
		console.log(newComment[index]);
	};
	//	https://media.giphy.com/media/NEvPzZ8bd1V4Y/giphy.gif

	//moment("20111031", "YYYYMMDD").fromNow();

	const sqlToJsDate = (sqlDate) => {
		var sqlDateFormat = new Date(sqlDate);
		var jYear = sqlDateFormat.getFullYear();
		var jMonth = sqlDateFormat.getMonth();
		var jDay = sqlDateFormat.getDate();
		var sentDelay = moment([jYear, jMonth, jDay + 1]).fromNow();
		return sentDelay;
	};

	// Button send enable
	const enableCommentButton = (id) => {
		return newComment[id] ? false : true;
	};
	// Button send enable
	const changeCommentButtonStyle = (id) => {
		return newComment[id]
			? "comments-button-enabled"
			: "comments-button-disabled";
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
			<br />
			user.isActive ? (
			<h2 className="my-2 text-white"> Les derniers posts : </h2>
			{posts.map((post, index) => (
				<div key={index} className="card my-4">
					<div className="card-body py-4">
						<div className="card-body-header d-flex justify-content-between">
							<p>
								Posté par {post.firstname} {post.lastname}
							</p>
							<p>il y a {sqlToJsDate(post.createdAt)}</p>
						</div>
						<h3 className="h3-change">{post.title}</h3>
						<p className="p-change">{post.content}</p>
					</div>

					{comments
						.filter((col) => col.postId == post.id)
						.map((comment, index) => (
							<div className="" key={index}>
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
											{sqlToJsDate(comment.createdAt)}
										</p>
										<p className="p-change">
											{comment.imageUrl} {comment.content}
										</p>
									</article>
								</section>
							</div>
						))}

					<div className="card-footer">
						<form
							className="d-flex"
							key={index}
							onSubmit={(e) => submitNewComment(e, index)}
						>
							<input
								className="form-control form-control-change"
								type="text"
								name={index}
								id={index}
								onChange={handleChange}
								placeholder="Ecrire un commentaire"
								//name={`comment-${numberOfComm(comments) + 1}`}
								//id={`comment-${index}`}
								//onChange={(e) => setNewComment(e.target.value)}
							/>

							<FontAwesomeIcon
								icon={faFaceLaugh}
								className="px-1 py-2"
								onClick={() => handleClickDisplayGifs(post.id)}
							/>
							<button
								className={`btn btn-primary btn-sm btn-change ${changeCommentButtonStyle(
									index
								)}`}
								id={index}
								disabled={enableCommentButton(index)}
								type="submit"
							>
								Send
							</button>
						</form>
					</div>

					{keyId.id === post.id && showGifs && (
						<div className="d-flex flex-wrap flex-row justify-content-between align-items-center">
							{gifs.map((gif) => (
								<div key={gif.id}>
									<a
										target="_blank"
										href="/"
										className="text-decoration-none lh-1"
									>
										<img
											key={"gif-" + gif.id}
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
			) : (
			<h2 className="my-2 text-white">
				{" "}
				Go to the profile to activate again your account{" "}
			</h2>
			)
		</div>
	);
};

export default Home;
