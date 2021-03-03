import Article from "./Article";
import {useEffect, useState} from "react";
import {getPost} from "./reqArticle/ReqArticle";
import React from "react";
import {
    useParams
} from "react-router-dom";

function ArticleContainer() {
    const id = useParams();
    const [post, setPost] = useState([]);

    const getData = async() => {
        const data = await getPost(id.post_id);
        setPost(data.data);
    }
    useEffect(getData, []);

    return (
        <>
            <Article post={post}/>
        </>

    );
}

export default ArticleContainer;
