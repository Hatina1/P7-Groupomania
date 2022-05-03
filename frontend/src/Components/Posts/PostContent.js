import React from "react";
import { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import "../../styles/bootstrap.min.css";
import "../../styles/headers.css";
import moment from "moment";
import SuppPostModal from "../Modals/SuppPostModal";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashCan } from "@fortawesome/free-solid-svg-icons";
import { faPenToSquare } from "@fortawesome/free-solid-svg-icons";

function Post({ post, deletePost, handleDisplayPostModal, getValueInputPost }) {
	const user = JSON.parse(localStorage.getItem("user"));
	const sqlToJsDate = (sqlDate) => {
		var sqlDateFormat = new Date(sqlDate);
		var jYear = sqlDateFormat.getFullYear();
		var jMonth = sqlDateFormat.getMonth();
		var jDay = sqlDateFormat.getDate();
		var delay = moment([jYear, jMonth, jDay + 1])
			.fromNow()
			.split(" ");
		let checkPeriod = delay[0];
		let period = delay[1];
		let french = "";
		if (checkPeriod === "in") {
			french = delay[1] + " " + "heures";
		} else if (period === "hours") {
			french = delay[0] + " " + "heures";
		} else if (period === "days") {
			french = delay[0] + " " + "jours";
		} else if (period === "years") {
			french = delay[0] + " " + "années";
		} else if (period === "day") {
			french = "1 jour";
		}
		return french;
	};
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

	/* useEffect(() => {
		if (showSuppPostModal) {
			console.log(showSuppPostModal);
		}
	}, [showSuppPostModal]); */

	const enableItemToShow = (postId, itemToShow) => {
		if (itemToShow.hasOwnProperty(postId)) {
			return itemToShow[postId];
		} else {
			return false;
		}
	};

	return (
		<div className="card-body-change">
			<div className="card-body-header d-flex justify-content-between border-bottom border-1">
				<p className="margin-change p-change-responsive">
					Posté par{" "}
					<strong>
						{post.firstname} {post.lastname}
					</strong>
				</p>
				<p className="margin-change p-change-responsive">
					il y a {`${sqlToJsDate(post.createdAt)}`}
				</p>
			</div>
			{post.imageUrl ? (
				<a href={post.imageUrl} className="text-decoration-none">
					<img className="img-animated" src={post.imageUrl} alt="image" />
				</a>
			) : null}

			<p className="p-change my-4">{post.content}</p>
		</div>
	);
}

export default Post;
