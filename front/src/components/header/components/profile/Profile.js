import PropTypes from 'prop-types';

function Profile({setNameForHook, userData}) {

    return (
        <>
            <form className="content__form" onSubmit={setNameForHook}>
                Введите ваше имя:
                <input type="text" name={"first name"} required/>
                Введите вашу фамилию:
                <input type="text" name={"last name"} required/>
                <button type="submit">Submit</button>
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
