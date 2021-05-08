import "./ArticleStyle.scss";
import { Link } from "react-router-dom";
import CardContent from "@material-ui/core/CardContent";
import Card from "@material-ui/core/Card";
import React from "react";
import notAvatar from "../../../images/user-astronaut-solid.svg";
import MoreHorizIcon from "@material-ui/icons/MoreHoriz";
import Popover from "@material-ui/core/Popover";
import Typography from "@material-ui/core/Typography";
import EditIcon from "@material-ui/icons/Edit";
import DeleteForeverIcon from "@material-ui/icons/DeleteForever";
import PropTypes from "prop-types";

Article.propTypes = {
	post: PropTypes.shape({
		available: PropTypes.string,
		avatarImg: PropTypes.string,
		date: PropTypes.string,
		description: PropTypes.string,
		nameUser: PropTypes.string,
		postImg: PropTypes.string,
		postId: PropTypes.number,
		userId: PropTypes.number,
	}),
	id: PropTypes.string,
	open: PropTypes.bool,
	anchorEl: PropTypes.object,
	handleClose: PropTypes.func,
	loggeduserId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
	handleClick: PropTypes.func,
};

export default function Article({
	post,
	id,
	open,
	anchorEl,
	handleClose,
	loggeduserId,
	handleClick,
}) {
	return (
		<div className="page-article">
			<h2>This page "Article"</h2>
			<Card className="card">
				<CardContent className="CardContent">
					<div className="post__header">
						<div className="post__header__user">
							{post?.avatarImg ? (
								<img
									src={`http://localhost:3000/images/avatars/${post?.avatarImg}`}
									alt=""
								/>
							) : (
								<img src={notAvatar} alt="" />
							)}
							<p>
								<Link to={`/user/${post?.userId || ""}`}>
									{post?.nameUser || ""}
								</Link>
							</p>
						</div>

						{loggeduserId === post?.userId ? (
							<MoreHorizIcon color="primary" fontSize="large" onClick={handleClick} />
						) : null}

						{loggeduserId === post?.userId ? (
							<Popover
								id={id}
								open={open}
								anchorEl={anchorEl}
								onClose={handleClose}
								anchorOrigin={{
									vertical: "bottom",
									horizontal: "center",
								}}
								transformOrigin={{
									vertical: "top",
									horizontal: "center",
								}}
							>
								<Typography className="popover-settings">
									<Link className="link" to={`/posts/edit/${post?.postId || ""}`}>
										<EditIcon className="icon" />
										Edit
									</Link>
									<Link
										className="link"
										to={`/posts/delete/${post?.postId || ""}`}
									>
										<DeleteForeverIcon className="icon" />
										Delete
									</Link>
								</Typography>
							</Popover>
						) : null}
					</div>

					<div className="post__desc">{post?.description || ""}</div>

					{post?.postImg && (
						<img
							className={"card__img"}
							src={`http://localhost:3000/images/posts/${post?.postImg.toString()}`}
							alt=""
						/>
					)}
				</CardContent>
			</Card>
		</div>
	);
}
