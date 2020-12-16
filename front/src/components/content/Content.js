import './Content.scss';
import Profile from "../header/components/profile/Profile";
import Articles from "../header/components/articles/Articles";
import AddArticle from "../header/components/addArticle/AddArticle";


function Content({page, setNameForHook}) {

  const ProfilePage = <Profile setNameForHook={setNameForHook}/>

  const showSelectedPage = page => {
    switch (page) {
      case 'Profile':
        return ProfilePage;
        break;
      case 'Articles':
        return <Articles/>;
        break;
      case 'Add Article':
        return <AddArticle/>;
        break;
      default:
        return ProfilePage;
        break;
    }
  }

  return (
    <div className="content">
        {showSelectedPage(page)}
    </div>
  );
}

export default Content;