import React from "react";
import ReactDOM from "react-dom";
import "../../styles/bootstrap.min.css";
import "../../styles/headers.css";
import Modal from "react-bootstrap/Modal";

function ProfileModal({
	handleInputUpdateProfile,
	submitUpdateProfile,
	handleDisplayProfileModal,
	profileModal,
	showProfileModal,
	errors,
}) {
	return (
		<>
			<Modal show={showProfileModal} onHide={handleDisplayProfileModal}>
				<Modal.Header>
					<Modal.Title>Modifier le compte</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					<form className="signupForm" onSubmit={submitUpdateProfile}>
						<div className="form-outline mb-4">
							<label className="form-label"> Firstname </label>
							<input
								className="form-control form-control-lg"
								type="text"
								name="firstname"
								value={profileModal.firstname}
								onChange={handleInputUpdateProfile}
							/>
							{errors.firstname && <p className="error">{errors.firstname} </p>}
						</div>
						<div className="form-outline mb-4">
							<label className="form-label"> Lastname </label>
							<input
								className="form-control form-control-lg"
								type="text"
								name="lastname"
								value={profileModal.lastname}
								onChange={handleInputUpdateProfile}
							/>
							{errors.lastname && <p className="error">{errors.lastname} </p>}
						</div>
						<div className="form-outline mb-4">
							<label className="form-label"> Email </label>
							<input
								className="form-control form-control-lg"
								type="email"
								name="email"
								value={profileModal.email}
								onChange={handleInputUpdateProfile}
							/>
							{errors.email && <p className="error">{errors.email} </p>}
						</div>
					</form>
				</Modal.Body>
				<Modal.Footer>
					<button
						className="btn btn-secondary btn-sm me-md-2"
						onClick={(e) => handleDisplayProfileModal(e)}
					>
						Cancel
					</button>
					<button
						className={`btn btn-primary btn-sm btn-change`}
						id="newPost"
						type="submit"
					>
						Modifier
					</button>
				</Modal.Footer>
			</Modal>
		</>
	);
}

export default ProfileModal;
