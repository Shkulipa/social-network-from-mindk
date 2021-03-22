import React, {useCallback, useEffect, useState} from "react";
import {useQuery} from "react-query";
import {axiosReq} from "../../../axios/axios";
import {Form, Formik} from "formik";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import {UiField} from "../../Components-ui/ComponentsUi";
import CardActions from "@material-ui/core/CardActions";
import Button from "@material-ui/core/Button";
import * as Yup from "yup";


function GetAvatarContainer() {
    const SignupSchema = Yup.object().shape({
        user_id: Yup.string()
            .min(1, 'Too short! Too short! Enter please min 1 character!')
            .max(5, 'Too long! Enter please max 5 character!')
            .required('required field'),
    });

    const localhost = "http://localhost:3000/images/avatars/"

    const [user, setUser] = useState([]);

    const getAvatar = async (userId) => {
        return await axiosReq.post(`/profile/search`, userId);
    }

    const { data, refetch } = useQuery(['search', user], () => getAvatar(user));

    const onSubmit = (el) => {
        setUser(el);
    }

    useEffect(() => refetch(), [user]);

    const {avatar_img} = data?.data[0] || [];

    return (
        <div className="ContainerWrapper">
            <h2>getAvatar</h2>

            <Formik
                initialValues={{
                    user_id: '',
                }}
                validationSchema={SignupSchema}
                onSubmit={onSubmit}
            >
                {({errors, touched}) => (
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
                            </CardContent>
                            <CardActions>
                                <Button className="btn" variant="contained" color="primary" type="submit">Get user avatar</Button>
                            </CardActions>
                        </Card>
                    </Form>
                )}
            </Formik>

            <div>
                <img src={localhost + avatar_img} alt=""/>
            </div>

        </div>

    );
}

export default GetAvatarContainer;
