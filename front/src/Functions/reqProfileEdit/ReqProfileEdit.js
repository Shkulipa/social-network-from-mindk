import {axiosReq} from "../../axios/axios";

const updateProfile = async (data) => {
    return axiosReq.put(`/profile/update/${data.user_id}`, {
        user: {
            permission: data.permission,
            user_id: data.user_id,
            user_token: data.user_token,
        },
        ...data
    });
}

export {
    updateProfile
}