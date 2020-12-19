import './Header.scss';
import Logo from './components/logo/logo';
import HeaderNav from "./components/headerNav/HeaderNav";
import {caseProfile, caseArticles, caseAddArticle} from "../../variables/variables";

function Header({setPageForHook, name}) {
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

export default Header;

