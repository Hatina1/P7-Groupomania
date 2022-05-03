import React from "react";
import { useState, useEffect } from "react";
import moment from "moment";
import AuthService from "../Components/Services/AuthService";
import { useNavigate, Link, useParams } from "react-router-dom";
import ProfileModal from "../Components/Modals/ProfileModal";
import validation from "../Components/Forms/validation";
import SuppProfileModal from "../Components/Modals/SuppProfileModal";

const Profile = () => {
	const currentUser = JSON.parse(localStorage.getItem("user"));
	const [user, setUser] = useState([]);
	const navigate = useNavigate();
	const date = (sqlDate) => {
		var dateCreation = moment(sqlDate).format("DD/MM/YYYY");
		return dateCreation;
	};
	const [boolActive, setBoolActive] = useState({ isActive: true });
	const [deleteUser, setDeleteUser] = useState({});

	// Accounts activation/desactivation and delete by the user
	const onClickHandleActive = async (e) => {
		e.preventDefault();

		if (e.target.id === "activate") {
			user.isActive === true
				? setBoolActive({ isActive: 0 })
				: setBoolActive({ isActive: 1 });
			AuthService.activeUser(currentUser.token, user.id, boolActive);
			if (currentUser.id === user.id) {
				AuthService.logout();
				navigate("/login");
			}
		}
	};

	const onClickHandleDelete = async (e) => {
		e.preventDefault();

		//modal suppression
		setDeleteUser({ isDeleted: 1 });
		console.log(deleteUser, user.id);
		AuthService.deleteUser(currentUser.token, user.id, deleteUser);

		/* if (currentUser.id === user.id) {
				AuthService.logout();
				navigate("/signup");
			}
			
	*/
	};

	const [profileModal, setProfileModal] = useState({});
	const [showProfileModal, setShowProfileModal] = useState(false);
	const handleDisplayProfileModal = (e) => {
		e.preventDefault();
		setShowProfileModal(!showProfileModal);
	};

	const [errors, setErrors] = useState({});

	const submitUpdateProfile = (e) => {
		e.preventDefault();
		setErrors(validation(profileModal));
		const updatedProfile = {};
		updatedProfile.firstname = profileModal["firstname"];
		updatedProfile.lastname = profileModal["lastname"];
		updatedProfile.email = profileModal["email"];
		AuthService.updateUser(currentUser.token, user.id, updatedProfile);
		//setShowProfileModal(!showProfileModal);
		setProfileModal({});
	};
	const handleInputUpdateProfile = (e) => {
		const { name, value } = e.target;
		setProfileModal((prevState) => {
			return {
				...prevState,
				[name]: value,
			};
		});
	};
	const getCurrentValues = (e, user) => {
		console.log(user);
		setProfileModal((prevState) => {
			return {
				...prevState,
				firstname: user.firstname,
			};
		});
		setProfileModal((prevState) => {
			return {
				...prevState,
				lastname: user.lastname,
			};
		});
		setProfileModal((prevState) => {
			return {
				...prevState,
				email: user.email,
			};
		});
	};

	const logOut = () => {
		AuthService.logout();
	};

	let params = useParams();
	const idUser = params.profileId;
	useEffect(() => {
		const getOneUser = async () => {
			const userProfile = await AuthService.getOneUser(
				currentUser.token,
				idUser
			);
			setUser(userProfile[0]);
		};
		getOneUser().catch(console.error);
	}, []);

	useEffect(() => {
		if (showProfileModal) {
			console.log(showProfileModal);
		}
	}, [showProfileModal]);

	useEffect(() => {
		if (user) {
			console.log(user);
		}
	}, [user]);

	const [showSuppProfileModal, setShowSuppProfileModal] = useState(false);
	const handleSuppProfileModal = (e) => {
		e.preventDefault();
		setShowSuppProfileModal(!showSuppProfileModal);
	};

	useEffect(() => {
		if (showSuppProfileModal) {
			console.log(showSuppProfileModal);
		}
	}, [showSuppProfileModal]);

	return (
		<div className="px-2">
			<br />
			<h1 className="my-3 text-white">Détails du compte</h1>

			<div className="row">
				<div className="col-sm-4">
					<div className="card d-flex align-items-center pt-4">
						<div className=" pt-2 text-center align-middle border border-3 border-secondary bg-light rounded-circle picture-change ">
							<span className="text-center fw-bold">
								{String(user.firstname).charAt(0).toUpperCase() +
									String(user.lastname).charAt(0).toUpperCase()}
							</span>
						</div>
						<p className="pt-3 fw-bold">
							{user.firstname} {user.lastname}
						</p>
						<p className="border-bottom border-2 pt-1 pb-3">
							{user.isAdmin ? "Admin" : "Utilisateur"}
						</p>

						{user.isAdmin ? (
							<Link to={"/Admin"} className="nav-link">
								Go to the admin page
							</Link>
						) : null}
						<a
							href="/"
							target="_blank"
							className="link-dark pt-3"
							onClick={(e) => {
								handleDisplayProfileModal(e);
								getCurrentValues(e, user);
							}}
						>
							Modifier le profil
						</a>
						{showProfileModal && (
							<ProfileModal
								handleInputUpdateProfile={handleInputUpdateProfile}
								submitUpdateProfile={submitUpdateProfile}
								handleDisplayProfileModal={handleDisplayProfileModal}
								profileModal={profileModal}
								showProfileModal={showProfileModal}
								errors={errors}
							/>
						)}
						<a
							href="/login"
							target="_blank"
							className="link-dark pt-3 pb-4"
							onClick={logOut}
						>
							Deconnexion
						</a>
					</div>
				</div>

				<div className="col-sm-8 text-white my-2">
					<p className="py-2 d-inline border-bottom border-3">Votre profil</p>
					<article className="border-bottom border-secondary pt-4 py-2 d-flex justify-content-between">
						<p className="font-change">Prénom: </p>
						<p className="">{user.firstname}</p>
					</article>

					<article className="border-bottom border-secondary py-2 d-flex justify-content-between ">
						<p className="font-change">Nom: </p>
						<p className="">{user.lastname}</p>
					</article>

					<article className="border-bottom border-secondary py-2 d-flex justify-content-between">
						<p className="font-change">Addresse Email: </p>
						<p className="">{user.email}</p>
					</article>

					<article className="border-bottom border-secondary py-2 d-flex justify-content-between">
						<p className="font-change">Compte crée le: </p>
						<p className="">{date(user.createdAt)}</p>
					</article>
					<section className="section-responsive">
						{currentUser.isAdmin && user.isActive && (
							<button
								id="activate"
								className="btn btn-sm btn btn-danger btn-change me-3 my-3"
								onClick={onClickHandleActive}
							>
								Désactiver le compte
							</button>
						)}

						{currentUser.isAdmin && !user.isActive && (
							<button
								id="activate"
								className="btn btn-sm btn btn-warning btn-change me-3 my-3"
								onClick={onClickHandleActive}
							>
								Réactiver le compte
							</button>
						)}

						<button
							id="suppression"
							className="btn btn-sm btn btn-danger btn-change me-3 my-3"
							onClick={(e) => {
								handleSuppProfileModal(e);
							}}
						>
							Supprimer le compte
						</button>
					</section>
					{showSuppProfileModal && (
						<SuppProfileModal
							handleSuppProfileModal={handleSuppProfileModal}
							onClickHandleDelete={onClickHandleDelete}
							showSuppProfileModal={showSuppProfileModal}
						/>
					)}
				</div>
			</div>
			<br />
		</div>
	);
};

export default Profile;
