import './ArticlesListStyle.scss';
import ArticlesList from './ArticelesList';
import {getPosts} from "./reqArticles/ReqArticles";
import {useQuery} from "react-query";

function ArticlesListContainer() {

    const postQuery = useQuery('posts/single_post', () => getPosts());
    const post = postQuery.data?.data || [];


    return (
        <div>
            <ArticlesList posts={post}/>
        </div>
    );
}

export default ArticlesListContainer;
