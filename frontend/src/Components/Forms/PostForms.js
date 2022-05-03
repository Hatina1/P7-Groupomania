import React from "react";
import { SubmitCommentButton, SubmitPostButton } from "../Buttons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFaceLaugh } from "@fortawesome/free-solid-svg-icons";
import { faImage } from "@fortawesome/free-solid-svg-icons";

export function NewPostForm({
	enablePostButton,
	changePostButtonStyle,
	handleChangeInputPost,
	handleChangeFilePost,
	submitNewPost,
	selectedFileP,
}) {
	return (
		<form
			className="card bg-light col-8 px-4 py-4 d-flex modal-responsive"
			onSubmit={submitNewPost}
		>
			<div className="form-group row">
				<label htmlFor="newPostTitle" className="col-sm-2 col-form-label">
					Titre de votre post
				</label>
				<div className="col-sm-10">
					<input
						type="text"
						className="form-control form-control-change"
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
						className="form-control form-control-change"
						id="newPostMessage"
						onChange={handleChangeInputPost}
						placeholder="Votre message"
					/>
				</div>
			</div>
			<label>
				<input
					type="file"
					className="hidden"
					name="newPostFile"
					id="newPostFile"
					onChange={handleChangeFilePost}
				/>
				<FontAwesomeIcon icon={faImage} className="px-1 py-2 cursor-change " />
			</label>

			{selectedFileP["newPostFile"] ? selectedFileP["newPostFile"].name : null}

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
	handleChangeFile,
	handleClickDisplayGifs,
	submitNewComment,
}) {
	return (
		<form
			className="d-flex flex-column justify-content-between"
			key={index}
			onSubmit={(e) => submitNewComment(e, index, postId)}
		>
			<textarea
				className="form-control form-control-change"
				type="text"
				name={index}
				id={index}
				onChange={handleChangeInput}
				placeholder="Ecrire un commentaire"
			/>
			<div className="d-flex align-items-center justify-content-evenly div-comment-responsive mt-2">
				<FontAwesomeIcon
					icon={faFaceLaugh}
					className="px-1 py-2"
					onClick={() => handleClickDisplayGifs(postId)}
				/>
				<label>
					<input
						type="file"
						className="hidden"
						name={index}
						id={index}
						onChange={handleChangeFile}
					/>
					<FontAwesomeIcon
						icon={faImage}
						className="px-1 py-2 cursor-change "
					/>
				</label>

				<SubmitCommentButton
					index={index}
					changeCommentButtonStyle={changeCommentButtonStyle}
					enableCommentButton={enableCommentButton}
				/>
			</div>
		</form>
	);
}
