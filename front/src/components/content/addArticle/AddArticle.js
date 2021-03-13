import './AddArticleStyle.scss';
import React from "react";
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import {UiField, UiSelect, UiTextarea} from "../../Components-ui/ComponentsUi";
import CardContent from "@material-ui/core/CardContent";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import Button from "@material-ui/core/Button";

function AddArticle({onSubmit}) {

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
        <div className='AddArticle'>
            <h2>Add article page</h2>

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
                                <Button className="btn" variant="contained" color="primary" type="submit">Add Article</Button>
                            </CardActions>
                        </Card>
                    </Form>

                )}
            </Formik>
        </div>
    );
}

export default AddArticle;
