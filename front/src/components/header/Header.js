import './Header.scss';
import Logo from './components/logo/logo';
import HeaderNav from "./components/headerNav/HeaderNav";
import PropTypes from 'prop-types';
import {Link} from "react-router-dom";

function Header({name}) {
    // throw new Error('error');

    let user_link;
    if(!name) {
        user_link = 'not_authorized';
    } else {
        user_link = name.toString().replace(' ', '_');
    }

    return (
        <header className="header">
            <Logo/>

            <Link to="/add-article">Add Article</Link>
            <Link to="/posts">Articles</Link>
            <Link to={`/profile/${user_link}`}>Profile</Link>

            <HeaderNav name={name}/>
        </header>
    );
}

Header.propTypes = {
    setPageForHook: PropTypes.func,
    name: PropTypes.string
}

export default Header;

