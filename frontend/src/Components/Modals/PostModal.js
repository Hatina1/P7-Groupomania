import React from "react";
import "../../styles/bootstrap.min.css";
import "../../styles/headers.css";
import Modal from "react-bootstrap/Modal";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faImage } from "@fortawesome/free-solid-svg-icons";

function PostModal({
	post,
	showPostModal,
	handleInputUpdatePost,
	handleFileUpdatePost,
	submitUpdatePost,
	handleDisplayPostModal,
	postModal,
}) {
	//onClick={(e) => handleDisplayPostModal(e, post.id)}
	//onHide={(e) => handleDisplayPostModal(e, post.id)}
	// onSubmit={(e) => submitUpdatePost(e, post.id)}
	return (
		<>
			<Modal show={showPostModal}>
				<Modal.Header>
					<Modal.Title>Modifier le message</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					<form className="card px-4 py-4 modal-responsive">
						<div className="form-group row">
							<label htmlFor="updateTitle" className="col-sm-4 col-form-label">
								Titre de votre post
							</label>
							<div className="col-sm-8">
								<input
									type="text"
									className="form-control"
									id="updatedTitle"
									onChange={handleInputUpdatePost}
									value={postModal.updatedTitle}
								/>
							</div>
						</div>
						<div className="form-group row">
							<label
								htmlFor="updateMessage"
								className="col-sm-4 col-form-label"
							>
								Votre message
							</label>
							<div className="col-sm-8">
								<textarea
									type="text"
									className="form-control"
									id="updatedMessage"
									onChange={handleInputUpdatePost}
									value={postModal.updatedMessage}
								/>
							</div>
							<label>
								<input
									type="file"
									className="hidden"
									name="updatedFile"
									id="updatedFile"
									onChange={handleFileUpdatePost}
								/>
								<FontAwesomeIcon
									icon={faImage}
									className="px-1 py-2 cursor-change "
								/>
							</label>
						</div>
					</form>
				</Modal.Body>
				<Modal.Footer>
					<button
						className="btn btn-secondary btn-sm me-md-2"
						onClick={(e) => handleDisplayPostModal(e, post.id)}
					>
						Cancel
					</button>
					<button
						className={`btn btn-primary btn-sm btn-change button-responsive`}
						id="updatePost"
						type="submit"
						onClick={(e) => {
							handleDisplayPostModal(e, post.id);
							submitUpdatePost(e, post.id);
						}}
					>
						Modifier le post
					</button>
				</Modal.Footer>
			</Modal>
		</>
	);
}

export default PostModal;
