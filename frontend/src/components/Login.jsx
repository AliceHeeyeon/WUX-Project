import { useState } from "react";
import { useLogin } from "../hooks/useLogin";
import { Link } from "react-router-dom";
// react-icons
import { ImCancelCircle } from "react-icons/im";

import { LoginModalContext } from "../context/LoginModalContext";
import { useLoginModalContext } from "../hooks/useLoginModalContext";

const Login = ({ onClose }) => {
  // this is how the button works from the header without context
  // // state for visiability
  // const [isVisible, setIsvisible] = useState(true);

  const { isLoginVisible } = useLoginModalContext();

  // call in the context
  // const isVisible = useLoginModalContext();

  // state for login
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { login, isLoading, error } = useLogin();

  // Bring userdata from localstorage
  const userData = localStorage.getItem("user");

  // if there's userdata in localstorage, close modal
  if (userData) {
    onClose();
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    await login(username, password);

    // close the modal if user logs in
    if (!error) {
      // use onClose prop
      onClose();
    }
  };

  const handleCancelClick = () => {
    // use onClose prop
    onClose();
  };

  return isLoginVisible ? (
    <form className="login-modal" onSubmit={handleSubmit}>
      <div className="login">
        {/* cancel */}
        <ImCancelCircle className="cancel-login" onClick={handleCancelClick} />

        <h3>Log In</h3>

        <div>
          <label>Username</label>
          <input
            type="text"
            onChange={(e) => setUsername(e.target.value)}
            value={username}
          />
        </div>

        <div>
          <label>Password</label>
          <input
            type="password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
          />
        </div>

        <p className="register-text">
          Not registered? 
          <Link to="/signup">
            {/* closes the login modal when you move to signup */}
            <span onClick={handleCancelClick}>Sign Up</span>
          </Link>
        </p>
        <button className="login-confirm" disabled={isLoading}>
          Log In
        </button>
        {error && <div className="login-error">{error}</div>}
      </div>
    </form>
  ) : null;
};

export default Login;
