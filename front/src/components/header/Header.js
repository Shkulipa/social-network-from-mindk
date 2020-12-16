import Logo from './components/logo/logo';
import HeaderNav from "./components/headerNav/HeaderNav";

import './Header.scss';

function Header({setPageForHook, name}) {
    const AddArticle = 'Add Article',
        Articles = 'Articles',
        Profile = 'Profile';

    return (
        <header className="header">
            <Logo/>

            <button onClick={setPageForHook(AddArticle)}>Add Article</button>
            <button onClick={setPageForHook(Articles)}>Articles</button>
            <button onClick={setPageForHook(Profile)}>Profile</button>

            <HeaderNav name={name}/>
        </header>
    );
}

export default Header;

