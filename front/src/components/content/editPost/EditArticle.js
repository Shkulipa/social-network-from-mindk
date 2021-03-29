import './EditArticleStyle.scss';
import {Form, Formik} from "formik";
import React from "react";
import * as Yup from "yup";
import {Link, useParams} from "react-router-dom";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import {UiField, UiSelect, UiTextarea} from "../../Components-ui/ComponentsUi";
import CardActions from "@material-ui/core/CardActions";
import Button from "@material-ui/core/Button";
import Cropper from "react-cropper";

export default function EditArticle({
                                        post, onEditSubmit,
                                        uploadImage, image, setCropFunc, setCroppedImgFunc, crroperedImg, visionBtnUploadImg, errorImg, visionPrevImg, status200}) {
    const { post_id } = useParams();

    const SignupSchema = Yup.object().shape({
        user_idPost: Yup.string()
            .positive()
            .integer()
            .required('required filed'),
        description: Yup.string()
            .required('required filed'),
    });



    return (
        <div className="EditArticle" >
            <h2 className="title">Edit Article</h2>

            {status200 && <p className="Success">Your post updated!</p>}

            <Formik
                initialValues={{
                    user_idPost: post_id,
                    description: post[0]?.description || '',
                    available:  post[0]?.available || 'all'
                }}
                validationSchema={SignupSchema}
                onSubmit={onEditSubmit}
            >
                {({ errors, touched }) => (
                    <Form>
                        <Card className='card'>
                            <CardContent>
                                <UiField
                                    id="user_idPost"
                                    name="user_idPost"
                                    variant="outlined"
                                    label="User ID*"
                                    placeholder="Your ID..."
                                    className="field"
                                />
                                {errors.user_idPost && touched.user_idPost ? (
                                    <div className='Error'>{errors.user_idPost}</div>
                                ) : null}


                                <UiSelect
                                    labelId="available-label"
                                    id="available"
                                    label="Available"
                                    name="available"
                                    className="field"
                                    selectValues={
                                        [
                                            {val: 'All', text: 'All'},
                                            {val: 'Friends', text: 'Friends'},
                                            {val: 'Only Me', text: 'Only Me'},
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


                            {post[0]?.post_img && visionPrevImg && <img
                                className={'card__img'}
                                src={`http://localhost:3000/images/posts/${post[0]?.post_img.toString()}`}
                                alt=""
                            />}

                            {visionBtnUploadImg && <div className="btn-upload-img">
                                <Button variant="contained" color="primary" component="label">
                                    Change Image
                                    <input onChange={uploadImage} hidden type="file"/>
                                </Button>
                            </div>}

                            {errorImg &&
                            <div className='Error'>Sorry, but Your img should be type: PNG, JPEG, JPG and hasn't bigger
                                10MB and have name length not bigger than 255 characters</div>}

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
                            {crroperedImg &&
                            <div className="crroperedImg">
                                <img src={crroperedImg} alt=""/>
                            </div>
                            }

                            <CardActions className="btns">
                                <Link className="link" to={`/posts/${post_id}`}>
                                    <Button className="btn" variant="contained" color="secondary" type="button">Cancel</Button>
                                </Link>
                                <Button className="btn" variant="contained" color="primary" type="submit">Update</Button>
                            </CardActions>
                        </Card>
                    </Form>
                )}
            </Formik>
        </div>
    );
}

