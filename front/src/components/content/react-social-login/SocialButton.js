import React from 'react'
import SocialLogin from 'react-social-login'
import "./SocialButton.scss";
import Button from "@material-ui/core/Button";

class SocialButton extends React.Component {
    render() {
        const { children, triggerLogin, ...props } = this.props;

        return (
            <Button variant="contained" type="submit" onClick={triggerLogin} {...props}>
                { children }
            </Button>
        );
    }
}

export default SocialLogin(SocialButton);