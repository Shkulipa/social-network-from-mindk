import EditArticle from "./EditArticle";
import React, {useCallback, useContext, useEffect, useState} from "react";
import {
    Redirect,
    useParams
} from "react-router-dom";
import {
    useMutation,
    useQuery,
} from 'react-query';
import {DataAboutImgForUpload} from "../../../Functions/Functions";
import useRequireAuth from "../../../hooks/useRequireAuth";
import {Context} from "../../../authStore";
import useApi from "../../../hooks/useApi";

function ArticleContainer() {
    const {callApiLogged, callApiNotLogged} = useApi();

    //login user
    useRequireAuth();
    const { user } = useContext(Context)[0];
    // check owner of posts

    //error mas for image load
    const [errorImg, setErrorImg] = useState();

    //get article data
    const { post_id } = useParams();
    const {data} = useQuery('posts', () => callApiNotLogged(`/posts/${post_id}`));

    //update post
    const mutation = useMutation(callApiLogged);
    const onEditSubmit = useCallback( items => {
        try {
            if(crroperedImg) {
                const dataImg = DataAboutImgForUpload(filDesc, crroperedImg);
                mutation.mutate({
                    url: `/posts/update/${post_id}`,
                    method: 'PUT',
                    data: {
                        ...items,
                        dataImg,
                        user:user,
                        post_id
                    }
                });
            } else {
                mutation.mutate({
                    url: `/posts/update/${post_id}`,
                    method: 'PUT',
                    data: {
                        ...items,
                        user:user,
                        post_id
                    }
                });
            }
        } catch(e) {
            console.log(e);
        }
    }, [mutation]);

    useEffect(() => {}, [mutation]);

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

    if( data ) {
        if (user) {
            if (!user.permission.includes('updateAnyPost', 'deleteAnyPost') && user.permission.includes('updateOwnPost', 'deleteOwnPost')) {
                if(data.user_id !== user.user_id) {
                    return <Redirect to={`/posts/${post_id}`}/>
                }
            }
        } else {
            return <Redirect to={`/posts/${post_id}`}/>
        }
    }

    return (
        <EditArticle
            post={data || {}}
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

export default ArticleContainer;
