import { axiosReq } from "../../../../axios/axios";

const deletePost = async (data) => {
    return axiosReq.delete(`/posts/delete/${data.post_id}`, {data})
}

export {
    deletePost
}