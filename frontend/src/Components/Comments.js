import React from "react";
import ReactDOM from "react-dom";
import "../styles/bootstrap.min.css";
import "../styles/headers.css";
import moment from "moment";

function Comments({ comment }) {
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
					<p>il y a {sqlToJsDate(comment.createdAt)}</p>
				</div>

				{comment.imageUrl && (
					<img
						className="img-animated-gif flex-nowrap"
						src={comment.imageUrl}
						alt="gif"
					/>
				)}

				<p className="p-change">{comment.content}</p>
			</article>
		</section>
	);
}

export default Comments;
