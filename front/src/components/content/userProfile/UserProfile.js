import {
    useParams
} from "react-router-dom";

function UserProfile() {
    let { view_user } = useParams();

    return (
        <div>
            Profile of User ID: {view_user}
        </div>

    );
}

export default UserProfile;
