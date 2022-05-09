import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPaperPlane } from "@fortawesome/free-solid-svg-icons";

export function ShowPostFormButton({ handleShowPostForm, msgToShow }) {
	return (
		<div className="d-grid gap-2 col-3 mx-auto button-responsive">
			<button
				type="button"
				className="btn btn-primary rounded-pill "
				onClick={handleShowPostForm}
			>
				{msgToShow}
			</button>
		</div>
	);
}

export function ClosePostFormButton({ handleShowPostForm, msgToShow }) {
	return (
		<div className="mt-2">
			<button
				type="button"
				className="btn btn-secondary me-md-2"
				onClick={handleShowPostForm}
			>
				{msgToShow}
			</button>
		</div>
	);
}

export function SubmitPostButton({ enablePostButton, changePostButtonStyle }) {
	return (
		<button
			className={`btn btn-primary btn-lg btn-change col-3 align-self-center button-responsive ${changePostButtonStyle(
				"newPostTitle",
				"newPostMessage"
			)}`}
			id="newPost"
			disabled={enablePostButton("newPostTitle", "newPostMessage")}
			type="submit"
		>
			Créer un post
		</button>
	);
}

export function SubmitCommentButton({
	index,
	enableCommentButton,
	changeCommentButtonStyle,
}) {
	return (
		<button
			className={`btn btn-primary btn-sm btn-change ${changeCommentButtonStyle(
				index
			)} ms-3`}
			id={index}
			disabled={enableCommentButton(index)}
			type="submit"
		>
			<FontAwesomeIcon icon={faPaperPlane} className="px-1 py-2 icon-send" />{" "}
		</button>
	);
}
