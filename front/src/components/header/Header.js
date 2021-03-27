import './Header.scss';
import "cropperjs/dist/cropper.css";

import Logo from './components/logo/logo';
import HeaderNav from "./components/headerNav/HeaderNav";
import {UiField, UiSelect, UiTextarea} from "../Components-ui/ComponentsUi";

import React from "react";
import PropTypes from 'prop-types';
import {Link} from "react-router-dom";
import {Form, Formik} from "formik";
import * as Yup from "yup";


import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import CardActions from "@material-ui/core/CardActions";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Popper from '@material-ui/core/Popper';
import Fade from '@material-ui/core/Fade';
import Cropper from "react-cropper";


function Header({name,
                onSubmit, handleClickOpen, open, handleClose,
                id, anchorEl, openProfileMenu, handleClickPopover,
                uploadImage, image, setCropFunc, setCroppedImgFunc, crroperedImg, visionBtnUploadImg}) {
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

                <button className="btn-Header-popper" aria-describedby={id} type="button" onClick={handleClickPopover}>
                    <HeaderNav name={name}/>
                </button>
                <Popper className="Header-popper" open={openProfileMenu} elevation={3} id={id} anchorEl={anchorEl} transition>
                    {({ TransitionProps }) => (
                        <Fade {...TransitionProps} timeout={350}>
                            <div className="Header-popper__items">
                                <Link to="/settings">Profile Edit</Link>
                                <Link to="/get-avatar">Get img Avatar</Link>
                            </div>
                        </Fade>
                    )}
                </Popper>
            </header>

            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle className="addArticle-popup-title" id="alert-dialog-title">{"For add new article, fill all fields"}</DialogTitle>
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
                        {({errors, touched}) => (
                            <Form encType="multipart/form-data">
                                <Card className='addArticle-popup'>
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

                                        {visionBtnUploadImg && <div className="btn-upload-img">
                                            <Button variant="contained" color="primary" component="label">
                                                {!image && !crroperedImg ? "Upload Image" : "Change Image"}
                                                <input onChange={uploadImage} hidden type="file"/>
                                            </Button>
                                        </div>
                                        }
                                        {image && !crroperedImg && <div className="btn-upload-img">
                                            <Button variant="contained" color="primary" onClick={setCroppedImgFunc}>
                                                Crop
                                            </Button>
                                        </div>}

                                        {image && !crroperedImg && <Cropper
                                                        src={image}
                                                        onInitialized={item => setCropFunc(item)}
                                                        autoCropArea={1}
                                                        movable={false}
                                                        zoomable={false}
                                        />}
                                        {crroperedImg && <img src={crroperedImg} alt=""/>}
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

