import { useCallback } from "react";
import useAuth from "./useAuth";
import { axiosReq } from "../axios/axios";

export default function useApi() {
    const { accessToken, refreshToken, refresh } = useAuth();

    const callApiLogged = useCallback(async (items) => {
        const { url, method = "get", data = {} } = items;

        let token;
        if (accessToken) {
            const now = new Date();
            const expires = new Date(accessToken.expires);
            now.setMinutes(now.getMinutes() + 1);
            if (now.getTime() < expires.getTime()) {
                token = accessToken.token;
            }
        }
        if (!token && refreshToken) {
            token = await refresh();
        }
        if (token) {
            return axiosReq({
                method,
                url,
                data,
                headers: { Authorization: `${token}` },
            });
        }

        return false;
    }, []);

    const callApiNotLogged = useCallback(
        async (url, method = "get", data = {}) => {
            const response = await axiosReq({
                method,
                url,
                data,
            });

            return response.data;
        },
        []
    );

    return {
        callApiLogged,
        callApiNotLogged,
    };
}
