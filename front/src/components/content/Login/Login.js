import PropTypes from 'prop-types';
import Button from "@material-ui/core/Button";
import SocialButton from "../react-social-login/SocialButton";
import './Profile.scss';
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import {UiField} from "../../Components-ui/ComponentsUi";
import CardActions from "@material-ui/core/CardActions";
import {Form, Formik} from "formik";
import React, {useCallback} from "react";
import * as Yup from "yup";
import Grid from "@material-ui/core/Grid";
import {useMutation, useQuery} from "react-query";
import useAuth from "../../../hooks/useAuth";
import {Link, withRouter} from "react-router-dom";
import useRequireAuth from "../../../hooks/useRequireAuth";

function LoginContainer() {
    const SignupSchema = Yup.object().shape({
        email: Yup.string()
            .required('required field'),
        password: Yup.string()
            .required('required field'),
    });

    //Login
    useRequireAuth(true);
    const { login, loginSocial } = useAuth();

    const mutation = useMutation(login);

    const postQueryLogin = useCallback( async formData => {
        try {
            await mutation.mutate(formData);
        } catch(e) {
            console.error(e);
        }
    }, [mutation]);

    //google
    const handleSocialLogin = async (user) => {
        await loginSocial(user, 'google');
    }
    const handleSocialLoginFailure = (err) => {
        console.error(err)
    }

    //facebook
    const handleSocialLoginFacebook = async (user) => {
        try {
            await loginSocial(user, 'facebook');
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

            {mutation.data?.message && <div className='Error'>{mutation.data?.message}</div>}

            <Formik
                initialValues={{
                    email: '',
                    password: '',
                }}
                validationSchema={SignupSchema}
                onSubmit={postQueryLogin}
            >
                {({errors, touched}) => (
                    <Form>
                        <Card className='card'>
                            <CardContent className='card__fields'>
                                    <UiField
                                        id="email"
                                        name="email"
                                        variant="outlined"
                                        label="Enter your email"
                                        placeholder="Your email..."
                                        className="field"
                                    />
                                    {errors.email && touched.email ? (
                                        <div className='Error'>{errors.email}</div>
                                    ) : null}

                                    <UiField
                                        id="password"
                                        name="password"
                                        variant="outlined"
                                        label="Enter your password"
                                        placeholder="Enter your password..."
                                        className="field"
                                        type="password"
                                    />
                                    {errors.password && touched.password ? (
                                        <div className='Error'>{errors.password}</div>
                                    ) : null}
                            </CardContent>
                            <CardActions>
                                <Grid container spacing={3}>
                                    <Grid container justify="space-between" item xs={12}>
                                        <Link to="/sign-up">
                                            <Button variant="outlined" color="primary" type="submit">Sign Up</Button>
                                        </Link>
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
                        appId='282472323491532'
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

LoginContainer.propTypes = {
    name: initialValuesType.name
}

export default withRouter(LoginContainer);
