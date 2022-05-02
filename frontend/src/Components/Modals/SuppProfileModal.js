import React from "react";
import ReactDOM from "react-dom";
import "../../styles/bootstrap.min.css";
import "../../styles/headers.css";
import Modal from "react-bootstrap/Modal";

function SuppProfileModal({
	showSuppProfileModal,
	handleSuppProfileModal,
	onClickHandleDelete,
}) {
	return (
		<>
			<Modal show={showSuppProfileModal}>
				<Modal.Header>
					<Modal.Title>Confirmer la suppression</Modal.Title>
				</Modal.Header>
				<Modal.Body>Souhaitez-vous supprimer ce profil ?</Modal.Body>
				<Modal.Footer>
					<button
						className="btn btn-secondary btn-sm me-md-2"
						onClick={(e) => handleSuppProfileModal(e)}
					>
						Cancel
					</button>
					<button
						className={`btn btn-primary btn-sm btn-change`}
						id="updateProfile"
						type="submit"
						onClick={(e) => {
							handleSuppProfileModal(e);
							onClickHandleDelete(e);
						}}
					>
						Confirmer
					</button>
				</Modal.Footer>
			</Modal>
		</>
	);
}

export default SuppProfileModal;
