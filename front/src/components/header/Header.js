import './Header.scss';
import Logo from './components/logo/logo';
import HeaderNav from "./components/headerNav/HeaderNav";
import PropTypes from 'prop-types';
import {Link} from "react-router-dom";
import React from "react";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import {Form, Formik} from "formik";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import {UiField, UiSelect, UiTextarea} from "../Components-ui/ComponentsUi";
import CardActions from "@material-ui/core/CardActions";
import * as Yup from "yup";

function Header({name, onSubmit, handleClickOpen, open, handleClose}) {
    let user_link;
    if(!name) {
        user_link = 'not_authorized';
    } else {
        user_link = name.toString().replace(' ', '_');
    }

    const SignupSchema = Yup.object().shape({
        user_id: Yup.string()
            .min(1, 'Too short! Too short! Enter please min 1 character!')
            .max(5, 'Too long! Enter please max 5 character!')
            .required('required field'),
        description: Yup.string()
            .min(1, 'Too short! Too short! Enter please min 1 character!')
            .max(880, 'Too long! Enter please max 880 character!')
            .required('required field'),
    });

    return (
        <div className="container">
            <header className="header">
                <Logo/>

                <Button variant="outlined" color="primary" onClick={handleClickOpen}>
                    Add Article
                </Button>

                <Link to="/posts">Articles</Link>
                <Link to={`/profile/${user_link}`}>Profile</Link>

                <HeaderNav name={name}/>
            </header>

            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">{"Use Google's location service?"}</DialogTitle>
                <DialogContent>
                    <Formik
                        initialValues={{
                            user_id: '',
                            description: '',
                            available: 'all'
                        }}
                        validationSchema={SignupSchema}
                        onSubmit={onSubmit}
                    >
                        {({errors, touched, values, handleChange}) => (
                            <Form>
                                <Card className='card'>
                                    <CardContent>
                                        <UiField
                                            id="user_id"
                                            name="user_id"
                                            variant="outlined"
                                            label="User ID*"
                                            placeholder="Your ID..."
                                            className="field"
                                        />
                                        {errors.user_id && touched.user_id ? (
                                            <div className='Error'>{errors.user_id}</div>
                                        ) : null}


                                        <UiSelect
                                            labelId="available-label"
                                            id="available"
                                            label="Available"
                                            name="available"
                                            className="field"
                                            selectValues={
                                                [
                                                    {val: 'all', text: 'All'},
                                                    {val: 'friends', text: 'Friends'},
                                                    {val: 'only-me', text: 'Only Me'},
                                                ]
                                            }
                                        />

                                        <UiTextarea
                                            id="description"
                                            name="description"
                                            label="Description*"
                                            multiline
                                            variant="outlined"
                                            placeholder="Your text..."
                                            rowsMax={15}
                                            className="field"
                                        />
                                        {errors.description && touched.description ? (
                                            <div className='Error'>{errors.description}</div>
                                        ) : null}
                                    </CardContent>
                                    <CardActions>
                                        <Button className="btn" variant="contained" color="primary" type="button" onClick={handleClose} >
                                            Cancel
                                        </Button>
                                        <Button className="btn" variant="contained" color="primary" type="submit">Add Article</Button>
                                    </CardActions>
                                </Card>
                            </Form>

                        )}
                    </Formik>
                </DialogContent>
            </Dialog>
        </div>
    );
}

Header.propTypes = {
    setPageForHook: PropTypes.func,
    name: PropTypes.string
}

export default Header;

