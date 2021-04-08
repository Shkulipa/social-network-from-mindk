import {
    useMutation,
} from 'react-query';
import {ReqAddArticle} from './ReqAddArticle-2';
import Header from "./Header";
import React, {useCallback, useContext, useState} from "react";
import {DataAboutImgForUpload} from "../../Functions/Functions";
import useAuth from "../../hooks/useAuth";
import {Context} from "../../authStore";
import { useHistory } from "react-router-dom";

function HeaderContainer() {
    //react-router History
    let history = useHistory();

    //login user
    const { user } = useContext(Context)[0];

    //error
    const [errorImg, setErrorImg] = useState(false);

    //logout
    const { logout } = useAuth();
    const handleLogout = useCallback(
        event => {
            event.preventDefault();
            setAnchorEl(false);
            logout().then(() => {
                history.push("/posts");
            });
        },
        [logout],
    );

    //req add new article
    const mutation = useMutation(ReqAddArticle);

    const onSubmit = useCallback( async items => {
        try {
            if(crroperedImg) {
                const dataImg = DataAboutImgForUpload(filDesc, crroperedImg);
                await mutation.mutate({...items, dataImg, user_id: user.user_id})
            } else {
                await mutation.mutate({...items, user_id: user.user_id});
            }

            setImage('');
            setCroppedImg('');
            handleClose();
        } catch(e) {
            console.log(e);
        }
    }, [mutation]);



    //pop-up modal window for add article
    const [open, setOpen] = useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    //poper Login menu
    const [anchorEl, setAnchorEl] = useState(false);
    const handleClickPopover = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClosePopover = () => {
        setAnchorEl(false);
    };


    const openProfileMenu = Boolean(anchorEl);
    const id = openProfileMenu ? 'simple-popover' : undefined;

    //upload image
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
            setCropper();
            setCroppedImg();
            setVisionBtnUploadImg(false);
            setErrorImg(false);
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
