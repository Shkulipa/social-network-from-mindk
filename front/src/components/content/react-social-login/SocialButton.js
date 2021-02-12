import React from 'react'
import SocialLogin from 'react-social-login'
import "./SocialButton.scss";

class SocialButton extends React.Component {

    render() {
        return (
            <button className="login-btn" onClick={this.props.triggerLogin} {...this.props}>
                { this.props.children }
            </button>
        );
    }
}

export default SocialLogin(SocialButton);