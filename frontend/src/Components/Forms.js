import React from "react";
import { SubmitCommentButton, SubmitPostButton } from "../Components/Buttons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFaceLaugh } from "@fortawesome/free-solid-svg-icons";
import { faImage } from "@fortawesome/free-solid-svg-icons";

export function NewPostForm({
	enablePostButton,
	changePostButtonStyle,
	handleChangeInputPost,
	handleChangeFilePost,
	submitNewPost,
}) {
	return (
		<form
			className="card bg-light col-8 px-4 py-4 d-flex"
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
			<div className="form-group">
				<label htmlFor="newPostFile">
					<FontAwesomeIcon icon={faImage} className="px-1 py-2" />
				</label>
				<input
					type="file"
					className=""
					name="newPostFile"
					id="newPostFile"
					onChange={handleChangeFilePost}
				/>
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
	handleChangeFile,
	handleClickDisplayGifs,
	submitNewComment,
}) {
	return (
		<form
			className="d-flex justify-content-between"
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
			<div className="form-group">
				<label htmlFor={index}>
					<FontAwesomeIcon icon={faImage} className="px-1 py-2" />
				</label>
				<input
					type="file"
					className=""
					name={index}
					id={index}
					onChange={handleChangeFile}
				/>
			</div>
			<SubmitCommentButton
				index={index}
				changeCommentButtonStyle={changeCommentButtonStyle}
				enableCommentButton={enableCommentButton}
			/>
		</form>
	);
}
