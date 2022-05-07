import React from "react";
import { useState, useEffect } from "react";
import { useQuery, useMutation, useQueryClient } from "react-query";
import ReactDOM from "react-dom";
import "../styles/bootstrap.min.css";
import "../styles/headers.css";
import moment from "moment";
import commentService from "./Services/CommentService";
import SuppCommentModal from "./Modals/SuppCommentModal";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashCan } from "@fortawesome/free-solid-svg-icons";

function Comments({ comment, post }) {
	const queryClient = useQueryClient();
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
	const [showSuppCommentModal, setShowSuppCommentModal] = useState({});
	const handleSuppCommentModal = (e, commentId) => {
		e.preventDefault();
		if (showSuppCommentModal.hasOwnProperty(commentId)) {
			setShowSuppCommentModal({
				...showSuppCommentModal,
				[commentId]: !showSuppCommentModal[commentId],
			});
		} else {
			setShowSuppCommentModal((prevState) => {
				return {
					...prevState,
					[commentId]: true,
				};
			});
		}
	};

	const getCommId = () => {
		if (Object.keys(showSuppCommentModal) !== undefined) {
			let arrKey = Object.keys(showSuppCommentModal);
			console.log(showSuppCommentModal, arrKey[0]);
			return arrKey[0];
		}
	};
	const deleteCommentMutation = useMutation(
		(postId) => commentService.deleteComment(user.token, postId, getCommId()),
		{
			onSuccess: () => {
				queryClient.invalidateQueries("comments");
			},
		}
	);

	const deleteComment = (e, postId) => {
		e.preventDefault();
		deleteCommentMutation.mutate(postId);
	};

	/* useEffect(() => {
		if (showSuppCommentModal) {
			console.log(showSuppCommentModal);
		}
	}, [showSuppCommentModal]); */

	const enableItemToShow = (commentId, itemToShow) => {
		if (itemToShow.hasOwnProperty(commentId)) {
			return itemToShow[commentId];
		} else {
			return false;
		}
	};

	return (
		<section className="card-body-comment">
			<article className="card-article-comment">
				<div className="card-body-header d-flex justify-content-between">
					<p>
						Réponse de {comment.firstname} {comment.lastname}
					</p>
					<p>il y a {sqlToJsDate(comment.createdAt)}</p>
				</div>
				{comment.gifUrl && (
					<img
						className="img-animated-gif d-block"
						src={comment.gifUrl}
						alt="gif"
					/>
				)}
				{comment.imageUrl && (
					<a href={comment.imageUrl} className="text-decoration-none">
						<img className="img-animated" src={comment.imageUrl} alt="image" />
					</a>
				)}

				<p className="p-change">{comment.content}</p>
				<div className="d-flex flex-nowrap justify-content-end">
					{user.isAdmin === true && (
						<a
							className="text-secondary text-decoration-none icons-change"
							href="/"
							target="_blank"
							onClick={(e) => handleSuppCommentModal(e, comment.id)}
						>
							<FontAwesomeIcon
								icon={faTrashCan}
								className="py-2 icon-height "
							/>
						</a>
					)}
					{enableItemToShow(comment.id, showSuppCommentModal) === true && (
						<SuppCommentModal
							post={post}
							comment={comment}
							showSuppCommentModal={showSuppCommentModal}
							handleSuppCommentModal={handleSuppCommentModal}
							deleteComment={deleteComment}
						/>
					)}
				</div>
			</article>
		</section>
	);
}

export default Comments;
