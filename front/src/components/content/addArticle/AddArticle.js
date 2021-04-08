import './AddArticleStyle.scss';
import React from "react";
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import {UiSelect, UiTextarea} from "../../Components-ui/ComponentsUi";
import CardContent from "@material-ui/core/CardContent";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import Button from "@material-ui/core/Button";

function AddArticle({onSubmit}) {
    const SignupSchema = Yup.object().shape({
        description: Yup.string()
            .required('required field'),
    });

    return (
        <div className='ContainerWrapper'>
            <h2>Add article page</h2>

            <Formik
                initialValues={{
                    description: '',
                    available: 'all'
                }}
                validationSchema={SignupSchema}
                onSubmit={onSubmit}
            >
                {({errors, touched}) => (
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
