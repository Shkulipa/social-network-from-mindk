import './ArticleStyle.scss';
import {Link} from "react-router-dom";
import CardContent from "@material-ui/core/CardContent";
import Card from "@material-ui/core/Card";
import React from "react";

export default function Article({post}) {
    return (
        <div className='page-article'>
            <h2>This page "Article"</h2>

            <Card className='card'>
                <CardContent>
                    <div className='post__header'>
                        <p>Article ID: {post[0]?.post_id || ''}</p>
                        <p>Post of user ID: {post[0]?.user_id || ''}</p>
                        <Link className={'btn-edit'} to={`/posts/edit/${post[0]?.post_id || ''}`}>Edit?</Link>
                    </div>
                    Description: {post[0]?.description || ''}<br/><br/>
                </CardContent>
            </Card>
        </div>
    );
}

