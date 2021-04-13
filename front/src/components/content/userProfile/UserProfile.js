import './UserProfileStyle.scss';
import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import React from "react";
import notAvatar from "../../../images/user-astronaut-solid.svg";
import PropTypes from "prop-types";

UserProfile.propTypes = {
    dataUser: PropTypes.shape({
        avatar_img: PropTypes.string,
        email_img: PropTypes.string,
        name_user: PropTypes.string,
        phone: PropTypes.string,
        university: PropTypes.string,
    })
}

export default function UserProfile({dataUser}) {
    const {avatar_img, email_user, name_user, phone, university} = dataUser;
    return (
        <Grid container spacing={3}>
            <Grid item xs={12}>
                <h2 className="title">User Profile</h2>
            </Grid>
            <Grid item xs={12} className="block-right">
                {avatar_img ? <img className="avatar-img" src={`http://localhost:3000/images/avatars/${avatar_img}`} alt=""/> : <img className="avatar-img" src={notAvatar} alt=""/>}
            </Grid>
            <Grid item xs={12} className="block-left">
                <Card variant="outlined" >
                    <CardContent>
                        {name_user && <Typography className="block-left__point" color="textSecondary" gutterBottom>
                            Name : <span className="block-left__point__text">{name_user}</span>
                        </Typography>}
                        {email_user && <Typography className="block-left__point" color="textSecondary" gutterBottom>
                            Email : <b><a href={`mailto:${email_user}`}>{email_user}</a></b>
                        </Typography>}
                        {phone && <Typography className="block-left__point" color="textSecondary" gutterBottom>
                            Phone : <b><a href={`tel:+38${phone}`}>+38{phone}</a></b>
                        </Typography>}
                        {university && <Typography className="block-left__point" color="textSecondary" gutterBottom>
                            University : {university}
                        </Typography>}
                    </CardContent>
                </Card>
            </Grid>
        </Grid>

    );
};
