import Logo from './components/logo/logo';
import AddArticle from "./components/addArticle/AddArticle";
import Articles from "./components/article/Articles";
import HeaderNav from "./components/headerNav/HeaderNav";
import Profile from "./components/profile/Profile";

import './Header.scss';

function Header({setPageForHook, name, surname}) {
    return (
      <header className="header">
        <Logo />

        <AddArticle setPageForHook={setPageForHook}/>
        <Articles setPageForHook={setPageForHook}/>
        <Profile setPageForHook={setPageForHook}/>

        <HeaderNav name={name}
                   surname={surname}/>
      </header>
    );
}

export default Header;

