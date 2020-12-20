import './Content.scss';
import Profile from "../header/components/profile/Profile";
import Articles from "../header/components/articles/Articles";
import AddArticle from "../header/components/addArticle/AddArticle";
import PropTypes from 'prop-types';

import {caseProfile, caseArticles, caseAddArticle} from "../../variables/variables";

function Content({page, setNameForHook, userData}) {

  const ProfilePage = <Profile setNameForHook={setNameForHook}
                               userData={userData}/>;

  const showSelectedPage = page => {
    switch (page) {
      case caseProfile:
        return ProfilePage;
      case caseArticles:
        return <Articles/>;
      case caseAddArticle:
        return <AddArticle/>;
    }
  }

  return (
    <div className="content">
        {showSelectedPage(page)}
    </div>
  );
}

Content.propTypes = {
  setNameForHook: PropTypes.func,
  page: PropTypes.string
}

Content.defaultProps = {
  page: caseProfile
}


export default Content;