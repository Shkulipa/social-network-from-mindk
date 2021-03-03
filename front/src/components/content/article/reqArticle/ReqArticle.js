import { axiosReq } from "../../../../axios/axios";

const getPost = async (id) => {
    return await axiosReq.get(`/posts/${id}`);
}

export {
    getPost,
}