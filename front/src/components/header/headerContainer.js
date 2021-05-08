import { useMutation } from "react-query";
import Header from "./Header";
import React, { useCallback, useContext, useState } from "react";
import { dataAboutImgForUpload } from "../../Functions/Functions";
import useAuth from "../../hooks/useAuth";
import { Context } from "../../authStore";
import { useHistory } from "react-router-dom";
import Button from "@material-ui/core/Button";
import Modal from "@material-ui/core/Modal";
import useApi from "../../hooks/useApi";

function HeaderContainer() {
	const { callApiLogged } = useApi();

	// react-router History
	const history = useHistory();

	// login user
	const { user } = useContext(Context)[0];

	// error
	const [errorImg, setErrorImg] = useState(false);

	// logout
	const { logout } = useAuth();
	const handleLogout = useCallback(
		(event) => {
			event.preventDefault();
			setAnchorEl(false);
			logout().then(() => {
				history.push("/posts");
			});
		},
		[logout]
	);

	// req add new article
	const mutation = useMutation(callApiLogged);

	const onSubmit = useCallback(
		async (items) => {
			try {
				if (crroperedImg) {
					const dataImg = dataAboutImgForUpload(filDesc, crroperedImg);
					await mutation.mutate({
						url: "/posts",
						method: "POST",
						data: {
							...items,
							dataImg,
							userId: user.userId,
						},
					});
				} else {
					await mutation.mutate({
						url: "/posts",
						method: "POST",
						data: {
							...items,
							userId: user.userId,
						},
					});
				}

				setImage("");
				setCroppedImg("");
				handleClose();
				setOpenModalRefresh(true);
			} catch (e) {
				console.log(e);
			}
		},
		[mutation]
	);

	// modal refresh
	const [openModalRefresh, setOpenModalRefresh] = useState(false);

	const handleModalRefresh = () => {
		window.location.reload();
	};

	// pop-up modal window for add article
	const [open, setOpen] = useState(false);

	const handleClickOpen = () => {
		setOpen(true);
	};

	const handleClose = () => {
		setOpen(false);
	};

	// poper Login menu
	const [anchorEl, setAnchorEl] = useState(false);
	const handleClickPopover = (event) => {
		setAnchorEl(event.currentTarget);
	};
	const handleClosePopover = () => {
		setAnchorEl(false);
	};

	const openProfileMenu = Boolean(anchorEl);
	const id = openProfileMenu ? "simple-popover" : undefined;

	// upload image
	const [filDesc, setFilDesc] = useState();
	const [image, setImage] = useState();
	const [cropper, setCropper] = useState();
	const [crroperedImg, setCroppedImg] = useState("");
	const [visionBtnUploadImg, setVisionBtnUploadImg] = useState(true);

	const uploadImage = (e) => {
		e.preventDefault();

		const { type, size } = e.target.files[0];
		const FILE_TYPES = ["image/png", "image/jpeg", "image/jpg"];

		if (FILE_TYPES.includes(type) && size < 10000000 && e.target.files[0].name.length <= 255) {
			const reader = new FileReader();
			reader.onload = () => {
				setImage(reader.result);
			};
			reader.readAsDataURL(e.target.files[0]);

			setFilDesc(e.target.files[0]);
			setCropper();
			setCroppedImg();
			setVisionBtnUploadImg(false);
			setErrorImg(false);
		} else {
			setErrorImg(true);
		}
	};
	const setCropFunc = (item) => {
		setCropper(item);
	};

	const setCroppedImgFunc = () => {
		if (typeof cropper !== "undefined") {
			setCroppedImg(cropper.getCroppedCanvas().toDataURL());
			setVisionBtnUploadImg(true);
		}
	};

	return (
		<>
			<Modal
				className="modal-deleted"
				open={openModalRefresh}
				aria-labelledby="simple-modal-title"
				aria-describedby="simple-modal-description"
			>
				<div className="modal-deleted-paper">
					<span className="cl-green">Your post Added!</span>
					<span>Refresh your page</span>
					<br />
					<Button
						variant="contained"
						color="secondary"
						size="large"
						onClick={handleModalRefresh}
					>
						Refresh
					</Button>
				</div>
			</Modal>
			<Header
				open={open}
				handleClickOpen={handleClickOpen}
				handleClose={handleClose}
				onSubmit={onSubmit}
				handleClickPopover={handleClickPopover}
				id={id}
				openProfileMenu={openProfileMenu}
				anchorEl={anchorEl}
				handleClosePopover={handleClosePopover}
				user={user}
				uploadImage={uploadImage}
				image={image}
				setCropFunc={setCropFunc}
				setCroppedImgFunc={setCroppedImgFunc}
				crroperedImg={crroperedImg}
				visionBtnUploadImg={visionBtnUploadImg}
				errorImg={errorImg}
				handleLogout={handleLogout}
			/>
		</>
	);
}

export default HeaderContainer;
