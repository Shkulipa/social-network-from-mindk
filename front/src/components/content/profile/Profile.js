import PropTypes from 'prop-types';
import Button from "@material-ui/core/Button";
import {
    useParams
} from "react-router-dom";
import SocialButton from "../react-social-login/SocialButton";
import './Profile.scss';
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import {UiField} from "../../Components-ui/ComponentsUi";
import CardActions from "@material-ui/core/CardActions";
import {Form, Formik} from "formik";
import React from "react";
import * as Yup from "yup";
import Grid from "@material-ui/core/Grid";


function Profile({setNameForHook, name}) {
    let { profile_user } = useParams()

    const SignupSchema = Yup.object().shape({
        name: Yup.string()
            .min(1, 'Too short! Enter please min 1 character!')
            .max(15, 'Too long! Enter please max 15 character!')
            .required('required field'),
        surname: Yup.string()
            .min(1, 'Too short! Enter please min 1 character!')
            .max(15, 'Too long! Enter please max 15 character!')
            .required('required field'),
    });

    if(profile_user && name) {
        return (
            <div className="profile-wrapper">
                <h2 className='title'>Welcome {name}!</h2>
            </div>
        )
    }
    //google
    const handleSocialLogin = (user) => {
        console.log(user);
        console.log(user._token.accessToken);
    }
    const handleSocialLoginFailure = (err) => {
        console.error(err)
    }

    //facebook
    const handleSocialLoginFacebook = (user) => {
        console.log(user);
        console.log(user._token.accessToken);
        console.log(user._profile.id);
        try {
            //something code
        } catch (err) {
            console.error(err)
        }
    }
    const handleSocialLoginFailureFacebook = (err) => {
        console.error(err)
    }

    return (
        <div className="profile-wrapper">
            <h2 className='title'>Login page</h2>

            <Formik
                initialValues={{
                    name: '',
                    surname: '',
                }}
                validationSchema={SignupSchema}
                onSubmit={setNameForHook}
            >
                {({errors, touched, values, handleChange}) => (
                    <Form>
                        <Card className='card'>
                            <CardContent>
                                    <UiField
                                        id="name"
                                        name="name"
                                        variant="outlined"
                                        label="Enter your name"
                                        placeholder="Your name..."
                                        className="field"
                                    />
                                    {errors.name && touched.name ? (
                                        <div className='Error'>{errors.name}</div>
                                    ) : null}

                                    <UiField
                                        id="surname"
                                        name="surname"
                                        variant="outlined"
                                        label="Enter your surname"
                                        placeholder="Enter your surname..."
                                        className="field"
                                    />
                                    {errors.surname && touched.surname ? (
                                        <div className='Error'>{errors.surname}</div>
                                    ) : null}
                            </CardContent>
                            <CardActions>
                                <Grid container spacing={3}>
                                    <Grid container justify="center" item xs={12}>
                                        <Button variant="contained" color="primary" type="submit">Login</Button>
                                    </Grid>
                                </Grid>
                            </CardActions>
                        </Card>
                    </Form>
                )}
            </Formik>

            <br/>

            <Grid container spacing={3}>
                <Grid container justify="center" item xs={12}>
                    <SocialButton
                        provider='google'
                        appId='757364433150-lmr5boetgmmhqqtotat4dtbeqkfugqdd.apps.googleusercontent.com'
                        onLoginSuccess={handleSocialLogin}
                        onLoginFailure={handleSocialLoginFailure}
                        color="secondary"
                    >
                        Login with Google
                    </SocialButton>
                </Grid>

                    <Grid container justify="center" item xs={12}>
                    <SocialButton
                    provider='facebook'
                    appId='243090580632360'
                    onLoginSuccess={handleSocialLoginFacebook}
                    onLoginFailure={handleSocialLoginFailureFacebook}
                    color="primary"
                    >
                    Login with Facebook
                    </SocialButton>
                </Grid>
            </Grid>
        </div>

    );
}

const initialValuesType = {
    name: PropTypes.string,
};

Profile.propTypes = {
    name: initialValuesType.name
}

export default Profile;
