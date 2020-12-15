import Logo from './components/logo/logo';
import HeaderNav from "./components/headerNav/HeaderNav";

import './Header.scss';

function Header({setPageForHook, name}) {
    return (
        <header className="header">
            <Logo/>

            <button onClick={() => setPageForHook('Add Article')}>Add Article</button>
            <button onClick={() => setPageForHook('Articles')}>Articles</button>
            <button onClick={() => setPageForHook('Profile')}>Profile</button>

            <HeaderNav name={name}/>
        </header>
    );
}

export default Header;

