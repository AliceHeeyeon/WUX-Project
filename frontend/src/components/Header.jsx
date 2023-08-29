import { useAuthContext } from "../hooks/useAuthContext";
import { useLogout } from "../hooks/useLogout";
import { Link } from "react-router-dom";

//
// import useLoginModalContext from "../hooks/useLoginModalContext";

const Header = ({ onLoginClick }) => {
  //Bring user through useAuthContext
  const { user } = useAuthContext();
  const { logout } = useLogout();

  const handleLogout = () => {
    logout();
  };

  return (
    <div id="header">
      <Link to="/">
        <h1>WUX PROJECT</h1>
      </Link>
      <nav>
        {user && (
          <div>
            <span>Welcome {user.username}</span>
            <button onClick={handleLogout}>Logout</button>
          </div>
        )}
        {!user && (
          <div>
            <button onClick={onLoginClick}>Login</button>
            <Link to="/signup">Sign Up</Link>
          </div>
        )}
      </nav>
    </div>
  );
};

export default Header;
