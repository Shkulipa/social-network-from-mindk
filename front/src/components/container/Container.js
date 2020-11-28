import './Container.scss';
import Content from '../content/Content';
import Footer from '../footer/Footer';


function Container() {
  return (
    <div className="container">
      <Content />
      <Footer />
    </div>
  );
}

export default Container;