import React, { useContext } from "react";
import { useParams } from "react-router-dom";
import UserProfile from "./UserProfile";
import { useQuery } from "react-query";
import { Context } from "../../../authStore";
import useApi from "../../../hooks/useApi";

function UserProfileContainer() {
	const { callApiLogged } = useApi();

	// login user
	const { user } = useContext(Context)[0];

	// get data user
	const { userId } = useParams();
	const { data } = useQuery(`user ${userId}`, () => {
		if (user) {
			return callApiLogged({
				url: `/profile/${parseInt(userId, 10)}`,
				method: "POST",
				data: { userLoginId: user.userId },
			});
		} else {
			return callApiLogged({
				url: `/profile/${parseInt(userId, 10)}`,
				method: "POST",
				data: { userLoginId: "not auth" },
			});
		}
	});

	return <UserProfile dataUser={data?.data || {}} />;
}

export default UserProfileContainer;
