import { axiosReq } from "../../../../axios/axios";

const ReqLogin = async (data) => {
    return await axiosReq.post(`/login`, data);
}

export {
    ReqLogin
}