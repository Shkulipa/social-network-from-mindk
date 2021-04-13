import React, { useCallback, useContext, useState } from "react";
import ProfileEdit from "./ProfileEdit";
import { useMutation } from "react-query";
import { dataAboutImgForUpload } from "../../../Functions/Functions";
import { Context } from "../../../authStore";
import useApi from "../../../hooks/useApi";

export default function ProfileEditContainer() {
	const { callApiLogged } = useApi();

	// login user
	const { user } = useContext(Context)[0];

	// error mas for image load
	const [errorImg, setErrorImg] = useState();

	// update Profile
	const mutation = useMutation(callApiLogged);
	const onEditSubmit = useCallback(
		async (items) => {
			try {
				if (crroperedImg) {
					const dataImg = dataAboutImgForUpload(filDesc, crroperedImg);
					await mutation.mutate({
						url: `/profile/update/${user.userId}`,
						method: "PUT",
						data: {
							user: {
								permission: user.permission,
								userId: user.userId,
								userToken: user.userToken,
							},
							...items,
							dataImg,
						},
					});
				} else {
					await mutation.mutate({
						url: `/profile/update/${user.userId}`,
						method: "PUT",
						data: {
							user: {
								permission: user.permission,
								userId: user.userId,
								userToken: user.userToken,
							},
							...items,
						},
					});
				}
			} catch (e) {
				console.log(e);
			}
		},
		[mutation]
	);

	// cropper
	const [visionPrevImg, setVisionPrevImg] = useState(true);
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
			setCropper(null);
			setCroppedImg(null);
			setVisionBtnUploadImg(false);
			setErrorImg(false);
			setVisionPrevImg(false);
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
		<ProfileEdit
			user={user}
			onEditSubmit={onEditSubmit}
			uploadImage={uploadImage}
			image={image}
			setCropFunc={setCropFunc}
			setCroppedImgFunc={setCroppedImgFunc}
			crroperedImg={crroperedImg}
			visionBtnUploadImg={visionBtnUploadImg}
			errorImg={errorImg}
			visionPrevImg={visionPrevImg}
			resRequestUpdate={mutation.data?.data || []}
		/>
	);
}
