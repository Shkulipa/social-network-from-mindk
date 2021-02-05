import {
    useParams
} from "react-router-dom";

function Article() {
    let { article_id } = useParams();

    return (
        <div>
            Article ID: {article_id}
        </div>

    );
}

export default Article;
