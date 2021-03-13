import './Container.scss';
import Footer from '../footer/Footer';
import Header from "../header/Header";
import React, {useState} from "react";
import {Route, Switch} from "react-router-dom";
import Profile from "../content/profile/Profile";
import "../content/Content.scss";
import ArticlesListContainer from "../content/articles/ArticlesListContainer";
import Page404 from "../404/Page404";
import UserProfile from "../content/userProfile/UserProfile";
import ProfileEdit from "../content/ProfileEdit/ProfileEdit";
import ArticleContainer from "../content/article/ArticleContainer";
import AddArticleContainer from "../content/addArticle/AddArticleContainer";
import EditArticleContainer from "../content/editPost/EditArticleContainer";

function Container() {
    const [name, setName] = useState();

    const setNameForHook = event => {
        setName(`${event.name} ${event.surname}`);
    }

    return (
        <div className="page">
            <Header name={name}/>
            <div className="container">
                <div className="content">
                    <Switch>
                        <Route exact path={`/`} render={() => {
                            return <ArticlesListContainer/>
                        }}/>
                        <Route exact path={`/profile/:profile_user/`} render={props => {
                            return <Profile {...props} setNameForHook={setNameForHook} name={name}/>
                        }}/>
                        <Route exact path={`/profile/:profile_user/:action(edit|avatar)/`} render={props => {
                            return <ProfileEdit {...props} />
                        }}/>
                        <Route exact path={`/users/:view_user`} render={() => {
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