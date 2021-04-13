import "./Container.scss";
import Footer from "../footer/Footer";
import React, { useCallback, useEffect } from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import "../content/Content.scss";
import ArticlesListContainer from "../content/articles/ArticlesListContainer";
import Page404 from "../404/Page404";
import ArticleContainer from "../content/article/ArticleContainer";
import EditArticleContainer from "../content/editPost/EditArticleContainer";
import HeaderContainer from "../header/headerContainer";
import ProfileEditContainer from "../content/ProfileEdit/ProfileEditContainer";
import LoginContainer from "../content/Login/Login";
import useAuth from "../../hooks/useAuth";
import UserProfileContainer from "../content/userProfile/UserProfileContainer";
import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import Typography from "@material-ui/core/Typography";

function Container() {
	const { user, refreshToken, refresh } = useAuth();

	// logout
	const { logout } = useAuth();
	const handleLogout = useCallback(
		(event) => {
			event.preventDefault();
			logout();
		},
		[logout]
	);

	useEffect(() => {
		if (!user && refreshToken) {
			refresh();
		}
	}, [user, refreshToken]);

	if (!user && refreshToken) {
		return (
			<div className="re-log-page">
				<Card variant="outlined">
					<CardContent>
						<Typography color="textPrimary" gutterBottom>
							<b>Your session has expired, please re-login</b>
						</Typography>
					</CardContent>
					<CardActions className="re-log-page__btn">
						<Button
							variant="contained"
							color="primary"
							size="large"
							onClick={handleLogout}
						>
							Re-login
						</Button>
					</CardActions>
				</Card>
			</div>
		);
	}

	return (
		<div className="page">
			<HeaderContainer />
			<div className="container">
				<div className="content">
					<Switch>
						<Route
							exact
							path={"/"}
							render={() => {
								return <Redirect to="/login" />;
							}}
						/>
						<Route
							exact
							path={"/login"}
							render={() => {
								return <LoginContainer />;
							}}
						/>
						<Route
							exact
							path={"/sign-up"}
							render={() => {
								return <div>sign up page</div>;
							}}
						/>
						<Route
							exact
							path={"/profile"}
							render={() => {
								return <ProfileEditContainer />;
							}}
						/>
						<Route
							exact
							path={"/user/:userId"}
							render={() => {
								return <UserProfileContainer />;
							}}
						/>
						<Route
							exact
							path={"/posts"}
							render={() => {
								return <ArticlesListContainer />;
							}}
						/>
						<Route
							exact
							path={"/posts/:postId"}
							render={() => {
								return <ArticleContainer />;
							}}
						/>

						<Route
							exact
							path={"/posts/edit/:postId"}
							render={() => {
								return <EditArticleContainer />;
							}}
						/>

						<Route
							path="*"
							render={() => {
								return <Page404 />;
							}}
						/>
					</Switch>
				</div>
			</div>
			<Footer className="footer" />
		</div>
	);
}

export default Container;
