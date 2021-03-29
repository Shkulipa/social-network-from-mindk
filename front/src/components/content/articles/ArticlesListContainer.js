import './ArticlesListStyle.scss';
import ArticlesList from './ArticelesList';
import {getPosts} from "./reqArticles/ReqArticles";
import React, {useEffect, useState} from "react";
import {useQuery, useQueryClient} from "react-query";
import Button from "@material-ui/core/Button";

function ArticlesListContainer() {
    const queryClient = useQueryClient();
    const [page, setPage] = useState(1);
    const [posts, setPosts] = useState([]);
    const [countPosts, setCountPosts] = useState(0);

    async function fetchPosts(page = 1) {
        const { data } = await getPosts(page);

        setCountPosts(Number(data.count));
        setPosts([...posts, data.data]);
    }

    const { data, isFetching, refetch } = useQuery(['posts', page],
        () => fetchPosts(page),
        {
            staleTime: Infinity,
        });

    useEffect(() => {refetch()}, [data, page, queryClient])

    const countPagePosts = () => {
        let countPosts = 0;
        posts.forEach(el => countPosts = countPosts + el.length);
        return countPosts;
    };


    return (
        <div className="articles-list-container">
            <ArticlesList posts={posts} isFetching={isFetching || false}/>
            <Button
                size="large"
                variant="contained"
                color="primary"
                onClick={() => {
                    setPage( page + 1)
                }}
                disabled={countPosts === countPagePosts()}
            >
                Load more...
            </Button>
        </div>
    );
}

export default ArticlesListContainer;
