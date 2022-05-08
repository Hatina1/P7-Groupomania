import React from "react";
import "../../styles/bootstrap.min.css";
import "../../styles/headers.css";
import Modal from "react-bootstrap/Modal";

function SuppPostModal({
	post,
	showSuppPostModal,
	handleSuppPostModal,
	deletePost,
}) {
	return (
		<>
			<Modal show={showSuppPostModal}>
				<Modal.Header>
					<Modal.Title>Confirmer la suppression</Modal.Title>
				</Modal.Header>
				<Modal.Body>Souhaitez-vous supprimer ce post ?</Modal.Body>
				<Modal.Footer>
					<button
						className="btn btn-secondary btn-sm me-md-2"
						onClick={(e) => handleSuppPostModal(e, post.id)}
					>
						Cancel
					</button>
					<button
						className={`btn btn-primary btn-sm btn-change`}
						id="updatePost"
						type="submit"
						onClick={(e) => {
							handleSuppPostModal(e, post.id);
							deletePost(e, post.id);
						}}
					>
						Confirmer
					</button>
				</Modal.Footer>
			</Modal>
		</>
	);
}

export default SuppPostModal;
