import './ArticleStyle.scss';
import {Link} from "react-router-dom";
import CardContent from "@material-ui/core/CardContent";
import Card from "@material-ui/core/Card";
import React from "react";
import notAvatar from "../../../images/user-astronaut-solid.svg";

export default function Article({post}) {
    return (
        <div className='page-article'>
            <h2>This page "Article"</h2>
            <Card className='card'>
                <CardContent className="CardContent">

                    <div className='post__header'>
                        <div className="post__header__user">
                            {post[0]?.avatar_img ? <img
                                src={`http://localhost:3000/images/avatars/${post[0]?.avatar_img}`}
                                alt=""
                            /> : <img
                                src={notAvatar}
                                alt=""
                            />}
                            <p>
                                <Link to={`/profile/${post[0]?.post_id || ''}`}>{post[0]?.name_user || ''}</Link>
                            </p>
                        </div>
                        <Link className={'btn-edit'} to={`/posts/edit/${post[0]?.post_id || ''}`}>Edit?</Link>
                    </div>

                    <div className='post__desc'>
                        {post[0]?.description || ''}
                    </div>


                    {post[0]?.post_img && <img
                        className={'card__img'}
                        src={`http://localhost:3000/images/posts/${post[0]?.post_img.toString()}`}
                        alt=""
                    />}
                </CardContent>
            </Card>
        </div>
    );
}

