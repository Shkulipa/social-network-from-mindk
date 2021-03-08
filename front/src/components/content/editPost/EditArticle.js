import './EditArticleStyle.scss';
import {Field, Form, Formik} from "formik";
import React, {useEffect} from "react";
import * as Yup from "yup";
import {useParams} from "react-router-dom";

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
        <>
                <div className='EditArticle' >
                    Page: Edit Article

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
                            <Form className='formik'>
                                <label htmlFor="user_idPost">User ID:</label>
                                <Field id="user_idPost" name="user_idPost" placeholder="Your user id..." />
                                {errors.user_idPost && touched.user_idPost ? (
                                    <div className='Error'>{errors.user_idPost}</div>
                                ) : null}

                                <label htmlFor="available">Available:</label>
                                <Field as="select" id="available"  name="available" placeholder="Available for...">
                                    <option value="all">All</option>
                                    <option value="friends">Friends</option>
                                    <option value="only-me">Only Me</option>
                                </Field>

                                <label htmlFor="description">Description</label>
                                <Field className='textarea' maxLength="880" as="textarea" id="description"  name="description" placeholder="Description..." />
                                {errors.user_id && touched.description ? (
                                    <div className='Error'>{errors.description}</div>
                                ) : null}

                                <button className='btn' type="submit">Submit</button>
                            </Form>
                        )}
                    </Formik>
                </div>

        </>
    );
}

