import React from "react";
import ReactDOM from "react-dom";
import "../styles/bootstrap.min.css";
import "../styles/headers.css";
import moment from "moment";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashCan } from "@fortawesome/free-solid-svg-icons";

function Comments({ comment, post, deleteComment }) {
	const sqlToJsDate = (sqlDate) => {
		var sqlDateFormat = new Date(sqlDate);
		var jYear = sqlDateFormat.getFullYear();
		var jMonth = sqlDateFormat.getMonth();
		var jDay = sqlDateFormat.getDate();
		var sentDelay = moment([jYear, jMonth, jDay + 1]).fromNow();
		return sentDelay;
	};
	return (
		<section className="card-body-comment">
			<article className="card-article-comment">
				<div className="card-body-header d-flex justify-content-between">
					<p>
						Réponse de {comment.firstname} {comment.lastname}
					</p>
					<div>
						<p>il y a {sqlToJsDate(comment.createdAt)}</p>
						<a
							className="card-p-comment-num text-secondary text-decoration-none"
							href="/"
							target="_blank"
							onClick={(e) => deleteComment(e, post.id, comment.id)}
						>
							<FontAwesomeIcon
								icon={faTrashCan}
								className="px-1 py-2 color-can"
							/>
						</a>
					</div>
				</div>
				{comment.gifUrl && (
					<img className="img-animated-gif" src={comment.gifUrl} alt="gif" />
				)}
				{comment.imageUrl && (
					<img
						className="img-animated-gif"
						src={comment.imageUrl}
						alt="image"
					/>
				)}

				<p className="p-change">{comment.content}</p>
			</article>
		</section>
	);
}

export default Comments;
