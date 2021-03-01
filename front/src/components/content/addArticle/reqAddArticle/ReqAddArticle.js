import { axiosReq } from "../../../../axios/axios";

const ReqAddArticle = async (data) => {
    console.log('ReqAddArticle ',data)
    return await axiosReq.post(`/posts`, data);
}

export {
    ReqAddArticle
}