import './EditArticleStyle.scss';
import {Field, Form, Formik} from "formik";
import React from "react";
import * as Yup from "yup";

export default function EditArticle({post}) {
    // const post_id = post[0]?.post_id || '';

    const test = (data) => {
        console.log(data);
    }

    const SignupSchema = Yup.object().shape({
        user_idField: Yup.string()
            .min(1, 'Слишком короткий!')
            .max(5, 'Слишком длинный! Максимально 5ть символов')
            .required('Обязательное поле'),
        descriptionField: Yup.string()
            .min(1, 'Слишком короткий!')
            .max(880, 'Слишком длинный! Максимально 880 символов')
            .required('Обязательное поле'),
    });

    return (
        <>
            {post.map(({description, post_id}) => (
                <div className='EditArticle' key={post_id}>
                    Page: Edit Article

                    <Formik
                        initialValues={{
                            user_id: post_id,
                            description: description,
                            available: 'all'
                        }}
                        validationSchema={SignupSchema}
                        onSubmit={test}
                    >
                        {({ errors, touched }) => (
                            <Form className='formik'>
                                <label htmlFor="user_id">User ID:</label>
                                <Field id="user_id" name="user_id" placeholder="Your user id..." />
                                {errors.user_idField && touched.user_idField ? (
                                    <div className='Error'>{errors.user_idField}</div>
                                ) : null}

                                <label htmlFor="available">Available:</label>
                                <Field as="select" id="available"  name="available" placeholder="Available for...">
                                    <option value="all">All</option>
                                    <option value="friends">Friends</option>
                                    <option value="only-me">Only Me</option>
                                </Field>

                                <label htmlFor="description">Description</label>
                                <Field className='textarea' maxLength="880" as="textarea" id="description"  name="description" placeholder="Description..." />
                                {errors.user_id && touched.descriptionField ? (
                                    <div className='Error'>{errors.descriptionField}</div>
                                ) : null}

                                <button className='btn' type="submit">Submit</button>
                            </Form>
                        )}
                    </Formik>
                </div>
            ))}

        </>
    );
}

