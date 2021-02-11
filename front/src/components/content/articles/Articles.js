import {Link} from "react-router-dom";

function Articles() {
    return (
        <div>
            This page of Articles <br/>

            <Link to={"/article/1"}>Article 1</Link><br/>
            <Link to={"/article/2"}>Article 2</Link><br/>
            <Link to={"/article/3"}>Article 3</Link><br/>
        </div>

    );
}

export default Articles;
