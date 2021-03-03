import EditArticle from "./EditArticle";
import {useEffect, useState} from "react";
import {getPost} from "./reqEditArticle/ReqEditArticle";
import React from "react";
import {
    useParams
} from "react-router-dom";
import {
    useQuery,
} from 'react-query';

function ArticleContainer() {

    const { post_id } = useParams();

    const postQuery = useQuery('posts/single_post', () => getPost(post_id));
    const post = postQuery.data?.data || [];

    return (
        <>
            <EditArticle post={post}/>
        </>

    );
}

export default ArticleContainer;
