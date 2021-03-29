import {axiosReq} from "../../axios/axios";

const getProfile = async (id) => {
    return await axiosReq.get(`/profile/${id}`);
}

const updateProfile = async (data) => {
    return axiosReq.put(`/profile/update/${data.user_id}`, data);
}

export {
    getProfile,
    updateProfile
}