import { axiosReq } from "../../../../axios/axios";

const getDataUser = async data => await axiosReq.post(`/profile/${data.id}`, {userLoginId: data.userLoginId});

export {
    getDataUser
}