import './EditProfile.scss';
import React, {useEffect} from "react";
import {Form, Formik} from "formik";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import {UiField, UiSelect} from "../../Components-ui/ComponentsUi";
import Button from "@material-ui/core/Button";
import CardActions from "@material-ui/core/CardActions";
import * as Yup from "yup";
import notAvatar from './../../../images/user-astronaut-solid.svg';
import Cropper from "react-cropper";


function ProfileEdit({
                         profile, onEditSubmit,
                         uploadImage, image, setCropFunc, setCroppedImgFunc, crroperedImg, visionBtnUploadImg, errorImg, visionPrevImg, status200
                     }) {
    const validProfileEdit = Yup.object().shape({
        user_id: Yup.number()
            .positive()
            .integer()
            .required('required field'),
        name: Yup.string()
            .required('required field'),
        email: Yup.string()
            .email('Please enter correct your email')
            .required('required field'),
        phone: Yup.number()
            .required('required field').positive().integer(),
        university: Yup.string()
            .min(1, 'Too short!')
            .max(99, 'Too long! Maximum 99 characters'),
    });

    useEffect(()=>{}, [profile]);

    return (
        <div className="edit-profile">
            <h2 className="title">My Profile</h2>

            {status200 && <p className="Success">Your post updated!</p>}

            <Formik
                initialValues={{
                    user_id: profile[0]?.user_id || '',
                    user_id_available: profile[0]?.user_id_available || 'All',

                    name: profile[0]?.name_user || '',
                    name_available: profile[0]?.name_available || 'All',

                    email: profile[0]?.email_user || '',
                    email_available: profile[0]?.email_available || 'All',

                    phone: profile[0]?.phone || '',
                    phone_available: profile[0]?.phone_available || 'All',

                    university:  profile[0]?.university || '',
                    university_available: profile[0]?.university_available || 'All'
                }}
                validationSchema={validProfileEdit}
                onSubmit={onEditSubmit}
            >
                {({ errors, touched }) => (
                    <Form>
                        <Card className="edit-profile-form">
                            <CardContent className="profile">
                                <CardContent className="left-side">
                                    <CardContent className="two-fields">
                                        <div className="field-and-err">
                                            <UiField
                                                id="user_id"
                                                name="user_id"
                                                variant="outlined"
                                                label="User ID*"
                                                placeholder="Your ID..."
                                                className="field"
                                            />
                                            {errors.user_id && touched.user_id ? (
                                                <div className='error'>
                                                    {errors.user_id.includes('user_id must be a `number` type') ? 'Only numbers' : errors.user_id}
                                                </div>
                                            ) : null}
                                        </div>


                                        <UiSelect
                                            labelId="user_id_available"
                                            id="user_id_available"
                                            label="available"
                                            name="user_id_available"
                                            className="field field-available"
                                            selectValues={
                                                [
                                                    {val: 'All', text: 'All'},
                                                    {val: 'Friends', text: 'Friends'},
                                                    {val: 'Only Me', text: 'Only Me'},
                                                ]
                                            }
                                        />
                                    </CardContent>

                                    <CardContent className="two-fields">
                                        <div className="field-and-err">
                                            <UiField
                                                id="name"
                                                name="name"
                                                variant="outlined"
                                                label="Your name*"
                                                placeholder="Your name..."
                                                className="field"
                                            />
                                            {errors.name && touched.name ? (
                                                <div className='error'>{errors.name}</div>
                                            ) : null}
                                        </div>

                                        <UiSelect
                                            labelId="name_available"
                                            id="name_available"
                                            label="available"
                                            name="name_available"
                                            className="field field-available"
                                            selectValues={
                                                [
                                                    {val: 'All', text: 'All'},
                                                    {val: 'Friends', text: 'Friends'},
                                                    {val: 'Only Me', text: 'Only Me'},
                                                ]
                                            }
                                        />
                                    </CardContent>

                                    <CardContent className="two-fields">
                                        <div className="field-and-err">
                                            <UiField
                                                id="email"
                                                name="email"
                                                variant="outlined"
                                                label="Your email*"
                                                placeholder="Your email..."
                                                className="field"
                                            />
                                            {errors.email && touched.email ? (
                                                <div className='error'>{errors.email}</div>
                                            ) : null}
                                        </div>

                                        <UiSelect
                                            labelId="email_available"
                                            id="email_available"
                                            label="available"
                                            name="email_available"
                                            className="field field-available"
                                            selectValues={
                                                [
                                                    {val: 'All', text: 'All'},
                                                    {val: 'Friends', text: 'Friends'},
                                                    {val: 'Only Me', text: 'Only Me'},
                                                ]
                                            }
                                        />
                                    </CardContent>

                                    <CardContent className="two-fields">
                                        <div className="field-and-err">
                                            <UiField
                                                id="phone"
                                                name="phone"
                                                variant="outlined"
                                                label="Your phone*"
                                                placeholder="0507897810..."
                                                className="field"
                                            />
                                            {errors.phone && touched.phone ? (
                                                <div className='error'>
                                                    {errors.phone.includes('phone must be a `number` type') ? 'Only numbers' : errors.phone}
                                                </div>
                                            ) : null}
                                        </div>

                                        <UiSelect
                                            labelId="phone_available"
                                            id="phone_available"
                                            label="available"
                                            name="phone_available"
                                            className="field field-available"
                                            selectValues={
                                                [
                                                    {val: 'All', text: 'All'},
                                                    {val: 'Friends', text: 'Friends'},
                                                    {val: 'Only Me', text: 'Only Me'},
                                                ]
                                            }
                                        />
                                    </CardContent>

                                    <CardContent className="two-fields">
                                        <div className="field-and-err">
                                            <UiField
                                                id="university"
                                                name="university"
                                                variant="outlined"
                                                label="Your university"
                                                placeholder="Your university..."
                                                className="field"
                                            />
                                            {errors.university && touched.university ? (
                                                <div className='error'>{errors.university}</div>
                                            ) : null}
                                        </div>

                                        <UiSelect
                                            labelId="university_available"
                                            id="university_available"
                                            label="available"
                                            name="university_available"
                                            className="field field-available"
                                            selectValues={
                                                [
                                                    {val: 'All', text: 'All'},
                                                    {val: 'Friends', text: 'Friends'},
                                                    {val: 'Only Me', text: 'Only Me'},
                                                ]
                                            }
                                        />
                                    </CardContent>
                                </CardContent>

                                <CardContent className="right-side">
                                    {!profile[0]?.avatar_img && visionPrevImg && <img className="avatar-img" src={notAvatar} alt=""/>}
                                    {profile[0]?.avatar_img && visionPrevImg && <img className="avatar-img" src={`http://localhost:3000/images/avatars/${profile[0]?.avatar_img}`} alt=""/>}

                                    {image && !crroperedImg && <Cropper
                                        src={image}
                                        onInitialized={item => setCropFunc(item)}
                                        autoCropArea={1}
                                        movable={false}
                                        zoomable={false}
                                        initialAspectRatio={1 / 1}
                                    />}
                                    {crroperedImg &&
                                        <div className="crroperedImg">
                                            <img className="avatar-img" src={crroperedImg} alt=""/>
                                        </div>
                                    }

                                    {visionBtnUploadImg && <div className="btn-upload-img">
                                        <Button variant="contained" color="primary" component="label">
                                            Change Image
                                            <input onChange={uploadImage} hidden type="file"/>
                                        </Button>
                                    </div>}

                                    {image && !crroperedImg && <div className="btn-upload-img">
                                        <Button variant="contained" color="primary" onClick={setCroppedImgFunc}>
                                            Crop
                                        </Button>
                                    </div>}


                                    {errorImg &&
                                    <div className='error'>Sorry, but Your img should be type: PNG, JPEG, JPG and hasn't bigger
                                        10MB and have name length not bigger than 255 characters</div>}
                                </CardContent>
                            </CardContent>

                            <CardActions className="btns">
                                <Button className="btn" variant="contained" size="large" color="primary" type="submit">Save</Button>
                            </CardActions>
                        </Card>
                    </Form>
                )}
            </Formik>
        </div>
    );
}

export default ProfileEdit;
