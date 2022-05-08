import React from "react";
import "../../styles/bootstrap.min.css";
import "../../styles/headers.css";
import Modal from "react-bootstrap/Modal";

function SuppCommentModal({
	post,
	comment,
	showSuppCommentModal,
	handleSuppCommentModal,
	deleteComment,
}) {
	return (
		<>
			<Modal show={showSuppCommentModal}>
				<Modal.Header>
					<Modal.Title>Confirmer la suppression</Modal.Title>
				</Modal.Header>
				<Modal.Body>Souhaitez-vous supprimer ce commentaire ?</Modal.Body>
				<Modal.Footer>
					<button
						className="btn btn-secondary btn-sm me-md-2"
						onClick={(e) => handleSuppCommentModal(e, comment.id)}
					>
						Cancel
					</button>
					<button
						className={`btn btn-primary btn-sm btn-change`}
						id="updatePost"
						type="submit"
						onClick={(e) => {
							handleSuppCommentModal(e, comment.id);
							deleteComment(e, post.id, comment.id);
						}}
					>
						Confirmer
					</button>
				</Modal.Footer>
			</Modal>
		</>
	);
}

export default SuppCommentModal;
