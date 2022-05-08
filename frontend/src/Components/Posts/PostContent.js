import React from "react";
import "../../styles/bootstrap.min.css";
import "../../styles/headers.css";

function PostContent({ post }) {
	const sqlToJsDate = (sqlDate) => {
		var sqlDateFormat = new Date(sqlDate);
		var date = new Intl.DateTimeFormat().format(sqlDateFormat);
		return date;
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
					{sqlToJsDate(post.createdAt)}
				</p>
			</div>
			{post.imageUrl ? (
				<a href={post.imageUrl} className="text-decoration-none">
					<img className="img-animated" src={post.imageUrl} alt="random" />
				</a>
			) : null}

			<p className="p-change my-4">{post.content}</p>
		</div>
	);
}

export default PostContent;
