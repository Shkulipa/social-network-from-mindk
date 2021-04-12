import Article from "./Article";
import {getPost} from "./reqArticle/ReqArticle";
import React, {useContext} from "react";
import {
    useParams
} from "react-router-dom";
import {useQuery} from "react-query";
import {Context} from "../../../authStore";

function ArticleContainer() {
    //login user
    const { user } = useContext(Context)[0];

    //data post
    const { post_id } = useParams();

    const {data} = useQuery('posts', () => getPost(post_id));
    const post = data?.data || [];

    //popover settings
    const [anchorEl, setAnchorEl] = React.useState(null);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const open = Boolean(anchorEl);
    const id = open ? 'simple-popover' : undefined;

    return (
        <Article
            post={post}
            handleClose={handleClose}
            handleClick={handleClick}
            id={id}
            user={user}
            open={open}
            anchorEl={anchorEl}
        />
    );
}

export default ArticleContainer;
