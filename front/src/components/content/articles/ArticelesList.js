import "./ArticlesListStyle.scss";
import React from "react";
import Loader from "react-loader-spinner";
import SubComponentArticle from "./SubComponentArticle";
import PropTypes from "prop-types";

ArticlesListContainer.propTypes = {
    posts: PropTypes.arrayOf(
        PropTypes.arrayOf(
            PropTypes.shape({
                available: PropTypes.string,
                avatarImg: PropTypes.string,
                date: PropTypes.string,
                description: PropTypes.string,
                nameUser: PropTypes.string,
                postImg: PropTypes.string,
                postId: PropTypes.number,
                userId: PropTypes.number,
            })
        )
    ),
    isFetching: PropTypes.bool,
    refetch: PropTypes.func,
};

function ArticlesListContainer({ posts, isFetching, refetch }) {
    return (
        <div className="ContainerWrapper ArticleList">
            <h2 className="title">Articles page</h2>

            {posts.map((el) =>
                el.map(
                    ({
                        available,
                        avatarImg,
                        date,
                        nameUser,
                        postId,
                        description,
                        postImg,
                        userId,
                    }) => (
                        <SubComponentArticle
                            key={postId}
                            available={available}
                            avatarImg={avatarImg || ""}
                            date={date}
                            nameUser={nameUser}
                            postId={postId}
                            description={description}
                            postImg={postImg}
                            userId={userId}
                            refetch={refetch}
                        />
                    )
                )
            )}

            {isFetching && (
                <div className="loader">
                    <Loader
                        type="ThreeDots"
                        color="#00BFFF"
                        height={100}
                        width={100}
                    />
                </div>
            )}
        </div>
    );
}

export default ArticlesListContainer;
