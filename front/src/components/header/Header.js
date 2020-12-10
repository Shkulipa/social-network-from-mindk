import Logo from './components/logo/logo';
import AddArticle from "./components/addArticle/AddArticle";
import HeaderNav from "./components/headerNav/HeaderNav";

import './Header.scss';

function Header() {
    return (
      <header className="header">
        <Logo />
        <AddArticle />
        <HeaderNav />
      </header>
    );
}

export default Header;

