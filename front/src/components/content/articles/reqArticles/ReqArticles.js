import { axiosReq } from "../../../../axios/axios";

const getPosts = async () => {
    return await axiosReq.get('/posts');
}

export {
    getPosts,
}