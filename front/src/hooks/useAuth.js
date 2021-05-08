import { useCallback, useContext } from "react";
import axios from "axios";
import { Context } from "../authStore";

export default function useAuth() {
	const [state, dispatch] = useContext(Context);
	const refresh = useCallback(() => {
		if (state.refreshToken && state.refreshToken.expires) {
			const now = new Date();
			const expires = new Date(state.refreshToken.expires);

			if (now.getTime() < expires.getTime()) {
				return axios
					.post("http://localhost:3000/refresh-tokens", {
						refreshToken: state.refreshToken.token,
					})
					.then((res) => {
						dispatch({
							type: "SET_AUTH",
							payload: {
								user: res.data.userInfo,
								accessToken: res.data.tokens.access,
								refreshToken: res.data.tokens.refresh,
							},
						});
						localStorage.setItem(
							"refreshToken",
							JSON.stringify(res.data.tokens.refresh)
						);

						return res.data.tokens.access.token;
					})
					.catch(() => {
						dispatch({
							type: "SET_AUTH",
							payload: {
								user: null,
								accessToken: null,
								refreshToken: null,
							},
						});
						localStorage.removeItem("refreshToken");
					});
			} else {
				dispatch({
					type: "SET_AUTH",
					payload: {
						user: null,
						accessToken: null,
						refreshToken: null,
					},
				});
				localStorage.removeItem("refreshToken");
			}
		}

		return false;
	}, [state]);

	const login = useCallback(
		({ email, password }) =>
			axios
				.post("http://localhost:3000/login", {
					email,
					password,
				})
				.then((res) => {
					if (res.data.message) {
						return res.data;
					} else {
						dispatch({
							type: "SET_AUTH",
							payload: {
								user: res.data.userInfo,
								accessToken: res.data.tokens.access,
								refreshToken: res.data.tokens.refresh,
							},
						});
						localStorage.setItem(
							"refreshToken",
							JSON.stringify(res.data.tokens.refresh)
						);
					}
				}),
		[]
	);

	const loginSocial = useCallback((user, social) => {
		const token = user._token.accessToken;

		axios
			.post(`http://localhost:3000/login/social/${social}`, user, {
				headers: {
					"Content-Type": "application/json",
					authorization: `${token}`,
				},
			})
			.then((res) => {
				if (res.data.message) {
					return res.data;
				} else {
					dispatch({
						type: "SET_AUTH",
						payload: {
							user: res.data.userInfo[0],
							accessToken: res.data.tokens.access,
							refreshToken: res.data.tokens.refresh,
						},
					});
					localStorage.setItem("refreshToken", JSON.stringify(res.data.tokens.refresh));
				}
			});
	}, []);

	const logout = useCallback(async () => {
		if (state.refreshToken) {
			return axios
				.post("http://localhost:3000/logout", {
					refreshToken: state.refreshToken.token,
				})
				.finally(() => {
					dispatch({
						type: "SET_AUTH",
						payload: {
							user: null,
							accessToken: null,
							refreshToken: null,
						},
					});
					localStorage.removeItem("refreshToken");
				});
		}

		return false;
	}, [state]);

	return {
		user: state.user,
		accessToken: state.accessToken,
		refreshToken: state.refreshToken,
		refresh,
		login,
		logout,
		loginSocial,
	};
}
