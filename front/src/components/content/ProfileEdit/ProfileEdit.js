import React from "react";
import Divider from '@material-ui/core/Divider';
import Button from "@material-ui/core/Button";

function ProfileEdit() {


    return (
        <>
            <form action="http://localhost:3000/profile" method="post" encType="multipart/form-data">
                <label htmlFor="user_id">Your user id:&#160;&#160;</label>
                <input type="number" name="user_id" id="user_id"/>
                <br/><br/>
                <Divider />
                <br/>

                <label htmlFor="name">Your avatar img:&#160;&#160;</label>
                <input type="file" name="avatar-img" id="avatar-img"/>
                <br/><br/>
                <Divider />
                <br/>

                <Button variant="contained" color="primary" type="submit">
                   Edit
                </Button>
            </form>
        </>

    );
}

export default ProfileEdit;
