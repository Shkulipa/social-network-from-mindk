import { axiosReq } from "../../../../axios/axios";

const getPost = async (id) => {
    return await axiosReq.get(`/posts/${id}`);
}

const updatePost = async (data) => {
    return axiosReq.put(`/posts/update/${data.user_idPost}`, data);
}

export {
    getPost,
    updatePost
}