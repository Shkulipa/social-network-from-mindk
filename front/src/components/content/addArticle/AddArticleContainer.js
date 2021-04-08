import {
    useMutation,
} from 'react-query';
import {ReqAddArticle} from './reqAddArticle/ReqAddArticle';
import React, {useCallback, useContext} from "react";
import AddArticle from "./AddArticle";
import {Context} from "../../../authStore";

function AddArticleContainer() {
    const { user } = useContext(Context)[0];

    //post post
    const mutation = useMutation(ReqAddArticle);

    const onSubmit = useCallback( async formData => {
        try {
            await mutation.mutate({ user_id: user.user_id, ...formData});
        } catch(e) {
            console.log(e);
        }
    }, [mutation]);

    return (
        <>
            <AddArticle onSubmit={onSubmit}/>
        </>

    );
}

export default AddArticleContainer;
