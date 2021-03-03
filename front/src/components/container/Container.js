import './Container.scss';
import Footer from '../footer/Footer';
import Header from "../header/Header";
import React, {useState} from "react";
import {Route, Switch, useRouteMatch} from "react-router-dom";
import Profile from "../content/profile/Profile";
import AddArticle from "../content/addArticle/AddArticle";
import "../content/Content.scss";
import ArticlesListContainer from "../content/articles/ArticlesListContainer";
import Page404 from "../404/Page404";
import Article from "../content/article/Article";
import UserProfile from "../content/userProfile/UserProfile";
import ProfileEdit from "../content/ProfileEdit/ProfileEdit";
import ArticleContainer from "../content/article/ArticleContainer";

function Container() {
    const [name, setName] = useState();

    const setNameForHook = event => {
        event.preventDefault();
        setName(`${event.target[0].value} ${event.target[1].value}`);
    }
    return (
        <div className="container">
            <Header name={name}/>
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
                        return <AddArticle/>
                    }}/>
                    <Route exact path={`/posts`} render={() => {
                         return <ArticlesListContainer/>
                    }}/>
                    <Route exact path={`/posts/:post_id`} render={() => {
                        return <ArticleContainer/>
                    }}/>

                    <Route path='*' render={() => {
                        return <Page404/>;
                    }}/>
                </Switch>
            </div >
            <Footer/>
        </div>
    );
};

export default Container;