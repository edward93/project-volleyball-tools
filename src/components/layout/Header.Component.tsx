import logo from "assets/logo192.png";
import { NavLink } from "react-router-dom";
import { ROUTES } from "utils/router/routes";
import "../../styles/header.scss";

const HeaderComponent = () => {
  return (
    <div className="app-header">
      <div className="header-left">
        <NavLink to={ROUTES.HOME}>
          <img src={logo} alt="logo" />
        </NavLink>
      </div>
      <div className="header-middle">
        <div className="header-name">
          <h2>Volleyball Stats Tracker</h2>
        </div>
      </div>
      <div className="header-right"></div>
    </div>
  );
};

export default HeaderComponent;
