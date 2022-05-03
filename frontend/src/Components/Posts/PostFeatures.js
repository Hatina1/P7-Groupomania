import React from "react";
import { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faThumbsUp } from "@fortawesome/free-solid-svg-icons";
import { faComment } from "@fortawesome/free-solid-svg-icons";
import postService from "../Services/PostService";
import PostModal from "../Modals/PostModal";
import SuppPostModal from "../Modals/SuppPostModal";
import { faTrashCan } from "@fortawesome/free-solid-svg-icons";
import { faPenToSquare } from "@fortawesome/free-solid-svg-icons";
import { faReply } from "@fortawesome/free-solid-svg-icons";

const PostFeatures = ({
	post,
	showCommNum,
	handleDisplayCommNum,
	handleDisplayCommentForm,
}) => {
	const [comments, setComments] = useState([]);
	const user = JSON.parse(localStorage.getItem("user"));
	const [postModal, setPostModal] = useState({});
	const [showGifs, setShowGifs] = useState({});
	//const [showCommNum, setShowCommNum] = useState({});
	const [showCommentForm, setShowCommentForm] = useState({});
	const [showPostModal, setShowPostModal] = useState({});

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

	const handleLikes = (e, postId) => {
		e.preventDefault();

		const likeSent = {};
		likeSent.userId = user.id;
		likeSent.postId = postId;
		postService.fetchLikePost(user.token, postId, likeSent);
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

	const enableItemToShow = (postId, itemToShow) => {
		if (itemToShow.hasOwnProperty(postId)) {
			return itemToShow[postId];
		} else {
			return false;
		}
	};

	const submitUpdatePost = (e, postId) => {
		e.preventDefault();

		const postUpdateSent = {};

		postUpdateSent.title = postModal["updatedTitle"];
		postUpdateSent.content = postModal["updatedMessage"]
			? postModal["updatedMessage"]
			: null;
		postUpdateSent.userId = user.id;

		const postUpdateData = new FormData();

		postUpdateData.append("updatepost", JSON.stringify(postUpdateSent));

		postModal.hasOwnProperty("updatedFile") &&
			postUpdateData.append("image", postModal["updatedFile"]);

		postService.fetchModifyPost(user.token, postId, postUpdateData);
		//setPostModal({});
		setShowPostModal({});
	};

	const deletePost = (e, postId) => {
		e.preventDefault();

		postService.fetchDeletePost(user.token, postId);
	};

	const checkCommExists = (commList, postsList) => {
		let checkComm = [];
		let checkCommLen = 0;
		checkComm = commList.filter((comm) => comm.postId === postsList.id);
		checkCommLen = checkComm.length;
		return checkCommLen;
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

	const handleFileUpdatePost = (e) => {
		const { id, files } = e.target;
		setPostModal((prevState) => {
			return {
				...prevState,
				[id]: files[0],
			};
		});
	};
	const getValueInputPost = (e, title, content, imageUrl) => {
		setPostModal((prevState) => {
			return {
				...prevState,
				updatedTitle: title,
			};
		});
		setPostModal((prevState) => {
			return {
				...prevState,
				updatedMessage: content,
			};
		});
	};

	useEffect(() => {
		console.log(user.id);
		const getAllComments = async () => {
			const allComments = await postService.fetchAllComments(user.token);
			setComments(allComments);
		};

		getAllComments().catch(console.error);
	}, []);

	const [showSuppPostModal, setShowSuppPostModal] = useState({});
	const handleSuppPostModal = (e, postId) => {
		e.preventDefault();
		if (showSuppPostModal.hasOwnProperty(postId)) {
			setShowSuppPostModal({
				...showSuppPostModal,
				[postId]: !showSuppPostModal[postId],
			});
		} else {
			setShowSuppPostModal((prevState) => {
				return {
					...prevState,
					[postId]: true,
				};
			});
		}
	};

	useEffect(() => {
		if (showSuppPostModal) {
			console.log(showSuppPostModal);
		}
	}, [showSuppPostModal]);

	return (
		<section className="card-section-actions d-flex justify-content-evenly align-items-center flex-wrap fw-bold">
			{enableItemToShow(post.id, showCommNum) === false && (
				<div>
					{checkCommExists(comments, post) === 0 ? (
						<a
							className="card-p-comment-num text-secondary text-decoration-none d-none d-sm-block"
							href="/"
							target="_blank"
							onClick={(e) => handleDisplayCommNum(e, post.id)}
						>
							Pas de commentaires
						</a>
					) : (
						<a
							className="card-p-comment-num text-secondary text-decoration-none d-none d-sm-block"
							href="/"
							target="_blank"
							onClick={(e) => handleDisplayCommNum(e, post.id)}
						>
							Afficher les commentaires ({checkCommExists(comments, post)})
						</a>
					)}

					<a
						className="card-p-comment-num text-secondary text-decoration-none d-block d-sm-none"
						href="/"
						target="_blank"
						onClick={(e) => handleDisplayCommNum(e, post.id)}
					>
						<div className="d-flex justify-content-center align-items-center">
							<FontAwesomeIcon icon={faComment} className="px-1 py-2" />
							{checkCommExists(comments, post)}
						</div>
					</a>
				</div>
			)}
			{enableItemToShow(post.id, showCommNum) === true && (
				<div>
					<a
						className="card-p-comment-num text-secondary text-decoration-none d-none d-sm-block"
						href="/"
						target="_blank"
						onClick={(e) => handleDisplayCommNum(e, post.id)}
					>
						Masquer les commentaires ({checkCommExists(comments, post)})
					</a>
					<a
						className="card-p-comment-num text-secondary text-decoration-none d-block d-sm-none"
						href="/"
						target="_blank"
						onClick={(e) => handleDisplayCommNum(e, post.id)}
					>
						<div className="d-flex justify-content-center align-items-center">
							<FontAwesomeIcon icon={faComment} className="px-1 py-2" />
							{checkCommExists(comments, post)}
						</div>
					</a>
				</div>
			)}

			<a
				className="card-p-comment-num text-secondary text-decoration-none color-thumb"
				href="/"
				target="_blank"
				onClick={(e) => handleLikes(e, post.id)}
				data-bs-toggle="tooltip"
				data-bs-placement="bottom"
				title="Liker"
			>
				<div className="d-flex justify-content-center align-items-center">
					<FontAwesomeIcon icon={faThumbsUp} className="px-1 py-2" />
					<span>{post.likes === 0 ? null : post.likes}</span>
				</div>
			</a>
			<a
				className="card-p-comment-num text-secondary text-decoration-none"
				href="/"
				target="_blank"
				onClick={(e) => handleDisplayCommentForm(e, post.id)}
				data-bs-toggle="tooltip"
				data-bs-placement="bottom"
				title="Répondre"
			>
				<FontAwesomeIcon icon={faReply} className="px-1 py-2 " />
			</a>
			{user.isAdmin === true && (
				<a
					className=" card-p-comment-num text-secondary text-decoration-none icons-change"
					href="/"
					target="_blank"
					onClick={(e) => {
						handleDisplayPostModal(e, post.id);
						getValueInputPost(e, post.title, post.content, post.imageUrl);
					}}
					data-bs-toggle="tooltip"
					data-bs-placement="bottom"
					title="Modifier le post"
				>
					<FontAwesomeIcon icon={faPenToSquare} className="px-1 py-2 " />
				</a>
			)}
			{user.isAdmin === true && (
				<a
					className="card-p-comment-num text-secondary text-decoration-none icons-change"
					href="/"
					target="_blank"
					onClick={(e) => handleSuppPostModal(e, post.id)}
					data-bs-toggle="tooltip"
					data-bs-placement="bottom"
					title="Supprimer le post"
				>
					<FontAwesomeIcon icon={faTrashCan} className="px-1 py-2 " />
				</a>
			)}

			{enableItemToShow(post.id, showSuppPostModal) === true && (
				<SuppPostModal
					post={post}
					showSuppPostModal={showSuppPostModal}
					handleSuppPostModal={handleSuppPostModal}
					deletePost={deletePost}
				/>
			)}
			{enableItemToShow(post.id, showPostModal) === true && (
				<PostModal
					post={post}
					showPostModal={showPostModal}
					handleInputUpdatePost={handleInputUpdatePost}
					handleFileUpdatePost={handleFileUpdatePost}
					submitUpdatePost={submitUpdatePost}
					handleDisplayPostModal={handleDisplayPostModal}
					postModal={postModal}
				/>
			)}
		</section>
	);
};

export default PostFeatures;
