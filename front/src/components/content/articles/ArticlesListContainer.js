import ArticlesList from './ArticelesList';
import {getPosts} from "./reqArticles/ReqArticles";
import {useEffect, useState} from "react";

function ArticlesListContainer() {
    const [posts, setPosts] = useState([]);

    const getData = async() => {
        const data = await getPosts();
        setPosts(data.data);
    }

    useEffect(getData, []);

    return (
        <div>
            <ArticlesList posts={posts}/>
        </div>

    );
}

export default ArticlesListContainer;
