import './EditArticleStyle.scss';
import {Form, Formik} from "formik";
import React, {useEffect} from "react";
import * as Yup from "yup";
import {Link, useParams} from "react-router-dom";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import {UiSelect, UiTextarea} from "../../Components-ui/ComponentsUi";
import CardActions from "@material-ui/core/CardActions";
import Button from "@material-ui/core/Button";
import Cropper from "react-cropper";

export default function EditArticle({
                                        post, onEditSubmit,
                                        uploadImage, image, setCropFunc, setCroppedImgFunc, crroperedImg, visionBtnUploadImg, errorImg, visionPrevImg, status200}) {
    const { post_id } = useParams();

    const SignupSchema = Yup.object().shape({
        description: Yup.string()
            .required('required filed')
            .test('len', 'Must be max 255 characters', val => val && val.toString().length < 255 ),
    });

    return (
        <div className="EditArticle" >
            <h2 className="title">Edit Article</h2>

            {status200 && <p className="Success">Your post updated!</p>}

            <Formik
                initialValues={{
                    description: post[0]?.description || '',
                    available:  post[0]?.available || 'All'
                }}
                enableReinitialize={true}
                validationSchema={SignupSchema}
                onSubmit={onEditSubmit}
            >
                {({ errors, touched }) => (
                    <Form>
                        <Card className='card'>
                            <CardContent>
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

