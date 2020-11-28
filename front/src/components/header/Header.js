import React, {Component} from 'react';
import './Header.scss';
import logo from './logo-01.svg';


export default class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {openPanel: false};

    // Эта привязка обязательна для работы `this` в колбэке.
    this.funcOpenPanel = this.funcOpenPanel.bind(this);
  }
  

  funcOpenPanel() {
    return this.setState({
      openPanel: !this.state.openPanel
    })
  };


  render() {
    return (
      <header className="header">
        <img className="header__logo" src={logo} alt="" />
        
        <div>Add Article</div>

        <div className="header__nav" >
          Name
          <img
            className="header__nav__avatar"
            onClick={this.funcOpenPanel}
            src="https://via.placeholder.com/150"
            alt=""
          />
        </div>

        {this.state.openPanel ? 
        <div className="header__panel">
          <a href="#">Profile</a>
          <a href="#">Logout</a>
        </div> : false}
      </header>
    );
  }
}

