import "../../styles/header.scss";

const HeaderComponent = () => {
  return (
    <div className="app-header">
      <div className="header-left"></div>
      <div className="header-middle">
        <div className="header-name">
          <h1>Volleyball Stats Tracker</h1>
        </div>
      </div>
      <div className="header-right"></div>
    </div>
  );
};

export default HeaderComponent;
