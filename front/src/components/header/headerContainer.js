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
        const decodeImg = crroperedImgBase654.split('base64,')[1];
        const typeImg = decodeImg[0].split(':')[1];

        const img = new Blob([decodeImg]);*/

        const {name, size, type} = filDesc || '';
        const date = new Date();
        const time = date.getFullYear().toString() + date.getMonth().toString() +
            date.getMonth().toString() + date.getDate().toString() +
            date.getHours().toString() + date.getSeconds().toString() +
            date.getMilliseconds().toString();

        const dataImg = {
            name: name + time,
            type: type,
            size: size,
            img: crroperedImg,
        }

        console.log(dataImg);

        try {
            await mutation.mutate({...items, dataImg});
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
    const [filDesc, setFilDesc] = useState();
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

        setFilDesc(e.target.files[0]);
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
