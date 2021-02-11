import PropTypes from 'prop-types';
import {Button, FormGroup, Input, Label} from 'reactstrap';
import {
    useParams
} from "react-router-dom";

function Profile({setNameForHook, name}) {
    let { profile_user } = useParams();

    if(profile_user && !name == '') {
        return (
            <>
                Welcome {name}!
            </>
        )
    }

    return (
        <>
            <form className="content__form" onSubmit={setNameForHook}>
                <FormGroup>
                    <Label for="exampleEmail">Введите ваше имя:</Label>
                    <Input type="text" name="name" id="name" placeholder="Ваше имя..." required/>
                </FormGroup>
                <FormGroup>
                    <Label for="exampleEmail">Введите вашу Фамилию:</Label>
                    <Input type="text" name="sername" id="sername" placeholder="Ваша фамиля..." required/>
                </FormGroup>
                <Button color="success" type="submit">Submit</Button>
            </form>
        </>

    );
}

const initialValuesType = {
    fileType: PropTypes.shape({
        id: PropTypes.number,
        name: PropTypes.string,
        path: PropTypes.string,
        size: PropTypes.number
    }),
    likesType: PropTypes.shape({
        userId: PropTypes.number,
        user: PropTypes.shape({id: PropTypes.number}),
        date: PropTypes.string
    }),
};

Profile.propTypes = {
    userData: PropTypes.shape({
        id: PropTypes.number,
        firstName: PropTypes.string,
        lastName: PropTypes.string,
        age: PropTypes.number,
        avatar: PropTypes.shape({
            fileId: PropTypes.number,
            file: initialValuesType.fileType
        }),
        friends: PropTypes.arrayOf(PropTypes.object),
        articles: PropTypes.arrayOf(PropTypes.shape({
            title: PropTypes.string,
            text: PropTypes.string,
            images: PropTypes.arrayOf(initialValuesType.fileType),
            createdAt: PropTypes.string,
            editedAt: PropTypes.string,
            likes: PropTypes.arrayOf(initialValuesType.likesType),
        })),
    }),
}

export default Profile;
