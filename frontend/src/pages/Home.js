import React from "react";
import { useState } from "react";
import { useQuery } from "react-query";
import postService from "../Components/Services/PostService";
import PostsList from "../Components/Posts/PostsList";
import { ShowPostFormButton, ClosePostFormButton } from "../Components/Buttons";
import { NewPostForm } from "../Components/Forms/PostForms";

const Home = () => {
	const user = JSON.parse(localStorage.getItem("user"));
	const [newPost, setNewPost] = useState({});
	const [selectedFileP, setSelectedFileP] = useState({});
	const [showPostForm, setShowPostForm] = useState(false);

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
		//console.log(selectedFileP);
		postService.fetchCreatePost(user.token, postData);
		setNewPost({});
		setSelectedFileP({});
		setShowPostForm(!showPostForm);
		e.target.reset();

		//console.log(newPost);
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

	// Button send enable

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

	const { isLoading, error, data } = useQuery("posts", () =>
		postService.fetchAllPosts(user.token)
	);

	const posts = data || [];

	const handleShowPostForm = () => {
		setShowPostForm(!showPostForm);
	};

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
