import "./UserProfileStyle.scss";
import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import React from "react";
import notAvatar from "../../../images/user-astronaut-solid.svg";
import PropTypes from "prop-types";

UserProfile.propTypes = {
	dataUser: PropTypes.shape({
		avatarImg: PropTypes.string,
		email_img: PropTypes.string,
		nameUser: PropTypes.string,
		phone: PropTypes.string,
		university: PropTypes.string,
	}),
};

export default function UserProfile({ dataUser }) {
	const { avatarImg, emailUser, nameUser, phone, university } = dataUser;
	return (
		<Grid container spacing={3}>
			<Grid item xs={12}>
				<h2 className="title">User Profile</h2>
			</Grid>
			<Grid item xs={12} className="block-right">
				{avatarImg ? (
					<img
						className="avatar-img"
						src={`http://localhost:3000/images/avatars/${avatarImg}`}
						alt=""
					/>
				) : (
					<img className="avatar-img" src={notAvatar} alt="" />
				)}
			</Grid>
			<Grid item xs={12} className="block-left">
				<Card variant="outlined">
					<CardContent>
						{nameUser && (
							<Typography
								className="block-left__point"
								color="textSecondary"
								gutterBottom
							>
								Name : <span className="block-left__point__text">{nameUser}</span>
							</Typography>
						)}
						{emailUser && (
							<Typography
								className="block-left__point"
								color="textSecondary"
								gutterBottom
							>
								Email :{" "}
								<b>
									<a href={`mailto:${emailUser}`}>{emailUser}</a>
								</b>
							</Typography>
						)}
						{phone && (
							<Typography
								className="block-left__point"
								color="textSecondary"
								gutterBottom
							>
								Phone :{" "}
								<b>
									<a href={`tel:+38${phone}`}>+38{phone}</a>
								</b>
							</Typography>
						)}
						{university && (
							<Typography
								className="block-left__point"
								color="textSecondary"
								gutterBottom
							>
								University : {university}
							</Typography>
						)}
					</CardContent>
				</Card>
			</Grid>
		</Grid>
	);
}
