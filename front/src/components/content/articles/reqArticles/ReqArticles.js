import { axiosReq } from "../../../../axios/axios";

const getPosts = async (page) => {
    return await axiosReq.get(`/posts/limit_post?page=${page}&limit=3`);
}

export {
    getPosts,
}