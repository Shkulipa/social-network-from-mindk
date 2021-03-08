import EditArticle from "./EditArticle";
import {getPost} from "./reqEditArticle/ReqEditArticle";
import React, {useCallback} from "react";
import {
    useParams
} from "react-router-dom";
import {
    useMutation,
    useQuery,
} from 'react-query';
import {updatePost} from "./reqEditArticle/ReqEditArticle";

function ArticleContainer() {
    const { post_id } = useParams();

    const postQuery = useQuery('posts', () => getPost(post_id));
    const post = postQuery.data?.data || [];


    const mutation = useMutation(updatePost);
    const onEditSubmit = useCallback( async formData => {
        try {
            await mutation.mutate(formData);
        } catch(e) {
            console.log(e);
        }
    }, [mutation]);

    return (
        <>
            <EditArticle post={post} onEditSubmit={onEditSubmit}/>
        </>

    );
}

export default ArticleContainer;
