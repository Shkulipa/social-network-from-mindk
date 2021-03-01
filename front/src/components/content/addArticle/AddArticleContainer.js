import {
    useMutation,
} from 'react-query';
import {ReqAddArticle} from './reqAddArticle/ReqAddArticle';
import React, {useCallback} from "react";
import AddArticle from "./AddArticle";

function AddArticleContainer() {
    const mutation = useMutation(ReqAddArticle)

    // const {mutate: addNewPost} = useMutation(ReqAddArticle);

    const onSubmit = useCallback( async formData => {
        try {
            await mutation.mutate(formData);
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
