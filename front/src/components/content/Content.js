import './Content.scss';
import Profile from "../header/components/profile/Profile";
import Articles from "../header/components/articles/Articles";
import AddArticle from "../header/components/addArticle/AddArticle";

import {caseProfile, caseArticles, caseAddArticle} from "../../variables/variables";

function Content({page, setNameForHook}) {

  const ProfilePage = <Profile setNameForHook={setNameForHook}/>;

  const showSelectedPage = page => {
    switch (page) {
      case caseProfile:
        return ProfilePage;
        break;
      case caseArticles:
        return <Articles/>;
        break;
      case caseAddArticle:
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