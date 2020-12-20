import './Container.scss';
import Content from '../content/Content';
import Footer from '../footer/Footer';
import Header from "../header/Header";
import React, {useState} from "react";


function Container() {
    const [page, setPage] = useState();
    const [name, setName] = useState();

    const userData = {
        id: 1,
        firstName: 'Ivan',
        lastName: 'Ivanov',
        age: 25,
        avatar: {
            fileId: 1,
            file: {
                id: 1,
                name: 'photo.jpg',
                path: '/upload/photo.jpg',
                size: 1234
            }
        },
        friends: [{}, {}, {}], //array of users
        articles: [{
            title: 'Article 1',
            text: 'Some text',
            images: [{
                id: 1,
                name: 'photo.jpg',
                path: '/upload/photo.jpg',
                size: 1234}, {
                id: 1,
                name: 'photo.jpg',
                path: '/upload/photo.jpg',
                size: 1234
            }, {
                id: 1,
                name: 'photo.jpg',
                path: '/upload/photo.jpg',
                size: 1234
            }], // array of files
            createdAt: '2020-12-17 19:00:00',
            editedAt: '2020-12-17 20:00:00',
            likes: [
                {userId: 2, user: {id: 2}, date: '2020-12-17 21:00:00'},
                {userId: 3, user: {id: 3}, date: '2020-12-17 22:00:00'}
            ]
        }]
    };

    const setPageForHook = value => () => setPage(value);

    const setNameForHook = event => {
        event.preventDefault();
        setName(`${event.target[0].value} ${event.target[1].value}`);
    }

    return (
        <div className="container">
            <Header setPageForHook={setPageForHook}
                    name={name}/>
            <Content page={page}
                     setNameForHook={setNameForHook}
                     userData={userData}/>
            <Footer/>
        </div>
    );
}

export default Container;