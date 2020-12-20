import './Header.scss';
import Logo from './components/logo/logo';
import HeaderNav from "./components/headerNav/HeaderNav";
import {caseProfile, caseArticles, caseAddArticle} from "../../variables/variables";
import PropTypes from 'prop-types';

function Header({setPageForHook, name}) {

    // throw new Error('error');

    return (
        <header className="header">
            <Logo/>

            <button onClick={setPageForHook(caseAddArticle)}>Add Article</button>
            <button onClick={setPageForHook(caseArticles)}>Articles</button>
            <button onClick={setPageForHook(caseProfile)}>Profile</button>

            <HeaderNav name={name}/>
        </header>
    );
}

Header.propTypes = {
    setPageForHook: PropTypes.func,
    name: PropTypes.string
}

export default Header;

