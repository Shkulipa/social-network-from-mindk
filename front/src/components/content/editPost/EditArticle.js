import "./EditArticleStyle.scss";
import { Form, Formik } from "formik";
import React from "react";
import * as Yup from "yup";
import { Link, useParams } from "react-router-dom";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import { UiSelect, UiTextarea } from "../../Components-ui/ComponentsUi";
import CardActions from "@material-ui/core/CardActions";
import Button from "@material-ui/core/Button";
import Cropper from "react-cropper";
import PropTypes from "prop-types";

EditArticle.propTypes = {
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
	onEditSubmit: PropTypes.func,
	resRequestUpdate: PropTypes.array,
	uploadImage: PropTypes.func,
	setCropFunc: PropTypes.func,
	setCroppedImgFunc: PropTypes.func,
	crroperedImg: PropTypes.string,
	visionBtnUploadImg: PropTypes.bool,
	errorImg: PropTypes.bool,
	visionPrevImg: PropTypes.bool,
};

export default function EditArticle({
	post,
	onEditSubmit,
	resRequestUpdate,
	uploadImage,
	image,
	setCropFunc,
	setCroppedImgFunc,
	crroperedImg,
	visionBtnUploadImg,
	errorImg,
	visionPrevImg,
}) {
	const { postId } = useParams();

	const SignupSchema = Yup.object().shape({
		description: Yup.string()
			.required("required filed")
			.test(
				"len",
				"Must be max 2555 characters",
				(val) => val && val.toString().length < 2555
			),
	});

	return (
		<div className="EditArticle">
			<h2 className="title">Edit Article</h2>

			{resRequestUpdate &&
				resRequestUpdate.map((el) => {
					for (let key in el) {
						if (key === "success") {
							return (
								<p key={el[key]} className="answer success">
									{el[key]}
								</p>
							);
						} else {
							return (
								<p key={el[key]} className="answer error">
									{el[key]}
								</p>
							);
						}
					}
				})}

			<Formik
				initialValues={{
					description: post?.description || "",
					available: post?.available || "All",
				}}
				enableReinitialize={true}
				validationSchema={SignupSchema}
				onSubmit={onEditSubmit}
			>
				{({ errors, touched }) => (
					<Form>
						<Card className="card">
							<CardContent className="card__items">
								<div className="field">
									<UiSelect
										labelId="available-label"
										id="available"
										label="Available"
										name="available"
										className="field"
										selectValues={[
											{ val: "All", text: "All" },
											{ val: "Friends", text: "Friends" },
											{ val: "Only Me", text: "Only Me" },
										]}
									/>
								</div>
								<div className="field">
									<UiTextarea
										id="description"
										name="description"
										label="Description*"
										multiline
										variant="outlined"
										placeholder="Your text..."
										rowsMax={15}
									/>
								</div>
								{errors.description && touched.description ? (
									<div className="Error">{errors.description}</div>
								) : null}
							</CardContent>

							{post?.postImg && visionPrevImg && (
								<img
									className={"card__img"}
									src={`http://localhost:3000/images/posts/${post?.postImg.toString()}`}
									alt=""
								/>
							)}

							{visionBtnUploadImg && (
								<div className="btn-upload-img">
									<Button variant="contained" color="primary" component="label">
										Change Image
										<input onChange={uploadImage} hidden type="file" />
									</Button>
								</div>
							)}

							{errorImg && (
								<div className="Error">
									Sorry, but Your img should be type: PNG, JPEG, JPG and hasn't
									bigger 10MB and have name length not bigger than 255 characters
								</div>
							)}

							{image && !crroperedImg && (
								<div className="btn-upload-img">
									<Button
										variant="contained"
										color="primary"
										onClick={setCroppedImgFunc}
									>
										Crop
									</Button>
								</div>
							)}

							{image && !crroperedImg && (
								<Cropper
									src={image}
									onInitialized={(item) => setCropFunc(item)}
									autoCropArea={1}
									movable={false}
									zoomable={false}
								/>
							)}
							{crroperedImg && (
								<div className="crroperedImg">
									<img src={crroperedImg} alt="" />
								</div>
							)}

							<CardActions className="btns">
								<Link className="link" to={`/posts/${postId}`}>
									<Button
										className="btn"
										variant="contained"
										color="secondary"
										type="button"
									>
										Cancel
									</Button>
								</Link>
								<Button
									className="btn"
									variant="contained"
									color="primary"
									type="submit"
								>
									Update
								</Button>
							</CardActions>
						</Card>
					</Form>
				)}
			</Formik>
		</div>
	);
}
