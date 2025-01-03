import { NavLink } from "react-router-dom";
import ProfileButton from "./ProfileButton";
import "./Navigation.css";


function Navigation() {

  return (
    <div className="navigation-bar">
      <ul>
        <div className="logo-container">
          <li>
            <NavLink to="/">
            <img src="react-vite/public/favicon.ico" alt="Sage-Mascot" />
            </NavLink>
          </li>
        </div>
        <div className="site-name">
          <li>
            SAGE
          </li>
        </div>
        <div className="profile-button">
          <li>
            <ProfileButton />
          </li>
        </div>
        
      </ul>
    </div>
  );
}

export default Navigation;
