import React from "react";
import "../styles/bootstrap.min.css";
import "../styles/headers.css";
import ReactDOM from "react-dom";

{
	/* <a
			target="_blank"
			href="/"
			className="text-decoration-none lh-1"
			onClick={handleSelectGif}
		>
			<img
				key={"gif-" + gif.id}
				alt="gif"
				name={index}
				className="img-animated-gif flex-nowrap"
				src={gif.images.downsized.url}
			/>
		</a> */
}

function Gifs({ postId, gif, index, handleSelectGif }) {
	return (
		<a
			target="_blank"
			href="/"
			className="text-decoration-none lh-1"
			onClick={(e) => handleSelectGif(e, postId)}
		>
			<img
				key={"gif-" + index}
				alt="gif"
				name={index}
				className="img-animated-gif flex-nowrap"
				src={gif.images.downsized.url}
			/>
		</a>
	);
}

export default Gifs;
