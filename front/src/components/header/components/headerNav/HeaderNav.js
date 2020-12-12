import './HeaderNav.scss';

function HeaderNav({name, surname}) {
    return (
        <div className="header__nav">
            {name} {surname}
            <img
                className="header__nav__avatar"
                src="https://via.placeholder.com/150"
                alt=""
            />
        </div>
    );
}

export default HeaderNav;
