import ArticlesList from './ArticelesList';
import {getPosts} from "./reqArticles/ReqArticles";
import {
    useQuery,
} from 'react-query';

function ArticlesListContainer() {

    const postsQuery = useQuery('posts', () => getPosts());
    const posts = postsQuery.data?.data || [];

    return (
        <div>
           <ArticlesList posts={posts}/>
        </div>
    );
}

export default ArticlesListContainer;
