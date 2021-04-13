import Article from "./Article";
import React, { useContext } from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "react-query";
import { Context } from "../../../authStore";
import useApi from "../../../hooks/useApi";

function ArticleContainer() {
	const { callApiNotLogged } = useApi();

	// login user
	const { user } = useContext(Context)[0];

	// data post
	const { postId } = useParams();

	const { data } = useQuery("posts", () => callApiNotLogged(`/posts/${postId}`));

	// popover settings
	const [anchorEl, setAnchorEl] = React.useState(null);

	const handleClick = (event) => {
		setAnchorEl(event.currentTarget);
	};

	const handleClose = () => {
		setAnchorEl(null);
	};

	const open = Boolean(anchorEl);
	const id = open ? "simple-popover" : undefined;

	return (
		<Article
			post={data || {}}
			handleClose={handleClose}
			handleClick={handleClick}
			id={id}
			loggeduserId={user ? user.userId : ""}
			open={open}
			anchorEl={anchorEl}
		/>
	);
}

export default ArticleContainer;
