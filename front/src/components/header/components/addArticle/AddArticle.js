function AddArticle({setPageForHook}) {
    return (
        <>
            <button onClick={() => setPageForHook('Add Article')}>Add Article</button>
        </>

    );
}

export default AddArticle;
