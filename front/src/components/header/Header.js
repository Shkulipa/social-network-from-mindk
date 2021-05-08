import "./Header.scss";
import "cropperjs/dist/cropper.css";

import Logo from "./components/logo/logo";
import HeaderNav from "./components/headerNav/HeaderNav";
import { UiSelect, UiTextarea } from "../Components-ui/ComponentsUi";

import React from "react";
import { Link } from "react-router-dom";
import { Form, Formik } from "formik";
import * as Yup from "yup";

import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import CardActions from "@material-ui/core/CardActions";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Cropper from "react-cropper";
import Popover from "@material-ui/core/Popover";
import Typography from "@material-ui/core/Typography";

function Header({
	user,
	onSubmit,
	handleClickOpen,
	open,
	handleClose,
	id,
	anchorEl,
	openProfileMenu,
	handleClickPopover,
	handleClosePopover,
	uploadImage,
	image,
	setCropFunc,
	setCroppedImgFunc,
	crroperedImg,
	visionBtnUploadImg,
	errorImg,
	handleLogout,
}) {
	const SignupSchema = Yup.object().shape({
		description: Yup.string()
			.required("required field")
			.test(
				"len",
				"Must be max 2555 characters",
				(val) => val && val.toString().length < 2555
			),
	});

	return (
		<div className="container">
			<header className="header">
				<Logo />

				{user && (
					<Button variant="outlined" color="primary" onClick={handleClickOpen}>
						Add Article
					</Button>
				)}

				<Link to="/posts">Articles</Link>

				{!user && (
					<Link to={`/login`}>
						<Button
							className="btn-Header-popper"
							variant="contained"
							color="primary"
							type="button"
						>
							Sign in/Sign up
						</Button>
					</Link>
				)}

				{user && (
					<button
						className="btn-Header-popper"
						aria-describedby={id}
						type="button"
						onClick={handleClickPopover}
					>
						<HeaderNav user={user} />
					</button>
				)}

				{user && openProfileMenu && (
					<Popover
						open={openProfileMenu}
						id={id}
						anchorEl={anchorEl}
						onClose={handleClosePopover}
						anchorOrigin={{
							vertical: "bottom",
							horizontal: "center",
						}}
						transformOrigin={{
							vertical: "top",
							horizontal: "center",
						}}
					>
						<Typography className="Header-popper-items ">
							<Link to="/profile">Profile</Link>
							<Link to="/logout" onClick={handleLogout}>
								logout
							</Link>
						</Typography>
					</Popover>
				)}
			</header>

			{user && (
				<Dialog
					open={open}
					onClose={handleClose}
					aria-labelledby="alert-dialog-title"
					aria-describedby="alert-dialog-description"
					className="dialog"
				>
					<DialogTitle className="addArticle-popup-title" id="alert-dialog-title">
						{"For add new article, fill all fields"}
					</DialogTitle>
					<DialogContent>
						<Formik
							initialValues={{
								description: "",
								available: "all",
							}}
							validationSchema={SignupSchema}
							onSubmit={onSubmit}
						>
							{({ errors, touched }) => (
								<Form encType="multipart/form-data">
									<Card className="addArticle-popup">
										<CardContent>
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

											<UiTextarea
												id="description"
												name="description"
												label="Description*"
												multiline
												variant="outlined"
												placeholder="Your text..."
												rowsMax={15}
												className="field"
											/>
											{errors.description && touched.description ? (
												<div className="Error">{errors.description}</div>
											) : null}

											{visionBtnUploadImg && (
												<div className="btn-upload-img">
													<Button
														variant="contained"
														color="primary"
														component="label"
													>
														{!image && !crroperedImg
															? "Upload Image"
															: "Change Image"}
														<input
															onChange={uploadImage}
															hidden
															type="file"
														/>
													</Button>
												</div>
											)}

											{errorImg && (
												<div className="Error">
													Sorry, but Your img should be type: PNG, JPEG,
													JPG and hasn't bigger 10MB and have name length
													not bigger than 255 characters
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
										</CardContent>
										<CardActions>
											<Button
												className="btn"
												variant="contained"
												color="primary"
												type="button"
												onClick={handleClose}
											>
												Cancel
											</Button>
											<Button
												className="btn"
												variant="contained"
												color="primary"
												type="submit"
											>
												Add Article
											</Button>
										</CardActions>
									</Card>
								</Form>
							)}
						</Formik>
					</DialogContent>
				</Dialog>
			)}
		</div>
	);
}

export default Header;
