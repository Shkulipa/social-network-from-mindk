import React from "react";
import "./HeaderNav.scss";
import PropTypes from "prop-types";
import notAvatar from "./../../../../images/user-astronaut-solid.svg";

function HeaderNav({ user }) {
    const { nameUser, avatarImg } = user;

    return (
        <div className="header__nav">
            {nameUser}

            {avatarImg ? (
                <img
                    className="header__nav__avatar"
                    src={`http://localhost:3000/images/avatars/${avatarImg}`}
                    alt=""
                />
            ) : (
                <img className="header__nav__avatar" src={notAvatar} alt="" />
            )}
        </div>
    );
}

HeaderNav.propTypes = {
    user: PropTypes.object,
};

export default HeaderNav;
