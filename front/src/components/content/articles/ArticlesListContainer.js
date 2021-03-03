import './ArticlesListStyle.scss';
import ArticlesList from './ArticelesList';
import {getPosts} from "./reqArticles/ReqArticles";
import {
    useQuery, useQueryClient,
} from 'react-query';
import {useEffect, useState} from "react";
import {getPost} from "../editPost/reqEditArticle/ReqEditArticle";

function ArticlesListContainer() {
    /*const [page, setPage] = useState(1);
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(false);

    function plusPage() {
        if(window.innerHeight + window.pageYOffset === document.body.offsetHeight) {
            setPage(page + 1);
        }
    }

    useEffect(  () => {
        function watchScroll() {
            window.addEventListener("scroll", plusPage);
        }
        watchScroll();
        return () => {
            window.removeEventListener("scroll", plusPage);
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
    }, [page]);*/

    const queryClient = useQueryClient()
    const [page, setPage] = useState(1);
    const [posts, setPosts] = useState([]);

    function plusPage() {
        if(window.innerHeight + window.pageYOffset === document.body.offsetHeight) {
            setPage(page + 1);
        }
    }

    const { data, isFetching } = useQuery(
        ['posts', page],
        () => getPosts(page)
    )

    useEffect(  () => {
        function watchScroll() {
            window.addEventListener("scroll", plusPage);
        }
        watchScroll();
        return () => {
            window.removeEventListener("scroll", plusPage);
        };
    })

    useEffect(  () => {
        if (data?.hasMore) {
            queryClient.prefetchQuery('projects', () => getPosts(page + 1))
        };
    }, [page])

    console.log(data);
    /* const postQuery = useQuery('posts/single_post', () => getPost(page));
     const post = postQuery.data?.data || [];*/

    return (
        <div>
            <ArticlesList posts={[]} loading={isFetching}/>
        </div>
    );
}

export default ArticlesListContainer;
