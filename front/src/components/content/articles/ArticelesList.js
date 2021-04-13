import './ArticlesListStyle.scss';
import React from "react";
import Loader from "react-loader-spinner";
import SubComponentArticle from "./SubComponentArticle";
import PropTypes from "prop-types";

ArticlesListContainer.propTypes = {
    post: PropTypes.arrayOf(PropTypes.shape({
        available:  PropTypes.string,
        avatar_img:  PropTypes.string,
        date:  PropTypes.string,
        description:  PropTypes.string,
        name_user:  PropTypes.string,
        post_img:  PropTypes.string,
        post_id:  PropTypes.number,
        user_id:  PropTypes.number,
    })),
    isFetching: PropTypes.bool,
    refetch: PropTypes.func
}

function ArticlesListContainer({posts, isFetching,refetch}) {
    return (
        <div className="ContainerWrapper ArticleList">
            <h2 className="title">Articles page</h2>

            {posts.map(el =>
                el.map( ({available, avatar_img, date, name_user, post_id, description, post_img, user_id}) =>
                    <SubComponentArticle
                        key={post_id}
                        available={available}
                        avatar_img={avatar_img || ''}
                        date={date}
                        name_user={name_user}
                        post_id={post_id}
                        description={description}
                        post_img={post_img}
                        user_id={user_id}
                        refetch={refetch}
                    />
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
