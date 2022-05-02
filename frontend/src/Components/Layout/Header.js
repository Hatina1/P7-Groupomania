import "../styles/bootstrap.min.css";
import "../styles/headers.css";
import icon from "../assets/icon.png";

function Header() {
	return (
		<div className="container">
			<header className="d-flex flex-wrap align-items-center justify-content-center justify-content-md-between py-3 mb-4 border-bottom border-warning">
				<a
					href="/"
					className="d-flex align-items-center col-md-3 mb-2 mb-md-0 text-dark text-decoration-none"
				>
					<img src={icon} alt="Groupomania" className="gpnia-logo" />
				</a>

				<div className="col-12 col-md-auto mb-2 justify-content-center mb-md-0">
					Groupomania
				</div>

				<div className="col-md-3 text-end">
					<button type="button" className="btn btn-outline-primary me-2">
						Login
					</button>
					<button type="button" className="btn btn-primary">
						Sign-up
					</button>
				</div>
			</header>
		</div>
	);
}

export default Header;
