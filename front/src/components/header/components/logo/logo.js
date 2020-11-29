import logoImg from './logo-01.svg';
import './logo.scss';

function Logo() {
    return (
        <img className="header__logo" src={logoImg} alt="" />
    );
}

export default Logo;
