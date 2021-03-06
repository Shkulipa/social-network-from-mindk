import "./ArticlesListStyle.scss";
import React, { useCallback, useContext, useEffect, useState } from "react";
import CardContent from "@material-ui/core/CardContent";
import Tooltip from "@material-ui/core/Tooltip";
import Typography from "@material-ui/core/Typography";
import { Link } from "react-router-dom";
import MoreHorizIcon from "@material-ui/icons/MoreHoriz";
import Card from "@material-ui/core/Card";
import { Context } from "../../../authStore";
import Popover from "@material-ui/core/Popover";
import EditIcon from "@material-ui/icons/Edit";
import DeleteForeverIcon from "@material-ui/icons/DeleteForever";
import Button from "@material-ui/core/Button";
import { useMutation, useQuery, useQueryClient } from "react-query";
import Modal from "@material-ui/core/Modal";
import notAvatar from "../../../images/user-astronaut-solid.svg";
import PropTypes from "prop-types";
import useApi from "../../../hooks/useApi";
import Accordion from "@material-ui/core/Accordion";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import Loader from "react-loader-spinner";
import Comment from "../comment/Comment";
import { Form, Formik } from "formik";
import * as Yup from "yup";
import { UiTextarea } from "../../Components-ui/ComponentsUi";

SubComponentArticle.propTypes = {
	available: PropTypes.string,
	avatarImg: PropTypes.string,
	date: PropTypes.string,
	nameUser: PropTypes.string,
	postId: PropTypes.number,
	description: PropTypes.string,
	postImg: PropTypes.string,
	userId: PropTypes.number,
};

