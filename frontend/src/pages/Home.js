import React from "react";
//import PostService from "../Components/PostService";
import { useState, useEffect } from "react";
import { useQuery } from "react-query";
//import authHeader from "../auth";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faThumbsUp } from "@fortawesome/free-solid-svg-icons";
import postService from "../Components/PostService";
import Gifs from "../Components/Gif";
import Comments from "../Components/Comments";
import Post from "../Components/Post";
import PostModal from "../Components/PostModal";
import { ShowPostFormButton, ClosePostFormButton } from "../Components/Buttons";
import { NewPostForm, NewCommentForm } from "../Components/Forms";

const Home = () => {
	//const [posts, setPosts] = useState([]);
	const [comments, setComments] = useState([]);
	const user = JSON.parse(localStorage.getItem("user"));
	const [newPost, setNewPost] = useState({});
	const [postModal, setPostModal] = useState({});
	const [newComment, setNewComment] = useState({});
	const [gifs, setGifs] = useState([]);
	const [selectedGif, setSelectedGif] = useState({});
	const [selectedFileC, setSelectedFileC] = useState({});
	const [selectedFileP, setSelectedFileP] = useState({});
	const [showSelectedGif, setShowSelectedGif] = useState({});
	const [showGifs, setShowGifs] = useState({});
	//const [keyId, setKeyId] = useState({ id: "" });
	const [showCommNum, setShowCommNum] = useState({});
	const [showPostForm, setShowPostForm] = useState(false);
	const [showCommentForm, setShowCommentForm] = useState({});
	const [showPostModal, setShowPostModal] = useState({});
	const [likes, setLikes] = useState(0);
	const [usersLiked, setUsersLiked] = useState("");

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

	const handleDisplayPostModal = (e, postId) => {
		e.preventDefault();
		if (showPostModal.hasOwnProperty(postId)) {
			setShowPostModal({
				...showPostModal,
				[postId]: !showPostModal[postId],
			});
		} else {
			setShowPostModal((prevState) => {
				return {
					...prevState,
					[postId]: true,
				};
			});
		}
	};

	const handleDisplayCommentForm = (e, postId) => {
		e.preventDefault();
		if (showCommentForm.hasOwnProperty(postId)) {
			setShowCommentForm({
				...showCommentForm,
				[postId]: !showCommentForm[postId],
			});
		} else {
			setShowCommentForm((prevState) => {
				return {
					...prevState,
					[postId]: true,
				};
			});
		}
	};
	function arrayRemove(arr, value) {
		return arr.filter(function (ele) {
			return ele !== value;
		});
	}

	const handleLikes = (e, likesNum, usersList, postId) => {
		e.preventDefault();
		const checkListLiked = (user) => user === user.id;

		const usersListArr = usersList === "" ? [] : usersList;

		if (usersListArr.some(checkListLiked)) {
			setLikes(likesNum - 1);
			setUsersLiked(arrayRemove(usersListArr, user.id));
		} else {
			setLikes(likesNum + 1);
			setUsersLiked(usersListArr.push(user.id));
		}

		const likeSent = {};
		likeSent.likes = likes;
		likeSent.usersLiked = usersLiked;
		postService.fetchLikePost(user.token, user.id, postId, likeSent);
		setLikes(0);
		setUsersLiked("");
	};

	const handleClickDisplayGifs = (postId) => {
		if (showGifs.hasOwnProperty(postId)) {
			setShowGifs({
				...showGifs,
				[postId]: !showGifs[postId],
			});
		} else {
			setShowGifs((prevState) => {
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

	useEffect(() => {
		if (showCommentForm) {
			console.log(showCommentForm);
		}
	}, [showCommentForm]);

	useEffect(() => {
		if (showGifs) {
			console.log(showGifs);
		}
	}, [showGifs]);

	useEffect(() => {
		if (showPostModal) {
			console.log(showPostModal);
		}
	}, [showPostModal]);

	/* const classOverlay = (itemToShow) => {
		if (itemToShow.length > 0) {
			return "px-2 overlay";
		} else {
			return "px-2";
		}
	};
	// {classOverlay(showPostModal)}
	const wrapper = (itemToShow) => {
		if (itemToShow.length > 0) {
			return "wrapper";
		} else {
			return false;
		}
	}; */

	const enableItemToShow = (postId, itemToShow) => {
		if (itemToShow.hasOwnProperty(postId)) {
			return itemToShow[postId];
		} else {
			return false;
		}
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

	const handleChangeFile = (event) => {
		const { name, files } = event.target;

		setSelectedFileC((prevState) => {
			return {
				...prevState,
				[name]: files[0],
			};
		});
	};

	const submitNewPost = (e) => {
		e.preventDefault();

		const postSent = new FormData();

		postSent.append("title", newPost["newPostTitle"]);
		postSent.append("content", newPost["newPostMessage"]);
		postSent.append("imageUrl", selectedFileP, selectedFileP.name);
		postSent.append("userId", user.id);

		postService.fetchCreatePosts(user.token, postSent);
		setNewPost({});
		setSelectedFileP({});

		e.target.reset();
		//console.log(newPost);
	};

	const submitUpdatePost = (e, postId) => {
		e.preventDefault();

		const postUpdateSent = {};

		postUpdateSent.title = postModal["newPostTitle"];
		postUpdateSent.content = postModal["newPostMessage"];
		postUpdateSent.userId = user.id;
		postService.fetchModifyPost(user.token, postId, postUpdateSent);
		setPostModal({});
	};

	const deletePost = (e, postId) => {
		e.preventDefault();

		postService.fetchDeletePost(user.token, postId);
	};

	const submitNewComment = (e, index, postId) => {
		e.preventDefault();

		const commentSent = {};
		commentSent.content = newComment.hasOwnProperty(index)
			? newComment[index]
			: null;
		commentSent.postId = postId;
		commentSent.userId = user.id;

		const commentData = new FormData();
		commentData.append("newcomment", JSON.stringify(commentSent));
		selectedFileC.hasOwnProperty(index) &&
			commentData.append("image", selectedFileC[index]);

		/* 
			commentSent.gifUrl = selectedGif.hasOwnProperty(index) ? selectedGif[index]
			: null;
			
		newComment[index].hasOwnProperty(index) && commentData.append("content", newComment[index]);
		commentData.append("postId", postId);
		commentData.append("userId", user.id);
		selectedGif.hasOwnProperty(index) &&
		commentData.append("imageUrl", selectedGif[index]); */

		postService.fetchCreateComments(user.token, postId, commentData);

		setNewComment({ [index]: "" });
		setSelectedGif({ [index]: "" });
		setShowSelectedGif({ [index]: "" });
		setSelectedFileC({ [index]: "" });
		e.target.reset();
	};
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

	const handleSelectGif = (e, postId) => {
		e.preventDefault();

		const { name, src } = e.target;
		setSelectedGif((prevState) => {
			return {
				...prevState,
				[name]: src,
			};
		});

		setShowGifs((prevState) => {
			return {
				...prevState,
				[postId]: false,
			};
		});

		setShowSelectedGif((prevState) => {
			return {
				...prevState,
				[postId]: true,
			};
		});
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
		return newComment[id] || selectedGif[id] || selectedFileC[id]
			? false
			: true;
	};

	const handleChangeInputPost = (e) => {
		const { id, value } = e.target;
		setNewPost((prevState) => {
			return {
				...prevState,
				[id]: value,
			};
		});
	};

	const handleChangeFilePost = (e) => {
		const { id, files } = e.target;
		setNewPost((prevState) => {
			return {
				...prevState,
				[id]: files[0],
			};
		});
	};

	const handleInputUpdatePost = (e) => {
		const { id, value } = e.target;
		setPostModal((prevState) => {
			return {
				...prevState,
				[id]: value,
			};
		});
	};

	const getValueInputPost = (e, title, content) => {
		setPostModal((prevState) => {
			return {
				...prevState,
				["updateTitle"]: title,
			};
		});
		setPostModal((prevState) => {
			return {
				...prevState,
				["updateMessage"]: content,
			};
		});
	};

	const enablePostButton = (id1, id2) => {
		if (newPost.hasOwnProperty(id1) && newPost.hasOwnProperty(id2)) {
			return false;
		} else {
			return true;
		}
	};

	// Button send enable
	const changeCommentButtonStyle = (id) => {
		return newComment[id] || selectedGif[id] || selectedFileC[id]
			? "comments-button-enabled"
			: "comments-button-disabled";
	};

	const changePostButtonStyle = (id1, id2) => {
		if (newPost.hasOwnProperty(id1) && newPost.hasOwnProperty(id2)) {
			return "comments-button-enabled";
		} else {
			return "comments-button-disabled";
		}
	};

	/* 	useEffect(() => {
		if (newPost) {
			console.log(newPost);
		}
	}, [newPost]);
 */
	//get all posts
	/* useEffect(() => {
		const getAllPosts = async () => {
			const allPosts = await postService.fetchAllPosts(user.token);
			setPosts(allPosts);
		};
		getAllPosts().catch(console.error);
	}, []); */
	//get all comments
	useEffect(() => {
		const getAllComments = async () => {
			const allComments = await postService.fetchAllComments(user.token);
			setComments(allComments);
		};

		getAllComments().catch(console.error);
	}, [user.token]);

	const { isLoading, error, data } = useQuery("posts", () =>
		postService.fetchAllPosts(user.token)
	);

	const posts = data || [];
	if (isLoading) return "Loading...";
	if (error) return "An error has occurred: " + error.message;

	const handleShowPostForm = () => {
		setShowPostForm(!showPostForm);
	};

	/* const initiales = (firstname, lastname) => {
		firstname.charAt(0).toUpperCase() + lastname.charAt(0).toUpperCase();
	}; */

	//

	return (
		<div className="px-2">
			<h1 className="my-3 text-white">
				Welcome <em className="fw-bold text-capitalize">{user.firstname} </em>
				to Groupomania social app !
			</h1>
			<br />
			<h2 className="my-2 text-white">
				{" "}
				Envie d'écrire ou de partager une info, c'est par ici 👇{" "}
			</h2>
			<br />
			{!showPostForm && (
				<ShowPostFormButton
					handleShowPostForm={handleShowPostForm}
					msgToShow="Publier un message"
				/>
			)}
			{showPostForm && (
				<div className=" d-flex flex-column align-items-center">
					<NewPostForm
						enablePostButton={enablePostButton}
						changePostButtonStyle={changePostButtonStyle}
						handleChangeInputPost={handleChangeInputPost}
						handleChangeFilePost={handleChangeFilePost}
						submitNewPost={submitNewPost}
					/>

					<ClosePostFormButton
						handleShowPostForm={handleShowPostForm}
						msgToShow="Fermer"
					/>
				</div>
			)}
			<br />
			{user.isActive === false && (
				<h2 className="my-2 text-white">
					Go to the profile to activate again your account
				</h2>
			)}
			{user.isActive === true && (
				<div className="container">
					<h2 className="my-2 text-white"> Les derniers posts : </h2>
					<br />

					{posts.map((post, index) => (
						<div key={index} className="card my-4 ">
							<div className="container">
								<div className="row">
									<h3 className="h3-change py-1">
										{" "}
										<strong className="text-secondary">Message :</strong>{" "}
										{post.title}
									</h3>
									<div className="col-sm-2 card d-flex align-items-center pt-4">
										<div className=" pt-2 text-center align-middle border border-3 border-secondary bg-light  rounded-circle picture-change ">
											<span className="text-center fw-bold">
												{post.firstname.charAt(0).toUpperCase() +
													post.lastname.charAt(0).toUpperCase()}
											</span>
										</div>
										<p className="pt-3 fw-bold">
											{post.firstname} {post.lastname}
										</p>
									</div>
									<div className="col-sm-10 padding-col">
										<Post post={post} />
										<section className="card-section-actions d-flex justify-content-evenly align-items-center flex-wrap fw-bold">
											{enableItemToShow(post.id, showCommNum) === false && (
												<a
													className="card-p-comment-num text-secondary text-decoration-none"
													href="/"
													target="_blank"
													onClick={(e) => handleDisplayCommNum(e, post.id)}
												>
													Afficher les commentaires (
													{checkCommExists(comments, post)})
												</a>
											)}
											{enableItemToShow(post.id, showCommNum) === true && (
												<a
													className="card-p-comment-num text-secondary text-decoration-none"
													href="/"
													target="_blank"
													onClick={(e) => handleDisplayCommNum(e, post.id)}
												>
													Masquer les commentaires (
													{checkCommExists(comments, post)})
												</a>
											)}

											<a
												className="card-p-comment-num text-secondary  text-decoration-none"
												href="/"
												target="_blank"
												onClick={(e) => handleDisplayCommentForm(e, post.id)}
											>
												Commenter
											</a>
											<a
												className="card-p-comment-num text-secondary  text-decoration-none"
												href="/"
												target="_blank"
												onClick={(e) =>
													handleLikes(e, post.likes, post.usersLiked, post.id)
												}
												//onClick={(e) => handleDisplayCommNum(e, post.id)}
											>
												<div>
													<FontAwesomeIcon
														icon={faThumbsUp}
														className="px-1 py-2"
													/>
													<span>{post.likes === 0 ? null : post.likes}</span>
												</div>
											</a>
											<a
												className="card-p-comment-num text-secondary  text-decoration-none"
												href="/"
												target="_blank"
												onClick={(e) => {
													handleDisplayPostModal(e, post.id);
													getValueInputPost(e, post.title, post.content);
												}}
											>
												Modifier
											</a>
											{enableItemToShow(post.id, showPostModal) === true && (
												<PostModal
													post={post}
													showPostModal={showPostModal}
													handleInputUpdatePost={handleInputUpdatePost}
													submitUpdatePost={submitUpdatePost}
													handleDisplayPostModal={handleDisplayPostModal}
													postModal={postModal}
												/>
											)}
											<a
												className="card-p-comment-num text-secondary  text-decoration-none"
												href="/"
												target="_blank"
												onClick={(e) => deletePost(e, post.id)}
											>
												Supprimer
											</a>
										</section>
										{enableItemToShow(post.id, showCommNum) === true &&
											comments
												.filter((col) => col.postId === post.id)
												.map((comment, index) => (
													<div className="" key={index}>
														<Comments comment={comment} />
													</div>
												))}
										{enableItemToShow(post.id, showSelectedGif) === true && (
											<img
												alt="gif-selected"
												className="img-animated-gif flex-nowrap"
												src={selectedGif[index]}
											/>
										)}
										{enableItemToShow(post.id, showCommentForm) === true && (
											<div className="card-footer">
												<NewCommentForm
													postId={post.id}
													index={index}
													enableCommentButton={enableCommentButton}
													changeCommentButtonStyle={changeCommentButtonStyle}
													handleChangeInput={handleChangeInput}
													handleChangeFile={handleChangeFile}
													handleClickDisplayGifs={handleClickDisplayGifs}
													submitNewComment={submitNewComment}
												/>
											</div>
										)}
										{enableItemToShow(post.id, showGifs) === true && (
											<div className="d-flex flex-wrap flex-row justify-content-between align-items-center">
												{gifs.map((gif, idx) => (
													<div key={idx}>
														<Gifs
															postId={post.id}
															gif={gif}
															index={index}
															handleSelectGif={handleSelectGif}
														/>
													</div>
												))}
											</div>
										)}
									</div>
								</div>
							</div>
						</div>
					))}
				</div>
			)}
		</div>
	);
};

export default Home;
