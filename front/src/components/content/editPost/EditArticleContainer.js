import EditArticle from "./EditArticle";
import {getPost} from "./reqEditArticle/ReqEditArticle";
import React, {useCallback, useState} from "react";
import {
    useParams
} from "react-router-dom";
import {
    useMutation,
    useQuery,
} from 'react-query';
import {updatePost} from "./reqEditArticle/ReqEditArticle";
import {DataAboutImgForUpload} from "../../../Functions/Functions";

function ArticleContainer() {
    //error mas for image load
    const [errorImg, setErrorImg] = useState();

    //modal window
    const [status200, setStatus200] = useState(false);

    //get article data
    const { post_id } = useParams();

    const postQuery = useQuery('posts', () => getPost(post_id));
    const post = postQuery.data?.data || [];

    //update post
    const mutation = useMutation(updatePost);
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
            <EditArticle
                post={post}
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

export default ArticleContainer;
