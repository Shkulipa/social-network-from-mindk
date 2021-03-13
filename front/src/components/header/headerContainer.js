import {
    useMutation,
} from 'react-query';
import {ReqAddArticle} from './ReqAddArticle-2';
import Header from "./Header";
import React, {useCallback} from "react";

function HeaderContainer({setUpdateForHook, update}) {
    const mutation = useMutation(ReqAddArticle);

    const onSubmit = useCallback( async formData => {
        try {
            await mutation.mutate(formData);
            handleClose();
            setUpdateForHook(update + 1);
        } catch(e) {
            console.log(e);
        }
    }, [mutation]);

    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <>
            <Header
                open={open}
                handleClickOpen={handleClickOpen}
                handleClose={handleClose}
                onSubmit={onSubmit}/>
        </>

    );
}

export default HeaderContainer;
