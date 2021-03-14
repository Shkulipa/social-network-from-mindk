import './ArticlesListStyle.scss';
import ArticlesList from './ArticelesList';
import {getPosts} from "./reqArticles/ReqArticles";
import React from "react";
import {useQuery} from "react-query";

function ArticlesListContainer() {
    const intervalMs = 3000;

    const postQuery = useQuery('posts/single_post', () => getPosts(),
        {
            // Refetch the data every second
            refetchInterval: intervalMs,
        });
    const post = postQuery.data?.data || [];

    return (
        <div>
            <ArticlesList posts={post}/>
        </div>
    );
}

export default ArticlesListContainer;
