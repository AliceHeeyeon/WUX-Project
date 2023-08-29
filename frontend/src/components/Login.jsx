import { useState } from "react";
import { useLogin } from "../hooks/useLogin";
import { Link } from "react-router-dom";
//react-icons
import { ImCancelCircle } from "react-icons/im";

const Login = ({ onClose }) => {
  // state for visiability
  const [isVisible, setIsvisible] = useState(true);
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
  };

  const handleCancelClick = () => {
    setIsvisible(false);
    onClose();
  };

  return isVisible ? (
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
          Not registered?{" "}
          <Link to="/signup">
            <span>Sign Up</span>
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
