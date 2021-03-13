import './ArticlesListStyle.scss';
import ArticlesList from './ArticelesList';
import {getPosts} from "./reqArticles/ReqArticles";
import React, {useEffect, useState} from "react";

function ArticlesListContainer() {

    const [page, setPage] = useState(1);
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(false);

    function logit() {
        if(window.innerHeight + window.pageYOffset === document.body.offsetHeight) {
            setPage(page + 1);
        }
    }

    function watchScroll() {
        window.addEventListener("scroll", logit);
    }

    useEffect(  () => {
        watchScroll();
        return () => {
            window.removeEventListener("scroll", logit);
        };
    })

    useEffect(  () => {
        const loadPosts = async () => {
            setLoading(true);
            const { data } = await getPosts(page);
            setPosts((prev) => [...prev, ...data]);
            setLoading(false);
        }

        loadPosts();
    }, [page]);



    return (
        <div>
            <ArticlesList posts={posts} loading={loading}/>
        </div>
    );
}

export default ArticlesListContainer;
