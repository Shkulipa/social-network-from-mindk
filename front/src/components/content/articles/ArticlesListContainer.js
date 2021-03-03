import './ArticlesListStyle.scss';
import ArticlesList from './ArticelesList';
import {getPosts} from "./reqArticles/ReqArticles";
import {
    useQuery,
} from 'react-query';
import {useEffect, useState} from "react";
import {getPost} from "../editPost/reqEditArticle/ReqEditArticle";

function ArticlesListContainer() {
    const [page, setPage] = useState(1);
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(false);

    function logit() {
        /*console.log('pageYOffsetwindow', window.pageYOffset);
        console.log('innerHeight', window.innerHeight);
        console.log('document.body.offsetHeight', document.body.offsetHeight);*/

        if(window.innerHeight + window.pageYOffset === document.body.offsetHeight) {
            setPage(page + 1);
        }
    }

    useEffect(  () => {
        function watchScroll() {
            window.addEventListener("scroll", logit);
        }
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

    /*const postQuery = useQuery('posts/single_post', () => getPost(page));
    const post = postQuery.data?.data || [];*/

    return (
        <div>
            <ArticlesList posts={posts} loading={loading}/>
        </div>
    );
}

export default ArticlesListContainer;
