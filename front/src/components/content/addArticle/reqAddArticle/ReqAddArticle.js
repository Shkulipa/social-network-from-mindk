import { axiosReq } from "../../../../axios/axios";

const ReqAddArticle = async (data) => {
    return await axiosReq.post(`/posts`, data);
}

export {
    ReqAddArticle
}