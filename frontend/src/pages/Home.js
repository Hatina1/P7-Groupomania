import React from "react";
import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "react-query";
import postService from "../components/Services/PostService";
import PostsList from "../components/Posts/PostsList";
import { ShowPostFormButton, ClosePostFormButton } from "../components/Buttons";
import { NewPostForm } from "../components/Forms/PostForms";

const Home = () => {
	const queryClient = useQueryClient();
	const user = JSON.parse(localStorage.getItem("user"));
	const [newPost, setNewPost] = useState({});
	const [selectedFileP, setSelectedFileP] = useState({});
	const [showPostForm, setShowPostForm] = useState(false);

	// Create New Post
	const handleShowPostForm = () => {
		setShowPostForm(!showPostForm);
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
		const { name, files } = e.target;
		setSelectedFileP((prevState) => {
			return {
				...prevState,
				[name]: files[0],
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
	const addPost = useMutation(
		(postData) => postService.createPost(user.token, postData),
		{
			onSuccess: () => {
				queryClient.invalidateQueries("posts");
			},
		}
	);
	const submitNewPost = (e) => {
		e.preventDefault();

		const postSent = {};
		postSent.title = newPost["newPostTitle"];
		postSent.content = newPost["newPostMessage"]
			? newPost["newPostMessage"]
			: null;
		postSent.userId = user.id;

		const postData = new FormData();
		postData.append("newpost", JSON.stringify(postSent));
		selectedFileP.hasOwnProperty("newPostFile") &&
			postData.append("image", selectedFileP["newPostFile"]);

		addPost.mutate(postData);
		setNewPost({});
		setSelectedFileP({});
		setShowPostForm(!showPostForm);
		e.target.reset();

		//console.log(newPost);
	};
	// Button send enable
	const changePostButtonStyle = (id1, id2) => {
		if (newPost.hasOwnProperty(id1) && newPost.hasOwnProperty(id2)) {
			return "comments-button-enabled";
		} else {
			return "comments-button-disabled";
		}
	};

	// Get All Posts
	const { isLoading, error, data } = useQuery("posts", () =>
		postService.getAllPosts(user.token)
	);
	const posts = data || [];

	return (
		<div className="px-2">
			<div className="px-2">
				{isLoading && <h1 className="my-3 text-white">Loading...</h1>}
				{error && (
					<h1 className="my-3 text-white">
						`An error has occurred:${error.message}`
					</h1>
				)}

				<h1 className="my-3 text-white">
					Bienvenue{" "}
					<em className="fw-bold text-capitalize">{user.firstname} </em>!
				</h1>
				<br />

				{user.isActive === true && (
					<h2 className="my-2 text-white">
						{" "}
						Envie d'écrire ou de partager une info, c'est par ici 👇{" "}
					</h2>
				)}
			</div>
			<br />
			{user.isActive === false ||
				(!showPostForm && (
					<ShowPostFormButton
						handleShowPostForm={handleShowPostForm}
						msgToShow="Publier un message"
					/>
				))}

			{showPostForm && (
				<div className=" d-flex flex-column align-items-center">
					<NewPostForm
						enablePostButton={enablePostButton}
						changePostButtonStyle={changePostButtonStyle}
						handleChangeInputPost={handleChangeInputPost}
						handleChangeFilePost={handleChangeFilePost}
						submitNewPost={submitNewPost}
						selectedFileP={selectedFileP}
					/>

					<ClosePostFormButton
						handleShowPostForm={handleShowPostForm}
						msgToShow="Fermer"
					/>
				</div>
			)}
			<br />

			{user.isActive === true && (
				<div className="container d-flex align-items-center flex-column">
					<h2 className="my-2 text-white"> Les derniers posts : </h2>
					<br />

					{posts &&
						posts.length > 0 &&
						posts.map((post) => <PostsList key={post.id} post={post} />)}
				</div>
			)}
		</div>
	);
};

export default Home;
