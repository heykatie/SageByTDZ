import { NavLink } from "react-router-dom";
import ProfileButton from "./ProfileButton";
import "./Navigation.css";


function Navigation({ isLoaded }) {

  return (
    <div className="navigation-bar">
      <ul>
        <div className="logo-container">
          <li>
            <NavLink to="/">
            <img src="https://res.cloudinary.com/dozliephp/image/upload/v1729123642/Jujutsu_favicon_igilzz.png" alt="Sage-Mascot" />
            </NavLink>
          </li>
        </div>
        <div className="site-name">
          <li>
            SAGE
          </li>
        </div>
        <div className="profile-button">
          {isLoaded && (
          <li>
            <ProfileButton />
          </li>
        )}</div>
        
      </ul>
    </div>
  );
}

export default Navigation;
