import './HeaderNav.scss';

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

export default HeaderNav;
