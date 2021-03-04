import './AddArticleStyle.scss';
import React from "react";
import { Formik, Field, Form } from 'formik';
import * as Yup from 'yup';


function AddArticle({onSubmit}) {
    const SignupSchema = Yup.object().shape({
        user_id: Yup.string()
            .min(1, 'Слишком короткий!')
            .max(5, 'Слишком длинный! Максимально 5ть символов')
            .required('Обязательное поле'),
        description: Yup.string()
            .min(1, 'Слишком короткий!')
            .max(880, 'Слишком длинный! Максимально 880 символов')
            .required('Обязательное поле'),
    });

    const test = () => {
        console.log(1);
    }

    return (
        <div className='AddArticle'>
            This page to add Article

            <Formik
                initialValues={{
                    user_id: '',
                    description: '',
                    available: 'all'
                }}
                validationSchema={SignupSchema}
                onSubmit={test}
            >
                {({errors, touched}) => (
                    <Form className='formik'>
                        <label htmlFor="user_id">User ID:</label>
                        <Field id="user_id" name="user_id" placeholder="Your user id..."/>
                        {errors.user_id && touched.user_id ? (
                            <div className='Error'>{errors.user_id}</div>
                        ) : null}

                        <label htmlFor="available">Available:</label>
                        <Field as="select" id="available" name="available" placeholder="Available for...">
                            <option value="all">All</option>
                            <option value="friends">Friends</option>
                            <option value="only-me">Only Me</option>
                        </Field>

                        <label htmlFor="description">Description</label>
                        <Field className='textarea' maxLength="880" as="textarea" id="description" name="description"
                               placeholder="Description..."/>
                        {errors.description && touched.description ? (
                            <div className='Error'>{errors.description}</div>
                        ) : null}

                        <button className='btn' type="submit">Submit</button>
                    </Form>
                )}
            </Formik>
        </div>
    );
}

export default AddArticle;
