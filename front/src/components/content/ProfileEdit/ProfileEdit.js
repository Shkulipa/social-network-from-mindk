import {
    useParams
} from "react-router-dom";

function ProfileEdit() {
    let { action } = useParams();

    return (
        <div>
            {action}
        </div>

    );
}

export default ProfileEdit;
