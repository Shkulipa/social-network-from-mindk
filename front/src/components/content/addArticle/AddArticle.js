import {
    useMutation,
} from 'react-query';
import {ReqAddArticle} from './reqAddArticle/ReqAddArticle';
import {useCallback, useEffect} from "react";

function AddArticle() {
    const {mutate: addNewPost} = useMutation(ReqAddArticle);

    const onSubmit = useCallback( async formData => {
        try {
            const data = await addNewPost(formData);
            console.log(data);
        } catch(e) {
            console.log(e);
        }
    }, [addNewPost]);

    useEffect(() => onSubmit({description: 'some text', user_id: 456}),[]);

    return (
        <>
            This page to add Article
        </>

    );
}

export default AddArticle;
