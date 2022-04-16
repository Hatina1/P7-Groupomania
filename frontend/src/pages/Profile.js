import React from "react";
import { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFaceLaugh } from "@fortawesome/free-solid-svg-icons";
import moment from "moment";

const Home = () => {
	const [posts, setPosts] = useState([]);
	const [comments, setComments] = useState([]);
	const user = JSON.parse(localStorage.getItem("user"));
	const [newComment, setNewComment] = useState({});
	const handleNewComment = (e) => {
		setNewComment({
			...newComment,
			[e.target.name]: e.target.value,
		});
		//e.target.value);
		//console.log(e);
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

	const date = (sqlDate) => {
		var dateCreation = moment(sqlDate).format("DD/MM/YYYY");
		return dateCreation;
	};

	return (
		<div className="px-2">
			<h1 className="my-3 text-white">Détails du compte</h1>
			<br />

			<div className="row">
				<div className="col-sm-4">
					<div className="card d-flex align-items-center pt-4">
						<div className=" pt-2 text-center align-middle border border-3 border-secondary bg-light  rounded-circle picture-change ">
							<span className="text-center fw-bold">HC</span>
						</div>
						<p className="pt-3 fw-bold">
							{user.firstname} {user.lastname}
						</p>
						<p className="border-bottom border-2 pt-1 pb-3">
							Utilisateur / Admin
						</p>
						<a href="/" target="_blank" className="link-dark pt-3">
							Paramètres du compte
						</a>
						<a href="/" target="_blank" className="link-dark pt-3">
							Modifier le profil
						</a>
						<a href="/" target="_blank" className="link-dark pt-3 pb-4">
							Deconnexion
						</a>
					</div>
				</div>

				<div className="col-sm-8 text-white">
					<p className="py-2 d-inline border-bottom border-3">Votre profil</p>
					<article className="border-bottom border-secondary pt-4 py-2 d-flex justify-content-between">
						<p className="font-change">Prénom: </p>
						<p className="">{user.firstname}</p>
					</article>

					<article className="border-bottom border-secondary py-2 d-flex justify-content-between ">
						<p className="font-change">Nom: </p>
						<p className="">{user.lastname}</p>
					</article>

					<article className="border-bottom border-secondary py-2 d-flex justify-content-between">
						<p className="font-change">Addresse Email: </p>
						<p className="">test@test.com</p>
					</article>

					<article className="border-bottom border-secondary py-2 d-flex justify-content-between">
						<p className="font-change">Compte crée le: </p>
						<p className="">{date(user.createdAt)}</p>
					</article>

					<button className="btn btn-sm btn btn-danger btn-change me-3 my-3">
						Désactiver le compte
					</button>
					<button className="btn btn-sm btn btn-danger btn-change me-3 my-3">
						Deconnexion
					</button>
				</div>
			</div>
		</div>
	);
};

export default Home;
