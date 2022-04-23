import React from "react";
//import PostService from "../Components/PostService";
import { useState, useEffect } from "react";
//import authHeader from "../auth";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFaceLaugh } from "@fortawesome/free-solid-svg-icons";
import { faThumbsUp } from "@fortawesome/free-solid-svg-icons";
import moment from "moment";
import postService from "../Components/PostService";
import Gifs from "../Components/Gif";
import Comments from "../Components/Comments";
import Post from "../Components/Post";

function Posts() {
	const [posts, setPosts] = useState([]);
	const [comments, setComments] = useState([]);
	const user = JSON.parse(localStorage.getItem("user"));
	const [newPost, setNewPost] = useState({});
	const [newComment, setNewComment] = useState({});
	const [gifs, setGifs] = useState([]);
	const [selectedGif, setSelectedGif] = useState({});
	const [showGifs, setShowGifs] = useState(true);
	const [keyId, setKeyId] = useState({ id: "" });
	const [showCommNum, setShowCommNum] = useState({});

	/* const handle = (postId) => {
		if (showCommNum.id === postId) {
			setShowCommNum({ ...showCommNum, display: !display });
		} else {
			setShowCommNum({ ...showCommNum, id: postId });
			setShowCommNum({ ...showCommNum, display: !display });
		}
	}; */

	const handleDisplayCommNum = (e, postId) => {
		e.preventDefault();
		if (showCommNum.hasOwnProperty(postId)) {
			setShowCommNum({
				...showCommNum,
				[postId]: !showCommNum[postId],
			});
		} else {
			setShowCommNum((prevState) => {
				return {
					...prevState,
					[postId]: true,
				};
			});
		}
	};

	useEffect(() => {
		if (showCommNum) {
			console.log(showCommNum);
		}
	}, [showCommNum]);

	const enableCommNum = (postId) => {
		if (showCommNum.hasOwnProperty(postId)) {
			return showCommNum[postId];
		} else {
			return false;
		}
	};

	const handleClickDisplayGifs = (postId) => {
		if (keyId.id === postId) {
			setShowGifs(!showGifs);
		} else {
			setKeyId({ ...keyId, id: postId });
			setShowGifs(!showGifs);
		}

		console.log(showGifs);
		console.log("ouvrir la div des gifs");
	};

	const handleChangeInput = (event) => {
		const { name, value } = event.target;

		setNewComment((prevState) => {
			return {
				...prevState,
				[name]: value,
			};
		});
	};

	const submitNewPost = (e, index) => {
		e.preventDefault();

		const postSent = {};
		postSent.content = postSent.hasOwnProperty("newPost") && newPost["newPost"];
		postSent.userId = user.id;
		postService.fetchCreatePosts(user.token, postSent);
		setNewPost({ [index]: "" });
		e.target.reset();
	};

	const submitNewComment = (e, index, postId) => {
		e.preventDefault();

		const commentSent = {};
		commentSent.content = newComment.hasOwnProperty(index) && newComment[index];
		commentSent.postId = postId;
		commentSent.userId = user.id;
		commentSent.imageUrl = selectedGif.hasOwnProperty(index)
			? selectedGif[index]
			: null;
		postService.fetchCreateComments(user.token, postId, commentSent);

		setNewComment({ [index]: "" });
		setSelectedGif({ [index]: "" });
		e.target.reset();
	};

	const checkCommExists = (commList, postsList) => {
		let checkComm = [];
		let checkCommLen = 0;
		checkComm = commList.filter((comm) => comm.postId === postsList.id);
		checkCommLen = checkComm.length;
		return checkCommLen;
	};

	// Button send enable
	const enableCommentButton = (id) => {
		return newComment[id] || selectedGif[id] || newPost[id] ? false : true;
	};
	// Button send enable
	const changeCommentButtonStyle = (id) => {
		return newComment[id] || selectedGif[id] || newPost[id]
			? "comments-button-enabled"
			: "comments-button-disabled";
	};

	//get all posts
	useEffect(() => {
		const getAllPosts = async () => {
			const allPosts = await postService.fetchAllPosts(user.token);
			setPosts(allPosts);
		};
		getAllPosts().catch(console.error);
	}, []);

	//get all comments
	useEffect(() => {
		const getAllComments = async () => {
			const allComments = await postService.fetchAllComments(user.token);
			setComments(allComments);
		};

		getAllComments().catch(console.error);
	}, []);

	//get gifs
	useEffect(() => {
		const getGifs = async () => {
			const resultGifs = await postService.fetchGifs(
				process.env.REACT_APP_GIF_PASSWORD
			);
			console.log(resultGifs);
			setGifs(resultGifs.data);
		};

		getGifs().catch(console.error);
	}, []);

	const handleSelectGif = (e) => {
		e.preventDefault();

		const { name, src } = e.target;
		setSelectedGif((prevState) => {
			return {
				...prevState,
				[name]: src,
			};
		});
		setShowGifs(false);
	};

	const handleChangeInputPost = (e) => {
		const { name, value } = e.target;
		setNewPost((prevState) => {
			return {
				...prevState,
				[name]: value,
			};
		});
	};

	return;

	posts.map((post, index) => (
		<div key={index} className="card my-4 ">
			<Post post={post} />
			<section className="card-section-actions d-flex justify-content-evenly align-items-center flex-wrap fw-bold">
				{enableCommNum(post.id) === false && (
					<a
						className="card-p-comment-num text-secondary text-decoration-none"
						href="/"
						target="_blank"
						onClick={(e) => handleDisplayCommNum(e, post.id)}
					>
						Afficher les commentaires ({checkCommExists(comments, post)})
					</a>
				)}
				{enableCommNum(post.id) === true && (
					<a
						className="card-p-comment-num text-secondary text-decoration-none"
						href="/"
						target="_blank"
						onClick={(e) => handleDisplayCommNum(e, post.id)}
					>
						Masquer les commentaires ({checkCommExists(comments, post)})
					</a>
				)}

				<a
					className="card-p-comment-num text-secondary  text-decoration-none"
					href="/"
					target="_blank"
					onClick={(e) => handleDisplayCommNum(e, post.id)}
				>
					Commenter
				</a>
				<a
					className="card-p-comment-num text-secondary  text-decoration-none"
					href="/"
					target="_blank"
					onClick={(e) => handleDisplayCommNum(e, post.id)}
				>
					<FontAwesomeIcon
						icon={faThumbsUp}
						className="px-1 py-2"
						onClick={() => handleClickDisplayGifs(post.id)}
					/>
				</a>
				<a
					className="card-p-comment-num text-secondary  text-decoration-none"
					href="/"
					target="_blank"
					onClick={(e) => handleDisplayCommNum(e, post.id)}
				>
					Modifier
				</a>
				<a
					className="card-p-comment-num text-secondary  text-decoration-none"
					href="/"
					target="_blank"
					onClick={(e) => handleDisplayCommNum(e, post.id)}
				>
					Supprimer
				</a>
			</section>
			{enableCommNum(post.id) === true &&
				comments
					.filter((col) => col.postId === post.id)
					.map((comment, index) => (
						<div className="" key={index}>
							<Comments comment={comment} />
						</div>
					))}

			<div className="card-footer">
				<form
					className="d-flex"
					key={index}
					onSubmit={(e) => submitNewComment(e, index, post.id)}
				>
					<input
						className="form-control form-control-change"
						type="text"
						name={index}
						id={index}
						onChange={handleChangeInput}
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
					{gifs.map((gif, index) => (
						<div key={index}>
							<Gifs gif={gif} index={index} handleSelectGif={handleSelectGif} />
						</div>
					))}
				</div>
			)}
		</div>
	));
}

export default Posts;
