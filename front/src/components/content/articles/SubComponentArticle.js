import "./ArticlesListStyle.scss";
import React, { useCallback, useContext, useState } from "react";
import CardContent from "@material-ui/core/CardContent";
import Tooltip from "@material-ui/core/Tooltip";
import Typography from "@material-ui/core/Typography";
import { Link } from "react-router-dom";
import MoreHorizIcon from "@material-ui/icons/MoreHoriz";
import Card from "@material-ui/core/Card";
import { Context } from "../../../authStore";
import Popover from "@material-ui/core/Popover";
import EditIcon from "@material-ui/icons/Edit";
import DeleteForeverIcon from "@material-ui/icons/DeleteForever";
import Button from "@material-ui/core/Button";
import { useMutation } from "react-query";
import Modal from "@material-ui/core/Modal";
import notAvatar from "../../../images/user-astronaut-solid.svg";
import PropTypes from "prop-types";
import useApi from "../../../hooks/useApi";

SubComponentArticle.propTypes = {
    available: PropTypes.string,
    avatarImg: PropTypes.string,
    date: PropTypes.string,
    nameUser: PropTypes.string,
    postId: PropTypes.number,
    description: PropTypes.string,
    postImg: PropTypes.string,
    userId: PropTypes.number,
};

export default function SubComponentArticle({
    available,
    avatarImg,
    date,
    nameUser,
    postId,
    description,
    postImg,
    userId,
}) {
    const { callApiLogged } = useApi();

    // login user
    const { user } = useContext(Context)[0];

    // popover menu article
    const [menuArticle, setMenuArticle] = useState(null);

    const handleClickMenuArticle = (event) => {
        setMenuArticle(event.currentTarget);
    };

    const handleCloseMenuArticle = () => {
        setMenuArticle(null);
    };

    const openMenuArticle = Boolean(menuArticle);
    const idMenuArticle = openMenuArticle ? "simple-popover" : undefined;

    // delete Post
    const mutation = useMutation(callApiLogged);
    const funcDeletePost = useCallback(() => {
        try {
            mutation.mutate({
                url: `/posts/delete/${postId}`,
                method: "DELETE",
                data: { postId, user },
            });
            handleClickModalAnswer();
        } catch (e) {
            console.log(e);
        }
    }, [mutation]);

    // answer from server after delete post
    const [modalAnswer, setModalAnswer] = useState(false);

    const handleClickModalAnswer = () => {
        setModalAnswer(true);
    };

    const handleCloseModalAnswer = () => {
        setModalAnswer(false);
        window.location.reload();
    };

    return (
        <>
            {/* modal update in finally*/}
            {(user &&
                user.userId === userId &&
                user.permission.includes("deleteOwnPost")) ||
            (user && user.permission.includes("deleteAnyPost")) ? (
                <Modal
                    className="modal-deleted"
                    open={modalAnswer}
                    aria-labelledby="simple-modal-title"
                    aria-describedby="simple-modal-description"
                >
                    <div className="modal-deleted-paper">
                        <span className="cl-green">Your post deleted!</span>
                        <span>Refresh your page</span>
                        <br />
                        <Button
                            variant="contained"
                            color="secondary"
                            size="large"
                            onClick={handleCloseModalAnswer}
                        >
                            Refresh
                        </Button>
                    </div>
                </Modal>
            ) : null}

            {/* info card*/}
            <Card className="card" key={postId}>
                <CardContent className="card__content">
                    {/* info user*/}
                    <div className="post__user">
                        {avatarImg ? (
                            <img
                                className="post__user__avatar"
                                /* eslint-disable-next-line max-len */
                                src={`http://localhost:3000/images/avatars/${avatarImg}`}
                                alt=""
                            />
                        ) : (
                            <img
                                className="post__user__avatar"
                                src={notAvatar}
                                alt=""
                            />
                        )}
                        <Tooltip
                            placement="bottom-start"
                            title="View author profile"
                        >
                            <Link className="link" to={`/user/${userId}`}>
                                {nameUser}
                            </Link>
                        </Tooltip>
                    </div>

                    {/* 3 dots*/}
                    {(user &&
                        user.userId === userId &&
                        user.permission.includes("updateOwnPost")) ||
                    (user && user.permission.includes("updateAnyPost")) ? (
                        <Tooltip placement="bottom" title="Settings">
                            <MoreHorizIcon
                                color="primary"
                                fontSize="large"
                                onClick={handleClickMenuArticle}
                            />
                        </Tooltip>
                    ) : null}

                    {/* popover settings*/}
                    {(user &&
                        user.userId === userId &&
                        user.permission.includes("updateOwnPost")) ||
                    (user && user.permission.includes("updateAnyPost")) ? (
                        <Popover
                            id={idMenuArticle}
                            open={openMenuArticle}
                            anchorEl={menuArticle}
                            onClose={handleCloseMenuArticle}
                            anchorOrigin={{
                                vertical: "bottom",
                                horizontal: "center",
                            }}
                            transformOrigin={{
                                vertical: "top",
                                horizontal: "center",
                            }}
                        >
                            <Typography className="popover-settings">
                                <Link
                                    className="link"
                                    to={`/posts/edit/${postId}`}
                                >
                                    <Button variant="contained" color="primary">
                                        <EditIcon className="icon" />
                                        Edit
                                    </Button>
                                </Link>
                                <Button
                                    onClick={funcDeletePost}
                                    variant="contained"
                                    color="secondary"
                                >
                                    <DeleteForeverIcon className="icon" />
                                    Delete
                                </Button>
                            </Typography>
                        </Popover>
                    ) : null}
                </CardContent>

                {/* date & available*/}
                <CardContent className="card__content__date-available">
                    <Typography variant="subtitle2" gutterBottom>
                        Date: <b>{date}</b>
                    </Typography>
                    <Typography variant="subtitle2" gutterBottom>
                        Available: <b>{available ? available : "All"}</b>
                    </Typography>
                </CardContent>

                {/* description post*/}
                <CardContent className="card__content">
                    <Tooltip placement="bottom-start" title="View post">
                        <Typography
                            gutterBottom
                            variant="h5"
                            component="h2"
                            className="post-content"
                        >
                            <Link to={`/posts/${postId}`}>
                                {description.length > 25
                                    ? description.slice(0, 25) + "..."
                                    : description}
                            </Link>
                        </Typography>
                    </Tooltip>
                </CardContent>

                {/* img post*/}
                {postImg && (
                    <img
                        className={"card__img"}
                        /* eslint-disable-next-line max-len */
                        src={`http://localhost:3000/images/posts/${postImg.toString()}`}
                        alt=""
                    />
                )}
            </Card>
        </>
    );
}
