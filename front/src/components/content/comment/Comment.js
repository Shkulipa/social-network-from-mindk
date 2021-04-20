import React, { useCallback, useContext, useState } from "react";
import { Link } from "react-router-dom";
import { Context } from "../../../authStore";
import notAvatar from "../../../images/user-astronaut-solid.svg";
import PropTypes from "prop-types";
import useApi from "../../../hooks/useApi";
import Button from "@material-ui/core/Button";
import EditIcon from "@material-ui/icons/Edit";
import DeleteForeverIcon from "@material-ui/icons/DeleteForever";
import { Form, Formik } from "formik";
import { UiTextarea } from "../../Components-ui/ComponentsUi";
import * as Yup from "yup";
import CancelIcon from "@material-ui/icons/Cancel";
import { useMutation } from "react-query";

Comment.propTypes = {
	avatarImg: PropTypes.string,
	comment: PropTypes.string,
	date: PropTypes.string,
	nameUser: PropTypes.string,
	userId: PropTypes.number,
	commentId: PropTypes.number,
	refetch: PropTypes.func,
	deleteComment: PropTypes.func,
};

export default function Comment({
	avatarImg,
	comment,
	date,
	nameUser,
	userId,
	commentId,
	deleteComment,
}) {
	const { callApiLogged } = useApi();

	// login user
	const user = useContext(Context);

	//edit
	const [editMode, setEditMode] = useState(false);

	const SignupSchema = Yup.object().shape({
		comment: Yup.string().test(
			"len",
			"Must be max 255 characters",
			(val) => val && val.toString().length < 255
		),
	});

	const mutationCommentUpdate = useMutation(callApiLogged);
	const onSubmitEdit = useCallback(
		async (items) => {
			try {
				await mutationCommentUpdate.mutate({
					url: `/comments/update/${commentId}`,
					method: "PUT",
					data: {
						...items,
						commentId: commentId,
						userId: userId,
						user: {
							userToken: user[0].user.userToken,
							permission: user[0].user.permission,
						},
					},
				});
				setEditMode(false);
			} catch (e) {
				console.log(e);
			}
		},
		[mutationCommentUpdate]
	);

	//delete
	const mutationCommentDelete = useMutation(callApiLogged);
	const onSubmitDelete = useCallback(async () => {
		try {
			await mutationCommentDelete.mutate({
				url: `/comments/delete/${commentId}`,
				method: "DELETE",
				data: {
					commentId: commentId,
					userId: userId,
					user: {
						userToken: user[0].user.userToken,
						permission: user[0].user.permission,
					},
				},
			});
			deleteComment(commentId);
		} catch (e) {
			console.log(e);
		}
	}, [mutationCommentDelete]);

	return (
		<>
			{editMode === false ? (
				<div className="comment-block">
					<img
						src={
							avatarImg
								? `http://localhost:3000/images/avatars/${avatarImg}`
								: notAvatar
						}
						alt="avatar"
					/>
					<div className="comment-block__item">
						<div className="comment-block__item__content">
							<Link
								className="comment-block__item__content__name"
								to={`/user/${userId}`}
							>
								{nameUser}
							</Link>
							<div className="comment-block__item__content__comment">{comment}</div>
							<div className="comment-block__item__content__date">{date}</div>
						</div>

						{/*Btns edit/delete*/}
						{editMode === false && user[0].user && user[0].user.userId === userId ? (
							<div className="comment-block__item__btns">
								<Button
									className="comment-block__item__btns__btn"
									variant="contained"
									color="primary"
									size="large"
									onClick={() => setEditMode(true)}
								>
									<EditIcon className="icon" />
									Edit
								</Button>
								<Button
									className="comment-block__item__btns__btn"
									variant="contained"
									color="secondary"
									size="large"
									onClick={onSubmitDelete}
								>
									<DeleteForeverIcon className="icon" />
									Delete
								</Button>
							</div>
						) : null}
					</div>
				</div>
			) : null}

			{/*edit Mode*/}
			{editMode === true ? (
				<Formik
					initialValues={{
						comment: comment || "",
					}}
					enableReinitialize={true}
					validationSchema={SignupSchema}
					onSubmit={onSubmitEdit}
				>
					{({ errors, touched }) => (
						<Form>
							<div className="comment-block">
								<img
									src={
										avatarImg
											? `http://localhost:3000/images/avatars/${avatarImg}`
											: notAvatar
									}
									alt="avatar"
								/>
								<div className="comment-block__item">
									<div className="comment-block__item__content">
										<Link
											className="comment-block__item__content__name"
											to={`/user/${userId}`}
										>
											{nameUser}
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
											<div className="Error">{errors.comment}</div>
										) : null}
									</div>

									<div className="comment-block__item__btns">
										<Button
											className="comment-block__item__btns__btn"
											variant="contained"
											color="primary"
											size="large"
											type="submit"
										>
											<EditIcon className="icon" />
											Edit
										</Button>
										<Button
											className="comment-block__item__btns__btn"
											variant="contained"
											color="secondary"
											size="large"
											onClick={() => setEditMode(false)}
										>
											<CancelIcon className="icon" />
											Cancel
										</Button>
									</div>
								</div>
							</div>
						</Form>
					)}
				</Formik>
			) : null}
		</>
	);
}
