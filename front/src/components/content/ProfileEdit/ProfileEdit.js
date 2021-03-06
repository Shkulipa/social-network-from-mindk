import "./EditProfile.scss";
import React from "react";
import { Form, Formik } from "formik";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import { UiField, UiSelect } from "../../Components-ui/ComponentsUi";
import Button from "@material-ui/core/Button";
import CardActions from "@material-ui/core/CardActions";
import * as Yup from "yup";
import notAvatar from "./../../../images/user-astronaut-solid.svg";
import Cropper from "react-cropper";
import PropTypes from "prop-types";

ProfileEdit.propTypes = {
	user: PropTypes.shape({
		avatarImg: PropTypes.string,
		emailAvailable: PropTypes.string,
		nameAvailable: PropTypes.string,
		phoneAvailable: PropTypes.string,
		emailUser: PropTypes.string,
		nameUser: PropTypes.string,
		permission: PropTypes.arrayOf(PropTypes.string),
		phone: PropTypes.string,
		university: PropTypes.string,
		universityAvailable: PropTypes.string,
		userId: PropTypes.number,
		userToken: PropTypes.string,
	}),
	onEditSubmit: PropTypes.func,
	uploadImage: PropTypes.func,
	setCroppedImgFunc: PropTypes.func,
	image: PropTypes.string,
	setCropFunc: PropTypes.func,
	crroperedImg: PropTypes.string,
	visionBtnUploadImg: PropTypes.bool,
	errorImg: PropTypes.bool,
	visionPrevImg: PropTypes.bool,
	resRequestUpdate: PropTypes.arrayOf(PropTypes.objectOf(PropTypes.string)),
};

export default function ProfileEdit({
	user,
	onEditSubmit,
	uploadImage,
	image,
	setCropFunc,
	setCroppedImgFunc,
	crroperedImg,
	visionBtnUploadImg,
	errorImg,
	visionPrevImg,
	resRequestUpdate,
}) {
	const validProfileEdit = Yup.object().shape({
		name: Yup.string().required("required field"),
		email: Yup.string().email("Please enter correct your email").required("required field"),
		phone: Yup.number().required("required field").positive().integer(),
		university: Yup.string().min(1, "Too short!").max(99, "Too long! Maximum 99 characters"),
	});

	return (
		<div className="edit-profile">
			<h2 className="title">My Profile</h2>

			{resRequestUpdate &&
				resRequestUpdate.map((el) => {
					for (const key in el) {
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
					name: user?.nameUser || "",
					nameAvailable: user?.nameAvailable || "All",

					email: user?.emailUser || "",
					emailAvailable: user?.emailAvailable || "All",

					phone: user?.phone || "",
					phoneAvailable: user?.phoneAvailable || "All",

					university: user?.university || "",
					universityAvailable: user?.universityAvailable || "All",
				}}
				validationSchema={validProfileEdit}
				onSubmit={onEditSubmit}
			>
				{({ errors, touched }) => (
					<Form>
						<Card className="edit-profile-form">
							<CardContent className="profile">
								<CardContent className="left-side">
									<CardContent className="two-fields">
										<div className="field-and-err">
											<UiField
												id="name"
												name="name"
												variant="outlined"
												label="Your name*"
												placeholder="Your name..."
												className="field"
											/>
											{errors.name && touched.name ? (
												<div className="error">{errors.name}</div>
											) : null}
										</div>

										<UiSelect
											labelId="nameAvailable"
											id="nameAvailable"
											label="available"
											name="nameAvailable"
											className="field field-available"
											selectValues={[
												{ val: "All", text: "All" },
												{
													val: "Friends",
													text: "Friends",
												},
												{
													val: "Only Me",
													text: "Only Me",
												},
											]}
										/>
									</CardContent>

									<CardContent className="two-fields">
										<div className="field-and-err">
											<UiField
												id="email"
												name="email"
												variant="outlined"
												label="Your email*"
												placeholder="Your email..."
												className="field"
											/>
											{errors.email && touched.email ? (
												<div className="error">{errors.email}</div>
											) : null}
										</div>

										<UiSelect
											labelId="emailAvailable"
											id="emailAvailable"
											label="available"
											name="emailAvailable"
											className="field field-available"
											selectValues={[
												{ val: "All", text: "All" },
												{
													val: "Friends",
													text: "Friends",
												},
												{
													val: "Only Me",
													text: "Only Me",
												},
											]}
										/>
									</CardContent>

									<CardContent className="two-fields">
										<div className="field-and-err">
											<UiField
												id="phone"
												name="phone"
												variant="outlined"
												label="Your phone*"
												placeholder="0507897810..."
												className="field"
											/>
											{errors.phone && touched.phone ? (
												<div className="error">
													{errors.phone.includes(
														"phone must be a `number` type"
													)
														? "Only numbers"
														: errors.phone}
												</div>
											) : null}
										</div>

										<UiSelect
											labelId="phoneAvailable"
											id="phoneAvailable"
											label="available"
											name="phoneAvailable"
											className="field field-available"
											selectValues={[
												{ val: "All", text: "All" },
												{
													val: "Friends",
													text: "Friends",
												},
												{
													val: "Only Me",
													text: "Only Me",
												},
											]}
										/>
									</CardContent>

									<CardContent className="two-fields">
										<div className="field-and-err">
											<UiField
												id="university"
												name="university"
												variant="outlined"
												label="Your university"
												placeholder="Your university..."
												className="field"
											/>
											{errors.university && touched.university ? (
												<div className="error">{errors.university}</div>
											) : null}
										</div>

										<UiSelect
											labelId="universityAvailable"
											id="universityAvailable"
											label="available"
											name="universityAvailable"
											className="field field-available"
											selectValues={[
												{ val: "All", text: "All" },
												{
													val: "Friends",
													text: "Friends",
												},
												{
													val: "Only Me",
													text: "Only Me",
												},
											]}
										/>
									</CardContent>
								</CardContent>

								<CardContent className="right-side">
									{!user?.avatarImg && visionPrevImg && (
										<img className="avatar-img" src={notAvatar} alt="" />
									)}
									{user?.avatarImg && visionPrevImg && (
										<img
											className="avatar-img"
											/* eslint-disable-next-line max-len */
											src={`http://localhost:3000/images/avatars/${user?.avatarImg}`}
											alt=""
										/>
									)}

									{image && !crroperedImg && (
										<Cropper
											src={image}
											onInitialized={(item) => setCropFunc(item)}
											autoCropArea={1}
											movable={false}
											zoomable={false}
											initialAspectRatio={1 / 1}
										/>
									)}
									{crroperedImg && (
										<div className="crroperedImg">
											<img className="avatar-img" src={crroperedImg} alt="" />
										</div>
									)}

									{visionBtnUploadImg && (
										<div className="btn-upload-img">
											<Button
												variant="contained"
												color="primary"
												component="label"
											>
												Change Image
												<input onChange={uploadImage} hidden type="file" />
											</Button>
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

									{errorImg && (
										<div className="error">
											Sorry, but Your img should be type: PNG, JPEG, JPG and
											hasn&apos;t bigger 10MB and have name length not bigger
											than 255 characters
										</div>
									)}
								</CardContent>
							</CardContent>

							<CardActions className="btns">
								<Button
									className="btn"
									variant="contained"
									size="large"
									color="primary"
									type="submit"
								>
									Save
								</Button>
							</CardActions>
						</Card>
					</Form>
				)}
			</Formik>
		</div>
	);
}
