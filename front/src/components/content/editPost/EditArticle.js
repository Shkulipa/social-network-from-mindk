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

export default function EditArticle({post, onEditSubmit}) {
    const { post_id } = useParams();

    const SignupSchema = Yup.object().shape({
        user_idPost: Yup.string()
            .min(1, 'Слишком короткий!')
            .max(15, 'Слишком длинный! Максимально 5ть символов')
            .required('Обязательное поле'),
        description: Yup.string()
            .min(1, 'Слишком короткий!')
            .max(880, 'Слишком длинный! Максимально 880 символов')
            .required('Обязательное поле'),
    });

    return (
        <div className="EditArticle" >
            <h2 className="title">Edit Article</h2>

            <Formik
                initialValues={{
                    user_idPost: post_id,
                    description: post[0]?.description || '',
                    available: 'all'
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

