import './AddArticleStyle.scss';
import React from "react";
import { useFormik } from 'formik';
import {Button, FormGroup, Input, Label, Form} from 'reactstrap';


function AddArticle({onSubmit}) {

    const asd = (data) => {
        console.log(data);
    }

    const formik = useFormik({
        initialValues: {
            user_id: '',
            description: ''
        },
        onSubmit: values => {
            asd(values);
        },
    });

    return (
        <div className='AddArticle'>
            This page to add Article

            <Form className='Form' onSubmit={formik.handleSubmit}>
                <FormGroup>
                    <Label htmlFor="user_id">User ID:</Label>
                    <Input id="user_id" name="user_id" type="text" placeholder="Your user id..." onChange={formik.handleChange} value={formik.values.user_id}/>
                </FormGroup>

                <FormGroup>
                    <Label htmlFor="description">Description:</Label>
                    <Input id="description" name="description" placeholder="Description..." onChange={formik.handleChange} value={formik.values.description}/>
                </FormGroup>
                <Button color="primary" type="submit">Submit</Button>
            </Form>

            {/*<Formik
                initialValues={{
                    user_id: '',
                    description: '',
                }}
                onSubmit={ (values) => asd(values)}
            >
                <Form className='formik'>
                    <label htmlFor="user_id">User ID:</label>
                    <Field id="user_id" name="user_id" placeholder="Your user id..." />

                    <label htmlFor="description">Description</label>
                    <Field id="description" name="description" placeholder="Description..." />

                    <button className='btn' type="submit">Submit</button>
                </Form>
            </Formik>*/}
            {/*<button
                onClick={() => onSubmit({user_id: 4599, description: 'some text'})}
            >
                Add Post
            </button>*/}
        </div>

    );
}

export default AddArticle;
