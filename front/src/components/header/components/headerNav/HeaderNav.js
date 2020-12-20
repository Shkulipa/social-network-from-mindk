import './HeaderNav.scss';
import PropTypes from 'prop-types';

function HeaderNav({name}) {
    return (
        <div className="header__nav">
            {name}
            <img
                className="header__nav__avatar"
                src="https://via.placeholder.com/150"
                alt=""
            />
        </div>
    );
}

HeaderNav.propTypes = {
    name: PropTypes.string
}

HeaderNav.defaultProps = {
    name: 'Not authorized'
}


export default HeaderNav;
