import './Container.scss';
import Footer from '../footer/Footer';
import React, {useCallback, useEffect} from "react";
import {Redirect, Route, Switch} from "react-router-dom";
import "../content/Content.scss";
import ArticlesListContainer from "../content/articles/ArticlesListContainer";
import Page404 from "../404/Page404";
import UserProfile from "../content/userProfile/UserProfile";
import ArticleContainer from "../content/article/ArticleContainer";
import AddArticleContainer from "../content/addArticle/AddArticleContainer";
import EditArticleContainer from "../content/editPost/EditArticleContainer";
import HeaderContainer from "../header/headerContainer";
import ProfileEditContainer from "../content/ProfileEdit/ProfileEditContainer";
import LoginContainer from "../content/Login/Login";
import useAuth from "../../hooks/useAuth";

function Container() {
    const { user, refreshToken, refresh } = useAuth();

    //logout
    const { logout } = useAuth();
    const handleLogout = useCallback(
        event => {
            event.preventDefault();
            logout().then(() => {
                refresh();
            })
        },
        [logout],
    );

    useEffect(() => {
        if (!user && refreshToken) {
            refresh();
        }
    }, [user, refreshToken]);

    if (!user && refreshToken) {
        return <button onClick={handleLogout}>asd</button>;
    }

    return (
        <div className="page">
            <HeaderContainer/>
            <div className="container">
                <div className="content">
                    <Switch>
                        <Route exact path={`/`} render={() => {
                            return <Redirect to="/login" />
                        }}/>
                        <Route exact path={`/login`} render={() => {
                            return <LoginContainer/>
                        }}/>
                        <Route exact path={`/sign-up`} render={() => {
                            return <div>sign up page</div>
                        }}/>
                        <Route exact path={`/settings`} render={props => {
                            return <ProfileEditContainer {...props} />
                        }}/>
                        <Route exact path={`/profile/:view_user`} render={() => {
                            return <UserProfile/>
                        }}/>
                        <Route exact path={`/add-article`} render={() => {
                            return <AddArticleContainer/>
                        }}/>
                        <Route exact path={`/posts`} render={() => {
                            return <ArticlesListContainer/>
                        }}/>
                        <Route exact path={`/posts/:post_id`} render={() => {
                            return <ArticleContainer/>
                        }}/>

                        <Route exact path={`/posts/edit/:post_id`} render={() => {
                            return <EditArticleContainer/>
                        }}/>

                        <Route path='*' render={() => {
                            return <Page404/>;
                        }}/>
                    </Switch>
                </div>
            </div>

            <Footer className="footer"/>
        </div>
    );
};

export default Container;
