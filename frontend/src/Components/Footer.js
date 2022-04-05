import "../styles/bootstrap.min.css";
import "../styles/footers.css";
import icon from "../assets/icon.png";

function Footer() {
	return (
		<div className="container">
			<footer className="d-flex flex-wrap justify-content-between align-items-center py-3 my-4 border-top">
				<div className="col-md-4 d-flex align-items-center">
					<a
						href="/"
						className="mb-3 me-2 mb-md-0 text-muted text-decoration-none lh-1"
					>
						<img src={icon} alt="Groupomania" className="gpnia-logo" />
					</a>
					<span className="text-muted">2021 Groupomania</span>
				</div>

				<ul className="nav col-md-4 justify-content-end list-unstyled d-flex">
					<li className="ms-3">T</li>
					<li className="ms-3">I</li>
					<li className="ms-3">F</li>
				</ul>
			</footer>
		</div>
	);
}

export default Footer;
