import { useState } from "react";
import { useSignup } from "../hooks/useSignup";

const Signup = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  // bring in signup function, loading state, error from our hook:
  const { signup, error, isLoading } = useSignup();

  const handleSubmit = async (e) => {
    e.preventDefault();

    await signup(username, password);
  };

  return (
    <div className="signup">
      <form className="signup-form" onSubmit={handleSubmit}>
        <h3>Sign Up</h3>
        <label className="username-label">Username</label>
        <input
          type="username"
          placeholder="Username"
          className="username-input"
          onChange={(e) => setUsername(e.target.value)}
          value={username}
        />
        <label className="password-label">Password</label>
        <input
          type="password"
          placeholder="Password"
          className="password-input"
          onChange={(e) => setPassword(e.target.value)}
          value={password}
        />

        <p>
          Already registered? <span>log In</span>
        </p>
        <button disabled={isLoading}>Sign Up</button>
        {error && <div className="error">{error}</div>}
      </form>
    </div>
  );
};

export default Signup;
