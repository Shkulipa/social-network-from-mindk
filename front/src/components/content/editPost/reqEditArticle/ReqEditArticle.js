import { axiosReq } from "../../../../axios/axios";

const getPost = (id) => {
    return axiosReq.get(`/posts/${id}`);
}

const updatePost = async (data) => {
    return axiosReq.put(`/posts/update/${data.post_id}`, data);
}

export {
    getPost,
    updatePost
}