import './Container.scss';
import Content from '../content/Content';
import Footer from '../footer/Footer';
import Header from "../header/Header";
import React, {useState} from "react";


function Container() {
    const [page, setPage] = useState('articles');
    const [name, setName] = useState('Not authorized');

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
                     setNameForHook={setNameForHook}/>
            <Footer/>
        </div>
    );
}

export default Container;