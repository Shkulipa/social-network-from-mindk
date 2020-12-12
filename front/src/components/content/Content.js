import './Content.scss';

function Content({page, setNameForHook}) {

  const form =
      <>
        <form class="content__form" onSubmit={setNameForHook}>
          Введите ваше имя:
          <input type="text" required/>
          Введите вашу фамилию:
          <input type="text" required/>
          <button type="submit">Submit</button>
        </form>
      </>;

  const showSelectedPage = (page) => {
    switch (page) {
      case 'Profile':
        return form
        break;
      case 'Articles':
        return (
            <>This page of Articles</>
        );
        break;
      case 'Add Article':
        return (
            <>This page to add Article</>
        );
        break;
      default:
        return form
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