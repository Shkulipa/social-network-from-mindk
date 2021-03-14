import './ArticlesListStyle.scss';
import {Link} from "react-router-dom";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import React from "react";
import Tooltip from "@material-ui/core/Tooltip";

function ArticlesListContainer({posts}) {
    return (
        <div className="ArticleList">
            <h2 className="title">Articles page</h2>

            {posts.map( ({post_id, description}) =>
                <Card className="card" key={post_id}>
                    <Tooltip title="Click here to view the article">
                        <CardActionArea className="post-id">
                            <Link to={`/posts/${post_id}`}>
                                <Typography gutterBottom variant="h5" component="h2">
                                    Post id: {post_id}
                                </Typography>
                            </Link>
                        </CardActionArea>
                    </Tooltip>

                    <CardContent className="post-content">
                        <Typography gutterBottom variant="h5" component="h2">
                            Description: {description.length > 25 ? description.slice(0, 25) + '...' : description}
                        </Typography>
                    </CardContent>
                </Card>
            )}
        </div>

    );
}

export default ArticlesListContainer;
