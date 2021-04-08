import Article from "./Article";
import {getPost} from "./reqArticle/ReqArticle";
import React from "react";
import {
    useParams
} from "react-router-dom";
import {useQuery} from "react-query";

function ArticleContainer() {
    const { post_id } = useParams();

    const {data} = useQuery('posts', () => getPost(post_id));
    const post = data?.data || [];

    return (
        <>
            <Article post={post}/>
        </>

    );
}

export default ArticleContainer;
