import './ArticleStyle.scss';
import {Link} from "react-router-dom";

export default function Article({post}) {
    return (
        <div className='page-article'>
            <h2>This page "Article"</h2>

            {post.map(({description, user_id, post_id}) => (
                <div className='post'>
                    <div className='post__header'>
                        <p>Article ID: {post_id}</p>
                        <p>Post of user ID: {user_id}</p>
                        <Link className={'btn-edit'} to={`/post/edit/${post_id}`}>Edit?</Link>
                    </div>
                    Description: {description}<br/><br/>
                </div>
            ))}
        </div>
    );
}

