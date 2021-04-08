import {useContext, useEffect} from 'react';
import {Context} from "../authStore";
import { useHistory } from "react-router-dom";

const loginPath = '/login';
const homePath = '/posts';

export default function useRequireAuth(invert) {
    let history = useHistory();
    const { user } = useContext(Context)[0];

    useEffect(() => {
        if (!user) {
            history.push(loginPath);
        } else if (invert) {
            history.push(homePath);
        }
    }, [user]);
}
