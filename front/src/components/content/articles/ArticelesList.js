import './ArticlesListStyle.scss';
import {Link} from "react-router-dom";

function ArticlesListContainer({posts, loading}) {

    console.log(loading);

    return (
        <div>
            This page of Articles <br/>

            {posts.map( ({post_id, description}) =>
                <div key={post_id}>
                    <Link to={`/posts/single_post/${post_id}`}>
                        Post id: {post_id}<br/>
                    </Link>
                    Description: {description}
                    <br/>
                    <hr/>
                </div>
            )}

            {loading && <div>loading...</div>}

        </div>

    );
}

export default ArticlesListContainer;
