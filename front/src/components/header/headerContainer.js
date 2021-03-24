import {
    useMutation,
} from 'react-query';
import {ReqAddArticle} from './ReqAddArticle-2';
import Header from "./Header";
import React, {useCallback, useState} from "react";

function HeaderContainer({name}) {
    //req add new article
    const mutation = useMutation(ReqAddArticle);

    const onSubmit = useCallback( async formData => {
        try {
            await mutation.mutate(formData);
            handleClose();
        } catch(e) {
            console.log(e);
        }
    }, [mutation]);

    //pop-up modal window for add article
    const [open, setOpen] = useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    //poper profile menu
    const [anchorEl, setAnchorEl] = useState(null);
    const handleClickPopover = (event) => {
        setAnchorEl(anchorEl ? null : event.currentTarget);
    };

    const openProfileMenu = Boolean(anchorEl);
    const id = openProfileMenu ? 'simple-popover' : undefined;

    return (
        <>
            <Header
                name={name}

                open={open}
                handleClickOpen={handleClickOpen}
                handleClose={handleClose}
                onSubmit={onSubmit}

                handleClickPopover={handleClickPopover}
                id={id}
                openProfileMenu={openProfileMenu}
                anchorEl={anchorEl}
                onClose={handleClose}
            />
        </>

    );
}

export default HeaderContainer;
