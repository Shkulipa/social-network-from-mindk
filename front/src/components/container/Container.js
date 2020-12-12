import './Container.scss';
import Content from '../content/Content';
import Footer from '../footer/Footer';
import Header from "../header/Header";
import React, {useState} from "react";


function Container() {
    const [page, setPage] = useState('articles');
    const [name, setName] = useState('Not authorized');
    const [surname, setSurname] = useState('Not authorized');

    const setPageForHook = (value) => {
        setPage(value);
    }

    const setNameForHook = (event) => {
        event.preventDefault();
        setName(event.target[0].value);
        setSurname(event.target[1].value);
    }

    return (
        <div className="container">
            <Header setPageForHook={(value) => setPageForHook(value)}
                    name={name}
                    surname={surname}/>
            <Content page={page}
                     setNameForHook={setNameForHook}/>
            <Footer/>
        </div>
    );
}

export default Container;