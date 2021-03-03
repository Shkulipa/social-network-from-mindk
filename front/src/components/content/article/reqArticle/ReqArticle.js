import { axiosReq } from "../../../../axios/axios";

const getPost = async (id) => {
    return await axiosReq.get(`/posts/single_post/${id}`);
}

export {
    getPost
}