import React from "react";
import "../../styles/bootstrap.min.css";
import "../../styles/headers.css";

function Post({ post }) {
	return (
		<div className="col-sm-2 card align-items-center pt-4 d-none d-sm-flex">
			<div className=" pt-2 text-center align-middle border border-3 border-secondary bg-light  rounded-circle picture-change ">
				<span className="text-center fw-bold">
					{post.firstname.charAt(0).toUpperCase() +
						post.lastname.charAt(0).toUpperCase()}
				</span>
			</div>
			<p className="pt-3 fw-bold text-center">
				{post.firstname} {post.lastname}
			</p>
		</div>
	);
}

export default Post;
