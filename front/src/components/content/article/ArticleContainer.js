import Article from "./Article";
import {getPost} from "./reqArticle/ReqArticle";
import React from "react";
import {
    useParams
} from "react-router-dom";
import {useQuery} from "react-query";

function ArticleContainer() {
    const { post_id } = useParams();

    const postQuery = useQuery('posts', () => getPost(post_id));
    const post = postQuery.data?.data || [];

    return (
        <>
            <Article post={post}/>
        </>

    );
}

export default ArticleContainer;
