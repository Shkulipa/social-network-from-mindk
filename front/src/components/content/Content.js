import './Content.scss';
import Profile from "../header/components/profile/Profile";
import Articles from "../header/components/articles/Articles";
import AddArticle from "../header/components/addArticle/AddArticle";


function Content({page, setNameForHook}) {

  const showSelectedPage = page => {
    switch (page) {
      case 'Profile':
        return <Profile setNameForHook={setNameForHook}/>;
        break;
      case 'Articles':
        return <Articles/>;
        break;
      case 'Add Article':
        return <AddArticle/>;
        break;
      default:
        return <Profile/>;
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