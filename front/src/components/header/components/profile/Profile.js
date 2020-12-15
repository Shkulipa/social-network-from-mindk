function Profile({setNameForHook}) {
    return (
        <>
            <form className="content__form" onSubmit={setNameForHook}>
                Введите ваше имя:
                <input type="text" name={"first name"} required/>
                Введите вашу фамилию:
                <input type="text" name={"last name"} required/>
                <button type="submit">Submit</button>
            </form>
        </>

    );
}

export default Profile;
