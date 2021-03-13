import { axiosReq } from "../../../../axios/axios";

const getPosts = async (page) => {
    return await axiosReq.get(`/posts?page=${page}&limit=7`);
}

export {
    getPosts,
}