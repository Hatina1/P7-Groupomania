import React from "react";
import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "react-query";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faThumbsUp } from "@fortawesome/free-solid-svg-icons";
import { faComment } from "@fortawesome/free-solid-svg-icons";
import postService from "../Services/PostService";
import commentService from "../Services/CommentService";
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
	const user = JSON.parse(localStorage.getItem("user"));
	const [postModal, setPostModal] = useState({});
	const [showPostModal, setShowPostModal] = useState({});
	const queryClient = useQueryClient();
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

	//handle like post
	const liked = (post) => {
		let listUsersLike = Object.values(post.usersLiked);
		if (listUsersLike.includes(user.id)) {
			return "liked-blue";
		}
	};
	const likePostMutation = useMutation(
		(postId) =>
			postService.likePost(user.token, postId, {
				userId: user.id,
				postId: postId,
			}),
		{
			onSuccess: () => {
				queryClient.invalidateQueries("posts");
			},
		}
	);
	const handleLikes = (e, postId) => {
		e.preventDefault();
		likePostMutation.mutate(postId);
	};
	//update post
	const enableItemToShow = (postId, itemToShow) => {
		if (itemToShow.hasOwnProperty(postId)) {
			return itemToShow[postId];
		} else {
			return false;
		}
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
	const getPostId = () => {
		if (Object.keys(showPostModal) !== undefined) {
			let arrKey = Object.keys(showPostModal);
			console.log(arrKey[0]);
			return arrKey[0];
		}
	};
	const updatePostMutation = useMutation(
		(postUpdateData) =>
			postService.modifyPost(user.token, getPostId(), postUpdateData),
		{
			onSuccess: () => {
				queryClient.invalidateQueries("posts");
			},
		}
	);
	const submitUpdatePost = (e, postId) => {
		e.preventDefault();

		const postUpdateSent = {};

		postUpdateSent.title = postModal["updatedTitle"];
		postUpdateSent.content = postModal["updatedMessage"]
			? postModal["updatedMessage"]
			: null;
		postUpdateSent.userId = user.id;

		console.log(postUpdateSent);

		const postUpdateData = new FormData();
		postUpdateData.append("updatepost", JSON.stringify(postUpdateSent));
		postModal.hasOwnProperty("updatedFile") &&
			postUpdateData.append("image", postModal["updatedFile"]);

		updatePostMutation.mutate(postUpdateData);

		setPostModal({});
		setShowPostModal({});
	};
	//delete post
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
	const deletePostMutation = useMutation(
		(postId) => postService.deletePost(user.token, postId),
		{
			onSuccess: () => {
				queryClient.invalidateQueries("posts");
			},
		}
	);
	const deletePost = (e, postId) => {
		e.preventDefault();

		deletePostMutation.mutate(postId);
	};

	const checkCommExists = (commList, postsList) => {
		let checkComm = [];
		let checkCommLen = 0;
		checkComm = commList.filter((comm) => comm.postId === postsList.id);
		checkCommLen = checkComm.length;
		return checkCommLen;
	};
	//get all comments
	const { isLoading, error, data } = useQuery("comments", () =>
		commentService.getAllComments(user.token)
	);
	const comments = data || [];

	return (
		<section className="card-section-actions d-flex justify-content-evenly align-items-center flex-wrap fw-bold">
			<a
				className="card-p-comment-num text-secondary text-decoration-none reply-hover"
				href={`#reply-${post.id}`}
				target="_blank"
				onClick={(e) => handleDisplayCommentForm(e, post.id)}
				data-bs-toggle="tooltip"
				data-bs-placement="bottom"
				title="Répondre"
			>
				<FontAwesomeIcon icon={faReply} className="px-1 py-2 icons-height " />
			</a>
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
					<FontAwesomeIcon
						icon={faThumbsUp}
						className={`px-1 py-2 ${liked(post)} icons-height`}
					/>
					<span className={liked(post)}>
						{post.likes === 0 ? null : post.likes}
					</span>
				</div>
			</a>

			{user.isAdmin === true && (
				<a
					className=" card-p-comment-num text-secondary text-decoration-none icons-change text-danger"
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
					<FontAwesomeIcon
						icon={faPenToSquare}
						className="px-1 py-2 icons-height"
					/>
				</a>
			)}
			{user.isAdmin === true && (
				<a
					className="card-p-comment-num text-secondary text-decoration-none icons-change text-danger"
					href="/"
					target="_blank"
					onClick={(e) => handleSuppPostModal(e, post.id)}
					data-bs-toggle="tooltip"
					data-bs-placement="bottom"
					title="Supprimer le post"
				>
					<FontAwesomeIcon
						icon={faTrashCan}
						className="px-1 py-2 icons-height"
					/>
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
