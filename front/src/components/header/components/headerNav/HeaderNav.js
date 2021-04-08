import './HeaderNav.scss';
import PropTypes from 'prop-types';
import notAvatar from './../../../../images/user-astronaut-solid.svg';

function HeaderNav({user}) {
    const {name_user,avatar_img } = user;

    return (
        <div className="header__nav">
            {name_user}

            {avatar_img ? <img
                className="header__nav__avatar"
                src={`http://localhost:3000/images/avatars/${avatar_img}`}
                alt=""
            /> : <img
                    className="header__nav__avatar"
                    src={notAvatar}
                    alt=""
                />
            }

        </div>
    );
}

HeaderNav.propTypes = {
    user: PropTypes.object
}


export default HeaderNav;
