import React from "react";
import ReactDOM from "react-dom";
import "../styles/bootstrap.min.css";
import "../styles/headers.css";
import moment from "moment";

function Post({ post }) {
	const sqlToJsDate = (sqlDate) => {
		var sqlDateFormat = new Date(sqlDate);
		var jYear = sqlDateFormat.getFullYear();
		var jMonth = sqlDateFormat.getMonth();
		var jDay = sqlDateFormat.getDate();
		var sentDelay = moment([jYear, jMonth, jDay + 1]).fromNow();
		var sentDelayNum = sentDelay.slice(0, 2);
		return sentDelayNum;
	};

	return (
		<div className="card-body-change">
			<div className="card-body-header d-flex justify-content-between">
				<p>
					Posté par {post.firstname} {post.lastname}
				</p>
				<p>il y a {`${sqlToJsDate(post.createdAt)} jours`}</p>
			</div>

			<p className="p-change">{post.content}</p>
		</div>
	);
}

export default Post;