export default function SubComponentArticle({
	available,
	avatarImg,
	date,
	nameUser,
	postId,
	description,
	postImg,
	userId,
}) {
	const { callApiLogged, callApiNotLogged } = useApi();

	// login user
	const { user } = useContext(Context)[0];

	// popover menu article
	const [menuArticle, setMenuArticle] = useState(null);

	const handleClickMenuArticle = (event) => {
		setMenuArticle(event.currentTarget);
	};

	const handleCloseMenuArticle = () => {
		setMenuArticle(null);
	};

	const openMenuArticle = Boolean(menuArticle);
	const idMenuArticle = openMenuArticle ? "simple-popover" : undefined;

	// delete Post
	const mutation = useMutation(callApiLogged);
	const funcDeletePost = useCallback(() => {
		try {
			mutation.mutate({
				url: `/posts/delete/${postId}`,
				method: "DELETE",
				data: { postId, user },
			});
			handleClickModalAnswer();
		} catch (e) {
			console.log(e);
		}
	}, [mutation]);

	// answer from server after delete post
	const [modalAnswer, setModalAnswer] = useState(false);

	const handleClickModalAnswer = () => {
		setModalAnswer(true);
	};

	const handleCloseModalAnswer = () => {
		setModalAnswer(false);
		window.location.reload();
	};

	//comments
	const queryClient = useQueryClient();
	const [pageComments, setPageComments] = useState(1);
	const [comments, setComments] = useState([]);
	const [countComments, setCountComment] = useState(0);

	async function fetchComments(pageComments = 1) {
		const data = await callApiNotLogged(
			`/comments?postId=${postId}&page=${pageComments}&limit=5`
		);
		setCountComment(Number(data.count));
		setComments([...comments, data.data]);
	}

	const { data, isFetching, refetch } = useQuery(
		[`comments ${postId}`, pageComments],
		() => fetchComments(pageComments),
		{
			staleTime: Infinity,
		}
	);

	useEffect(() => {
		refetch();
	}, [data, pageComments, queryClient]);

	const countPageComments = () => {
		let countComments = 0;
		comments.forEach((el) => (countComments += el.length));
		return countComments;
	};

	//WebSocket: Add and Del comments
	const SignupSchema = Yup.object().shape({
		comment: Yup.string().test(
			"len",
			"Must be max 255 characters",
			(val) => val && val.toString().length < 255
		),
	});

	const [ws, setWs] = useState(null);
	const [refresh, setRefresh] = useState(null);

	const findObjInCommentArr = (id) => {
		for (let i = 0; i < comments.length; i++) {
			const findIndex = comments[i].findIndex((el) => el.commentId === id);

			if (findIndex !== -1) {
				return {
					commentNumberArr: i,
					indexInThisArr: findIndex,
				};
			}
		}
	};

	useEffect(() => {
		const socket = new WebSocket("ws://localhost:5000");

		socket.onopen = () => {
			console.log("Socket connected");
		};

		socket.onmessage = (event) => {
			const message = JSON.parse(event.data);
			if (message.event === "newMess") {
				if (postId === message.data[0].postId) {
					setComments([message.data, ...comments]);
				}
			} else if (message.event === "delMess") {
				if (postId === message.data.postId) {
					const indexs = findObjInCommentArr(message.data.commentId);
					if (indexs) {
						const { commentNumberArr, indexInThisArr } = indexs;
						setComments([
							...comments.slice(0, commentNumberArr),
							[
								...comments[commentNumberArr].slice(0, indexInThisArr),
								...comments[commentNumberArr].slice(indexInThisArr + 1),
							],
							...comments.slice(commentNumberArr + 1),
						]);
					}
				}
			} else if (message.event === "accessDenied") {
				console.log(`Access denied`);
			} else {
				console.log(`${message.event} doesn't exist`);
			}
		};

		socket.onclose = () => {
			console.log("Socket close");
			setTimeout(() => {
				setRefresh((r) => !r);
			}, 2000);
		};

		socket.onerror = (e) => {
			console.log("Socket error", e);
		};

		setWs(socket);
	}, [comments, refresh]);

	const onSubmitComment = async (items, { resetForm }) => {
		try {
			const message = {
				event: "message",
				id: user.userToken,
				data: {
					...items,
					userId: user.userId,
					postId: postId,
					user: {
						userToken: user.userToken,
						permission: user.permission,
					},
				},
			};

			ws.send(JSON.stringify(message));
			resetForm({});
		} catch (e) {
			console.log(e);
		}
	};

	const deleteComment = async (id) => {
		try {
			const message = {
				event: "deleteComm",
				id: user.userToken,
				data: {
					commentId: id,
					userId: user.userId,
					postId: postId,
					user: {
						userToken: user.userToken,
						permission: user.permission,
					},
				},
			};

			ws.send(JSON.stringify(message));
		} catch (e) {
			console.log(e);
		}
	};

	return (
		<>
			{/* modal update in finally*/}
			{(user && user.userId === userId && user.permission.includes("deleteOwnPost")) ||
			(user && user.permission.includes("deleteAnyPost")) ? (
				<Modal
					className="modal-deleted"
					open={modalAnswer}
					aria-labelledby="simple-modal-title"
					aria-describedby="simple-modal-description"
				>
					<div className="modal-deleted-paper">
						<span className="cl-green">Your post deleted!</span>
						<span>Refresh your page</span>
						<br />
						<Button
							variant="contained"
							color="secondary"
							size="large"
							onClick={handleCloseModalAnswer}
						>
							Refresh
						</Button>
					</div>
				</Modal>
			) : null}

			{/* info card*/}
			<Card className="card" key={postId}>
				<CardContent className="card__content">
					{/* info user*/}
					<div className="post__user">
						{avatarImg ? (
							<img
								className="post__user__avatar"
								/* eslint-disable-next-line max-len */
								src={`http://localhost:3000/images/avatars/${avatarImg}`}
								alt=""
							/>
						) : (
							<img className="post__user__avatar" src={notAvatar} alt="" />
						)}
						<Tooltip placement="bottom-start" title="View author profile">
							<Link className="link" to={`/user/${userId}`}>
								{nameUser}
							</Link>
						</Tooltip>
					</div>

					{/* 3 dots*/}
					{(user &&
						user.userId === userId &&
						user.permission.includes("updateOwnPost")) ||
					(user && user.permission.includes("updateAnyPost")) ? (
						<Tooltip placement="bottom" title="Settings">
							<MoreHorizIcon
								color="primary"
								fontSize="large"
								onClick={handleClickMenuArticle}
							/>
						</Tooltip>
					) : null}

					{/* popover settings*/}
					{(user &&
						user.userId === userId &&
						user.permission.includes("updateOwnPost")) ||
					(user && user.permission.includes("updateAnyPost")) ? (
						<Popover
							id={idMenuArticle}
							open={openMenuArticle}
							anchorEl={menuArticle}
							onClose={handleCloseMenuArticle}
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
								<Link className="link" to={`/posts/edit/${postId}`}>
									<Button variant="contained" color="primary">
										<EditIcon className="icon" />
										Edit
									</Button>
								</Link>
								<Button
									onClick={funcDeletePost}
									variant="contained"
									color="secondary"
								>
									<DeleteForeverIcon className="icon" />
									Delete
								</Button>
							</Typography>
						</Popover>
					) : null}
				</CardContent>

				{/* date & available*/}
				<CardContent className="card__content__date-available">
					<Typography variant="subtitle2" gutterBottom>
						Date: <b>{date}</b>
					</Typography>
					<Typography variant="subtitle2" gutterBottom>
						Available: <b>{available ? available : "All"}</b>
					</Typography>
				</CardContent>

				{/* description post*/}
				<CardContent className="card__content">
					<Tooltip placement="bottom-start" title="View post">
						<Typography
							gutterBottom
							variant="h5"
							component="h2"
							className="post-content"
						>
							<Link to={`/posts/${postId}`}>
								{description.length > 25
									? description.slice(0, 25) + "..."
									: description}
							</Link>
						</Typography>
					</Tooltip>
				</CardContent>

				{/* img post*/}
				{postImg && (
					<img
						className={"card__img"}
						/* eslint-disable-next-line max-len */
						src={`http://localhost:3000/images/posts/${postImg.toString()}`}
						alt=""
					/>
				)}

				{/* Add comment */}
				<Accordion>
					<AccordionSummary
						expandIcon={<ExpandMoreIcon />}
						aria-controls="panel1a-content"
						id="panel1a-header"
					>
						<Typography>Comments: {countComments}</Typography>
					</AccordionSummary>
					<AccordionDetails>
						<div className="accordion-typography">
							{user && (
								<Formik
									initialValues={{
										comment: "",
									}}
									enableReinitialize={true}
									validationSchema={SignupSchema}
									onSubmit={onSubmitComment}
								>
									{({ errors, touched }) => (
										<Form>
											<div className="comment-block">
												<img
													src={
														user.avatarImg
															? `http://localhost:3000/images/avatars/${user.avatarImg}`
															: notAvatar
													}
													alt="avatar"
												/>
												<div className="comment-block__item">
													<div className="comment-block__item__content">
														<Link
															className="comment-block__item__content__name"
															to={`/user/${user.userId}`}
														>
															{user.nameUser}
														</Link>
														<UiTextarea
															className="comment-block__item__content__comment"
															id="comment"
															name="comment"
															label="Your comment..."
															multiline
															placeholder="Your comment..."
															rowsMax={15}
														/>
														{errors.comment && touched.comment ? (
															<div className="Error">
																{errors.comment}
															</div>
														) : null}
													</div>

													{/*Btns for edit/delete*/}
													{user.userId === userId ? (
														<div className="comment-block__item__btns">
															<Button
																className="comment-block__item__btns__btn"
																variant="contained"
																color="primary"
																size="large"
																type="submit"
															>
																<EditIcon className="icon" />
																Add comment
															</Button>
														</div>
													) : null}
												</div>
											</div>
										</Form>
									)}
								</Formik>
							)}

							{comments.map((el) =>
								el.map((el2) => (
									<Comment
										key={el2.commentId}
										date={el2.date}
										comment={el2.comment}
										userId={el2.userId}
										nameUser={el2.nameUser}
										avatarImg={el2.avatarImg}
										commentId={el2.commentId}
										refetch={refetch}
										deleteComment={deleteComment}
									/>
								))
							)}

							{isFetching && (
								<div className="loader">
									<Loader
										type="ThreeDots"
										color="#00BFFF"
										height={100}
										width={100}
									/>
								</div>
							)}

							<Button
								size="large"
								variant="contained"
								color="primary"
								className="btn-load-more"
								onClick={() => {
									setPageComments(pageComments + 1);
								}}
								disabled={countComments === countPageComments()}
							>
								Load more...
							</Button>
						</div>
					</AccordionDetails>
				</Accordion>
			</Card>
		</>
	);
}
