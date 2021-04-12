import React, {useContext} from "react";
import {
    useParams
} from "react-router-dom";
import UserProfile from "./UserProfile";
import {useQuery} from "react-query";
import {getDataUser} from "./reqUserProfile/ReqDataUser";
import {Context} from "../../../authStore";

function UserProfileContainer() {
    //login user
    const { user } = useContext(Context)[0];

    //get data user
    const { user_id } = useParams();
    const {data} = useQuery('user', () => {
        if(user) {
            return getDataUser({id: parseInt(user_id, 10), userLoginId: user.user_id});
        } else {
            return getDataUser({id: parseInt(user_id, 10), userLoginId: 'not auth'});
        }
    })



    return  <UserProfile dataUser={data?.data || []}/>;
}

export default UserProfileContainer;
