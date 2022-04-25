import React from "react";
import {
	ShowPostFormButton,
	ClosePostFormButton,
	SubmitCommentButton,
	SubmitPostButton,
} from "../Components/Buttons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFaceLaugh } from "@fortawesome/free-solid-svg-icons";

export function NewPostForm({
	enablePostButton,
	changePostButtonStyle,
	handleChangeInputPost,
	submitNewPost,
}) {
	return (
		<form className="card px-4 py-4" onSubmit={submitNewPost}>
			<div className="form-group row">
				<label htmlFor="newPostTitle" className="col-sm-2 col-form-label">
					Titre de votre post
				</label>
				<div className="col-sm-10">
					<input
						type="text"
						className="form-control"
						id="newPostTitle"
						onChange={handleChangeInputPost}
						placeholder="Titre de votre post"
					/>
				</div>
			</div>
			<div className="form-group row">
				<label htmlFor="newPostMessage" className="col-sm-2 col-form-label">
					Votre message
				</label>
				<div className="col-sm-10">
					<textarea
						type="text"
						className="form-control"
						id="newPostMessage"
						onChange={handleChangeInputPost}
						placeholder="Votre message"
					/>
				</div>
			</div>

			<SubmitPostButton
				enablePostButton={enablePostButton}
				changePostButtonStyle={changePostButtonStyle}
			/>
		</form>
	);
}

export function NewCommentForm({
	postId,
	index,
	enableCommentButton,
	changeCommentButtonStyle,
	handleChangeInput,
	handleClickDisplayGifs,
	submitNewComment,
}) {
	return (
		<form
			className="d-flex"
			key={index}
			onSubmit={(e) => submitNewComment(e, index, postId)}
		>
			<input
				className="form-control form-control-change"
				type="text"
				name={index}
				id={index}
				onChange={handleChangeInput}
				placeholder="Ecrire un commentaire"
			/>

			<FontAwesomeIcon
				icon={faFaceLaugh}
				className="px-1 py-2"
				onClick={() => handleClickDisplayGifs(postId)}
			/>

			<SubmitCommentButton
				index={index}
				changeCommentButtonStyle={changeCommentButtonStyle}
				enableCommentButton={enableCommentButton}
			/>
		</form>
	);
}
