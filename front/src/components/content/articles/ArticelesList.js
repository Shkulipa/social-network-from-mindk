import './ArticlesListStyle.scss';
import {Link} from "react-router-dom";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import React, {useContext} from "react";
import Tooltip from "@material-ui/core/Tooltip";
import Loader from "react-loader-spinner";
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import {Context} from "../../../authStore";

function ArticlesListContainer({posts, isFetching}) {
    const { user } = useContext(Context)[0];

    return (
        <div className="ContainerWrapper ArticleList">
            <h2 className="title">Articles page</h2>

            {posts.map(el =>
                el.map( ({post_id, description, post_img, user_id}) =>
                    <Card className="card" key={post_id}>
                        <CardContent className="card__content">
                                <Tooltip placement="bottom-start" title="Click here to view the article">
                                    <Typography gutterBottom variant="h5" component="h2" className="post-content">
                                        <Link to={`/posts/${post_id}`}>
                                            {description.length > 25 ? description.slice(0, 25) + '...' : description}
                                        </Link>
                                    </Typography>
                                </Tooltip>

                                {user && user.user_id === user_id ?
                                    <Tooltip title="Settings">
                                    <Link className="settings" to={`/posts/edit/${post_id}`}>
                                        <MoreHorizIcon fontSize="large"/>
                                    </Link>
                                </Tooltip> : null}
                        </CardContent>

                        {post_img && <img
                            className={'card__img'}
                            src={`http://localhost:3000/images/posts/${post_img.toString()}`}
                            alt=""
                        />}
                    </Card>
                )
            )}

            {isFetching &&
            <div className="loader">
                <Loader
                    type="ThreeDots"
                    color="#00BFFF"
                    height={100}
                    width={100}
                />
            </div>
            }
        </div>

    );
}

export default ArticlesListContainer;
