import {
    useMutation,
} from 'react-query';
import {ReqAddArticle} from './ReqAddArticle-2';
import Header from "./Header";
import React, {useCallback, useState} from "react";

function HeaderContainer({name}) {
    //req add new article
    const mutation = useMutation(ReqAddArticle);

    const onSubmit = useCallback( async items => {
        //croppedImg from base64 in string
        /*const crroperedImgBase654 = crroperedImg || 'string'
        const img = crroperedImgBase654.split(':');

        let buff = new Buffer(img[1] || 'test', 'base64');
        let base64ToStringNewImg = buff.toString('ASCII') || 'string';*/

        try {
            let newFormData = new FormData();
            newFormData.append(
                'items',
                items
            );
            newFormData.append(
                'fileToUpload',
                crroperedImg
            );
            await mutation.mutate(newFormData);
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

    //poper profile menu
    const [anchorEl, setAnchorEl] = useState(null);
    const handleClickPopover = (event) => {
        setAnchorEl(anchorEl ? null : event.currentTarget);
    };

    const openProfileMenu = Boolean(anchorEl);
    const id = openProfileMenu ? 'simple-popover' : undefined;

    //upload image
    const [image, setImage] = useState();
    const [cropper, setCropper] = useState();
    const [crroperedImg, setCroppedImg] = useState('');
    const [visionBtnUploadImg, setVisionBtnUploadImg] = useState(true);

    const uploadImage = (e) => {
        e.preventDefault();

        const reader = new FileReader();
        reader.onload = () => {
            setImage(reader.result);
        };
        reader.readAsDataURL(e.target.files[0]);

        setCropper();
        setCroppedImg();
        setVisionBtnUploadImg(false);
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
                name={name}

                open={open}
                handleClickOpen={handleClickOpen}
                handleClose={handleClose}
                onSubmit={onSubmit}

                handleClickPopover={handleClickPopover}
                id={id}
                openProfileMenu={openProfileMenu}
                anchorEl={anchorEl}
                onClose={handleClose}

                uploadImage={uploadImage}
                image={image}
                setCropFunc={setCropFunc}
                setCroppedImgFunc={setCroppedImgFunc}
                crroperedImg={crroperedImg}
                visionBtnUploadImg={visionBtnUploadImg}
            />
        </>

    );
}

export default HeaderContainer;
