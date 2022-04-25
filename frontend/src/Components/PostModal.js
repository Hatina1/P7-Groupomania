import React from "react";
import ReactDOM from "react-dom";
import "../styles/bootstrap.min.css";
import "../styles/headers.css";
import Modal from "react-bootstrap/Modal";

function PostModal({
	post,
	handleInputUpdatePost,
	submitUpdatePost,
	handleDisplayPostModal,
	postModal,
	showPostModal,
}) {
	/* 	
		<button
							className={`btn btn-primary btn-sm btn-change`}
							id="newPost"
							type="submit"
						>
							Modifier le post
						</button>
						
	<div className="d-grid gap-2 d-md-flex justify-content-md-end mt-2">
				<button
					type="button"
					className="btn btn-secondary me-md-2"
					onClick={(e) => handleDisplayPostModal(e, post.id)}
				>
					Fermer
				</button>
		</div> 
						

	

						*/

	return (
		<>
			<Modal show={showPostModal} onHide={handleDisplayPostModal}>
				<Modal.Header>
					<Modal.Title>Modifier le message</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					<form className="card px-4 py-4" onSubmit={submitUpdatePost}>
						<div className="form-group row">
							<label htmlFor="newPostTitle" className="col-sm-4 col-form-label">
								Titre de votre post
							</label>
							<div className="col-sm-8">
								<input
									type="text"
									className="form-control"
									id="updateTitle"
									onChange={handleInputUpdatePost}
									value={postModal.updateTitle}
								/>
							</div>
						</div>
						<div className="form-group row">
							<label
								htmlFor="newPostMessage"
								className="col-sm-4 col-form-label"
							>
								Votre message
							</label>
							<div className="col-sm-8">
								<textarea
									type="text"
									className="form-control"
									id="updateMessage"
									onChange={handleInputUpdatePost}
									value={postModal.updateMessage}
								/>
							</div>
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
						className={`btn btn-primary btn-sm btn-change`}
						id="newPost"
						type="submit"
					>
						Modifier le post
					</button>
				</Modal.Footer>
			</Modal>
		</>
	);
}

export default PostModal;
