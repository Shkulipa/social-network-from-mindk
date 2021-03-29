import React, {useCallback, useState} from "react";
import ProfileEdit from "./ProfileEdit";
import {useMutation, useQuery} from "react-query";
import {DataAboutImgForUpload} from "../../../Functions/Functions";
import {getProfile, updateProfile} from "../../../Functions/reqProfileEdit/ReqProfileEdit";

function ProfileEditContainer() {
    //error mas for image load
    const [errorImg, setErrorImg] = useState();

    //modal window
    const [status200, setStatus200] = useState(false);

    //get profile data
    const postQuery = useQuery('profile', () => getProfile(1));
    const profile = postQuery.data?.data || [];



    //update Profile
    const mutation = useMutation(updateProfile);
    const onEditSubmit = useCallback( async items => {
        try {
            if(crroperedImg) {
                const dataImg = DataAboutImgForUpload(filDesc, crroperedImg);
                await mutation.mutate({...items, dataImg})
            } else {
                await mutation.mutate(items);
            }

            setStatus200(true);
        } catch(e) {
            console.log(e);
        }
    }, [mutation]);

    //cropper
    const [visionPrevImg, setVisionPrevImg] = useState(true);
    const [filDesc, setFilDesc] = useState();
    const [image, setImage] = useState();
    const [cropper, setCropper] = useState();
    const [crroperedImg, setCroppedImg] = useState('');
    const [visionBtnUploadImg, setVisionBtnUploadImg] = useState(true);

    const uploadImage = (e) => {
        e.preventDefault();

        const {type, size} = e.target.files[0];
        const FILE_TYPES = ['image/png', 'image/jpeg', 'image/jpg'];

        if(FILE_TYPES.includes(type) && size < 10000000 && e.target.files[0].name.length <= 255) {
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
            setErrorImg(true)
        }

    }
    const setCropFunc = (item) => {
        setCropper(item);
    }

    const setCroppedImgFunc = () => {
        if(typeof cropper !== 'undefined') {
            setCroppedImg(cropper.getCroppedCanvas().toDataURL())
            setVisionBtnUploadImg(true);
        }
    }

    return (
        <>
            <ProfileEdit
                profile={profile}
                onEditSubmit={onEditSubmit}

                uploadImage={uploadImage}
                image={image}
                setCropFunc={setCropFunc}
                setCroppedImgFunc={setCroppedImgFunc}
                crroperedImg={crroperedImg}
                visionBtnUploadImg={visionBtnUploadImg}
                errorImg={errorImg}
                visionPrevImg={visionPrevImg}

                status200={status200}
            />
        </>

    );
}

export default ProfileEditContainer;
