import React from "react";
import { useState, useEffect } from "react";
import { useQuery, useMutation, useQueryClient } from "react-query";
import postService from "../Services/PostService";
import commentService from "../Services/CommentService";
import Gifs from "./Gif";
import Comments from "../Comments";
import PostCreator from "./PostCreator";
import PostContent from "./PostContent";
import PostFeatures from "./PostFeatures";
import { NewCommentForm } from "../Forms/PostForms";

const PostsList = ({ post }) => {
	const queryClient = useQueryClient();
	const user = JSON.parse(localStorage.getItem("user"));
	const [postModal, setPostModal] = useState({});
	const [newComment, setNewComment] = useState({});
	const [gifs, setGifs] = useState([]);
	const [selectedGif, setSelectedGif] = useState({});
	const [selectedFileC, setSelectedFileC] = useState({});
	const [showSelectedGif, setShowSelectedGif] = useState({});
	const [showGifs, setShowGifs] = useState({});
	const [showCommNum, setShowCommNum] = useState({});
	const [showCommentForm, setShowCommentForm] = useState({});
	const [showPostModal, setShowPostModal] = useState({});

	//	display comments
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
	//	display post update modal
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
		/* setPostModal((prevState) => {
			return {
				...prevState,
				updatedFile: imageUrl,
			};
		}); */
	};
	//	display comment form
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
	//	display gifs div
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
	// new Comment content
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
	// get all Gifs
	useEffect(() => {
		const getGifs = async () => {
			const resultGifs = await commentService.getGifs(
				process.env.REACT_APP_GIF_PASSWORD
			);

			setGifs(resultGifs.data);
		};

		getGifs().catch(console.error);
	}, []);
	const handleSelectGif = (e, postId) => {
		e.preventDefault();
		console.log(e.target);
		//const { name, src } = e.target;
		setSelectedGif((prevState) => {
			return {
				...prevState,
				[postId]: e.target.src,
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
	//	create new Comment
	// Button send enable
	const enableCommentButton = (id) => {
		return newComment[id] || selectedGif[id] || selectedFileC[id]
			? false
			: true;
	};
	const changeCommentButtonStyle = (id) => {
		return newComment[id] || selectedGif[id] || selectedFileC[id]
			? "comments-button-enabled"
			: "comments-button-disabled";
	};
	const getPostId = () => {
		if (Object.keys(showCommentForm) !== undefined) {
			return Object.keys(showCommentForm);
		}
	};

	const addCommentMutation = useMutation(
		(commentData) =>
			commentService.createComment(user.token, getPostId(), commentData),

		{
			onSuccess: () => {
				queryClient.invalidateQueries(["comments"]);
			},
		}
	);
	const submitNewComment = (e, index, postId) => {
		e.preventDefault();

		const commentSent = {};
		commentSent.content = newComment.hasOwnProperty(index)
			? newComment[index]
			: null;
		commentSent.gifUrl = selectedGif.hasOwnProperty(index)
			? selectedGif[index]
			: null;
		commentSent.postId = postId;
		commentSent.userId = user.id;

		const commentData = new FormData();
		commentData.append("newcomment", JSON.stringify(commentSent));
		selectedFileC.hasOwnProperty(index) &&
			commentData.append("image", selectedFileC[index]);

		addCommentMutation.mutateAsync(commentData);

		//commentService.createComment(user.token, postId, commentData);

		setNewComment({ [index]: "" });
		setSelectedGif({ [index]: "" });
		setShowCommentForm({ [index]: "" });
		setShowSelectedGif({ [index]: "" });
		setSelectedFileC({ [index]: "" });
		//window.location.reload();
		//refetch();
		//e.target.reset();
	};
	//	get all comments {refetchInterval: 10000,} { cacheTime: 0 }
	const { error, data } = useQuery(
		["comments"],
		() => commentService.getAllComments(user.token),
		{
			refetchOnWindowFocus: true,
			staleTime: 0,
			cacheTime: 0,
			refetchInterval: 10000,
		}
	);
	const comments = data || [];

	return (
		<div key={post.id} className="card my-4 card-responsive">
			<div className="container">
				<div className="row">
					<h3 className="h3-change py-1 overflow">
						{" "}
						<strong className="text-secondary">Message :</strong> {post.title}
					</h3>
					<PostCreator post={post} />
					<div className=" card col-sm-10 padding-col">
						<PostContent post={post} />
						<PostFeatures
							post={post}
							showCommNum={showCommNum}
							handleDisplayCommNum={handleDisplayCommNum}
							handleDisplayCommentForm={handleDisplayCommentForm}
						/>

						<div>
							{enableItemToShow(post.id, showCommNum) === true &&
								comments.length > 0 &&
								comments
									.filter((col) => col.postId === post.id)
									.map((comment) => (
										<div className="" key={comment.id}>
											{error && (
												<h4 className="my-3 text-white">
													`An error has occurred:${error.message}`
												</h4>
											)}
											<Comments comment={comment} post={post} />
										</div>
									))}
							{enableItemToShow(post.id, showSelectedGif) === true && (
								<img
									alt="gif-selected"
									className="img-animated-gif flex-nowrap"
									src={selectedGif[post.id]}
								/>
							)}
							{selectedFileC[post.id] ? (
								<em className="mx-3 text-success">
									{selectedFileC[post.id].name}
								</em>
							) : null}
							{showCommentForm[post.id] && (
								<div className="card-footer" id={`reply-${post.id}`}>
									<NewCommentForm
										postId={post.id}
										index={post.id}
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
												index={idx}
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
		</div>
	);
};

export default PostsList;
